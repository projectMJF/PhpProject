
(()=>{//加载首页商品
	$.getJSON("data/index/getCarousel.php").then(data=>{    //JQuery getJSON请求获取到data索引数组
				//console.log(data);
				var html="";
				for(var value of data){  // 遍历索引数组,找到四张图片
					//console.log(value);
					html+=`<li>
						<a href="${value.href}">
							<img src="${value.img}" title="${value.title}">	
							</a>	
						</li>`;
				 }
				html+=`<li>
							<a href="${data[0].href}">
							<img src="${data[0].img}" title="${data[0].title}">	
							</a>	
						</li>`;
				var LiWidth=960,moved=0,interval=500,wait=3000;
				var $ul=$("[data-load=bannerImgs]");
						$ul.html(html).css("width",(data.length+1)*LiWidth);
							var $index=$("[data-load=bannerInds]");
						$("[data-load=bannerInds]")
							.html("<li></li>".repeat(data.length))      // 链式操作，根据data.length的长度生成对应的圆点,
							.children().first().addClass("hover");		// 给li的第一个下级元素添加class名为"hover"
						
							
					function move(dir=1){
								if(moved==0&&dir==-1){    // 
										moved=data.length;
										$ul.css("left",-LiWidth*data.length);								
								}
							moved++;  // 
							$ul.animate({
								left:-LiWidth*moved
							 },interval,function(){
								if(moved==data.length){
									moved=0;
									$ul.css("left",0);
								 }
								 
						$index.children(":eq("+moved+")").addClass("hover")   // ep(index)所有index 值为0的元素
							.siblings().removeClass("hover");
							 });
							}
					 setInterval(move,wait+interval);

					
					timer=setInterval(move,wait+interval);  
					$("#banner").hover(       // 鼠标进入事件,动画停止   // -----------------------------------------
						function(){
							clearInterval(timer);
							timer=null;	
						},						 
					 function(){
					 timer=setInterval(move,wait+interval);
					 });
				$index.on("click","li:not(.hover)",function(){     // 广告banner点击事件
					var i=$(this).index();    // 获取触发事件的对象
					moved=i;       
					$ul.stop(true).animate({    // ul行为变化，
						left:-LiWidth*moved
					
					 },interval,function(){
						$index.children(":eq("+moved+")").addClass("hover")   // ep(index)所有index 值为0的元素
							.siblings().removeClass("hover");
					});
				 });
				$("[data-move=right]").click(function(){    // 右进按钮行为
					if(!$ul.is(":animate")){
						move();
					 }				
				 });
				 $("[data-move=left]").click(function(){     // 左进按钮行为
					if(!$ul.is(":animate")){
						move(-1);
					 }					 
				  });
				
   });

	ajax({
		type:"get",
		url:"data/index/getRecommended.php",
		dataType:"json"
	}).then(data=>{
		for(var i=0,html="";i<data.length;i++){
			var p=data[i];
			if(i<2){
				html+=`<div> 
					<div class="desc">
						<p class="name">${p.title}</p>
						<p class="details">${p.details}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}" class="view">查看详情</a>
					</div>
					<img src="${p.pic}">
				</div>`;
			}else if(i==2){
				html+=`<div>
					<div class="desc">
						<p class="name">${p.title}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}" class="view">查看详情</a>
					</div>
					<img src="${p.pic}">
				</div>`;
			}else{
				html+=`<div class="product">
          <img src="${p.pic}">
          <p class="name">${p.title}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}">查看详情</a>
        </div>`
			}
		}
		document.querySelector("#f1>.floor-content")
			.innerHTML=html;
	});
	ajax({
		type:"get",
		url:"data/index/getNewArrival.php",
		dataType:"json"
	}).then(data=>{
		for(var i=0,html="";i<data.length;i++){
			var p=data[i];
			if(i<2){
				html+=`<div> 
					<div class="desc">
						<p class="name">${p.title}</p>
						<p class="details">${p.details}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}" class="view">查看详情</a>
					</div>
					<img src="${p.pic}">
				</div>`;
			}else if(i==2){
				html+=`<div>
					<div class="desc">
						<p class="name">${p.title}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}" class="view">查看详情</a>
					</div>
					<img src="${p.pic}">
				</div>`;
			}else{
				html+=`<div class="product">
          <img src="${p.pic}">
          <p class="name">${p.title}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}">查看详情</a>
        </div>`
			}
		}
		document.querySelector("#f2>.floor-content")
			.innerHTML=html;
	});
	ajax({
		type:"get",
		url:"data/index/getTopSale.php",
		dataType:"json"
	}).then(data=>{
		for(var i=0,html="";i<data.length;i++){
			var p=data[i];
			if(i<2){
				html+=`<div> 
					<div class="desc">
						<p class="name">${p.title}</p>
						<p class="details">${p.details}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}" class="view">查看详情</a>
					</div>
					<img src="${p.pic}">
				</div>`;
			}else if(i==2){
				html+=`<div>
					<div class="desc">
						<p class="name">${p.title}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}" class="view">查看详情</a>
					</div>
					<img src="${p.pic}">
				</div>`;
			}else{
				html+=`<div class="product">
          <img src="${p.pic}">
          <p class="name">${p.title}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}">查看详情</a>
        </div>`
			}
		}
		document.querySelector("#f3>.floor-content")
			.innerHTML=html;
	});
		var $lift=$("#lift"), $ulLift=$("#lift>ul"), $floors=$(".floor");
		$(window).scroll(function(){
			var scrollTop=document.body.scrollTop   
						||	document.documentElement.scrollTop;
			var offsetTop1=$("#f1").offset().top;
				if(offsetTop1<=scrollTop+innerHeight/2){
					$lift.show();
				}else{
					$lift.hide();
				}					
					$floors.each(function(i,floor){
						var $floor=$(floor);
						var offsetTop=$floor.offset().top;
						if(offsetTop<=scrollTop+innerHeight/2){
							$ulLift.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
						}
					 });
		 });

//









})();
