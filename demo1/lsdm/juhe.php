<!--?php
// +----------------------------------------------------------------------
// | JuhePHP [ NO ZUO NO DIE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2010-2015 http://juhe.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: Juhedata <info@juhe.cn-->
// +----------------------------------------------------------------------
 
//----------------------------------
// �ʱ��ѯ����ʾ������ �� �ۺ�����
// ���߽ӿ��ĵ���http://www.juhe.cn/docs/66
//----------------------------------
 
header('Content-type:application/json;charset=utf-8');
 
 
//�����������appkey
$appkey = "ab8b6864046a6933c3de7dc49524fc7c";
 
 
 
 
//************1.�ʱ��ѯ����************
$url = "http://v.juhe.cn/postcode/query";
$params = array(
      "postcode" => "",//�ʱ࣬�磺215001
      "key" => $appkey,//Ӧ��APPKEY(Ӧ����ϸҳ��ѯ)
      "page" => "",//ҳ����Ĭ��1
      "pagesize" => "",//ÿҳ���أ�Ĭ��:20,��󲻳���50
      "dtype" => "",//�������ݵĸ�ʽ,xml��json��Ĭ��json
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
    echo "����ʧ��";
}
//**************************************************
 
 
 
 
//************2.ʡ�ݳ��������б�************
$url = "http://v.juhe.cn/postcode/pcd";
$params = array(
      "key" => $appkey,//Ӧ��APPKEY(Ӧ����ϸҳ��ѯ)
      "dtype" => "",//�������ݵĸ�ʽ,xml��json��Ĭ��json
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
    echo "����ʧ��";
}
//**************************************************
 
 
 
 
//************3.������ѯ�ʱ�************
$url = "http://v.juhe.cn/postcode/search";
$params = array(
      "pid" => "",//ʡ��ID
      "cid" => "",//����ID
      "did" => "",//����ID
      "q" => "",//�����ؼ��֣���:ľ��
      "key" => $appkey,//Ӧ��APPKEY(Ӧ����ϸҳ��ѯ)
      "dtype" => "",//�������ݵĸ�ʽ,xml��json��Ĭ��json
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
    echo "����ʧ��";
}
//**************************************************
 
 
 
 
 
/**
 * ����ӿڷ�������
 * @param  string $url [�����URL��ַ]
 * @param  string $params [����Ĳ���]
 * @param  int $ipost [�Ƿ����POST��ʽ]
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