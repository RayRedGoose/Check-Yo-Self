class ToDo {
  constructor(title) {
    this.title = title;
    this.id = this.title.replace(/ /g, "_");
    this.tasks = [];
    this.counter = cardArray.length + 1;
    this.urgentClass = "";
    this.activeClass = "";
    this.cardStructure = `
    <header class="task-card__header task-card-${this.counter}__header">
          <h3 class="task-card__title">${this.title}</h3>
        </header>
        <section id='task-card-${this.id}-${this.counter}' class="task-card__content"></section>
        <footer class="task-card__footer task-card-${this.counter}__footer">
          <p id='${this.counter}' class="icons-name urgent-icon urgent-icon-${this.counter}">Urgent</p>
          <p id='${this.counter}' class="icons-name delete-icon">Delete</p>
        </footer>`;
    this.checkedTasks = [];
    this.allChecked = false;
    this.urgent = false;
  }

  createCard() {
    var content;
    if ((this.counter % 2) == 0) {
      content = document.querySelector('.column-two');
    } else {
      content = document.querySelector('.column-one');
      content.style.display = 'flex';
    }
    var article = document.createElement('article');
    content.appendChild(article);
    article.classList.add(`task-card`);
    article.classList.add(`task-card-${this.counter}`);
    article.innerHTML = this.cardStructure;

  }

  createCheckbox() {
    for (var i = 0; i < this.tasks.length; i++) {
      var div = document.createElement('div');
      document.querySelector(`#task-card-${this.id}-${this.counter}`).appendChild(div);
      div.innerHTML = `<input id='list-${this.id}-${i}-${this.counter}' class="checkbox" type="checkbox"><label class='label-checkbox' for="list-${this.id}-${i}-${this.counter}"><p class='item-text'>${this.tasks[i]}</p></label>`;
    }
  }

  checkAllChecked() {
    if (this.tasks.length == this.checkedTasks.length) {
      this.allChecked = true;
    }
  }

  makeUrgent() {
    document.querySelector(`.task-card-${this.counter}`).classList.add('task-card--urgent');
    document.querySelector(`.task-card-${this.counter}__header`).classList.add('border--urgent');
    document.querySelector(`.task-card-${this.counter}__footer`).classList.add('border--urgent');
    document.querySelector(`.urgent-icon-${this.counter}`).classList.add('urgent-active-icon');
    this.urgent = true;
  }

  makeRegular() {
    document.querySelector(`.task-card-${this.counter}`).classList.remove('task-card--urgent');
    document.querySelector(`.task-card-${this.counter}__header`).classList.remove('border--urgent');
    document.querySelector(`.task-card-${this.counter}__footer`).classList.remove('border--urgent');
    document.querySelector(`.urgent-icon-${this.counter}`).classList.remove('urgent-active-icon');
    this.urgent = false;
  }
}
