app.controller('WkIndexController', ['$rootScope', '$scope', '$http', '$routeParams', '$location', 'GlobalBorrowInfo','commonService',
    function($rootScope, $scope, $http, $routeParams, $location, borrow,service) {
        setDefaultValue($scope, $rootScope);

        /*=2016/07/08=+commonService=*/
        service.loadAction({
            url: $rootScope.URL_ROOT + "/home/facade"
        },$scope).success(function(response){
            if(response.entity){
                //标信息
                $scope.index_borrows = response.entity.borrows;
                //推荐信息
                var img_borrows=response.entity.activities;
                //前两条
                img_borrows = img_borrows.slice(0,2);
                for(var i=0;i<img_borrows.length;i++){
                    img_borrows[i].time = img_borrows[i].time.substr(0,10);
                }
                //显示前两条
                $scope.img_borrows = img_borrows;
                //轮播图
                $scope.banners = response.entity.banners;
                //滑动图标
                $scope.notice=response.entity.notice;
                if(response.entity.notice){
                    var yDate=new Date();
                    if(Date.parse($scope.notice.beginTime)<yDate && yDate<Date.parse($scope.notice.endTime)){
                        $(".modal-dialog").show();
                    }else{
                        $(".modal-dialog").hide();
                    }
                }              
            }           
            Share($scope, $rootScope, $http);
        });

        var channelBorrowId = (!isEmpty(borrow) && !isEmpty(borrow.borrowId)) ? borrow.borrowId : ((!isEmpty(localStorage) && !isEmpty(localStorage.getItem("CHANNEL_BORROWID")) ? localStorage.getItem("CHANNEL_BORROWID") : null));
        if ($routeParams.t == "rechage" && !isEmpty(channelBorrowId)) {

            if (!isEmpty(localStorage)) {
                localStorage.removeItem("CHANNEL_BORROWID");
            }
            if (!isEmpty(borrow)) {
                borrow.borrowId = null;
            }
            $location.url("borrowmed?id=" + channelBorrowId);
            return;
        }
    }
]);

app.directive('navhandler', ['$location',
    function($location) {
        return {
            restrict: 'A',
            transclude: false,
            link: function() {

                var path = $location.path();

                if (path == "/") {
                    $("navTitle").hide();
                    $("navTool").hide();
                } else if (path.indexOf("product") != -1) {
                    $("navTitle").hide();
                    $("navTool").hide();
                } else {
                    $("navTitle").show();
                    $("navTool").show();
                }
            }
        };

    }
]);
app.factory("httpInterceptor", [ "$q","$rootScope","$routeParams", function($q,$rootScope,$routeParams) {
    return {
        request: function(config){
//            if($routeParams.platform=='1'||$routeParams.platform=='2'){
//                config.headers = config.headers || {};
//                return config;
//            }else{
                config.headers = config.headers || {};
                if (localStorage && localStorage.getItem("act")) {
                    config.headers.act = localStorage.getItem("act");
                };
                if (localStorage && localStorage.getItem("sitFlg")) {
                    config.headers.sitFlg= localStorage.getItem("sitFlg");
                };
                if (localStorage && localStorage.getItem("sigFlag")) {
                    config.headers.sigFlag= localStorage.getItem("sigFlag");
                };
                return config;
//            }
        }
    };
}]);
//拦截器
app.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('httpInterceptor');
}]);

