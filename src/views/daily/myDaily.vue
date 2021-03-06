<template>
  <div>
    <span class="title-text">我的周报</span>
    <keep-alive>
      <Tabs type="card" :animated="false" style="padding: 20px 10px;">
        <TabPane label="原始数据" style="padding: 10px;">
          <input type="file" v-show="false" accept=".csv" ref="uploadBox" />
          <div style="padding: 10px 0;">
            <Button icon="md-add" type="primary" :loading="loading" @click="openWeekDailyPage">新增周报</Button>
            <Button icon="md-cloud-upload" @click="openImportDialog">导入周报</Button>
            <Button :loading="loading" @click="reverse">倒序</Button>
          </div>
          <div>
            <Select v-model="startDate" placeholder="开始区间" @on-change="startDateOnChange" style="width:200px">
              <Option v-for="item in startList" :value="item.value" :key="item.value">
                {{ item.label }}</Option>
            </Select>
            ~
            <Select v-model="endDate" placeholder="结束区间" style="width:200px">
              <Option v-for="item in endList" :value="item.value" :key="item.value">
                {{ item.label }}</Option>
            </Select>
            <Button icon="ios-download" :loading="loading" @click="exportFullData">导出周报</Button>
          </div>
          <Table border :columns="columns" :data="this.tableDatas" :loading="loading" ellipsis ref="infoTable"
            style="margin: 20px 0">
            <template slot-scope="{ index }" slot="action">
              <Button type="primary" size="small" @click="openEditInfoPage(index)">编辑</Button>
              <Button type="error" size="small" @click="openDeleteConfirmDialog(index)">删除</Button>
            </template>
          </Table>
          <div style="float: right">
            <Page :current="currentPage" :total="totalDatas" @on-change="changePage" simple />
          </div>
        </TabPane>
        <TabPane label="加班记录表">
          <keep-alive>
            <overtime></overtime>
          </keep-alive>
        </TabPane>
        <TabPane label="各种类工作时长">
          <label>切换表格风格</label>
          <Switch size="large" @on-change="switchChartType">
            <span slot="open" style="width: 200px">严肃</span>
            <span slot="close">卡通</span>
          </Switch>
          <div id="workloadCategoryEChart" class="echart-div" v-show="switchStatus"></div>
          <div id="workloadCategoryVizChart" v-show="!switchStatus"></div>
        </TabPane>
        <TabPane label="总工作量">
          <div id="sumWorkloadChart" class="echart-div"></div>
        </TabPane>
        <TabPane label="各工作类型时间变化">
          <div id="everyWorkloadCategoryChart" class="echart-div"></div>
        </TabPane>
        <TabPane label="工作饱和度">
          <div id="workSaturationChart" class="echart-div"></div>
        </TabPane>
      </Tabs>
    </keep-alive>
  </div>
</template>
<style>
  .wrapper {
    display: flex;
    flex: wrap;
    order: row;
  }

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

  .title-text {
    font-size: 24px;
    padding: 50px;
  }
