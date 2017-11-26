/**
 * Created by Administrator on 2017/11/19.
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
/*
 页面加载后即调用聚合数据的三方联动json数据 https://www.juhe.cn/docs/api/id/39/aid/167；
 对跨域获取的数据进行处理；按省市区进行分类。
 遍历数据生成各省直辖市的option添加appendchild到第一个label中；
 点击选择省或直辖市遍历找到该省，生成该省的地级市的option添加到第二个label中；
 点击选择地级市后遍历找到该地级市，生成该省该地级市的县区的option添加到第三个label中；
 */

// 页面加载后即调用聚合数据的三方联动json数据 https://www.juhe.cn/docs/api/id/39/aid/167；
function threeFun() {
    //利用jsonp进行跨域；myFun是内联js中的回调函数。
    var eleBody = document.getElementsByTagName("body");
    var eleScript = document.createElement("script");
    eleScript.src = "https://v.juhe.cn/weather/citys?dtype=json&key=511c09ccd4081e2f7d769f6f0bc7d73a&callback=myFun";
    document.getElementsByTagName("head")[0].appendChild(eleScript);
}
EventUtil.addHandler(window,"load",threeFun);
