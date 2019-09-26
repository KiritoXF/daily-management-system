<template>
  <div style="padding: 0px 100px">
    <Row>
      <Col span="8">
        <todoList
          :todo-list="undoneList"
          name="undone List"
          @add-todo="addTodo"
          @delete-todo="deleteTodo"
          @open-todo-detail="openTodoDetail"
        ></todoList>
      </Col>
      <Col span="8">
        <todoList :todo-list="doingList" name="doing List" @add-todo="addTodo"></todoList>
      </Col>
      <Col span="8">
        <todoList :todo-list="doneList" name="done List" @add-todo="addTodo"></todoList>
      </Col>
    </Row>
 
  </div>
</template>

<script>
import todoList from "./todoList.vue";

export default {
  components: {
    todoList
  },
  data() {
    return {
      undoneList: [{ id: 1, name: "test1" }],
      doingList: [{ id: 1, name: "test1" }],
      doneList: [{ id: 1, name: "test1" }],
    };
  },
  methods: {
    addTodo(newCardName) {
      const length = this.undoneList.length;
      this.undoneList.push({
        id: length + 1,
        name: newCardName
      });
    },
    deleteTodo(id) {
      this.undoneList.find((item, index) => {
        if (item.id === id) {
          this.undoneList.splice(index, 1);
        }
      });
    },
    openTodoDetail(id) {
      this.todoDetailShown = true;
    }
  },
  computed: {},
  watch: {}
};
</script>
 