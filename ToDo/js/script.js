const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoCompleted = document.querySelector(".todo-completed");
const todoList = document.querySelector(".todo-list");

const toDoData = [];

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    const completeButton = li.querySelector(".todo-complete");
    completeButton.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);

  headerInput.value = "";
  render();
});

render();
