import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8082/api/todos/';

class TodoService {
  getAllByUserId(uesrId) {
    return axios.get(API_URL + 'search/findByUserID?userID=' + uesrId, { headers: authHeader() });
  }

  addTodo(uesrId, todoTitle) {
    return axios.post(API_URL, {
      userID: uesrId,
      todoItem: todoTitle,
      isDone: false
    }, { headers: authHeader() });
  }

  removeTodo(todoID) {
    return axios.delete(API_URL + todoID, { headers: authHeader() });
  }

  updateTodo(todoObj) {
    return axios.patch(API_URL + todoObj.id, todoObj, { headers: authHeader() });
  }
 
  // 일단 API 부터 다시 확인 ...
  removeAllByUserId(userId) {
    return axios.get(API_URL + 'search/deleteAllByUserID?userID=' + userId, { headers: authHeader() });
  }
}

export default new TodoService();
