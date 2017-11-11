/**
 * Created by Administrator on 2017/7/27.
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if (element.attachEvent){
            element.attachEvent("on" + type,handler);
        }else{
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if (element.detachEvent){
            element.detachEvent("on" + type,handler);
        }else{
            element["on" + type] = null;
        }
    }
};
window.onload = function () {
    var myBox = document.getElementById("myBox");
    var inBox = function () {
        myBox.style.backgroundColor = "white";
        myBox.style.borderColor = "red";
        myBox.style.color = "red";
        myBox.style.cursor = "crosshair";
    };
    var outBox = function () {
        myBox.style.backgroundColor = "black";
        myBox.style.borderColor = "black";
        myBox.style.color = "white";
        myBox.style.cursor = "default";
    };
    EventUtil.addHandler(myBox,"mouseover",inBox);
    EventUtil.addHandler(myBox,"mouseout",outBox);
};//这个实现没有css与javascript还是耦合过于紧密；最好通过之改变class来改变整个样式。