/**
 * Created by Administrator on 2017/7/28.
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
function timeposition() {
    //确定位置坐标并显示在描述框中
    var elesubscribe = document.getElementById("subscribe");
    function getPosition() {
        if(!navigator.geolocation) throw "geoLocation no supported";
        navigator.geolocation.getCurrentPosition(function (pos) {
            var latitude = pos.coords.latitude;
            var longitude = pos.coords.longitude;
            var location = document.createElement("p");
            var locationtxt = document.createTextNode("you position is latitude:" + latitude +"and longitude:"+ longitude + ".");
            location.appendChild(locationtxt);
            elesubscribe.appendChild(location);
        });
    }

    //样式变换相关对象和函数
    var monthArr = [
        {festival:"元旦：1月1日至3日放假三天。"},
        {festival:"春节：2月2日至8日放假7天。"},
        {festival:"妇女节：3月8日妇女节，与我无关。"},
        {festival:"清明节：4月3日至5日放假3天"},
        {festival:"劳动节：4月30日至5月2日放假3天"},
        {festival:"端午节：6月4日至6日放假3天。"},
        {festival:"小暑：7月7日小暑。不放假"},
        {festival:"七夕节：8月6日七夕节。不放假。"},
        {festival:"中秋节：9月10日至12日放假3天"},
        {festival:"国庆节：10月1日至7日放假7天。"},
        {festival:"立冬：11月8日立冬。不放假。"},
        {festival:"艾滋病日:12月1日；废除奴隶制国际日:12月2日。"}];
    function changestyle() {
        for(var j=0;j<elemonth.length;j++){
            if(Array.prototype.indexOf.call(elemonth,this) === j){
                this.id = "highlight";
                elesubscribe.innerHTML = "";
                getPosition();
                var monthstrong = document.createElement("strong");
                var monthp = document.createElement("p");
                var strongtxt = document.createTextNode((j + 1) +"月节日");
                var br = document.createElement("br");
                monthstrong.appendChild(strongtxt);
                var monthptxt = document.createTextNode(monthArr[j].festival);
                monthp.appendChild(monthstrong);
                monthp.appendChild(br);
                monthp.appendChild(monthptxt);
                elesubscribe.appendChild(monthp);
            }else{
                elemonth[j].id = "";
            }
        }
    }

    //确定此时的月份使得年历上的当前月份高亮显示；
    var elemonth = document.getElementsByClassName("month");
    function nowMonth() {
        var now = new Date();
        var month = now.getMonth();
        //初始化还需要将当月的相关信息显示在描述框中;得到月份的索引后应该可以通过调用函数实现该目的
        changestyle.call(elemonth[month]);

    }
    nowMonth();

    //鼠标经过该月份框高亮，别的月份框暗淡；高亮月份信息显示在描述框中。
    for(var i = 0;i < elemonth.length;i++){
        EventUtil.addHandler(elemonth[i],"mouseover",changestyle);
    }
}

window.onload = timeposition;