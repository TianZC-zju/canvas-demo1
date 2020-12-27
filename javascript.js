var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
var ctx = canvas.getContext("2d");
let isPainting = false

canvas.onmousedown =(e)=>{
    isPainting = true
    draw(e.clientX, e.clientY)
}
canvas.onmouseup =()=>{
    isPainting = false
}
canvas.onmousemove = (e) =>{
    if(isPainting){
        var x = e.clientX
        var y = e.clientY
        draw(x, y)
    }

}
var draw = (x, y)=>{
    // ctx.fillStyle = "rgb(200,0,0)";
    // ctx.fillRect (x-3, y-3, 6, 6);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
}