//我的账户相关的控制器,个人账户信息概况
app.controller('waccountController', ['$rootScope', '$scope', '$http', '$routeParams', 'SharedState', '$location', 'baseService', 'AccountInfo',
    function($rootScope, $scope, $http, $routeParamsp, SharedState, $location, service, account) {
        /***-开通存管-***/
        $scope.openStorage=function(){
            $http.get($rootScope.URL_ROOT + '/atteststatus')
                .success(function(responseData) {
                    if(responseData.status==true){
                        $scope.userBank=responseData.entity.userId;
                        var bankUrl=$rootScope.URL_ROOT+"/accountManagePlat/mobileAccountManage";
                        var parameter={
                            "service":"accountPandect",
                            "userId":$scope.userBank,
                            "platform":"3"
                        };
                        $http.post(bankUrl,parameter).success(
                            function(data){
                                $scope.pandectStatus=data.entity;
                                $("#pandect").click();
                            }
                        );
                    }
                });
            var storageUrl=service.makeUrl("/signdeposit");
            $http.get(url).success(
                function(response){
                    if(response.status==true){
                        $scope.saveAcc=false;
                        $scope.saveAut=true;
                        $scope.signFlag=1;
                    }
                    // console.log(response);
                }
            );
        }
        if (isEmpty($scope.reg)) {
            $scope.reg = {};
        }
        $scope.reg.agree=true;
        $scope.startAgree=true;
        $scope.startAgr=false;
        $scope.agree = function(){
            $scope.reg.agree = !$scope.reg.agree;
            if($scope.reg.agree==true){
                $scope.startAgree=true;
                $scope.startAgr=false;
            }else{
                $scope.startAgree=false;
                $scope.startAgr=true;
            }
        }
        /**tab切换**/
        $scope.JKDiv_3=true;
        $scope.JKDiv_2=false;
        $scope.JKDiv_1=false;
        $scope.ChangeDiv=function(jkDiv) {
            if(jkDiv=="JKDiv_1"){
                $scope.JKDiv_1=true;
                $scope.JKDiv_2=false;
                $scope.JKDiv_3=false;
                localStorage.setItem("act",1);
                /**header--存管账户--**/
                $http.get(url).success(
                    function(response,config){
                        $scope.depository=response.entity;
                        if($scope.depository.account.signFlag=='0'){
                            $scope.saveAut=false;
                            $scope.saveAcc=true;
                        }else if($scope.depository.account.signFlag=='1'){
                            $scope.saveAut=true;
                            $scope.saveAcc=false;
                        }
                    }
                );
            }else if(jkDiv=="JKDiv_2"){
                $scope.JKDiv_2=true;
                $scope.JKDiv_1=false;
                $scope.JKDiv_3=false;
                localStorage.setItem("act",2);
                /*header--聚金账户--*/
                $http.get(url).success(
                    function(response,config){
                        $scope.oneSitory=response.entity;
                    }
                );
            }else if(jkDiv=="JKDiv_3"){
                $scope.JKDiv_2=false;
                $scope.JKDiv_1=false;
                $scope.JKDiv_3=true;
                localStorage.setItem("act",3);
                /**header--账户总览--**/
                $http.get(url).success(
                    function(response,config){
                        $scope.entity=response.entity;
                    }
                );
            }
        }
        $('.t_center ul li').bind('click',function(){
            $(this).addClass("ta_active").siblings('li').removeClass("ta_active");
        });
        /**tab切换**/
        service.initValue($scope);

        $scope.div_show = false;
        $scope.zone = null;

        //二维码
        $scope.codeImgUrl = $rootScope.URL_ROOT + "/popularity";

        $scope.show = function() {
            if ($("#masking").length > 0) {
                $("#masking").css('display', 'block');
                $scope.div_show = true;
            } else {
                var masking = document.createElement("div");
                masking.className = "masking-02";
                masking.style.display = "block";
                masking.id = "masking";

                $scope.zone = $("#qrcodezone");
                $("#qrcodezone").remove();

                masking.appendChild($scope.zone[0]);
                $(document.body).append(masking);
                $scope.div_show = true;

                $(masking).click(function() {
                    $("#masking").css('display', 'none');
                });
            }
        }

        $scope.hide = function() {
            $scope.div_show = false;
        }

        if (isEmpty($scope.showFlg)) {
            $scope.showFlg = 0; //是否显示人民币标识
        }

        var url = service.makeUrl("/default");
/*        service.loadEntity(url, $scope, "entity", function(response) {
            //账户信息
            account.data = $scope.entity;
            Share($scope, $rootScope, $http, $scope.entity.account.user.phoneNumber, $scope.entity.account.user.userId);
        });*/
        if(localStorage.getItem("sitFlg")=="0"){
            localStorage.setItem("act",3);
            service.loadEntity(url, $scope, "entity", function(response) {
                //账户信息
                account.data = $scope.entity;
                Share($scope, $rootScope, $http, $scope.entity.account.user.phoneNumber, $scope.entity.account.user.userId);
            });
        }else{
            localStorage.setItem("act",1);
            service.loadEntity(url, $scope, "entity", function(response) {
                //账户信息
                account.data = $scope.entity;
                Share($scope, $rootScope, $http, $scope.entity.account.user.phoneNumber, $scope.entity.account.user.userId);
            });
        }
        /**/

        //安全退出
        $scope.logout = function() {

            var logoutUrl = service.makeUrl("/logout");

            service.execAction($scope, logoutUrl, function(object) {
                $location.url("/");
            });
        }

        $scope.showInterest = function() {
            if (isEmpty($scope.entity) || isEmpty($scope.entity.account)) {
                return true;
            }
            if ($scope.entity.account.interestFlg != 1) {
                return false;
            }
            if (isNaN($scope.entity.account.dayInterest)) {
                var array = ["谢天谢地您来了，别急，24小时之后再来看看",
                    "客官您稍后，收益要24小时之后呢",
                    "24小时之后收益才会呈现呢，淡定、淡定",
                    "服务器刚刚开始为您加速运转，需要24小时呢",
                    "Relax，24小时之后收益才跑到您的账户"
                ];
                var rand = Math.round(Math.random() * 10);
                if (rand >= array.length) {
                    var tmp = Math.round(rand % array.length);
                    if (tmp > array.length) {
                        rand = array.length - 1;
                    } else {
                        rand = tmp;
                    }
                }
                $scope.showFlg = 0;
                $scope.entity.account.dayInterest = array[rand];
            } else {
                $scope.showFlg = 1;
            }
            return true;

        }

        //开通余额生息
        $scope.OpInterest = function() {
            var joinInterestUrl = service.makeUrl("/joininterest");
            service.execAction($scope, joinInterestUrl, function(object) {
                $scope.entity.account.interestFlg = 1;
                $scope.showFlg = 0;
                $scope.showInterest();
            });
        }


    }
]);

