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
    var myLabel = document.getElementById("myLabel");
    var hiddenText = document.getElementById("hiddenText");
    var inBox = function () {
        hiddenText.style.visibility = "visible";
    };
    var outBox = function () {
        hiddenText.style.visibility = "hidden";
    };
    EventUtil.addHandler(myLabel,"mouseover",inBox);
    EventUtil.addHandler(myLabel,"mouseout",outBox);
};