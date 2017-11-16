/**
 * Created by Administrator on 2017/11/15.
 */
/*
手风琴效果：
div#acc的width=400px；记320px+4*20px；20px用于鼠标移动全图显示；
第一张图margin-left永远不变；
其他任意图鼠标划入自己（的20px）时遍历a；
判断a的margin-left值；(由于在css的外部样式表中；要使用到计算样式获取属性值)
    其前面的a的margin-left若小于320px则不变；否则减去320px；
    其后面的a的margin-left若大于320px则不变；否则加上320px；
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
//页面加载回调函数;用于在页面加载完后为每个a元素添加监听事件；触发效果。
function myPage() {
    var aEles = document.getElementsByTagName("a");

    //myAcc函数用于实现手风琴效果
    function myAcc(e) {
        var var1 = Array.prototype.indexOf.call(aEles,e.currentTarget);
        for(var j = 1;j < aEles.length;j++){
            if (j <= var1){//第i个a元素前面的若小于320px就不动；否则margin-left就减去280px；
                if(parseInt(window.getComputedStyle(aEles[j],null).marginLeft) >= 320){
                    //要想实现平滑过渡；可以在这里使用动画效果。
                    aEles[j].style.marginLeft = (parseInt(window.getComputedStyle(aEles[j],null).marginLeft) - 280) + "px";
                }
            }else {////第i个a元素后面的若大于320px就不动；否则margin-left就加上280px；
                if(parseInt(window.getComputedStyle(aEles[j],null).marginLeft) < 320){
                    aEles[j].style.marginLeft = (parseInt(window.getComputedStyle(aEles[j],null).marginLeft) + 280) + "px";
                }
            }
        }
    }

    for(var i=0; i<aEles.length;i++){
        EventUtil.addHandler(aEles[i],"mouseover",myAcc);
    }
}
EventUtil.addHandler(window,"load",myPage);