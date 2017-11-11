/**
 * Created by Administrator on 2017/7/28.
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
function myFun(){
    var eleinputs = document.getElementsByTagName("input");
    var elebtns = document.getElementsByTagName("button");
    var elediv = document.getElementById("changeBox");
    function confirmFun() {
        elediv.style[eleinputs[0].value] = eleinputs[1].value;
    }
    function resetting() {
        elediv.style.width = "180px";
        elediv.style.height = "180px";
        elediv.style.color = "white";
        elediv.style.backgroundColor = "black";
    }//未实现全部的属性重置！
    EventUtil.addHandler(elebtns[0],"click",confirmFun);
    EventUtil.addHandler(elebtns[1],"click",resetting);
}
window.onload = myFun;



