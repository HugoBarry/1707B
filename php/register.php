<?php 
	$userNum = mt_rand(2000000,2999999);
	str_shuffle($userNum);
	include 'function.php';
	$sql = 'SELECT * from users order by id';
	$res = mysqli_query($conn,$sql);
	$arr = array();
	while ($row = mysqli_fetch_array($res)) {
		array_push($arr, $row);
	}
	if (count($arr) == 0) {
		$id = 1;
	}else{
		$id = $arr[count($arr)-1]['id'] + 1;
	}
	$psw = $_POST['psw'];
	$mdpsw = md5(md5(md5($psw)));
	$username = '用户'.$userNum;
	$status = $_POST['status'];
	if ($status == 0) {
		$phone = $_POST['phoneNum'];
		$s = 'INSERT into users (id,phone,password,username) values ('.$id.',"'.$phone.'","'.$mdpsw.'","'.$username.'")';
	}else if ($status = -1) {
		$mail = $_POST['mail'];
		$phone = $_POST['yzNum'];
		$s = 'INSERT into users (id,phone,password,username,mail) values ('.$id.',"'.$phone.'","'.$mdpsw.'","'.$username.'","'.$mail.'")';
	}else{
		$mail = $_POST['mail'];
		$s = 'INSERT into users (id,mail,password,username) values ('.$id.',"'.$mail.'","'.$mdpsw.'","'.$username.'")';
	}
	$result = mysqli_query($conn,$s);
	if ($result) {
		echo 1;
	}else{
		echo 0;
	}
 ?>