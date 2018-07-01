function load(pno=1){
	var kw;//undefined
	if(location.search!=="")//?kw=mac i7 256g
		kw=location.search.slice(1);
	$.ajax({
		type:"get",
		url:"data/products/getProductsByKw.php",
		data:"pno="+pno+(kw?"&"+kw:""),
		dataType:"json"
	}).then(output=>{
		var {data,pno,pcount}=output;
		var html="";
		for(var p of data){
			html+=`<li>
				<a href="product_details.html?lid=${p.lid}">
					<img src="${p.pic}" alt="">
				</a>
				<p>
					¥<span class="price">${p.price}</span>
					<a href="product_details.html?lid=${p.lid}">${p.title}</a>
				</p>
				<div>
					<span class="reduce">-</span>
					<input type="text" value="1">
					<span class="add">+</span>
					<a href="javascript:;" class="addCart" data-lid="${p.lid}">加入购物车</a>
				</div>
			</li>`;
		}
		document.getElementById("show-list")
			.innerHTML=html;

		var html=`<a href="javascript:;" class="previous">上一页</a>`;
		for(var i=1;i<=pcount;i++){
			html+=`<a href="javascript:;" class=${i==pno?"current":""}>${i}</a>`;
		}
		html+=`<a href="javascript:;" class="next">下一页</a>`;
		var divPages=document.getElementById("pages");
		divPages.innerHTML=html;
		var prev=divPages.children[0],
			next=divPages.lastElementChild;
		if(pno==1) prev.className="previous disabled";
		else prev.className="previous";
		if(pno==pcount) next.className="next disabled";
		else next.className="next";
	})
}
function loadCart(){
	$.getJSON("data/cart/get.php")
		.then(data=>{
		var html="";
		var total=0;
		for(var item of data){
			total+=item.price*item.count;
			html+=`<div class="item">
				<span>${item.title}</span>
				<div>
					<span class="reduce" data-iid="${item.iid}">-</span>
					<input type="text" value="${item.count}">
					<span class="add" data-iid="${item.iid}">+</span>
				</div>
				<p>
					<span>¥${(item.price*item.count).toFixed(2)}</span>	
				</p>
			</div>`;
		}
		$("#total").html(total.toFixed(2));
		$("#cart>.cart_content").html(html);
	})
}
$(()=>{
	load();
	document.getElementById("pages").onclick=
		function(e){
		if(e.target.nodeName=="A"){
			var a=e.target;
			if(!/disabled|current/.test(a.className)){
				if(/previous|next/.test(a.className)){
					var i=parseInt(
							document.querySelector("#pages>.current").innerHTML
					);
					if(a.className=="previous"){
						load(i-1);
					}else{
						load(i+1);
					}
				}else{
					load(a.innerHTML);
				}
			}
		}
	}
	$("#show-list").on("click",".reduce,.add",function(){
		var $span=$(this);
		var $input=$span.siblings("input");
		var n=parseInt($input.val());
		if($span.is(".add"))
			n++;
		else if(n>1)
			n--;
		$input.val(n);
	}).on("click",".addCart",function(){
		var $a=$(this);
		var lid=$a.data("lid");
		var $input=$a.siblings("input");
		var count=$input.val();
		$.get("data/cart/add.php",{lid,count})
			.then(()=>{
			loadCart();
			$input.val(1);
		})
	});
	loadCart();
	$("#cart").on("click",".reduce,.add",function(){
		//this->span
		var $span=$(this);
		var count=parseInt($span.siblings("input").val());
		if($span.is(".add")){
			count++;
		}else{
			count--;
		}
		var iid=$span.data("iid");
		$.get("data/cart/update.php",{iid,count})
			.then(()=>{
			loadCart();
		})
	});
	$("#cart>.title>a").click(e=>{
		e.preventDefault();
		$.get("data/cart/clear.php").then(loadCart);
	})
});