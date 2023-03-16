// Golbal Variable
console.log("i am in right folder!!");
var userTasks = {
  TasksList: [
    // {
    //   cheked: false,
    //   taskDescription: "my meeting with nomair",
    // },
    // {
    //   cheked: false,
    //   taskDescription: "EDR FrontEnd code",
    // },
  ],
};

//Set Task Cookies
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Get Cookies
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// var userJsonTasks = JSON.stringify(userTasks);
// setCookie("UserTasks", userJsonTasks, 7);

// window.onload = (event) => {
//   var savedUserJsonTasks = getCookie("UserTasks");
//   var tasks = JSON.parse(savedUserJsonTasks);
// };

// Map through each Task
function TaskIltration(array) {
  array.userTasks.forEach((task) => {
    var newTextNode = document.getElementById("appendNewChild");
    var stringNode = `<div class="command-menu-option">
      <label class="w-checkbox checkbox-field">
         <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div>
         <input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label w-form-label" for="checkbox"> ${task.taskDescription}</span>
      </label>
      <div class="time-text">40 min</div>
    </div>`;
    newTextNode.insertAdjacentHTML("afterend", stringNode);
  });
}
// savedUserJsonTasks.TasksList.forEach((task) => {
//   var newTextNode = document.getElementById("appendNewChild");
//   var stringNode = `<div class="command-menu-option">
//   <label class="w-checkbox checkbox-field">
//      <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div>
//      <input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label w-form-label" for="checkbox">I love you ${task.taskDescription}</span>
//   </label>
//   <div class="time-text">40 min</div>
// </div>`;
//   newTextNode.insertAdjacentHTML("afterend", stringNode);
// });

// function For New Task

window.onload = () => {
  chrome.storage.sync.get("userTasks", function (tz) {
    console.log("🚀 ~ file: webflow.js:94 ~ tz:", tz);

    if (tz.userTasks.length > 0) {
      userTasks = { TasksList: [...tz.userTasks] };
      console.log("🚀 ~ file: webflow.js:83 ~ userTasks:", userTasks);
      TaskIltration(tz);
    }
  });
};

var newTask = document.getElementById("myText");
newTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    var newTextNode = document.getElementById("appendNewChild");
    var stringNode = `<div class="command-menu-option"><label class="w-checkbox checkbox-field">
                          <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div><input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" style="opacity:0;position:absolute;z-index:-1"><span class="checkbox-label w-form-label" for="checkbox">${event.target.value}</span>
                        </label>
                        <div class="time-text">40 min</div>
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

  console.log(
    "🚀 ~ file: webflow.js:107 ~ modifieTaskList ~ userTasks:",
    userTasks
  );
  chrome.storage.sync.set({ userTasks: userTasks.TasksList });

  // var userJsonTasks = JSON.stringify(userTasks);
  // setCookie("UserTasks", userJsonTasks, 7);

  // var savedUserJsonTasks = getCookie("UserTasks");
  // var tasks = JSON.parse(savedUserJsonTasks);
  // console.log("🚀 ~ file: webflow.js:105 ~ modifieTaskList ~ tasks:", tasks);
}
