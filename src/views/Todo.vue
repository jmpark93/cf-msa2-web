<template>
  <div id="mainContainer">
    <TodoHeader> </TodoHeader>

    <TodoInput> </TodoInput>

    <v-list two-line subheader>
      <v-list-item-group v-model="model" color="primary">
        <v-list-item v-for="task in todos" :key="task.id">
          <v-list-item-action>
            <v-checkbox
              v-model="task.isDone"
              :color="task.isDone ? 'primary' : 'gray'"
              @change="updateTask(task)"
            >
            </v-checkbox>
          </v-list-item-action>
          <!--                 @change="updateTask(task)" >

        <span class="flex-grow-1"
              :class="todo.isDone ? 'text-muted' : ''"
              :style="todo.isDone ? 'text-decoration: line-through': ''"
        >   -->

          <v-list-item-content class="text-left">
            <v-list-item-title
              :class="task.isDone ? 'grey--text' : 'primary--text'"
            >
              {{ task.todoItem }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $moment.utc(task.updateTimeAt).local() | moment("from", "now") }} ,
              <!-- {{ new Date() | moment("YYYY-MM-DD HH:mm:ss") }} -->
            </v-list-item-subtitle>
          </v-list-item-content>

          <!-- <v-list-item-action>
                <v-list-item-action-text> {{ task.updateTimeAt | moment("from", "now") }} </v-list-item-action-text>
            </v-list-item-action> -->

          <v-list-item-action>
            <v-icon color="pink" @click="removeTask(task)">
              mdi-delete-forever
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <TodoFooter> </TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "@/components/todo/TodoHeader.vue";
import TodoInput from "@/components/todo/TodoInput.vue";
import TodoItem from "@/components/todo/TodoItem.vue";
import TodoFooter from "@/components/todo/TodoFooter.vue";

export default {
  name: "Todo",

  data: () => ({
    model: 1,
  }),

  computed: {
    todos() {
      return this.$store.state.todo.todos;
    },

    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      this.$store.dispatch("todo/getAllByUserId", this.currentUser.id);
    }
  },

  methods: {
    updateTask(task) {
      console.log("task.isDone : " + task.isDone);
      this.$store.dispatch("todo/updateTodo", {
        id: task.id,
        todoItem: task.todoItem,
        isDone: task.isDone,
      });
    },

    removeTask(task) {
      this.$store.dispatch("todo/removeTodo", task.id);
    },
  },

  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoItem: TodoItem,
    TodoFooter: TodoFooter,
  },
};
</script>
