/**
 * Created by Administrator on 2017/8/2.
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
    //用typeof查看数据类型
    alert("typeof 12345 ☞" + typeof 12345 +"\n"+ "typeof abc ☞" + typeof "abc" +"\n"+ "typeof document ☞" + typeof document);


    //用parseInt解析数字，并求和（检测是否为数值类型；是则相加，否则输出提示）
    var eleinput = document.getElementsByTagName("input");
    var elesumspan = eleinput[2].previousSibling.previousSibling;//一定要记得隐藏的文本节点
    function sumFun() {
        (eleinput[0].value == "" || eleinput[1].value == "") ?  alert("请分别输入两个数字！"):elesumspan.innerHTML = parseInt(eleinput[0].value) + parseInt(eleinput[1].value);
        /*  //原来的写法
        if(typeof parseInt(eleinput[0].value) == "number" && typeof parseInt(eleinput[1].value) == "number"){
            elesumspan.innerHTML = null;//重置原来的文本
            elesumspan.innerHTML = parseInt(eleinput[0].value) + parseInt(eleinput[1].value);
        }else{
            alert("请分别输入两个数字！")
        }*/
    }
    EventUtil.addHandler(eleinput[2],"click",sumFun);


    //输入两个数字，比较大小
    var elevsspan = eleinput[5].nextSibling.nextSibling;//一定要记得隐藏的文本节点
    function vsFun() {
        (eleinput[3].value == "" || eleinput[3].value == "") ?  alert("请分别输入两个数字！"):elevsspan.innerHTML = Math.max(parseInt(eleinput[3].value),parseInt(eleinput[4].value));
        /*  //原来的写法
        if(typeof parseInt(eleinput[3].value) == "number" && typeof parseInt(eleinput[4].value) == "number"){
            elevsspan.innerHTML = null;//重置原来的文本
            elevsspan.innerHTML = Math.max(parseInt(eleinput[3].value),parseInt(eleinput[4].value));
        }else{
            alert("请分别输入两个数字！")
        }*/
    }
    EventUtil.addHandler(eleinput[5],"click",vsFun);


    //判断数字是否为两位数（功能不完善）
    var istwobtn = eleinput[6].parentNode.nextSibling.nextSibling;//第一个是文本节点；第二个才是btn节点。
    function isTwoFun() {//先判断是否都是数字；然后进行位数判断。
        for(var i = 0;i < eleinput[6].value.length;i++){
            if(/[\d]{3}/.test(eleinput[6].value) == true){
                alert("这是三位数");
                break;
            }else if(/[\d]{2}/.test(eleinput[6].value) == true){
                alert("√是两位数");
                break;
            }else if(/[\d]/.test(eleinput[6].value) == true){
                alert("这是一位数");
                break;
            }else{
                alert("请输入数字！！！");
                break;
            }
        }
    }
    EventUtil.addHandler(istwobtn,"click",isTwoFun);


    //累加按钮，自加一。
    var num1 = 1;
    var eleadd1btn = document.getElementById("addone1");
    function clickadd() {
        eleadd1btn.innerHTML = num1.toString();
        num1++;
    }
    EventUtil.addHandler(eleadd1btn,"click",clickadd);


    //页面加载后累加，自加一
    var num2 = 0;
    var eleautoaddone = document.getElementById("autoaddone").childNodes[1];
    function autoadd() {
        eleautoaddone.innerHTML = num2.toString();
        num2++;
    }
    setInterval(autoadd,1000);

}
EventUtil.addHandler(window,"load",myFun);