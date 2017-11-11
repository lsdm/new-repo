/**
 * Created by Administrator on 2017/8/3.
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
function calculator() {
    var eleFuncBtns = document.getElementsByClassName("funcBtn");
    var eleMathValues = document.getElementsByClassName("mathValue");
    var eleP1 = document.getElementsByClassName("p1");
    var eleP2 = document.getElementsByClassName("p2");
    var result,
        inputValue = [],
        method = [];

    //p2中有无功能符判断
    function hasFunc() {
        return (eleP2[0].innerHTML.search(/[-+%÷×]/) != -1);
    }

    //清除操作
    function clearAll() {
        eleP1[0].innerHTML = "";
        eleP2[0].innerHTML = "0";
        inputValue = [];
        method = [];
    }
    EventUtil.addHandler(eleFuncBtns[0],"click",clearAll);

    //数值点击事件
    function mathClick() {
        alert(eleP2[0].innerHTML);
        alert(eleP2[0].innerHTML.search(/[-+%÷×]/));//两者为何不相等？/[-+%÷×]/.test(eleP2[0].innerHTML)
        EventUtil.addHandler(eleFuncBtns[eleFuncBtns.length-1],"click",clickEqual);
        EventUtil.addHandler(eleMathValues[eleMathValues.length-1],"click",clickPoint);
        if(eleP2[0].innerHTML == "0"){
            eleP2[0].innerHTML = this.innerHTML;
        }else if(hasFunc()){
            eleP1[0].innerHTML += eleP2[0].innerHTML;
            eleP2[0].innerHTML = this.innerHTML;
        }else if(/[\d]+.?[\d]*/.test(eleP2[0].innerHTML)){//正则筛选
            eleP2[0].innerHTML += this.innerHTML;
        }
    }
    for(var i=0;i < eleMathValues.length-1;i++){
        EventUtil.addHandler(eleMathValues[i],"click",mathClick);
    }

    //点号点击事件处理程序
    function clickPoint() {
        if(eleP2[0].innerHTML == "0"|| /[\d]+/.test(eleP2[0].innerHTML)){
            eleP2[0].innerHTML += this.innerHTML;
        }else if(hasFunc() || /./.test(eleP2[0].innerHTML)){
            EventUtil.removeHandler(eleMathValues[eleMathValues.length],"click",clickPoint);
        }
    }

    //功能键点击事件
    function clickFunc() {
        if(!hasFunc()){
            eleP1[0].innerText += eleP2[0].innerText;
            inputValue.push(eleP2[0].innerHTML);
            eleP2[0].innerHTML = this.innerHTML;
            method.push(eleP2[0].innerHTML);
        }
    }
    for(var j=1;j < eleFuncBtns.length-1;j++){
        EventUtil.addHandler(eleFuncBtns[j],"click",clickFunc);
    }
    //等于
    function clickEqual() {
        if (/[\d]+.?[\d]*/.test(eleP2[0].innerText)){
            alert(eleP2[0].innerText);
            if(!hasFunc()){
                eleP1[0].innerText += eleP2[0].innerText;
                inputValue.push(eleP2[0].innerHTML);
            }
            function mathcount(a,b,s) {
                switch (s){
                    case "-":
                        return a-b;
                        break;
                    case "%":
                        return a%b;
                        break;
                    case "+":
                        return a+b;
                        break;
                    case "÷":
                        return a/b;
                        break;
                    case "×":
                        return a*b;
                        break;
                    default:
                        break;
                }
            }
            result = parseFloat(inputValue[0]);
            if(inputValue.length>1) {
                for (var i = 0; i < inputValue.length-1; i++) {
                    result = mathcount(result, parseFloat(inputValue[i + 1]), method[i]);
                }
            }
            eleP2[0].innerHTML = "" + result;
            inputValue = [];
            method = [];
            eleP1[0].innerText = "";

        }
    }

    /*取余
    function remainder() {
        inputValue.add(eleP2.nodeValue);
        method.add(1);//代表%
    }
    EventUtil.addHandler(eleMathValues[1],"click",remainder);
    //除法
    function divide() {
        inputValue.add(eleP2.nodeValue);
        method.add(2);//代表/
    }
    EventUtil.addHandler(eleMathValues[2],"click",divide);
    //乘法
    function multiply() {
        inputValue.add(eleP2.nodeValue);
        method.add(3);
    }
    EventUtil.addHandler(eleMathValues[3],"click",multiply);
    //减法
    function subtract() {
        inputValue.add(eleP2.nodeValue);
        method.add(4);
    }
    EventUtil.addHandler(eleMathValues[4],"click",subtract);
    //加法
    function add() {
        inputValue.add(eleP2.nodeValue);
        method.add(5);
    }
    EventUtil.addHandler(eleMathValues[5],"click",add);*/
}
window.onload = calculator;