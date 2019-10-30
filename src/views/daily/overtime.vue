<template>
  <div style="padding: 0 10px">
    <div id="overtimeChart" class="overtime-div"></div>
    <Button size="large" icon="md-add" type="primary" :loading="loading" @click="openAddDialog">填写记录</Button>
    <Table border :columns="columns" :data="infos" :loading="loading" ellipsis max-height="600" style="margin: 20px 0">
    </Table>
    <overtimeAdd :overtimeAddShown="overtimeAddShown" :settings="settings" @close-add-dialog="closeAddDialog"
      @save="save"></overtimeAdd>
  </div>
</template>
<style>
  .overtime-div {
    width: 1000px;
    height: 200px;
  }
</style>
<script>
  import overtimeAdd from "./overtimeAdd";

  export default {
    components: {
      overtimeAdd
    },
    data() {
      return {
        columns: [{
            type: "index",
            maxWidth: 60
          },
          {
            title: "加班日期(yy/mm/dd)",
            key: "overtimeDate",
            minWidth: 80
          },
          {
            title: "下班时间(hh:mm)",
            key: "offWorkTime"
          },
          {
            title: "该日工作时长(h)",
            key: "worktime"
          },
          {
            title: "加班时长(h)",
            key: "overtimeHours"
          },
          {
            title: "加班内容",
            key: "workContent"
          },
          {
            title: "是否自主加班",
            key: "isVolunteer"
          },
          {
            title: "地点",
            key: "location"
          },
          {
            title: "项目组",
            key: "groupName"
          },
          {
            title: "备注",
            key: "note"
          }
        ],
        infos: [],
        loading: true,
        overtimeAddShown: false,
        settings: {}
      };
    },
    mounted() {
      this.getLocationsAndGroupNames();
    },
    methods: {
      // open overtime add dialog
      openAddDialog() {
        this.overtimeAddShown = true;
      },
      // close overtime add dialog
      closeAddDialog() {
        this.overtimeAddShown = false;
      },
      // save overtime record and update settings.
      save(record, settings) {
        const transRecord = record;
        // TODO: 共通化
        const offWorkTime = record.time
          .split(":")
          .map(time => parseInt(time));
        let worktime = 0;
        if (offWorkTime[0] < 18) {
          worktime = offWorkTime[0] + 14 + offWorkTime[1] / 60;
        } else {
          worktime = offWorkTime[0] - 9 + offWorkTime[1] / 60;
        }
        transRecord.workTime = parseFloat(worktime.toFixed(1));
        transRecord.overtimeHours = parseInt((worktime - 8).toFixed(1));

        this.$http.put("/api/myDaily/updateSettings", [
          settings.locations.join('|'),
          settings.groupNames.join('|'),
          ""
        ], {}).then(response => {
          this.$http.post("/api/myDaily/addOvertimeRecord",
            Object.entries(transRecord).map(arr => arr[1])
          , {}).then(response => {
            this.overtimeAddShown = false;
          });
        });
      },
      // get settings from db. only need locations and groupNames here.
      getLocationsAndGroupNames() {
        this.$http.get("/api/myDaily/getSettings", {}).then(data => {
          const settings = data.body[0];
          this.settings.locations = settings.locations.split('|');
          this.settings.groupNames = settings.groupNames.split('|');
          this.loading = false;
        });
      }
    }
  };
</script>