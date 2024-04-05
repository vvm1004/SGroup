
let popupContainer = document.querySelector(".popup-container")
let popupMain = document.querySelector(".popup-main")
let newTaskButton = document.getElementById('newTaskButton')
let todoBox = document.querySelector(".todo-box");


//open popup
newTaskButton.addEventListener('click', function () {
    document.getElementById("field-category").value = '';
    document.getElementById("field-title").value = '';
    document.getElementById("field-content").value = '';
    popupContainer.classList.toggle('hidden')

});
//close popup
popupContainer.addEventListener('click', function () {
    popupContainer.classList.toggle('hidden')
})


//prevent main popup close
popupMain.addEventListener('click', function (event) {
    event.stopPropagation()
})


// Hàm tạo box nhiệm vụ mới
function createTodoBox(index, category, title, content) {
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    var formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return `
        <div class="box">
            <div class="category">${category}
                <div class="category__img">
                    <img src="./assests/icon/edit.svg" alt="" onclick="openEditPopupWithDetails(${index})"> 
                    <img src="./assests/icon/delete.svg" alt="" onclick="onDelete(${index})">
                </div>
            </div>
            <div class="title">${title}</div>
            <div class="title-line"></div>
            <div class="content">${content}</div>
            <div class="date-time">
                <img src="./assests/icon/Frame.svg" alt="">
                ${formattedDate}, ${formattedTime}
            </div>
        </div>
    `;
}



//--------------EDIT-------------------------

let editPopupContainer = document.querySelector(".edit-popup");
let popupMain2 = document.querySelector(".popup-main2");


//close popup
editPopupContainer.addEventListener('click', function () {
    editPopupContainer.classList.toggle('hidden')
})


//prevent main popup close
popupMain2.addEventListener('click', function (event) {
    event.stopPropagation()
})
// Function to open edit popup with task details filled in
function openEditPopupWithDetails(index) {
    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    var todo = todos[index];
    document.getElementById("edit-field-category").value = todo.categoryName;
    document.getElementById("edit-field-title").value = todo.title;
    document.getElementById("edit-field-content").value = todo.content;
    document.getElementById("edit-task-index").value = index; // Lưu vị trí của nhiệm vụ trong danh sách
    editPopupContainer.classList.toggle('hidden');
}



// Function to add a new task
function addNewTask(categoryName, title, content) {
    // Get current tasks from localStorage
    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Add the new task to the array
    todos.push({ categoryName: categoryName, title: title, content: content, status: 'ToDo' });

    // Save the updated tasks back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Render tasks based on their status
    renderTasks();
}

// Function to remove a task
function removeTask(index) {
    // Get current tasks from localStorage
    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Remove the task at the specified index
    todos.splice(index, 1);

    // Save the updated tasks back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Render tasks based on their status
    renderTasks();
}

// Function to update a task
function updateTask(index, newCategoryName, newTitle, newContent, newStatus) {
    // Get current tasks from localStorage
    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Update the task at the specified index
    todos[index].categoryName = newCategoryName;
    todos[index].title = newTitle;
    todos[index].content = newContent;
    todos[index].status = newStatus;

    // Save the updated tasks back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
    editPopupContainer.classList.add('hidden');

    // Render tasks based on their status
    renderTasks();
}

// Function to render tasks based on their status
function renderTasks() {
    // Get current tasks from localStorage
    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Clear existing task boxes
    document.querySelector(".todo-box").innerHTML = "";
    document.querySelector(".doing-box").innerHTML = "";
    document.querySelector(".completed-box").innerHTML = "";
    document.querySelector(".blocked-box").innerHTML = "";

    // Loop through tasks and render them in corresponding boxes based on their status
    todos.forEach(function(todo, index) {
        var todoHTML = createTodoBox(index, todo.categoryName, todo.title, todo.content);
        if (todo.status === "ToDo") {
            document.querySelector(".todo-box").innerHTML += todoHTML;
        } else if (todo.status === "Doing") {
            document.querySelector(".doing-box").innerHTML += todoHTML;
        } else if (todo.status === "Completed") {
            document.querySelector(".completed-box").innerHTML += todoHTML;
        } else if (todo.status === "Blocked") {
            document.querySelector(".blocked-box").innerHTML += todoHTML;
        }
    });
}

// Function to handle task submission
function onCreate() {
    var categoryName = document.getElementById("field-category").value;
    var title = document.getElementById("field-title").value;
    var content = document.getElementById("field-content").value;
    // var radioValue = document.querySelector('input[name="radio"]:checked').value;

    addNewTask(categoryName, title, content);

    // Close the popup
    document.querySelector(".popup-container").classList.add('hidden');
}

// Function to handle task deletion
function onDelete(index) {
    removeTask(index);
}

// Function to handle task update
function onUpdate() {
    var index = document.getElementById("edit-task-index").value;
    var newCategoryName = document.getElementById("edit-field-category").value;
    var newTitle = document.getElementById("edit-field-title").value;
    var newContent = document.getElementById("edit-field-content").value;
    var radioValue = document.querySelector('input[name="radio"]:checked').value;

    updateTask(index, newCategoryName, newTitle, newContent, radioValue);

    // Close the popup
    document.querySelector(".edit-popup").classList.remove('active');
}

// Hàm tạo task ban đầu và lưu vào localStorage
function createInitialTask() {
    var initialTask = {
        categoryName: "Default Category",
        title: "Sample Task",
        content: "This is a sample task created initially.",
        status: "ToDo" // Trạng thái mặc định là "ToDo"
    };

    // Kiểm tra xem có dữ liệu trong localStorage hay không
    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Thêm task ban đầu vào mảng todos
    todos.push(initialTask);

    // Lưu mảng tasks vào localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Gọi hàm tạo task ban đầu khi DOM được tải hoàn toàn
document.addEventListener("DOMContentLoaded", function() {
    // Kiểm tra xem đã có task trong localStorage chưa
    if (!localStorage.getItem("todos")) {
        // Nếu chưa có, tạo task ban đầu và lưu vào localStorage
        createInitialTask();
    }
    renderTasks()
});

