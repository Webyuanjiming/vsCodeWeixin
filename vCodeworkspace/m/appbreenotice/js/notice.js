
var URL_ROOT="http://m.jujinziben.com/api/activity";

function GetAction(url, handler, errorHandler) {
    $.ajax({
        url: url,
        type: "get",
        data: "",
        dataType: "json",
        error: function() {
            if (!isEmpty(errorHandler) && typeof(errorHandler) == 'function') {
                errorHandler();
            }
        },
        success: function(data) {
            if (!isEmpty(handler) && typeof(handler) == 'function') {
                handler(data);
            }
        }
    });
}
function sortRankNo(a,b)
{
	
	if(isNaN(parseInt(a.rankNo)))return false;
	if(isNaN(parseInt(b.rankNo)))return false;
	return parseInt(a.rankNo) - parseInt(b.rankNo);
}


function makeUrl(serviceName, pi, ps) {

    var url = URL_ROOT + serviceName;
    console.log(url);

    if (!isEmpty(pi)) {
        if (serviceName.indexOf("?") == -1) {
            url += "?pi=" + pi;
        } else {
            url += "&pi=" + pi;
        }

        if (!isEmpty(ps)) {
            url += "&ps=" + ps;
        } else {
            url += "&ps=" + config.PAGE_SIZE;
        }
    }
    return url;
}

/**
    函数名：新增投资送聚金币活动
    参数：
            url:
    说明: 
**/
function initilizationreward() {

    GetAction(makeUrl("/tenderreward"), function(response) {
        if (!isEmpty(response.list)) {

            $("#rewardContainer").empty();

            var limit= response.list.length>15?15:response.list.length;
			var array=response.list;
            for (var i = 0; i <limit; i++) {

                var entity=array[i];
                var name=entity.userId;
                var lastTenderTime=entity.lastTenderTime;
                var preRankNo=entity.preRankNo;
                var rankNo=entity.rankNo;
                var gender=entity.gender;
                var amount=entity.amount;
                var reward=entity.reward;
                lastTenderTime=lastTenderTime.replace('2016-','');

                var style="spn_y cxr0";
                if(rankNo<=preRankNo)
                {
                    style="spn_x cxr0";
                }

                var genderClass=gender=="男"?"spn_3":"spn_2";

                var template=$("<div class=\"lox_lis0\">"+
                    "<ul>"+
                    "    <li class=\"col_01\">"+
                    "        <span class=\"spn_0\">"+rankNo+".<em>"+name+"</em></span>"+
                    "        <span class=\""+style+"\">"+preRankNo+"</span>"+
                    "        <span class=\""+genderClass+"\"></span>"+
                    "    </li>"+
                    "    <li class=\"col_t cxr\">"+reward+"</li>"+
                    "    <li class=\"col_tr cyr\">"+lastTenderTime+"</li>"+
                    "</ul>"+
                    "</div>");

                template.appendTo($("#rewardContainer"));
            }
        }


    });
}

/**
    函数名：投资排名
    参数：
            url:
    说明: 
**/
function initilizationnum() {


     GetAction(makeUrl("/tendersort"), function(response) {
        if (!isEmpty(response.list)) {
            $("#sortContainer").empty();

            var limit= response.list.length>15?15:response.list.length;
			var array=response.list.sort(sortRankNo);
            for (var i = 0; i <limit; i++) {

                var entity=array[i];
                var name=entity.userId;
                var lastTenderTime=entity.lastTenderTime;
                var preRankNo=entity.preRankNo;
                var rankNo=entity.rankNo;
                var gender=entity.gender;
                var amount=entity.amount;
                var reward=entity.reward;

                lastTenderTime=lastTenderTime.replace('2016-','');

                var style="spn_y cxr0";
                if(rankNo<=preRankNo)
                {
                    style="spn_x cxr0";
                }

                var genderClass=gender=="男"?"spn_3":"spn_2";

				if(isEmpty(preRankNo))
				{
					preRankNo="NEW";
				}	
				
                var template=$("<div class=\"lox_lis0\">"+
                    "<ul>"+
                    "    <li class=\"col_01\">"+
                    "        <span class=\"spn_0\">"+rankNo+".<em>"+name+"</em></span>"+
                    "        <span class=\""+style+"\">"+preRankNo+"</span>"+
                    "        <span class=\""+genderClass+"\"></span>"+
                    "    </li>"+
                    "    <li class=\"col_t cxr\">"+amount+"</li>"+
                    "    <li class=\"col_tr cyr\">"+lastTenderTime+"</li>"+
                    "</ul>"+
                    "</div>");

                template.appendTo($("#sortContainer"));
            }
        }


    });

}

/**
    函数名：数据列表初始化
    参数：
            url:
    说明: 
**/
function initilization() {
    initilizationreward();
    initilizationnum();
}
