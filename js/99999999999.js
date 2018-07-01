
(()=>{		//加载首页商品

	ajax({               
		type:"get",             // 使用ajax get方式执行异步数据传递
		url:"data/index/getRecommended.php",     // 请求地址
		dataType:"json"       // 请求数据的类型为JSON
	}).then(data=>{		    	// .then()方法执行函数调用,返回成功与失败的结果 
		for(var i=0,html="";i<data.length;i++){    // 循环遍历AJAX接收到的响应的结果
			//console.log("this is one i:"+i);          // 输出下标0-5
			
	//data为：JSON字符串数组[索引数组]
	//json=[{pid:"",title:"",details:"",pic:"",price:"",href:""},{},{},{},{},{}]; 数组长度为6,下标为0-5
	//console.log(data);        
	//console.log("this is two i:"+i);    //   // 输出下标0-5
	//console.log(data[i]);
		for(var value of data ){  // 使和FOR OF遍历JSON对象[索引数组], 再用for in遍历关联数组 			
			for(var nval in value ){
				console.log(nval+":"+value[nval]);		
			 }	
		}
			var p=data[i];     // json数组的下标，用于取出data中的value
			if(i<2){    
				html+=`<div>           // 创建DIV拼接到id为"f1"下的class"floor-content"中
					<div class="desc">
						<p class="name">${p.title}</p>   //动态获取title值
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
	
		document.querySelector("#f1>.floor-content")   // 一楼
			.innerHTML=html;

	});
	ajax({
		type:"get",
		url:"data/index/getNewArrival.php",
		dataType:"json"
	}).then(data=>{
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





})();
