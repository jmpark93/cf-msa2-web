import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = 'http://localhost:8082/api/todos/';
// const API_URL = process.env.VUE_APP_TODOAPI;
const API_URL = process.env.VUE_APP_APIGW + "/todos/";

class TodoService {
  getAllByUserId(uesrId) {
    return axios.get(API_URL + "search/findByUserID?userID=" + uesrId, {
      headers: authHeader(),
    });
  }

  addTodo(todoObj) {
    return axios.post(API_URL, todoObj, { headers: authHeader() });
  }

  removeTodo(todoID) {
    return axios.delete(API_URL + todoID, { headers: authHeader() });
  }

  updateTodo(todoObj) {
    return axios.patch(API_URL + todoObj.id, todoObj, {
      headers: authHeader(),
    });
  }

  removeAllByUserId(userId) {
    return axios.get(API_URL + "search/deleteAllByUserID?userID=" + userId, {
      headers: authHeader(),
    });
  }

  removeAllComplete(userId) {
    return axios.get(
      API_URL + "search/deleteAllByIsDoneIsTrueAndUserID?userID=" + userId,
      { headers: authHeader() }
    );
  }
}

export default new TodoService();
