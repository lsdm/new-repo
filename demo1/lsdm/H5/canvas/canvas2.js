/**
 * Created by Administrator on 2017/11/1.
 */
//
function polygon(c,n,x,y,r,angle,counterclockwise) {
    //参数解释：画布上下文；边数；中心点横坐标；中心点纵坐标；角度；是否顺时针旋转
    angle = angle || 0;
    counterclockwise = counterclockwise || false;//顺时针旋转还是逆时针旋转进行绘制；实现了默认值
    c.moveTo(x + r*Math.sin(angle),y - r*Math.cos(angle));//定义第一个点
    var delta = 2*Math.PI/n;//定义两个顶点之间的夹角
    for(var i = 0; i < n; i++){
        angle += counterclockwise? -delta:delta;
        c.lineTo(x + r*Math.sin(angle),y - r*Math.cos(angle));
    }
    c.closePath();
}

//角度转弧度
function rads(r){
    return Math.PI*r/180;
}

window.onload = function () {
    var canvas1 = document.getElementById("multiFigure");
    var c1 = canvas1.getContext("2d");

    //开始一个新的路径并添加一个多边形子路径
    c1.beginPath();
    polygon(c1,3,50,50,20);
    polygon(c1,4,150,40,20,Math.PI/4);
    polygon(c1,5,255,55,20);
    polygon(c1,6,150,93,20,Math.PI/6);
    polygon(c1,4,150,93,10,Math.PI/4,true);

    //设置属性控制图形外观
    c1.fillStyle = "#ff0";
    c1.strokeStyle = "#f00";
    c1.lineWidth = 2;

    //调用如下函数绘制所有的这些多边形
    c1.fill();
    c1.stroke();


    //绘制曲线
    var canvas2 = document.getElementById("curve");
    var c2 = canvas2.getContext("2d");
    c2.moveTo(50,50);
    c2.arc(50,50,40,rads(0),rads(90),false);//false表示顺时针
    c2.closePath();

    //绘制文本
    c2.fillText("text",200,50,20);

    c2.fillStyle = "#ff0";
    c2.strokeStyle = "#f00";
    c2.lineWidth = 2;

    c2.fill();
    c2.stroke();
};