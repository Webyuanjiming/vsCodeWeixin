//首次投资时间
var firstTenderDate = undefined,
//邀请总人数
inviteUserCount = 0,
//被邀请人的总收益
inviteInterest = 0,
//通过邀请获得的收益
rewardInterest = 0;
function loadData(){
	$.ajax({
		//url: "data/result.json",
		//dataType:"json",
		//"url":"http://139.129.165.16:8082/api/userhistory?user_id=4AE1D1B6816049B1",
		"url":"http://114.215.100.75/api/userhistory?user_id=4AE1D1B6816049B1",
        "dataType":"jsonp",
		success: function(data){
			$(".mask-gobal").css('display','none');
			var status = data.status;
			var entity = data.entity;
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
					titleFlag = entity.titleFlag,
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

		},
		error: function(xhr, type){
			$(".mask-gobal").css('display','none');
			console.log(xhr);
		}
	});
}
loadData();