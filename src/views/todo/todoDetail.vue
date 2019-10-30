<template>
  <Modal v-model="detailShown" @on-cancel="cancel" width="750" height="750">
    <p slot="footer"></p>
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
      <!-- tags -->
      <Row style="margin: 10px 0">
        <Col span="2">
        <Icon type="md-tag"></Icon>
        </Col>
        <Col span="22">
        <h2>tag</h2>
        <Tag v-for="tag in tags" :key="tag.id" :color="tag.color" :name="tag.id" :fade="false"
          @click.native="openTagDialog" style="width: 40px; height: 25px;">{{ tag.name }}</Tag>
        <Button icon="ios-add" type="dashed" size="small" @click="openTagDialog">add tag</Button>
        <!-- All tags modal -->
        <Modal v-model="tagDialogShown" scrollable title="tags" width="350" :mask="false">
          <p slot="header" style="text-align: center">tag</p>
          <Tag v-for="tag in allTags" :key="tag.id" :color="tag.color" style="width: 100%" :fade="false"
            @click.native="addTag(tag.id)">
            <Icon type="md-checkmark" v-show="tag.checked"></Icon>
          </Tag>
          <p slot="footer"></p>
        </Modal>
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
          <Cell title="add detail message to this todo." v-show="!textareaShown && detail === ''"
            @click.native="editDetail"></Cell>
          <Cell :title="detail" v-show="!textareaShown && detail !== ''" @click.native="editDetail"></Cell>
        </CellGroup>
        <Input v-show="textareaShown" v-model="inputDetail" type="textarea"
          placeholder="add detail message to this todo." :autosize="{maxRows:5,minRows: 5}" />
        <Button v-show="textareaShown" type="success" @click="saveDetail" style="margin: 8px 0">save</Button>
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
        <Input v-show="commentTextareaShown" v-model="inputComment" type="textarea"
          placeholder="add detail message to this todo." :autosize="{maxRows:5,minRows: 5}" />
        <Button v-show="commentTextareaShown" type="success" @click="saveComment" :disabled="inputComment.trim() === ''"
          style="margin: 8px 0">save</Button>
        <Button v-show="commentTextareaShown" icon="md-close" shape="circle" @click="closeComment"></Button>
        <div v-for="comment in comments" :key="comment.id">
          <Card style="width:320px; margin: 10px 0;">{{ comment.content }}</Card>
          <a>edit</a> -
          <a>delete</a>
        </div>
        </Col>
      </Row>
      </Col>
      <!-- right. operate tool -->
      <Col span="6" style="padding: 0px 10px">
      <CellGroup>
        <p>add to this card</p>
        <Cell title="person" />
        <Cell title="tag" @click.native="openTagDialog" />
        <Cell title="todo list" />
        <Cell title="deadline" />
        <Cell title="file" />
        <p>operation</p>
        <Cell title="move">
          <Icon slot="icon" type="md-arrow-forward"></Icon>
        </Cell>
        <Cell title="copy">
          <Icon slot="icon" type="md-copy"></Icon>
        </Cell>
        <Cell :title="isWatched ? 'unWatch' : 'watch'" @click.native="switchWatchStatus"
          :style="{backgroundColor: isWatched ? '#19be6b' : ''}">
          <Icon slot="icon" type="md-eye"></Icon>
        </Cell>
        <Cell title="delete">
          <Icon slot="icon" type="md-close"></Icon>
        </Cell>
        <Cell title="share">
          <Icon slot="icon" type="md-share"></Icon>
        </Cell>
      </CellGroup>
      </Col>
    </Row>
  </Modal>
</template>
<script>
  export default {
    mounted() {
      console.log(this.todo);
    },
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
        commentTextareaShown: false,
        tagDialogShown: false,
        isWatched: false,
        tags: [],
        detail: "",
        inputDetail: "",
        comments: [],
        inputComment: "",
        allTags: [{
            id: 1,
            color: "primary",
            checked: false
          },
          {
            id: 2,
            color: "success",
            checked: false
          },
          {
            id: 3,
            color: "error",
            checked: false
          },
          {
            id: 4,
            color: "warning",
            checked: false
          },
          {
            id: 5,
            color: "magenta",
            checked: false
          },
          {
            id: 6,
            color: "volcano",
            checked: false
          },
          {
            id: 7,
            color: "orange",
            checked: false
          },
          {
            id: 8,
            color: "yellow",
            checked: false
          },
          {
            id: 9,
            color: "purple",
            checked: false
          }
        ]
      };
    },
    methods: {
      // cancel button's callback
      cancel() {
        this.tagDialogShown = false;
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
      // edit comment
      editComment() {
        this.commentTextareaShown = true;
      },
      // save comment
      saveComment() {
        if (this.inputComment.trim() === "") {
          return;
        }
        const length = this.comments.length;
        this.comments.push({
          id: length + 1,
          content: this.inputComment
        });
        this.closeComment();
      },
      // close comment-edit
      closeComment() {
        this.commentTextareaShown = false;
        this.inputComment = "";
      },
      // open tag dialog to edit tags
      openTagDialog() {
        this.tagDialogShown = true;
      },
      // add tag (still need to fix up sth.)
      addTag(id) {
        if (!this.allTags[id - 1].checked) {
          this.tags.push(this.allTags[id - 1]);
          this.allTags[id - 1].checked = true;
        } else {
          this.removeTag(null, id);
          this.allTags[id - 1].checked = false;
        }
      },
      // remove tag
      removeTag(event, id) {
        let index = -1;
        this.tags.forEach((tag, i) => {
          if (tag.id === id) {
            index = i;
          }
        });
        this.tags.splice(index, 1);
      },
      // swich the status of watch
      switchWatchStatus() {
        this.isWatched = !this.isWatched;
        this.$emit("switch-watch-status", this.isWatched);
      }
    }
  };
</script>