/**
 * Created by Administrator on 2017/7/26.
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
window.onload = function(){//对大小写敏感；在获取元素前需要确保页面加载完毕；通过id属性获取元素时不必要加#号。
    var btn11 = document.getElementById("btn1");
    var btn12 = document.getElementById("btn2");
    var btn13 = document.getElementById("btn3");
    var btn14 = document.getElementById("btn4");
    var btn15 = document.getElementById("btn5");
    var changeBox = document.getElementById("changeBox");
    /*btn11.onclick = function () {
        changeBox.style.width = (parseInt(changeBox.style.width) + 100) +　"px"　;
        alert(changeBox.style.width);
    };*///实验法
    var handler = function(){
        switch(this.id){
            case "btn1":
                changeBox.style.width = "300px";
                break;//由于其width属性是字符串类型，与数值相乘或相加都得不到字符串.故不会执行。而且字符串具有不可变的特性，除非销毁后从新填充。
            case "btn2":
                changeBox.style.height = "300px";
                break;
            case "btn3":
                changeBox.style.backgroundColor = "red";
                break;
            case "btn4":
                changeBox.style.display = "none";
                break;
            case "btn5":
                changeBox.style.display = "block";
                changeBox.style.height = "100px";
                changeBox.style.width = "100px";
                changeBox.style.backgroundColor = "mediumspringgreen";
                break;
            default:
                break;
        }
    };
    EventUtil.addHandler(btn11,"click",handler);
    EventUtil.addHandler(btn12,"click",handler);
    EventUtil.addHandler(btn13,"click",handler);
    EventUtil.addHandler(btn14,"click",handler);
    EventUtil.addHandler(btn15,"click",handler);
};
