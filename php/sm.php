<?php
header('Content-Type=text/html;charset=utf-8');
$id = $_POST['id'];
$name = $_POST['name'];
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://apis.haoservice.com/idcard/VerifyIdcard?cardNo=".$id."&realName=".$name."&key=244449fe819c4847be089f0ecb702d05",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}