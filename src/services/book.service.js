import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8083/api/book/';
const API_URL = process.env.VUE_APP_BOOKAPI;

class BookService {
  getInfo() {
    return axios.get(API_URL + 'info', { headers: authHeader() });
  }
}

export default new BookService();