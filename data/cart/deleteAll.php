<?php
// data/cart/deleteAll.php
require_once("cart.php");
session_start();
//@$uid=35;
 @$uid=$_SESSION["uid"];
if($uid!=null){
	deleteAll($uid);
 }