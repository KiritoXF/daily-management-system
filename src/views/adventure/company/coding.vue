<template>
  <Row style="height: 750px;">
    <Col span="6">
      <p>Message</p>
      <p v-for="(message, index) in displayLog" :key="index">{{ message.content }}</p>
    </Col>
    <Col span="12">
      <!-- <Button @click="addTestMessage">test button</Button> -->
      <Button @click="coding" :disabled="codingDisabled">
        <Progress :percent="codingProgress" />
        <p>Tap one line code</p>
      </Button>
      <Button @click="overtime" :disabled="overTimeDisabled" v-show="numbers >= 10">overtime</Button>

      <div v-for="(emp,index) in employees" :key="index">
        <Tooltip :content="`cost ${emp.cost}`" placement="right">
          <CellGroup>
            <Cell :disabled="money < emp.cost" @click.native="hiring(index)" 
            v-show="index > 0 ? employees[index - 1].numbers >= 5 : true">hire a {{ emp.title }}</Cell>
          </CellGroup>
        </Tooltip>
      </div>
    </Col>
    <Col span="6">
      <CellGroup>
        <Cell>money: {{ money }} ( + {{ incomePerSec }} / second )</Cell>
        <Cell
          v-for="emp in employees"
          :key="emp.title"
          v-show="emp.numbers > 0"
        >{{ emp.title }} : {{ emp.numbers }}</Cell>
      </CellGroup>
    </Col>
  </Row>
</template>

<script>
export default {
  data() {
    return {
      logs: [],
      percent: 0,
      money: 1110,
      codingDisabled: false,
      overTimeDisabled: false,
      codingProgress: 0,
      player: {
        rebirthCount: 0,
        clickSalary: 1,
        clickAddition: 0,
        addition: 0
      },
      employees: [
        { numbers: 0, cost: 10, income: 1, title: "level1 programmer" },
        { numbers: 0, cost: 30, income: 5, title: "level2 programmer" },
        { numbers: 0, cost: 100, income: 10, title: "level3 programmer" },
        { numbers: 0, cost: 300, income: 50, title: "leader" },
        { numbers: 0, cost: 500, income: 100, title: "pm" }
      ]
    };
  },
  mounted() {
    this.initTimeInterval();
  },
  computed: {
    displayLog() {
      this.logs = this.logs.splice(-20);
      return this.logs;
    },
    // calculate the number of employee
    numbers() {
      let sum = 0;
      this.employees.forEach(emp => (sum += emp.numbers));
      return sum;
    },
    // calculate the income per second
    incomePerSec() {
      let income = 0;
      this.employees.forEach((emp, index) => {
        income += emp.numbers * emp.income;
      });
      return parseFloat((income * (1 + this.player.addition) * (0.2 * this.player.rebirthCount + 1)).toFixed(1)) || 0;
    }
  },
  watch: {
    // if the count of employees changed, reset the timeInterval
    numbers() {
      window.clearInterval(this.ticker);
      const me = this;
      this.ticker = window.setInterval(() => {
        let basicIncome = 0;
        me.employees.forEach((emp, index) => {
          basicIncome += emp.numbers * emp.income;
        });

        me.money = parseFloat(
          (me.money + basicIncome * (1 + me.player.addition)).toFixed(1)
        );
      }, 1000);
    }
  },
  methods: {
    // use for test
    addTestMessage() {
      const len = this.logs.length;
      this.logs.push({
        id: new Date().getTime(),
        content: "test message" + len
      });
    },
    // write log
    writeLog(message) {
      this.logs.push({
        id: this.logs.length,
        content: message
      });
    },
    // set time interval
    initTimeInterval() {
      window.clearInterval(this.logTimer);
      this.logTimer = window.setInterval(() => {
        if (this.logs.length > 10) {
          this.logs.splice(0, 1);
        }
      }, 5500);
    },
    // tap one line code
    coding() {
      this.codingDisabled = true;
      const clickIncome =
        this.player.clickSalary *
        (1 + this.player.clickAddition) *
        (1 + this.player.addition);
      const codingInterval = window.setInterval(() => {
        this.codingProgress += 10;
        if (this.codingProgress >= 100) {
          this.money += parseFloat(clickIncome.toFixed(1));
          this.codingDisabled = false;
          this.codingProgress = 0;
          this.writeLog(`You tapped one line code and earned ${clickIncome}`);
          window.clearInterval(codingInterval);
        }
      }, 200);
    },
    // overtime
    overtime() {
      this.player.addition += 0.3;
      this.overTimeDisabled = true;
      this.writeLog('996 - ICU started!');
      setTimeout(() => {
        this.player.addition -= 0.3;
        this.overTimeDisabled = false;
        this.writeLog('Let them take a break.')
      }, 10000);
    },
    // hire employee
    hiring(level) {
      if (this.money >= this.employees[level].cost) {
        this.employees[level].numbers++;
        this.money = parseFloat(
          (this.money - this.employees[level].cost).toFixed(1)
        );
        this.employees[level].cost = parseFloat(
          (1.5 * this.employees[level].cost).toFixed(1)
        );
        this.writeLog(`You have hired a ${this.employees[level].title}`);
      }
    }
  }
};
</script>