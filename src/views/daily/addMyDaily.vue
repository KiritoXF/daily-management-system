<template>
  <div>
    <Form ref="formData" :model="formData" :label-width="80" style="width: 1000px; margin:0 auto;">
      <FormItem>
        <Row>
          <Col span="10">
            <p>日期：{{ currentDate }}</p>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="10" style="margin:0 auto;">
            <p style="text-align: center;">事项</p>
          </Col>
          <Col span="4" style="margin:0 auto;">
            <p style="text-align: center;">花费时间</p>
          </Col>
          <Col span="4" style="margin:0 auto;">
            <p style="text-align: center;">工作内容</p>
          </Col>
        </Row>
      </FormItem>
      <FormItem
        v-for="(item, index) in formData.items"
        :key="index"
        :label="String(index + 1)"
        :prop="'items.' + index + '.value'"
      >
        <Row>
          <Col span="10">
            <Input type="text" v-model="item.workName" placeholder="请输入事项"></Input>
          </Col>
          <Col span="4">
            <InputNumber :min="0" v-model="item.cost" style="margin-left: 10px; width: 100%;"></InputNumber>
          </Col>
          <Col span="4">
            <Select v-model="item.workCategory" style="margin-left: 10px;">
              <Option
                v-for="item in workCategoryList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemove(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="4">
            <Button type="dashed" long @click="handleAdd" icon="md-add"></Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="10">
            <p>总计</p>
          </Col>
          <Col span="4">
            <p style="margin-left: 18px; width: 100%;">{{ sumCost }}</p>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="18">
            <Input
              v-model="formData.ps"
              type="textarea"
              placeholder="备注"
              :autosize="{minRows: 3, maxRows: 5}"
              style="width: 100%"
            />
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  props: {
    formData: Object
  },
  computed: {
    sumCost() {
      let sum = 0;
      if (this.formData.items != null) {
        this.formData.items.map(item => {
          sum += item.cost;
        });
        this.formData.sumCost = sum;
      }
      return sum;
    },
    currentDate() {
      const date = this.formData.date;
      return date
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : "未选择";
    }
  },
  data() {
    return {
      index: 1,
      loading: false,
      workCategoryList: [
        {
          value: "编码",
          label: "编码"
        },
        {
          value: "测试",
          label: "测试"
        },
        {
          value: "文档编写",
          label: "文档编写"
        },
        {
          value: "自学",
          label: "自学"
        },
        {
          value: "翻译",
          label: "翻译"
        },
        {
          value: "准备工作",
          label: "准备工作"
        }
      ]
    };
  },
  methods: {
    // 提交表达，保存
    save(name) {
      let me = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          this.loading = true;
          const infos = me.formData;
          let date = new Date();
          let writeDate = `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}`;
          if (infos.id != null) {
            // update
            me.updateDailyInfo([
              infos.userName || "yh",
              `${infos.date.getFullYear()}-${infos.date.getMonth() +
                1}-${infos.date.getDate()}`,
              infos.assign,
              infos.normalWork,
              infos.overtimeWork,
              infos.projectName,
              infos.extendedField,
              infos.projectAssign,
              infos.firstLevelActivity,
              infos.secondLevelActivity,
              infos.firstLevelModule,
              infos.secondLevelModule,
              infos.workResultType,
              infos.workResult,
              infos.note || "",
              writeDate,
              infos.id
            ]);
          } else {
            // add
            me.addDailyInfo([
              infos.userName,
              `${infos.date.getFullYear()}-${infos.date.getMonth() +
                1}-${infos.date.getDate()}`,
              infos.assign,
              infos.normalWork,
              infos.overtimeWork,
              infos.projectName,
              infos.extendedField,
              infos.projectAssign,
              infos.firstLevelActivity,
              infos.secondLevelActivity,
              infos.firstLevelModule,
              infos.secondLevelModule,
              infos.workResultType,
              infos.workResult,
              infos.note,
              writeDate
            ]);
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 新增
    addDailyInfo(infos) {
      this.$http
        .post("/api/daily/addDailyInfo", { infos: infos }, {})
        .then(response => {
          console.log(response);
          this.goBack();
        });
    },
    // 更新
    updateDailyInfo(infos) {
      this.$http
        .put(
          "/api/daily/updateDailyInfo",
          {
            infos: infos
          },
          {}
        )
        .then(response => {
          console.log(response);
          this.goBack();
        });
    },
    // add item
    handleAdd() {
      this.index = this.formData.items.length + 1;
      this.formData.items.push({
        workName: "",
        cost: 0,
        workCategory: "",
        index: this.index
      });
    },
    handleRemove(index) {
      this.formData.items.splice(index, 1);
    }
  }
};
</script>