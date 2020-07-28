<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model="task.todoItem"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="할 일을 입력하세요 !!!"
        type="text"
        @click:clear="task.todoItem = ''"
        @keypress.enter=""
      >
      </v-text-field>

      <v-btn :outlined="false" color="info" width="200" class="ma-2">
        <v-icon> mdi-checkbox-blank-outline </v-icon> 완료
      </v-btn>

      <v-btn outlined width="200" class="ma-2">
        <v-icon> mdi-star-outline </v-icon> 중요
      </v-btn>

      <v-btn :outlined="false" width="200" class="ma-2">
        <v-icon> mdi-calendar-today </v-icon> 오늘
      </v-btn>

    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn class="mx-2" fab outlined small @click="hideItem()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <template v-if="task"> {{ taskID }} : {{ task.todoItem }} </template>>

      <v-spacer />
      <v-icon color="pink" @click="removeTask(task)">
        mdi-delete-forever
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TodoItem",

  props: ["taskID"],

  data: () => ({}),

  computed: {
    task() {
      const index = this.$store.state.todo.todos.findIndex((todo) => {
        return todo.id === this.taskID;
      });

      return this.$store.state.todo.todos[index];
    },
  },

  mounted() {},

  methods: {
    hideItem() {
      this.$emit("item-event");
    },

    removeTask(task) {
      this.$store.dispatch("todo/removeTodo", task.id);
      this.$emit("item-event");
    },
  },
};
</script>
