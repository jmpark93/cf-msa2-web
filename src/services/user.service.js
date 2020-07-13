import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8081/api/user/';
// const API_URL = process.env.VUE_APP_USERAPI;
const API_URL = process.env.VUE_APP_APIGW + '/user';

class UserService {

  // for Admin User 
  getAllUsers() {
     return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  deleteUser(userId) {
    return axios.delete(API_URL + userId, { headers: authHeader() });
  }

  // for Nomarl User ... 
  getProfile(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }
}

export default new UserService();