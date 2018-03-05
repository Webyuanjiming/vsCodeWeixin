var checkSubmitFlg = false;
var phoneNumber;
var userId;
var committees = [];
var percents = [];

var URL_ROOT = "http://m.jujinziben.com/api/vote"
var VOTERS = [];

var Request = {
    QueryString: function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    }
}


function initilizationList() {




    for (var i = 0; i < VOTERS.length; i++) {

        var voter = VOTERS[i]
        var img = voter.img;
        var no = voter.no;
        var name = voter.name;
        var pollNum = "";
        var userId = voter.userId;
        var time = voter.year;
        var location = voter.res;
        var index = i + 1;

        var href = "http://m.jujinziben.com/vote/voter.html?id=" + index;
        var click = "vote(" + voter.no + ")";


        if (isEmpty(userId)) {
            continue;
        }


        var template = $(" <li>" +
            "   <div class=\"ver-lio\">" +
            "       <div class=\"cr-hri\">" +
            "           <div class=\"vcr-tr0\">" +
            "               <img class=\"vr-img\" src=\"" + img + "\">" +
            "           </div>" +
            "           <p class=\"vcr-tr-p0\"><i style=\"font-style: normal;\">" + no + "号</i><i style=\"font-style: normal;\">" + name + "</i></p>" +
            "           <p class=\"vcr-tr-p0\"><i id=\"pollNum" + index + "\" style=\"color: #ff0000;font-style: normal;\">" + pollNum + "</i><span style=\"color: #000000;\">票</span></p>" +
            "       </div>" +
            "       <div class=\"vcr-li-r\">" +
            "           <p class=\"vr01\">聚金资本ID:" + userId + "</p>" +
            "           <p class=\"vr02\">网贷投资年限:" + time + "</p>" +
            "           <p class=\"vr03\">居住地：" + location + "</p>" +
            "           <p class=\"vr04\"><a href=\"" + href + "\">详情&gt;&gt;</a></p>" +
            "           <div class=\"vcr-li-btn\">" +
            "               <button type=\"button\" onclick=\"" + click + "\" class=\"btn-vcr\">" +
            "                   投Ta一票" +
            "               </button>" +
            "           </div>" +
            "       </div>" +
            "   </div>" +
            "</li>");
        template.appendTo($("#container"));
        $("#barName" + i).text(name);
    }
    var color1 = ["#d35400;", "#2980b9;", "#2c3e50;", "#46465e;", "#333333;", "#27ae60;", "#d35400;", "#2980b9;", "#124e8c;", "#DF6060;", "#DF8F60;", "#DFB760;", "#124e8c;", "#46465e;", "#DF607A;", "#DF60A7;"];
    var color2 = ["#e67e22;", "#3498db;", "#2c3e50;", "#5a68a5;", "#525252;", "#2ecc71;", "#e67e22;", "#3498db;", "#4288d0;", "#D15D5D;", "#D88658;", "#D8AA4B;", "#4288d0;", "#5a68a5;", "#DB506C;", "#DB509D;"];

    for (var i = 0; i < VOTERS.length; i++) {
        var index = i + 1;
        var voter = VOTERS[i]
        var name = voter.name;

        var template = $("<div id=\"percent" + index + "\" class=\"skillbar clearfix \" data-percent=\"20%\">" +
            "<div class=\"skillbar-title\" style=\"background:" + color1[i] + "\"><p id=\"barName" + index + "\">" + name + "</p></div>" +
            "<div id=\"pollDiv" + index + "\" class=\"skillbar-bar\"   style=\"background:" + color2[i] + "\"></div>" +
            "<div id=\"dataPollNum" + index + "\" class=\"skill-bar-percent\">20%</div>" +
            "</div> <!-- End Skill Bar -->");


        var voter = VOTERS[i];
        var userId = voter.userId;


        if (isEmpty(userId)) {
            continue;
        }

        if (i <= 7) {
            template.appendTo($("#barcontainer1"));
        } else {
            template.appendTo($("#barcontainer2"));
        }

    }



}

