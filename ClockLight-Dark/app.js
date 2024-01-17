const timeEL=document.querySelector(".time")
const toggle=document.querySelector(".toggle")

toggle.addEventListener("click",(e)=>{
    const html = document.querySelector('html')
    if(html.classList.contains("dark")){
        html.classList.remove("dark")
        e.target.innerHTML="โหมดกลางคืน"
        
    }else{
        html.classList.add("dark")
        e.target.innerHTML="โหมดกลางวัน"
    }
})

function setTime(){
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    timeEL.innerHTML=`${hours}:
    ${minutes<10 ? `0${minutes}`:minutes}:
    ${seconds <10 ? `0${seconds}`:seconds}`
}
setTime()   
setInterval(setTime,1000)