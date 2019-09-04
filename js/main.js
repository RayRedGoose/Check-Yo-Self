var taskArray = [];
document.querySelector('.make-task-list-button').disabled = true;
document.querySelector('#clear-all').disabled = true;
// function that places card from array into page

document.querySelector('.add-button-text').addEventListener('click', function() {
  if (document.getElementById('task-input').value != "" && document.getElementById('task-input').value != " ") {
    var li = document.createElement('li')
    var value = document.getElementById('task-input').value;
    taskArray.push(value);
    var li = document.createElement('li');
    taskArray.forEach(function(element) {
      document.querySelector('.task-list').appendChild(li);
      li.classList.add('task-item');
      li.innerHTML = `<p class='item-text'>${element}</p>`;
      document.querySelector('.make-task-list-button').disabled = false;
    });
}
    document.getElementById('task-input').value = "";

})

document.querySelector('.make-task-list-button').addEventListener('click', function(){
  checkEmptyInputs();
  if (document.querySelector('#task-title').value != "" && document.querySelector('.task-list').innerHTML != "") {
    createTaskCard();
  }
  document.getElementById('task-title').value = '';
  document.getElementById('task-input').value = '';

  document.querySelector('.make-task-list-button').disabled = true;
  document.querySelector('#clear-all').disabled = true;

})

function createTaskCard() {
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
    div.innerHTML = `<input id='list-${randomId}' class="checkbox" type="checkbox"><label class='label-checkbox' for="list-${randomId}"><p class='item-text'>${element}</p></label>`;
  });

  taskArray = [];
  document.querySelector('.task-list').innerHTML = "";
}

document.querySelector('.left-bar').addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.classList.contains('task-item')) {
    event.target.remove();
  }
  if (event.target.classList.contains('error-input')) {
    clearErrorMessage();
  }
})

document.querySelector('.left-bar').addEventListener('input', function(event){
  if (event.target.classList.contains('left-input') && document.querySelector('.left-input').value.length > 0 && document.querySelector('.task-list').innerHTML != "") {
    document.querySelector('.make-task-list-button').disabled = false;
  } else if (event.target.classList.contains('left-input') && document.querySelector('.left-input').value.length > 0) {
    document.querySelector('#clear-all').disabled = false;
  } else {
      document.querySelector('.make-task-list-button').disabled = true;
      document.querySelector('#clear-all').disabled = true;

  }
})

document.getElementById('clear-all').addEventListener('click', function() {
  document.querySelector('.task-list').innerHTML = "";
  document.querySelector('#task-title').value = "";
  document.getElementById('task-input').value = "";
})

function checkEmptyInputs() {
  var taskTitleValue = document.querySelector('#task-title').value;
  var taskList = document.querySelector('.task-list').innerHTML;

  if (taskTitleValue == "" || taskList == "") {
    document.querySelector('#task-title').classList.add('error-input');
    document.querySelector('#task-input').classList.add('error-input');
    document.querySelector('.error').style.display = "block";
  }
}

function clearErrorMessage() {
  document.querySelector('#task-title').classList.remove('error-input');
  document.querySelector('#task-input').classList.remove('error-input');
  document.querySelector('.error').style.display = "none";
}
