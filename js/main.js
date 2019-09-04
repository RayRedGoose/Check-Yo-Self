var cardArray = [];
var taskArray = [];

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
      li.innerHTML = `${element}`;
    });
}
    document.getElementById('task-input').value = "";
})

document.querySelector('.make-task-list-button').addEventListener('click', function(){
  cardArray.push(taskArray);
  var taskTitle =  document.getElementById('task-title').value;
  var article = document.createElement('article');
  article.classList.add('task-card');
  var div = document.createElement('div');

  document.querySelector('.content').appendChild(article);
  article.innerHTML = `
  <header class="task-card__header">
        <h3 class="task-card__title">${taskTitle}</h3>
      </header>
      <section class="task-card__content"></section>
      <footer class="task-card__footer">
        <p class="icons-name urgent-icon">Urgent</p>
        <p class="icons-name delete-icon">Delete</p>
      </footer>`;

  taskArray.forEach(function(element) {
    var div = document.createElement('div');
    document.querySelector('.task-card__content').appendChild(div);
    div.innerHTML = `<input id='' class="checkbox" type="checkbox" name="" value="" checked><label class='label-checkbox--checked' for="">${element}</label>`;
  });
})

document.querySelector('.left-bar').addEventListener('click', function(event) {
  if (event.target.classList.contains('task-item')) {
    event.target.remove();
  }
  if (event.target.classList.contains('make-task-list-button')) {
    checkEmptyInputs();
  }
  if (event.target.classList.contains('error-input')) {
    clearErrorMessage();
  }
})

function checkEmptyInputs() {
  var taskTitleValue = document.querySelector('#task-title').value;
  var taskList = document.querySelector('.task-list').innerHTML;

  if (taskTitleValue == "" || taskList == "") {
    document.querySelector('#task-title').classList.add('error-input');
    document.querySelector('#task-input').classList.add('error-input');
    document.querySelector('.error').style.display = "none";
  }
}

function clearErrorMessage() {
  document.querySelector('#task-title').classList.remove('error-input');
  document.querySelector('#task-input').classList.remove('error-input');
  document.querySelector('.error').style.display = "none";
}
