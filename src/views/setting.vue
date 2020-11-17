<template>
  <div style="margin: 0 200px;">
    <h2>{{ $t("setting.setting") }}</h2>
    <Divider />
    <h3>{{ $t('language') }}</h3>
    <RadioGroup v-model="locale" @on-change="changeLocale">
      <Radio label="zh_CN" border></Radio>
      <Radio label="en" border></Radio>
      <Radio label="ja" border></Radio>
    </RadioGroup>
    <Divider />
    <panel :title="$t('workCategory')" :allKeys="allWorkCategories" :targetKeys="targetWorkCategories"></panel>
    <panel :title="$t('location')" :allKeys="allLocations" :targetKeys="targetLocations"></panel>
    <panel :title="$t('team')" :allKeys="allGroupNames" :targetKeys="targetGroupNames"></panel>
    <Button @click="save" class="save-button">{{ $t("setting.save") }}</Button>
  </div>
</template>

<style>
  .save-button {
    float: right;
    margin: 20px !important;
  }
</style>

<script>
  import panel from './setting/settingPanel';
  import {
    setToken, getToken
  } from '../js/utils/auth'

  export default {
    components: {
      panel
    },
    data() {
      return {
        locale: getToken('lang'),
        allWorkCategories: [],
        targetWorkCategories: [],
        allLocations: [],
        targetLocations: [],
        allGroupNames: [],
        targetGroupNames: [],
        settings: {}
      };
    },
    mounted() {
      this.$http.get("/api/myDaily/getSettings", {}).then(data => {
        if (data.body) {
          this.settings = data.body[0];
          this.targetWorkCategories = this.settings.workCategories.split('|');
          this.allWorkCategories = this.settings.allWorkCategories.split('|').map(item => {return {key: item, value: item}});
          this.targetLocations = this.settings.locations.split('|');
          this.allLocations = this.settings.allLocations.split('|').map(item => {return {key: item, value: item}});
          this.targetGroupNames = this.settings.groupNames.split('|');
          this.allGroupNames = this.settings.allGroupNames.split('|').map(item => {return {key: item, value: item}});
          if (!getToken('lang')) {
            this.locale = this.settings.language;
            setToken('lang', this.locale);
          }
        }
        this.$i18n.locale = this.locale;
      });

    },
    methods: {
      save() {
        console.log('');
      },
      // 更改语言
      changeLocale(locale) {
        setToken('lang', locale)
        this.$i18n.locale = locale;
      }
    }
  };
</script>