//余额生息
app.controller('InterestController', ['$rootScope', '$scope', '$http', '$routeParams', 'SharedState', '$location',
    function($rootScope, $scope, $http, $routeParamsp, SharedState, $location) {

        var list = [];
        var url = $rootScope.URL_ROOT + "/getinterest";

        if ($scope.showInterest) {
            $scope.showInterest = 1;
        }

        $http.get(url).success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {
                $scope.entity = response.entity;

                if (isNaN($scope.entity.dayInterest)) {
                    $scope.showInterest = 1;
                } else {
                    $scope.showInterest = 0;
                }

            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
        });
    }
]);

//自动投标设置
app.controller('AutoInvestController', ['$rootScope', '$scope', '$http', '$location', 'baseService','$sce',
    function($rootScope, $scope, $http, $location, service,$sce) {

        service.initValue($scope, function() {


            if (isEmpty($scope.showFlg)) {
                $scope.showFlg = 0; //是否显示人民币标识
            }
            if (isEmpty($scope.curSettingPage)) {
                $scope.curSettingPage = 1; //记录设置的当前页数
                $scope.curInvesetPage = 1; //记录自动投标列表的页数

                $scope.curSetTotalPage = 1; //记录设置的当前页数
                $scope.curInvTotalPage = 1; //记录自动投标列表的页数
            }

            $scope.defaultSetting = null;

        });
        $scope.setRule=function(){
            $location.url("/autodeatil");
        }
        $scope.ruleDetails=function(){
            var ruleUrl = service.makeUrl("/config/common");
            service.loadEntity(ruleUrl,$rootScope,"entity", function(response) {
                var ruleEntity=$rootScope.entity;
                $scope.autoMore=$sce.trustAsHtml(ruleEntity.WEBSITE.WITHDRAW) ;
            });
        }
        $scope.ruleDetails();
        $scope.loadDefaultSetting = function() {
            var autoUrl = service.makeUrl("/setting/auto");
            service.loadEntity(autoUrl, $scope, "entity", function(response) {

                var entity = $scope.entity;
                $scope.entities = entity.settings.list;
                $scope.records = entity.records.list;

                $scope.curSetTotalPage = entity.settings.pageCount;
                $scope.curInvTotalPage = entity.records.pageCount;

                $scope.defaultSetting = entity.defaultSetting;

                if (isEmpty($scope.now)) {
                    $scope.now = service.clone($scope.entity.defaultSetting);
                    autoDataFormat();
                    
                }
            });
        }

        $scope.changeStatus = function(item) {
            if (isEmpty(item) || isEmpty(item.id)) {
                return;
            }
            var status = 1;
            if (!item.enable) {
                status = 0;
            }
            var url = service.makeUrl("/setting/statuschanged?id=" + item.id + "&status=" + status); //更新执行刷新操作
            service.execAction($scope, url, function(object) {
                //
            });
        }

        if (isEmpty($scope.now)) //当前操作的对象
        {
            $scope.loadDefaultSetting();
        }

        //列表状态改变
        //设置TODO:优化加载列表
        $scope.loadSetingMore = function() {

            if ($scope.curSettingPage < $scope.curSetTotalPage) {
                $scope.curSettingPage = $scope.curSettingPage + 1;

                var url = $rootScope.URL_ROOT + "/setting/getsetting?pi=" + $scope.curSettingPage + "&ps=5";

                $http.get(url).success(function(response) {
                    if (checkResponse($rootScope, $scope, response)) {

                        if (!isEmpty($scope.entities) && Array.isArray($scope.entities)) //列表中已有元素
                        {
                            var list = response.list;
                            // list.forEach(function(item, index, array) {
                            //     $scope.entities.push(item);
                            // });
                             $scope.entities = $scope.entities.concat(list);
                        } else {
                            $scope.entities = response.list;
                        }
                    }
                });
            }
        };

        //自动投标记录
        $scope.loadInvestMore = function() {
            if ($scope.curInvesetPage < $scope.curInvTotalPage) {
                $scope.curInvesetPage = $scope.curInvesetPage + 1;

                var url = $rootScope.URL_ROOT + "/setting/autorecord?pi=" + $scope.curInvesetPage + "&ps=5";
                $http.get(url).success(function(response) {
                    if (checkResponse($rootScope, $scope, response)) {
                        if (!isEmpty($scope.records) && Array.isArray($scope.records)) //列表中已有元素
                        {
                            var list = response.list;
                            // list.forEach(function(item, index, array) {
                            //     $scope.records.push(item);
                            // });
                            $scope.records = $scope.records.concat(list);
                        } else {
                            $scope.records = response.list;
                        }
                    }
                });
            }
        };

        //提交
        $scope.updateOrAddEntity = function() {
            var amount = $scope.now.amount;
            if(amount<50){
                $rootScope.Ui.turnOn('showinfo');
                $scope.msg = "投资金额不能低于50！";
                $scope.title = "提示";
                return false;
            }
            var serviceUrl = service.makeUrl("/setting/autosetting");
            var params = service.clone($scope.now);
            //红包
            params.coinFlg = $scope.now.coinFlg == true ? "1":"0";
            //回款续投
            params.continueFlg = $scope.now.continueFlg == true ? "1":"0";
            //使用加息券
            params.ticketEnable = $scope.now.ticketEnable == true ? "1":"0";
            //加息券区间与投资区间对应关系
            var regionRelate = "",
                highList = $scope.highList;
            if(highList){
                 for(var i=0,len = highList.length;i<len;i++){
                    regionRelate += highList[i].ticketBegin+","+highList[i].ticketEnd+"|"+highList[i].investBegin+","+highList[i].investEnd+";";
                }                
            }  
            if(regionRelate!=""){
                regionRelate = regionRelate.substr(0,regionRelate.length-1);
            }
            params.regionRelate = regionRelate;
            $scope.now.regionRelate =  regionRelate;                 
            service.postAction($scope, serviceUrl, function(data, status) {
                if (isEmpty($scope.now.id)) //新增
                {
                    //2016-10-20-------------返回值中没有id，删除和修改时有问题，故修改成重新获取
                    //$scope.entities.unshift($scope.now); //在数组的第一个新增一个元素
                    $scope.loadDefaultSetting();
                }
                //跳转回列表页
                $scope.Ui.set('activeTab', 1);
                $scope.Ui.turnOn('button1');
            }, params);
        }
        $scope.modify = function(item) {
            $scope.now = item;
            autoDataFormat();
        }

        $scope.add = function(item) {
            $scope.now = $scope.defaultSetting;
            autoDataFormat();
        }
        //显示自定义规则
        var showPersonalRules = function(){
            //显示规则
            var priorityRules = $scope.ticket.priorityRules;
            for(var i=0,len=priorityRules.length;i<len;i++){

            }
            if(priorityRules.length>1){
                $scope.moneyRule = moneyRules[priorityRules[0]-1];
                $scope.timeRule = timeRules[priorityRules[1]-3];
            }else if(priorityRules.length == 1){
                $scope.moneyRule = moneyRules[priorityRules[0]-1];
            }
        }
        //数据格式化
        var autoDataFormat = function(){ 
            $scope.ticket = {};         
            //红包
            $scope.now.coinFlg = $scope.now.coinFlg == "1" ? true:false;
            //回款续投
            $scope.now.continueFlg = $scope.now.continueFlg == "1" ? true:false;
            //使用加息券
            if($scope.now.ticketEnable == "1"){
                $scope.useTicketDesc = "已使用";
                $scope.ticket.ticketEnable = true;
            }else{
                $scope.useTicketDesc = "未使用";
                $scope.ticket.ticketEnable = false;
            }
            $scope.ticket.isDefault = $scope.now.isDefault;
            //自定义规则
            if($scope.now.isDefault == '1'){
                $scope.ticket.priorityRules = ($scope.now.priorityRules && $scope.now.priorityRules.split(","))|| [1,3];
                //显示规则
                showPersonalRules();
            }
            //使用规则设置
            $scope.ticket.isDefault = $scope.now.isDefault;
            var highList = [];
            //加息券区间与投资区间对应关系
            var regionRelate = $scope.now.regionRelate;
            if(regionRelate){              
                //加息券区间与投资区间对应关系项
                var relAry = regionRelate.split(";");
                for(var i=0,len=relAry.length;i<len;i++){
                    var highItem = {};
                    var relItem = relAry[i];
                    //加息券，投资区间
                    var allAry= relItem.split("|");
                    for(var j=0,leng= allAry.length;j<leng;j++){                      
                        if(j==0){      
                            var ticketAry = allAry[j].split(",");                    
                            if(ticketAry.length>1){
                                highItem.ticketEnd = convertToFloat(ticketAry[1]);
                                highItem.ticketBegin = convertToFloat(ticketAry[0]);
                            }else if(ticketAry.length == 1){
                                highItem.ticketBegin = convertToFloat(ticketAry[0]);
                            }
                        }else if(j==1){
                            var investAry = allAry[j].split(",");  
                            if(investAry.length>1){
                                highItem.investBegin = convertToFloat(investAry[0]);
                                highItem.investEnd = convertToFloat(investAry[1]);
                            }else if(investAry.length == 1){
                                highItem.investBegin = convertToFloat(investAry[0]);
                            }
                            break;
                        }   
                    }  
                    highList.push(highItem);      
                }                
            }
            if(highList.length >0){
                $scope.ticket.highList = highList;
            }           
        }
        $scope.delete = function(id) {
            var delUrl = service.makeUrl("/setting/delautoinvest?id=" + id);
            service.execAction($scope, delUrl, function(object) {
                for (var i = 0; i < $scope.entities.length; i++) {
                    if ($scope.entities[i].id == id) {
                        $scope.entities.splice(i, 1); //删除这个元素,不用从服务器重新获取
                        break;
                    }
                };
            });
        }
        //金额规则
        var moneyRules = [{
            "ruleid":"1",
            "ruleInfo":"加息券面额",
            "ruleDesc":"面额从大到小排序",
            "formRule":"大",
            "toRule":"小"
        },{
            "ruleid":"2",
            "ruleInfo":"加息券面额",
            "ruleDesc":"面额从小到大排序",
            "formRule":"小",
            "toRule":"大"
        }];
        //时间规则
        var timeRules = [{
            "ruleid":"3",
            "ruleInfo":"加息券剩余时限",
            "ruleDesc":"剩余时限从短到长排序",
            "formRule":"短",
            "toRule":"长"
        },{
            "ruleid":"4",
            "ruleInfo":"加息券剩余时限",
            "ruleDesc":"剩余时限从长到短排序",
            "formRule":"长",
            "toRule":"短"
        }];
        // $scope.moneyRules = moneyRules;
        // $scope.timeRules = timeRules;
        //保存加息券设置
        $scope.saveTicketSet = function(){
            //是否使用加息券
            $scope.now.ticketEnable = $scope.ticket.ticketEnable;
            $scope.useTicketDesc = "未使用";
            //使用规则设置
            $scope.now.isDefault = "0";
            //优先使用规则
            $scope.now.priorityRules = "1,3";
            //加息券区间与投资区间对应关系
            $scope.highList = [];
            //使用加息券
            if($scope.now.ticketEnable == true){
                //使用规则设置
                $scope.now.isDefault = $scope.ticket.isDefault;
                //自定义设置
                if($scope.ticket.isDefault == "1"){
                    //优先使用规则
                    $scope.now.priorityRules = $scope.ticket.priorityRules.join(",");
                    //加息券区间与投资区间对应关系
                    $scope.highList = $scope.ticket.highList;  
                }               
                $scope.useTicketDesc = "已使用";
            }  
            $scope.showTicket = false;        
        }
        //显示/隐藏加息券设置
        $scope.setRateTicket = function(){
            $scope.showTicket = !$scope.showTicket;
        }
        //修改使用规则设置
        $scope.changeRuleStatus = function(status){
            $scope.ticket.isDefault = status;
            //自定义规则
            if(status == '1'){
                $scope.ticket.priorityRules = $scope.ticket.priorityRules || [1,3];
                //显示规则
                showPersonalRules();
            }
        }
        //修改金额规则
        $scope.changeMoneyRule = function(ruleid){
            var newid = 3-ruleid;
            $scope.ticket.priorityRules[0] = newid;
            $scope.moneyRule = moneyRules[newid-1];                    
        }
        //修改时间规则
        $scope.changeTimeRule = function(ruleid){
            var newid = 7-ruleid;
            $scope.ticket.priorityRules[1] = newid;
            $scope.timeRule = timeRules[newid-3];
        }
        //修改使用加息券状态
        $scope.changeUseTicket = function(){
            if($scope.now.isDefault == undefined){
                $scope.ticket.isDefault = '0';
            }            
        }
        //新增规则---最多三条
        $scope.addRules = function(){
            if($scope.ticket.highList){
                if($scope.ticket.highList.length == 3){

                }else{
                    $scope.ticket.highList.push({
                        ticketBegin:"",
                        ticketEnd:"",
                        investBegin:"",
                        investEnd:""
                    });
                }
            }else{
               $scope.ticket.highList = [{
                    ticketBegin:"",
                    ticketEnd:"",
                    investBegin:"",
                    investEnd:""
                }]; 
            }
            
        }
        //删除规则-当前行
        $scope.deleteRule = function(index){
            //列表中删除
            $scope.ticket.highList.splice(index,1);
        }
        
    }
]);

