<?php
// data/cart/checkAll.php
require_once("cart.php");
session_start();
//@$uid=1;
@$uid=$_SESSION["uid"];
@$checked=$_SESSION["checked"];
if($uid!=null && $checked!= null){
	checkAll($uid,$checked);    //非空情况下，传值 
 }