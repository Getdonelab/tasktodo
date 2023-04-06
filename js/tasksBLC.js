// Golbal Variable
var userTasks = {
  TasksList: [],
};

// Toggle the Empty state
function toggleEmptyState(array) {
  if (array.length > 0) {
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
    <svg width="12" height="12" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79293 7.50004L1.14648 1.85359L1.85359 1.14648L7.50004 6.79293L13.1465 1.14648L13.8536 1.85359L8.20714 7.50004L13.8536 13.1465L13.1465 13.8536L7.50004 8.20714L1.85359 13.8536L1.14648 13.1465L6.79293 7.50004Z" fill="rgba(180, 188, 208, 0.8)"/>
</svg>

      
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
    <svg width="12" height="12" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79293 7.50004L1.14648 1.85359L1.85359 1.14648L7.50004 6.79293L13.1465 1.14648L13.8536 1.85359L8.20714 7.50004L13.8536 13.1465L13.1465 13.8536L7.50004 8.20714L1.85359 13.8536L1.14648 13.1465L6.79293 7.50004Z" />
</svg>

      
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
      toggleEmptyState(tz.userTasks);
      TaskIltration(tz);
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
    <svg width="12" height="12" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.79293 7.50004L1.14648 1.85359L1.85359 1.14648L7.50004 6.79293L13.1465 1.14648L13.8536 1.85359L8.20714 7.50004L13.8536 13.1465L13.1465 13.8536L7.50004 8.20714L1.85359 13.8536L1.14648 13.1465L6.79293 7.50004Z" fill="rgba(180, 188, 208, 0.8)"/>
</svg>

      
    </div>
    </div>`;

    newTextNode.insertAdjacentHTML("afterbegin", stringNode);
    modifieTaskList(event.target.value, _id);
    newTask.value = "";
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
    var _id = editTask.parentElement.parentElement.parentElement.id;

    var index = userTasks.TasksList.findIndex(({ id }) => id == _id);
    event.target
      .closest("#completeState")
      .setAttribute("txtcontent", editTask.innerHTML);
    userTasks.TasksList[index].taskDescription = editTask.innerHTML;
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

    toggleEmptyState(userTasks.TasksList);

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
      var completed = prnt.closest(".taskTodos").querySelector(".completed");

      prnt.closest(".command-menu-option").remove();

      completed.prepend(taskItem);

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

      var tempElement = prnt.closest(".command-menu-option");
      prnt.closest(".command-menu-option").remove();
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

//empty state on click input focus

document.getElementById("empty-state-txt").addEventListener("click", (e) => {
  document.getElementById("myText").focus();
});

//unique ID generation

const uid = function () {
  return Date.now().toString(16) + Math.random().toString(16).slice(2);
};
