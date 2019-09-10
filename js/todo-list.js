class ToDo {
  constructor(obj) {
    this.title = obj.title;
    this.id = obj.id || this.title.replace(/ /g, "_");
    this.tasks = obj.tasks|| [];
    this.tasksId = obj.tasksId || [];
    this.checkedTasks = obj.checkedTasks || [];
    this.counter = obj.counter || cardArray.length + 1;
    this.allChecked = obj.allChecked || false;
    this.urgent = obj.urgent || false
  }

  checkAllChecked() {
    if (this.tasks.length === this.checkedTasks.length) {
      return this.allChecked = true;
    }
  }

  updateToDo() {
    this.urgent = !this.urgent;
  }
}
