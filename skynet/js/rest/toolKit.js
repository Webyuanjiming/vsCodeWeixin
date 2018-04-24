var encrypt = new JSEncrypt();
var decrypt = new JSEncrypt();
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
	},
	//除法--被除数、除数
	divide:function(dividend,divisor){
		if(!isNaN(dividend) && !isNaN(divisor) && divisor!=0){
			return (dividend/divisor).toFixed(2);
		}
		return null;
	},
	//获取url参数
	getQueryString: function(name){
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	    return results == null ? "": decodeURIComponent(results[1]);
	},
	//没值时返回-
	formart: function(value){
		if(value == undefined || value == null){
			return "-";
		}
		return value;
	},
	//日期相差天数
	dateMinus: function(start,end){
		if(start && end){
			var dateVal = new Date(end) - new Date(start);
			return parseInt(dateVal/1000/24/60/60) + "天";
		}
		return "-";
	},
	//日期相差时间--hh:mi:ss
	timeMinus: function(start,end){
		if(start && end){
			var dateVal = new Date(end) - new Date(start);
			//时
			var hour = parseInt(dateVal/1000/60/60);
			//分
			var min = parseInt((dateVal - hour*1000*60*60)/1000/60);
			//秒
			var second = (dateVal/1000)%60;
			if(hour<10){
				hour = "0"+hour;
			}
			if(min<10){
				min = "0"+min;
			}
			if(second<10){
				second = "0"+second;
			}
			return hour+":"+min+":"+second;
		}
		return "-";
	}
};
/**封装函数**/
/**
 * 原生toFixed有问题
 */
Number.prototype.toFixed=function(len)
{
	return Math.round(this * Math.pow(10, len)) / Math.pow(10, len);
};
/**
 * 删除左右两端的空格
 */
function trim(str)
{
	return str.replace(/(^\s*)|(\s*$)/g, '');
}
/**
 * 删除左边的空格
 */
function ltrim(str)
{
	return str.replace(/(^\s*)/g,'');
}
/**
 * 删除右边的空格
 */
function rtrim(str)
{
	return str.replace(/(\s*$)/g,'');
}

function isEmpty(obj) {
	if (typeof(obj) == "undefined" || obj == null || obj == "") {
		return true;
	}
	return false;
}

//格式化数字
function formatData(num, precision) {
	if (isEmpty(num)) return "";
	if (isNan(num)) return "";

	if (isNan(precision)) return "";
	if (isEmpty(precision)) {
		precision = 2;
	}


	return convertToFloat(num).toFixed(precision);
}

//服务器地址
var SERVER_ADDRESS = ""+"/api/v1";