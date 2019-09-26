<template>
  <div>
    <Row type="flex" justify="start" align="middle">
      <Col span="4">
        <p>日期：{{ currentDate }}</p>
      </Col>
      <Col span="4" offset="16">
        <Button @click="openEditDialog" type="primary">编辑</Button>
      </Col>
    </Row>

    <Table size="large" :columns="title" :data="tableData.workInfos"></Table>
    <p>总计 {{ tableData.sumCost }}</p>
    <Input
      v-model="tableData.ps"
      type="textarea"
      placeholder="备注"
      :autosize="{minRows: 3, maxRows: 5}"
      :readonly="true"
      style="width: 100%"
    />
    <Modal v-model="editDialogShown" title="填写日报" width="80%" :mask-closable="false">
      <div slot="footer">
        <Button :loading="loading" @click="cancel">取消</Button>
        <Button type="primary" :loading="loading" @click="save">
          <span v-if="!loading">保存</span>
          <span v-else>保存中...请稍后</span>
        </Button>
      </div>
      <addMyDaily :form-data="formData" :ps="tableData.ps"></addMyDaily>
    </Modal>
  </div>
</template>
<script>
import addMyDaily from "./addMyDaily";

export default {
  props: {
    tableData: Object
  },
  components: {
    addMyDaily
  },
  computed: {
    currentDate() {
      const date = this.tableData.date;
      return date
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : "未选择";
    }
  },
  data() {
    return {
      title: [
        {
          title: "事项",
          key: "workName"
        },
        {
          title: "花费时间",
          key: "cost"
        },
        {
          title: "工作内容",
          key: "workCategory"
        }
      ],
      formData: {},
      editDialogShown: false,
      loading: false
    };
  },
  methods: {
    openEditDialog() {
      this.formData = {
        items: Object.assign([], this.tableData.workInfos),
        ps: this.tableData.ps,
        date: this.tableData.date
      };
      this.loading = false;
      this.editDialogShown = true;
    },
    save() {
      // save put
      this.loading = true;
      this.tableData.ps = this.formData.ps;
      this.tableData.workInfos = Object.assign([], this.formData.items);
      this.tableData.sumCost = this.formData.sumCost;
      this.editDialogShown = false;
    },
    cancel() {
      this.editDialogShown = false;
    }
  }
};
</script>
