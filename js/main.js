var taskArray = [];
var cardTotal = 0;
document.querySelector('.make-task-list-button').disabled = true;
document.querySelector('#clear-all').disabled = true;
// function that places card from array into page

//Event/Bubbles

document.querySelector('.content').addEventListener('click', () => {deleteCard(event); markUrgent(event);})
document.querySelector('.left-bar').addEventListener('click', leftBarClickFunction);
document.querySelector('.left-bar').addEventListener('input', buttonStatus);

//functions
function contentClickEvents(event) {

}

function leftBarClickFunction(event) {
  event.preventDefault()
  deleteTaskItem(event.target);
  clearErrorMessage(event.target);
  clearInputsAfterCardCreation(event.target);
  createTaskByClick(event.target);
  clearAllByClick(event.target);
}

function buttonStatus(event){
  if (event.target.classList.contains('left-input') && document.querySelector('.left-input').value.length > 0 && document.querySelector('.task-list').innerHTML != "") {
    document.querySelector('.make-task-list-button').disabled = false;
  } else {
    document.querySelector('.make-task-list-button').disabled = true;
  }

  if (event.target.classList.contains('left-input') && document.querySelector('#task-input').value.length > 0 || document.querySelector('#task-title').value.length > 0 || document.querySelector('.task-list').innerHTML != "") {
    document.querySelector('#clear-all').disabled = false;
  } else {
    document.querySelector('#clear-all').disabled = true;
  }
}

function deleteTaskItem(target) {
  if (target.classList.contains('task-item')) {
    target.remove();
    var index = taskArray.indexOf(target.innerText);
    taskArray.splice(index, 1);
  }
  if (document.querySelector('#task-title').value.length < 1) {
    document.querySelector('#make-task-list-button').disabled = true;
  }
  if (taskArray.length < 1 && document.querySelector('#task-title').value.length < 1) {
    document.querySelector('#clear-all').disabled = true;
  }
}

function deleteCard(event) {
  for (var i = 1; i <= document.querySelectorAll('.task-card').length; i++) {
   if (event.target.classList.contains('delete-icon') && document.querySelectorAll(`.list-${i}`).length === document.querySelectorAll(`.list-${i}:checked`).length) {
     event.path[2].remove();
   }
 }
}

function markUrgent(event) {
  for (var i = 1; i <= document.querySelectorAll('.urgent-icon').length; i++) {
   if (event.target.classList.contains('urgent-icon') && event.path[2].classList.contains('urgent') != true) {
     event.path[2].classList.add('urgent');
   } else {
     event.path[2].classList.remove('urgent');
   }
 }
}

function createTaskByClick(target) {
  if (target.classList.contains('add-button-text')) {
    addTaskToList();
  }
}

function addTaskToList() {
  if (document.getElementById('task-input').value != "" && document.getElementById('task-input').value != " ") {
    var li = document.createElement('li')
    var value = document.getElementById('task-input').value;
    taskArray.push(value);
    taskArray.forEach(function(element) {
      document.querySelector('.task-list').appendChild(li);
      li.classList.add('task-item');
      li.innerHTML = `<p class='item-text'>${element}</p>`;
    });
  }
  document.getElementById('task-input').value = "";
  document.querySelector('.clear-all-button').disabled = false;
  if (document.querySelector('#task-title').value != "") {
    document.querySelector('#make-task-list-button').disabled = false;
  }

}

function clearInputsAfterCardCreation(target) {
  if (target.classList.contains('make-task-list-button')) {
    checkEmptyInputs();
    if (document.querySelector('#task-title').value != "" && document.querySelector('.task-list').innerHTML != "") {
      createTaskCard();
    }
    clearAll()
    disableMakeAndClearButtons()
  }
}

function disableMakeAndClearButtons() {
  document.querySelector('.make-task-list-button').disabled = true;
  document.querySelector('#clear-all').disabled = true;
}

function createTaskCard() {
  cardTotal += 1;
  var random = Math.floor(Math.random() * 10000000);
  var taskTitle =  document.getElementById('task-title').value;
  var article = document.createElement('article');
  article.classList.add('task-card');
  var div = document.createElement('div');

  document.querySelector('.content').appendChild(article);
  article.innerHTML = `
  <header class="task-card__header">
        <h3 class="task-card__title">${taskTitle}</h3>
      </header>
      <section id='task-card-${random}' class="task-card__content"></section>
      <footer class="task-card__footer">
        <p class="icons-name urgent-icon">Urgent</p>
        <p class="icons-name delete-icon">Delete</p>
      </footer>`;

  taskArray.forEach(function(element) {
    var div = document.createElement('div');
    var randomId = Math.floor(Math.random() * 1000000);
    document.querySelector(`#task-card-${random}`).appendChild(div);
    div.innerHTML = `<input id='list-${randomId}' class="checkbox list-${cardTotal}" type="checkbox"><label class='label-checkbox' for="list-${randomId}"><p class='item-text'>${element}</p></label>`;
  });

  taskArray = [];
  document.querySelector('.task-list').innerHTML = "";
}

function clearAllByClick(target) {
  if (target.classList.contains('clear-all-button')) {
    clearAll();
    disableMakeAndClearButtons();
  }
}

function clearAll() {
  document.querySelector('.task-list').innerHTML = "";
  document.querySelector('#task-title').value = "";
  document.getElementById('task-input').value = "";
}

function checkEmptyInputs() {
  var taskTitleValue = document.querySelector('#task-title').value;
  var taskList = document.querySelector('.task-list').innerHTML;
  if (taskTitleValue == "" || taskList == "") showError();
}

function showError() {
  document.querySelector('#task-title').classList.add('error-input');
  document.querySelector('#task-input').classList.add('error-input');
  document.querySelector('.error').style.display = "block";
}

function clearErrorMessage(target) {
  if (target.classList.contains('error-input')) {
    document.querySelector('#task-title').classList.remove('error-input');
    document.querySelector('#task-input').classList.remove('error-input');
    document.querySelector('.error').style.display = "none";
  }
}
