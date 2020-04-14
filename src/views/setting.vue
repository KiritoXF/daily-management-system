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
    <panel :title="$t('team')" :allKeys="allTeams" :targetKeys="targetTeams"></panel>
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
  } from '../utils/auth'

  export default {
    components: {
      panel
    },
    data() {
      return {
        // TODO: 语言可更改
        locale: getToken('lang'),
        allWorkCategories: [],
        targetWorkCategories: [],
        allLocations: [],
        targetLocations: [],
        allTeams: [],
        targetTeams: []
      };
    },
    mounted() {
      //TODO: get settings from db
      this.$i18n.locale = this.locale;
    },
    methods: {
      save() {},
      // 更改语言
      changeLocale(locale) {
        setToken('lang', locale)
        this.$i18n.locale = locale;
      }
    }
  };
</script>