</style>
<script>
  import buildEChart from "../../js/chart/buildEChart";
  import buildVizChart from "../../js/chart/buildVizChart";
  import overtime from "./overtime";
  import XLSX from "xlsx";
  import ice from "../../js/editor/iceEditor";

  export default {
    mounted() {
      // 给input添加导入文件的功能，监听文件的变化
      this.importCSV();
      this.getAllInfos();
      this.createIceEditor();
    },
    components: {
      overtime
    },
    data() {
      return {
        columns: [{
            title: "时间",
            key: "timeInterval",
            minWidth: 60
          },
          {
            title: "周数",
            key: "weeks",
            maxWidth: 65
          },
          {
            title: "工作内容",
            align: "center",
            children: [{
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
        infos: [], // infos here is all the datas from db.
        tableDatas: [], // tableDatas are datas shown in every page. max length is 10.
        loading: true,
        currentPage: 1,
        totalDatas: 100,
        switchStatus: false,
        startDate: '',
        endDate: '',
        startList: [],
        endList: []
      };
    },
    methods: {
      // reverse the table.
      reverse() {
        this.infos = this.infos.reverse();
        this.changePage(1);
      },
      // 填写新的周报
      openWeekDailyPage() {
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
        const columns = this.columns.map(item => {
          return item.children != null ? item.children : item;
        }).flat();
        let exportData;
        if (this.startDate === '' && this.endDate === '') {
          exportData = this.infos.map(info => {
            info.weekData = '"' + escape(info.weekData) + '"';
            return info;
          });
        } else {
          exportData = this.infos.slice(this.startDate, this.endDate + 1).map(info => {
            info.weekData = '"' + escape(info.weekData) + '"';
            return info;
          });
        }
        columns.push({
          title: "weekData",
          key: "weekData"
        });
        this.$refs.infoTable.exportCsv({
          filename: this.getFileName(exportData),
          columns: columns,
          data: exportData
        });
      },
      // 根据起始时间生成文件名
      getFileName(data) {
        if (data.length <= 1) {
          return 'Original Data';
        }
        return `${data[0].timeInterval.split('-')[0]}-${data.slice(-1)[0].timeInterval.split('-')[0]}周报`;
      },
      // 读取周报信息
      getAllInfos() {
        const that = this;
        that.loading = true;
        this.$http.get("/api/myDaily/getAllData", {}).then(data => {
          this.infos = that.addCssToData(data.body);
          this.startList = this.infos.map(info => {
            return {
              label: info.timeInterval,
              value: info.weeks - 1
            }
          });
          this.endList = [...this.startList];
          this.totalDatas = this.infos.length;
          this.tableDatas = this.infos.slice(0, 10);
          that.loading = false;
          this.drawCharts();
        });
      },
      // Callback when page number is changed. It returns the changed page number.
      // 切换page时触发
      changePage(newPage) {
        const start = newPage - 1 > 0 ? newPage - 1 : 0;
        this.tableDatas = this.infos.slice(start * 10, newPage * 10);
      },
      // 给数据加css
      addCssToData(data) {
        return data.map(item => {
          item.cellClassName = {};
          item.cellClassName.weekWorkload = item.weekWorkload > 40 ? "over-work" : "ok-work";
          item.cellClassName.weekday = item.weekday > 5 ? "over-work" : "ok-work";
          item.cellClassName.averageWorkload = item.averageWorkload > 8 ? "over-work" : "ok-work";
          item.workSaturation = (item.workSaturation * 100).toFixed(1) + "%";
          return item;
        });
      },
      // 导入周报原始数据
      importInfos(infos) {
        this.$http.post("/api/myDaily/importOriginData", {
          infos: infos
        }, {}).then(() => {
          this.getAllInfos();
        });
      },
      // 打开删除确认对话框
      openDeleteConfirmDialog(index) {
        this.$Modal.confirm({
          title: this.$i18n.t('daily.deleteConfirmationDialog'),
          content: this.$i18n.t('daily.deleteConfirmationMessage', {
            week: this.infos[index].weeks
          }),
          loading: true,
          onOk: () => {
            this.deleteTargetInfo(index);
          }
        });
      },
      // delete target week's daily record
      // 删除指定周的周报
      deleteTargetInfo(index) {
        this.$http.post("/api/myDaily/deleteTargetInfo", {
          index: this.infos[index].weeks
        }).then(() => {
          this.$Modal.remove();
          this.getAllInfos();
        });
      },
      // 进入填写周报界面
      openEditInfoPage(index) {
        // change goes here
        this.$router.push({
          name: "weekDaily",
          query: {
            weekNum: this.infos[index].weeks,
            updateFlag: true
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
        infos.forEach(item => {
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
          infos: infos,
          sumWorkload: infos.map(item => item.weekWorkload),
          workSaturation: infos.map(item => parseFloat(item.workSaturation) / 100)
        };
      },
      // click the import button
      // 点击导入按钮，打开对话框
      openImportDialog() {
        this.$refs.uploadBox.click();
      },
      // draw charts
      // 绘制图表
      drawCharts() {
        const chartData = this.handleData(this.infos);
        // RoughViz 这个可以考虑删了 太丑了
        buildVizChart.buildBarChart(
          "#workloadCategoryVizChart",
          chartData.category,
          ["编码", "测试", "文档编写", "自学", "翻译", "准备工作"],
          "工作时长",
          1000,
          600
        );
        buildEChart.buildBarEChart(
          "workloadCategoryEChart",
          chartData.category,
          ["编码", "测试", "文档编写", "自学", "翻译", "准备工作"],
          "工作时长"
        );
        buildEChart.buildLineEChart(
          "sumWorkloadChart",
          "总工作量变化折线图",
          chartData.infos.map((item, i) => `第${i + 1}周`),
          ["周数"],
          [{
            data: chartData.sumWorkload,
            type: "line",
            name: "工作量(h)"
          }]
        );
        buildEChart.buildLineEChart(
          "everyWorkloadCategoryChart",
          "各种类工作内容时间变化",
          chartData.infos.map((item, i) => `第${i + 1}周`),
          ["编码", "测试", "文档编写", "自学", "翻译", "准备工作"],
          [{
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
        buildEChart.buildLineEChart(
          "workSaturationChart",
          "工作饱和度变化区域填充折线图",
          chartData.infos.map((item, i) => `第${i + 1}周`),
          ["周数"],
          [{
            data: chartData.workSaturation,
            type: "line",
            name: "工作饱和度(%)",
            areaStyle: {}
          }]
        )
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
            selfStudying: Number(item[5] || 0),
            translate: Number(item[6] || 0),
            useless: Number(item[7] || 0),
            weekWorkload: Number(item[8] || 0),
            weekday: Number(item[9] || 0),
            averageWorkload: Number(item[10] || 0),
            workSaturation: Number(
              ((Number(item[2]) + Number(item[3]) + Number(item[4]) + Number(item[6]))/ Number(item[8])).toFixed(1)
            ) || 0,
            // unescape and remove the double quotes at start and last.
            weekData: unescape(item[13]).replace(/^["|'](.*)["|']$/g, "$1")
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
          /*return `
          ('${item.timeInterval}',${item.weeks},${item.coding},${item.testing}
          ,${item.documentWriting},${item.selfStudying},${item.translate},${item.useless}
          ,${item.weekWorkload},${item.weekday},${item.averageWorkload},${item.workSaturation}
          ,'${item.weekData}');
          `*/
        });
        this.infos = handledData;
        this.importInfos(importData);
        this.drawCharts();
      },
      // 导入本地csv文件
      importCSV(res, file) {
        const that = this;
        const inputDOM = document.querySelector("input");
        inputDOM.addEventListener(
          "change",
          function () {
            importExcel(this.files, function (data) {});
          }, false
        );
        var importExcel = function (files, back) {
          if (!files instanceof FileList) {
            return [];
          }
          let loadIndex = 0;
          // imported file could be multiple
          [].slice.call(files).forEach(function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
              const workbook = XLSX.read(e.target.result, {
                type: "binary"
              });
              const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
              // read excel's work sheet by line.
              let lines = XLSX.utils
                .sheet_to_json(first_worksheet, {
                  header: 1
                })
                .map((line, i) => {
                  return line.map((cell, index) => {
                    return index > 0 && index < 12 ? Number(cell || 0) : cell;
                  });
                });
              loadIndex++;
              if (loadIndex === files.length) {
                that.handleImportData(
                  lines.filter(item => item.length != 0).slice(1)
                );
              }
            };
            reader.readAsBinaryString(file);
          });
        };
      },
      // 切换表格风格
      switchChartType(status) {
        this.switchStatus = status;
      },
      // 创建富文本编辑器
      createIceEditor() {
        const e = new ice.editor('editor');
        e.menu = [
          'backColor', //字体背景颜色
          'fontSize', //字体大小
          'foreColor', //字体颜色
          'bold', //粗体
          'italic', //斜体
          'underline', //下划线
          'strikeThrough', //删除线
          'justifyLeft', //左对齐
          'justifyCenter', //居中对齐
          'justifyRight', //右对齐
          'indent', //增加缩进
          'outdent', //减少缩进
          'insertOrderedList', //有序列表
          'insertUnorderedList', //无序列表
          'superscript', //上标
          'subscript', //下标
          'createLink', //创建连接
          'unlink', //取消连接
          'insertHorizontalRule', //水平线
          'table', //表格
          'files', //附件
          'music', //音乐
          'video', //视频
          'insertImage', //图片
          'removeFormat', //格式化样式
          'code', //源码
        ];
        e.create();
      },
      // 当开始日变化时，更改结束日的选择范围
      startDateOnChange() {
        const that = this;
        let sameIndex = 0;
        this.endList.forEach((item, index) => {
          if (item.value === that.startDate) {
            sameIndex = index;
          }
        });
        this.endList = [...this.endList].slice(sameIndex, this.endList.length);
      }
    }
  };
</script>