/**投资管理**/
app.controller('InvestinfoController', ['$rootScope', '$scope', '$http', '$routeParams', 'SharedState', '$location', 'baseService',
    function($rootScope, $scope, $http, $routeParamsp, SharedState, $location, service) {

        service.initValue($scope, $rootScope);
        var url = service.makeUrl("/tendersummary");
        service.loadEntity(url, $scope, "entity", function(response) {

            if (isEmpty($scope.entity.repayingAccount)) {
                $scope.entity.repayingAccount = "0.00";
            }

            if (isEmpty($scope.entity.tenderingAccount)) {
                $scope.entity.tenderingAccount = "0.00";
            }

            if (isEmpty($scope.entity.totalEarnings)) {
                $scope.entity.totalEarnings = "0.00";
            }
        });
    }
]);

/**聚金宝**/
app.controller('JuJinBaoController', ['$rootScope', '$scope', '$http', 'SharedState', '$location', 'baseService',
    function($rootScope, $scope, $http, SharedState, $location, service) {

        service.initValue($scope, $rootScope);
        if ($scope.showInterest) {
            $scope.showInterest = 1;
        }

        if (isEmpty($scope.currentDetailPage)) {
            $scope.currentDetailPage = 1;
            $scope.currentZhaiQuanPage = 1;

            if (isEmpty($scope.totalDetailPage)) {
                $scope.totalDetailPage = 1;
            }
            if (isEmpty($scope.totalZhaiQuanPage)) {

                $scope.totalZhaiQuanPage = 1;
            }
        }

        var url = service.makeUrl("/getjujinbao");
        service.loadEntity(url, $scope, "entity", function(response) {
            $scope.entity = response.entity;

            if (isNaN($scope.entity.dayInterest)) {
                $scope.showInterest = 1;
            } else {
                $scope.showInterest = 0;
            }
            if (isEmpty($scope.details)) {
                $scope.details = $scope.entity.detail.list;
            }

            if (isEmpty($scope.zhaiquans)) {
                $scope.zhaiquans = $scope.entity.zhaiQuan.list;
            }

            $scope.totalZhaiQuanPage = $scope.entity.zhaiQuan.pageCount;
            $scope.totalDetailPage = $scope.entity.detail.pageCount;
        });
        $scope.loadDetailMore = function() {

            if ($scope.currentDetailPage < $scope.totalDetailPage) {
                $scope.currentDetailPage = $scope.currentDetailPage + 1;

                var url = service.makeUrl("/getjujinbaolist?pi=" + $scope.currentDetailPage + "&ps=5");
                service.loadEntities(url, $scope, "details");
            }

        };

        $scope.loadZhaiQuanMore = function() {

            if ($scope.currentZhaiQuanPage < $scope.totalZhaiQuanPage) {
                $scope.currentZhaiQuanPage = $scope.currentZhaiQuanPage + 1;

                var url = service.makeUrl("/getjujinbaozhaiquanlist?pi=" + $scope.currentZhaiQuanPage + "&ps=10");
                service.loadEntities(url, $scope, "zhaiquans");
            }
        };
    }
]);


