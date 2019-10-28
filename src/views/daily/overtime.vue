<template>
  <div style="padding: 0 10px">
    <div id="overtimeChart" class="overtime-div"></div>
    <Button size="large" icon="md-add" type="primary" :loading="loading" @click="addOvertime">填写记录</Button>
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
            key: "date",
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
      addOvertime() {
        this.overtimeAddShown = true;
      },
      closeAddDialog() {
        this.overtimeAddShown = false;
      },
      save(record, settings) {
        // do sth.
        this.$http.put("/api/myDaily/updateSettings", [
          settings.locations,
          settings.groupNames,
          []
        ], {}).then(response => {
          this.overtimeAddShown = false;
        });
      },
      //
      getLocationsAndGroupNames() {
        this.loading = false;
        /** 
        this.$http.get("/api/myDaily/getSettings", {}).then(data => {
          const settings = data.body[0];
          this.settings.locations = settings.locations.substring(1, settings.locations.length - 1);
          this.settings.groupNames = settings.groupNames.substring(1, settings.groupNames.length - 1);
          this.loading = false;
        });
        */
      }
    }
  };
</script>