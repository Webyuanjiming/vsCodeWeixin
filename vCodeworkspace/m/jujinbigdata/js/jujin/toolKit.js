//通用工具
var JJToolKit = {
	//获取cookie值
	getCookie : function(name){
		var value = null;
		if (document.cookie && "" !== document.cookie)
	        for (var array = document.cookie.split(";"), i = 0; i < array.length; i++) {
	            var cookieVal = jQuery.trim(array[i]);
	            if (cookieVal.substring(0, name.length + 1) == name + "=") {
	                value = decodeURIComponent(cookieVal.substring(name.length + 1));
	                break
	            }
	        }
		return value;
	},
	//设置cookie值
	setCookie : function(name,value){
		var num = 30,
			date = new Date();
		date.setTime(date.getTime() + 24*num*60*60*1e3);	
		document.cookie = name + "=" + escape(value) + ";path=/;expires=" + date.toGMTString()
	},
	//加载中
	mask: function(element){
		element.addClass("masked");
		element.append('<div class="loadmask"></div><div class="loadmask-msg"><div></div></div>');
	},
	//加载完成
	unmask: function(element){
		element.find(".loadmask-msg,.loadmask").remove();
		element.removeClass("masked");
	}
};
//服务器地址
var SERVER_ADDRESS = "http://m.jujinziben.com";