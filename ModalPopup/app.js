const showbtn = document.querySelector('.open-btn');
const closebtn =document.querySelector('.close-btn');
const modalContainer = document.querySelector('.modal-container');

showbtn.addEventListener("click",()=>{
    modalContainer.classList.add("show")
})

closebtn.addEventListener("click",()=>{
    modalContainer.classList.remove("show")
})