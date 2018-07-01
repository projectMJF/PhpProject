$(()={
	$.get("data/cart/get.php").then(data=>{    // jquery get请求
			var html="";					// 定义空值对象,用于向DOM元素添加对象
			var selected=0;
			var total=0;
			for(var item of data){	// for of 循环遍历索引数组   
					console.log(data);  // json数组对象
				html=`<div class="imfor">    //   添加外层DIV 
						</div>`;
						for(item.is_checked==1){
							total+=item.price*item.count;
							selected+=parseInt(item.count);	
						}
					}
					$(".total, .totalOne").html(selected);
					$(".totalPrices,.foot-price").html("￥"+total.toFixed(2));
					$("#countent-box-body").html(html);
					<div class="check">			// 添加内层DIV						
 /*添加自定义属性，用于选中项的判断*/<img data-iid="${item.iid}" src="${		   			
						item.is_checked==1?         // 动态判断对象是否被选中；如果选中则更换图标
							'img/cart/product_true.png':
							'img/cart/product.normal.png'
						}" alt="">
						</div>
					<div class="product">
						<a href="product_details.html?lid=${item.lid}"><img src="${item.pic}" alt=""></a>
						<span class="desc">   //如果选中一个，则添加到"span"中
						
						
						
						
						$("span").html(html); // ***********************************************************						
						  </span>					
						</div>
					</div>`
			 }
				$("#content-box-body").html(html);

	}).on("click",".reduce,.add",function(e){
				var $span=$(this);
				var iid=$span.data("iid");  // 添加自定义的属性
				var count=parseInt($("iid").siblings("input").val(); // 将input元素的值转换为整数
				if($span=="reduce"){
					count--;			
				 }
				 else if($span == "add"){
						count++;
				  }				
		 }).on("click",".check>img",function(e){
				var $img=$(e.target);
				var iid=$img.data("iid");
				var checked=$img.attr("src").endsWidth("normal.png")?1:0;
				$.get("data/cart/check.php").then(function(){
						
				
				 });
		  
		  })



	
});