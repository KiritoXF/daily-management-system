<!--
    每周的日报
-->
<template>
  <div style="padding: 50px">
    <Row type="flex" justify="start" align="middle">
      <Col span="3">
      <p>选择本周起止时间</p>
      </Col>
      <Col span="4">
      <DatePicker type="daterange" :value="timeInterval" @on-change="changeCurrentWeek" :options="weekOptions"
        placeholder="选择本周日报日期" style="width: 200px"></DatePicker>
      </Col>
      <Col span="2">
      <p>选择周数</p>
      </Col>
      <Col span="3">
      <InputNumber :min="1" v-model="weekNumber"></InputNumber>
      </Col>
      <Col span="4" offset="8">
      <Tooltip content="保存当前周报" placement="top">
        <Button type="success" @click="save" :disabled="loading">
          <span v-if="!loading">保存周报</span>
          <span v-else>保存中...请稍后</span>
        </Button>
      </Tooltip>
      <Button @click="goBack">返回</Button>
      </Col>
    </Row>
    <Divider />
    <Tabs type="card">
      <TabPane label="详情">
        <label>切换表格风格</label>
        <Switch size="large" @on-change="switchChartType">
          <span slot="close" style="width: 200px">严肃</span>
          <span slot="open">卡通</span>
        </Switch>
        <Row>
          <Col span="10">
          <Table size="small" :columns="tableTitle" :data="weekDetail" show-summary></Table>
          </Col>
          <Col span="14">
          <div id="weekSumCostEChart" class="canvas-div" v-show="!switchStatus"></div>
          <div id="weekSumCostVizChart" v-show="switchStatus"></div>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="周一">
        <weekdayDailyDisplay :table-data="weekData.monday"></weekdayDailyDisplay>
      </TabPane>
      <TabPane label="周二">
        <weekdayDailyDisplay :table-data="weekData.tuesday"></weekdayDailyDisplay>
      </TabPane>
      <TabPane label="周三">
        <weekdayDailyDisplay :table-data="weekData.wednesday"></weekdayDailyDisplay>
      </TabPane>
      <TabPane label="周四">
        <weekdayDailyDisplay :table-data="weekData.thursday"></weekdayDailyDisplay>
      </TabPane>
      <TabPane label="周五">
        <weekdayDailyDisplay :table-data="weekData.friday"></weekdayDailyDisplay>
      </TabPane>
      <TabPane label="周六">
        <weekdayDailyDisplay :table-data="weekData.saturday"></weekdayDailyDisplay>
      </TabPane>
      <TabPane label="周日">
        <weekdayDailyDisplay :table-data="weekData.sunday"></weekdayDailyDisplay>
      </TabPane>
    </Tabs>
  </div>
</template>

<style>
  .canvas-div {
    width: 600px;
    height: 400px;
  }
</style>

