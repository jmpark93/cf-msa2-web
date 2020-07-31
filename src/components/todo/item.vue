<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model="title"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="할 일을 입력하세요 !!!"
        type="text"
        @keypress.enter="updateTask()"
      >
      </v-text-field>

      <v-divider class="mb-7" />

      <template v-if="todo.isDone">
        <v-btn
          :outlined="false"
          color="primary"
          min-width="200"
          class="mr-5 mb-5"
          @click="updateStatus('isDone')"
        >
          <v-icon class="mr-3"> mdi-check-box-outline </v-icon> 완료
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          :outlined="true"
          min-width="200"
          class="mr-5 mb-5"
          @click="updateStatus('isDone')"
        >
          <v-icon class="mr-3"> mdi-checkbox-blank-outline </v-icon> 완료
        </v-btn>
      </template>

      <template v-if="todo.isImportant">
        <v-btn
          :outlined="false"
          color="primary"
          min-width="200"
          class="mr-5 mb-5"
          @click="updateStatus('isImportant')"
        >
          <v-icon class="mr-3"> mdi-star </v-icon> 중요
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          :outlined="true"
          min-width="200"
          class="mr-5 mb-5"
          @click="updateStatus('isImportant')"
        >
          <v-icon class="mr-3"> mdi-star-outline </v-icon> 중요
        </v-btn>
      </template>

      <template v-if="todo.isToday">
        <v-btn
          :outlined="false"
          color="primary"
          min-width="200"
          class="mr-5 mb-5"
          @click="updateStatus('isToday')"
        >
          <v-icon class="mr-3"> mdi-calendar-today </v-icon> 오늘 할 일
          <v-icon class="ml-3"> mdi-checkbox-blank-circle-outline </v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          :outlined="true"
          min-width="200"
          class="mr-5 mb-5"
          @click="updateStatus('isToday')"
        >
          <v-icon class="mr-3"> mdi-calendar-today </v-icon> 오늘 할 일
          <v-icon class="ml-3"> mdi-close </v-icon>
        </v-btn>
      </template>

      <v-divider class="mt-5" />

      <v-textarea
        v-model="memo"
        label="메모"
        clear-icon="mdi-close-circle"
        clearable
        append-icon="mdi-comment-check"
        @click:append="updateTask()"
        @keypress.enter="updateTask()"
      >
      </v-textarea>
    </v-card-text>

    <v-divider />

    <v-card-actions align="center">
      <v-btn class="mx-2" fab outlined small @click="hideItem()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-spacer />

      <div class="mr-4">
        {{
          $moment.utc(todo.createdTimeAt).local() | moment("YYYY-MM-DD HH:mm")
        }} <br>
        (updated at :
        {{ $moment.utc(todo.updateTimeAt).local() | moment("from", "now") }} ) 
      </div>

      <v-btn class="mx-2" fab outlined small @click="removeTask()">
        <v-icon>mdi-delete-forever</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Todo } from "@/models/todo";

export default {
  name: "TodoItem",

  props: ["taskID"],

  data: () => ({
    // todo: new Todo(),
    title: '',
    memo: ''
  }),

  computed: {
    todo() {
      const index = this.$store.state.todo.todos.findIndex((todo) => {
        return todo.id === this.taskID;
      });

      this.title = this.$store.state.todo.todos[index].todoItem;
      this.memo = this.$store.state.todo.todos[index].memo;
       
      return this.$store.state.todo.todos[index];
    },
  },

  // watch: {
  //   taskID: function(newTaskID) {
  //     const index = this.$store.state.todo.todos.findIndex((todo) => {
  //       return todo.id === this.taskID;
  //     });

  //     this.todo = Object.assign(this.todo, this.$store.state.todo.todos[index]);
  //   },
  // },

  // mounted() {
  //   const index = this.$store.state.todo.todos.findIndex((todo) => {
  //     return todo.id === this.taskID;
  //   });

  //   this.todo = Object.assign(this.todo, this.$store.state.todo.todos[index]);
  // },

  methods: {
    hideItem() {
      this.$emit("item-event");
    },

    removeTask() {
      console.log("[item.vue] removeTask() : " + this.taskID);

      this.$store.dispatch("todo/removeTodo", this.taskID);
      this.$emit("item-event");
    },

    updateTask() {
      console.log("[item.vue] updateTask() : " + this.taskID);
      this.todo.todoItem = this.title;
      this.todo.memo = this.memo;

      this.$store.dispatch("todo/updateTodo", this.todo);
    },

    updateStatus(indicator) {
      console.log("[item.vue] updateStatus : " + indicator);

      switch (indicator) {
        case "isDone":
          this.todo.isDone = !this.todo.isDone;
          break;
        case "isImportant":
          this.todo.isImportant = !this.todo.isImportant;
          break;
        case "isToday":
          this.todo.isToday = !this.todo.isToday;
          break;
      }

      this.updateTask();
    },
  },
};
</script>
