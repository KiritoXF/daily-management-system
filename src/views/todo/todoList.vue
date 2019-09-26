<!-- 
    todo list. which the style is Card.
-->

<template>
  <div>
    <Card style="width: 350px; max-height: 600px; overflow-y: auto" dis-hover>
      <div slot="title">
        <p style="text-align: center">{{ name }}</p>
      </div>
      <Dropdown slot="extra" trigger="click" style="margin-left: 20px" placement="bottom-end">
        <Button shape="circle" icon="md-more"></Button>
        <DropdownMenu slot="list">
          <DropdownItem>operate1</DropdownItem>
          <DropdownItem>operate2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Card
        style="width: 100%; margin: 8px 0"
        v-for="todo in todoList"
        :key="todo.id"
        @click.native="openDetail"
      >
        <todoDetail
          :todoDetailShown="todoDetailShown"
          :todo="todoList[todo.id - 1]"
          :list-name="name"
          @close-detail-dialog="todoDetailShown = false"
        ></todoDetail>
        <Dropdown slot="extra" trigger="click" style="margin-left: 20px" placement="bottom-end">
          <Button size="small" shape="circle" icon="md-brush"></Button>
          <DropdownMenu slot="list">
            <DropdownItem name="edit">edit</DropdownItem>
            <DropdownItem name="delete" @click.native="deleteTodo(todo.id)">delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div>
          <h5>{{ todo.name }}</h5>
          <Tooltip content="you are watching this todo" theme="light" placement="bottom-start">
            <Icon v-show="true" type="md-eye"></Icon>
          </Tooltip>
          <Tooltip content="this todo has comments" theme="light" placement="bottom-start">
            <Icon v-show="true" type="md-chatboxes"></Icon>
          </Tooltip>
          <Tooltip content="checklist" theme="light" placement="bottom-start">
            <Icon v-show="true" type="md-checkbox-outline"></Icon>
          </Tooltip>
        </div>
      </Card>
      <CellGroup @on-click="addCellClick" v-show="addCellShown">
        <Cell title="add">
          <Icon slot="icon" type="md-add"></Icon>
        </Cell>
      </CellGroup>
      <Card v-show="!addCellShown">
        <Input v-model="newCardName" placeholder="Input this todo's name..." />
        <Button type="success" style="margin: 8px 0" @click="add">add todo</Button>
        <Button icon="md-close" shape="circle" @click="cancelAdd"></Button>
      </Card>
    </Card>
  </div>
</template>
<script>
import todoDetail from "./todoDetail.vue";
export default {
  components: {
    todoDetail
  },
  props: {
    todoList: Array,
    name: String
  },
  data() {
    return {
      addCellShown: true,
      todoDetailShown: false,
      newCardName: ""
    };
  },
  methods: {
    // add todo to todoList
    add() {
      if (this.newCardName === "") {
        return;
      }
      this.$emit("add-todo", this.newCardName);
      this.newCardName = "";
      this.addCellShown = true;
    },
    // delete todo from todo list
    deleteTodo(id) {
      this.$emit("delete-todo", id);
    },
    // open todo's detail dialog
    openDetail() {
      this.todoDetailShown = true;
      this.cancelAdd();
    },
    // add new todo to this todo list
    addCellClick() {
      this.addCellShown = false;
    },
    // cancel add new todo
    cancelAdd() {
      this.addCellShown = true;
    }
  }
};
</script>