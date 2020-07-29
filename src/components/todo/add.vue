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
  data: () => ({
    task: '',
    todo: new Todo(),
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    createTask() {
      if (this.task !== '') {
        this.todo.userID = this.currentUser.id;
        this.todo.todoItem = this.task && this.task.trim();;

        this.$store.dispatch("todo/addTodo", this.todo );
        this.task = '';
      }
    },
  },
};
</script>
