<template>
  <div>
    <Modal v-model="overtimeAddShown" :mask-closable="false" title="Add Overtime record dialog" @on-cancel="cancel"
      @on-ok="ok" width="450" height="650" :styles="{top: '20px'}">
      <Form :model="record" :label-width="100">
        <FormItem label="加班日期:">
          <DatePicker type="date" placeholder="Select the overtime date" v-model="record.date"></DatePicker>
        </FormItem>
        <FormItem label="下班时间:">
          <TimePicker format="HH:mm" :steps="[1, 10]" placeholder="Select off work time" v-model="record.time">
          </TimePicker>
        </FormItem>
        <FormItem label="工作时长:">{{ worktime || 0 }}h</FormItem>
        <FormItem label="加班时长:">{{ parseInt((worktime - 8).toFixed(1)) || 0 }}h</FormItem>
        <FormItem label="加班内容:">
          <Input v-model="record.workContent" placeholder="what takes your time?" style="width: 200px" />
        </FormItem>
        <FormItem label="是否自主加班">
          <Switch size="large">
            <span slot="open">Yes</span>
            <span slot="close">No</span>
          </Switch>
        </FormItem>
        <FormItem label="地点">
          <Select v-model="record.location" filterable allow-create @on-create="addLocation" style="width: 200px">
            <Option v-for="loc in settings.locations" :value="loc" :key="loc">{{ loc }}</Option>
          </Select>
        </FormItem>
        <FormItem label="项目组">
          <Select v-model="record.groupName" filterable allow-create @on-create="addGroupName" style="width: 200px">
            <Option v-for="name in settings.groupNames" :value="name" :key="name">{{ name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="record.note" type="textarea" :autosize="{minRows: 1,maxRows: 3}" style="width: 200px" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    props: {
      overtimeAddShown: Boolean,
      settings: Object
    },
    data() {
      return {
        record: {},
        locations: [],
        groupNames: []
      };
    },
    computed: {
      worktime() {
        if (!this.record.time) {
          return;
        }
        const offWorkTime = this.record.time
          .split(":")
          .map(time => parseInt(time));
        let worktime = 0;
        if (offWorkTime[0] < 18) {
          worktime = offWorkTime[0] + 14 + offWorkTime[1] / 60;
        } else {
          worktime = offWorkTime[0] - 9 + offWorkTime[1] / 60;
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
        this.$emit("save", this.record, this.settings);
      },
      // Triggered when creating a new location.
      addLocation(val) {
        if (this.settings.locations.includes(val)) {
          this.$Notice.warning({
            title: "已经添加了同名的内容"
          });
        } else {
          this.settings.locations.push(val);
        }
      },
      // Triggered when creating a new group name.
      addGroupName(val) {
        if (this.settings.groupNames.includes(val)) {
          this.$Notice.warning({
            title: "已经添加了同名的内容"
          });
        } else {
          this.settings.groupNames.push(val);
        }
      },

    }
  };
</script>