$(()=>{
	if(location.pathname.endsWidth("cart.html")){     // endsWidth
		$.get("data/users/isLogin.php")   
		.then(data=>{			  // then()方法用户未登录则返回登录页
			if(data.ok==0){
				alert("please Login");
				location="login.html";
			 }
		 });			
	 }
	 $("#header").load("header.html",function(){  // header 元素添加"search" 属性
		$("[data-trigger=search]"); 
	   });

	$.getJSON("data/users/isLogin.php").then(data=>{
		if(data.ok=1){    // 登录成功跳转的页面  ******************************
			alert("Login OK");
			location="";   // 页面转向    
		}
	 });
	 #("#logout").click(function(){        // 单击事件的行为
		$.get("data/users/logout.php").then(()=>{
			$("#loginList").show().next().hide();   // then()执行元素显示，并且下一个元素隐藏 		
		 });	 
	  });
	  location.reload(true);//重新加载页面
   });