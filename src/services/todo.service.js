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

  removeAllByUserId(userID, delType) {
    console.log(
      "[todo.service.js] removeAllByUserId() : " + userID + ", " + delType
    );

    switch (delType) {
      case "all":
        return axios.get(
          API_URL + "search/deleteAllByUserID?userID=" + userID,
          {
            headers: authHeader(),
          }
        );

      case "today":
        return axios.get(
          API_URL + "search/deleteAllByIsTodayIsTrueAndUserID?userID=" + userID,
          {
            headers: authHeader(),
          }
        );

      case "important":
        return axios.get(
          API_URL +
            "search/deleteAllByIsImportantIsTrueAndUserID?userID=" +
            userID,
          {
            headers: authHeader(),
          }
        );
    }
  }

  removeAllComplete(userID, delType) {
    console.log(
      "[todo.service.js] removeAllComplete() : " + userID + ", " + delType
    );

    switch (delType) {
      case "all":
        return axios.get(
          API_URL + "search/deleteAllByIsDoneIsTrueAndUserID?userID=" + userID,
          {
            headers: authHeader(),
          }
        );

      case "today":
        return axios.get(
          API_URL +
            "search/deleteAllByIsDoneIsTrueAndIsTodayIsTrueAndUserID?userID=" +
            userID,
          {
            headers: authHeader(),
          }
        );

      case "important":
        return axios.get(
          API_URL +
            "search/deleteAllByIsDoneIsTrueAndIsImportantIsTrueAndUserID?userID=" +
            userID,
          {
            headers: authHeader(),
          }
        );
    }
  }
}

export default new TodoService();
