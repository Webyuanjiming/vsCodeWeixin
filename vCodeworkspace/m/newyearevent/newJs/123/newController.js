/*@Create by w8 on 2017/01/11@*/
/*@author:Web -YuanjiMing-@*
 * @ js control is here!@*
 * @ jquery is license;@*
 * */
var app = angular.module('myApp', ['ngRoute']);
function GetQueryString(phone) {
    var reg = new RegExp("(^|&)" + phone + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}
/**/
var url = "/";
var light;
app.controller('newControllerCtrl', ["$http", "$rootScope", "$scope", "$location",
    function ($http, $rootScope, $scope, $location) {
        //点亮的数据
        $scope.newLight = function () {
            var lightUrl = url + "api/newyear/light?light=";
            $http.get(lightUrl + 'false').success(
                function (data) {
                    if (data.status == true && data.loginstatus == 1) {
                        //点亮的文字
                        $scope.lightResult = data.entity.result;
                        //取所有值
                        var temp = "";
                        for (var i in $scope.lightResult) {
                            temp += $scope.lightResult[i] + ",";
                            if ($scope.lightResult[i] == null && $scope.lightResult[i] == undefined) {
                                $scope.lightResult[i] = 0;
                            }
                        }
                        //分割获取最小值
                        temp = temp.split(",").slice(0, 6);
                        //Math.min.apply(null,temp)最小值
                        $scope.minEp = Math.min.apply(null, temp);
                        $scope.userId = data.entity.userId;
                    }else {
                        var lightResult={
                            L1:0,
                            L2:0,
                            L3:0,
                            L4:0,
                            L5:0,
                            L6:0
                        }
                         $scope.lightResult=lightResult;
                        if(data.loginstatus == 1){
                             alert("错误信息:" + data.msg);
                        }
                    }
                }
            );
            $scope.page();
        }
        var page = 1;
        var size = 4;//一页多少个
        $scope.page = function () {
            /***好友祝福***/
            var friendsUrl = url + "api/newyear/friendhelpinfo?size=" + size + "&page=" + page;
            $http.get(friendsUrl).success(
                function (data) {
                    if (data.status == true && data.loginstatus == 1) {
                        $scope.more = true;
                        if ($scope.info) {
                            //合并分页数据
                            $scope.info = $scope.info.concat(data.entity.result);
                            for (var f = 0; f < $scope.info.length; f++) {
                                if ($scope.info[f].AVATAR == "testavatar") {
                                    $scope.info[f].AVATAR = 'http://www.jujinziben.com/web/cn/images/tx.gif';
                                }
                            }
                            if (data.entity.more == false) {
                                $scope.more = false;
                            } else {
                                $scope.more = true;
                            }
                        } else {
                            $scope.info = data.entity.result;
                            for (var f = 0; f < $scope.info.length; f++) {
                                if ($scope.info[f].AVATAR == "testavatar") {
                                    $scope.info[f].AVATAR = 'http://www.jujinziben.com/web/cn/images/tx.gif';
                                }
                            }
                        }
                    } else {
                        if(data.loginstatus == 1){
                            alert("错误信息:" + data.msg);
                        }
                    }
                }
            );
        }
        //点击更多
        $scope.tomMore = function () {
            page = page + 1;
            $scope.page();
        }
        //点亮图片
        $scope.lighten = function () {
            var lightenUrl = url + "api/newyear/light?light=";
            $http.get(lightenUrl + 'true').success(
                function (data) {
                    if (data.status == true && data.loginstatus == 1) {
                        $scope.luckMsg = data.entity.result;
                        $scope.luck = data.entity.luck;
                        $scope.drop = true;
                        $scope.card = true;
                        $scope.drpBox = false;
                        if ($scope.drop == true && $scope.card == true) {
                            $scope.drpBox = true;
                        }
                    } else {
                        if(data.loginstatus == 1){
                            alert("错误信息:" + data.msg);
                        }else{
                            window.location.href="/m/jujin/#/login";
                        }
                    }
                }
            );
        }
        $scope.ckCard = function () {
            $scope.drop = false;
            $scope.card = false;
            $scope.drpBox = false;
            $scope.lightResult = $scope.luckMsg;
        }
        $scope.newLight();
        /**摇笑话**/
        $scope.closeJoke = function () {
            $scope.jokTxt = false;
            $scope.drpBox = false;
            $scope.drop = false;
        }
        /**一次抽奖机会**/
        $scope.chanceClick = function () {
            $scope.chance = false;
            $scope.drpBox = false;
            $scope.drop = false;
        }
        /**跳转欢乐抽大奖**/
        $scope.tEvent = function () {
            window.location.href = "/m/newyearevent/shake.html";
        }
        
        var jokeUrl = url + "api/newyear/joke";
        $scope.shakeJoke = function () {
            if($scope.jokeList==undefined||$scope.jokeList==null||$scope.jokeList.length==0){
                $http.get(jokeUrl).success(
                    function (data) {
                        if (data.status == true && data.loginstatus == 1) {
                            if (data.entity.awardStatus == false) {
                                $scope.jokeList = data.entity.list;
                                $scope.jokeTxt = $scope.jokeList.pop();
                                $scope.jokTxt = true;
                                $scope.drpBox = true;
                                $scope.drop = true;
                            } else if (data.entity.awardStatus == true) {
                                $scope.chance = true;
                                $scope.drpBox = true;
                                $scope.drop = true;
                            }
                        } else {
                            window.location.href="/m/jujin/#/login";
                        }
                    }
                );
            }else if($scope.jokeList.length>0){
                $scope.jokeTxt = $scope.jokeList.pop();
                $scope.jokTxt = true;
                $scope.drpBox = true;
                $scope.drop = true;
            }
    }
        $scope.newShake = function () {
            if(window.DeviceMotionEvent) {
                var lastAcc;    // 用来存储上一次的deviceorientation事件
                var speed =50;    // 用来判定的加速度阈值，太大了则很难触发
                var x, y, z, lastX, lastY, lastZ;
                x = y = z = lastX = lastY = lastZ = 0;
                window.addEventListener('devicemotion', function(event){

                    var acceleration = event.accelerationIncludingGravity;
                    x = acceleration.x;
                    y = acceleration.y;
                    if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
                        lastX = x;
                        lastY = y;
                        lastAcc = event;
                        $scope.shakeJoke();
                    }
                    lastX = x;
                    lastY = y;
                    lastAcc = event;
                }, true);
            }
        }
        $scope.newShake();
    }]);
