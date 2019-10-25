<template>
  <div style="padding: 0 10px">
    <Tabs type="card" :animated="false">
      <TabPane label="原始数据" style="padding: 10px;">
        <input type="file" v-show="false" accept=".csv" ref="uploadBox" />
        <Button
          size="large"
          icon="md-add"
          type="primary"
          :loading="loading"
          @click="addWeekDaily"
        >新增周报</Button>
        <Button size="large" icon="md-cloud-upload" :loading="loading" @click="importExcel">导入周报</Button>
        <Button size="large" icon="ios-download" :loading="loading" @click="exportFullData">导出周报</Button>
        <Button size="large" :loading="loading" @click="reverse">倒序</Button>
        <Table
          border
          :columns="columns"
          :data="infos"
          :loading="loading"
          ellipsis
          ref="infoTable"
          max-height="600"
          style="margin: 20px 0"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" @click="edit(index)">编辑</Button>
            <Button type="error" size="small" @click="openDeleteConfirmDialog(index)">删除</Button>
          </template>
        </Table>
      </TabPane>
      <TabPane label="加班记录表">
        <overtime></overtime>
      </TabPane>
      <TabPane label="各种类工作时长">
        <div id="workloadCategoryChart" class="echart-div"></div>
      </TabPane>
      <TabPane label="总工作量">
        <div id="sumWorkloadChart" class="echart-div"></div>
      </TabPane>
      <TabPane label="各工作类型时间变化">
        <div id="everyWorkloadCategoryChart" class="echart-div"></div>
      </TabPane>
    </Tabs>
  </div>
</template>
<style>
.echart-div {
  width: 1000px;
  height: 600px;
}

.ivu-table .over-work {
  background-color: #e88080;
  color: #000000;
}
.ivu-table .ok-work {
  background-color: #a3e043;
  color: #000000;
}
</style>
<script>
import buildEChart from "../../js/chart/buildEChart";
import overtime from "./overtime";
import XLSX from "xlsx";

