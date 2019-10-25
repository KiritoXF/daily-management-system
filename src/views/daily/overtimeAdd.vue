<template>
  <div>
    <Modal
      v-model="overtimeAddShown"
      :mask-closable="false"
      title="Add Overtime record dialog"
      @on-cancel="cancel"
      @on-ok="ok"
      width="750"
      height="750"
    >
      <Form :model="formItem" :label-width="80">
        <FormItem label="加班日期:">
          <DatePicker type="date" placeholder="Select the overtime date" v-model="formItem.date"></DatePicker>
        </FormItem>
        <FormItem label="下班时间:">
          <TimePicker
            format="HH:mm"
            :steps="[1, 10]"
            placeholder="Select off work time"
            v-model="formItem.time"
          ></TimePicker>
        </FormItem>
        <FormItem label="工作时长:">{{ worktime || 0 }}h</FormItem>
        <FormItem label="加班时长:">{{ worktime - 8 || 0 }}h</FormItem>
         <FormItem label="加班内容:">  </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    overtimeAddShown: Boolean
  },
  data() {
    return {
      formItem: {}
    };
  },
  computed: {
    worktime() {
      if (!this.formItem.time) {
        return;
      }
      const offWorkTime = this.formItem.time.split(":");
      let worktime = 0;
      if (offWorkTime[0] < 18) {
        worktime = parseInt(offWorkTime[0]) + 14 + offWorkTime[1] / 60;
      } else {
        worktime = offWorkTime[0] - 18 + offWorkTime[1] / 60;
      }
      return parseFloat(worktime.toFixed(1));
    }
  },
  methods: {
    // cancel button's callback
    cancel() {
      this.$emit("close-add-dialog");
    },
    // ok button's callback
    ok() {
      this.$emit("save");
    }
  }
};
</script>