function initilization() {
    var userIds = ["an***ia", "ai***88", "fa***ho", "13***86", "fo***03", "nb***kf", "sz***69", "13***08", "13***78", "Ji***an", "15***95_", "xy***88", "徐***涛", "Xx***02", "sz***br", "li***ao"];
    var nums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
    var names = ["安先生", "胡先生", "胡先生", "李女士", "李先生", "牛先生", "宋先生", "谭女士", "唐先生", "王先生", "王女士", "武先生", "徐先生", "许先生", "张女士", "朱先生"]; //姓名
    var genders = ["男", "男", "男", "女", "男", "男", "男", "女", "男", "男", "女", "男", "男", "男", "女", "男"]; //性别
    var tels = ["13803410682", "18106595499", "13567344023", "13673350986", "17703032581", "13803784956", "18993005839", "13528405608", "1352362778", "18623993331", "15290770595", "18039663172", "13705486446", "13952661190", "13724323965", "18108079877"]; //电话
    var zhiye = ["经商", "数据分析", "贸易经理", "保险代理人", "自由职业", "国企退休", "金融监管", "退休", "高校教师", "高中教师", "教师", "财务", "体育教师", "教师", "销售课长", "建筑行业初级工程师"]; //职业
    var res = ["山西省 太原市", "杭州市滨江区", "浙江省海宁市", "河南省郑州市", "广东省鹤山市", "河南省开封市", "甘肃省临夏市", "深圳市", "河南省南阳市", "河南省南阳市", "河南省平顶山", "郑州", "山东省泰安市宁阳县", "江苏省泰州市泰兴市", "深圳市宝安区", "四川成都"]; //居住地
    var years = ["2年", "5年", "3年", "2年", "3年", "2年", "3年", "1年", "3个月", "2年", "1年", "2年", "2年", "2.5年", "1年", "1年"]; //年限

    var memos = [
        "我的网贷之路到今日已经接近二年的时间了，目前我仍在投的平台有数十家。P2P平台历经了从高息到低息，从不规范到规范，从无监管到监管的发展道路！投资人在投资过程中对投资收益、风险意识、投机心理把握和选择也成长起来！聚金资本发展也是经历了风雨洗礼才有今天的发展，2016年对平台和聚粉是一个考验长！",
        "投资学习，投资做人，投资理财。今天的投资为了明天的美好生活，不求大富大贵，只求稳中有道。君子爱财，取之有道，用之不竭。",
        "无论个人还是平台，投资的安全在于消灭利欲心魔，而聚金恰恰就是其中的翘楚。",
        "当今时代，金融理念越来越强，但是银行不断降息，股市跌宕起伏，在这种情况下，聚金资本给投资者提供了一个安全、公开的平台，愿其可以继续健康、平稳的发展！",
        "投资需要自身知识不断的提高和对外界各方面消息的判断，很多人喜欢选择大品牌，而我选择透明、可信的聚金平台。在此也希望能成为监督委员会一员，监督平台的工作，见证平台的发展。",
        "不善言辞善聚金",
        "投资平台关键要看风控，资金必须要第三方托管，不能光看收益率。否则，你看的是他的高收益，他要的是你的本金。聚金资本，我看好你们",
        "在聚金资本平台投资半年多了，感觉还是挺靠谱的平台，聚金是家做实事的公司，标的都是真实可信的，而且还能够从各方面为投资者着想。希望聚金资本能够一直坚持安全、稳健、持续的方针办下去。",
        "累！选的累！难！找的难。喜欢手里有一堆可选安全平台可以合理组合搭配的安心感觉，于是就只能受累作难了！认识的越深越感觉步履艰难，前路漫漫啊！理性投资人，查标践行者。善总结和思考，一直在学习和提高。对网贷有疑问可以咨询我，应该大多可以解答。用勤奋、智慧和实践来保本争息！",
        "我在聚金的投资从观望到行动，从少到多，从短期到长期。聚金给我的是信任和踏实，我也带动了一些朋友共赴聚金。我相信我的选择没有错，聚金也没有辜负我们的期望。",
        "自从学了理财，减肥效果特别好。哎！我的零食呢？",
        "自2014年6月下旬聚金资本P2P上线之日起就抱着试一试的心态投了一点钱，没想到就此和聚金结下了缘分，一两年了，基本上从未间断过投资，当然也从中获得了稳定而可观的收益。可能是因为楼上楼下的关系吧，我得以经常有机会上去和聚金的几位领导及客服聊聊当前的P2P行业前景和聚金的发展，每每发现聚金是认真做事且能做好事，这点让我对聚金的未来发展也越来越充满了信心，作为投资人之一，当然很希望聚金资本在陈总的带领下有着更加稳健健康的发展，聚金更好，投资人才会更好！",
        "p2p需要有专业的金融知识跟丰富的经验才能够运营好的金融平台，其重要特征就是项目和资金的高度匹配、透明 ，理想的投资，应该是在保住本金的前提下持续稳定的增值，不能只看到高额回报率。我们平台的每项投资都很清楚，让投资人得到大收益并且把风险降到最低。",
        "我的投资理念主要有两点：1、分散投资，降低风险；2、分辨信息，抵制诱惑。对于网贷，我认为前景广阔；面对风险，我坚持全面了解信息，仔细判断。",
        "当初经朋友介绍，一种试试看的心态，加入聚金资本理财投资，经过一年投资历程，聚金资本是 一个可以让客户信任、良性发展的平台，目前P2P平台很多，由于国家监管力度不够，网络上经常报道一些P2P资金出问题。然而，聚金资本能让客户监督，这个设想很好，望能有幸加入监委会",
        "虽然网贷投资时间不长，也看见了很多跑路平台，负面评价很多，但是我还是相信网贷存在的价值和意义，这是一个能多赢的行业，能帮投资人赚取较高的收益，也为需要资金的人提供机会和平台。希望平台能合理控制风险，保持着较高收益，信息更加公开透明，让越来越多的投资者放心的投标"
    ]; //感言

    var heads = [
        "an@rui.png",
        "hu@di.png",
        "hu@tiekai.png",
        "li@na.png",
        "li@zuoxun.png",
        "zhu@biansheng.png",
        "song@zongzhu.png",
        "tan@aihua.png",
        "tang@bing.png",
        "wang@dejun.png",
        "wang@yanhong.png",
        "wu@zijun.png",
        "xu@tao.png",
        "xu@xuliang.png",
        "zhang@baorui.png",
        "zhu@kang.png"
    ]; //头像


    for (var i = 0; i <= 16; i++) {
        var voter = {
            "userId": userIds[i],
            "no": nums[i],
            "name": names[i],
            "gender": genders[i],
            "tel": tels[i],
            "zhiye": zhiye[i],
            "res": res[i],
            "year": years[i],
            "memo": "        " + memos[i],
            "img": "/images/" + heads[i]
        };
        VOTERS.push(voter);
    }
}

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

