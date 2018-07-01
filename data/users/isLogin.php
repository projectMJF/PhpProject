<?php
//data/users/isLogin.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
	$sql="select uname from xz_user where uid=$uid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$uname=$row[0];
	echo json_encode(["ok"=>1,"uname"=>$uname]);
}else
	echo json_encode(["ok"=>0]);