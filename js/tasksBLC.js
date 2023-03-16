// Golbal Variable
var userTasks = {
  TasksList: [],
};

// Map through each Task
function TaskIltration(array) {
  array.userTasks.forEach((task) => {
    var newTextNode = document.getElementById("appendNewChild");
    var stringNode = `<div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option"
  >
    <label class="w-checkbox checkbox-field">
      <div
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"
      ></div>
      <input
        type="checkbox"
        id="checkbox-3"
        name="checkbox-3"
        data-name="Checkbox 3"
        style="opacity: 0; position: absolute; z-index: -1"
      /><span
        class="checkbox-label w-form-label"
        for="checkbox-3"
        >${task.taskDescription}</span
      >
    </label>
    <div class="div-block">
      <img
        src="images/x-icon.svg"
        loading="lazy"
        style="
          opacity: 0;
          -webkit-transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -moz-transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -ms-transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
        "
        data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82d6"
        alt=""
        class="delete-icon"
      />
    </div>`;
    newTextNode.insertAdjacentHTML("afterend", stringNode);
  });
}

// On load find the list and ilterte through it
window.onload = () => {
  chrome.storage.sync.get("userTasks", function (tz) {
    if (tz.userTasks.length > 0) {
      userTasks = { TasksList: [...tz.userTasks] };
      TaskIltration(tz);
    }
  });
};

var newTask = document.getElementById("myText");
newTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    var newTextNode = document.getElementById("appendNewChild");
    var stringNode = `<div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option"
  >
    <label class="w-checkbox checkbox-field">
      <div
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"
      ></div>
      <input
        type="checkbox"
        id="checkbox-3"
        name="checkbox-3"
        data-name="Checkbox 3"
        style="opacity: 0; position: absolute; z-index: -1"
      /><span
        class="checkbox-label w-form-label"
        for="checkbox-3"
        >${event.target.value}</span
      >
    </label>
    <div class="div-block">
      <img
        src="images/x-icon.svg"
        loading="lazy"
        style="
          opacity: 0;
          -webkit-transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -moz-transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          -ms-transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
          transform: translate3d(40px, 0, 0)
            scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0) skew(0, 0);
        "
        data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82d6"
        alt=""
        class="delete-icon"
      />
    </div>`;
    newTextNode.insertAdjacentHTML("afterend", stringNode);
    modifieTaskList(event.target.value);
    newTask.value = "";
  }
});

function modifieTaskList(taskdddd) {
  userTasks.TasksList.push({
    cheked: false,
    taskDescription: taskdddd,
  });
  chrome.storage.sync.set({ userTasks: userTasks.TasksList });
}
