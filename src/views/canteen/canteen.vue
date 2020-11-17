<template>
  <div class="main-body" v-cloak>
    <Button @click="openAddEvaluationDialog" style="margin: 0 0 0 10px">添加评价</Button>
    <Card>
      <span>食堂</span>
      <Select v-model="model1" style="width: 200px">
        <Option
          v-for="location in cateenLocationList"
          :value="location.value"
          :key="location.value"
          >{{ location.label }}</Option
        >
      </Select>
      <span>档口/店家</span>
      <Select v-model="model1" style="width: 200px">
        <Option
          v-for="store in storeList"
          :value="store.value"
          :key="store.value"
          >{{ store.label }}</Option
        >
      </Select>
      <span>餐品</span>
      <Select v-model="model1" style="width: 200px">
        <Option
          v-for="meal in mealList"
          :value="meal.value"
          :key="meal.value"
          >{{ meal.label }}</Option
        >
      </Select>
      <br />
      <span>查看周期</span>
      <!-- <DatePicker
        type="daterange"
        :value="timeInterval"
        @on-change="changeCurrentWeek"
        :options="weekOptions"
        placeholder="选择查看周期"
        style="width: 200px"
      ></DatePicker> -->
      <Input placeholder="检索内容" />
      <Button @click="refresh">检索</Button>
    </Card>
    <Table border :columns="tableColumn" :data="data5"></Table>
    <AddEvaluationDialog display="addDialogShown" />
  </div>
</template>

<style>
[v-cloak] {
  display: none;
}

.main-body {
  margin: 50px 100px;
}

.ivu-progress-inner-text {
  float: left;
  font-size: 24px !important;
  margin: 16px 0 0 16px !important;
  color: #000000 !important;
}

.progress-card {
  padding: 0 0 30px 0px;
  margin: 10px;
}

.card-top-title {
  float: left;
  margin: 12px 0px;
  font-size: 28px;
}

.card-bottom-text {
  float: right;
  margin: 8px 0px;
}
</style>
<script>
const moment = require("moment");
import AddEvaluationDialog from "./AddEvaluationDialog";

export default {
  components: {
    AddEvaluationDialog,
  },
  data() {
    return {
      currentDate: new Date(),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      tableColumn: [
        {
          title: "日期",
          key: "date",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.date + " " + (params.row.period || "其它")
            );
          },
        },
        {
          title: "餐品",
          key: "meal",
        },
        {
          title: "店家",
          key: "location",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.cateenLocation + " " + params.row.store
            );
          },
        },
        {
          title: "评价",
          key: "evaluation",
        },
      ],
      data5: [
        {
          date: "2020-10-15",
          period: "中午",
          meal: "meat_noodle",
          cateenLocation: "floor1",
          store: "hand_roll_noodle",
          evaluation: 4,
        },
        {
          date: "2020-10-13",
          period: "中午",
          meal: "meat_noodle",
          cateenLocation: "floor1",
          store: "hand_roll_noodle",
          evaluation: 3,
        },
        {
          date: "2020-10-14",
          period: "中午",
          meal: "meat_noodle",
          cateenLocation: "floor1",
          store: "hand_roll_noodle",
          evaluation: 4,
        },
      ],
      // 食堂的楼层或位置
      cateenLocationList: [
        {
          value: "floor1",
          label: "一楼",
        },
        {
          value: "floor2",
          label: "二楼",
        },
        {
          value: "other",
          label: "其它",
        },
      ],
      // 档口/店家
      storeList: [
        {
          value: "shrimp_slip",
          label: "虾滑",
        },
        {
          value: "hand_roll_noodle",
          label: "李氏手擀面",
        },
        {
          value: "other",
          label: "其它",
        },
      ],
      // 餐品
      mealList: [
        {
          value: "meat_noodle",
          label: "肉末拌面",
        },
        {
          value: "meat_rice",
          label: "烤肉拌饭",
        },
        {
          value: "chicken_noodle",
          label: "炝锅鸡肉面",
        },
      ],
      model1: "",
      addDialogShown: false,
    };
  },
  methods: {
    openAddEvaluationDialog() {
      this.addDialogShown = true;
    },
    // 刷新页面
    refresh() {
      location.reload();
    },
  },
};
</script>