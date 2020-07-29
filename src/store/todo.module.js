import TodoService from "../services/todo.service";

export const todo = {
  namespaced: true,

  state: {
    todos: [],
  },

  mutations: {
    GET_ALL(state, todos) {
      state.todos = todos;
    },

    ADD_TODO(state, value) {
      state.todos.push(value);
    },

    REMOVE_TODO(state, todoId) {
      const index = state.todos.findIndex((todo) => {
        return todo.id === todoId;
      });

      state.todos.splice(index, 1);
    },

    CLEAR_ALL(state) {
      state.todos = [];
    },

    CLEAR_COMPLETE(state) {
      state.todos = state.todos.filter((todo) => todo.isDone === false);
    },

    UPDATE_TODO(state, value) {
      const index = state.todos.findIndex((todo) => {
        return todo.id === value.id;
      });

      state.todos[index].todoItem = value.todoItem;
      state.todos[index].memo = value.memo;

      state.todos[index].isToday = value.isToday;
      state.todos[index].isDone = value.isDone;
      state.todos[index].isImportant = value.isImportant;

      state.todos[index].createTimeAt = value.createTimeAt;
      state.todos[index].updateTimeAt = value.updateTimeAt;
    },
  },

  actions: {
    getAllByUserId({ commit }, userId) {
      return TodoService.getAllByUserId(userId).then(
        (response) => {
          commit("GET_ALL", response.data._embedded.todos);
          return Promise.resolve(response.data._embedded.todos);
        },
        (error) => {
          console.log("User[" + userId + "] getAllByUserId() : " + error);
        }
      );
    },

    addTodo({ commit }, itemObj) {
      return TodoService.addTodo(itemObj).then(
        (response) => {
          commit("ADD_TODO", response.data);
          return Promise.resolve(response.data);
        },
        (error) => {
          console.log(
            "store[todo] : addTodo() : userID[" +
              itemObj.userId +
              "]  : " +
              error
          );
        }
      );
    },

    removeTodo({ commit }, todoId) {
      return TodoService.removeTodo(todoId).then(
        (response) => {
          commit("REMOVE_TODO", todoId);
          return Promise.resolve(response);
        },
        (error) => {
          console.log("User[" + itemObj.userId + "] removeTodo() : " + error);
        }
      );
    },

    updateTodo({ commit }, itemObj) {
      return TodoService.updateTodo(itemObj).then(
        (response) => {
          commit("UPDATE_TODO", response.data);
          return Promise.resolve(response.data);
        },
        (error) => {
          console.log("User[" + itemObj.userId + "] updateTodo() : " + error);
        }
      );
    },

    removeAllByUserId({ commit }, userId) {
      return TodoService.removeAllByUserId(userId).then(
        (response) => {
          commit("CLEAR_ALL");
          return Promise.resolve(response);
        },
        (error) => {
          if (error.response.status === 404) {
            commit("CLEAR_ALL");
          }

          console.log("User[" + userId + "] removeAllByUserId() : " + error);
        }
      );
    },

    removeAllComplete({ commit }, userId) {
      return TodoService.removeAllComplete(userId).then(
        (response) => {
          commit("CLEAR_COMPLETE");
          return Promise.resolve(response);
        },
        (error) => {
          if (error.response.status === 404) {
            commit("CLEAR_COMPLETE");
          }

          console.log("User[" + userId + "] removeAllComplete() : " + error);
        }
      );
    },
  },

  getters: {
    numberOfComplete: (state) => {
      return state.todos.filter((todo) => todo.isDone === true).length;
    },
  },
};
