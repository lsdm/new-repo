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
    var clickBtn = document.getElementById("clickBtn");
    var clickAction = function () {
        var divs = document.getElementsByClassName("color");
        for (var i = 0;i < 3;i++){
            divs[i].style.backgroundColor = "red";
        }
    };
    EventUtil.addHandler(clickBtn,"click",clickAction);
};