<template>
  <div>
    <TodoAdd :addType="addType"> </TodoAdd>

    <v-list two-line subheader>
      <v-list-item v-for="taskIng in todosIng" :key="taskIng.id" @click="">
        <v-list-item-action>
          <v-checkbox
            v-model="taskIng.isDone"
            :color="taskIng.isDone ? 'primary' : 'gray'"
            @change="updateTask(taskIng)"
          >
          </v-checkbox>
        </v-list-item-action>

        <v-list-item-content
          class="text-left"
          @click="showItem(taskIng.id, true)"
        >
          <v-list-item-title
            :class="taskIng.isDone ? 'grey--text' : 'primary--text'"
            :style="taskIng.isDone ? 'text-decoration: line-through' : ''"
          >
            {{ taskIng.todoItem }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <template v-if="taskIng.isToday === true">
              <v-icon> mdi-calendar-today </v-icon> 오늘 할 일,
            </template>
            {{
              $moment.utc(taskIng.createdTimeAt).local() | moment("from", "now")
            }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="updateStatus(taskIng)">
            <v-icon v-if="taskIng.isImportant" color="primary">
              mdi-star
            </v-icon>
            <v-icon v-else color="primary"> mdi-star-outline </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <!-- </v-list> -->

      <!-- <v-list  two-line subheader> -->
      <v-subheader v-if="todosComplete.length !== 0">
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
        <v-list-item
          v-for="taskCmplt in todosComplete"
          :key="taskCmplt.id"
          @click=""
        >
          <v-list-item-action>
            <v-checkbox
              v-model="taskCmplt.isDone"
              :color="taskCmplt.isDone ? 'primary' : 'gray'"
              @change="updateTask(taskCmplt)"
            >
            </v-checkbox>
          </v-list-item-action>

          <v-list-item-content
            class="text-left"
            @click="showItem(taskCmplt.id, true)"
          >
            <v-list-item-title
              :class="taskCmplt.isDone ? 'grey--text' : 'primary--text'"
              :style="taskCmplt.isDone ? 'text-decoration: line-through' : ''"
            >
              {{ taskCmplt.todoItem }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                $moment.utc(taskCmplt.createdTimeAt).local()
                  | moment("from", "now")
              }}
              ,
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="updateStatus(taskCmplt)">
              <v-icon v-if="taskCmplt.isImportant" color="primary">
                mdi-star
              </v-icon>
              <v-icon v-else color="primary"> mdi-star-outline </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>

    <div align="right">
      <v-spacer />
      <v-btn
        class="ma-2"
        tile
        outlined
        color="warning"
        @click="clearTaskComplete"
      >
        완료 삭제<v-icon class="pl-2">mdi-delete-forever</v-icon>
      </v-btn>

      <v-btn class="ma-2" tile outlined color="warning" @click="clearTask">
        전체 삭제 <v-icon class="pl-2">mdi-delete-forever</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import TodoAdd from "@/components/todo/add.vue";

export default {
  name: "TodoList",

  props: { filterBy: String },

  data: () => ({
    showComplete: true,
    addType: "",
  }),

  // mounted() {
  //   console.log("[list.vue] mounted() : search by " + this.filterBy);
  //   this.filterTodos();
  // },

  // watch: {
  //   filterBy: function(newState) {
  //     console.log("[list.vue] watch() : search by " + this.filterBy);
  //     this.filterTodos();
  //   },
  // },

  computed: {
    // todosIng() {
    //   return this.$store.state.todo.todos.filter((item) => {
    //     return item.isDone === false;
    //   });
    // },
    todosIng() {
      return this.filterTodosIng();
    },

    // todosComplete() {
    //   return this.$store.state.todo.todos.filter((item) => {
    //     return item.isDone === true;
    //   });
    // },

    todosComplete() {
      return this.filterTodosComplete();
    },

    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  watch: {
    filterBy: function(newFilter) {
      // console.log("[list.vue] watch filterBy : " + this.filterBy);
      this.addType = this.filterBy;
    },
  },

  methods: {
    filterTodosIng() {
      switch (this.filterBy) {
        case "all":
          return this.$store.state.todo.todos.filter((item) => {
            return item.isDone === false;
          });

        case "today":
          return this.$store.state.todo.todos.filter((item) => {
            return item.isDone === false && item.isToday === true;
          });

        case "important":
          return this.$store.state.todo.todos.filter((item) => {
            return item.isDone === false && item.isImportant === true;
          });
      }
    },

    filterTodosComplete() {
      switch (this.filterBy) {
        case "all":
          return this.$store.state.todo.todos.filter((item) => {
            return item.isDone === true;
          });

        case "today":
          return this.$store.state.todo.todos.filter((item) => {
            return item.isDone === true && item.isToday === true;
          });

        case "important":
          return this.$store.state.todo.todos.filter((item) => {
            return item.isDone === true && item.isImportant === true;
          });
      }
    },

    showItem(taskID) {
      // console.log("Selected Task : " + taskID);
      this.$emit("list-event", taskID, true);
    },

    hideItem() {
      // console.log("Selected Task : " + taskID);
      this.$emit("list-event", 0, false);
    },

    updateTask(task) {
      // console.log("[list.vue] updateTask() : " + task.isDone);
      this.$store.dispatch("todo/updateTodo", task);
    },

    updateStatus(task) {
      // console.log(
      //   "[list.vue] updateStatus() : task.isImportant : " + task.isImportant
      // );
      task.isImportant = !task.isImportant;
      this.updateTask(task);
    },

    clearTask() {
      this.$store.dispatch("todo/removeAllByUserId", {
        userID: this.currentUser.id,
        delType: this.filterBy,
      });
      this.hideItem();
    },

    clearTaskComplete() {
      // console.log( "[footer.vue] clearTaskComplete() :", this.delType );
      this.$store.dispatch("todo/removeAllComplete", {
        userID: this.currentUser.id,
        delType: this.filterBy,
      });
      this.hideItem();
    },
  },

  components: {
    TodoAdd: TodoAdd,
  },
};
</script>