app.controller('shakeCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.drpBox = false;
    $scope.drop = false;
    $scope.awardRecords = false;
    $scope.jokTxt = false;
    $scope.options = false;
    $scope.coupon = false;
    $scope.backpack = false;

    /**-点击关闭-**/
    $scope.closeJoke = function () {
        $scope.drpBox = false;
        $scope.drop = false;
        $scope.jokTxt = false;
        $scope.shakMoney();
    }
    $scope.couponClick = function () {
        $scope.drpBox = false;
        $scope.drop = false;
        $scope.coupon = false;
        $scope.shakMoney();
    }
    $scope.pack = function () {
        $scope.drpBox = false;
        $scope.drop = false;
        $scope.backpack = false;
        $scope.shakMoney();
    }
    $scope.optionsClick = function () {
        $scope.drpBox = false;
        $scope.drop = false;
        $scope.options = false;
        $scope.shakMoney();
    }
    /**--点击抵现红包--**/
    $scope.selectOne = function () {
        var optional = 1;
        var opawardUrl = url + "api/newyear/opaward";
        $http.post(opawardUrl + "?code=" + $scope.awardCode + "&optional=" + optional).success(
            function (data) {
                $scope.optionsClick();
            }
        );
    }
    /**--点击微信红包--**/
    $scope.selectTwo = function () {
        var optional = 2;
        var opawardUrl = url + "api/newyear/opaward";
        $http.post(opawardUrl + "?code=" + $scope.awardCode + "&optional=" + optional).success(
            function (data) {
                $scope.optionsClick();
            }
        );
    }
    /**摇一摇老虎机**/
    var u = 115;
    var tiggerUrl = url + "api/newyear/draw";
    $scope.shake = function () {
        $http.get(tiggerUrl).success(
            function (data) {
                if (data.status == true && data.loginstatus == 1) {
                    var enCode = data.entity;
                    var code = parseInt(enCode.awardCode);
                    $scope.awardMsg = data.entity.awardMsg;
                    $scope.awardCode = data.entity.awardCode;
                    $scope.optional = data.entity.optional;
                    $(".rol").css('backgroundPositionY', 0);
                    switch (code) {
                        case 1:
                            if ($scope.optional == true) {
                                $scope.options = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                            } else if ($scope.optional == false) {
                                $scope.options = false;
                                $scope.jokTxt = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                            }
                            break;
                        case 10:
                            if ($scope.optional == true) {
                                $scope.options = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                            } else if ($scope.optional == false) {
                                $scope.options = false;
                                $scope.jokTxt = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                            }
                            break;
                        case 11:
                            if ($scope.optional == true) {
                                $scope.options = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                            } else if ($scope.optional == false) {
                                $scope.jokTxt = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                                $scope.options = false;
                            }
                            break;
                        case 12:
                            if ($scope.optional == false) {
                                $scope.options = false;
                                $scope.backpack = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                                $scope.jokTxt=false;
                            }
                            break;
                        case 13:
                            if ($scope.optional == false) {
                                $scope.options = false;
                                $scope.coupon = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                                $scope.jokTxt=false;
                                $scope.backpack = false;
                            }
                            break;
                        case 14:
                            if ($scope.optional == false) {
                                $scope.options = false;
                                $scope.coupon = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                                $scope.jokTxt=false;
                                $scope.backpack = false;
                            }
                            break;
                        case 15:
                            if ($scope.optional == false) {
                                $scope.options = false;
                                $scope.coupon = true;
                                $scope.backpack = false;
                                $scope.drop = true;
                                $scope.drpBox = true;
                                $scope.jokTxt=false;
                            }
                            break;
                        case 16:
                            if ($scope.optional == false) {
                                $scope.options = false;
                                $scope.jokTxt=false;
                                $scope.backpack = true;
                                $scope.drop = true;
                                $scope.drpBox = true;
                            }
                            break;
                    }
                }else{
                    if(data.loginstatus == 1){
                        alert("错误信息:" + data.msg);
                    }else{
                        window.location.href="/m/jujin/#/login";
                    }
                }
            }
        );
    }
    /**摇一摇**/
    $scope.shakMoney = function () {
        var skeUrl = url + "api/newyear/drawdata";
        $http.get(skeUrl).success(
            function (data) {
                if (data.status == true && data.loginstatus == 1) {
                    $scope.odd = data.entity.odd;
                    if ($scope.odd == null) {
                        $scope.odd = "0";
                    }
                    $scope.from = data.entity.from;
                    for (var f = 0; f < $scope.from.length; f++) {
                        if ($scope.from[f].type == "1") {
                            $scope.firtimes = $scope.from[f].times;
                            $scope.firRemarks = $scope.from[f].remark;
                        }
                        if ($scope.from[f].type == "2") {
                            $scope.retimes = $scope.from[f].times;
                        }
                        if ($scope.from[f].type == "3") {
                            $scope.cardtimes = $scope.from[f].times;
                        }
                        if ($scope.from[f].type == "4") {
                            $scope.sketimes = $scope.from[f].times;
                        }
                    }
                    var recordHtml = "";
                    var records = data.entity.record;
                    for (var i = 0, len = records.length; i < len; i++) {
                        recordHtml = recordHtml + '<tr><td>' + records[i].awardMsg + '</td><td>' + records[i].winDate + '</td></tr>';
                    }
                    $("#records").html(recordHtml);
                    $scope.records = function () {
                        $scope.awardRecords = true;
                        $scope.drpBox = true;
                        $scope.drop = true;
                    }
                } else {
                    $scope.odd = "0";
                    $scope.firtimes = "0";
                    $scope.firRemarks = "0";
                    $scope.retimes = "0";
                    $scope.cardtimes = "0";
                    $scope.sketimes = "0";
                    $scope.records = function () {
                        $scope.jokLogin = true;
                        $scope.drpBox = true;
                        $scope.drop = true;
                    }
                    if(data.loginstatus == 1){
                        alert("错误信息:" + data.msg);
                    }
                }
            }
        );
    }
    $scope.shakMoney();
    $scope.award = function () {
        $scope.awardRecords = false;
        $scope.drpBox = false;
        $scope.drop = false;
        $scope.shakMoney();
    }
    /**返回首页**/
    $scope.back = function () {
        window.location.href = "/m/newyearevent/newyearevent.html";
    }
    /**-手机感言摇一摇-**/
    $scope.newShake=function(){
        if(window.DeviceMotionEvent) {
            var lastAcc;    // 用来存储上一次的deviceorientation事件
            var speed =50;    // 用来判定的加速度阈值，太大了则很难触发
            var x, y, z, lastX, lastY, lastZ;
            x = y = z = lastX = lastY = lastZ = 0;
            window.addEventListener('devicemotion', function(event){

                var acceleration = event.accelerationIncludingGravity;
                x = acceleration.x;
                y = acceleration.y;
                if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
                    lastX = x;
                    lastY = y;
                    lastAcc = event;
                    $scope.shake();
                }
                lastX = x;
                lastY = y;
                lastAcc = event;
            }, true);
        }
    }
    $scope.newShake();
}]);

