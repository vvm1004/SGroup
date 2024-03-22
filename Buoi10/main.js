let contacts = [
    {
        name: "Minh",
        phone: "12312312321",
        email: "example@gmail.com"
    },
    {
        name: "Minh ABC",
        phone: "000000",
        email: "example1@gmail.com"
    }
]
if (localStorage.getItem("contacts")) {
    contacts = JSON.parse(localStorage.getItem("contacts"))
}

let cardsContainer = document.getElementById("cards")
let createBtn = document.getElementById("create-btn")

let popupContainer = document.querySelector(".popup-container")
let popupContainerEdit = document.querySelector(".popup-container-edit")
let popupMain = document.querySelector(".popup-main")
let popupMainEdit = document.querySelector(".popup-main-edit")


//open popup
createBtn.addEventListener('click', function () {
    popupContainer.classList.toggle('active')
})
//close popup
popupContainer.addEventListener('click', function () {
    document.getElementById("field-name").value = ""
    document.getElementById("field-phone").value = ""
    document.getElementById("field-email").value = ""
    popupContainer.classList.toggle('active')
})
popupContainerEdit.addEventListener('click', function () {
    document.getElementById("field-name2").value = ""
    document.getElementById("field-phone2").value = ""
    document.getElementById("field-email2").value = ""
    popupContainerEdit.classList.toggle('active')
})

//prevent main popup close
popupMain.addEventListener('click', function (event) {
    event.stopPropagation()
})
popupMainEdit.addEventListener('click', function (event) {
    event.stopPropagation()
})

function onCreate() {
    let name = document.getElementById("field-name").value
    let phone = document.getElementById("field-phone").value
    let email = document.getElementById("field-email").value
    console.log(name, phone, email)
    if(name && email && phone){
        contacts.push({
            name,
            phone,
            email
        })
        localStorage.setItem("contacts", JSON.stringify(contacts))
        render()
    }else{
        alert("Please fill in all fields.")
    }
}

function onDelete(index) {
    contacts.splice(index, 1)
    render() 
    localStorage.setItem("contacts", JSON.stringify(contacts))
}

function onEdit(index) {
    popupContainerEdit.classList.toggle('active');
    let contact = contacts[index];
    document.getElementById("field-name2").value = contact.name;
    document.getElementById("field-phone2").value = contact.phone;
    document.getElementById("field-email2").value = contact.email;

    let saveBtn = document.querySelector(".save-btn");
    saveBtn.onclick = function() {
        let name = document.getElementById("field-name2").value;
        let phone = document.getElementById("field-phone2").value;
        let email = document.getElementById("field-email2").value;
        if (name && email && phone) {
            contacts[index] = {
                name,
                phone,
                email
            };
            localStorage.setItem("contacts", JSON.stringify(contacts));
            render();
        } else {
            alert("Please fill in all fields.");
        }
    };
}
function render() {
    let elements = contacts.map((contact, index) => {
        return `
        <div class="cards">
            <div class="card">
                <div class="card-item">
                    <img src="https://api.iconify.design/material-symbols:android-contacts.svg" alt="">
                    <span>${contact.name}</span>
                </div>
                <div class="card-item">
                    <img src="https://api.iconify.design/material-symbols:android-contacts.svg" alt="">
                    <span>${contact.phone}</span>
                </div>
                <div class="card-item">
                    <img src="https://api.iconify.design/material-symbols:android-contacts.svg" alt="">
                    <span>${contact.email}</span>
                </div>
                <div class="action">
                    <img id="edit" onclick="onEdit(${index})"src="https://api.iconify.design/material-symbols:edit.svg" alt="">
                    <img id="delete" onclick="onDelete(${index})" src="https://api.iconify.design/material-symbols:auto-delete-outline.svg" alt="">
                </div>
            </div>
    </div>
        `
    })
    cardsContainer.innerHTML = elements.join("")
}
render()