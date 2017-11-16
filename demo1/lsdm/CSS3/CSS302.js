/**
 * Created by Administrator on 2017/11/12.
 */
/*视口大小发生改变时实时显示页面大小*/
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
function wLoad() {
    EventUtil.addHandler(window,"resize",resizeFun);
}
function resizeFun() {
    var wid = document.getElementById("wid");
    var hei = document.getElementById("hei");
    wid.innerHTML = window.innerWidth;
    hei.innerHTML = window.innerHeight;
}
EventUtil.addHandler(window,"load",wLoad);