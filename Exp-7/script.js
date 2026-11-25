
// Selecting HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

// Array to store tasks
let tasks = [];

let nextId = 1;

// ======================================
// 1. ADD TASK
// ======================================

function addTask() {

    let taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    let task = {
        id: nextId++,
        name: taskName,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();

}

// ======================================
// 2. DISPLAY TASKS USING DOM
// ======================================

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty";
        emptyMessage.textContent = "No tasks added yet.";

        taskList.appendChild(emptyMessage);

    }

    tasks.forEach(function(task) {

        // Creating list item
        const li = document.createElement("li");
        li.className = "task-item";

        // Creating left section
        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        // Creating checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        // Creating task text
        const span = document.createElement("span");
        span.textContent = task.name;

        if (task.completed) {
            span.classList.add("completed");
        }

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        // Creating action buttons
        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function() {
            editTask(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            deleteTask(task.id);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        // Adding elements to list
        li.appendChild(leftDiv);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    updateTaskCount();

}

// ======================================
// 3. EDIT TASK
// ======================================

function editTask(id) {

    const task = tasks.find(function(item) {
        return item.id === id;
    });

    if (!task) return;

    let updatedName = prompt("Edit your task:", task.name);

    if (updatedName === null) {
        return;
    }

    updatedName = updatedName.trim();

    if (updatedName === "") {
        alert("Task name cannot be empty.");
        return;
    }

    task.name = updatedName;

    displayTasks();

}

// ======================================
// 4. DELETE TASK
// ======================================

function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();

}

// ======================================
// 5. MARK TASK AS COMPLETED
// ======================================

function toggleTask(id) {

    const task = tasks.find(function(item) {
        return item.id === id;
    });

    if (task) {
        task.completed = !task.completed;
    }

    displayTasks();

}

// ======================================
// 6. UPDATE TASK COUNTS
// ======================================

function updateTaskCount() {

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = tasks.length - completed;

    totalTasks.textContent = tasks.length;
    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;

}

// ======================================
// 7. CLEAR ALL TASKS
// ======================================

document.getElementById("clearBtn").addEventListener("click", function() {

    if (tasks.length === 0) {
        alert("There are no tasks to clear.");
        return;
    }

    let confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {

        tasks = [];

        displayTasks();

    }

});

// Button click event
addBtn.addEventListener("click", addTask);

// Enter key event
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Initial display
displayTasks();

console.log("To-Do List Application Loaded Successfully.");
