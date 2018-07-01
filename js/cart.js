function loadCart(){
	$.getJSON("data/cart/get.php")
		.then(data=>{
		var html="";
		var selected=0;
		var total=0;
		for(var item of data){
			html+=`<div class="imfor">
				<div class="check">
					<img data-iid="${item.iid}" src="${
						item.is_checked==1?
				    'img/cart/product_true.png':
						'img/cart/product_normal.png'
					}" alt="">
				</div>
				<div class="product">
					<a href="product_details.html?lid=${item.lid}">
						<img src="${item.pic}" alt="">
					</a>
					<span class="desc">
						<a href="product_details.html?lid=${item.lid}">${item.title}</a>
					</span>
					<p class="col">
						<span>规格：</span>
						<span class="color-desc">${item.spec}</span>
					</p>
				</div>
				<div class="price">
					<p class="price-desc">阿甲专享价</p>
					<p><b>¥</b>${item.price}</p>
				</div>
				<div class="num">
					<span class="reduce" data-iid="${item.iid}"> - </span>
					<input type="text" value="${item.count}">
					<span class="add" data-iid="${item.iid}"> + </span>
				</div>
				<div class="total-price">
					<span>¥</span>
					<span>${(item.count*item.price).toFixed(2)}</span>
				</div>
				<div class="del">
					<a href="#" data-iid="${item.iid}">删除</a>
				</div>
			</div>`;
			if(item.is_checked==1){
				total+=item.price*item.count;
				selected+=parseInt(item.count);
			}
		}
		$(".total,.totalOne").html(selected);
		$(".totalPrices,.foot-price")
			.html("¥"+total.toFixed(2));		
		$("#content-box-body").html(html);

		// data.some()执行三目运算 ，选择normal.png 或者true.png    
		/*$(".check-top>img,.all>span>img").attr("src",data.some(function(item){    // 将购物车中的全选框设置为全选   **********
			return item.is_checked=0;  
			})? 
				"img/cart/product_normal.png":
				"img/cart/product_true.png"
		//	|| data.length==0
			);*/
	})
}
$(()=>{
	loadCart();
	$("#content-box-body").on("click",".del>a",e=>{
			e.preventDefault();
			if(confirm("是否继续删除?")){
				var $a=$(e.target);
				var iid=$a.data("iid");
				$.get("data/cart/delete.php",{iid}).then(()=>{
					loadCart()
				});
			}
	}).on("click",".reduce,.add",e=>{
		var $span=$(e.target);
		var iid=$span.data("iid");
		var count=parseInt($span.siblings("input").val());
		if($span.is(".add"))
			count++;
		else 
			count--;
		$.get("data/cart/update.php",{iid,count})
			.then(()=>{
			loadCart();
		})
	}).on("click",".check>img",e=>{
		var $img=$(e.target);
		var iid=$img.data("iid");
		var checked=
			$img.attr("src").endsWith("normal.png")?1:0;
		$.get("data/cart/check.php",{iid,checked}).then(()=>{
			loadCart();
		});
	}).on("click",".check-top>img,.all>span>img",(function(e){     //单击全选按钮事件 --------------------------
		//$(".check-top>img",".all>span>img").click(function(e){             
		var $img=$(e.target);
			//$img.preventDefault();
		$.get(
			"data/cart/checkAll.php",
		{
		checked:
			$img.attr("src").endsWith("normal.png")?1:0   // endWidth("normal.png")?1:0;
		}).then(loadCart);
	 })
	 );
	 $(".base>a").click(function(){   // 删除事件
		$.get("data/cart/deleteChecked.php").then(loadCart);
	  });

})