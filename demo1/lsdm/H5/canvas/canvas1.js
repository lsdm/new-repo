/**
 * Created by Administrator on 2017/11/1.
 */
window.onload = function () {
    var canvas1 =document.getElementById("square");
    var context1 = canvas1.getContext("2d");
    context1.fillStyle = "#0ff";
    context1.fillRect(0,0,20,20);

    var canvas = document.getElementById("circle");
    var context =canvas.getContext("2d");
    context.beginPath();
    context.arc(10,10,10,0,2*Math.PI,true);
    context.fillStyle = "#ff0";
    context.fill();
};