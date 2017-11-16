<!--?php
// +----------------------------------------------------------------------
// | JuhePHP [ NO ZUO NO DIE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2010-2015 http://juhe.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: Juhedata <info@juhe.cn-->
// +----------------------------------------------------------------------
 
//----------------------------------
// 邮编查询调用示例代码 － 聚合数据
// 在线接口文档：http://www.juhe.cn/docs/66
//----------------------------------
 
header('Content-type:application/json;charset=utf-8');
 
 
//配置您申请的appkey
$appkey = "ab8b6864046a6933c3de7dc49524fc7c";
 
 
 
 
//************1.邮编查询地名************
$url = "http://v.juhe.cn/postcode/query";
$params = array(
      "postcode" => "",//邮编，如：215001
      "key" => $appkey,//应用APPKEY(应用详细页查询)
      "page" => "",//页数，默认1
      "pagesize" => "",//每页返回，默认:20,最大不超过50
      "dtype" => "",//返回数据的格式,xml或json，默认json
);
$paramstring = http_build_query($params);
$content = juhecurl($url,$paramstring);
$result = json_decode($content,true);
if($result){
    if($result['error_code']=='0'){
        print_r($result);
    }else{
        echo $result['error_code'].":".$result['reason'];
    }
}else{
    echo "请求失败";
}
//**************************************************
 
 
 
 
//************2.省份城市区域列表************
$url = "http://v.juhe.cn/postcode/pcd";
$params = array(
      "key" => $appkey,//应用APPKEY(应用详细页查询)
      "dtype" => "",//返回数据的格式,xml或json，默认json
);
$paramstring = http_build_query($params);
$content = juhecurl($url,$paramstring);
$result = json_decode($content,true);
if($result){
    if($result['error_code']=='0'){
        print_r($result);
    }else{
        echo $result['error_code'].":".$result['reason'];
    }
}else{
    echo "请求失败";
}
//**************************************************
 
 
 
 
//************3.地名查询邮编************
$url = "http://v.juhe.cn/postcode/search";
$params = array(
      "pid" => "",//省份ID
      "cid" => "",//城市ID
      "did" => "",//区域ID
      "q" => "",//地名关键字，如:木渎
      "key" => $appkey,//应用APPKEY(应用详细页查询)
      "dtype" => "",//返回数据的格式,xml或json，默认json
);
$paramstring = http_build_query($params);
$content = juhecurl($url,$paramstring);
$result = json_decode($content,true);
if($result){
    if($result['error_code']=='0'){
        print_r($result);
    }else{
        echo $result['error_code'].":".$result['reason'];
    }
}else{
    echo "请求失败";
}
//**************************************************
 
 
 
 
 
/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function juhecurl($url,$params=false,$ispost=0){
    $httpInfo = array();
    $ch = curl_init();
 
    curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
    curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
    curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if( $ispost )
    {
        curl_setopt( $ch , CURLOPT_POST , true );
        curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
        curl_setopt( $ch , CURLOPT_URL , $url );
    }
    else
    {
        if($params){
            curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
        }else{
            curl_setopt( $ch , CURLOPT_URL , $url);
        }
    }
    $response = curl_exec( $ch );
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
    $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
    curl_close( $ch );
    return $response;
}