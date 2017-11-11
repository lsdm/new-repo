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
function myFun() {
    //图片列表
    var eledivs = document.getElementsByClassName("transparent");
    function divMouseOver() {
        this.style.opacity = "1";
        this.style.cursor = "crosshair";
    }
    function divMouseOut() {
        this.style.opacity = "0.2";
        this.style.cursor = "default";
    }
    for (var i = 0;i < eledivs.length;i++){
        EventUtil.addHandler(eledivs[i],"mouseover",divMouseOver);
        EventUtil.addHandler(eledivs[i],"mouseout",divMouseOut);
    }

    //简易选项卡
    var eleh3 = document.getElementsByClassName("subject");
    var eleunlist = document.getElementsByClassName("unlist");
    function h3mouseover() {
        for(var j=0;j<eleh3.length;j++){
            if(Array.prototype.indexOf.call(eleh3,this) === j){//注意；对类数组对象不能直接调用indexOf等数组方法。
                this.style.backgroundColor = "gray";
                eleunlist[j].style.display = "block";
            }else {
                eleh3[j].style.backgroundColor = "black";
                eleunlist[j].style.display = "none";
            }
        }
    }
    for(var k = 0; k < eleh3.length;k++){
        EventUtil.addHandler(eleh3[k],"mousemove",h3mouseover);
    }
}
window.onload = myFun;