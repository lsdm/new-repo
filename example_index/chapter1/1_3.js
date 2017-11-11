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
};//使用它的好处在于跨浏览器兼容；而且对同一个元素能够同时加入多个事件处理程序
window.onload = function () {
    var btn = document.getElementById("btn");
    var city = document.getElementById("city");
    var town = document.getElementById("town");
    var clickAction = function () {
        if(city && town){
            alert(city.value);
            alert(town.value);
        }
    };
    EventUtil.addHandler(btn,"click",clickAction);
};


