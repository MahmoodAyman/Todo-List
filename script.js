let taskName = document.getElementById("task_name");
let addTaskBtn = document.getElementById("add_task_btn");
let errMsg = document.getElementById("error_msg");
let taskList = document.querySelector(".task_box");
let i = 1;

let tasks = JSON.parse(localStorage.getItem("taskList"));

addTaskBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (taskName.value == "") {
    errMsg.style.display = "block";
  } else {
    let new_task = document.createElement("li");
    new_task.classList.add("task");
    new_task.id = `task_${i}`;
    new_task.innerHTML = `<label for="task${i}">
      <input type="checkbox" onclick="markAsComplete('1')" name="" id="task${i}" />
      <p>${taskName.value}</p>
    </label>
    <div class="task_controls" id="taskControls${i}">
      <i class="fa-solid fa-ellipsis"></i>
      <ul class="task_operations">
        <li class="edit_task" onclick="edit_task('${i}')">
          <i class="fa-solid fa-pen-clip"></i>Edit
        </li>
        <li class="delete_task" onclick="delete_task('${i}')">
          <i class="fa-solid fa-trash"></i>Delete
        </li>
      </ul>
    </div>`;
    console.log(new_task);
    taskList.appendChild(new_task);
    taskName.value = "";
    i++;
  }
});
function showTodoList() {
  if (tasks) {
    tasks.forEach((element, i) => {
      let new_task = document.createElement("li");
      new_task.classList.add("task");
      new_task.id = `task_${i}`;
      new_task.innerHTML = `<label for="task${i}">
      <input type="checkbox" onclick="markAsComplete('1')" name="" id="task${i}" />
      <p>${taskName.value}</p>
    </label>
    <div class="task_controls" id="taskControls${i}">
      <i class="fa-solid fa-ellipsis"></i>
      <ul class="task_operations">
        <li class="edit_task" onclick="edit_task('${i}')">
          <i class="fa-solid fa-pen-clip"></i>Edit
        </li>
        <li class="delete_task" onclick="delete_task('${i}')">
          <i class="fa-solid fa-trash"></i>Delete
        </li>
      </ul>
    </div>`;
      console.log(new_task);
      taskList.appendChild(new_task);
    });
  }
}
showTodoList();
function edit_task(id) {
  let task = document.getElementById(`task_${id}`);
  let taskName = task.firstChild.querySelector("p");
  task.firstChild.innerHTML = `<input type="text" id="task_name" value="${taskName.innerHTML}" /> <button class="save_task" onclick="save_task('${id}')">Save</button>`;
  let task_ops = document.getElementById(`taskControls${id}`);
  task_ops.style.display = "none";
}
function save_task(id) {
  let task = document.getElementById(`task_${id}`);
  let taskName = task.firstChild.querySelector("input");
  task.firstChild.innerHTML = `
      <input type="checkbox" name="" id="task${id}" />
      <p>${taskName.value}</p>`;
  let task_ops = document.getElementById(`taskControls${id}`);
  task_ops.style.display = "block";
}
function delete_task(id) {
  let task = document.getElementById(`task_${id}`);
  taskList.removeChild(task);
}
document.querySelector(".clear_btn").addEventListener("click", function () {
  taskList.innerHTML = "";
});
completedTasks = [];
function markAsComplete(id) {
  let task = document.getElementById(`task_${id}`);
  if (task.querySelector("input").checked) {
    task.querySelector("p").classList.add("completed");
    tasks[id].status = "true";
  } else {
    task.querySelector("p").classList.remove("completed");
    completedTasks.splice(completedTasks.indexOf(task), 1);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
