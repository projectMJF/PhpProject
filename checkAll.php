<?php
// data/cart/checkAll.php
require_once("cart.php");
session_start();
@$uid=1;
@$checked=$_REQUEST["checked"];
if($uid!=null && $checked!= null){
	checkAll($uid,$checked);

 }