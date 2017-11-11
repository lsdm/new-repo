/**
 * Created by Administrator on 2017/8/1.
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
function boxChoose() {
    var eleall = document.getElementById("all");
    var eleChoices = document.getElementsByClassName("choices");
    var eleallchoose = document.getElementsByClassName("allChoose");
    var eleallInverse = document.getElementsByClassName("allInverse");
    function allChoose() {
        for(var j = 0;j < eleChoices.length;j++){
            eleChoices[j].checked = true;
        }
        eleall.checked = false;
    }

    function allInverse() {
        var isall = [];
        for(var i = 0;i < eleChoices.length;i++){
            eleChoices[i].checked = !eleChoices[i].checked;
            isall[i] = eleChoices[i].checked;
        }
        for (var j = 0;j < eleChoices.length;j++){
            if (isall[j]) {
                eleall.checked = !(j == 10);
            } else {
                eleall.checked = true;//不合逻辑；与input自身的checked属性的特性有关吧。
                break;
            }
        }

    }

    EventUtil.addHandler(eleallchoose[0],"click",allChoose);
    EventUtil.addHandler(eleallInverse[0],"click",allInverse);
}
window.onload = boxChoose;