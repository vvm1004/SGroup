let a_input = document.querySelector('#a_input');
let b_input = document.querySelector('#b_input');

let congBtn = document.querySelector('.cong');
let truBtn = document.querySelector('.tru');
let nhanBtn = document.querySelector('.nhan');
let chiaBtn = document.querySelector('.chia');

let result = document.querySelector('.result');


congBtn.addEventListener("click", function () {
    let ketqua = parseInt(a_input.value) + parseInt(b_input.value);
    result.innerText = ketqua
});
truBtn.addEventListener("click", function () {
    let ketqua = parseInt(a_input.value) - parseInt(b_input.value);
    result.innerText = ketqua
});
nhanBtn.addEventListener("click", function () {
    let ketqua = parseInt(a_input.value) * parseInt(b_input.value);
    result.innerText = ketqua
});
chiaBtn.addEventListener("click", function () {
    if (parseInt(b_input.value) !== 0) {
        let ketqua = parseInt(a_input.value) / parseInt(b_input.value);
        result.innerText = ketqua
    } else {
        result.innerText = "Không được nhập b là số 0!"
    }

});