<script>
  import weekdayDailyDisplay from "./weekdayDailyDisplay";
  import buildEChart from "../../js/chart/buildEChart";
  import buildVizChart from "../../js/chart/buildVizChart";

  export default {
    components: {
      weekdayDailyDisplay
    },
    mounted() {
      this.$http
        .get("/api/myDaily/getSelectedWeek", {
          params: {
            weekNum: this.$router.history.current.query.weekNum
          }
        })
        .then(data => {
          const infos = data.body[0];
          if (infos == null) {
            return;
          }
          this.updateFlag = this.$router.history.current.query.updateFlag;
          this.weekData = JSON.parse(infos.weekData);
          this.weekData.monday.date = new Date(this.weekData.monday.date);
          this.weekData.tuesday.date = new Date(this.weekData.tuesday.date);
          this.weekData.wednesday.date = new Date(this.weekData.wednesday.date);
          this.weekData.thursday.date = new Date(this.weekData.thursday.date);
          this.weekData.friday.date = new Date(this.weekData.friday.date);
          this.weekData.saturday.date = new Date(this.weekData.saturday.date);
          this.weekData.sunday.date = new Date(this.weekData.sunday.date);
          this.timeInterval = infos.timeInterval.split("-").map(item => {
            return (
              item.slice(0, 4) + "-" + item.slice(4, 6) + "-" + item.slice(6, 8)
            );
          });
          this.weekNumber = infos.weeks;
        });
    },
    computed: {
      weekDetail() {
        const dataMap = this.calculateDailyCost(this.weekData);
        const weekDetail = [];
        const week = ["月", "火", "水", "木", "金", "土", "日"];
        const startDate = new Date(this.timeInterval[0]);

        dataMap.forEach((value, key) => {
          weekDetail.push({
            coding: value.coding,
            testing: value.testing,
            documentWriting: value.documentWriting,
            selfStudying: value.selfStudying,
            translate: value.translate,
            useless: value.useless
          });
        });
        weekDetail.map((item, i) => {
          item.weekday = week[i];
          item.date =
            this.timeInterval === "" ?
            "" :
            new Date(
              new Date(startDate).getTime() + 60 * 60 * 24 * 1000 * i
            ).toLocaleDateString();
        });
        // build chart
        if (document.getElementById("weekSumCostEChart") != null) {
          buildEChart.buildBarEChart(
            "weekSumCostEChart",
            this.getSumCostByCategoryOneWeek(dataMap),
            ["编码", "测试", "文档编写", "自学", "翻译", "准备工作"],
            "各种类工作时长直方图"
          );
          buildVizChart.buildBarChart(
            "#weekSumCostVizChart",
            this.getSumCostByCategoryOneWeek(dataMap),
            ["编码", "测试", "文档编写", "自学", "翻译", "准备工作"],
            "各种类工作时长直方图",
            600,
            400
          );
        }
        return weekDetail;
      }
    },
    data() {
      return {
        loading: false,
        weekNumber: 1,
        timeInterval: "",
        updateFlag: false,
        weekData: {
          monday: {
            date: "",
            workInfos: [],
            ps: "",
            sumCost: 0
          },
          tuesday: {
            date: "",
            workInfos: [],
            ps: "",
            sumCost: 0
          },
          wednesday: {
            date: "",
            workInfos: [],
            ps: "",
            sumCost: 0
          },
          thursday: {
            date: "",
            workInfos: [],
            ps: "",
            sumCost: 0
          },
          friday: {
            date: "",
            workInfos: [],
            ps: "",
            sumCost: 0
          },
          saturday: {
            date: "",
            workInfos: [],
            ps: "",
            sumCost: 0
          },
          sunday: {
            date: "",
            workInfos: [],
            ps: "",
            sumCost: 0
          }
        },
        weekOptions: {
          shortcuts: [{
            text: "本周",
            value() {
              const currentDate = new Date();
              const start = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - currentDate.getDay() + 1
              );
              const end = new Date(start);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 6);
              return [start, end];
            }
          }]
        },
        tableTitle: [{
            title: "星期",
            key: "weekday",
            width: "60"
          },
          {
            title: "日期",
            key: "date"
          },
          {
            title: "编码",
            key: "coding",
            width: "60"
          },
          {
            title: "测试",
            key: "testing",
            width: "60"
          },
          {
            title: "文档编写",
            key: "documentWriting",
            width: "60"
          },
          {
            title: "自学",
            key: "selfStudying",
            width: "60"
          },
          {
            title: "翻译",
            key: "translate",
            width: "60"
          },
          {
            title: "准备工作",
            key: "useless",
            width: "60"
          }
        ],
        switchStatus: false
      };
    },
    methods: {
      // 将当前周的日报信息提交至数据库(add or update)
      save() {
        this.loading = true;
        let infos = this.getFormattedData(this.weekData);
        infos.push(JSON.stringify(this.weekData));

        if (this.updateFlag) {
          this.openConfirmDailog(infos);
        } else {
          this.$http
            .post(
              "/api/myDaily/importOriginData", {
                infos: [infos]
              }, {}
            )
            .then(response => {
              this.goBack();
            });
        }
      },
      // update时打开确认对话框
      openConfirmDailog(infos) {
        this.$Modal.confirm({
          title: this.$i18n.t("daily.updateConfirmationDialog"),
          content: this.$i18n.t("daily.updateConfirmationMessage"),
          loading: true,
          onOk: () => {
            this.$http.put("/api/myDaily/updateWeekData", {
              infos: infos,
              weeks: this.$router.history.current.query.weekNum
            }, {}).then(response => {
              this.$Modal.remove();
              this.goBack();
            });
          },
          onCancel: () => {
            this.loading = false;
          }
        });
      },
      // 返回总的日报界面
      goBack() {
        this.$router.push("/myDaily");
      },
      // 处理起止时间的字符串
      transformTimeInterval(timeInterval) {
        if (timeInterval === "") {
          return "未指定";
        }
        const start = timeInterval[0].split("-");
        const end = timeInterval[1].split("-");
        return `${start[0]}${start[1]}${start[2]}-${end[0]}${end[1]}${end[2]}`;
      },
      // 汇总每天日报的各种类工作时长
      calculateDailyCost(weekData) {
        const mondayMap = new Map();
        const tuesdayMap = new Map();
        const wednesdayMap = new Map();
        const thursdayMap = new Map();
        const fridayMap = new Map();
        const saturdayMap = new Map();
        const sundayMap = new Map();

        mondayMap.set("monday", this.getEveryCategoryCost(weekData.monday.workInfos));
        tuesdayMap.set("tuesday", this.getEveryCategoryCost(weekData.tuesday.workInfos));
        wednesdayMap.set("wednesday", this.getEveryCategoryCost(weekData.wednesday.workInfos));
        thursdayMap.set("thursday", this.getEveryCategoryCost(weekData.thursday.workInfos));
        fridayMap.set("friday", this.getEveryCategoryCost(weekData.friday.workInfos));
        saturdayMap.set("saturday", this.getEveryCategoryCost(weekData.saturday.workInfos));
        sundayMap.set("sunday", this.getEveryCategoryCost(weekData.sunday.workInfos));
        const mergedMap = new Map([
          ...mondayMap,
          ...tuesdayMap,
          ...wednesdayMap,
          ...thursdayMap,
          ...fridayMap,
          ...saturdayMap,
          ...sundayMap
        ]);
        return mergedMap;
      },
      // 根据Map计算各种类工作一周内的总时长
      getSumCostByCategoryOneWeek(mergedMap) {
        let coding = 0,
          testing = 0,
          documentWriting = 0,
          selfStudying = 0,
          translate = 0,
          useless = 0;
        mergedMap.forEach((value, key) => {
          coding += value.coding;
          testing += value.testing;
          documentWriting += value.documentWriting;
          selfStudying += value.selfStudying;
          translate += value.translate;
          useless += value.useless;
        });
        return [coding, testing, documentWriting, selfStudying, translate, useless];
      },
      // 制造往后台传的数据类型
      getFormattedData(weekData) {
        const timeInterval = this.transformTimeInterval(this.timeInterval);

        let weekWorkload =
          weekData.monday.sumCost +
          weekData.tuesday.sumCost +
          weekData.wednesday.sumCost +
          weekData.thursday.sumCost +
          weekData.friday.sumCost +
          weekData.saturday.sumCost +
          weekData.sunday.sumCost;

        let weekday =
          (weekData.monday.sumCost > 0 ? 1 : 0) +
          (weekData.tuesday.sumCost > 0 ? 1 : 0) +
          (weekData.wednesday.sumCost > 0 ? 1 : 0) +
          (weekData.thursday.sumCost > 0 ? 1 : 0) +
          (weekData.friday.sumCost > 0 ? 1 : 0) +
          (weekData.saturday.sumCost > 0 ? 1 : 0) +
          (weekData.sunday.sumCost > 0 ? 1 : 0);

        const sumCategoryCost = this.getSumCostByCategoryOneWeek(
          this.calculateDailyCost(weekData)
        );

        return [
          timeInterval, this.weekNumber, sumCategoryCost, weekWorkload, weekday,
          Number((weekWorkload / weekday).toFixed(1)),
          Number(((sumCategoryCost[0] + sumCategoryCost[1] + sumCategoryCost[2]) / weekWorkload).toFixed(2))
        ].flat();
      },
      // 根据指定天的事项数组获取各类事项的耗费时间
      getEveryCategoryCost(workInfos) {
        let oneDayCost = {
          coding: 0,
          testing: 0,
          documentWriting: 0,
          selfStudying: 0,
          translate: 0,
          useless: 0
        };
        workInfos.map(info => {
          switch (info.workCategory) {
            case "编码":
              oneDayCost.coding += info.cost;
              break;
            case "测试":
              oneDayCost.testing += info.cost;
              break;
            case "文档编写":
              oneDayCost.documentWriting += info.cost;
              break;
            case "自学":
              oneDayCost.selfStudying += info.cost;
              break;
            case "翻译":
              oneDayCost.translate += info.cost;
              break;
            case "准备工作":
              oneDayCost.useless += info.cost;
              break;
            default:
              break;
          }
        });
        return oneDayCost;
      },
      // 日期选择器发生更改时触发
      changeCurrentWeek(daterange) {
        this.timeInterval = daterange;
        const monday = new Date(daterange[0]);
        const currentYear = monday.getFullYear();
        const currentMonth = monday.getMonth();
        const firstWeekday = monday.getDate();

        this.weekData.monday.date = new Date(
          currentYear,
          currentMonth,
          firstWeekday
        );
        this.weekData.tuesday.date = new Date(
          currentYear,
          currentMonth,
          firstWeekday + 1
        );
        this.weekData.wednesday.date = new Date(
          currentYear,
          currentMonth,
          firstWeekday + 2
        );
        this.weekData.thursday.date = new Date(
          currentYear,
          currentMonth,
          firstWeekday + 3
        );
        this.weekData.friday.date = new Date(
          currentYear,
          currentMonth,
          firstWeekday + 4
        );
        this.weekData.saturday.date = new Date(
          currentYear,
          currentMonth,
          firstWeekday + 5
        );
        this.weekData.sunday.date = new Date(
          currentYear,
          currentMonth,
          firstWeekday + 6
        );
      },
      // 切换表格风格
      switchChartType(status) {
        this.switchStatus = status;
      }
    }
  };
</script>