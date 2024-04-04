




let popupContainer = document.querySelector(".popup-container")
let popupMain = document.querySelector(".popup-main")
let newTaskButton = document.getElementById('newTaskButton')
let todoBox = document.querySelector(".todo-box");


//open popup
newTaskButton.addEventListener('click', function () {
    document.getElementById("field-category").value = '';
    document.getElementById("field-title").value = '';
    document.getElementById("field-content").value = '';
    popupContainer.classList.toggle('active')

});
//close popup
popupContainer.addEventListener('click', function () {
    popupContainer.classList.toggle('active')
})


//prevent main popup close
popupMain.addEventListener('click', function (event) {
    event.stopPropagation()
})

// Function to create a new task box
function createTodoBox(item, category, title, content) {
    return `
        <div class="box">
            <div class="category">${category}
                <div class="category__img">
                <img src="./assests/icon/edit.svg" alt="" onclick="openEditPopupWithDetails(${item})"> 
                <img src="./assests/icon/delete.svg" alt="" onclick="onDelete(${item})">
                </div>
            </div>
            <div class="title">${title}</div>
            <div class="title-line"></div>
            <div class="content">${content}</div>
            <div class="date-time">
                <img src="./assests/icon/Frame.svg" alt="">
                June 30, 2022
            </div>
        </div>
    `;
}

// Function to add a new task
function onCreate() {
    var categoryName = document.getElementById("field-category").value;
    var title = document.getElementById("field-title").value;
    var content = document.getElementById("field-content").value;

    var todoItem = {
        categoryName: categoryName,
        title: title,
        content: content
    };

    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todos));

    var todoHTML = createTodoBox(todos.length - 1, categoryName, title, content);
    todoBox.innerHTML += todoHTML;

    popupContainer.classList.add('active');
}

// Function to delete a task
function onDelete(item) {
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(item, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoBox.innerHTML = ""; // Clear the task boxes

    // Re-render all task boxes
    todos.forEach(function (todo, index) {
        var todoHTML = createTodoBox(index, todo.categoryName, todo.title, todo.content);
        todoBox.innerHTML += todoHTML;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Check if there is data in Local Storage
    if (!localStorage.getItem("todos")) {
        // If not, add default data to Local Storage
        var initialTodos = [
            { categoryName: "Marketing", title: "Write SEO article for new product", content: "This is an existential moment for effective altruism and the rationalist community writ-large." },
        ];
        localStorage.setItem("todos", JSON.stringify(initialTodos));
    }

    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Render all task boxes
    todos.forEach(function (todo, index) {
        var todoHTML = createTodoBox(index, todo.categoryName, todo.title, todo.content);
        todoBox.innerHTML += todoHTML;
    });
});


//--------------EDIT-------------------------

let editPopupContainer = document.querySelector(".edit-popup");
let popupMain2 = document.querySelector(".popup-main2");


//close popup
editPopupContainer.addEventListener('click', function () {
    editPopupContainer.classList.toggle('active')
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
    // document.getElementById("edit-task-index").value = index; // Lưu vị trí của nhiệm vụ trong danh sách
    editPopupContainer.classList.toggle('active');
}