/**
   函数名：AccountInfoController
   参数：
   说明：资金数据查看

   **/
app.controller('AccountInfoController', ['$scope','$rootScope','$http', '$routeParams', 'SharedState', '$location','baseService','AccountInfo',function($scope,$rootScope,$http,$routeParams,SharedState,$location,service,account) {
    if(localStorage.getItem("sitFlg")=="0"&&localStorage.getItem("act")=='2'){
        var url = service.makeUrl("/default");
        $scope.atAll=false;
        service.loadEntity(url, $scope, "entity", function(response) {
            //账户信息
            account.data = $scope.entity;
            Share($scope, $rootScope, $http, $scope.entity.account.user.phoneNumber, $scope.entity.account.user.userId);
        });
        $scope.entity = account.data;
    }
    if(localStorage.getItem("sitFlg")=="0"&&localStorage.getItem("act")=='1'){
        $scope.atAll=true;
        $scope.accountAll=function(){
            $http.get($rootScope.URL_ROOT + '/atteststatus')
                .success(function(responseData) {
                    if(responseData.status==true){
                        $scope.userBank=responseData.entity.userId;
                        var bankUrl=$rootScope.URL_ROOT+"/accountManagePlat/mobileAccountManage";
                        var parameter={
                            "service":"accountPandect",
                            "userId":$scope.userBank,
                            "platform":"3"
                        };
                        $http.post(bankUrl,parameter).success(
                            function(data){
                                $scope.pandectStatus=data.entity;
                                $("#pandect").click();
                            }
                        );
                    }
                });
        }
        var url = service.makeUrl("/default");
        if(localStorage.getItem("act")){
            $scope.acctAll=false;
        }
        service.loadEntity(url, $scope, "entity", function(response) {
            //账户信息
            account.data = $scope.entity;
            Share($scope, $rootScope, $http, $scope.entity.account.user.phoneNumber, $scope.entity.account.user.userId);
        });
        $scope.entity = account.data;
    }
    if(localStorage.getItem("sitFlg")=="0"&&localStorage.getItem("act")=='3'){
        $scope.atAll=false;
        var url = service.makeUrl("/default");
        service.loadEntity(url, $scope, "entity", function(response) {
            //账户信息
            account.data = $scope.entity;
            Share($scope, $rootScope, $http, $scope.entity.account.user.phoneNumber, $scope.entity.account.user.userId);
        });
        $scope.entity = account.data;
    }
}]);


