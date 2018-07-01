<?php
//data/products/getProductsByKw.php
header("Content-Type:application/json");
require_once("../init.php");
$sql="SELECT lid, title, price, (select md from xz_laptop_pic where laptop_id=lid limit 1) as pic FROM `xz_laptop` ";
@$kw=$_REQUEST["kw"];
if($kw!=null){//kw="mac 256g i7"
	$kws=explode(" ",$kw);//kws=kw.split(" ")
	//kws[mac, 256g, i7]
	for($i=0;$i<count($kws);$i++){
		$kws[$i]=" title like '%$kws[$i]%' ";
	}
 //kws[title like '%mac%', title like '%256g%', ...]
	$where=implode(" and ",$kws);//kws.join(" and ")
	//"title like '%mac%' and title like '%256g%' and title like '%i7%'"
	$sql.=" where $where ";
}
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
@$pno=$_REQUEST["pno"];
if($pno==null) $pno=1;
$psize=9;
$count=count($rows);
$sql.=" limit ".(($pno-1)*$psize).",$psize";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
$output=[
	"pno"=>$pno,
	"psize"=>$psize,
	"count"=>$count,
	"pcount"=>ceil($count/$psize),
	"data"=>$rows
];
echo json_encode($output);