const canvas =document.getElementById('canvas');
const contex=canvas.getContext('2d');

contex.beginPath()
contex.moveTo(40,40); // กำหนดจุดเริ่มที่ พิกัดเริ่มต้นx,y เริ่มจากมุมซ้ายบน
contex.lineTo(240,40); //ลากเส้นแกนxไปy
contex.lineTo(240,240);
contex.lineTo(40,240);
contex.closePath()
contex.lineWidth=5;
//สีของเส้น
contex.strokeStyle='red'
contex.stroke()
//เทสี
contex.fillStyle='yellow'
contex.fill()

//วาดกล่อง4เหลี่ยม
// 1.แบบมีพื้นผิวเทสีได้
contex.fillStyle='green'
contex.fillRect(0,0,100,100)
// 2.แบบไม่มีพื้นผิวเทสีไม่ได้
contex.strokeStyle='blue'
contex.strokeRect(10,10,100,100)

//เขียนข้อความ
// 1.แบบมีพื้นผิวเทสีได้
contex.font='bold italic 50px Arial'
contex.fillStyle='red'
contex.fillText('Hello World',100,150)
// 2.แบบไม่มีพื้นผิวเทสีไม่ได้
contex.strokeStyle='blue'  
contex.strokeText('Hello World',100,200)

//สร้างimage
const myImage=new Image()
myImage.src='./image/player.png'
myImage.onload=function(){
    contex.drawImage(myImage,10,10,100,100)
}