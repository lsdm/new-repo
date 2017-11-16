/**
 * Created by Administrator on 2017/11/1.
 */
function getmap() {
    if(!navigator.geolocation){
        throw new Error("geolocation is not supported");
    }else{
        var image = document.createElement("img");
        //处理位置信息返回需要的URL的函数
        function setMapURL(pos){
            var latitude = pos.coords.latitude;
            var longitude = pos.coords.longitude;
            var accuracy = pos.coords.accuracy;

            var url = "http://maps.google.com/maps/api/staticmap" + "?center=" + latitude + "," + longitude + "&size=640×640&sensor=true";

            var zoomlevel = 20;
            if(accuracy > 80){
                zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2);
                url += "&zoom=" + zoomlevel;
            }

            image.src = url;
        }
        navigator.geolocation.getCurrentPosition(setMapURL);
        return image;
    }
}

window.onload = function () {
    var myImg = getmap();
    var body = document.getElementsByTagName("body");
    body[0].appendChild(myImg);
};