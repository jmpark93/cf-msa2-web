import axios from "axios";
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8081/api/auth/';
const API_URL = process.env.VUE_APP_AUTHAPI;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user, imageFile) {
    const formData = new FormData();

    formData.append("profile", JSON.stringify(user));

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    return axios.post(API_URL + "signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  delete(userId) {
    return axios.delete(API_URL + userId, { headers: authHeader() });
  }
}

export default new AuthService();
