<template>
    <div>
        <v-btn class="ma-2" tile outlined color="warning" @click="clearTask">
        <v-icon left>mdi-delete-forever</v-icon> Clear All
        </v-btn>
    </div>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        clearTask() {
            this.$store.dispatch( 'todo/removeAllByUserId', this.currentUser.id );
        }
    }
}
</script>
