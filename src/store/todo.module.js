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

    CLEAR_ALL(state, status) {
      switch (status) {
        case "all":
          state.todos = [];
          break;
        case "today":
          state.todos = state.todos.filter((todo) => todo.isToday === false);
          break;
        case "important":
          state.todos = state.todos.filter(
            (todo) => todo.isImportant === false
          );
          break;
      }
    },

    CLEAR_COMPLETE(state, status) {
      switch (status) {
        case "all":
          state.todos = state.todos.filter((todo) => todo.isDone === false);
          break;
        case "today":
          state.todos = state.todos.filter(
            (todo) => !(todo.isDone === true && todo.isToday === true)
          );
          break;
        case "important":
          state.todos = state.todos.filter(
            (todo) => !(todo.isDone === true && todo.isImportant === true)
          );
          break;
      }
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

    removeAllByUserId({ commit }, delCmd) {
      return TodoService.removeAllByUserId(delCmd.userID, delCmd.delType).then(
        (response) => {
          commit("CLEAR_ALL", delCmd.delType);
          return Promise.resolve(response);
        },
        (error) => {
          if (error.response.status === 404) {
            commit("CLEAR_ALL", delCmd.delType);
          }

          console.log("[todo.module.js] removeAllByUserId() : " + error);
        }
      );
    },

    removeAllComplete({ commit }, delCmd) {
      return TodoService.removeAllComplete(delCmd.userID, delCmd.delType).then(
        (response) => {
          commit("CLEAR_COMPLETE", delCmd.delType);
          return Promise.resolve(response);
        },
        (error) => {
          if (error.response.status === 404) {
            commit("CLEAR_COMPLETE", delCmd.delType);
          }

          console.log("[todo.module.js] removeAllComplete() : " + error);
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
