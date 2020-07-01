<template>
    <div>
            <v-list-item-action>
              <v-checkbox
                v-model="todo.isDone"
                :color="todo.isDone && 'grey' || 'primary'"
                @change="updateTodo"
              >
              </v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> {{ todo.todoItem}}</v-list-item-title>
              <v-list-item-subtitle>Notify when receiving invites</v-list-item-subtitle>
            </v-list-item-content>

    <!-- <div class="mb-2 d-flex">
        <div class="vertCenteredContent"> 
            <b-form-checkbox v-model="todo.isDone" @change="updateTodo"> </b-form-checkbox>
        </div>
        <span class="flex-grow-1"
              :class="todo.isDone ? 'text-muted' : ''"
              :style="todo.isDone ? 'text-decoration: line-through': ''"
        >   
            {{ todo.todoItem }} 
        </span>
        <span class="removeBtn" type="button" @click="removeTodo">
            <b-icon icon=trash> </b-icon>
        </span>    
    </div> -->

    </div>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    methods: {
        // updateTodo(checked) {
        //     this.$store.dispatch('updateTodo', {
        //         id: this.todo.id,
        //         todoItem: this.todo.todoItem,
        //         isDone: checked
        //     })
        // },
        // removeTodo(e) {
        //     // this.$store.commit('REMOVE_TODO', this.todo.id);
        //     this.$store.dispatch('removeTodo', this.todo.id);
        // }
    }    
}
</script>

<style scoped>

.removeBtn {
    margin-left: auto;
    color: #DE4343;
}

.vertCenteredContent {
  position:relative;
  top: 50%;
  padding:10px
}

</style>