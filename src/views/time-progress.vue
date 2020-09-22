<template>
  <div class="main-body" v-cloak>
    <Button @click="refresh" style="margin: 0 0 0 10px;">refresh</Button>
    <Row :gutter="10">
      <Col :span="12">
        <div>
          <Card class="progress-card">
            <div class="card-top-title">Year</div>
            <div>
              <Progress text-inside :stroke-width="64" :percent="transProgress(getYearProgress())" />
            </div>
            <label class="card-bottom-text">
              {{ getYearRestDays() }} days until the end of
              {{ this.currentDate.getFullYear() }}
            </label>
          </Card>
        </div>
      </Col>
      <Col :span="12">
        <div>
          <Card class="progress-card">
            <div class="card-top-title">Month</div>
            <div>
              <Progress
                text-inside
                :stroke-width="64"
                :percent="transProgress(getMonthProgress())"
              />
            </div>
            <label class="card-bottom-text">
              {{ getMonthRestDays() }} days until the end of
              {{ this.months[this.currentDate.getMonth()] }}
            </label>
          </Card>
        </div>
      </Col>
    </Row>
    <Row :gutter="10">
      <Col :span="12">
        <div>
          <Card class="progress-card">
            <div class="card-top-title">Week</div>
            <div>
              <Progress text-inside :stroke-width="64" :percent="transProgress(getWeekProgress())" />
            </div>
            <label class="card-bottom-text">{{ getWeekRestDays() }} days until the end of this week</label>
          </Card>
        </div>
      </Col>
      <Col :span="12">
        <div>
          <Card class="progress-card">
            <div class="card-top-title">Day</div>
            <div>
              <Progress text-inside :stroke-width="64" :percent="transProgress(getDayProgress())" />
            </div>
            <label class="card-bottom-text">{{ getDayRestHours() }} hours until the end of this day</label>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<style>
[v-cloak] {
  display: none;
}

.main-body {
  margin: 50px 280px;
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

export default {
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
    };
  },
  methods: {
    // 将进度转换为进度条控件需要的格式
    transProgress(progress) {
      return parseFloat((progress * 100).toFixed(2));
    },
    // 当天过去的小时数
    getCurrentDayPastHours() {
      return (
        this.currentDate.getHours() +
        this.currentDate.getMinutes() / 60 +
        this.currentDate.getSeconds() / 3600
      );
    },
    // 天 的进度
    getDayProgress() {
      return this.getCurrentDayPastHours() / 24;
    },
    // 距离这天结束还剩多少小时
    getDayRestHours() {
      return 23 - this.currentDate.getHours();
    },
    // 周 的进度
    getWeekProgress() {
      return (
        (this.currentDate.getDay() - 1) / 7 +
        this.getCurrentDayPastHours() / (7 * 24)
      );
    },
    // 距离这周结束还剩多少天
    getWeekRestDays() {
      return 7 - this.currentDate.getDay();
    },
    // 当前月份有多少天
    getDayCount() {
      return moment().endOf("month").get("date");
    },
    // 月 的进度
    getMonthProgress() {
      return (
        ((this.currentDate.getDate() - 1) * 24 +
          this.getCurrentDayPastHours()) /
        (this.getDayCount() * 24)
      );
    },
    // 距离这月结束还剩多少天
    getMonthRestDays() {
      return this.getDayCount() - this.currentDate.getDate();
    },
    // 年 的进度
    getYearProgress() {
      const dayCount =
        moment().endOf("year").diff(moment().startOf("year"), "days") + 1;
      return (
        ((dayCount - this.getYearRestDays() + 1) * 24 +
          this.getCurrentDayPastHours()) /
        (dayCount * 24)
      );
    },
    // 距离这年结束还剩多少天
    getYearRestDays() {
      return moment().endOf("year").diff(moment(), "days");
    },
    // 刷新页面
    refresh() {
      location.reload();
    },
  },
};
</script>