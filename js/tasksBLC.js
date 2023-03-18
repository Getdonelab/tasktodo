// Golbal Variable
var userTasks = {
  TasksList: [],
};

// Map through each Task
function TaskIltration(array) {
  var incomplete = array.userTasks.filter((task) => {
    return task.check === false;
  });
  var completed = array.userTasks.filter((task) => {
    return task.check === true;
  });

  incomplete.forEach((task) => {
    var newTextNode = document.getElementsByClassName("incomplete")[0];
    var stringNode = `<div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option"
  >
    <label class="w-checkbox checkbox-field">
      <div
      
      id="task"
      txtcontent="${task.taskDescription}"
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox ${
          task.check ? "w--redirected-checked" : ""
        }"
      ></div>
      <input
        type="checkbox"
        id="checkbox-3"
        name="checkbox-3"
        data-name="Checkbox 3"
        style="opacity: 0; position: absolute; z-index: -1"
      /><span

      style="${task.check ? "text-decoration:line-through ; opacity:0.6" : ""}"
      
        class="checkbox-label w-form-label strike"
        for="checkbox-3"
        >${task.taskDescription}</span
      >
    </label>
    <div class="div-block" id="cross">
      <img
        src="images/x-icon.svg"
        id ="${task.taskDescription}"
        loading="lazy"
        style="
          -webkit-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -moz-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -ms-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
        "
        data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82d6"
        alt=""
        class="delete-icon"
      />
    </div>`;
    newTextNode.insertAdjacentHTML("beforeend", stringNode);
  });
  completed.forEach((task) => {
    var newTextNode = document.getElementsByClassName("completed")[0];
    var stringNode = `<div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option"
  >
    <label class="w-checkbox checkbox-field">
      <div
      
      id="task"
      txtcontent="${task.taskDescription}"
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox ${
          task.check ? "w--redirected-checked" : "checked"
        }"
      ></div>
      <input
        type="checkbox"
        id="checkbox-3"
        name="checkbox-3"
        data-name="Checkbox 3"
        style="opacity: 0; position: absolute; z-index: -1"
      /><span

      style="${task.check ? "text-decoration:line-through ; opacity:0.6" : ""}"
      
        class="checkbox-label w-form-label strike"
        for="checkbox-3"
        >${task.taskDescription}</span
      >
    </label>
    <div class="div-block" id="cross">
      <img
        src="images/x-icon.svg"
        id ="${task.taskDescription}"
        loading="lazy"
        style="
          -webkit-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -moz-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -ms-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
        "
        data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82d6"
        alt=""
        class="delete-icon"
      />
    </div>`;
    newTextNode.insertAdjacentHTML("beforeend", stringNode);
  });
}

// On load find the list and ilterte through it
window.onload = () => {
  chrome.storage.sync.get("userTasks", function (tz) {
    if (tz.userTasks.length > 0) {
      userTasks = { TasksList: [...tz.userTasks.reverse()] };
      TaskIltration(tz);
    }
  });
};

var newTask = document.getElementById("myText");
newTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    var newTextNode = document.getElementsByClassName("incomplete")[0];
    var stringNode = `<div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option"
  >
    <label class="w-checkbox checkbox-field">
      <div
      id="task"
      txtcontent="${event.target.value}"
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox ${
          event.target.check ? "w--redirected-checked" : "checked"
        }"
      ></div>
      <input
        type="checkbox"
        id="checkbox-3"
        name="checkbox-3"
        data-name="Checkbox 3"
        style="opacity: 0; position: absolute; z-index: -1"
      /><span

        style="${
          event.target.check ? "text-decoration:line-through ; opacity:0.6" : ""
        }"
      
        class="checkbox-label w-form-label strike"
        for="checkbox-3"
        >${event.target.value}</span
      >
    </label>
    <div class="div-block" id="cross" ">
      <img
      id ="${event.target.value}"
        src="images/x-icon.svg"
        loading="lazy"
        style="
          -webkit-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -moz-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -ms-transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          transform: translate3d(1px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
        "
        data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82d6"
        alt=""
        class="delete-icon"
      />
    </div>`;

    newTextNode.insertAdjacentHTML("afterbegin", stringNode);
    modifieTaskList(event.target.value);
    newTask.value = "";
  }
});

function modifieTaskList(taskdddd) {
  userTasks.TasksList.push({
    taskDescription: taskdddd,
    check: false,
  });
  chrome.storage.sync.set({ userTasks: userTasks.TasksList });
}

document.addEventListener("click", function (e) {
  const radio = e.target.closest("#task");
  const target = e.target.closest("#cross"); // Or any other selector.

  if (target) {
    userTasks.TasksList.splice(
      userTasks.TasksList.findIndex(
        ({ taskDescription }) => taskDescription == e.target.id
      ),
      1
    );
    chrome.storage.sync.set({ userTasks: userTasks.TasksList });

    target.closest(".command-menu-option").remove();
  } else if (radio) {
    const index = userTasks.TasksList.findIndex(
      ({ taskDescription }) =>
        taskDescription == e.target.getAttribute("txtcontent")
    );

    userTasks.TasksList[index].check = !userTasks.TasksList[index].check;

    chrome.storage.sync.set({ userTasks: userTasks.TasksList });

    var prnt = radio.parentElement;

    if (userTasks.TasksList[index].check) {
      var TaskText = prnt.querySelector("span");
      var checkbox = prnt.querySelector("#task");
      var taskItem = prnt.closest(".command-menu-option");
      var taskTodos = prnt.closest(".taskTodos");

      prnt.closest(".command-menu-option").remove();

      taskTodos.appendChild(taskItem);

      var tempUser = userTasks.TasksList[index];

      userTasks.TasksList.splice(index, 1);

      userTasks.TasksList.push(tempUser);

      chrome.storage.sync.set({ userTasks: userTasks.TasksList });

      checkbox.classList.remove("checked");
      checkbox.classList.add("w--redirected-checked");

      TaskText.style.textDecoration = "line-through";
      TaskText.style.opacity = "0.6";
    } else {
      var TaskText = prnt.querySelector("span");
      var checkbox = prnt.querySelector("#task");
      var incompleteTasks = prnt
        .closest(".taskTodos")
        .querySelector(".incomplete");

      checkbox.classList.remove("w--redirected-checked"); /*clean this up*/
      checkbox.classList.add("checked");
      TaskText.style.textDecoration = "none";
      TaskText.style.opacity = "1";

      var tempUser = userTasks.TasksList[index];

      userTasks.TasksList.splice(index, 1);

      chrome.storage.sync.set({
        userTasks: [tempUser, ...userTasks.TasksList.reverse()],
      });

      var tempElement = prnt.closest(".command-menu-option");
      prnt.closest(".command-menu-option").remove();
      incompleteTasks.appendChild(tempElement);
    }
  }
});
