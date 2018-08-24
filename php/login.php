<?php 
	include 'function.php';
	$user = $_POST['username'];
	$psw = $_POST['password'];
	$mdpsw = md5(md5(md5($psw)));
	$sessid = $_POST['sessionid'];
	$sql = 'SELECT * from users where username="'.$user.'" AND password="'.$mdpsw.'" or phone="'.$user.'" AND password="'.$mdpsw.'" or mail="'.$user.'" AND password="'.$mdpsw.'"';
	$res = mysqli_query($conn,$sql);
	$count = 0;
	$arr = array();
	while ($row = mysqli_fetch_array($res)) {
		$data = array();
		$data['id'] = $row['id'];
		array_push($arr, $data);
		$count++;
	}
	$id = $arr[0]['id'];
	if ($count!=0) {
		echo json_encode(array("res"=>1,"id"=>$id));
	}else{
		echo 0;
	}
 ?>
 