export default {
  mounted() {
    // 给input添加导入文件的功能，监听文件的变化
    this.importCSV();
    this.getAllInfos();
  },
  components: {
    overtime
  },
  data() {
    return {
      columns: [
        {
          title: "时间",
          key: "timeInterval",
          minWidth: 60
        },
        {
          title: "周数",
          key: "weeks",
          maxWidth: 60
        },
        {
          title: "工作内容",
          align: "center",
          children: [
            {
              title: "编码",
              key: "coding"
            },
            {
              title: "测试",
              key: "testing"
            },
            {
              title: "文档编写",
              key: "documentWriting"
            },
            {
              title: "自学",
              key: "selfStudying"
            },
            {
              title: "翻译",
              key: "translate"
            },
            {
              title: "准备工作",
              key: "useless"
            }
          ]
        },
        {
          title: "本周工作量",
          key: "weekWorkload"
        },
        {
          title: "工作日",
          key: "weekday"
        },
        {
          title: "日均工作量",
          key: "averageWorkload"
        },
        {
          title: "工作饱和度",
          key: "workSaturation"
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 60
        }
      ],
      infos: [],
      loading: true
    };
  },
  methods: {
    // reverse the table.
    reverse() {
      this.infos = this.infos.reverse();
    },
    // 填写新的周报
    addWeekDaily() {
      this.$router.push({
        path: "/myDaily/weekDaily",
        name: "weekDaily",
        params: {
          tableData: []
        }
      });
    },
    // 导出原始数据
    // ~~TODO~~: weekData will be separated to parts cause default separator is ','
    // fixed by: add "" and use escape
    exportFullData() {
      const columns = this.columns
        .map(item => {
          if (item.children != null) {
            return item.children;
          } else {
            return item;
          }
        })
        .flat();
      this.infos.forEach(
        item => (item.weekData = '"' + escape(item.weekData) + '"')
      );
      columns.push({ title: "weekData", key: "weekData" });
      this.$refs.infoTable.exportCsv({
        filename: "Original Data",
        columns: columns,
        data: this.infos
      });
    },
    // 读取周报信息
    getAllInfos() {
      const me = this;
      me.loading = true;
      this.$http.get("/api/myDaily/getAllData", {}).then(data => {
        this.infos = me.addCssToData(data.body);
        me.loading = false;
        this.drawCharts();
      });
    },
    // 给数据加css
    addCssToData(data) {
      return data.map(item => {
        item.cellClassName = {};
        item.cellClassName.weekWorkload =
          item.weekWorkload > 40 ? "over-work" : "ok-work";
        item.cellClassName.weekday = item.weekday > 5 ? "over-work" : "ok-work";
        item.cellClassName.averageWorkload =
          item.averageWorkload > 8 ? "over-work" : "ok-work";
        item.workSaturation = (item.workSaturation * 100).toFixed(1) + "%";
        return item;
      });
    },
    // 导入周报原始数据
    importInfos(infos) {
      this.$http
        .post(
          "/api/myDaily/importOriginData",
          {
            infos: infos
          },
          {}
        )
        .then(response => {
          this.getAllInfos();
        });
    },
    // open delete confirm dialog
    openDeleteConfirmDialog(index) {
      this.$Modal.confirm({
        title: "Delete Confirm Dialog",
        content: `<p>Are you sure you want to delete week <strong>${this.infos[index].weeks}</strong>'s daily record? This can not be reset.</p>`,
        loading: true,
        onOk: () => {
          this.deleteTargetWeek(index);
        }
      });
    },
    // delete target week's daily record
    deleteTargetWeek(index) {
      this.$http
        .post("/api/myDaily/deleteTargetWeek", {
          index: this.infos[index].weeks
        })
        .then(response => {
          this.$Modal.remove();
          this.getAllInfos();
        });
    },
    // 进入填写周报界面
    edit(index) {
      // change goes here
      this.$router.push({
        name: "weekDaily",
        query: {
          weekNum: this.infos[index].weeks
        }
      });
    },
    // 处理infos数组
    handleData(infos) {
      let handledData = {
        coding: 0, // 编码
        testing: 0, // 测试
        documentWriting: 0, // 文档编写
        selfStudying: 0, // 自学
        translate: 0, // 翻译
        useless: 0 // 准备工作
      };
      infos.map(item => {
        handledData.coding += item.coding;
        handledData.testing += item.testing;
        handledData.documentWriting += item.documentWriting;
        handledData.selfStudying += item.selfStudying;
        handledData.translate += item.translate;
        handledData.useless += item.useless;
      });
      return {
        category: [
          handledData.coding.toFixed(1),
          handledData.testing.toFixed(1),
          handledData.documentWriting.toFixed(1),
          handledData.selfStudying.toFixed(1),
          handledData.translate.toFixed(1),
          handledData.useless.toFixed(1)
        ],
        sumWorkload: infos.map(item => item.weekWorkload),
        infos: infos
      };
    },
    // click the import button
    importExcel() {
      this.$refs.uploadBox.click();
    },
    // draw charts
    drawCharts() {
      const chartData = this.handleData(this.infos);
      buildEChart.buildBarEChart(
        "workloadCategoryChart",
        chartData.category,
        ["编码", "测试", "文档编写", "自学", "翻译", "准备工作"],
        "工作时长"
      );
      buildEChart.buildLineEChart(
        "sumWorkloadChart",
        "总工作量变化折线图",
        chartData.infos.map((item, i) => `第${i + 1}周`),
        ["周数"],
        [{ data: chartData.sumWorkload, type: "line", name: "工作量(h)" }]
      );
      buildEChart.buildLineEChart(
        "everyWorkloadCategoryChart",
        "各种类工作内容时间变化",
        chartData.infos.map((item, i) => `第${i + 1}周`),
        ["编码", "测试", "文档编写", "自学", "翻译", "准备工作"],
        [
          {
            name: "编码",
            borderColor: "#58B2DC",
            data: chartData.infos.map(item => item.coding),
            type: "line"
          },
          {
            name: "测试",
            borderColor: "#00AA90",
            data: chartData.infos.map(item => item.testing),
            type: "line"
          },
          {
            name: "文档编写",
            borderColor: "#FAD689",
            data: chartData.infos.map(item => item.documentWriting),
            type: "line"
          },
          {
            name: "自学",
            borderColor: "#DC9FB4",
            data: chartData.infos.map(item => item.selfStudying),
            type: "line"
          },
          {
            name: "准备工作",
            borderColor: "#FEDFE1",
            data: chartData.infos.map(item => item.useless),
            type: "line"
          }
        ]
      );
    },
    // 处理导入的文件
    handleImportData(data) {
      const handledData = [];
      data.map((item, i) => {
        handledData.push({
          timeInterval: item[0],
          weeks: Number(item[1] || 0),
          coding: Number(item[2] || 0),
          testing: Number(item[3] || 0),
          documentWriting: Number(item[4] || 0),
          selfStudying: Number(item[6] || 0),
          translate: Number(item[7] || 0),
          useless: Number(item[8] || 0),
          weekWorkload: Number(item[9] || 0),
          weekday: Number(item[10] || 0),
          averageWorkload: Number(item[11] || 0),
          workSaturation:
            Number(
              (
                (Number(item[2]) + Number(item[3]) + Number(item[4])) /
                Number(item[9])
              ).toFixed(1)
            ) || 0,
          // unescape and remove the double quotes at start and last.
          weekData: unescape(item[12]).replace(/^["|'](.*)["|']$/g, "$1")
        });
      });

      const importData = handledData.map(item => {
        return [
          item.timeInterval,
          item.weeks,
          item.coding,
          item.testing,
          item.documentWriting,
          item.selfStudying,
          item.translate,
          item.useless,
          item.weekWorkload,
          item.weekday,
          item.averageWorkload,
          item.workSaturation,
          item.weekData
        ];
      });

      this.infos = handledData;
      this.importInfos(importData);
      this.drawCharts();
    },
    // 导入本地csv文件
    importCSV(res, file) {
      const me = this;
      var input = document.querySelector("input");
      input.addEventListener(
        "change",
        function() {
          importExcel(this.files, function(data) {});
        },
        false
      );

      var importExcel = function(files, back) {
        if (!files instanceof FileList) {
          return [];
        }
        let loadIndex = 0;
        // imported file could be multiple
        [].slice.call(files).forEach(function(file) {
          var reader = new FileReader();
          reader.onload = function(e) {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // read excel's work sheet by line.
            let lines = XLSX.utils
              .sheet_to_json(first_worksheet, { header: 1 })
              .map((line, i) => {
                return line.map((cell, index) => {
                  return index > 0 && index < 12 ? Number(cell || 0) : cell;
                });
              });
            loadIndex++;
            if (loadIndex === files.length) {
              me.handleImportData(
                lines.filter(item => item.length != 0).slice(1)
              );
            }
          };
          reader.readAsBinaryString(file);
        });
      };
    }
  }
};
</script>

