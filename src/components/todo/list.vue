<template>
  <div>
    <TodoAdd> </TodoAdd>

    <v-list two-line>
      <v-list-item v-for="task in todos" :key="task.id">
        <v-list-item-action>
          <v-checkbox
            v-model="task.isDone"
            :color="task.isDone ? 'primary' : 'gray'"
            @change="updateTask(task)"
          >
          </v-checkbox>
        </v-list-item-action>

        <v-list-item-content class="text-left" @click="showItem(task.id)">
          <v-list-item-title
            :class="task.isDone ? 'grey--text' : 'primary--text'"
            :style="task.isDone ? 'text-decoration: line-through' : ''"
          >
            {{ task.todoItem }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $moment.utc(task.updateTimeAt).local() | moment("from", "now") }}
            ,
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="task.favorite = !task.favorite">
            <v-icon v-if="task.favorite" color="primary"> mdi-star </v-icon>
            <v-icon v-else color="primary"> mdi-star-outline </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-list v-if="todosComplete.length !== 0" two-line subheader>
      <v-subheader>
        <v-btn
          rounded
          color="blue-grey"
          class="ma-2 white--text"
          @click="showComplete = !showComplete"
        >
          완료됨
          <v-icon v-if="showComplete" right dark> mdi-chevron-up </v-icon>
          <v-icon v-else right dark> mdi-chevron-down </v-icon>
        </v-btn>
      </v-subheader>

      <template v-if="showComplete">
        <v-list-item v-for="task in todosComplete" :key="task.id">
          <v-list-item-action>
            <v-checkbox
              v-model="task.isDone"
              :color="task.isDone ? 'primary' : 'gray'"
              @change="updateTask(task)"
            >
            </v-checkbox>
          </v-list-item-action>

          <v-list-item-content class="text-left" @click="showItem(task.id)">
            <v-list-item-title
              :class="task.isDone ? 'grey--text' : 'primary--text'"
              :style="task.isDone ? 'text-decoration: line-through' : ''"
            >
              {{ task.todoItem }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                $moment.utc(task.updateTimeAt).local() | moment("from", "now")
              }}
              ,
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon
              v-if="task.favorite"
              color="primary"
              @click="task.favorite = !task.favorite"
            >
              mdi-star
            </v-icon>
            <v-icon
              v-else
              color="primary"
              @click="task.favorite = !task.favorite"
            >
              mdi-star-outline
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>

    <TodoFooter> </TodoFooter>
  </div>
</template>

<script>
import TodoAdd from "@/components/todo/add.vue";
import TodoFooter from "@/components/todo/footer.vue";

export default {
  name: "TodoList",

  data: () => ({
    showComplete: true,
  }),

  computed: {
    todos() {
       return this.$store.state.todo.todos;
    //   return this.$store.state.todo.todos.filter((item) => {
    //     return item.isDone === false;
    //   });
    },

    todosComplete() {
      return this.$store.state.todo.todos.filter((item) => {
        return item.isDone === true;
      });
    },
  },

  mounted() {},

  methods: {
    showItem(taskID) {
      console.log("Selected Task : " + taskID);
      this.$emit("list-event", taskID);
    },

    updateTask(task) {
      console.log("task.isDone : " + task.isDone);
      this.$store.dispatch("todo/updateTodo", {
        id: task.id,
        todoItem: task.todoItem,
        isDone: task.isDone,
      });
    },
  },

  components: {
    TodoAdd: TodoAdd,
    TodoFooter: TodoFooter,
  },
};
</script>
