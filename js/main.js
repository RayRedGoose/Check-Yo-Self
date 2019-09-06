var taskArray = [];
var cardArray = [];
var cardTotal = 0;
// document.querySelector('.make-task-list-button').disabled = true;
// document.querySelector('#clear-all').disabled = true;
// function that places card from array into page

//Event/Bubbles

document.querySelector('.content').addEventListener('click', contentClickEvents)
document.querySelector('.left-bar').addEventListener('click', leftBarClickFunction);
document.querySelector('.left-bar').addEventListener('input', buttonStatus);

//functions
function contentClickEvents(event) {
  deleteCard(event.target);
  clickOnTusk(event.target);
  markUrgent(event.target);
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

function clickOnTusk(target) {
  if (target.classList.contains('checkbox') && document.querySelector(`#${target.id}:checked`)) {
    var counter = Number(target.id.replace(/-/g, " ").substring(target.id.length - 1));
    var indexOfCard = cardArray.findIndex(x=>x.counter === counter);
    cardArray[indexOfCard].checkedTasks.push(target.id);
  }
  if (target.classList.contains('checkbox') && !document.querySelector(`#${target.id}:checked`)) {
    var counter = Number(target.id.replace(/-/g, " ").substring(target.id.length - 1));
    var indexOfCard = cardArray.findIndex(x=>x.counter === counter);
    var index = cardArray[indexOfCard].checkedTasks.indexOf(target.id);
    cardArray[indexOfCard].checkedTasks.splice(index, 1);
  }
}

function deleteCard(target) {
  if (target.classList.contains('delete-icon')) {
    var counter = Number(target.id);
    var indexOfCard = cardArray.findIndex(x=>x.counter === counter);
    cardArray[indexOfCard].checkAllChecked();
    console.log(cardArray[indexOfCard].checkedTasks);
    if (cardArray[indexOfCard].allChecked) {
      target.closest('article').remove();
    }
    hideColumn();
  }
}

function hideColumn(){
  var column = document.querySelector('.column-one');
  if (column.innerHTML == "") {
    column.style.display = "none";
  }
}

function markUrgent(target) {
  var counter = Number(target.id);
  var indexOfCard = cardArray.findIndex(x=>x.counter === counter);
  if (target.classList.contains('urgent-icon') && !cardArray[indexOfCard].urgent) {
    cardArray[indexOfCard].makeUrgent();
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
      createTaskCard(event);
    }
    clearAll()
    disableMakeAndClearButtons()
  }
}

function disableMakeAndClearButtons() {
  document.querySelector('.make-task-list-button').disabled = true;
  document.querySelector('#clear-all').disabled = true;
}

function createTaskCard(event) {
  var taskTitle =  document.getElementById('task-title').value;
  var newCard = new ToDo(taskTitle);
  newCard.tasks = taskArray;
  newCard.createCard();
  newCard.createCheckbox();
  cardArray.push(newCard);
  taskArray = [];
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
