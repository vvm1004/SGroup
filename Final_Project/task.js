


let popupContainer = document.querySelector(".popup-container")
let popupMain = document.querySelector(".popup-main")
let newTaskButton = document.getElementById('newTaskButton')
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

document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra xem có dữ liệu trong Local Storage không
    if (!localStorage.getItem("todos")) {
        // Nếu không có, thêm dữ liệu mặc định vào Local Storage
        var initialTodos = [
            { categoryName: "Marketing", title: "Write SEO article for new product", content: "This is an existential moment for effective altruism and the rationalist community writ-large." },
        ];
        localStorage.setItem("todos", JSON.stringify(initialTodos));
    }

    // Render các mục todo
    renderTodos();
});

function renderTodos() {
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
    var todoContainer = document.querySelector(".todo-box");
    todoContainer.innerHTML = "";

    todos.forEach(function (todoItem, item) {
        var todoHTML = createTodoBox(item, todoItem.categoryName, todoItem.title, todoItem.content);
        todoContainer.innerHTML += todoHTML;
    });
}

function createTodoBox(item, category, title, content) {
    return `
        <div class="box">
            <div class="category">${category}
                <div class="category__img">
                    <img src="./assests/icon/edit.svg" alt="">
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

    renderTodos();
    document.querySelector('.popup-container').classList.add('active');
}

function onDelete(item) {
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(item, 1); // Xóa mục công việc khỏi mảng
    localStorage.setItem("todos", JSON.stringify(todos)); // Cập nhật dữ liệu trong Local Storage
    renderTodos(); // Render lại danh sách mục công việc
}




renderTodos();