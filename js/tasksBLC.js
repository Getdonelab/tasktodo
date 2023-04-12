// Golbal Variable
var userTasks = {
  TasksList: [],
};
let draggables = document.querySelectorAll(".task-container");
let incompleteContainer = document.querySelector(".incomplete");
let completeContainer = document.querySelector(".complete");

// Toggle the Empty state
function toggleEmptyState(array) {
  if (array && array.length > 0) {
    document.getElementById("toggleEmptyState").style.display = "none";
    var element = document.getElementById("email-form");
    var addTaskInput = document.getElementById("myText");
    element.classList.remove("form");
  } else {
    document.getElementById("toggleEmptyState").style.display = "flex";
    var element = document.getElementById("email-form");
    var addTaskInput = document.getElementById("myText");
    element.classList.add("form");
    addTaskInput.focus();
  }
}

// Select intial theme
function initThemeSelector() {
  var themeSelect = document.getElementById("themeSelect");
  var styleSheet = document.getElementById("themeStyleLink");
  var currentTheme = localStorage.getItem("theme") || "default";

  function activateTheme(themeName) {
    styleSheet.setAttribute("href", `./css/themes/${themeName}.css`);
  }

  themeSelect.addEventListener("click", () => {
    if (themeSelect.getAttribute("value") === "default") {
      themeSelect.setAttribute("value", "light");
      themeSelect.children[0].innerHTML = "Switch to Dark Theme";
      activateTheme(themeSelect.getAttribute("value"));
      localStorage.setItem("theme", themeSelect.getAttribute("value"));
    } else {
      themeSelect.setAttribute("value", "default");
      themeSelect.children[0].innerHTML = "Switch to Light Theme";
      activateTheme(themeSelect.getAttribute("value"));
      localStorage.setItem("theme", themeSelect.getAttribute("value"));
    }
  });
  themeSelect.setAttribute("value", currentTheme);
  if (themeSelect.getAttribute("value") === "default") {
    themeSelect.children[0].innerHTML = "Switch to Light Theme";
  } else {
    themeSelect.children[0].innerHTML = "Switch to Dark Theme";
  }
  activateTheme(currentTheme);
}

initThemeSelector();

// Map through each Task
function TaskIltration(array) {
  var incomplete = array.userTasks.filter((task) => {
    return task.check === false;
  });
  var completed = array.userTasks.filter((task) => {
    return task.check === true;
  });

  incomplete.reverse().forEach((task) => {
    var newTextNode = document.getElementsByClassName("incomplete")[0];
    var stringNode = `
    <div class="task-container show" draggable="true" id="${task.id}">
    <div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option "
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
    <svg width="12" height="12" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id ="${
      task.taskDescription
    }">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79293 7.50004L1.14648 1.85359L1.85359 1.14648L7.50004 6.79293L13.1465 1.14648L13.8536 1.85359L8.20714 7.50004L13.8536 13.1465L13.1465 13.8536L7.50004 8.20714L1.85359 13.8536L1.14648 13.1465L6.79293 7.50004Z" fill="rgba(180, 188, 208, 0.8)"/>
</svg>

      
    </div>
    </div>
    </div>`;
    newTextNode.insertAdjacentHTML("beforeend", stringNode);
  });
  completed.reverse().forEach((task) => {
    var newTextNode = document.getElementsByClassName("completed")[0];
    var stringNode = `
    <div class="task-container show" draggable="true" id="${task.id}">
    <div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option "
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
    <svg width="12" height="12" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id ="${
      task.taskDescription
    }">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79293 7.50004L1.14648 1.85359L1.85359 1.14648L7.50004 6.79293L13.1465 1.14648L13.8536 1.85359L8.20714 7.50004L13.8536 13.1465L13.1465 13.8536L7.50004 8.20714L1.85359 13.8536L1.14648 13.1465L6.79293 7.50004Z" />
</svg>

      
    </div>
    </div>
    </div>`;
    newTextNode.insertAdjacentHTML("beforeend", stringNode);
  });
}

// On load find the list and ilterte through it
window.onload = () => {
  chrome.storage.sync.get("userTasks", function (tz) {
    if (tz.userTasks && tz.userTasks.length > 0) {
      userTasks = { TasksList: [...tz.userTasks] };
      toggleEmptyState(tz.userTasks);
      TaskIltration(tz);
      UpdateTodoState();
    } else {
      toggleEmptyState(tz.userTasks);
    }
  });
};

var newTask = document.getElementById("myText");
newTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    var _id = uid();
    event.preventDefault();

    var newTextNode = document.getElementsByClassName("incomplete")[0];
    var stringNode = `
    <div class="task-container show" draggable="true" id="${_id}">
    <div
    data-w-id="f9655d9a-c9ef-4b52-07e0-d4021edf82cf"
    class="command-menu-option "
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
    <div class="div-block" id="cross">
    <svg width="12" height="12" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id ="${
      event.target.value
    }">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79293 7.50004L1.14648 1.85359L1.85359 1.14648L7.50004 6.79293L13.1465 1.14648L13.8536 1.85359L8.20714 7.50004L13.8536 13.1465L13.1465 13.8536L7.50004 8.20714L1.85359 13.8536L1.14648 13.1465L6.79293 7.50004Z" fill="rgba(180, 188, 208, 0.8)"/>
</svg>

      
    </div>
    </div>
    </div>`;

    newTextNode.insertAdjacentHTML("afterbegin", stringNode);

    modifieTaskList(event.target.value, _id);
    newTask.value = "";
    UpdateTodoState();
  }
});

