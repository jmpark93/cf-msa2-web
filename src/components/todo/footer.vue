<template>
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
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    clearTask() {
      this.$store.dispatch("todo/removeAllByUserId", this.currentUser.id);
    },

    clearTaskComplete() {
      this.$store.dispatch("todo/removeAllComplete", this.currentUser.id);
    },
  },
};
</script>
