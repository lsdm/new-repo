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
var myFun = function () {
    var eleSum = document.getElementById("sum");
    var eleInput = document.getElementsByTagName("input");
    var elep = document.getElementsByTagName("p");
    var sum = function () {
        var myarr = eleInput[0].value.split(",");
        var mysum = 0;
        for(var i = 0;i < myarr.length; i++){
            mysum += parseInt(myarr[i]);
        }
        elep[0].innerHTML = mysum.toString();
    };
    EventUtil.addHandler(eleSum,"click",sum);

    var eleBtn = document.getElementById("Btn");
    var elewin = document.getElementById("win");
    var elesmalldiv = document.getElementById("smalldiv");
    var eleclose = document.getElementById("close");
    var clickbtn = function () {
        elewin.style.display = "block";
        elesmalldiv.style.display = "block";
    };
    var clickclose = function () {
        elewin.style.display = "none";
        elesmalldiv.style.display = "none";
    };
    EventUtil.addHandler(eleBtn,"click",clickbtn);
    EventUtil.addHandler(eleclose,"click",clickclose)

};
window.onload = myFun;