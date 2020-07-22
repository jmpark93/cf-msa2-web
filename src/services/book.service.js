import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8083/api/book/';
// const API_URL = process.env.VUE_APP_BOOKAPI;
const API_URL = process.env.VUE_APP_APIGW + '/books/';

class BookService {
  getAllByUserId(uesrId) {
    return axios.get(API_URL + 'search/findByUserID?userID=' + uesrId, { headers: authHeader() });
  }

  getBook(bookID) {
    return axios.get(API_URL + bookID, { headers: authHeader() });
  }

  addBook(bookItem, imageFile) {
    const formData = new FormData();

    formData.append("bookItem", JSON.stringify(bookItem) );

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    return axios.post(API_URL + "add", formData, { headers: { "Content-Type": "multipart/form-data", "Authorization": authHeader(true) } } );
  }

  removeBook(bookID) {
    return axios.delete(API_URL + bookID, { headers: authHeader() });
  }

  updateImage(bookID, imageFile) {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    return axios.patch(API_URL + "image/" + bookID, formData, { headers: { "Content-Type": "multipart/form-data", "Authorization": authHeader(true) } } );
  }

  updateBook(bookItem) {
    return axios.patch(API_URL + bookItem.id, bookItem, { headers: authHeader() });
  }
}

export default new BookService();