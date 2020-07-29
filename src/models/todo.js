export class Todo {
  constructor(todoItem) {
    this.todoItem = todoItem;

    this.id = -1;
    this.userID = -1;
    this.memo = '';

    this.isToday = false;
    this.isDone = false;
    this.isImportant = false;

    // this.createTimeAt = new Date();
    // this.updateTimeAt = new Date();
  }
}
