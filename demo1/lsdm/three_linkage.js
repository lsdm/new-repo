/**
 * Created by Administrator on 2017/11/13.
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
页面加载后即调用聚合数据的三方联动json数据；
遍历数据生成各省直辖市的option添加appendchild到第一个label中；
点击选择省直辖市后进行判断是否是默认值；否则遍历找到该省，生成该省的市的option添加到第二个label中；
点击选择地级市后进行判断是否是默认值；否则遍历找到该地级市，生成该省该地级市的县区的option添加到第三个label中；
*/
function tLink() {
    //页面加载后即调用聚合数据的三方联动json数据；
    var posData = (function juheData() {
        var request = new XMLHttpRequest();
        request.open("GET","url",true);
        request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200){
                //获得响应的类型
                var type = request.getResponseHeader("Content-Type");
                if(type === "application/json"){
                    return JSON.parse(request.responseText);
                }else{
                    return "sorry！获取数据出错。";
                }
            }
        };
        request.send(null);
    })();
    //遍历数据生成各省直辖市的option添加appendchild到第一个label中；
    var pos_province = document.getElementById("pos_province");
    var pos_city = document.getElementById("pos_city");
    var pos_area = document.getElementById("pos_area");

    var default_pos = {
        "id":"0",
        "province":"省",
        "city":[
            {
                "id":"01",
                "city":"市",
                "district":[
                    {
                        "id":"001",
                        "district":"县区"
                    }
                ]
            }
        ]
    };

    //对获取的数据进行检测；如无问题生成option逐一添加进去。
    if(typeof posData === "object"){
        if (posData["reason"] === "successed"){
            posData["result"].unshift(default_pos);
            for(var i=0;i < posData["result"].length;i++){
                var pro_opti = document.createElement("option");
                pro_opti.value = posData["result"][i]["province"];
                pro_opti.appendChild(document.createTextNode(posData["result"][i]["province"]));
                pos_province.appendChild(pro_opti);
            }

            //点击选择省直辖市后进行判断是否是默认值；否则遍历找到该省，生成该省的市的option添加到第二个label中；
            function showCity(event) {
                event = event || window.event;//兼容IE8-
                var sel_pro = event.target;
                for(var i = 0;i < posData["result"].length; i++){
                    if(sel_pro.value === posData["result"][i]["province"]){
                        if (i===0){
                            //do nothing
                        }else{
                            var city_opti;
                            for(var j=0;j < posData["result"][i]["city"].length;j++){
                                city_opti = document.createElement("option");
                                city_opti.value = posData["result"][i]["city"][j]["city"];
                                city_opti.appendChild(document.createTextNode(posData["result"][i]["city"][j]["city"]));
                                pos_province.appendChild(city_opti);
                            }
                        }
                    }
                }

                //点击选择地级市后进行判断是否是默认值；否则遍历找到该地级市，生成该省该地级市的县区的option添加到第三个label中；
                function showDis() {
                    var districts = posData["result"].map(function (myPro) {
                        if (myPro["province"] === pos_province.value){
                            return myPro["city"].map(function (myCity) {
                                if(myCity["city"] === pos_city.value){
                                    return myCity["district"];
                                }
                            })
                        }
                    });
                    var dis_opti;
                    for(var i=0;i < districts.length;i++){
                        dis_opti = document.createElement("option");
                        dis_opti.value = districts[i].district;
                        dis_opti.appendChild(document.createTextNode(districts[i].district));
                        pos_area.appendChild(dis_opti);
                    }
                }
                EventUtil.addHandler(pos_city,"click",showDis);
            }
            EventUtil.addHandler(pos_province,"click",showCity);

        }else {
            alert(posData["reason"]);
        }
    }else {
        alert(posData);
    }
}
EventUtil.addHandler(window,"load",tLink);