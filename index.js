const todoText = document.querySelector("#todo-text");
const todoContainer = document.querySelector(".todo-container");
const todoContainerComplete = document.querySelector(".todo-container-complete");
const todoBtn = document.querySelector(".todo-btn");
const taskTitle = document.querySelector(".task-title");
const taskArr = [];
const todoDateBtn = document.querySelector("#date-btn");
const todoDate = document.querySelector("#todo-date");
const todoLocationBtn = document.querySelector("#location-btn");
const todoLocation = document.querySelector("#todo-location");
todoDateBtn.addEventListener("click", showDate);
todoLocationBtn.addEventListener("click", showLocation);

todoBtn.addEventListener("click", addTask);
todoText.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

initialize();

function initialize() {
    checkUsername();
    registerButtons();
    setDate();
}

function showDate() {
    todoDate.classList.toggle("hide");
    todoDateBtn.classList.toggle("hide");
}

function showLocation() {
    todoLocation.classList.toggle("hide");
    todoLocationBtn.classList.toggle("hide");
}

function resetExtras() {
    if (todoDateBtn.classList.contains("hide") === true) {
        todoDate.classList.toggle("hide");
        todoDateBtn.classList.toggle("hide");
    }

    if (todoLocationBtn.classList.contains("hide") === true) {
        todoLocation.classList.toggle("hide");
        todoLocationBtn.classList.toggle("hide");
    }
}

function setDate(){
    let currentDate = new Date().toJSON().slice(0, 10);
    todoDate.min = currentDate;
}

function addTask() {
    if (todoText.value != "") {
        const taskObj = {
            text: (todoText.value.charAt(0).toUpperCase() + todoText.value.slice(1)),
            done: false,
            favorite: false,
            urgent: false,
            location: (todoLocation.value.charAt(0).toUpperCase() + todoLocation.value.slice(1)),
            date: todoDate.classList.contains("hide") ? "" : todoDate.value,
            id: crypto.randomUUID(),
        };
        taskArr.push(taskObj);
        showTaskArr();
    }
}

function showTaskArr(arr = taskArr) {
    todoContainer.innerHTML = "";

    arr.forEach(element => {
        const li = document.createElement("li");
        todoContainer.appendChild(li);
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = "completedCheck";
        const textContainer = document.createElement("div");
        const taskText = document.createElement("span");
        taskText.textContent = element.text;
        li.appendChild(textContainer);
        const deleteBtn = document.createElement("button");
        const favoriteBtn = document.createElement("button");
        const urgentBtn = document.createElement("button");
        const btnContainer = document.createElement("div");
        li.dataset.id = element.id;
        li.appendChild(btnContainer);
        textContainer.appendChild(checkbox)
        textContainer.appendChild(taskText)
        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(favoriteBtn);
        btnContainer.appendChild(urgentBtn);
        checkbox.checked = element.done;
        textContainer.classList.add("task-text-container");
        deleteBtn.dataset.function = "delete";
        favoriteBtn.dataset.function = "favorite";
        urgentBtn.dataset.function = "urgent";
        deleteBtn.classList.add("task-btn");
        favoriteBtn.classList.add("task-btn");
        urgentBtn.classList.add("task-btn");

        if(element.date != ""){
           const taskDate = document.createElement("span");
            taskDate.classList.add("task-extra");
            taskDate.innerHTML = `<img src="icons/date.svg" class="task-extras-icon" id="calender">${element.date}`;
            textContainer.appendChild(taskDate); 
        }

        if(element.location != "") {
            const taskLocation = document.createElement("span");
            taskLocation.classList.add("task-extra");
            taskLocation.innerHTML = `<img src="icons/location.svg" class="task-extras-icon">${element.location}`;
            textContainer.appendChild(taskLocation);
        }

        if(element.favorite) {
            li.style.backgroundColor = "#FF5C5C27";
        }

        if(element.urgent) {
            li.style.backgroundColor = "#FFD02A80";
            taskText.style.fontWeight = "700";
        }

        if(element.done) {
            li.style.backgroundColor = "#29D66660";
            li.style.textDecoration = "line-through";
            li.classList.toggle("done");
            
        }

        urgentBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6666 15.625H3.3333C3.22409 15.6247 3.11682 15.5962 3.0219 15.5421C2.927 15.4881 2.84767 15.4105 2.79163 15.3167C2.73835 15.2212 2.71039 15.1136 2.71039 15.0042C2.71039 14.8949 2.73835 14.7873 2.79163 14.6917L9.4583 3.02507C9.51755 2.93568 9.59805 2.86237 9.69255 2.81164C9.78714 2.76092 9.89272 2.73438 9.99997 2.73438C10.1072 2.73438 10.2128 2.76092 10.3073 2.81164C10.4018 2.86237 10.4823 2.93568 10.5416 3.02507L17.2083 14.6917C17.2616 14.7873 17.2896 14.8949 17.2896 15.0042C17.2896 15.1136 17.2616 15.2212 17.2083 15.3167C17.1522 15.4105 17.0729 15.4881 16.9781 15.5421C16.8831 15.5962 16.7758 15.6247 16.6666 15.625ZM4.4083 14.375H15.5916L9.99997 4.59174L4.4083 14.375Z" fill="#FFD02A"/>
        <path d="M4.4083 14.375H15.5916L9.99997 4.59174L4.4083 14.375Z" fill="${element.urgent ? "#FFD02A" : "none"}"/>
        <path d="M10 11.0417C9.83492 11.0395 9.67717 10.973 9.56042 10.8563C9.44367 10.7395 9.37717 10.5817 9.375 10.4167V7.5C9.375 7.33424 9.44083 7.17527 9.55808 7.05806C9.67525 6.94085 9.83425 6.875 10 6.875C10.1657 6.875 10.3248 6.94085 10.4419 7.05806C10.5592 7.17527 10.625 7.33424 10.625 7.5V10.4167C10.6228 10.5817 10.5563 10.7395 10.4396 10.8563C10.3228 10.973 10.1651 11.0395 10 11.0417Z" fill="#056dfa"/>
        <path d="M10 13.5417C9.83492 13.5395 9.67717 13.473 9.56042 13.3563C9.44367 13.2395 9.37717 13.0817 9.375 12.9167V12.5C9.375 12.3342 9.44083 12.1752 9.55808 12.0581C9.67525 11.9408 9.83425 11.875 10 11.875C10.1657 11.875 10.3248 11.9408 10.4419 12.0581C10.5592 12.1752 10.625 12.3342 10.625 12.5V12.9167C10.6228 13.0817 10.5563 13.2395 10.4396 13.3563C10.3228 13.473 10.1651 13.5395 10 13.5417Z" fill="#056dfa"/>
        </svg>`

        deleteBtn.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7H20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;

        favoriteBtn.classList.add("task-btn", "favorite-btn");
        favoriteBtn.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5C5C" stroke-width="1.8">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="${element.favorite ? "#FF5C5C" : "none"}"/> </g>
        </svg>`;

        checkbox.addEventListener("change", completeTask);
        deleteBtn.addEventListener("click", deleteTask);
        urgentBtn.addEventListener("click", urgentTask);
        favoriteBtn.addEventListener("click", favoriteTask);

    });
    console.log(taskArr);
    todoText.value = "";
    todoLocation.value = "";
    resetExtras();
    todoDate.value = "";
}

