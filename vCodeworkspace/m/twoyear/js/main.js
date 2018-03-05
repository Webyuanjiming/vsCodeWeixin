//首次投资时间
var firstTenderDate = undefined,
//邀请总人数
inviteUserCount = 0,
//被邀请人的总收益
inviteInterest = 0,
//通过邀请获得的收益
rewardInterest = 0,
//赚钱能力
earningFlag = 0;
//手机号码 
var act_phoneNumber = undefined;	

var SERVER_ADDRESS = "http://m.jujinziben.com";
//获取分享数据
function shareData(){
	$.ajax({
		dataType:"json",
		"url": SERVER_ADDRESS + "/WeiXinServer/ShareServlet?url=" +  encodeURIComponent(location.href),
        //"dataType":"jsonp",
		success: function(response){								
			Share(response);
		},
		error: function(xhr, type){
			console.log(xhr);
		}
	});
}
//获取url参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function loadData(){
	$.ajax({
		//url: "data/result.json",
		dataType:"json",
		//"url":"http://139.129.165.16:8082/api/userhistory?user_id=4AE1D1B6816049B1",
		//"url":"http://114.215.100.75/api/userhistory",
		"url": SERVER_ADDRESS + "/api/userhistory?user_id="+getQueryString("user_id"),
        //"dataType":"jsonp",
		success: function(response){					
			//状态
			var status = response.status,
			//活动数据
				entity = response.entity;
			if (!status || typeof(response) != 'object') {
		        if (response.msg == "请登录") {		        	
		            window.location.href = SERVER_ADDRESS + "/m/jujin/#/login?fromUrl="+window.location.href;//直接登录页面
		            return;
		        }
		    }	
		    $(".mask-gobal").css('display','none');		
			if(entity){
				//注册时间
				var registerDate = entity.registerDate,
					//截止日期
					currentDate = entity.currentDate,
					//首次投资收益
					firstInterest = entity.firstInterest,
					//首次签到时间
					firstSignDate = entity.firstSignDate,
					//首次邀请时间
					firstInviteDate = entity.firstInviteDate,
					//首次邀请的人
					firstInviteUser = entity.firstInviteUser,					
					//聚金理财的多少天
					stayDays = entity.stayDays,
					//总投资
					totalInvest = entity.totalInvest,
					//总收益
					totalInterest = entity.totalInterest,
					//错失收益
					missMoney = entity.missMoney,
					//称号
					titleFlag = entity.titleFlag;
				//手机号码
				act_phoneNumber = entity.phoneNumber;
				//赚钱能力
				earningFlag = entity.earningFlag;
				//首次投资时间
				firstTenderDate = entity.firstTenderDate;
				//邀请总人数
				inviteUserCount = entity.inviteUserCount;
				//被邀请人的总收益
				inviteInterest = entity.inviteInterest;
				//通过邀请获得的收益
				rewardInterest = entity.rewardInterest;
				//截止日期
				$("#dateline").text(currentDate);
				$("#registerDate").text(registerDate);
				$("#firstTenderDate").text(firstTenderDate);
				$("#firstInterest").text(firstInterest+"元");
				//有签到
				if(firstSignDate){
					$("#firstSignDate").text(firstSignDate);
					$("#hasSigned").show();
				}else{
					$("#noSigned").show();
				}	
				//有邀请过人
				if(inviteUserCount > 0){
					$("#hasInvited").show();
					$("#firstInviteDate").text(firstInviteDate);
					$("#firstInviteUser").text(firstInviteUser);
					$("#inviteUserCount").text(inviteUserCount);
					$("#inviteUserCount2").text(inviteUserCount+"人");
					$("#inviteInterest").text(inviteInterest);
					$("#rewardInterest").text(rewardInterest);
					if(inviteInterest >= 10000){
						inviteInterest = (inviteInterest/10000).toFixed(2);
						$("#inviteInterest2").text(inviteInterest+"万元");
					}else{
						$("#inviteInterest2").text(inviteInterest+"元");
					}	
					if(rewardInterest >= 10000){
						rewardInterest = (rewardInterest/10000).toFixed(2);
						$("#rewardInterest2").text(rewardInterest+"万元");
					}else{
						$("#rewardInterest2").text(rewardInterest+"元");
					}
					if(inviteUserCount > 0){
						$("#inviteUserCount2").show();
					}
					if(inviteInterest > 0){
						$("#inviteInterest2").show();
					}
					if(rewardInterest > 0){
						$("#rewardInterest2").show();
					}										
				}else{
					$("#noInvited").show();
				}				
				$("#stayDays").text(stayDays+"天");
				$("#totalInvest").text(totalInvest);
				$(".totalInterest").text(totalInterest);
				if(missMoney > 0){
					$("#missMoney").text(missMoney);
				}else{
					$("#missMoney").parent().parent().hide();
				}
				
				var personalTitleMap = {
					0:"聚金财子",
					1:"聚金财主",
					2:"聚金土豪",
					3:"聚金大神"
				},
				personalDescMap = {
					0:"小试牛刀，钱力无穷",
					1:"稳中求进，日进多金",
					2:"能谋善断，富而无骄",
					3:"运筹帷幄，富可通神"
				}
				$("#personalTitle").text(personalTitleMap[titleFlag]);
				$("#personalDesc").text(personalDescMap[titleFlag]);
				$("#perTitleIcon").addClass("omg"+titleFlag);
				$("#earningTitle").addClass("earning-eit"+earningFlag);
			}
			shareData();
		},
		error: function(xhr, type){
			$(".mask-gobal").css('display','none');
			console.log(xhr);
		}
	});
}
//立即分享按钮
function shareNow(){
	if ($("#masking").length > 0) {
        $("#masking").css('display', 'block');
        $scope.div_show = true;
    } else {
        var masking = document.createElement("div");
        masking.className = "masking-02";
        masking.style.display = "block";
        masking.id = "masking";

        var f_img = document.createElement("div");
        f_img.className = "f-img00";
        masking.appendChild(f_img);
        $(document.body).append(masking);

        $(masking).click(function() {
            $("#masking").css('display', 'none');
        });
    }
}
var earningMap = {
	0:"不忽悠的雷布斯",
	1:"国民老公王思聪",
	2:"钢铁侠马斯克",
	3:"Facebook小扎",
	4:"孙俪凉凉",
	5:"女神范冰冰",
	6:"格力董小姐",
	7:"人生赢家赵薇"
}
//分享成功
function successShare(){
	//分享成功接口
	var shareSuccessNotifyUrl = "";
    if (act_phoneNumber != undefined && act_phoneNumber != "") {
        shareSuccessNotifyUrl = SERVER_ADDRESS + "/api/shareactivity?phone_number="+act_phoneNumber;
    }
	$.ajax({
		dataType:"json",
		"url": shareSuccessNotifyUrl,
		success: function(response){									
		},
		error: function(xhr, type){
			console.log(xhr);
		}
	});
}
//分享朋友圈
function Share(data) {
    wx.config({
        debug: false,
        appId: "wx30235c7115ff82d5",
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
    });
    
    wx.ready(function() {
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: '聚金两周年，一起晒账单。学会理财，不经意间就赚了这么多。', // 分享标题
            desc: '我在聚金资本理财后，未来赚钱能力比肩'+earningMap[earningFlag]+'，快来看看你的吧', // 分享描述
            link: SERVER_ADDRESS + "/m/twoyear/twoyear.html",
            imgUrl: SERVER_ADDRESS + '/m/twoyear/img/share.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function(res) {
                successShare();
            },
        });
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: '聚金两周年，一起晒账单。学会理财，不经意间就赚了这么多。', // 分享标题
            desc: '我在聚金资本理财后，未来赚钱能力比肩'+earningMap[earningFlag]+'，快来看看你的吧', // 分享描述
            link: SERVER_ADDRESS + "/m/twoyear/twoyear.html",
            imgUrl: SERVER_ADDRESS + '/m/twoyear/img/share.png', // 分享图标
            success: function(res) {
                successShare();
            },
        });
    });
}
//获取数据
loadData();
