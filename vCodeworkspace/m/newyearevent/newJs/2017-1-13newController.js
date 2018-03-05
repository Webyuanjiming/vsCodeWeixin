/*@Create by w8 on 2017/01/11@*/
/*@author:Web -YuanjiMing-@*
 * @ js control is here!@*
 * @ jquery is license;@*
 * */
var app = angular.module('myApp', ['ngRoute']);
/**/
var url = "http://192.168.0.216:9000/";
var light;
app.controller('newControllerCtrl', ["$http", "$rootScope", "$scope", "$location",
    function ($http, $rootScope, $scope, $location) {
        function GetQueryString(phone) {
            var reg = new RegExp("(^|&)" + phone + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        }

        //点亮的数据
        $scope.newLight = function () {
            var lightUrl = url + "api/newyear/light?userId=" + GetQueryString("userId") + "&light=";
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
                    } else {
                        alert("错误信息:" + data.msg);
                    }
                }
            );
            $scope.page();
        }
        var page = 1;
        var size = 4;//一页多少个
        $scope.page = function () {
            /***好友祝福***/
            var friendsUrl = url + "api/newyear/friendhelpinfo?userId=" + GetQueryString("userId") + "&size=" + size + "&page=" + page;
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
                        alert("错误信息:" + data.msg);
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
            var lightenUrl = url + "api/newyear/light?userId=" + GetQueryString("userId") + "&light=";
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
                        alert("错误信息："+data.msg);
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
        /***-关闭请登录页面-***/
        $scope.loin=function(){
            $scope.jokLogin=false;
            $scope.drpBox = false;
            $scope.drop = false;
        }
        /**跳转欢乐抽大奖**/
        $scope.tEvent = function () {
            window.location.href = "http://127.0.0.1:9000/m/newyearevent/shake.html";
        }
        /**好友助力**/
        $scope.help = function () {
            window.location.href = "http://127.0.0.1:9000/m/newyearevent/twoevent.html?UUID=1328b4e555444256bcfb1abe2e35ac8e";
        }
        $scope.shakeJoke = function () {
            var jokeUrl = url + "api/newyear/joke";
            $http.get(jokeUrl).success(
                function (data) {
                    if (data.status == true && data.loginstatus == 1) {
                        if (data.entity.awardStatus == false) {
                            $scope.jokeList = data.entity.list;
                            $scope.jokeTxt = data.entity.list.pop();
                            $scope.jokTxt = true;
                            $scope.drpBox = true;
                            $scope.drop = true;
                        } else if (data.entity.awardStatus == true) {
                            $scope.chance = true;
                            $scope.drpBox = true;
                            $scope.drop = true;
                        }
                    } else {
                        $scope.jokLogin=true;
                        $scope.drpBox = true;
                        $scope.drop = true;
                    }
                }
            );
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
    /***-关闭请登录页面-***/
    $scope.loin=function(){
        $scope.jokLogin=false;
        $scope.drpBox = false;
        $scope.drop = false;
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
                    $scope.jokLogin=true;
                    $scope.drpBox = true;
                    $scope.drop = true;
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
                    if ($scope.odd != null) {

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
                    alert("错误信息:" + data.msg);
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
        window.location.href = "http://127.0.0.1:9000/m/newyearevent/newyearevent.html";
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
        $scope.jokLogin=false;
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
                        window.location.href="http://127.0.0.1:9000/m/newyearevent/newyearevent.html";
                    }/*else{
                        window.location.href="http://127.0.0.1:9000/m/jujin/#/login";
                    }*/
                }
            );
        }
    }]);