function modifieTaskList(taskDescription, _id) {
  userTasks.TasksList.push({
    id: _id,
    taskDescription,
    check: false,
  });
  chrome.storage.sync.set({ userTasks: userTasks.TasksList });
  toggleEmptyState(userTasks.TasksList);
  UpdateTodoState();
}

document.addEventListener("keypress", (e) => {
  const editTask = e.target.closest("span");
  if (editTask) {
    if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector("span").removeAttribute("contenteditable");
    }
    document.addEventListener(
      "click",
      (event) => {
        var isClickInside = editTask.contains(event.target);

        if (!isClickInside) {
          var _id = editTask.parentElement.parentElement.parentElement.id;

          var index = userTasks.TasksList.findIndex(({ id }) => id == _id);
          userTasks.TasksList[index].taskDescription = editTask.innerHTML;
          e.target
            .closest("#completeState")
            .setAttribute("txtcontent", editTask.innerHTML);
          chrome.storage.sync.set({ userTasks: userTasks.TasksList });
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
    var _id = editTask.parentElement.parentElement.parentElement.id;

    var index = userTasks.TasksList.findIndex(({ id }) => id == _id);
    event.target
      .closest("#completeState")
      .setAttribute("txtcontent", editTask.innerHTML);
    userTasks.TasksList[index].taskDescription = editTask.innerHTML;
    chrome.storage.sync.set({ userTasks: userTasks.TasksList });
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

    toggleEmptyState(userTasks.TasksList);

    target.closest(".task-container").remove();
    UpdateTodoState();
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
      var taskItem = prnt.closest(".task-container");
      var completed = prnt.closest(".taskTodos").querySelector(".completed");

      taskItem.classList.remove("show");
      taskItem.addEventListener(
        "transitionend",
        () => {
          completed.prepend(taskItem);
          setTimeout(() => {
            taskItem.classList.add("show");
          }, 100);
        },
        { once: true }
      );

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
      var tempElement = prnt.closest(".task-container");

      // taskItem.classList.add("show");

      prnt.closest(".task-container").remove();
      incompleteTasks.appendChild(tempElement);

      checkbox.classList.remove("w--redirected-checked"); /*clean this up*/
      checkbox.classList.add("checked");
      TaskText.style.textDecoration = "none";
      TaskText.style.opacity = "1";

      var tempUser = userTasks.TasksList[index];

      userTasks.TasksList.splice(index, 1);

      chrome.storage.sync.set({
        userTasks: [tempUser, ...userTasks.TasksList],
      });

      userTasks.TasksList = [tempUser, ...userTasks.TasksList];
    }
    UpdateTodoState();
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
    UpdateTodoState();
  }
});

//drag and drop functionality
let Pos;
// drag

document.addEventListener("dragstart", (e) => {
  let draggable = e.target;
  const box = draggable.getBoundingClientRect();
  Pos = Math.trunc(box.top - box.height / 2);
  draggable.classList.add("dragging");

  draggable.addEventListener(
    "dragend",
    () => {
      draggable.classList.remove("dragging");
      const box = draggable.getBoundingClientRect();
      Pos = (Pos - Math.trunc(box.top - box.height / 2)) / 60;

      if (Pos < 0) {
        const draggableId = draggable.getAttribute("id");
        const temp = userTasks.TasksList.find(
          (task) => task.id === draggableId
        );
        const tempIndex = userTasks.TasksList.findIndex((task) => {
          return task.id === draggableId;
        });

        for (let index = tempIndex; index > tempIndex + Pos; index--) {
          userTasks.TasksList[index] = userTasks.TasksList[index - 1];
        }
        userTasks.TasksList[tempIndex + Pos] = temp;
      } else if (Pos > 0) {
        const draggableId = draggable.getAttribute("id");
        const temp = userTasks.TasksList.find(
          (task) => task.id === draggableId
        );
        const tempIndex = userTasks.TasksList.findIndex(
          (task) => task.id === draggableId
        );

        for (let index = tempIndex; index < tempIndex + Pos; index++) {
          userTasks.TasksList[index] = userTasks.TasksList[index + 1];
        }
        userTasks.TasksList[tempIndex + Pos] = temp;
      }
      chrome.storage.sync.set({ userTasks: userTasks.TasksList });
    },
    { once: true }
  );
});

//incomplete container
if (incompleteContainer) {
  incompleteContainer.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(incompleteContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      incompleteContainer.appendChild(draggable);
    } else {
      incompleteContainer.insertBefore(draggable, afterElement);
    }
  });
}

//complete container
if (completeContainer) {
  completeContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(completeContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      completeContainer.appendChild(draggable);
    } else {
      completeContainer.insertBefore(draggable, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".task-container:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function UpdateTodoState() {
  draggables = document.querySelectorAll(".task-container");
  incompleteContainer = document.querySelector(".incomplete");
  completeContainer = document.querySelector(".complete");
}

//empty state on click input focus
document.getElementById("empty-state-txt").addEventListener("click", (e) => {
  document.getElementById("myText").focus();
});

//unique ID generation

const uid = function () {
  return Date.now().toString(16) + Math.random().toString(16).slice(2);
};
