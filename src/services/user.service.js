import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/user/';

class UserService {

  // for Admin User 
  getAllUsers() {
     return axios.get(API_URL + 'list', { headers: authHeader() });
  }

  // for Nomarl User ... 
  getProfile(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }
}

export default new UserService();