/**
   函数名：AccountSetController
   参数：
   说明：账户设置

   **/
app.controller('AccountSetController', ['$rootScope', '$scope','$http','$location', 'baseService',
    function($rootScope, $scope,$http,$location, service) {
        $scope.skipCard=function(){
            var url = service.makeUrl("/bank");
            // localStorage.getItem("signFlag");
            service.loadEntity(url, $scope, "entity", function(response) {
                //账户信息
                if($scope.entity==null){
                    $location.url("/bankcard");
                }else{
                    if(localStorage.getItem("sigFlag")=='0'){
                    $http.get($rootScope.URL_ROOT + '/atteststatus')
                        .success(function(responseData) {
                            if(responseData.status==true){
                                $scope.userBank=responseData.entity.userId;
                                var bankUrl=$rootScope.URL_ROOT+"/accountManagePlat/mobileAccountManage";
                                var parameter={
                                    "service":"signClient",
                                    "userId":$scope.userBank,
                                    "platform":"3"
                                };
                                $http.post(bankUrl,parameter).success(
                                    function(data){
                                        $scope.bankStatus=data.entity;
                                        $("#sig").click();
                                    }
                                );
                            }
                        });
                    }else{
                        $location.url("/bankcard");
                    }
                }
            });
            /* if(localStorage.getItem("act")=='1'){

             }*/
            /*$http.get($rootScope.URL_ROOT + '/atteststatus')
             .success(function(responseData) {
             if(responseData.status==true){
             $scope.userBank=responseData.entity.userId;
             $http.get($rootScope.URL_ROOT +'/bid/bankInfo?userId='+$scope.userBank).success(
             function(data){
             if(data.status==true){
             //已经绑过卡
             $location.url("/bankcard");
             }else if(data.status==false){
             //还未绑卡
             $location.url("/bankcard");
             }
             });
             }
             }).error(function(response, status, headers, config) {
             checkResponse($rootScope, $scope, response);
             });*/
        }
        $scope.skipPerson=function(){
            $http.get($rootScope.URL_ROOT + '/atteststatus')
                .success(function(responseData) {
                    if(responseData.status==true){
                        if(responseData.entity.idFlg=="0"){
                            $location.url("/attest");
                        }else if(responseData.entity.idFlg=="1"&&responseData.entity.signFlag=='0'){
                            $scope.userBank=responseData.entity.userId;
                            var bankUrl=$rootScope.URL_ROOT+"/accountManagePlat/mobileAccountManage";
                            var parameter={
                                "service":"signClient",
                                "userId":$scope.userBank,
                                "platform":"3"
                            };
                            $http.post(bankUrl,parameter).success(
                                function(data){
                                    $scope.clientStatus=data.entity;
                                    $("#renzheng").click();
                                }
                            );
                        }else if(responseData.entity.idFlg=="1"&&responseData.entity.signFlag=='1'){
                            $location.url("/attest");
                        }
                    }
                });
        }
        //安全退出
        $scope.logout = function() {

            var logoutUrl = service.makeUrl("/logout");

            service.execAction($scope, logoutUrl, function(object) {
                $location.url("/");
            });
        }
    }
]);

