const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoCompleted = document.querySelector(".todo-completed");
const todoList = document.querySelector(".todo-list");

// Получаем данные из localStorage при загрузке страницы
const savedToDoData = localStorage.getItem("toDoData");
const toDoData = savedToDoData ? JSON.parse(savedToDoData) : [];

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
      saveToDoData(); // Сохраняем обновленные данные при изменении
    });

    const removeButton = li.querySelector(".todo-remove");
    removeButton.addEventListener("click", function () {
      const index = toDoData.indexOf(item);
      toDoData.splice(index, 1);
      render();
      saveToDoData(); // Сохраняем обновленные данные при изменении
    });

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
  });
};

// Функция для сохранения данных в localStorage
const saveToDoData = function () {
  localStorage.setItem("toDoData", JSON.stringify(toDoData));
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  if (headerInput.value.trim() === "") {
    alert("Ошибка: пустые дела добавляться не должны");
    return;
  }

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);

  headerInput.value = "";
  render();
  saveToDoData(); // Сохраняем обновленные данные при добавлении нового дела
});

render();
