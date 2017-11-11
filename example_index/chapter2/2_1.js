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
    var ps = document.getElementsByClassName("news");
    var btn = document.getElementById("inputIdea");
    var choice = document.getElementsByClassName("inputChoice");
    var closeChoice1 = document.getElementById("close");
    var showContent = function () {
        alert(this.innerHTML);
    };
    for(var i = 0;i < ps.length;i++){
        EventUtil.addHandler(ps[i],"click",showContent);
    }
    var chooseFun = function () {
        if(choice[0].style.visibility = "hidden"){
            choice[0].style.visibility = "visible";
        }else{
            choice[0].style.visibility = "hidden";
        }
    };
    var closeChoice = function () {
        choice[0].style.visibility = "hidden";
        //务必注意通过类名选择的是元素数组。
    };
    EventUtil.addHandler(btn,"click",chooseFun);
    EventUtil.addHandler(closeChoice1,"click",closeChoice);
};