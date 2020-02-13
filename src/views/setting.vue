<template>
  <div style="margin: 0 200px;">
    <h2>{{ $t("setting.setting") }}</h2>
    <Divider />
    <h3>{{ $t('language') }}</h3>
    <RadioGroup v-model="locale">
      <Radio :label="$t('language.zh_CN')" border></Radio>
      <Radio :label="$t('language.en')" border disabled></Radio>
      <Radio :label="$t('language.ja')" border disabled></Radio>
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

  export default {
    components: {
      panel
    },
    data() {
      return {
        // TODO: 语言可更改
        locale: this.$i18n.t('language.zh_CN'),
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
    },
    methods: {
      save() {

      }
    }
  };
</script>