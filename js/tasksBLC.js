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
    id="${task.id}"
  >
  <div id="completeState" txtcontent="${task.taskDescription}">
    <label class="w-checkbox checkbox-field">
      <div
      
      id="task"
      
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox ${
          task.check ? "w--redirected-checked" : ""
        }"
      ></div>
      <span
      

      style="${task.check ? "text-decoration:line-through ; opacity:0.6" : ""}"
      
        class="checkbox-label w-form-label strike"
        for="checkbox-3"
        >${task.taskDescription}</span
      >
    </label>
    </div>
    <div class="functions">
    <button class="Todo__Edit">edit</button>
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
    </div>
    </div>`;
    newTextNode.insertAdjacentHTML("beforeend", stringNode);
  });
  completed.forEach((task) => {
    var newTextNode = document.getElementsByClassName("completed")[0];
    var stringNode = `<div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option"
    id="${task.id}"
  >
  <div id="completeState" txtcontent="${task.taskDescription}">
    <label class="w-checkbox checkbox-field">
      <div
      
      id="task"
      
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox ${
          task.check ? "w--redirected-checked" : "checked"
        }"
      ></div>
      <span
      

      style="${task.check ? "text-decoration:line-through ; opacity:0.6" : ""}"
      
        class="checkbox-label w-form-label strike"
        for="checkbox-3"
        >${task.taskDescription}</span
      >
    </label>
    </div>
    <div class="functions">
    <button class="Todo__Edit">edit</button>
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
    </div>
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
    var _id = uid();
    event.preventDefault();

    var newTextNode = document.getElementsByClassName("incomplete")[0];
    var stringNode = `<div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option"
    id="${_id}"
  >
  <div id="completeState" txtcontent="${event.target.value}">
    <label class="w-checkbox checkbox-field">
      <div
      id="task"
      
        class="w-checkbox-input w-checkbox-input--inputType-custom checkbox ${
          event.target.check ? "w--redirected-checked" : "checked"
        }"
      ></div>
      <span
      

        style="${
          event.target.check ? "text-decoration:line-through ; opacity:0.6" : ""
        }"
      
        class="checkbox-label w-form-label strike"
        for="checkbox-3"
        >${event.target.value}</span
      >
    </label>
    </div>
    <div class="functions">
    <button class="Todo__Edit">edit</button>
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
    </div>
    </div>`;

    newTextNode.insertAdjacentHTML("afterbegin", stringNode);
    modifieTaskList(event.target.value, _id);
    newTask.value = "";
  }
});

function modifieTaskList(taskdddd, _id) {
  userTasks.TasksList.push({
    id: _id,
    taskDescription: taskdddd,
    check: false,
  });
  chrome.storage.sync.set({ userTasks: userTasks.TasksList });
}

document.addEventListener("keypress", (e) => {
  const editTask = e.target.closest("span");
  if (editTask) {
    document.addEventListener(
      "click",
      (event) => {
        var isClickInside = editTask.contains(event.target);

        if (!isClickInside) {
          var _id = editTask.parentElement.parentElement.id;

          var index = userTasks.TasksList.findIndex(({ id }) => id == _id);
          userTasks.TasksList[index].taskDescription = editTask.innerHTML;
          console.log(userTasks.TasksList[index]);
          chrome.storage.sync.set({ userTasks: userTasks.TasksList.reverse() });
          document.querySelector("span").removeAttribute("contenteditable");
        }
      },
      { once: true }
    );
  }
});

document.onkeyup = function (event) {
  const editTask = event.target.closest("span");
  if (editTask) {
    //work here not on enter but every key press
    // event.preventDefault();
    // document.querySelector("span").removeAttribute("contenteditable");
    var _id = editTask.parentElement.parentElement.parentElement.id;
    console.log(_id);

    var index = userTasks.TasksList.findIndex(({ id }) => id == _id);
    console.log(index);
    userTasks.TasksList[index].taskDescription = editTask.innerHTML;
    console.log(userTasks.TasksList[index]);
    chrome.storage.sync.set({ userTasks: userTasks.TasksList.reverse() });
  }
};

document.addEventListener("click", function (e) {
  const radio = e.target.closest("#completeState");
  const target = e.target.closest("#cross");
  const editTask = e.target.closest(".Todo__Edit");

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
        taskDescription ==
        e.target.closest("#completeState").getAttribute("txtcontent")
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

      chrome.storage.sync.set({ userTasks: userTasks.TasksList.reverse() });

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

      userTasks.TasksList = [tempUser, ...userTasks.TasksList.reverse()];

      var tempElement = prnt.closest(".command-menu-option");
      prnt.closest(".command-menu-option").remove();
      incompleteTasks.appendChild(tempElement);
    }
  }
  if (editTask) {
    e.preventDefault();

    var el = editTask.parentElement.parentElement.querySelector("span");
    el.setAttribute("contenteditable", true);
    var range, selection;
    if (document.createRange) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(el); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
      //IE 8 and lower
      range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
      range.moveToElementText(el); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      range.select(); //Select the range (make it the visible selection
    }
  }
});

const uid = function () {
  return Date.now().toString(16) + Math.random().toString(16).slice(2);
};

// const editTask = function (e) {
//   e.preventDefault();
//   console.log("here");
// };
