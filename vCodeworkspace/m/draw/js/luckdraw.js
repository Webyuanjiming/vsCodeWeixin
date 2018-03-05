var checkSubmitFlg = false;

var SERVER="http://m.jujinziben.com/";


function isEmpty(obj) {
    if (typeof (obj) == "undefined" || obj == null) {
        return true;
    }
    return false;
}


function luckDraw(data) {

	if(data.msg=="请登录")
	{
		window.location.href="http://m.jujinziben.com/m/jujin/#/login";
		return;
	}
    if (!data) {
        clearInterval(times);
        award(0, '您的抽奖次数已用完，感谢您的参与');
    } else if (!data.status) {
        clearInterval(times);
    } else {
        var code = data.entity.awardCode;
        switch (code) {
            case "1":
                clearInterval(times);
                award(22, '恭喜您抽中聚金币6元');
                break;
            case "2":
                clearInterval(times);
                award(112, '恭喜您抽中聚金币六十六元');
                break;
            case "4":
                clearInterval(times);
                award(337, '聚金券1%');
                break;
            case "6":
                clearInterval(times);
                award(247, '恭喜您抽中小米清新净化器');
                break;
            case "8":
                clearInterval(times);
                award(157, '恭喜您抽中联想G40-80笔记本');
                break;
            case "5":
                clearInterval(times);
                award(67, '恭喜您抽中小狗吸尘器');
                break;
            case "7":
                clearInterval(times);
                award(202, '恭喜您抽中苹果iPa mini');
                break;
            case "3":
                clearInterval(times);
                award(292, '恭喜您抽中0.5%聚金券');
                break;
            default:
                clearInterval(times);
                award(0, '您的抽奖次数已用完，聚金资本感谢您的参与');
        }
        LoadUserInfo();
    }
}

function luckDrawError() {
    clearInterval(times);
    award(0, '您的抽奖次数已用完，聚金资本感谢您的参与');
}

function ListHandler(data) {
   
    if (isEmpty(data) || isEmpty(data.entity) || !Array.isArray(data.entity) || data.entity < 1) {
        return;
    }

    var list = data.entity;

    if (isEmpty(list) || !Array.isArray(list) || list.length < 1) {
        return;
    }

    $('#listContainer').empty();
    var listItem = "";
    for (var i = 0; i < list.length; i++) {
        var item = list[i];

        var date = item.winDate.replace(/2015-12-18/, "");
        date = date.replace(/2015-01-09/, "");
        date = date.replace(/2015-12-19/, "");
        var liElement = "<li>";
        //console.log(item.nickName);
         liElement += "<div style=\"width: 33%;\">" + item.nickName + "</div><div style=\"width: 33%;\">" + item.awardName + "</div><div style=\"width: 33%;\">" + item.winDate+ "</div>";
         liElement += "</li>";


        /*var liElement = "<li>";
        liElement += "<em class=\"fistCol\">" + item.nickName + "</em><em class=\"secCol\">" + item.awardName + "</em>";
        liElement += "</li>";*/







        listItem += liElement;
    };

    $('#listContainer').append(listItem);
}

function ListHandlerError() {

}

var LoadUserInfoHandler = function(data) {
    if (isEmpty(data) || !data.status)
        return;
    var entity = data.entity;

    $("#labLeftDrawCount").text(entity.oddTimes);
};

var LoadUserInfoError = function() {};


var rotateFunc = function(text) {
    var $alter = $("<div style='width: 100%;'><div id=\"myModal\" onclick=\"Clean()\" style=\"z-index: 1;top:0px; background-color: rgba(93, 93, 95, 0.709804); width:640px; height: 100%; display: block; position: fixed; top: 0px;text-align: center; opacity: 0.9700000000000008;\">" +
        "<div style=\"background-color: #FDDDA4;position: absolute;top: 45%;left: 10%;width:80%;text-align: center;border-radius: 8px;-moz-border-radius: 8px;-webkit-border-radius: 8px;\">" +
        "<div  class=\"ub-img\" style=\"background-image:url('/luck/img/xxx.png');width: 2.0em;height: 2.0em;position: absolute;right: 0.5em;top: 0.3em;background-size: cover;\"></div>" +
        "<div style=\"text-align: center;color: #DF4C49;font-weight: bold; margin: 1.0em;line-height: 1.0em;\">" +
        "恭喜您获得" +
        "</div>" +
        "<div style=\"font-size: 1.5em;line-height: 1.2em;margin: 1.0em 0.8em;color:#DF4C49; \">" +
        text +
        "</div>" +
        "</div>" +
        "</div>"+
        "</div>"
    );

    $("#myModal").remove();
    $alter.appendTo($("#root"));
    //$("#myModal").reveal();
    checkSubmitFlg = false;
};

function Clean()
{
    $("#myModal").remove();
    $("#myModal").reveal();
}

var LoadList = function() {
    var url = SERVER+"api/luckdraw/scroll";
    GetAction(url, ListHandler, ListHandlerError);
};

//旋转函数
var round = function() {
    $("#lotteryBtn").rotate({
        angle: 0, //起始角度
        animateTo: 3600, //结束的角度
        duration: 20000, //转动时间
        callback: function() {

        } //回调函数
    });
};
var award = function(n, text) {

    $("#lotteryBtn").rotate({
        angle: 0, //起始角度
        animateTo: 3600 + parseInt(n), //结束的角度
        duration: 10000, //转动时间
        callback: function() {
            rotateFunc(text);
        }//回调函数
    });
};

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

function checkDoubleClick() {
    if (!checkSubmitFlg) {
        checkSubmitFlg = true;
        return true;
    } else {
        alert("请求已发出，请您稍等一下");
        return false;
    }
}

function LoadUserInfo() {
    var url =SERVER+"api/luckdraw/my";
    GetAction(url, LoadUserInfoHandler, LoadUserInfoError);
}