"use strict";
$(function($) {
	function getQueryString(name){
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	    return results == null ? "": decodeURIComponent(results[1]);
	}
  //检查手机号码
  function checkIsMobile(mobile) {
    if (!mobile || !(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(mobile))) {
        return false;
    }
    return true;
  }
	//奖品
	var award = getQueryString("award");
	$("#award").text(award);
	//计算收益
	$("#calculate").click(function(){
		var money = $("#money").val();
		if(money == ""){
			showAlert("请先输入金额。");
			return;
		}
		if(isNaN(money)){
			showAlert("请输入数字。");
			return;
		}
		//利息
		var interest = parseFloat(money)*15.6/100/12*6;
		$(".info3").text("预计收益："+interest.toFixed(2)+"元").show();
	});
  /**************注册页面*******************/
  var validateStr = "/api/verify?" + (new Date).getTime();
  var validate = false;
  //判断是否显示图片验证码
  $.get("/api/querysmsstatus",function(response){
    if(response.status == true){
      validate = response.entity;
      if(validate == 1){
        $("#validate").show();
        $("#captcha-img").attr("src",validateStr);
      }
    }
  })
  //获取验证码
  $("#smsCode").click(function(){
    //手机号码
    var phoneNumber = $("#userName").val();
    //图片验证码
    var imgVerifyCode = $("#imgVerifyCode").val();
    //可使用
    if($(this).attr("enable") == "true"){
      //手机号是否为空
      if(!phoneNumber){
          showAlert("请输入手机号码！");
          return false;
      }            
      //手机号格式是否正确
      if(!checkIsMobile(phoneNumber)){
          showAlert("请输入正确的手机号码！");
          return false;
      }
      //验证码
      if(validate == 1 && !imgVerifyCode){
         showAlert("请输入验证码！"); 
         return false;
      }  
      var time = 60;
      var timer = setInterval(function() {
          if (time > 1) {
              time--;
              var btnmsg = "";
              if(time<10){
                btnmsg = '0' + time + 's 后重试';
              }else{
                btnmsg = time + 's 后重试';
              }                           
              $("#smsCode").text(btnmsg);
              $("#smsCode").attr("enable","false");
          } else {
              $("#smsCode").text("获取验证码");
              $("#smsCode").attr("enable","true");
              clearInterval(timer);
          }
      }, 1000);
      var url = "/api/scode?tel="+phoneNumber;
      if(validate == 1){
        url = "/api/smsverifyimg3?tel=" + phoneNumber + "&img=" + imgVerifyCode;
      }
      //获取短信验证码
      $.ajax({
        url:url,
        success: function(response){
          if(response.status == false){
            showAlert(response.msg);
            $("#smsCode").text("获取验证码");
            $("#smsCode").attr("enable","true");
            clearInterval(timer);
            $("#validate").show();
            validate = 1;
          }
        },
        error:function(){
          showAlert("发送短信验证码失败，请重试。");
          $("#smsCode").text("获取验证码");
          $("#smsCode").attr("enable","true");
          clearInterval(timer);
        }      
      });   
    }
  });
  //注册
  $("#register").click(function(){
      //手机号码
      var phoneNumber = $("#userName").val();
      //密码
      var pwd = $("#pwd").val();
      //验证码
      var validateCode = $("#validateCode").val();
      //图片验证码
      var imgVerifyCode = $("#imgVerifyCode").val();
      //是否同意协议
      var agree = $("#agree").val();
      //手机号是否为空
      if(!phoneNumber){
          showAlert("请输入手机号码！");
          return false;
      }            
      //手机号格式是否正确
      if(!checkIsMobile(phoneNumber)){
          showAlert("请输入正确的手机号码！");
          return false;
      }
      //密码是否为6-12位
      if(pwd.length < 6 || pwd.length > 16){
          showAlert("请输入6-16位密码！");
          return false;
      }
      //验证码
      if(!validateCode){
          showAlert("请输入验证码！");
          return false;
      } 
      //是否同意协议
      if(agree != "true"){
          showAlert("请先同意协议！");
          return false;
      }
      //验证码
      if(validate == 1 && !imgVerifyCode){
         showAlert("请输入验证码！"); 
         return false;
      } 
      var params = {userName:phoneNumber,pwd:pwd,agree:agree,validateCode:validateCode};
      if(validate == 1){
        params.imgVerifyCode = imgVerifyCode;
      }
      $.ajax({
        url:"/api/register",
        type:"post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(params),
        success: function(response){
          if(response.status == true){
            showAlert("注册成功<a href='https://m.jujinziben.com/m/jujin/#/accounter'>去登录</a>");
            //注册正常跳转
            //window.location.href="https://m.jujinziben.com/m/jujin/#/accounter";
          }else{
            showAlert(response.msg);
          }         
        },
        error:function(){
          showAlert("注册失败，请重试。");
        }      
      });  
  });
  //同意
  $("#agreement").click(function(){
    var agree = $("#agree").val();
    if(agree == "true"){
      $("#agree").val("false");
    }else{
      $("#agree").val("true");
    }   
    $(".default-radio").toggleClass("checked-radio-blue");
  });
  function showAlert(msg){
    $("#alert-msg").html(msg);
    $(".jj-model-window").show();
  }
  //关闭弹窗
  $("#close").click(function(){
    $(".jj-model-window").hide();
  });
});