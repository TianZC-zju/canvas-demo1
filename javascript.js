var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
var ctx = canvas.getContext("2d");
ctx.beginPath()
ctx.lineWidth = 5
ctx.lineCap = 'round'
let isPainting = false
let isTouchDevice = 'ontouchstart' in document.documentElement;
let pointPre = {x:0,y:0}

if(isTouchDevice){

    canvas.ontouchstart = ev => {
        pointPre.x=ev.touches[0].clientX
        pointPre.y=ev.touches[0].clientY
        // draw(ev.touches[0].clientX, ev.touches[0].clientY)
    }

    canvas.ontouchmove = ev => {
        ctx.moveTo(pointPre.x, pointPre.y)
        pointPre.x=ev.touches[0].clientX
        pointPre.y=ev.touches[0].clientY
        ctx.lineTo(pointPre.x, pointPre.y)
        ctx.stroke()
    }

}else{
    canvas.onmousedown =(e)=>{
        isPainting = true
        pointPre.x=e.clientX
        pointPre.y=e.clientY
        // draw(e.clientX, e.clientY)
    }
    canvas.onmouseup =()=>{
        isPainting = false
    }
    canvas.onmousemove = (e) =>{
        if(isPainting){
            ctx.moveTo(pointPre.x, pointPre.y)
            pointPre.x=e.clientX
            pointPre.y=e.clientY
            ctx.lineTo(pointPre.x, pointPre.y)
            ctx.stroke()
        }

    }
}
var draw = (x, y)=>{
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
}