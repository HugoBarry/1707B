<?php 
	$status = $_POST['status'];
	include 'function.php';
	if ($status == 0) {
		$phone = $_POST['phone'];
		$sql = 'SELECT * from users where phone="'.$phone.'"';
	}else if ($status == -2) {
		$id = $_POST['id'];
		$sql = 'SELECT * from users where id="'.$id.'"';
	}else{
		$mail = $_POST['mail'];
		$sql = 'SELECT * from users where mail="'.$mail.'"';
	}
	$res = mysqli_query($conn,$sql);
	$arr = array();
	$count = 0;
	if ($status == -2) {
		while ($row = mysqli_fetch_array($res)) {
			$data = array();
			$data = $row['username'];
			array_push($arr, $data);
			$count++;
		}
		if ($count!=0) {
			echo json_encode(array("res"=>1,"user"=>$arr[0]));
		}else{
			echo 0;
		}
	}else{
		while ($row = mysqli_fetch_array($res)) {
			$count++;
		}
		if ($count!=0) {
			echo 1;
		}else{
			echo 0;
		}
	}
	
 ?>