/**--帮他点亮--**/
app.controller('friendsCtrl', ["$http", "$rootScope", "$scope", "$location",
    function ($http, $rootScope, $scope, $location) {
        function GetQueryString(phone) {
            var reg = new RegExp("(^|&)" + phone + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        }
        $scope.drpBox=false;
        $scope.drop=false;
        var hasAccount;
        var openId;
        var fUrl=url+"api/newyear/friendlight?uuid="+ GetQueryString("UUID") + "&light="
        $scope.eventUrl=function(){
            $http.get(fUrl+'false').success(
                function(data){
                    if(data.status==true){
                        hasAccount=data.entity.hasAccount;
                        openId=data.entity.openId;
                        $scope.helpSult=data.entity.result;
                        //取所有值
                        var temp = "";
                        for (var i in $scope.helpSult) {
                            temp += $scope.helpSult[i] + ",";
                            if ($scope.helpSult[i] == null && $scope.helpSult[i] == undefined) {
                                $scope.helpSult[i] = 0;
                            }
                        }
                        //分割获取最小值
                        temp = temp.split(",").slice(0, 6);
                        //Math.min.apply(null,temp)最小值
                        $scope.minEp = Math.min.apply(null, temp);
                    }else{
                        alert("错误信息"+data.msg);
                    }
                }
            );
        }
        $scope.eventUrl();
        $scope.jokTxt=false;
        $scope.drop=false;
        $scope.drpBox=false;
        $scope.closeJoke=function(){
            $scope.jokTxt=false;
            $scope.drop=false;
            $scope.drpBox=false;
            $scope.helpSult=$scope.hrtResult;
        }
        $scope.helpHer=function(){
            $http.get(fUrl+'true').success(
                function(data){
                    if(data.status==true){
                        $scope.hrtResult=data.entity.result;
                        $scope.lkCode=data.entity.luck.code;
                        $scope.cont=data.entity.luck.content;
                        $scope.jokTxt=true;
                        $scope.drop=true;
                        $scope.drpBox=true;
                    }else{
                     alert("错误信息："+data.msg);
                    }
                }
            );
        }
        $scope.myEvent=function(){
            var herUrl=url+"api/loginfromwx?weiXinId="+openId;
            $http.post(herUrl).success(
                function(data){
                    if(!data.status){
                        return;
                    }
                    if(data.loginstatus==1){
                        window.location.href="/m/newyearevent/newyearevent.html";
                    }else{
                        window.location.href="/m/jujin/#/login";
                    }
                }
            );
        }
    }]);
//好友助力
app.directive('friendHelp', [function() {
    return {
        restrict: 'A',
        scope:{
            userid: "@"
        },
        controller: ["$scope",function($scope){
            //获取分享数据
            $scope.shareNewYearData = function(){
                $.ajax({
                    dataType:"json",
                    "url": "/WeiXinServer/ShareServlet?url=" + encodeURIComponent(location.href),
                    success: function(response){                                
                        ShareNewYear(response);
                    },
                    error: function(xhr, type){
                        console.log(xhr);
                    }
                });
            }
            function ShareNewYear(data) {
                var wxdata = {
                    title : '一大波高额红包来袭，聚金资本春节红包大放送',
                    imgUrl : 'https://m.jujinziben.com/m/newyearevent/newImg/share.png',
                    link : 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx30235c7115ff82d5&redirect_uri=http://m.jujinziben.com/WeiXinServer/luck&response_type=code&scope=snsapi_userinfo&state="'+$scope.userid+'"#wechat_redirect',
                    desc : '聚金资本红包集字令，邀请好友来助力，大家一起瓜分千元大红包'
                };
                wx.config({
                    debug: false,
                    appId: "wx30235c7115ff82d5",
                    timestamp: data.timestamp,
                    nonceStr: data.noncestr,
                    signature: data.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','hideMenuItems' ] // 功能列表，我们要使用JS-SDK的什么功能
                });

                wx.ready(function() {
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: wxdata.title, // 分享标题
                        desc: wxdata.desc, // 分享描述
                        link: wxdata.link,
                        imgUrl: wxdata.imgUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function(res) {
                            
                        },
                    });
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: wxdata.title, // 分享标题
                        desc: wxdata.desc, // 分享描述
                        link: wxdata.link,
                        imgUrl: wxdata.imgUrl, // 分享图标
                        success: function(res) {
                            
                        }
                    });
                    // 要隐藏的菜单项
                    wx.hideMenuItems({
                        menuList : [ "menuItem:share:qq", "menuItem:share:weiboApp",
                                "menuItem:share:facebook", "menuItem:share:QZone",
                                "menuItem:copyUrl", "menuItem:openWithQQBrowser",
                                "menuItem:openWithSafari", "menuItem:share:email",
                                "menuItem:share:brand"

                        ]
                    });
                });
            }
        }],
        link: function(scope, element, attrs) {
            //是否登录
            scope.$watch("userid",function(newVal,oldVal){
                if(newVal != undefined && newVal != ""){
                    //微信打开
                    if(browser.versions.weixin == true){
                        //分享初始化
                        scope.shareNewYearData();
                        element.off("click").on("click",function(){
                            if ($("#masking").length > 0) {
                                $("#masking").css('display', 'block');
                                $(window).scrollTop(0);
                                $('html,body').css({"overflow":"hidden"});
                                $(document).bind("touchmove",function(e){ 
                                    e.preventDefault(); 
                                });
                            } else {
                                var masking = document.createElement("div");
                                masking.className = "masking-02";
                                masking.style.display = "block";
                                masking.id = "masking";

                                var f_img = document.createElement("div");
                                f_img.className = "f-img00";
                                masking.appendChild(f_img);
                                $(document.body).append(masking);
                                $(window).scrollTop(0);
                                $('html,body').css({"overflow":"hidden"});
                                $(document).on("touchmove",function(e){ 
                                    e.preventDefault(); 
                                });
                                $(masking).click(function() {
                                    $("#masking").css('display', 'none');
                                    $('html,body').css({"overflow":""});
                                    $(document).off("touchmove");
                                });
                            }                    
                        });
                    // APP打开
                    }else if(GetQueryString("mobile") == "1"){
                        element.attr("href",'jsbridge://action?data={"action":"doCopy","url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx30235c7115ff82d5&redirect_uri=http://m.jujinziben.com/WeiXinServer/luck&response_type=code&scope=snsapi_userinfo&state='+newVal+'#wechat_redirect","flag":"可选","img": "https://m.jujinziben.com/m/newyearevent/newImg/share.png","title": "一大波高额红包来袭，聚金资本春节红包大放送","text": "聚金资本红包集字令，邀请好友来助力，大家一起瓜分千元大红包"}');
                    }else{
                        element.off("click").on("click",function(){
                            alert("该浏览器暂不支持分享到微信，请使用微信打开。"); 
                            return false;                 
                        }); 
                    }
                }else{
                    $(element).on("click",function(){
                        window.location.href="/m/jujin/#/login?returnUrl="+encodeURIComponent(location.href);                
                    });                    
                }
            });
       }
    }
}]);
