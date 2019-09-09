class ToDo {
  constructor(title) {
    this.title = title;
    this.id = this.title.replace(/ /g, "_");
    this.tasks = [];
    this.counter = cardArray.length + 1;
    this.checkedTasks = [];
    this.allChecked = false;
    this.urgent = false;
  }

  checkAllChecked() {
    if (this.tasks.length == this.checkedTasks.length) {
      return this.allChecked = true;
    }
  }

  updateToDo() {
    this.urgent = !this.urgent;
  }
}
