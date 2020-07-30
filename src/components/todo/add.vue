<template>
  <div>
    <v-text-field
      v-model="task"
      filled
      append-icon="mdi-plus-circle"
      clear-icon="mdi-close-circle"
      clearable
      label="할 일을 입력하세요 !!!"
      type="text"
      @click:append="createTask"
      @keypress.enter="createTask"
    >
    </v-text-field>
  </div>
</template>

<script>
import { Todo } from "@/models/todo";

export default {
  props: { addType: String },

  data: () => ({
    task: "",
    todo: new Todo(),
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {},

  methods: {
    createTask() {
      console.log("[add.vue] createTask() : " + this.addType);

      switch (this.addType) {
        case "important":
          this.todo.isImportant = true;
          break;
        case "today":
          this.todo.isToday = true;
          break;
      }

      console.log("[add.vue] createTask() : isToday = " + this.todo.isToday);
      console.log("[add.vue] createTask() : isImportant = " + this.todo.isImportant);

      if (this.task !== "") {
        this.todo.userID = this.currentUser.id;
        this.todo.todoItem = this.task && this.task.trim();

        this.$store.dispatch("todo/addTodo", this.todo);
        this.task = "";
      }
    },
  },
};
</script>
