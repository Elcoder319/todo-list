document.body.classList.add(localStorage.getItem("colors") || "light");
//  ======== Selectors ==========   //
let inp = document.querySelector(".todoInput .inp"),
  addTask = document.querySelector(".addTask"),
  todoList = document.querySelector(".todoList"),
  mood = "create",
  x;

addTask.addEventListener("click", () => {
  if (inp.value != "") {
    arrTasks(inp.value);
  } else {
    showAlert("Please Type In This Faild");
  }
});

// Check if Localstorage Is Empty
let arr;
if (localStorage.getItem("Tasks")) {
  arr = JSON.parse(localStorage.getItem("Tasks"));
} else {
  arr = [];
}

document.addEventListener("DOMContentLoaded", showData());

todoList.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    let targetEle = e.target.parentElement.parentElement;
    targetEle.classList.add("trash");
    targetEle.addEventListener("transitionend", () => targetEle.remove());
    deleteTask(targetEle.getAttribute("data-id"));
  } else if (e.target.className === "edit") {
    editTask(e.target.getAttribute("task-index"));
  }
});

//  Functions

function arrTasks(val) {
  let newObj = {
    id: Date.now(),
    task: val,
  };
  if (mood === "create") {
    arr.push(newObj);
    showAlert("Added Successfully");
  } else {
    arr[x] = newObj;
    addTask.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    mood = "create";
    showAlert("Task Edit");
    showData();
  }
  clearData();
  addLocal(arr);
  showData();
}

function addLocal(arr) {
  localStorage.setItem("Tasks", JSON.stringify(arr));
}

function showData() {
  todoList.innerHTML = "";
  let dateNow = new Date(),
    days = dateNow.getDate(),
    month = dateNow.getMonth() + 1,
    year = dateNow.getFullYear(),
    secound = dateNow.getSeconds();
  for (let i = 0; i < arr.length; i++) {
    let todoBox = document.createElement("div");
    todoBox.className = "todoBox";
    todoBox.setAttribute("data-id", arr[i].id);

    let containerText = document.createElement("div");
    containerText.className = "containerText";

    let todoText = document.createElement("h3");
    todoText.className = "todoText";
    todoText.textContent = arr[i].task;
    containerText.appendChild(todoText);
    x = arr[i].task;
    let deleteBtn = document.createElement("div");
    deleteBtn.className = "delete";
    let iconDelete = document.createElement("i");
    iconDelete.className = "fa-solid fa-trash";
    deleteBtn.appendChild(iconDelete);
    containerText.appendChild(deleteBtn);
    todoBox.appendChild(containerText);

    let editBtn = document.createElement("div");
    editBtn.className = "edit";
    editBtn.setAttribute("task-index", i);
    let iconEdit = document.createElement("i");
    iconEdit.className = "fa-solid fa-pen-to-square";
    editBtn.appendChild(iconEdit);
    containerText.appendChild(editBtn);

    let todoDate = document.createElement("div");
    todoDate.className = "todoDate";
    let todoDateText = document.createTextNode(
      `${days}/${month}/${year}/${secound}`
    );
    todoDate.appendChild(todoDateText);
    todoBox.appendChild(todoDate);
    todoList.prepend(todoBox);
  }
}

function showAlert(message) {
  let div = document.createElement("div");
  div.className = "alert";
  let iconAlert = document.createElement("i");
  iconAlert.className = "fa-solid fa-circle-check";
  div.appendChild(iconAlert);
  let title = document.createElement("div");
  let titleText = document.createTextNode(message);
  title.appendChild(titleText);
  div.appendChild(title);
  document.body.prepend(div);
  div.classList.add("warning");
  setTimeout(() => {
    div.remove();
  }, 1500);
}

function deleteTask(taskId) {
  mood = "creaet";
  arr = arr.filter((task) => task.id != taskId);
  addLocal(arr);
  showAlert("Task Deleted");
  showData();
}

function editTask(task) {
  console.log(task);
  clearData();
  inp.focus();
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  mood = "edit";
  x = task;
  inp.value = arr[task].task;
  addTask.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
}

function clearData() {
  inp.value = "";
}

// change background color
let colors = document.querySelectorAll(".colors .change-color i");
let colorsArr = [];

for (let i = 0; i < colors.length; i++) {
  colorsArr.push(colors[i].getAttribute("data-body"));
  colors[i].addEventListener(
    "click",
    () => {
      document.body.classList.remove(...colorsArr);
      document.body.classList.add(colors[i].getAttribute("data-body"));

      localStorage.setItem("colors", colors[i].getAttribute("data-body"));
    },
    false
  );
}

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask.click();
  }
});
