export default class Book {
    constructor(title, purchaseDate, totalPage) {
      this.title = title;
      this.purchaseDate = purchaseDate;
      this.totalPage = totalPage;

      this.purchaseDate = new Date().toISOString().substr(0, 10);
    }
  }