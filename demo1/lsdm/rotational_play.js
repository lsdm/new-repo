/**
 * Created by Administrator on 2017/11/14.
 */
/*
 多张图片；两个按钮；多个li选框。
 轮播
    每5秒进行图片切换；到最后一张时恢复所有图片的margin-left=0；
 btn
    pre：点击后判断本张是否为第一张；是则弹框提示（已经是第一张了）。
         否则上一张margin=0。
    next：点击后判断本张是否为最后一张；是则弹框提示（已经是最后一张了）。
          否则本张margin=-320px。
 li：点击哪一个；目标图片前面的margin-left重置为-320px；后面的置为0

 后续：
    可以考虑li元素样式随img一呈现同变化的效果。
*/
var EventUtil = {
    addHandler: function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    },
    removeHandler:function(element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }
        else if(element.detachEvent){
            element.detachEvent("on" + type,handler);
        }
        else{
            element["on" + type] = null;
        }
    }
};
function myPage() {
    //获取a元素数组；pre元素；next元素；li元素
    var aEles = document.getElementById("rot").getElementsByTagName("a");
    var pbtn = document.getElementsByClassName("pre")[0];
    var nbtn = document.getElementsByClassName("next")[0];
    var liEles = document.getElementsByClassName("points")[0].getElementsByTagName("li");
    var currentE = 0;

    //为a元素设置定时动画:   每2秒进行图片切换；到最后一张向左时恢复第一张的margin-left=0；
    function repeatFun() {
        if (currentE < aEles.length-1){
            aEles[currentE].style.marginLeft = -320 + "px";
            currentE++
        }else {
            Array.prototype.map.call(aEles,function (aEle) {
                aEle.style.marginLeft = 0;
            });
            currentE = 0;
        }
    }
    setInterval(repeatFun,5000);

    //为btn注册点击事件:
    function preFun() {
        if (currentE > 0){
            aEles[currentE-1].style.marginLeft = 0;
            currentE--;
        }else {
            alert("已经是第一张啦！请按>按钮")
        }
    }
    function nextFun() {
        if (currentE < aEles.length-1){
            aEles[currentE].style.marginLeft = -320 + "px";
            currentE++
        }else {
            alert("已经是最后一张啦！请按<按钮")
        }

    }
    EventUtil.addHandler(pbtn,"click",preFun);
    EventUtil.addHandler(nbtn,"click",nextFun);

    //为li注册点击事件:
    function liFun(e) {
        currentE = Array.prototype.indexOf.call(liEles,e.currentTarget);
        for(var i = 0; i < liEles.length;i++){
            if(i < currentE){
                aEles[i].style.marginLeft = -320 + "px";
            }else {
                aEles[i].style.marginLeft = 0;
            }
        }
    }
    //遍历liEles;对每一个li应用liMap函数,帮助它们注册点击事件。（可惜不能使用匿名函数）
    Array.prototype.map.call(liEles,function(liEle) {
        EventUtil.addHandler(liEle, "click", liFun)
    });
}
EventUtil.addHandler(window,"load",myPage);