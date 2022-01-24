// lay elemtn
const listEL = document.querySelector(".list");
const inputEl = document.querySelector(".list__add--task");
const listAdd = document.querySelector(".list__add");
const clearEl = document.querySelector(".header__clear");

let lists = [];
let id = 0;
// load local store
window.addEventListener("load", function () {
  if (localStorage.getItem("task")) {
    lists = JSON.parse(localStorage.getItem("task"));
    id = lists.length;
    lists.forEach((el) => {
      addTask(el.task, el.id, el.done, el.trash);
    });
  } else {
    lists = [];
    id = 0;
  }
});
// update to local
const updateLocal = function (lists) {
  localStorage.setItem("task", JSON.stringify(lists));
};
// render html
const addTask = function (task, id, done, trash) {
  if (trash) return;
  // render task
  const liEl = `
  <li class="list__item">
  <i class="fa ${done ? "fa-check-circle" : "fa-circle-thin"} mark" 
   data-job="complete" aria-hidden="true" id="${id}"></i>
  <p class= "list__item--text ${done ? "complete" : ""}">${task}</p>
  <i class="fa fa-trash-o del" data-job="delete" aria-hidden="true" id="${id}"></i>
</li>`;
  listEL.insertAdjacentHTML("beforeend", liEl);
};
//  add task
listAdd.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    const todo = inputEl.value;
    const task = todo[0].toUpperCase() + todo.slice(1);
    if (!task) {
    } else {
      addTask(task, id, false, false);
      lists.push({
        id: id,
        task: task,
        done: false,
        trash: false,
      });
      localStorage.setItem("task", JSON.stringify(lists));
    }
    id++;
    // clear
    inputEl.value = "";
  }
});

listEL.addEventListener("click", function (e) {
  const element = e.target;
  const elementJob = element.dataset.job;
  // for complete
  if (elementJob == "complete") {
    completeTask(element);
  } else if (elementJob == "delete") {
    removeTask(element);
  }
  localStorage.setItem("task", JSON.stringify(lists));
});

// complete task
const completeTask = function (element) {
  element.classList.toggle("fa-check-circle");
  element.classList.toggle("fa-circle-thin");
  element.nextElementSibling.classList.toggle("complete");
  lists[element.id].done = lists[element.id].done ? false : true;
};

// remove task
const removeTask = function (element) {
  element.parentElement.remove();
  lists[element.id].trash = true;
};

// clear all
clearEl.addEventListener("click", function (e) {
  localStorage.clear();
  location.reload();
});
