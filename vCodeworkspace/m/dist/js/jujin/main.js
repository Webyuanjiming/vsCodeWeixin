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
var SERVER_ADDRESS = "http://m.jujinziben.com";

function whomeData(){
	$.ajax({
		dataType:"json",
		"url": SERVER_ADDRESS + "/api/whome",
		success: function(response){								
			Share(response);
		},
		error: function(xhr, type){
			console.log(xhr);
		}
	});
}
function loadData(){
	$.ajax({
		dataType:"json",
		"url": SERVER_ADDRESS + "/api/userhistory",
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
					$(".firstInviteUser").text(firstInviteUser);
					$("#inviteUserCount").text(inviteUserCount);
					$("#inviteUserCount2").text(inviteUserCount+"人");
					$("#inviteInterest").text(inviteInterest);
					$("#rewardInterest").text(rewardInterest);
					$("#inviteInterest2").text(inviteInterest+"元");
					$("#rewardInterest2").text(rewardInterest+"元");
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
			//whomeData();
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
//Share2Year();
//分享朋友圈
function Share2Year($scope, $rootScope, $http) {
    if (isEmpty(wx)) return;
    var userUrl = $rootScope.ROOT;
    var shareUrl = $rootScope.ROOT;
    if (isEmpty($scope.entity)) {
        return;
    }
    if (!isEmpty($scope.phone)) {
        shareUrl = $rootScope.ROOT + '/#/register?invite=' + $scope.phone;
    }
    wx.config({
        debug: false,
        appId: "wx30235c7115ff82d5",
        timestamp: $scope.entity.timestamp,
        nonceStr: $scope.entity.noncestr,
        signature: $scope.entity.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
    });

    var shareSuccessNotifyUrl = "";
    if (!isEmpty($scope.userId)) {
        shareSuccessNotifyUrl = $rootScope.URL_ROOT + "/shareactivity?phone_number=" + $scope.phone;
    }

    wx.ready(function() {
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: '聚金两周年，一起晒账单。学会理财，不经意间就赚了这么多。', // 分享标题
            desc: '我在聚金资本理财后，未来赚钱能力比肩'+earningMap[earningFlag]+'，快来看看你的吧', // 分享描述
            link: shareUrl,
            imgUrl: $rootScope.SERVER + '/m/img/account/icon/account.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function(res) {
                if (!isEmpty(userId)) {
                    $http.get(shareSuccessNotifyUrl);
                }
            },
        });
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: '聚金两周年，一起晒账单。学会理财，不经意间就赚了这么多。', // 分享标题
            desc: '我在聚金资本理财后，未来赚钱能力比肩'+earningMap[earningFlag]+'，快来看看你的吧', // 分享描述
            link: $rootScope.SERVER + '/m/jujin',
            imgUrl: $rootScope.SERVER + '/m/img/account/icon/account.png', // 分享图标
            success: function(res) {
                if (!isEmpty(userId)) {
                    $http.get(shareSuccessNotifyUrl);
                }
            },
        });
    });
}
function Share(data) {
    wx.config({
        debug: false,
        appId: "wx30235c7115ff82d5",
        timestamp: data.entity.timestamp,
        nonceStr: data.entity.noncestr,
        signature: data.entity.signature,
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
                
            },
        });
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: '聚金两周年，一起晒账单。学会理财，不经意间就赚了这么多。', // 分享标题
            desc: '我在聚金资本理财后，未来赚钱能力比肩'+earningMap[earningFlag]+'，快来看看你的吧', // 分享描述
            link: SERVER_ADDRESS + "/m/twoyear/twoyear.html",
            imgUrl: SERVER_ADDRESS + '/m/twoyear/img/share.png', // 分享图标
            success: function(res) {
                
            },
        });
    });
}
//获取数据
loadData();