function makeUrl(serviceName, pi, ps) {

    var url = URL_ROOT + serviceName;

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
        函数名：dataRange
        参数：
            url:
        说明：数据排序
        **/
function dataRange() {
    var max = 0;

    for (var index = 1; index <= 16; index++) {

        $("#dataPollNum" + index).text(committees["pollNum" + index]);
        $("#pollNum" + index).text(committees["pollNum" + index]);
        $("#percent" + index).attr("data-percent", percents["percent" + index] + "%");

    }


    for (var index = 1; index <= 16; index++) {

        var voteNum = committees["pollNum" + index];
        if (voteNum > max) {
            max = voteNum;
        }
    }
    for (var index = 1; index <= 16; index++) {

        if (max > 0) {
            percents["percent" + index] = (committees["pollNum" + index] / max * 100).toFixed(2);
        }
    }
    for (var index = 1; index <= 16; index++) {
        $("#pollDiv" + index).animate({
            height: 0
        }, 1000);
        $("#pollDiv" + index).animate({
            height: percents["percent" + index] + "%"
        }, 2000);
    }
}

/**
    函数名：login
    参数：
            url:
    说明:输入手机号
**/
function login() {
    if ($("#txtPhone").val().length == 11) {
        window.localStorage.setItem("phoneNumber", $("#txtPhone").val());
        //TODO:手机号检查
        $("#dialog").css("display", "none");
    }
}

/**
    函数名：closeDialog
    参数：
            url:
    说明: 
**/
closeDialog = function() {
    $("#dialog").css("display", "none");
}



function initList() {

    GetAction(makeUrl("/list"), function(response) {

        for (var index = 1; index <= 16; index++) {

            if (!isEmpty(response.list[index - 1])) {
                var voteNum = response.list[index - 1].pollNum;
                committees["pollNum" + response.list[index - 1].cid] = voteNum;
            }
        }
        initilizationList();
        dataRange();
    });
}


function register() {
    window.location.href = "http://m.jujinziben.com/m/jujin/#/register";
}


function vote(id) {


    var type = 0;
    if (isEmpty(id)) {
        id = Request.QueryString("id");
        type = 1;
    }


    if (isEmpty(userId) && isEmpty(phoneNumber)) {
        phoneNumber = window.localStorage.getItem("phoneNumber");
        if (isEmpty(phoneNumber)) {
            $("#dialog").css("display", "block");
            return;
        }
    }

    var params = "";

    if (!isEmpty(userId)) {
        params = "userId=" + userId;
    }
    if (!isEmpty(phoneNumber)) {
        if (params.length > 1) {
            params += "&mobile=" + phoneNumber;
        } else {
            params += "mobile=" + phoneNumber;
        }
    }
    params += "&cid=" + id;


    GetAction(makeUrl("/vote?" + params), function(response) {

        var msg = "";
        if (!response.status) {
            msg = response.msg;
        } else {
            msg = "投票成功:当前票数 [" + response.msg + "] 票";
            if (type == 0) {
                committees["pollNum" + id] = parseInt(response.msg);
            } else {
                $("#pullNum").text(parseInt(response.msg));
            }

        }
        if (type == 0) {
            dataRange();
        }
        window.alert(msg);
    });
}

function initVoter() {
    var id = Request.QueryString("id");
    if (id > 16 || id < 1) {
        return;
    }
    var voter = VOTERS[id-1];

    GetAction(makeUrl("/info?cid=" + id), function(response) {

        var msg = "";
        if (!response.status || response.list.length < 1) {
            voter.pollNum = 0;
        } else {
            voter.pollNum = response.list[0].pollNum;
        }


        $("#img").attr("src", voter.img);
        $("#no").text(voter.no + "号");
        //$("#txtName").text("姓名："+voter.name);
        $("#name").text("姓名：" + voter.name);
        $("#gender").text("性别：" + voter.gender);
        //$("#tel").text("手机号："+voter.tel);
        $("#zhiye").text("职业：" + voter.zhiye);
        $("#res").text("居住地：" + voter.res);
        $("#year").text("网贷投资时间：" + voter.year);
        $("#memo").text(voter.memo);
        $("#pullNum").text(voter.pollNum);

    });
}


function wechatshare() {

    var url = "http://m.jujinziben.com/WeiXinServer/ShareServlet?url=" + location.href;



    GetAction(url, function(data, status) {


        wx.config({
            debug: false,
            appId: 'wx30235c7115ff82d5',
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        });


        wx.ready(function() {

            wx.onMenuShareAppMessage({
                title: '聚金资本投资人监督委员会邀你来投票', // 分享标题
                desc: '聚金资本投资人监督委员会邀你来投票', // 分享描述
                link: location.href,
                imgUrl: 'http://m.jujinziben.com/images/touweihui.png', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: function(res) {
                    console.log(res);
                }
            });

            // 获取“分享朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: '聚金资本投资人监督委员会邀你来投票',
                desc: '聚金资本投资人监督委员会邀你来投票',
                link: location.href,
                imgUrl: 'http://m.jujinziben.com/images/touweihui.png',
                success: function(res) {
                    console.log(res);
                }
            });

        });







    });
}
