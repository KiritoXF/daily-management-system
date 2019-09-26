<template>
  <Modal v-model="detailShown" @on-ok="ok" @on-cancel="cancel" width="750" height="750">
    <Row>
      <Col span="18">
        <!-- card name -->
        <Row>
          <Col span="2">
            <Icon type="md-card"></Icon>
          </Col>
          <Col span="22">
            <h2>{{ todo.name }}</h2>
            <p>在列表 {{ listName }} 中</p>
          </Col>
        </Row>
        <!-- card detail -->
        <Row style="margin: 10px 0">
          <Col span="2">
            <Icon type="md-menu"></Icon>
          </Col>
          <Col span="22">
            <h2>detail</h2>
            <CellGroup>
              <Cell
                title="add detail message to this todo."
                v-show="!textareaShown && detail === ''"
                @click.native="editDetail"
              ></Cell>
              <Cell
                :title="detail"
                v-show="!textareaShown && detail !== ''"
                @click.native="editDetail"
              ></Cell>
            </CellGroup>
            <Input
              v-show="textareaShown"
              v-model="inputDetail"
              type="textarea"
              placeholder="add detail message to this todo."
              :autosize="{maxRows:5,minRows: 5}"
            />
            <Button
              v-show="textareaShown"
              type="success"
              @click="saveDetail"
              style="margin: 8px 0"
            >save</Button>
            <Button v-show="textareaShown" icon="md-close" shape="circle" @click="closeDetail"></Button>
          </Col>
        </Row>
        <!-- card comment -->
        <Row>
          <Col span="2">
            <Icon type="md-chatboxes"></Icon>
          </Col>
          <Col span="22">
            <h2>Comment</h2>
            <CellGroup style="margin: 0 0 10px 0">
              <Cell title="add comment." v-show="!commentTextareaShown" @click.native="editComment"></Cell>
            </CellGroup>
            <Input
              v-show="commentTextareaShown"
              v-model="inputComment"
              type="textarea"
              placeholder="add detail message to this todo."
              :autosize="{maxRows:5,minRows: 5}"
            />
            <Button
              v-show="commentTextareaShown"
              type="success"
              @click="saveComment"
              :disabled="inputComment.trim() === ''"
              style="margin: 8px 0"
            >save</Button>
            <Button
              v-show="commentTextareaShown"
              icon="md-close"
              shape="circle"
              @click="closeComment"
            ></Button>
            <div v-for="comment in comments" :key="comment.id">
              <Card style="width:320px">{{ comment.name }}</Card>
              <a>edit</a> -
              <a>delete</a>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span="6" style="padding: 0px 10px">
        <CellGroup>
          <p>add to this card</p>
          <Cell title="Only show titles" />
          <Cell title="Only show titles" />
          <Cell title="Only show titles" />
          <Cell title="Only show titles" />
          <Cell title="Display label content" label="label content" />
          <p>operation</p>
          <Cell title="Only show titles" />
          <Cell title="Only show titles" />
          <Cell title="Only show titles" />
          <Cell title="Only show titles" />
          <Cell title="Only show titles" />
        </CellGroup>
      </Col>
    </Row>
  </Modal>
</template>
<script>
export default {
  props: {
    todo: Object,
    todoDetailShown: Boolean,
    listName: String
  },
  computed: {
    detailShown: {
      get() {
        return this.todoDetailShown;
      },
      set() {}
    }
  },
  data() {
    return {
      textareaShown: false,
      commentTextareaShown: "",
      detail: "",
      inputDetail: "",
      comments: [],
      inputComment: ""
    };
  },
  methods: {
    // cancel button's callback
    cancel() {
      this.$emit("close-detail-dialog");
    },
    // ok button's callback
    ok() {
      this.$emit("submit");
    },
    // go to edit detail cell
    editDetail() {
      this.textareaShown = true;
    },
    // save detail and close it
    saveDetail() {
      if (this.inputDetail.trim() === "") {
        return;
      }
      this.detail = this.inputDetail;
      this.closeDetail();
    },
    // close detail-edit
    closeDetail() {
      this.textareaShown = false;
      this.inputDetail = "";
    },
    //
    editComment() {
      this.commentTextareaShown = true;
    },
    //
    saveComment() {
      if (this.inputComment.trim() === "") {
        return;
      }
      const length = this.comments.length;
      this.comments.push({ id: length + 1, name: this.inputComment });
      this.closeComment();
    },
    //
    closeComment() {
      this.commentTextareaShown = false;
      this.inputComment = "";
    }
  }
};
</script>