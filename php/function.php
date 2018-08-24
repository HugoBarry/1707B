<?php 
	$conn = mysqli_connect('localhost','root','');
	mysqli_select_db($conn,'weather');
	mysqli_query($conn,'set names utf8');
 ?>