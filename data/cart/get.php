<?php
//data/cart/get.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
	$sql="SELECT *, (select sm from xz_laptop_pic where laptop_id=lid limit 1) as pic FROM `xz_shoppingcart_item` INNER join xz_laptop on lid=product_id where user_id=$uid";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}