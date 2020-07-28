<template>
  <v-container class="grey lighten-5">
    <v-row>

      <v-col v-if="isShowList">
        <TodoList v-on:list-event="showItems"> </TodoList>
      </v-col>

      <v-col v-if="isShowItem">
        <TodoItem :taskID="selectedTask" v-on:item-event="hideItems"> </TodoItem>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import TodoList from "@/components/todo/list.vue";
import TodoItem from "@/components/todo/item.vue";

export default {
  name: "Todo",

  props: { status: String },

  data: () => ({
    isMobile: false,

    isShowList: true,
    isShowItem: false,

    selectedTask: ''
  }),

  computed: {
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

    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },

    showItems(taskID) {
      this.selectedTask = taskID; 

      if (this.isMobile) {
        this.isShowList = false;
        this.isShowItem = true;
      } else {
        this.isShowList = true;
        this.isShowItem = true;
      }
    },

    hideItems() {
      this.isShowList = true;
      this.isShowItem = false;
    },
  },

  components: {
    TodoList: TodoList,
    TodoItem: TodoItem,
  },
};
</script>