function deleteTask(event) {
    const li = event.currentTarget.closest("li");
    const taskId = li.dataset.id;
    const index = taskArr.findIndex(task => task.id === taskId);
    if (index > -1) {
        taskArr.splice(index, 1);
        showTaskArr();
    }
}

function completeTask(event) {
    const button = event.currentTarget;
    const li = button.closest("li");
    const taskId = li.dataset.id;
    const task = taskArr.find(task => task.id === taskId);
    
    if (task) {
        task.done = !task.done;
        showTaskArr(); 
    }
}

function favoriteTask(event) {
    const button = event.currentTarget;
    const li = button.closest("li");
    const taskId = li.dataset.id;
    const task = taskArr.find(task => task.id === taskId);
    
    if (task) {
        task.favorite = !task.favorite;
        showTaskArr();
    }
}

function urgentTask(event) {
    const button = event.currentTarget;
    const li = button.closest("li");
    const taskId = li.dataset.id;
    const task = taskArr.find(task => task.id === taskId);
    
    if (task) {
        task.urgent = !task.urgent;
        console.log(task);
        showTaskArr();
    }
}

// Filtrer

function registerButtons() {
    document.querySelectorAll("[data-action='filter']")
    .forEach(button => button.addEventListener("click", selectFilter));
}

function selectFilter(event) {
    const filter = event.currentTarget.dataset.filter;
    console.log(filter);
    filterList(filter);
}

function filterList(tasktype){
    let filteredList = taskArr;

    if (tasktype === "Urgent") {
        filteredList = taskArr.filter(isUrgent);
    }
    else if (tasktype === "Favorite") {
        filteredList = taskArr.filter(isFavorite);
    }
    else if (tasktype === "Completed") {
        filteredList = taskArr.filter(isDone);
    }
    
    taskTitle.textContent = `${tasktype} tasks`;
    showTaskArr(filteredList)
}

function isFavorite(task) {
    return task.favorite === true;
}

function isUrgent(task) {
    return task.urgent === true;
}

function isDone(task) {
    return task.done === true;
}


// Intro
const introNameInput = document.querySelector("#intro-name");

introNameInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const username = saveUsername(introNameInput.value);
        if (username !== "") {
            displayWelcome(username);
            showMainApp();
        }
    }
});

// Intro screen

function checkUsername() {
    const savedUsername = localStorage.getItem("username");
    
    if (savedUsername) {
        displayWelcome(savedUsername);
        showMainApp();
    } else {
        showIntroScreen();
    }
}

function saveUsername(username) {
    if (username !== "") {
        const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        localStorage.setItem("username", capitalizedUsername);
        return capitalizedUsername;
    }
}

function displayWelcome(username) {
    document.querySelector(".header-text").innerHTML = `Welcome, ${username}`;
}

function showMainApp() {
    document.querySelector("header").classList.remove("hide");
    document.querySelector(".sidebar").classList.remove("hide");
    document.querySelector(".task-container").classList.remove("hide");
    document.querySelector(".intro-screen").classList.add("hide");
}

function showIntroScreen() {
    document.querySelector("header").classList.add("hide");
    document.querySelector(".sidebar").classList.add("hide");
    document.querySelector(".task-container").classList.add("hide");
    document.querySelector(".intro-screen").classList.remove("hide");
}