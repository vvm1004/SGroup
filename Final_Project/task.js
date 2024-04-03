let popupContainer = document.querySelector(".popup-container")
let popupMain = document.querySelector(".popup-main")
let newTaskButton =  document.getElementById('newTaskButton')
//open popup
 newTaskButton.addEventListener('click', function() {
    popupContainer.classList.toggle('active')

});
//close popup
popupContainer.addEventListener('click', function () {
    // document.getElementById("field-name").value = ""
    // document.getElementById("field-phone").value = ""
    // document.getElementById("field-email").value = ""
    popupContainer.classList.toggle('active')
})


//prevent main popup close
popupMain.addEventListener('click', function (event) {
    event.stopPropagation()
})