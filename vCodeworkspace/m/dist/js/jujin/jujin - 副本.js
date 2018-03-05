﻿var app = angular.module('MobileAngularUiExamples', [
    'ngRoute',
    'mobile-angular-ui',
    'mobile-angular-ui.components',
    // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
    // it is at a very beginning stage, so please be careful if you like to use
    // in production. This is intended to provide a flexible, integrated and and
    // easy to use alternative to other 3rd party libs like hammer.js, with the
    // final pourpose to integrate gestures into default ui interactions like
    // opening sidebars, turning switches on/off ..
    'mobile-angular-ui.gestures',
    'mobile-angular-ui.core.sharedState'
]);

var SERVER_ADDRESS = "http://192.168.0.60:8080";

app.config(function($routeProvider) {
    //中秋抽奖
    $routeProvider.when('/appmedautumn', {
        templateUrl: '/m/jujin/appmedautumn.html',
        reloadOnSearch: false,
        controller: 'medautumnController'
    });

    //优惠码兑换
    $routeProvider.when('/promocode', {
        templateUrl: '/m/jujin/promocode.html',
        controller: 'codeController'
    });
    //投资记录
    $routeProvider.when('/invest', {
        templateUrl: '/m/jujin/invest.html',
        controller: 'investController'
    }); 
    //标的列表
    $routeProvider.when('/borrows', {
        templateUrl: '/m/jujin/borrows.html',
        controller: 'borrowController'
    });
    //平台还款
    $routeProvider.when('/repayment', {
        templateUrl: '/m/jujin/repayment.html',
        controller: 'repaymentController'
    });
    //标的详情
    $routeProvider.when('/borrowinfo', {
        templateUrl: '/m/jujin/borrowinfo.html',
        controller: 'borrowinfoController'
    });
    //邀请详情
    $routeProvider.when('/invite', {
        //templateUrl: '/m/jujin/invite.html',
		templateUrl: '/m/jujin/invitem.html',
        controller: 'inviteController'
    });
    //邀请列表
    $routeProvider.when('/myInvite', {
        templateUrl: '/m/jujin/invite2.html',
        controller: 'inviteController'
    });
    //登录
    $routeProvider.when('/login', {
        templateUrl: '/m/jujin/login.html',
        controller: 'loginController'
    });
    //注册
    $routeProvider.when('/register', {
        templateUrl: '/m/jujin/register.html',
        controller: 'registerController'
    });
    //消息列表
    $routeProvider.when('/message', {
        templateUrl: '/m/jujin/message.html',
        controller: 'messageController'
    });
    //充值
    $routeProvider.when('/recharge', {
        templateUrl: '/m/jujin/recharge.html',
        controller: 'rechargeController'
    }); 
    //提现
    $routeProvider.when('/withdraw', {
        templateUrl: '/m/jujin/withdraw.html',
        controller: 'withdrawController'
    }); 
    //回款计划
    $routeProvider.when('/recove', {
        templateUrl: '/m/jujin/recove.html',
        controller: 'recoveController'
    }); 
    //绑定银行卡---开始
    $routeProvider.when('/bankcard', {
        templateUrl: '/m/jujin/bankcard.html',
        controller: 'bankcardController'
    }); 
    //银行卡绑定---步骤
    $routeProvider.when('/bindbc', {
        templateUrl: '/m/jujin/bindbc.html',
        controller: 'bindbcCtrl'
    }); 
    //充值开始
    $routeProvider.when('/banklist', {
        templateUrl: '/m/jujin/banklist.html',
        controller: 'banklistCtrl'
    });
    //计算器
    $routeProvider.when('/calc', {
        templateUrl: '/m/jujin/calc.html',
        controller: 'calcController'
    });
    //资金记录
    $routeProvider.when('/accountlog', {
        templateUrl: '/m/jujin/accountlog.html',
        controller: 'AccountLogController'
    });
    //实名认证
    $routeProvider.when('/attest', {
        templateUrl: '/m/jujin/attest.html',
        controller: 'AttestController'
    });
    //发现
    $routeProvider.when('/more', {
        templateUrl: '/m/jujin/more.html'
    });
    //修改密码
    $routeProvider.when('/changepsw', {
        templateUrl: '/m/jujin/changepsw.html',
        controller: 'changepswController'
    }); 
    //密码找回
    $routeProvider.when('/findpsw', {
        templateUrl: '/m/jujin/findpsw.html',
        controller: 'findpswCtrl'
    });      
    //确认充值
    $routeProvider.when('/confrec', {
        templateUrl: '/m/jujin/confrec.html',
        controller: 'confrecCtrl'
    }); 
    //注册成功--可进入实名认证
    $routeProvider.when('/registercomplete', {
        templateUrl: '/m/jujin/registercomplete.html',
        controller: 'AttestController'
    });
    //实名认证成功
    $routeProvider.when('/realname', {
        templateUrl: '/m/jujin/realname.html',
        controller: 'AttestController'
    });
    //绑定银行卡成功
    $routeProvider.when('/card', {
        templateUrl: '/m/jujin/card.html',
        controller: 'banklistCtrl'
    });
    //进入账号
    $routeProvider.when('/accout', {
        templateUrl: '/m/jujin/accout.html'
    });
    //注册成功页面
    $routeProvider.when('/accounter', {
        templateUrl: '/m/jujin/accounter.html',
        controller: 'accoutController'
    });
    //加息券列表
    $routeProvider.when('/ticket', {
        templateUrl: '/m/jujin/ticket.html',
        controller: 'ticketCtrl'
    });  
    //联系我们
    $routeProvider.when('/contactus', {
        templateUrl: '/m/jujin/contactus.html'
    }); 
    //常见问题
    $routeProvider.when('/questions', {
        templateUrl: '/m/jujin/questions.html'
    }); 
    //我的抵现红包
    $routeProvider.when('/myreds', {
        templateUrl: '/m/jujin/myreds.html',
        controller: 'myredsCtrl'
    });   
    //主页
    $routeProvider.when('/', {
        templateUrl: '/m/jujin/wkindex.html',
        controller: 'WkIndexController'
    });
    //账户
    $routeProvider.when('/default', {
        templateUrl: '/m/jujin/account/waccount.html',
        controller: 'waccountController'
    });
    //余额生息
    $routeProvider.when('/interest', {
        templateUrl: '/m/jujin/interest/interest.html',
        controller: 'InterestController'
    }); 
    //余额生息页详情
    $routeProvider.when('/interestdetail', {
        templateUrl: '/m/jujin/interest/interestdetail.html',
        controller: 'InterestController'
    }); 
    //聚金宝生息
    $routeProvider.when('/jujinbao', {
        templateUrl: '/m/jujin/interest/jujinbao.html',
        controller: 'JuJinBaoController'
    }); 
    //聚金宝详情
    $routeProvider.when('/jujinbaodetail', {
        templateUrl: '/m/jujin/interest/jujinbaodetail.html',
        controller: 'JuJinBaoController'
    });  
    //自动投标
    $routeProvider.when('/auto', {
        templateUrl: '/m/jujin/invest/auto.html',
        controller: 'AutoInvestController'
    });  
    //资金管理
    $routeProvider.when('/accountinfo', {
        templateUrl: '/m/jujin/account/accountinfo.html',
        controller: 'AccountInfoController'
    });
    //账户设置
    $routeProvider.when('/accountset', {
        templateUrl: '/m/jujin/account/accountset.html',
        controller: 'AccountSetController'
    });
    //投资管理
    $routeProvider.when('/investinfo', {
        templateUrl: '/m/jujin/invest/investinfo.html',
        controller: 'InvestinfoController'
    });
    //活动管理
    $routeProvider.when('/activityinfo', {
        templateUrl: '/m/jujin/activity/activityinfo.html',
        controller: ''
    });
    //投之家绑定
    $routeProvider.when('/tzjbind', {
        templateUrl: '/m/tzj/tzjbind.html',
        controller: 'TzjBindController'
    });
    //投之家绑定修改
    $routeProvider.when('/tzjeditbind', {
        templateUrl: '/m/tzj/tzjeditbind.html',
        controller: 'TzjEditBindController'
    });
    //投之家
    $routeProvider.when('/borrowmed', {
        templateUrl: '/m/tzj/borrowmed.html',
        controller: 'BorrowMedController'
    });
    //服务中心
    $routeProvider.when('/service', {
        templateUrl: '/m/jujin/sc/sc.html'
    });
    //文章列表
    $routeProvider.when('/artlist', {
        templateUrl: '/m/jujin/sc/article/list.html',
        controller: 'artListController'
    });
    //文章详细信息
    $routeProvider.when('/artdetail', {
        templateUrl: '/m/jujin/sc/article/detail.html',
        controller: 'artDetailController'
    });
    //签到
    $routeProvider.when('/sign', {
        templateUrl: '/m/jujin/sign/home.html',
        controller: 'SignController'
    }).when('/signlist', {
        templateUrl: '/m/jujin/sign/list.html',
        controller: 'SignController'
    });

    /*--20160310--*/
    $routeProvider.when('/landing.html', {
        templateUrl: '/m/jujin/landing/index.html',
        controller: 'registerController'
    }); //推广页面
    $routeProvider.when('/own', {
        templateUrl: '/m/jujin/landing/own.html',
        controller: 'registerController'
    }); //页面
    //2016/1/15
    $routeProvider.when('/tsou', {
        templateUrl: '/m/jujin/landing/ymts.html',
        controller: 'registerController'
    }); //推广页面---玉米投手
    //2015/12/29
    $routeProvider.when('/meder', {
        templateUrl: '/m/jujin/landing/benefits.html',
        controller: 'registerController'
    }); //推广页面----比搜益
});


app.run(function($transform, $rootScope) {
    window.$transform = $transform;
    $rootScope.pageSize = 5;

    $rootScope.SERVER = SERVER_ADDRESS;
    $rootScope.URL_ROOT = $rootScope.SERVER + "/api"; //全局地址
    $rootScope.ROOT = $rootScope.SERVER + "/m/jujin/";

    $rootScope.IS_LOGIN = false;
    $rootScope.RETURN = ""; //登录后跳转的页面

    //是否完善
    $rootScope.registerEnter = false;
    $rootScope.getBorrowStyle = function(status) {
        //状态集合
        var statusMap = {
            "2": "inprogress",//还款中
            //"3": "done",//已还完
            "8": "inbid" //筹款中
        }
        //返回对应值，默认为筹款中
        return statusMap[status] || "inbid";//筹款中
    }
});

/**
   函数名：AccountInfo
   参数：
   说明：用户中心数据共享

   **/
app.factory('AccountInfo', function() {
    return {
        data: {}
    };
});

/*
   函数名：GlobalBorrowInfo
   参数：
   说明：用户先进标的详情，然后跳转至其他页面
*/
app.factory('GlobalBorrowInfo', function() {
    return {
        data: {},
        borrowId: null
    };
});

//20160525通用服务
app.factory("commonService",["$http","$q","$rootScope",function($http,$q,$rootScope){
    var service = {};
    //默认配置信息
    var defaultConfig = {
        SERVER: SERVER_ADDRESS,
        URL_ROOT: SERVER_ADDRESS + "/api",
        ROOT: SERVER_ADDRESS + "/m/jujin/",
        IS_LOGIN: false,
        PAGE_SIZE: 5,
        RETURN: "" //登录后跳转的页面
    };
    //统一处理错误信息
    service.loadAction = function(config,$scope){
        var deferred = $q.defer(),
            promise = deferred.promise;

        if(config == undefined || config.url == undefined){
            return false;
        }
        //默认使用GET方式
        config.method = config.method || "GET";
        $rootScope.loading = true;
        //获取数据
        $http(config).success(function(data){
            deferred.resolve(data);
        })
        .error(function(error){
            deferred.reject(error);
        });
        //成功
        promise.success = function(sucsCall){
            promise.then(function(data) {
                if (checkResponse($rootScope, $scope, data)) {
                    if(sucsCall && typeof sucsCall == "function"){
                        sucsCall(data);
                    }
                }
            });
        },
        //失败
        promise.error = function(errorCall){
            promise.then(null ,function(data) {
                if(checkResponse($rootScope, $scope, data)){
                    if(errorCall && typeof errorCall == "function"){
                        errorCall(data);
                    }
                }
            });
        };
        return promise;
    }
    //加上分页默认参数
    service.loadPageAction = function(config,$scope){
        if(config == undefined || config.url == undefined){
            return false;
        }
        //默认参数
        var httpConfig = {
            params:{
                ps: defaultConfig.PAGE_SIZE,//每页条数
                pi: 1//第几页
            }
        }
        config.params = angular.extend(httpConfig.params,config.params);
        //获取数据
        return service.loadAction(config,$scope);
    }
    //加载记录---返回HttpPromise
    service.loadRecord = function(config){
        if(config == undefined || config.url == undefined){
            return false;
        }
        //默认使用GET方式
        config.method = config.method || "GET";
        $rootScope.loading = true;
        //获取数据
        return $http(config);
    }
    //加载分页记录---返回HttpPromise
    service.loadPageRecord = function(config){
        if(config == undefined || config.url == undefined){
            return false;
        }
        //默认参数
        var httpConfig = {
            params:{
                ps: defaultConfig.PAGE_SIZE,//每页条数
                pi: 1//第几页
            }
        }
        config.params = angular.extend(httpConfig.params,config.params);
        //获取数据
        return service.loadRecord(config);
    }
    //生成记录信息
    service.genRecord = function(httpConfig,$scope,recordConfig,rowhandler,args){
        //默认参数
        var commConfig = {
            proName: "records",
            totalPage : "totalPageCount"
        }
        recordConfig = angular.extend(commConfig,recordConfig);
        service.loadPageAction(httpConfig,$scope).success(function(response){
            $scope[recordConfig.totalPage] = response.pageCount;
            var list = response.list;
            if (isEmpty($scope[recordConfig.proName])) {
                if(!isEmpty(rowhandler) && typeof(rowhandler) == 'function'){
                    $scope[recordConfig.proName] = [];
                    list.forEach(function(item, index, array) {
                        $scope[recordConfig.proName].push(rowhandler(item,args));
                    });
                }else{
                    $scope[recordConfig.proName] = list;
                }
            } else if (!isEmpty(list) && Array.isArray(list) && list.length > 0){
                if(!isEmpty(rowhandler) && typeof(rowhandler) == 'function'){
                    list.forEach(function(item, index, array) {
                        $scope[recordConfig.proName].push(rowhandler(item,args));
                    });
                }else{
                    $scope[recordConfig.proName] = $scope[recordConfig.proName].concat(list);
                }
            }
        });
    }
    //更多记录
    service.loadMore = function(httpConfig,$scope,recordConfig,rowhandler,args){
        //默认参数
        var commConfig = {
            proName: "records",
            totalPage : "totalPageCount",
            currentPage: "currentPage"
        }
        recordConfig = angular.extend(commConfig,recordConfig);
        if ($scope[commConfig.currentPage] < $scope[commConfig.totalPage]) {
            $scope[commConfig.currentPage] = $scope[commConfig.currentPage] + 1;
            //请求第几页
            httpConfig.params.pi = $scope[commConfig.currentPage];
            service.genRecord(httpConfig,$scope,recordConfig,rowhandler,args);
        }
    }
    return service;
}]);

app.factory('baseService', ['$location', '$rootScope', '$http', '$sce', function($location, $rootScope, $http, $sce) {

    var service = {};
    var config = {
        SERVER: SERVER_ADDRESS,
        URL_ROOT: SERVER_ADDRESS + "/api",
        ROOT: SERVER_ADDRESS + "/m/jujin/",
        IS_LOGIN: false,
        PAGE_SIZE: 5,
        RETURN: "" //登录后跳转的页面
    };
    /**
    函数名：makeUrl
    参数：
        serviceName：服务名(包含get的参数，单独拉出来反倒不直观，合在一起，就这么定了!^_^)
        pi：请求的页数
        ps：当前页数
    说明：从服务器取出集合数据放在$scope中对应的属性中

    **/
    service.makeUrl = function(serviceName, pi, ps) {

        var url = config.URL_ROOT + serviceName;

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

    service.getConfig = function() {
            return config;
        }
        /**
        函数名：loadEntities
        参数：
            $scope：Controller函数
            proName：$scope中属性名等价于$scope.messages,$scope.rows
            rowhandler:是否需要对每条数据进行格式转换和处理
            handler:对结果集转换函数
        说明：从服务器取出集合数据放在$scope中对应的属性中

        **/
        service.loadEntities = function(url, $scope, proName, rowhandler, handler) {
            $rootScope.loading = true;
            $http.get(url).success(function(response) {
                if (checkResponse($rootScope, $scope, response)) {
                    if (isEmpty($scope)) return;
                    var list = response.list;
                    if (isEmpty($scope[proName]) || !Array.isArray($scope[proName])) {
                        $scope[proName] = [];
                    }
                    //20160511如果不需要数据格式转换和处理的话，是不是可以不用遍历了？？？判断要写在外面比较好吧
                    /*list.forEach(function(item, index, array) {
                        $scope[proName].push(!isEmpty(rowhandler) && typeof(rowhandler) == 'function' ? rowhandler(item) : item);
                    });*/

                    if(!isEmpty(rowhandler) && typeof(rowhandler) == 'function'){
                        list.forEach(function(item, index, array) {
                            $scope[proName].push(rowhandler(item));
                        });
                    }else{
                        $scope[proName] = $scope[proName].concat(list);
                    }
                    if (!isEmpty(handler) && typeof(handler) == 'function') {
                        handler(response);
                    }
                }
            }).error(function(response, status, headers, config) {
                checkResponse($rootScope, $scope, response);
                //TODO:LOG ERROR
            });
        }
        /**
        函数名：loadEntity
        参数：
            $scope：Controller函数
            proName：$scope中属性名等价于$scope.messages,$scope.rows
            handler:是否需要对每条数据进行格式转换和处理
        说明：从服务器取出对象放在$scope中

        **/
    service.loadEntity = function(url, $scope, proName, handler) {
        $rootScope.loading = true;
        $http.get(url).success(function(response) {

            if (checkResponse($rootScope, $scope, response)) {
                if (isEmpty($scope)) return;
                var entity = response.entity;
                $scope[proName] = entity;

                if (!isEmpty(handler) && typeof(handler) == 'function') {
                    handler(response);
                }

            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
            //TODO:LOG ERROR
        });
    }

    /**
    函数名：loadMore
    参数：
        $scope：Controller函数
        serviceName:该集合对应的服务名
        proName：$scope中属性名等价于$scope.messages,$scope.rows
        pageSize：每页呈现的数据，如不传默认为Config.PAGE_SIZE
        rowHandler:是否需要对每条数据进行格式转换和处理
        handler:对整个结果集处理
    说明：翻页页面使用从服务器取出集合数据放在$scope中对应的属性中

    **/
    service.loadMore = function($scope, serviceName, proName, pageSize, rowHandler, handler) {
        if ($scope.currentPage < $scope.totalPageCount) {
            $scope.currentPage = $scope.currentPage + 1;
            var url = service.makeUrl(serviceName, $scope.currentPage, pageSize);

            service.loadEntities(url, $scope, proName, rowHandler, handler);
        }
    }

    /**
           函数名：initValue
           参数：
               $scope：Controller函数
           说明：确保当前控制器得到正确的初始化(如清除上次执行消息，当前页面得到正确设置)

           **/
    service.initValue = function($scope, handler) {
        setDefaultValue($scope);
        if (handler && typeof(handler) == 'function') {
            handler();
        }
    }

    /**
    函数名：clone
    参数：
        url:
    说明：对象的深克隆
    **/
    service.clone = function clone(o) {
        var k, ret = o,
            b;
        if (o && ((b = (o instanceof Array)) || o instanceof Object)) {
            ret = b ? [] : {};
            for (k in o) {
                if (o.hasOwnProperty(k)) {
                    ret[k] = clone(o[k]);
                }
            }
        }
        return ret;
    }

    /**
     函数名：execAction
     参数：
         url:
     说明：执行一个简单的请求，然后执行回调函数
     注意：请求返回的内容始终在是第一个参数

     **/
    service.execAction = function($scope, url, handler, args) {
        $rootScope.loading = true;
        $http.get(url).success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {
                //response 始终会在第一位
                if (!isEmpty(handler) && typeof(handler) == 'function') {
                    if (isEmpty(args)) {
                        handler(response);
                    } else if (!Array.isArray(args)) {
                        handler(response, args);
                    } else {
                        args.unshift(response);
                        handler(args);
                    }
                }
            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
            //TODO:LOG ERROR
        });
    }

    service.postAction = function($scope, url, handler, args) {

        $rootScope.loading = true;
        $http.post(url, args).success(function(data, status) {

            if (checkResponse($rootScope, $scope, data)) {
                if (handler && typeof(handler) == 'function') {
                    handler(data, status);
                }
            }
        }).error(function(data, status) {
            checkResponse($rootScope, $scope, data);
        });
    }
    return service;

}]);

/***************************************************************************
# Author: wangning <wangning@jujinziben.com>
# Created Date: 2015-12-23
# Latest Update:
# Description:标的列表
#
# Revision:
#TODO:
#
#***************************************************************************/
app.controller('borrowController', ['$rootScope', '$scope', '$routeParams', 'commonService',
    function($rootScope, $scope, $routeParams, service) {
        //初始化参数
        setDefaultValue($scope, $rootScope);
        //产品类型
        $scope.type = $routeParams.type || 2;

        //产品信息参数
        var borrowConfig = {
            url : $rootScope.URL_ROOT + "/borrow?id=" + $scope.type
        };
        //生成记录信息--加载列表
        service.genRecord(borrowConfig,$scope,{
            proName: "type_borrows"
        });
        //加载更多
        $scope.loadMore = function() {
            service.loadMore(borrowConfig,$scope,{
                proName: "type_borrows"
            });
        };
    }
]);

//指令/2016/07/15图片显示指令-borrowinfo
app.directive("imglistShow",function(){
    return {
        restrict: "A",
        scope:{
            listinfo: "="
        },
        link: function(scope,element,attrs){
            var listInfo = scope.listinfo;
            var formatInfo = [];
            for(var i=0;i<listInfo.length;i++){
                formatInfo[i] = { href:listInfo[i]};
            }
            $(element).click(function(e){
                e.preventDefault();
                $.swipebox(formatInfo);
            });
        }
    }
});
//标的详情
app.controller('borrowinfoController', ['$rootScope', '$scope', '$routeParams','$location','commonService', 'GlobalBorrowInfo',
    function($rootScope, $scope, $routeParams,$location, service, borrowCache) {

        if (!isEmpty($routeParams.returnUrl)) {
            $scope.returnUrl = $routeParams.returnUrl;
        }

        setDefaultValue($scope, $rootScope);

        var borrowId = $routeParams.id;

        if (!isEmpty(borrowCache)) {
            if (!isEmpty(localStorage)) {
                localStorage.setItem("CHANNEL_BORROWID", borrowId);
            }
            borrowCache.borrowId = borrowId;
        }
        //加载标的信息
        function loadBorrowAccountInfo() {
            service.loadAction({
                url: $rootScope.URL_ROOT + "/borrowinfo?id=" + borrowId
            },$scope).success(function(response) {
                if (!isEmpty(response.entity) && !isEmpty(response.entity.borrow))
                    $scope.borrow = response.entity.borrow;
                //转换认证资料
                var attestion = $scope.borrow.attestion;

                if (!isEmpty(response.entity) && !isEmpty(response.entity.account)) {
                    $scope.account = response.entity.account;
                    $scope.account.coin = convertToFloat($scope.account.coin).toFixed(2);
                }
                //风险信息
                $scope.attests=attestion.attestType;
                var len=$scope.attests.length;
                var i=0;
                for(len;i<len;i++){
                    var anr=$scope.attests[i];
                    var attestationCd = anr.attestationCd;
                    anr["files"] = response.entity.borrow.attestion.attestFiles[attestationCd];
                }
            });
        }

        if (isEmpty($scope.record_current)) {
            $scope.record_current = 1;
            $scope.record_totalPage = 1;
        }
        //tab页签内容
        var tabList = [{
            id: "1",
            name: "产品介绍"
        },{
            id: "2",
            name: "标的内容"
        },{
            id: "3",
            name: "投标记录"
        },{
            id: "4",
            name: "风控信息"
        }];

        //投标记录
        var tenderConfig = {
            url : $rootScope.URL_ROOT + "/tender",
            params: {
                id : borrowId
            }
        };
        //2016/07/14 ===不同标的产品介绍
        // $scope.getType = function(type) {
        //     //状态集合
        //     var typeMap = {
        //         "8": "car-product",//车贷
        //         "2": "fcdy-product",//房贷
        //         "14": "sbd-product",//三板贷
        //         "15": "apple-product",//苹果贷
        //         "11": "cfq-product"//车分期
        //     }
        //     //返回对应值
        //     return typeMap[type];
        // }
        //查看详细信息
        $scope.viewDetailInfo = function(activeTab){
            //当前页签
            $scope.curTab = tabList[activeTab-1];
            var tmpTabList = tabList.concat();
            //tab页签列表
            tmpTabList.splice(activeTab-1,1);
            $scope.tablist = tmpTabList;
            $scope.activeTab = activeTab;
            //隐藏下拉框
            $(".fold-none").addClass("fold-n");
            $("#fold").removeClass("fold-img").addClass("fold-imx");            
            $(".jm-for").slideUp();
            $(".for0-list").show();
            $("#jx-fr").fadeOut(1000);
        }
        //返回列表
        $scope.backList = function(){
            $(".jm-for").slideDown();
            $(".for0-list").hide();
            $("#jx-fr").fadeIn(1000);
            $("#investConfirm").hide();
        }
        //展开折叠
        $scope.fold = function(){
            $(".fold-none").toggleClass("fold-n");
            $("#fold").toggleClass("fold-img").toggleClass("fold-imx");
        }
        //投资确认页面
        $scope.viewCunstomInfo = function(){
            //未登录跳转登录页面
            if($scope.account == null){
                $rootScope.RETURN = $location.url(); //登录后跳转的页面
                $location.url("/login");
                return;
            }  
            //是否显示加息券
            showJujinQuan();         
            $(".jm-for").slideUp();
            $("#investConfirm").show();
            $("#jx-fr").hide();
        }
        //加载投资记录
        $scope.loadRecord = function() {
            //若未加载过就加载数据
            if (isEmpty($scope.records)) {
                service.genRecord(tenderConfig,$scope,{
                    totalPage: "record_totalPage"
                });
            }
        }
        //加载更多投资记录
        $scope.loadTenderRecordMore = function() {
            service.loadMore(tenderConfig,$scope,{
                currentPage: "record_current",
                totalPage: "record_totalPage"
            });
        }
        //监控投资金额
        var amountWatch = $scope.$watch("amount",function(newVal,oldVal){
            if(newVal == undefined){
                $scope.useCoinValue = "0.00";
            }else if(newVal != oldVal){
                $scope.ShowJujinBiInfo();
            }
        });
        //使用抵现红包
        $scope.useCoinValue = "0.00";
        //抵现红包信息
        $scope.ShowJujinBiInfo = function () {
            //无账户信息
            if (isEmpty($scope.account)) {
                return;
            }
            //投资金额
            var tenderValue = $scope.amount;
            //抵扣比率
            var vouRate = convertToFloat($scope.borrow.vouchersRate);
            //抵现红包
            var coin = convertToFloat($scope.account.coin);
            //不用上面去的值是在超过可投金额时按照可投金额计算
            var maxUseCoin = (tenderValue * vouRate).toFixed(2);
            if (maxUseCoin > coin) {
                maxUseCoin = coin.toFixed(2);
            }
            $scope.useCoinValue = maxUseCoin;
        }
        //获取最大可用金额
        function getMaxAvlNum(){
            var totalAmount = 0.00;
            //账户信息
            if (!isEmpty($scope.account)) {
                //聚金宝
                if($scope.borrow && $scope.borrow.type == "10"){
                    //账户余额
                    totalAmount = convertToFloat($scope.account.balance);
                }else{
                    //账户余额+回款续投金额
                    totalAmount = convertToFloat($scope.account.balance) + convertToFloat($scope.account.continueTotal);
                }                
            }
            return totalAmount;
        }
        //全投
        $scope.setAll = function() {
            //账户信息
            if (!isEmpty($scope.account)) {
                var totalAmount = getMaxAvlNum();
                var wait = $scope.borrow && $scope.borrow.borrowAccountWait;
                if (convertToFloat(wait) > convertToFloat(totalAmount)) {
                    $scope.amount = convertToFloat(totalAmount);
                } else {
                    $scope.amount = convertToFloat(wait);
                }
                //显示抵现红包信息
                $scope.ShowJujinBiInfo();
            }
        }
        //确定投资
        $scope.invest = function() {
            //数据校验
            if (!isEmpty($scope.borrow)) {
                //投资信息参数
                var investEntity = {};
                //投资渠道
                if (!isEmpty($routeParams) && $routeParams.channel == "xglc") {
                    investEntity.isXglc = "1";
                }
                //投资金额
                var tenAccount = convertToFloat($scope.amount);
                if (!isEmpty(tenAccount)) {
                    investEntity.tenderAccount = tenAccount;
                }else{
                    $rootScope.Ui.turnOn('showinfo');
                    $scope.msg = "投资金额不能为空";
                    $scope.title = "投资金额设定异常";
                    return;
                }
                //定向密码
                var directPwd = $scope.directPwd;
                if (!isEmpty(directPwd)) {
                    investEntity.directionalPWD = directPwd;
                }
                //标的id
                investEntity.borrowId = $scope.borrow.borrowId;
                //定向密码
                if ($scope.borrow.directionalPwd && isEmpty(directPwd)) {
                    $rootScope.Ui.turnOn('showinfo');
                    $scope.msg = "请输入定向密码";
                    $scope.title = "定向密码";
                    return;
                }
                //使用的加息券
                var ticketId = $scope.ticketId;
                if (ticketId == '0') {
                    investEntity.ticketId = null;
                } else {
                    investEntity.ticketId = ticketId;
                }
                //使用的抵现红包
                if (!isEmpty($scope.useCoinValue) && $scope.useCoinValue > 0) {
                    investEntity.coin = $scope.useCoinValue;
                }
                //数据校验
                if (!isEmpty(investEntity.tenderAccount)) {
                    //最小投资金额
                    var minTen = convertToFloat($scope.borrow.minTenderAccount);
                    //最大投资金额
                    var maxTen = convertToFloat($scope.borrow.maxTenderAccount);
                    if (maxTen != 0 && maxTen < tenAccount) {
                        $rootScope.Ui.turnOn('showinfo');
                        $scope.msg = "投资金额大于设置的最大投资金额";
                        $scope.title = "投资金额设定异常";
                        return;
                    }
                    if (minTen != 0 && minTen > tenAccount) {
                        $rootScope.Ui.turnOn('showinfo');
                        $scope.msg = "投资金额小于设置的最小投资金额";
                        $scope.title = "投资金额设定异常";
                        return;
                    }
                    //可用余额
                    var amountTotal = getMaxAvlNum();
                    if(tenAccount > amountTotal){
                        $rootScope.Ui.turnOn('showinfo');
                        $scope.msg = "当前余额不足，最多可投"+amountTotal+"元";
                        $scope.title = "投资金额设定异常";
                        return; 
                    }
                    //可投金额
                    var borrowAccountWait = convertToFloat($scope.borrow.borrowAccountWait)
                    if(tenAccount > borrowAccountWait){
                        $rootScope.Ui.turnOn('showinfo');
                        $scope.msg = "最多可投"+borrowAccountWait+"元";
                        $scope.title = "投资金额设定异常";
                        return; 
                    }
                    //防止重复提交
                    var btn = document.getElementById("btnInvest");
                    var btnElement = angular.element(btn);
                    btnElement.attr("disabled", "true");
                    btnElement.css("background-color", "gray");
                    //投资
                    var investUrl = $rootScope.URL_ROOT + "/tend";
                    service.loadRecord({
                        method: "POST",
                        url: investUrl,
                        data: investEntity
                    }).success(function(data, status) {
                        if (checkResponse($rootScope, $scope, data)) {
                            btnElement.removeAttr("disabled");
                            btnElement.css("background-color", "#0caffe");
                            $rootScope.Ui.turnOn('showinfo');
                            $scope.msg = "恭喜您投资成功！";
                            $scope.title = "投资成功";

                            if (!isEmpty($scope.returnUrl)) {
                                handlerReturnUrl($scope.returnUrl);
                            } else {
                                if (!isEmpty(data.returnUrl)) {
                                    handlerReturnUrl($scope.returnUrl);
                                }
                            }
                            //加载标的信息
                            loadBorrowAccountInfo();
                            //是否显示加息券
                            showJujinQuan();
                        } else {
                            btnElement.removeAttr("disabled");
                            btnElement.css("background-color", "#0caffe");
                            $rootScope.Ui.turnOn('showinfo');
                            $scope.msg = "投资失败！";
                            $scope.title = "投资失败";
                        }
                    }).error(function(data, status) {
                        $rootScope.loading = false;
                        btnElement.removeAttr("disabled");
                        btnElement.css("background-color", "#0caffe");
                        $rootScope.Ui.turnOn('showinfo');
                        $scope.msg = "投资失败！";
                        $scope.title = "投资失败";
                    });
                }
            }
        }
        //add by wangning  2015-06-16
        $scope.showInvest = function() {
            if (isEmpty($scope.account) || isEmpty($scope.borrow) || $scope.borrow.status != 8 || $scope.borrow.uplanBorrowsIsShow == 1) {
                return false;
            }

            if (isEmpty($scope.account.balance) || isEmpty($scope.account.continueTotal) || isEmpty($scope.borrow.minTenderAccount)) {
                return false;
            }
            var balance = convertToFloat($scope.account.balance) + convertToFloat($scope.account.continueTotal);
            var minAmount = convertToFloat($scope.borrow.minTenderAccount);
            return balance >= minAmount;

        }
        //是否显示抵现红包
        $scope.ShowJujinBi = function() {
            if (isEmpty($scope.account) || isEmpty($scope.borrow)) {
                return false;
            }
            //抵现红包金额
            var coin = $scope.account.coin;
            //支持抵现红包且有抵现红包
            return $scope.borrow.supportBi==1 && !isEmpty(coin);
        }
        //是否显示加息券
        function showJujinQuan(){
            //是否可用加息券
            var supportQuan = $scope.borrow.supportQuan;
            //是否支持加息券
            if(supportQuan == 1){
                 $scope.ticketId = 0;
                //加载加息券下拉框
                var ticketUrl = $rootScope.URL_ROOT + '/ticket?type=0&pi=1&ps=60';

                var emptyTicket = {};
                emptyTicket.ticketId = "0";
                emptyTicket.name = "请选择可用加息券";
                //获取加息券列表
                service.loadRecord({
                    url: ticketUrl
                }).success(function(responseData) {
                    $rootScope.loading = false;
                    if (responseData.list) {
                        if (responseData.list.length == 0)
                            $scope.list = {};
                        else
                            $scope.list = responseData.list;
                    };
                    if (!isEmpty($scope.list) && Array.isArray($scope.list) && $scope.list.length > 0) {
                        $scope.list.unshift(emptyTicket);
                        //显示加息券
                        $scope.isShowJujinQuan = true;
                    }
                });
            }else{
                $scope.isShowJujinQuan = false;
            }
        }
        //加载标的信息
        loadBorrowAccountInfo();
    }
]);

//复制邀请链接
app.directive('inviteUrl', ['$rootScope', '$http', '$routeParams', function($rootScope,$http,$routeParams) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            //是否App过来
            var mobileFlag = $routeParams.mobile;
            $http({
                method: 'GET',
                url: $rootScope.URL_ROOT + '/inviteurl'
            }).success(function(responseData) {
                if(responseData && responseData.status){
                    if(mobileFlag == 1){
                        element.attr("href",'jsbridge://action?data={"action":"doCopy","url":"'+responseData.entity + '","flag":"可选","img": "'+$rootScope.SERVER+'/m/images/ic_launcher.png","title": "15天年化收益15%","text": "新用户首投享受15天15%年化收益"}');
                    }else{
                        element[0].onclick = function(){
                            return false;
                        };
                        element.attr("href",responseData.entity);
                    }                    
                }else{
                    console.log(responseData);
                }                   
            });
        }
    }
}]);

//邀请人列表
app.controller('inviteController', ['$rootScope', '$scope', '$routeParams','$timeout','commonService','$location',
    function($rootScope, $scope, $routeParams,$timeout,service,$location) {
        //初始化信息
        setDefaultValue($scope, $rootScope);
        //二维码图片
        $scope.qrcodeimgUrl = $rootScope.URL_ROOT + "/popularity";
        //邀请列表信息
        var inviteConfig = {
            url: $rootScope.URL_ROOT + "/invite"
        };
        //加载更多
        $scope.loadMore = function() {
            service.loadMore(inviteConfig,$scope,{
                proName: "invites"
            });
        };
        //加载邀请列表
        $scope.loadInvites = function() {
            if (isEmpty($scope.invites)) {
                service.loadPageAction(inviteConfig,$scope).success(function(response){
                    if (!isEmpty(response.entity.invets.pageCount)) {
                        $scope.totalPageCount = response.entity.invets.pageCount;
                    }
                    //邀请列表
                    if (!isEmpty($scope.invites) && Array.isArray($scope.invites)) //列表中已有元素
                    {
                        var list = response.entity.invets.list;
                        $timeout(function(){
                            $scope.invites = $scope.invites.concat(list);   
                        },10)                          
                    } else {
                        $timeout(function(){
                            $scope.invites = response.entity.invets.list;   
                        },10)                      
                    }                     
                });
            }
        };

		//20160517ZDQ
		var path = $location.path();
		var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
		var nScrollTop = 0;   //滚动到的当前位置
		var mobileFlag = $routeParams.mobile;
        if(mobileFlag == 1){
            $scope.isShow = 1;
        }else{
            $scope.isShow = 0;
        }
		$(".inviteFriends .scrollable-content").off("scroll");
		if(path.indexOf("/myInvite") != -1){
			$(".inviteFriends .scrollable-content").scrollTop(2);
		}
		$(".inviteFriends .scrollable-content").on("scroll",function(){
			nScrollHight = $(this)[0].scrollHeight;
			nScrollTop = $(this)[0].scrollTop;
			var nDivHight = $(".inviteFriends .scrollable-content").height();
			var paddingBottom = parseInt( $(this).css('padding-bottom') ),paddingTop = parseInt( $(this).css('padding-top') );
			// if(path.indexOf("/invite") != -1 && nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight){
            if(path.indexOf("/invite") != -1 && nScrollTop > 30){
				$(this).off("scroll");
				if(mobileFlag != undefined){
                    $scope.$apply(function() {  
                        $location.url("/myInvite?mobile="+mobileFlag);
                    });
				}else{
                    $scope.$apply(function() {  
                        $location.url("/myInvite");
                    });
				}
			}else if(path.indexOf("/myInvite") != -1 && nScrollTop == 0){
				$(this).off("scroll");
				if(mobileFlag != undefined){
                    $scope.$apply(function() {  
                        $location.url("/invite?mobile="+mobileFlag);
                    });
				}else{
                    //必须加apply，否则不跳转
                    $scope.$apply(function() {  
                        $location.url("/invite");
                    });
				}
			}
		});
    }
]);

//充值列表
app.controller('rechargeController', ['$rootScope', '$scope', '$http', '$location',
    function($rootScope, $scope, $http, $location) {

        $http.get($rootScope.URL_ROOT + '/atteststatus')
            .success(function(responseData) {
                if (responseData.entity.idFlg != 1) {
                    $location.url("/attest");
                }
            });

        $http.get($rootScope.URL_ROOT + '/accountinfo')
            .success(function(responseData) {
                $scope.balance = responseData.entity.balance;
            });
        $scope.recharge = function() {
			if(isNaN($scope.rechargeValue)||$scope.rechargeValue>50000 || $scope.rechargeValue<=0)
			{
				return;
			}
			else
			{
				//提交充值
				$rootScope.amout = $scope.rechargeValue;
				//跳转
				$location.url("/confrec");
			}

        };
    }
]);
//悬浮框
app.directive('draggable', ['$location', function($location) {
    return function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;
        //element= angular.element(document.getElementsByClassName("modal-dialog"));
        //鼠标按下事件
        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            element.on('mousemove', mousemove);
            element.on('mouseup', mouseup);
        });
        //触摸开始事件
        element.on('touchstart', function(event) {
            // Prevent default dragging of selected content
            //event.preventDefault();
            startX = event.targetTouches[0].pageX - x;
            startY = event.targetTouches[0].pageY - y;
            element.on('touchmove', touchmove);
            element.on('touchend', touchend);
        });
        //鼠标移动事件内容
        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }
        //触摸移动事件内容
        function touchmove(event) {
            y = event.targetTouches[0].pageY - startY;
            x = event.targetTouches[0].pageX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }
        //鼠标松起事件
        function mouseup() {
            element.off('mousemove', mousemove);
            element.off('mouseup', mouseup);
        }
        //触屏结束事件
        function touchend() {
            element.off('touchmove', touchmove);
            element.off('touchend', touchend);
        }
    };
}]);
//中秋抽奖活动
app.controller('medautumnController',['$rootScope','$scope','$http','$routeParams','commonService',
    function($rootScope,$scope,$http,$routeParams,service){
        //分页start
        var pageSize = 10;//一页显示个数
        var maxPage = 5;//最多显示页数
        var oddTimes = undefined;
        //获取抽奖次数
        $scope.getAwardNum = function(){
            $.ajax({
                url:"http://m.jujinziben.com/api/luckdraw/odd",
                dataType:"jsonp",
                success:function(data){
                    if(data.status==true){
                        //抽奖次数
                        var odd=data.entity;
                        oddTimes=data.entity.oddTimes;
                        $('.jiang-txt b').html(oddTimes);
                    }
                    else if(data.status==false && data.entity==null){
                        $('.jiang-txt b').html(0);
                        //alert("msg:"+data.msg);
                        window.location.href = $rootScope.ROOT + "#/login";
                    }
                }
            });
        }
        //显示抽奖次数
        $scope.getAwardNum();
        var click = 1; //控制在一次抽奖结束前下次点击无效
        var index; //控制的抽奖结束后效果的还原
        var time;
        var award = function(code) {
            clearInterval(time);
            click = 1;
            //奖品名称
            var text = awardText[code];
            //中奖说明
            var txt = $scope.randomMsg(awardInfo[code]);
            $("#mesBox").show();
            $("#text").html(text);
            $("#txt").html(txt);
            //获取抽奖次数
            $scope.getAwardNum();
        };
        //点击抽奖
        $(".choujiang").click(function () {
            //抽奖次数为0
            if(oddTimes==0){
                $("#mesBox").show();
                $("#text").html("您的抽奖次数为0");
                $("#txt").html($scope.randomMsg("csyj"));
                return false;
            }
            //进行判断是否抽奖完毕
            if (click != 1) {
                return;
            }
            click++;
            //抽奖完后将图片还原到初始状态
            if (index != 0) {
                $("#img16").attr("src", "/m/dist/css/img/medautumn/16.png");
                $("#img" + index).attr("src", "/m/dist/css/img/medautumn/" + index + index + ".png");
            }
            //抽奖接口
            $scope.toAward();
        });

        //点击抽奖接口
        $scope.toAward = function(){
            $.ajax({
                url:"http://m.jujinziben.com/api/luckdraw/draw",
                dataType:"jsonp",
                success:function(data){
                    if(data.status==true){
                        var draw=data.entity;
                        var code=data.entity.awardCode;
                    }else if(data.status==false && data.entity==null){
                        alert("msg:"+data.msg);
                        return;
                    }

                    var code =data.entity.awardCode;//控制抽奖的变数
                    var i = 0; //图片轮播的地方
                    var T = 1; //控制转了多少圈才停下来的变量

                    time = setInterval(function () {
                        i++;
                        //控制图片轮播的范围（13张图片）
                        if (i >16) {
                            i = 0;
                            T++;
                        };
                        index = code;
                        //此处为图片的滚动
                        $("#cj-img").attr("src", "/m/dist/css/img/medautumn/med@b.png");
                        $("#img" + i).attr("src", "/m/dist/css/img/medautumn/" + i+ ".png");
                        $("#img" + (i * 1 - 1)).attr("src", "/m/dist/css/img/medautumn/" + (i * 1 - 1) + (i *1 - 1) + ".png");
                        if (i == 0) {
                            $("#img16").attr("src", "/m/dist/css/img/medautumn/1616.png");
                            if (T >= 5) {
                                $("#img16").attr("src", "/m/dist/css/img/medautumn/1616.png");
                                $("#img" + code).attr("src", "/m/dist/css/img/medautumn/" + code + ".png");
                            }
                        }
                        //当滚动5圈后开始出奖
                        if (T >= 5) {
                            award(code);
                        }

                    }, 50);
                }
            });
        }
        //抽奖确定按钮
        $("#mesSure").click(function () {
            $("#mesBox").hide();
            //进行判断是否抽奖完毕
            $("#cj-img").attr("src", "/m/dist/css/img/medautumn/med@open.png");
            if(index != 16){
                $("#img" + index).attr("src", "/m/dist/css/img/medautumn/" + index + index + ".png");
            }
            $("#img16").attr("src", "/m/dist/css/img/medautumn/16.png");
        })

        //中奖记录描述
        var awardText = {
            "1":'恭喜您抽中iphone 6s plus 64G',
            "2": '恭喜您抽中ipad mini4',
            "3": '恭喜您抽中880元话费',
            "4": '恭喜您抽中《中国新歌声》官方授权原创 空气净化器带蓝牙音箱',
            "5": '恭喜您抽中聚金资本定制u盘',
            "10": '恭喜您抽中8元抵现红包',
            "12": '恭喜您抽中0.5%加息券一张',
            "13": '恭喜您抽中1%加息券一张',
            "14": '恭喜您抽中1.5%加息券一张',
            "15": '恭喜您抽中2%加息券一张',
            "16": '已为你加注洪荒之力,再抽一次吧',
            "17": '恭喜您抽中15元抵现红包'
        }
        //中奖信息说明
        var awardInfo = {
            "1": 'dj',
            "2": 'dj',
            "3": 'dj',
            "4": 'dj',
            "5": 'xj',
            "10": 'xj',
            "12": 'xj',
            "13": 'xj',
            "14": 'xj',
            "15": 'xj',
            "16": 'kj',
            "17": 'xj'
        }

        //随机蹦出的弹框文字语言
        var kj = new Array(
            '友情提示:这次没中不要紧,下次可先沐浴更衣斋戒三日后择良辰吉日端正坐姿后再试~',
            '听说,换小拇指更容易中奖,赶快试试!',
            '没给邻居弟弟发糖吃吧?难怪这次没中奖~~',
            '据说,今天穿得一身红才会中奖,换装再试试?',
            '黄历说,今日必有财运,难道是大奖在后面?抽抽抽,我要抽到大奖出现!',
            '听说吃碗饺子就能马上中奖，赶快试试~~'
        );

        var xj = new Array(
            '财神爷发奖发到手抽筋啦,我要再来试试~~',
            '小奖怡情,可我是冲着大奖来的~~',
            '这都中了,大奖还会远吗?',
            '为什么我又中奖了,因为我今天穿的够喜庆呀~~',
            '又中奖了,燃烧吧小宇宙~~',
            '又中奖了!传说中的吉星高照?!那赶紧再抽几把!!!',
            '哇~又中奖了!马上有奖的节奏?!',
            '今晚人人都有奖,只要你长得不特别抽象,一般人我可不告诉他~~'
        );

        var dj = new Array(
            '对,没看错,就是——你,中奖啦!',
            '大奖快到我碗里来吧'
        );

        var csyj = new Array(
            '这位亲,赶快去邀请小伙伴投资,攒攒RP吧~~',
            '青山常在,绿水长流,待得我投资完后再来释放洪荒之力!!!',
            '罢了罢了，去洗把脸梳个头，待会再来吧！'
        );

        $scope.RandomNumBoth = function(Min,Max){
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range); //四舍五入
            return num;
        }

        //可调用接口
        $scope.randomMsg = function(type){
            if(type == 'kj'){
                return kj[$scope.RandomNumBoth(0,kj.length-1)];
            }
            if(type == 'xj'){
                return xj[$scope.RandomNumBoth(0,xj.length-1)];
            }
            if(type == 'dj'){
                return dj[$scope.RandomNumBoth(0,dj.length-1)];
            }
            if(type == 'csyj'){
                return csyj[$scope.RandomNumBoth(0,csyj.length-1)];
            }
        }

        //获奖记录
        $scope.genAwardList= function(){
            $.ajax({
                url:"http://m.jujinziben.com/api/luckdraw/record",
                dataType:"jsonp",
                success:function(data){
                    var uid = data.entity.awardList;
                    //分多少个页
                    $scope.loadAwardpage(uid,pageSize);
                    $scope.genAwardPage(uid,pageSize,1);//从第一页开始
                }
            });
        }
        //生成分页数据
        $scope.genAwardPage = function(uid,pageSize,pageNum){
            //插入页面数据
            var record = "";
            //应该从第几条开始
            var formPageNum = (pageNum-1)*pageSize;
            for(var i=formPageNum,len = uid.length;i<len && i<(pageNum)*pageSize;i++){
                //获奖记录列表
                var id =uid[i].id;
                var userId=uid[i].userId;
                var phoneNumber=uid[i].phoneNumber;
                var awardCode=uid[i].awardCode;
                var awardMsg=uid[i].awardMsg;
                var quantity=uid[i].quantity;
                var isBigAward=uid[i].isBigAward;
                var winDate = uid[i].winDate;
                record = record + '<tr><td style=\"width:50%;\">'+uid[i].awardMsg+'</td><td style=\"width:50%;\">'+uid[i].winDate+'</td></tr>';
            }
            $("#recordList").html(record);
        }
        //点击按钮获取抽奖记录
        $("#jag0").click(function () {
            $scope.genAwardList();
            $("#jiangRecord").show();
        });
        $(".record-close").click(function(){
            $("#jiangRecord").hide();
        });

        //list是传入的数组（数据的数组）
        $scope.loadAwardpage = function(list,pageSize){
            var totalCount = list.length;
            var pageCount = (totalCount+(pageSize-1))/pageSize;

            $.jqPaginator('#pagination', {
                totalPages: parseInt(pageCount),
                visiblePages: parseInt(maxPage),
                currentPage: 1,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
                next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == "change") {
                        $scope.genAwardPage(list,pageSize,num);
                    }
                }
            });
        }

        $scope.loadInvestpage = function(list,pageSize){
            var totalCount = list.length;
            var pageCount = (totalCount+(pageSize-1))/pageSize;

            $.jqPaginator('#paginvest', {
                totalPages: parseInt(pageCount),
                visiblePages: parseInt(maxPage),
                currentPage: 1,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
                next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type == "change") {
                        $scope.genInvestPage(list,pageSize,num);
                    }
                }
            });
        }

        //投资详情记录+分页
        $scope.genInvestList=function(){
            $.ajax({
                url:"http://m.jujinziben.com/api/luckdraw/from",
                dataType:"jsonp",
                success:function(data){
                    var vid = data.entity;
                    //console.log(vid);
                    //分多少个页
                    $scope.loadInvestpage(vid,pageSize);
                    $scope.genInvestPage(vid,pageSize,1);//从第一页开始
                }
            });
        }
        //生成分页数据
        $scope.genInvestPage=function(vid,pageSize,pageNum){
            //插入页面数据
            var invest = "";
            //应该从第几条开始
            var formPageNum = (pageNum-1)*pageSize;
            for(var i=formPageNum,len = vid.length;i<len && i<(pageNum)*pageSize;i++){
                //投资详情列表
                var userId=vid[i].userId;
                var fromDate=vid[i].fromDate;
                var fromType=vid[i].fromType;
                var fromCondition=vid[i].fromCondition;
                var fromTimes=vid[i].fromTimes;
                invest = invest + '<tr><td style=\"width:25%;\">'+vid[i].fromDate+'</td><td style=\"width:25%;\">'+vid[i].fromType+'</td><td style=\"width:25%;\">'+vid[i].fromCondition+'</td><td style=\"width: 25%;\">'+vid[i].fromTimes+'</td></tr>';
            }
            $("#investList").html(invest);
        }
        //点击按钮获取投资详情记录
        $("#jag1").click(function () {
            $scope.genInvestList();
            $("#investOpen").show();
        });
        $(".invest-close").click(function(){
            $("#investOpen").hide();
        });

        //获取滚动抽奖记录
        $scope.newTop = function(){
            $.ajax({
                url:"http://m.jujinziben.com/api/luckdraw/scroll",
                dataType:"jsonp",
                success:function(data){
                    var scr = data.entity;
                    var tbodyHtml = "";
                    for(var i=0,len = scr.length;i<len;i++){
                        tbodyHtml = tbodyHtml + '<li><div class="tn-list-all"><div class="tn-all-lt">'+scr[i].nickName+'</div><div class="tn-all-center">'+scr[i].awardName+'</div><div class="tn-all-gt">'+scr[i].winDate+'</div></div></li>';
                    }
                    $("#addTopList").html(tbodyHtml);

                },error: function(xhr){
                    console.log(xhr);
                }
            });
        }
        $scope.newTop();
        $(function(){
            var _wrap=$('ul#addTopList');//定义滚动区域
            var _interval=600;//定义滚动间隙时间
            var _moving;//需要清除的动画
            _wrap.hover(function(){
                clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
            },function(){
                _moving=setInterval(function(){
                    var _field=_wrap.find('li:first');//此变量不可放置于函数起始处,li:first取值是变化的
                    var _h=_field.height();//取得每次滚动高度(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
                    _field.animate({marginTop:-_h+'px'},400,function(){//通过取负margin值,隐藏第一行
                        _field.css('marginTop',0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
                    })
                },_interval)//滚动间隔时间取决于_interval
            }).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动
        });
    }]);

//优惠码兑换
app.controller('codeController',['$rootScope','$scope','$http','$routeParams','commonService',
    function($rootScope,$scope,$http,$routeParams,service){
        //验证身份
        service.loadAction({
            url: $rootScope.URL_ROOT + "/promocode"
        },$scope).success(function(response){
            //登录验证url
            var validurl = response.entity && response.entity.url;
            if(validurl != undefined && validurl != ""){  
                $rootScope.loading = true;     
                validurl = decodeURIComponent(validurl);
                validurl = validurl.replace("http://192.168.0.175:8070","https://www.jujinziben.com");       
                //登录验证
                $http.jsonp(validurl+"&callback=JSON_CALLBACK").success(function(response){
                    $rootScope.loading = false; 
                    if(response.status == false){
                        $rootScope.Ui.turnOn('showinfo');
                        $scope.msg = response.msg;
                        $scope.title = "异常提示";
                        return false;
                    } 
                    //默认全部
                    $scope.genCodeList($scope.tabType);
                });
            }
        });
        //获取api基本参数
        var auth_url = "https://www.jujinziben.com/pc/auth";
        //优惠码列表类型----全部
        $scope.tabType = "allhis";
        var typeMap = {
            "allhis": "codeAll",//全部
            "unused":"unTapped",//未使用
            "used":"tapped",//已使用
            "overdue":"duePast"//已过期
        }       
        //兑换code
        $scope.exchange = function(){
            //定义code口令码
            var code= $scope.code;
            //判断code是否为空
            if(code == undefined || code ==""){
                $rootScope.Ui.turnOn('showinfo');
                $scope.msg = "请输入口令码！";
                $scope.title = "提示";
                return false;
            }
            var url = auth_url + "/redeem/exchange?callback=JSON_CALLBACK&code="+code;
            //优惠码兑换
            $http.jsonp(url).success(function(response){
                //验证返回值信息
                checkResponse($rootScope, $scope, response);
                //清空列表
                resetCodeList();
                //获取优惠码列表
                $scope.genCodeList($scope.tabType);
            }).error(function (response){
                $rootScope.Ui.turnOn('showinfo');
                $scope.msg = response;
                $scope.title = "异常提示";
            });
        }
        //获取优惠码列表
        $scope.genCodeList = function(type){
            if(type == undefined || type == null){
                return false;
            }
            genCodeListByType(type,typeMap[type]);
        }
        
        //清空列表
        function resetCodeList(){
            //全部
            $scope.codeAll= undefined;
            //未使用
            $scope.unTapped = undefined;
            //已使用
            $scope.tapped = undefined;
            //已过期
            $scope.duePast = undefined;
        }
        //默认全部
        $scope.genCodeList($scope.tabType);
        //根据类型获取优惠码列表
        function genCodeListByType(type,entityName){
            if($scope[entityName] == undefined){
                //获取优惠码url
                var url = auth_url + "/redeem/"+type+"?callback=JSON_CALLBACK&userId=4AE1D1B6816049B1";
                $http.jsonp(url).success(function(response){
                    //验证返回值信息
                    checkResponse($rootScope, $scope, response);
                    //更新列表数据
                    $scope[entityName]= response.list;
                }).error(function (e){
                    $rootScope.Ui.turnOn('showinfo');
                    $scope.msg = e || "网络异常";
                    $scope.title = "异常提示";
                });
            }            
        }       
    }]
);


//投资记录
app.controller('investController', ['$rootScope', '$scope', '$http', 'commonService','$routeParams',
    function($rootScope, $scope, $http,service, $routeParams) {
        //初始化信息
        setDefaultValue($scope, $rootScope);
        var type = $routeParams.type;

        // 默认为汇款中
        if (isEmpty(type)) {
            type = 0;
            $scope.type = type;
        } else {
            if (type == 2) {
                $scope.activeTab = 2;
                $rootScope.Ui.turnOn('button3');
            }
        }
        //投资记录参数
        var investConfig = {
            url : $rootScope.URL_ROOT + "/invest",
            params: {
                type: type
            }
        };
        //加载更多
        $scope.loadMore = function() {
            service.loadMore(investConfig,$scope,{
                proName: "invets"
            });
        };
        //加载不同状态的列表
        $scope.loadInvestByType = function(type) {
            $scope.invets = null;
            $scope.type = type;
            //切换时显示第一页
            $scope.currentPage = 1;
            investConfig.params.type = type;
            //加载列表
            service.genRecord(investConfig,$scope,{
                proName: "invets"
            });
        };
        //未加载时加载信息
        if (isEmpty($scope.invets)) {
            //加载列表
            service.genRecord(investConfig,$scope,{
                proName: "invets"
            });
        }
    }
]);

//我的消息
app.controller('messageController', ['$rootScope', '$scope','commonService','$sce',
    function($rootScope, $scope,service,$sce) {
        //初始化默认值
        setDefaultValue($scope, $rootScope);
        //消息配置
        var messageConfig = {
			url: $rootScope.URL_ROOT + "/msg"
        };
        //
        function formatMessage(msg,$sce){
        if (isEmpty(msg) || isEmpty(msg.content)) {
	            return msg;
	        }
	        msg.content = $sce.trustAsHtml("     \t\t正文：" + msg.content);
	        return msg;
	    }
		//
        $scope.loadMore = function() {
            service.loadMore(messageConfig,$scope,{
                proName: "messages"
            },formatMessage,$sce);
        };
		//
        if (typeof($scope.messages) == "undefined" || $scope.messages == null) {
            service.genRecord(messageConfig,$scope,{
                proName: "messages"
            },formatMessage,$sce);
        }
    }
]);
//回款计划
app.controller('recoveController', ['$rootScope', '$scope', 'commonService','$routeParams',
    function($rootScope, $scope,service,$routeParams) {
        //初始化默认值
        setDefaultValue($scope, $rootScope);
		//
        var borrowId = $routeParams.id;		
		//
		var recoveConfig = {
			url: $rootScope.URL_ROOT + "/recove",
			params:{
				borrowId: borrowId
			}
		};
		//
        $scope.loadMore = function() {
            service.loadMore(recoveConfig,$scope,{
                proName: "recoves"
            });
        };
		//
        if (isEmpty($scope.recoves)) {
            //
            service.genRecord(recoveConfig,$scope,{
                proName: "recoves"
            });
        }
    }
]);

//查询标详情的回款计划
app.controller('accountBorrowRecoverController', ['$rootScope', '$scope', '$http', '$routeParams',
    function($rootScope, $scope, $http, $routeParams) {

        setDefaultValue($scope, $rootScope);

        $scope.borrow_id = encodeURI($routeParams.borrow_id);

        var url = $rootScope.URL_ROOT + "/account/recover/borrow?borrow_id" + $scope.borrow_id;

        $http.get(url).success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {
                $scope.borrow_recover = response.entity;
            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
            //Handler error
        });
    }
]);

//提现
app.controller('withdrawController', ['$rootScope', '$scope', '$http', '$routeParams', '$location', '$sce',
    function($rootScope, $scope, $http, $routeParams, $location, $sce) {

        $rootScope.RETURN = "#/withdraw";
        var url = $rootScope.URL_ROOT + "/getWithDrawInfo";

        $http.get(url).success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {
                $scope.withdrawEntity = response.entity;
            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
        });

        $scope.withdraw = function() {

            if (convertToFloat($scope.amount) == 0 || convertToFloat($scope.amount) < 0) {
                $rootScope.Ui.turnOn('showinfo');
                $scope.msg = "请检查提现金额设置，金额必须大于100元。";
                $scope.title = "请检查输入";
                return false;
            }

            var entity = {};
            entity.money = $scope.amount;
            entity.cashPwd = encodeURI($scope.password);
            $rootScope.loading = true;
            $http.post($rootScope.URL_ROOT + "/withdraw", entity).success(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {
                    $rootScope.Ui.turnOn('showinfo');
                    $scope.msg = "恭喜您，提现申请已提交成功，请等待工作人员的审批。";
                    $scope.title = "提现成功";
                    //注册正常跳转至投标页面
                    $location.url("default");
                } else {
                    $rootScope.Ui.turnOn('showinfo');

                    if (!isEmpty(data.msg)) {
                        $scope.msg = data.msg;
                    } else {
                        $scope.msg = "提现过程失败，请留意金额是否发生变化，如有疑问请与客服联系。";
                    }
                    $scope.title = "提现失败";
                }

            }).error(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {}
            });

        };
    }
]);


//绑定提现银行卡
app.controller('bankcardController', function($rootScope, $scope, $http, $routeParams) {

    $rootScope.RETURN = "#/bankcard";
    var url = $rootScope.URL_ROOT + "/bank";

    $http.get(url).success(function(response) {
        if (checkResponse($rootScope, $scope, response)) {
            $scope.bankCard = response.entity;

        }
    }).error(function(response, status, headers, config) {
        checkResponse($rootScope, $scope, response);
    });

});
//收益计算器
app.controller('calcController', function($rootScope, $scope, $http, $routeParams) {

    $scope.rate = 12;
    $scope.scale = 0;
    $scope.account = 0;
    $scope.period = 12;


    $scope.rate2 = 4.4480;
    $scope.rate3 = 0.35;

    if (!isEmpty($routeParams.rate)) {
        $scope.rate = $routeParams.rate;
    }
    if (!isEmpty($routeParams.scale)) {
        $scope.scale = $routeParams.scale;
    }
    if (!isEmpty($routeParams.account)) {
        $scope.account = $routeParams.account;
    }
    if (!isEmpty($routeParams.period)) {
        $scope.period = $routeParams.period;
    }

    var tmpCapital = 5000;
    if ($routeParams.captial) {
        $scope.captial = $routeParams.captial;
        tmpCapital = $routeParams.captial;
    }

    var account = convertToFloat($scope.account);
    var rate = convertToFloat($scope.rate);
    var period = convertToFloat($scope.period);
    var reward = convertToFloat($scope.scale);

    $scope.reward = reward;

    if (reward != 0) {
        $scope.interest1 = (account + (tmpCapital * (rate + reward) * period / 1200)).toFixed(2);
    } else {
        $scope.interest1 = (account + (tmpCapital * rate * period / 1200)).toFixed(2);
    }

    $scope.interest2 = (tmpCapital * $scope.rate2 * period / 1200).toFixed(2);
    $scope.interest3 = (tmpCapital * $scope.rate3 * period / 1200).toFixed(2);


    //f.toFixed(2);
    $scope.calcInterest = function() {

        var capitalElement = document.getElementById("capitalInput");
        if (!isEmpty(capitalElement)) {
            var captial = angular.element(capitalElement).val();


            if (!isEmpty(captial) && captial != "") {

                var captialValue = parseFloat(captial);

                var interest1 = 0;


                if (reward != 0) {
                    interest1 = (account + (captialValue * (rate + reward) * period / 1200)).toFixed(2);
                } else {
                    interest1 = (account + (captialValue * rate * period / 1200)).toFixed(2);
                }

                var interest2 = (captialValue * $scope.rate2 * period / 1200).toFixed(2);
                var interest3 = (captialValue * $scope.rate3 * period / 1200).toFixed(2);


                $scope.interest1 = interest1;
                $scope.interest2 = interest2;
                $scope.interest3 = interest3;
            }
        }

    };

});

//框架控制器
app.controller('HomeController', ['$rootScope', '$scope', '$routeParams', '$location',
    function($rootScope, $scope, $routeParams, $location) {
        //图标切换
        var active = "#FF6666";
        var hover = "#B1B3B5";

        $rootScope.dl1 = {
            "icon": "active",
            "color": active
        }
        $rootScope.dl2 = {
            "icon": "hover",
            "color": hover
        }
        $rootScope.dl3 = {
            "icon": "hover",
            "color": hover
        }
        $rootScope.dl4 = {
            "icon": "hover",
            "color": hover
        }
        var activetype = {
            "icon": "active",
            "color": active
        }
        var hovertype = {
            "icon": "hover",
            "color": hover
        }

        $scope.goInvite = function() {
            $rootScope.dl1 = activetype;
            $rootScope.dl2 = hovertype;
            $rootScope.dl3 = hovertype;
            $rootScope.dl4 = hovertype;
            $location.url("/");
        };
        $scope.goInvest = function() {
            $rootScope.dl1 = hovertype;
            $rootScope.dl2 = activetype;
            $rootScope.dl3 = hovertype;
            $rootScope.dl4 = hovertype;
            $location.path("borrows");
        };
        $scope.goAccount = function() {
            $rootScope.dl1 = hovertype;
            $rootScope.dl2 = hovertype;
            $rootScope.dl3 = activetype;
            $rootScope.dl4 = hovertype;
            $location.url("default");
        };
        $scope.goAttest = function() {
            $rootScope.dl1 = hovertype;
            $rootScope.dl2 = hovertype;
            $rootScope.dl3 = hovertype;
            $rootScope.dl4 = activetype;
            $location.url("more");
        };

        $rootScope.IndexShowNav = 0;

        //显示头部
        $rootScope.ShowNav = function() {
            var path = $location.path();

            //登陆
            if (path.indexOf("login") != -1) {
                return true;
            } else if (path.indexOf("register") != -1) {//注册
                return true;
            } 
            //默认不显示
            return false;
        }
        //显示下方菜单
        $rootScope.ShowBottomNav = function() {
            var path = $location.path();

            if (path.indexOf("landing.html") != -1) {
                return false;
            } else if (path.indexOf("med") != -1) {
                return false;
            } else if (path.indexOf("own") != -1) {
                return false;
            } else if (path.indexOf("tsou") != -1) {
                return false;
            } else if (path.indexOf("questions") != -1 && $routeParams.mobile == 1) {
                return false;
            } else if (path.indexOf("contactus") != -1 && $routeParams.mobile == 1) {
                return false;
            }
            //邀请
            else if (path.indexOf("invite") != -1 && $routeParams.mobile == 1) {
                return false;
            }
            //我的邀请列表
			else if (path.indexOf("myInvite") != -1 && $routeParams.mobile == 1) {
                return false;
            }
            else if (path.indexOf("xglcreg") != -1) {
                return false;
            } else if (path.indexOf("wml") != -1) {
                return false;
            } else if (path.indexOf("calc") != -1) {
                return false;
            }
            //优惠码兑换
            else if(path.indexOf("promocode") != -1 && $routeParams.mobile == 1){
                return false;
            }
            return true;
        }

    }
]);
/**
控制器函数名称：repaymentController
参数：repayaccount
api:count/repayaccount
说明：平台还款
*-*/
app.controller('repaymentController',['$rootScope','$scope','commonService',function($rootScope,$scope,service){
    //隐藏
    $scope.showorhide=function(){
       $scope.isHide = !$scope.isHide;
    }
    //隐藏还款数据窗口
    $scope.isHide = true;

    //初始化参数
    setDefaultValue($scope);
    //还款信息
    service.loadAction({
        url: $rootScope.URL_ROOT+"/count/repayaccount"
    },$scope).success(function(response){
        $scope.repays=response.entity;
    });

    //还款参数
    var payConfig = {
        url : $rootScope.URL_ROOT+"/count/repayinfo",
    }
    //加载还款列表信息
    function loadPayList(){
        service.genRecord(payConfig,$scope,{
            proName: "repats"
        });
    }
    
    //加载更多
    $scope.loadMore = function() {
        service.loadMore(payConfig,$scope,{
            proName: "repats"
        });
    }
    //默认加载首页
    loadPayList();
  }

]);
//资金记录
app.controller('AccountLogController', ['$rootScope', '$scope', '$sce','commonService',
    function($rootScope, $scope, $sce,service) {
        //初始化数据
        setDefaultValue($scope, $rootScope);

        //获取数据参数
        var logConfig = {
            url : $rootScope.URL_ROOT + "/accountlog"
        };
        //格式化数据
        function formatAccountLog(log,$sce){
            if (isEmpty(log) || isEmpty(log.remark)) {
                return log;
            }

            log.remark = $sce.trustAsHtml(log.remark);
            return log;
        };
        //加载更多
        $scope.loadMore = function() {
            service.loadMore(logConfig,$scope,{
                proName: "logs"
            },formatAccountLog,$sce);
        };
        //获取类型
        $scope.getType = function(type) {
            switch (type) {
                case 0:
                    return "Fine";
                case 1:
                    return "Fee";
                case 2:
                    return "UnFreeze";
                case 3:
                    return "Freeze";
                default:
                    break;
            }
            return "Fine";
        };
        //未加载过数据时加载数据
        if (isEmpty($scope.logs)) {
            service.genRecord(logConfig,$scope,{
                proName: "logs"
            },formatAccountLog,$sce);
        }
    }
]);

var drawVerifyImg = function() {
    var img = document.getElementById("captcha-img");

    if (img != null) {
        document.getElementById("captcha-img").src = SERVER_ADDRESS + "/api/verify?" + (new Date).getTime();
    }
}

app.controller('BorrowMedController', ['$scope', '$rootScope', '$location', '$timeout', "$http", "$routeParams", "baseService",
    function($scope, $rootScope, $location, $timeout, $http, $routeParams, service) {

        var url = service.makeUrl("/tzj/borrow?id=" + $routeParams.id);

        service.loadEntity(url, $scope, "entity", function(response) {

            if(isEmpty(response)||isEmpty(response.entity)||isEmpty(response.entity.borrowType))
            {
                 window.location.href = SERVER_ADDRESS + "/m/jujin/#/default";
                 return;
            }
            var borrowType = trim(response.entity.borrowType);
            var borowTypes = ["2", "8", "11", "14", "15"];

            if (isEmpty(response.entity)) {
                window.location.href = SERVER_ADDRESS + "/m/jujin";
            } else if (borrowType == "7") {
                window.location.href = SERVER_ADDRESS + "/m/jujin/#/uplaninfo?id=" + $routeParams.id;
            } else if (borowTypes.indexOf(borrowType) >= 0) {
                window.location.href = SERVER_ADDRESS + "/m/jujin/#/borrowinfo?id=" + $routeParams.id;
            } else {
                window.location.href = SERVER_ADDRESS + "/m/jujin";
            }

        });
    }
]);


//投之家绑定
app.controller('TzjBindController', function($rootScope, $scope, $http, $routeParams, $location) {

    $scope.captchaerror = false;
    $scope.pwderror = false;
    $scope.captchaerror = false;

    $scope.validateStr = SERVER_ADDRESS + "/api/verify?" + (new Date).getTime();


    var tzjEntity = {};

    $scope.drawImg = function() {
        drawVerifyImg();
    };

    var properties = new Array("timestamp", "from", "service", "username", "email", "telephone", "realName", "cardNo");
    for (var i = 0; i < properties.length; i++) {
        var key = properties[i];
        tzjEntity[key] = $routeParams[key];
    }


    $http.get($rootScope.URL_ROOT + "/queryloginstatus").success(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {
            $scope.validate = data.entity;
        }
    }).error(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {}
    });

    $scope.user = {};
    //服务器返回的消息
    $scope.msg = "";
    if (!isEmpty($routeParams.account)) {
        $scope.user.userName = $routeParams.account;
        var un = document.getElementById("username");
        var unElement = angular.element(un);
        unElement.attr("readonly", "readonly");
    }
    if (!isEmpty($routeParams.channel)) {
        $scope.user.channel = $routeParams.channel;
        //渠道用户，隐藏注册和找回密码
        $(".login-c-right").css('display', 'none');
    }
    if (!isEmpty($routeParams.platUsername)) {
        $scope.user.platUsername = $routeParams.platUsername;
    }

    if (!isEmpty($routeParams.returnUrl)) {
        $scope.user.returnUrl = $routeParams.returnUrl;
    }

    $scope.findpsw = function() { //改变密码 页面ng-click
        var channel = $routeParams.channel;
        var platUsername = $routeParams.platUsername;
        var account = $routeParams.account;

        var url = "/findpsw";

        if (!isEmpty(channel)) {
            url = "/findpsw?channel=" + channel;
        }
        if (!isEmpty(platUsername)) {
            url += "&platUsername=" + platUsername;
        }
        if (!isEmpty(account)) {
            url += "&account=" + account;
        }
        $location.url(url);
    };
    $scope.login = function() {

        if (isEmpty($scope.user.userName)) {
            $scope.usernameerror = true;
            return false;
        }

        if (isEmpty($scope.user.pwd)) {
            $scope.pwderror = true;
            return false;
        }

        if (!isEmpty($scope.validate) && $scope.validate && isEmpty($scope.user.validateCode)) {
            $scope.captchaerror = true;
            return false;
        }

        $scope.user.openId = $scope.openId;
        $rootScope.loading = true;
        $scope.user.tzjUser = tzjEntity;
        $http.post($rootScope.URL_ROOT + "/tzj/bindaction", $scope.user).success(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {
                $rootScope.IS_LOGIN = true;

                $("#wusername").val(data.username);
                $("#usernamep").val(data.usernamep);
                $("#registerAt").val(data.registerAt);
                $("#type").val(data.type);
                $("#timestamp").val(data.timestamp);
                $("#sign").val(data.sign);

                $("#from").val(data.platform);
                $("#service").val(data.service);

                $("#tzjForm").submit();
            } else {
                drawVerifyImg();
                $http.get($rootScope.URL_ROOT + "/queryloginstatus").success(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {
                        $scope.validate = data.entity;
                    }
                }).error(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {}
                });
            }
        }).error(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {}
        });

    };

});

//投之家绑定改
app.controller('TzjEditBindController', function($rootScope, $scope, $http, $routeParams, $location) {
	$scope.usernameerror = false;
    $scope.captchaerror = false;
    $scope.pwderror = false;

    $scope.validateStr = SERVER_ADDRESS + "/api/verify?" + (new Date).getTime();


    var tzjEntity = {};

    $scope.drawImg = function() {
        drawVerifyImg();
    };

    var properties = new Array("username", "email", "telephone", "realName", "cardNo");
    for (var i = 0; i < properties.length; i++) {
        var key = properties[i];
        tzjEntity[key] = $routeParams[key];
    }


    $http.get($rootScope.URL_ROOT + "/queryloginstatus").success(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {
            $scope.validate = data.entity;
        }
    }).error(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {}
    });

    $scope.user = {};
    //服务器返回的消息
    $scope.msg = "";
    
 
        //渠道用户，隐藏注册和找回密码
        $(".login-c-right").css('display', 'none');

    $scope.login = function() {

        if (isEmpty($scope.user.userName)) {
            $scope.usernameerror = true;
            return false;
        }

        if (isEmpty($scope.user.pwd)) {
            $scope.pwderror = true;
            return false;
        }

        if (!isEmpty($scope.validate) && $scope.validate && isEmpty($scope.user.validateCode)) {
            $scope.captchaerror = true;
            return false;
        }

        $scope.user.openId = $scope.openId;
        $rootScope.loading = true;
        $scope.user.tzjUser = tzjEntity;
        $http.post($rootScope.URL_ROOT + "/tzj/bindeditaction", $scope.user).success(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {
                $rootScope.IS_LOGIN = true;

                $("#username").val(data.username);
                $("#usernamep").val(data.usernamep);
                $("#registerAt").val(data.registerAt);
                $("#type").val(data.type);

                $("#tzjForm").submit();
            } else {
                drawVerifyImg();
                $http.get($rootScope.URL_ROOT + "/queryloginstatus").success(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {
                        $scope.validate = data.entity;
                    }
                }).error(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {}
                });
            };
        }).error(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {}
        });

    };

});

//登录
app.controller('loginController', function($rootScope, $scope, $http, $routeParams, $location) {

    $scope.usernameerror = false;
    $scope.pwderror = false;
    $scope.captchaerror = false;

    $scope.validateStr = SERVER_ADDRESS + "/api/verify?" + (new Date).getTime();

    var openid = "";

    //在微信端已经验证通过,需要在后台认证
    if (!isEmpty($routeParams.openid) && isEmpty($scope.openId)) {
        var openid = $routeParams.openid;

        $scope.openid = openid;
        $rootScope.loading = true;
        var url = $rootScope.URL_ROOT + "/loginfromwx?id=" + openid;
        $http.get(url).success(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {
                if (data.msg == "该微信号不存在" || data.msg == "该微信号尚未绑定账号") {
                    $scope.openId = $routeParams.openid;
                } else {
                    $location.url("/");
                    //登录正常跳转自我的账户页面
                    //                  $location.path("default");
                    $rootScope.IS_LOGIN = true;
                }
            }
        }).error(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {}
        });
    }

    $scope.drawImg = function() {
        drawVerifyImg();
    };

    $http.get($rootScope.URL_ROOT + "/queryloginstatus").success(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {
            $scope.validate = data.entity;
        }
    }).error(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {}
    });

    $scope.user = {};
    //服务器返回的消息
    $scope.msg = "";
    if (!isEmpty($routeParams.account)) {
        $scope.user.userName = $routeParams.account;
        var un = document.getElementById("username");
        var unElement = angular.element(un);
        unElement.attr("readonly", "readonly");
    }
    if (!isEmpty($routeParams.channel)) {
        $scope.user.channel = $routeParams.channel;

        //渠道用户，隐藏注册和找回密码
        $(".login-c-right").css('display', 'none');
    }
    if (!isEmpty($routeParams.platUsername)) {
        $scope.user.platUsername = $routeParams.platUsername;
    }

    if (!isEmpty($routeParams.returnUrl)) {
        $scope.user.returnUrl = $routeParams.returnUrl;
    }
    $scope.findpsw = function() { //改变密码 页面ng-click
        var channel = $routeParams.channel;
        var platUsername = $routeParams.platUsername;
        var account = $routeParams.account;

        var url = "/findpsw";

        if (!isEmpty(channel)) {
            url = "/findpsw?channel=" + channel;
        }
        if (!isEmpty(platUsername)) {
            url += "&platUsername=" + platUsername;
        }
        if (!isEmpty(account)) {
            url += "&account=" + account;
        }
        $location.url(url);
    };
    $scope.login = function() {

        if (isEmpty($scope.user.userName)) {
            $scope.usernameerror = true;
            return false;
        }

        if (isEmpty($scope.user.pwd)) {
            $scope.pwderror = true;
            return false;
        }

        if (!isEmpty($scope.validate) && $scope.validate && isEmpty($scope.user.validateCode)) {
            $scope.captchaerror = true;
            return false;
        }

        $scope.user.openId = $scope.openId;
        $rootScope.loading = true;
        $http.post($rootScope.URL_ROOT + "/login", $scope.user).success(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {

                $rootScope.IS_LOGIN = true;

                if (!isEmpty(data.returnUrl)) {
                    handlerReturnUrl(data.returnUrl);
                }
				//从哪儿过来
				if (!isEmpty($routeParams.fromUrl)) {
					window.location.href = $routeParams.fromUrl;
					return;
				}
                if (!isEmpty($rootScope.RETURN) && $rootScope.RETURN != "") {
                    var retPath = $rootScope.RETURN;
                    retPath = retPath.replace("#/", "");
                    $location.url(retPath);
                } else {
                    $location.url("/");
                    //$location.url("default");
                    //$location.url("adinfo");
                }
                //登录正常跳转自用户中心页面
            } else {
                drawVerifyImg();

                $http.get($rootScope.URL_ROOT + "/queryloginstatus").success(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {
                        $scope.validate = data.entity;
                    }
                }).error(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {}
                });
            }
        }).error(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {}
        });

    };

});

function SendSms($rootScope, $http, $scope, tel, type, img) {

    var url = "";
    if (isEmpty(tel)) {
        url = $rootScope.URL_ROOT + "/sms2";
    } else {
        if (isEmpty(type)) {

            if (!isEmpty(img)) {
                url = $rootScope.URL_ROOT + "/smsverifyimg3?tel=" + tel + "&img=" + img;
            } else {
                url = $rootScope.URL_ROOT + "/smsapicode?tel=" + tel;
            }
        } else {
            if (!isEmpty(img)) {
                url = $rootScope.URL_ROOT + "/smsverifyimg3?tel=" + tel + "&img=" + img;
            } else {
                url = $rootScope.URL_ROOT + "/smsapicode?tel=" + tel;
            }
        }
    }
    var btn = document.getElementById("jm-contract-btn");
    var btnElement = angular.element(btn);

    curCount = count;
    //设置button效果，开始计时
    btnElement.attr("disabled", "true");
    btnElement.css("background-color", "gray");
    btnElement.val(curCount + "秒后重试");
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次

    $http.get(url).success(function(data, status) {

        if (data.msg == "请输入验证码" || data.msg == "验证码不正确" || data.msg == "验证码不正确") {
            window.clearInterval(InterValObj); //停止计时器
            btnElement.removeAttr("disabled"); //启用按钮
            btnElement.css("background-color", "#0caffe");
            btnElement.val("重新发送");
            code = ""; //
        }

        if (checkResponse($rootScope, $scope, data)) {

        }
    }).error(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {

        }
    });
}


function SetRemainTime(btnId) {

    var tmpBtnId = "jm-contract-btn";
    if (!isEmpty(btnId)) {
        tmpBtnId = btnId;
    }
    var btn = document.getElementById(tmpBtnId);
    var btnElement = angular.element(btn);
    if (curCount == 0) {
        window.clearInterval(InterValObj); //停止计时器
        btnElement.removeAttr("disabled"); //启用按钮
        btnElement.css("background-color", "#0caffe");
        btnElement.val("重新发送");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
    } else {
        curCount--;
        if (btnElement.css("background-color") != "gray") {
            btnElement.css("background-color", "gray");
        }
        btnElement.val(curCount + "秒后重试");
    }
}

function SetEmailTime() {
    return SetRemainTime("btnEmailVerify");
}

/*-------------------------------------------*/
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
/*-------------------------------------------*/

//注册
app.controller('registerController', function($rootScope, $scope, $http, $routeParams, $location) {

    var invite = "";

    if (isEmpty($scope.showMemo)) {
        $scope.showMemo = 1;
    }

    if (isEmpty($scope.reg)) {
        $scope.reg = {};
    }

    if ($routeParams.channel == 'xglc') {
        $scope.reg.isXglc = 1;
    }

    if (!isEmpty($routeParams.channel)) {
        $scope.reg.channel = $routeParams.channel;
    }

    if (!isEmpty($routeParams.platUsername)) {
        $scope.reg.platUsername = $routeParams.platUsername;
    }

    if (!isEmpty($routeParams.returnUrl)) {
        $scope.reg.returnUrl = $routeParams.returnUrl;
    }

    /*--2016/3/10--*/
    $scope.div_active_show = false;
    $scope.hide = function() {
        $scope.div_active_show = false;
    }
    $scope.active_show = function() {
        if ($("#active_masking").length > 0) {
            $("#active_masking").css('display', 'block');
            $scope.div_active_show = true;
        } else {
            var masking = document.createElement("div");
            masking.className = "masking-02";
            masking.style.display = "block";
            masking.id = "active_masking";

            /*var f_img = document.createElement("div");
             f_img.className = "f-img00";
             masking.appendChild(f_img);*/

            $scope.active_zone = $("#active_zone");
            $("#active_zone").remove();

            masking.appendChild($scope.active_zone[0]);
            $(document.body).append(masking);
            $scope.div_active_show = true;

            $(masking).click(function() {
                $("#active_masking").css('display', 'none');
            });
        }
    }

    $scope.validateStr = SERVER_ADDRESS + "/api/verify?" + (new Date).getTime();

    $http.get($rootScope.URL_ROOT + "/querysmsstatus").success(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {
            $scope.validate = data.entity;
        }
    }).error(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {}
    });

    $scope.ShowMemo = function() {
        if (!isEmpty($scope.showMemo) && $scope.showMemo == 1) {
            $scope.showMemo = 0;
        } else {
            $scope.showMemo = 1;
        }
    }
    $scope.showRecomm = true;
    //在微信端已经验证通过,需要在后台认证
    if (!isEmpty($routeParams.invite)) {
        var invite = $routeParams.invite;
        $scope.reg.invite = $routeParams.invite;
        $rootScope.invite = $scope.reg.invite;
        $scope.showRecomm = false;
    } else if (!isEmpty($rootScope.invite)) {
        $scope.reg.invite = $rootScope.invite;
        $scope.showRecomm = false;
    }

    if (!isEmpty($routeParams.openid)) {
        var openid = $routeParams.openid;
        $scope.reg.openId = openid;
        $rootScope.openId = openid;
    } else if (!isEmpty($rootScope.openId)) {
        $scope.reg.openId = $rootScope.openId;
    }

    $scope.drawImg = function() {
        drawVerifyImg();
    };

    //服务器返回的消息
    $scope.msg = "";

    $scope.usernameerror = false;
    $scope.pwderror = false;
    $scope.validateCodeError = false;
    $scope.pwdNotMatchError = false;
    $scope.pwdLengthError = false;

    //获取手机验证码
    $scope.getSmsCode = function() {
        $scope.usernameerror = false;

        var tel = $scope.reg.userName;
        if (!checkIsMobile(tel)) {
            $scope.usernameerror = true;
            return false;
        }
        if ($scope.validate == 1 && isEmpty($scope.reg.imgVerifyCode)) {
            return;
        }
        SendSms($rootScope, $http, $scope, tel, "r", $scope.reg.imgVerifyCode);
    }

    if (!isEmpty($routeParams.account) && checkIsMobile($routeParams.account)) {
        $scope.reg.userName = $routeParams.account;
        $scope.getSmsCode();

        var un = document.getElementById("username");
        var unElement = angular.element(un);
        unElement.attr("readonly", "readonly");
    }

    if (!isEmpty($routeParams.phone)) {
        var phone = $routeParams.phone;
        $scope.reg.userName = phone;
        $scope.getSmsCode();
    }


    $scope.clearStatus = function() {
        $scope.usernameerror = false;
        $scope.pwderror = false;
        $scope.validateCodeError = false;
        $scope.pwdNotMatchError = false;
        $scope.pwdLengthError = false;
    };

    $scope.login = function() {
        console.info($routeParams.channel);
        if (!isEmpty($routeParams.channel) && !isEmpty($routeParams.returnUrl)) {
            $location.url("login?channel=" + $routeParams.channel + "&returnUrl=" + $routeParams.returnUrl);
        } else if (!isEmpty($routeParams.account) && !isEmpty($routeParams.returnUrl)) {
            $location.url("login?account=" + $routeParams.account + "&returnUrl=" + $routeParams.returnUrl);
        } else if (!isEmpty($routeParams.channel) && !isEmpty($routeParams.account)) {
            $location.url("login?channel=" + $routeParams.channel + "&account=" + $routeParams.account);

        } else if (!isEmpty($routeParams.account)) {
            $location.url("login?account=" + $routeParams.account);
        } else {
            $location.url("login");
        }
    };

    //注册新用户
    $scope.register = function() {
        if (isEmpty($scope.reg) || (!$scope.reg)) {
            return false;
        }
        var tel = $scope.reg.userName;
        if (!checkIsMobile(tel)) {
            $scope.usernameerror = true;
            return false;
        }
        if (isEmpty($scope.reg.pwd)) {
            $scope.pwderror = true;
            return false;
        }
        if ($scope.reg.pwd.length < 6 || $scope.reg.pwd.length > 16) {
            $scope.pwdLengthError = true;
            return false;
        }
        if (!$scope.reg.agree) {
            return false;
        }
        if (isEmpty($scope.reg.validateCode)) {
            $scope.validateCodeError = true;
            return false;
        }
        if ($("#repassword").length > 0 && $("#repassword").val() != $scope.reg.pwd) {
            $scope.pwdNotMatchError = true;
            return false;
        }

        $rootScope.loading = true;
        $http.post($rootScope.URL_ROOT + "/register", $scope.reg).success(function(data, status) {
            $rootScope.loading = false;
			if(data){
				if(data.status){
					$rootScope.IS_LOGIN = true;
					if (!isEmpty(data.returnUrl)) {
						handlerReturnUrl(data.returnUrl);
						return;
					} else {
						//注册正常跳转至投标页面
						//$location.url("/");
						$location.url("/accounter");
					}
				}else{
					$rootScope.Ui.turnOn('showinfo');
					$scope.msg = data.msg;
					$scope.title = "异常提示";
					$scope.validate = 1;
				}
			}
        }).error(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {}
        });
    };
});


function getAttestStatus($rootScope, $http, $scope) {
    var getUrl = $rootScope.URL_ROOT + "/atteststatus";
    $http.get(getUrl).success(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {

            $scope.reg.mobile = data.entity.mobile;
            if (data.entity.emailFlg != 2) {
                $scope.reg.email = data.entity.email;
            }
            $scope.reg.realName = data.entity.realName;
            $scope.reg.idCard = data.entity.idCard;
            $scope.entity = data.entity;
        } else {
            $scope.msg = data.msg;
        }
    }).error(function(data, status) {
        if (checkResponse($rootScope, $scope, data)) {}
    });
}

///身份认证验证
app.controller('AttestController', ['$rootScope', '$scope', '$http', '$routeParams', '$location', '$sce', 'GlobalBorrowInfo',

    function($rootScope, $scope, $http, $routeParams, $location, $sce, borrow) {


        $scope.reg = {};
        $scope.entity = {};
        $scope.iderror = false;

        $scope.getSmsVerifyCode = function(type) {
            $scope.smsErrorStatus = false;
            var mobile = $scope.reg.mobile;
            if (!isEmpty(type) && type == 0) {
                SendSms($rootScope, $http, $scope, null);
            } else {
                if (isEmpty($scope.reg.mobile) || !(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(mobile))) {
                    $scope.smsErrorStatus = true;
                    return false;
                }
                SendSms($rootScope, $http, $scope, mobile);
            }
        };
        $scope.verifySms = function() {
            var mobile = $scope.reg.mobile;
            var code = $scope.reg.smsVerify;

            $scope.verifySmsError = false;
            if (isEmpty(mobile) || isEmpty(code)) {
                $scope.verifySmsError = true;
                return;
            }
            var checkUrl = $rootScope.URL_ROOT + "/verifySmsCode?mobile=" + mobile + "&code=" + code;
            $http.get(checkUrl).success(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {
                    getAttestStatus($rootScope, $http, $scope);
                }
            }).error(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {}
            });
        };


        $scope.changeEmail = function() {
            $scope.reg.email = "";
            $scope.entity.emailFlg = 0;
        }

        $scope.getEmailVerifyCode = function() {
            $scope.emailVerifyError = false;
            var email = $scope.reg.email;
            if (!checkIsEmail(email)) {
                $scope.emailVerifyError = true;

                $rootScope.Ui.turnOn('showinfo');
                $scope.msg = "请检查邮箱输入是否有误";
                $scope.title = "请检查";
                return;
            }
            var code = $scope.reg.smsEmailVerify;
            var url = $rootScope.URL_ROOT + "/attestemail?email=" + encodeURIComponent(email);
            if (!isEmpty(code)) {
                url += "&code=" + code;
            }
            var btn = document.getElementById("btnEmailVerify");
            var btnElement = angular.element(btn);

            curCount = count;
            //设置button效果，开始计时
            btnElement.attr("disabled", "true");
            btnElement.css("background-color", "gray");
            btnElement.val(curCount + "秒后重试");
            InterValObj = window.setInterval(SetEmailTime, 1000); //启动计时器，1秒执行一次

            $http.get(url).success(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {
                    getAttestStatus($rootScope, $http, $scope);
                }
            }).error(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {}
            });
        };

        $scope.verifyIdCard = function() {

            var name = $scope.reg.realName;
            var card = $scope.reg.idCard;

            $scope.realNameError = false;
            $scope.idCardError = false;

            var nameCheck = isValiName(name);

            if ("" != nameCheck) {
                $scope.realNameError = true;

                $rootScope.Ui.turnOn('showinfo');
                $scope.msg = nameCheck;
                $scope.title = "请检查";
                return;
            }

            var cardCheck = isCardID(card);

            if ("" != cardCheck) {
                $rootScope.Ui.turnOn('showinfo');
                $scope.msg = cardCheck;
                $scope.title = "请检查";
                return;
            }


            var cardUrl = $rootScope.URL_ROOT + "/attestrealname?name=" + name + "&card=" + card;
            $http.get(cardUrl).success(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {
                    //判断是否注册后进入
                    if($rootScope.registerEnter){
                        $location.url("/realname");
                        return;
                    }
                    getAttestStatus($rootScope, $http, $scope);

                    var channelBorrowId = (!isEmpty(borrow) && !isEmpty(borrow.borrowId)) ? borrow.borrowId : ((!isEmpty(localStorage) && !isEmpty(localStorage.getItem("CHANNEL_BORROWID")) ? localStorage.getItem("CHANNEL_BORROWID") : null));

                    if (!isEmpty(channelBorrowId)) {

                        if (!isEmpty(localStorage)) {
                            localStorage.removeItem("CHANNEL_BORROWID");
                        }
                        if (!isEmpty(borrow)) {
                            borrow.borrowId = null;
                        }

                        $location.url("borrowmed?id=" + channelBorrowId);
                    }

                }
            }).error(function(data, status) {
                if (checkResponse($rootScope, $scope, data)) {}
            });
        };
        getAttestStatus($rootScope, $http, $scope);
    }
]);
app.directive('fading', ['$timeout', '$location',
    function($timeout, $location) {
        return {
            restrict: "A",
            link: function() {
                $timeout(function() {
                    $location.url("default");
                }, 5000);
            }
        };
    }
]);
//修改密码
app.controller('changepswController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope) {

        $scope.validateStr = SERVER_ADDRESS + "/api/verify?" + (new Date).getTime();

        $scope.form1 = {
            "oldPwd": "",
            "pwd": "",
            "againPwd": "",
            "type": 0
        };
        $scope.form2 = {
            "pwd": "",
            "oldPwd": "",
            "againPwd": "",
            "validateCode": "",
            "type": 1
        };
        $scope.form3 = {
            "oldPwd": "",
            "pwd": "",
            "againPwd": "",
            "validateCode": "",
            "type": 2
        };
        var changepsw = function(data, tab) {
            $http.post($rootScope.URL_ROOT + '/changepwd', JSON.stringify(data))
                .success(function(responseData) {
                    if (responseData.msg == '请登录') {

                        $location.url("login");
                    } else if (responseData.status) {
                        if (tab === 1) {
                            $scope.show1 = true;
                            $scope.msg1 = responseData.entity;
                        } else if (tab === 2) {
                            $scope.show2 = true;
                            $scope.msg2 = responseData.entity;
                        } else {
                            $scope.show3 = true;
                            $scope.msg3 = responseData.entity;
                        }
                    } else {
                        if (tab === 1) {
                            $scope.show1 = true;
                            $scope.msg1 = responseData.msg;
                        } else if (tab === 2) {
                            $scope.show2 = true;
                            $scope.msg2 = responseData.msg;
                        } else {
                            $scope.show3 = true;
                            $scope.msg3 = responseData.msg;
                        }
                    }
                })
                .error(function(data) {});
        }
        $scope.confirm = function(tab) { //修改密码
            if (1 === tab) {
                changepsw($scope.form1, 1);
            } else if (2 === tab) {
                changepsw($scope.form2, 2);
            } else if (3 === tab) {
                changepsw($scope.form3, 3);
            }
        };
        $scope.drawImage = function() {
            $scope.msg1 = false;
            $scope.msg2 = false;
            $scope.msg3 = false;
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $("#btnSubmit1").removeAttr("disabled");
            $("#btnSubmit2").removeAttr("disabled");
            drawVerifyImg();

        };
    }
]);
//绑定银行卡----步骤
app.controller('bindbcCtrl', ['$scope', '$rootScope', '$http', '$location', 'GlobalBorrowInfo',
    //获取银行卡信息，若已经绑定银行卡了，直接跳转银行卡列表
    function($scope, $rootScope, $http, $location, borrow) {
        $http.get($rootScope.URL_ROOT + "/channel").success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {

                if (response.entity&&response.entity.cards&&response.entity.cards.length) {
                    $location.url("banklist");
                }
            }
        }).error(function(response, status, headers, config) {
            //console.log(response);
        });


        $http.get($rootScope.URL_ROOT + '/atteststatus')
            .success(function(responseData) {
                if (!responseData || !responseData.status || !responseData.entity) {
                    $location.url("login");
                } else {
                    with(responseData.entity) {
                        if (idFlg == 0 || mobileFlg == 0) {
                            $location.url("attest");
                        } else {
                            $scope.form1.username = realName;
                        }
                    }

                }

            });
        $scope.form1 = {
            "username": "",
            "cardnum": ""
        };

        $scope.form2 = {
            "cardtype": "2",
            "province": "1",
            "city": "1",
            "depositbank": ""
        };
        $scope.form3 = {
            "validcode": ""
        };

        $scope.banks = [{
            "no": 62,
            "name": "中国建设银行"
        }, {
            "no": 59,
            "name": "中国交通银行"
        }, {
            "no": 71,
            "name": "招商银行"
        }, {
            "no": 78,
            "name": "中国工商银行"
        }, {
            "no": 79,
            "name": "广发银行"
        }, {
            "no": 80,
            "name": "华夏银行"
        }, {
            "no": 81,
            "name": "平安银行"
        }, {
            "no": 82,
            "name": "浦发银行"
        }, {
            "no": 83,
            "name": "兴业银行 "
        }, {
            "no": 84,
            "name": "光大银行"
        }, {
            "no": 85,
            "name": "民生银行"
        }, {
            "no": 86,
            "name": "农业银行"
        }, {
            "no": 87,
            "name": "中国银行"
        }, {
            "no": 88,
            "name": "邮政"
        }, {
            "no": 89,
            "name": "中信银行"
        }, {
            "no": 90,
            "name": "中国银行"
        }];

        $scope.step1 = true;
        $scope.step2 = false;
        $scope.step3 = false;

        $scope.confirm = function(step) {
            if (1 == step) {
                $scope.step1 = false;
                $scope.step2 = true;
            } else if (2 == step) {
                $scope.step2 = false;
                $scope.step3 = true;
            } else if (3 == step) {
                with($scope) {
                    var data = {
                        "bankCode": form2.cardtype,
                        "branck": form2.depositbank,
                        "cardId": form1.cardnum,
                        "city": $("#city").val(), //form2.city,
                        "province": form2.province,
                        "validateCode": form3.validcode
                    };
                };
                $http.post($rootScope.URL_ROOT + '/bindcard', data)
                    .success(function(responseData) {
                        //TODO 绑定银行卡列表
                        if (responseData.status)
                            var channelBorrowId = (!isEmpty(borrow) && !isEmpty(borrow.borrowId)) ? borrow.borrowId : ((!isEmpty(localStorage) && !isEmpty(localStorage.getItem("CHANNEL_BORROWID")) ? localStorage.getItem("CHANNEL_BORROWID") : null));
                        if (!isEmpty(channelBorrowId)) {

                            if (!isEmpty(localStorage)) {
                                localStorage.removeItem("CHANNEL_BORROWID");
                            }
                            if (!isEmpty(borrow)) {
                                borrow.borrowId = null;
                            }

                            $location.url("borrowmed?id=" + channelBorrowId);
                            return;
                        } else {
                            if($rootScope.registerEnter){
                                $location.url("card");
                                return;
                            }
                            $location.url("banklist");
                            return;
                        }
                        $scope.msg = responseData.msg;
                    });
            } else if (4 == step) {
                $scope.step1 = true;
                $scope.step2 = false;
            } else if (5 == step) {
                $scope.step2 = true;
                $scope.step3 = false;
            }
        };
        //短信验证码---------------------------------------------(修改成指令)-------------------
        $scope.btnmsg = "获取手机验证码";
        $scope.disable = true;
        $scope.sendmsg = function() {

                var flag = true;
                var time = 60;
                if ($scope.disable) {
                    $scope.disable = false;
                    //发送短信
                    SendSms($rootScope, $http, $scope, $scope.form1.phone);
                    var timer = setInterval(function() {
                        if (time > 0) {
                            time--;
                            $scope.$apply(function() {
                                $scope.btnmsg = time + '秒 后重新发送';
                                $scope.disable = false;
                            });
                        } else {
                            $scope.$apply(function() {
                                $scope.btnmsg = "获取手机验证码";
                                $scope.disable = true;
                            });

                            clearInterval(timer);
                        }
                    }, 1000);

                } else {
                    //TODO 点击过了
                }
            }
            //短信验证码---------------------------------------------(修改成指令)-------------------
    }
]);
//----------------------------------二级联动下拉选项twolinkage指令---start----------------------------
app.directive('twolinkage', ['$http', function($http) {

        return {
            restrict: 'A',
            templateUrl: "twolinkage.tpl",
            replace: true,
            link: function(scope, element, attrs) {
                var init = function(responseData) {
                    for (var i = 0; i < responseData.length; i++) {
                        with(element.children()[0]) { //便利省
                            length = responseData.length;
                            options[i].text = responseData[i].name;
                            options[i].value = responseData[i].no;
                        }
                    }
                    with(element.children()[1]) { //遍历市
                        length = responseData[0].Array.length;
                        options[0].text = responseData[0].Array[0].name;
                        options[0].value = responseData[0].Array[0].no;
                    }
                };
                $http({
                    method: 'GET',
                    url: 'twolinkage.json'
                }).
                success(function(responseData) {
                    init(responseData);
                    element.children()[0].onchange = function() {
                        with(element.children()[0]) {
                            var provinceid = options[selectedIndex].value;
                        }
                        for (var i = 0; i < responseData.length; i++) {
                            if (responseData[i].no == provinceid) {
                                with(element.children()[1]) {
                                    length = responseData[i].Array.length;
                                    for (var j = 0; j < responseData[i].Array.length; j++) {
                                        options[j].text = responseData[i].Array[j].name;
                                        options[j].value = responseData[i].Array[j].no;
                                    }
                                }
                            }
                        }
                    };
                });
            }
        }
    }])
    //----------------------------------二级联动下拉选项twolinkage指令---end----------------------------
    //主页点击bar
app.directive('carousel', ['$drag',
    function($drag) {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element, attrs) {

                scope.carousel = function() {
                    if (scope.left == 0) {
                        scope.carousel_left();
                        scope.left++;
                    } else if (scope.left == 1 && scope.flag) {
                        scope.carousel_left();
                        scope.left++;
                        scope.flag = false;
                    } else if (scope.left == 1 && !scope.flag) {
                        scope.carousel_right();
                        scope.left--;
                        scope.flag = true;
                    } else if (scope.left == 2) {
                        scope.carousel_right();
                        scope.left--;
                    }
                };
                scope.carousel_left = function() {
                    $('div[carousel]>div').animate({
                        right: "+=100%"
                    }, 2000, function() {
                        $('li.current-li').removeClass('current-li').next('li').addClass('current-li');
                    });
                }
                scope.carousel_right = function() {
                    $('div[carousel]>div').animate({
                        right: "-=100%"
                    }, 2000, function() {
                        $('li.current-li').removeClass('current-li').prev('li').addClass('current-li');
                    });
                }
                scope.timer = setInterval(scope.carousel, 15000);
                //当dom元素被移除时，移除计时器
                scope.$on(
                    "$destroy",
                    function(event) {
                        clearInterval(scope.timer);
                    }
                );
            }
        };
    }
]);
// 找回密码--------------------------
app.controller('findpswCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
    function($scope, $rootScope, $http, $location, $routeParams) {
        //参数获取
        var channel = $routeParams.channel;
        var platUsername = $routeParams.platUsername;
        var account = $routeParams.account;

        $scope.form1 = {
            phone: "",
            validcode: ""
        }
        $scope.form2 = {
            psw: "",
            repsw: ""
        }

        $scope.validateStr = SERVER_ADDRESS + "/api/verify?" + (new Date).getTime();

        $http.get($rootScope.URL_ROOT + "/querysmsstatus").success(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {
                $scope.validate = data.entity;
            }
        }).error(function(data, status) {
            if (checkResponse($rootScope, $scope, data)) {}
        });


        $scope.drawImg = function() {
            drawVerifyImg();
        };

        $scope.btnmsg = "获取手机验证码";
        $scope.disable = true;

        //发送短信
        $scope.sendmsg = function() {

            var flag = true;
            var time = 30;
            if ($scope.disable) {
                $scope.disable = false;

                if ($scope.validate == 1 && isEmpty($scope.form1.imgVerifyCode)) {
                    return;
                }

                //发送短信
                SendSms($rootScope, $http, $scope, $scope.form1.phone, "r", $scope.form1.imgVerifyCode);
                //发送号码到服务器
                $http.get($rootScope.URL_ROOT + "/queryuserbymobile?tel=" + $scope.form1.phone)
                    .success(function(responseData) {

                        if (responseData.status && responseData.msg === '请输入用户名') {
                            $scope.msg = '请输入用户名';
                        } else if (!responseData.status) {
                            $scope.msg = '绑定手机不正确';
                        } else {
                            $scope.userId = responseData.entity;
                        }
                    });

                var timer = setInterval(function() {
                    if (time > 0) {
                        time--;
                        $scope.$apply(function() {
                            $scope.btnmsg = time + 's 后重新发送';
                            $scope.disable = false;
                        });
                    } else {
                        $scope.$apply(function() {
                            $scope.btnmsg = "获取手机验证码";
                            $scope.disable = true;
                        });
                        clearInterval(timer);
                    }
                }, 1000);

            } else {
                //TODO 点击过了

            }
        };
        $scope.step2 = false;
        //修改密码
        $scope.confirm = function(num) {
            var requestData = {
                "pwd": $scope.form2.psw,
                "againPwd": $scope.form2.repsw,
                "type": 0,
                "userId": $scope.userId,
                "tel": $scope.form1.phone
            };
            if (num === 1) {
                //TODO 验证短信验证码和手机数据到服务

                $http.get($rootScope.URL_ROOT + "/verifySmsCode?mobile=" + $scope.form1.phone + "&code=" + $scope.form1.validcode)
                    .success(function(responseData) {

                        if (responseData.status) {
                            //验证成功
                            $scope.step2 = true;
                        } else {
                            $scope.msg = responseData.msg;
                            $scope.step2 = false;
                        }
                    });

                $http.get($rootScope.URL_ROOT + "/querysmsstatus").success(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {
                        $scope.validate = data.entity;
                    }
                }).error(function(data, status) {
                    if (checkResponse($rootScope, $scope, data)) {}
                });

            } else { //TODO 修改密码
                $http.post($rootScope.URL_ROOT + '/changepwddirect', JSON.stringify(requestData))
                    .success(function(resposeDate) {

                        if (resposeDate.status) {
                            $scope.msg = resposeDate.entity;
                            $scope.url = "/login";
                            if (!isEmpty(channel)) { //分别判断其获取的参数是否为空
                                $scope.url = "/login?channel=" + channel;

                                if (!isEmpty(platUsername)) { //不为空的话直接+参数=空
                                    $scope.url += "&platUsername=" + platUsername;
                                }
                                if (!isEmpty(account)) {
                                    $scope.url += "&account=" + account;
                                }
                            }
                            $scope.Ui.turnOn('dialog');
                        } else {
                            $scope.msg = resposeDate.msg;
                            $scope.Ui.turnOn('dialog');
                        }
                    });
            }
        };
        $scope.close = function() {

            if ($scope.url)
                $location.url($scope.url);
        };
    }
]);
//确认充值
app.controller('confrecCtrl', ['$rootScope', '$scope', '$http', '$location', 'GlobalBorrowInfo',
    function($rootScope, $scope, $http, $location, borrow) {
        /*绑定多卡---------------start---------------------------------
        if(!$rootScope.bankcard){
            $location.url("/recharge");
        }
        $scope.bankCard = $rootScope.bankcard;
        绑定多卡-----------------end----------------------------------*/
        //绑定一卡---------------start--------------------------------
        $scope.bankcard = {
            "id": "",
            "bankCode": "",
            "bankName": "",
            "bankType": "",
            "branck": "",
            "cardId": "",
            "nickName": "",
            "type": 0,
            "userId": ""
        };

        var url = $rootScope.URL_ROOT + "/channel";
        $http.get(url).success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {
                if (!response || !response.status || !response.entity||!response.entity.cards||!response.entity.cards.length) {
                    $location.url("/bindbc");
                } else {
                    $scope.bankCard = response.entity.cards[0];
                }
            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
        });

        //绑定一卡--------------end-----------------------------------
        //充值金额
        $scope.amout = $rootScope.amout;
        var entity = {
            "cardId": $scope.bankcard.id,
            "bankId": '2',
            "rechargeAmount": $rootScope.amout,
            "rechargeOrderId": "",
            "rechargeContinue": "0"
        };
        $http.post($rootScope.URL_ROOT + "/recharge", entity)
            .success(function(data, status) {
                $scope.value = data.entity;
            }).error(function(data, status) {

            });
    }
]);

//把null转为需要的值
app.filter('isnull', [function() {
    return function(input, output) {
        if (input) {
            return input;
        } else {
            return output;
        }
    }
}]);

//把指定值转为需要的值
app.filter('replacewith', [function() {
    return function(input, output1, output2) {
        if (input === output1) {
            return output2;
        } else {
            return input;
        }
    }
}]);

//加息券列表
app.controller('ticketCtrl', ['$scope', '$location', '$rootScope', '$http',
    function($scope, $location, $rootScope, $http) {
        $scope.type = 1;
        var url = $rootScope.URL_ROOT + '/ticket?type=' + $scope.type + '&pi=1&ps=5';

        $scope.reloadData = function(num) {
            $scope.type = num;
            url = $rootScope.URL_ROOT + '/ticket?type=' + num + '&pi=1&ps=5';
        };

        $scope.$watch('type', function() {
            $http.get(url).success(function(responseData) {
                if (responseData.list) {
                    if (responseData.list.length == 0)
                        $scope.list = null;
                    else
                        $scope.list = responseData.list;
                }
            });
        });
    }
]);

function formatRedMemo($sce, msg) {
    if (isEmpty(msg) || isEmpty(msg.memo)) {
        return msg;
    }
    msg.memo = $sce.trustAsHtml(msg.memo);
    return msg;
}
//抵现红包
app.controller('myredsCtrl', ['$scope', '$location', '$rootScope', '$http', '$sce',
    function($scope, $location, $rootScope, $http, $sce) {
        setDefaultValue($scope, $rootScope);
        //加载抵现红包数据
        $scope.reloadData = function(url) {
            setDefaultValue($scope, $rootScope);
            $scope.list = [];
            getData(url);
        };
        //加载数据
        var getData = function(url) {
            $http.get($rootScope.URL_ROOT + url).success(function(responseData) {
                if (checkResponse($rootScope, $scope, responseData)) {
                    var list = responseData.list;
                    if (!isEmpty($scope.list) && Array.isArray($scope.list)) //列表中已有元素
                    {
                        list.forEach(function(item, index, array) {
                            $scope.list.push(formatRedMemo($sce, item));
                        });
                    } else {
                        $scope.list = [];
                        list.forEach(function(item, index, array) {
                            $scope.list.push(formatRedMemo($sce, item));
                        });
                    }
                }
            });
        }
    }
]);

//根据加息券切换壁纸
app.filter('cor', [function() {
    return function(input) {
        switch (input) {
            case 0.5:
                return 'orange';
                break;
            case 1:
                return 'blue';
                break;
            case 2:
                return 'green';
                break;
            default:
                return 'orange';
                break;
        }
    }
}]);


//根据加息券和抵现红包的
app.filter('rewardtype', [function() {
    return function(input) {
        switch (input) {
            case 0:
                return 'gray';
                break;
            case 1:
                return 'orange';
                break;
            default:
                return 'orange';
                break;
        }
    }
}]);

app.filter('rewardimg', [function() {
    return function(input) {
        switch (input) {
            case 0:
                return 'gray';
                break;
            case 1:
                return 'orange';
                break;
            default:
                return 'orange';
                break;
        }
    }
}]);

//绑定提现银行卡列表
app.controller('banklistCtrl', ['$rootScope', '$scope', '$http', '$location', 'baseService',
    function($rootScope, $scope, $http, $location, service) {

        var url = service.makeUrl("/bank");
        service.loadEntity(url, $scope, "bankCard");
        $scope.recharge = function() {
            $location.url("/recharge");
        };
    }
]);

//首页图片轮播
app.directive("slideBox",["$rootScope","$http",function($rootScope, $http){
	return {
		restrict: 'AE',
		template: '<div class="bd"><ul></ul></div><div class="hd"><ul></ul></div>',
		link: function(scope, iElement, iAttrs){
            var watchbanners = scope.$watch("banners",function(newVal,oldVal){               
                if(newVal != undefined){
                    //轮播图
                    var imgList = scope.banners;
                    var liList = "";
                    for(var i=0;i<imgList.length;i++){
                        liList += '<li><a target="_blank" href="'+imgList[i].url+'"><img src="'+imgList[i].img+'"></a></li>';
                    }
                    $(iElement).find("ul").html(liList);
                    TouchSlide({
                        slideCell:"#" + iAttrs.id,
                        titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                        mainCell:".bd ul",
                        effect:"leftLoop",
                        interTime: 5000,//自动运行间隔
                        delayTime: 1000,//切换效果持续时间
                        autoPage:true,//自动分页
                        autoPlay:true //自动播放
                    });
                    //释放监听
                    watchbanners();
                }                
            })			
		}
	}
}]);
//注册成功
app.controller('accoutController',['$rootScope','$scope','$location',function($rootScope,$scope,$location){
    //立即完善
    $scope.accounterNow = function(){
        $rootScope.registerEnter = true;
        $location.url("/attest");
    }
    //稍后再说
    $scope.afterAccounter = function(){
        $rootScope.registerEnter = false;
        $location.url("/default");
    }
}
]);
//文章数据列表
app.controller("artListController",["$scope","$rootScope","$location","$routeParams","commonService",
    function($scope,$rootScope,$location,$routeParams,service){    
    var typeId = $routeParams.typeId;
    //类型映射
    var typeMap = {
        "01":"常见问题",
        "05":"最新动态",
        "06":"媒体动态",
        "08":"发标公告"
    }
    $scope.title = typeMap[typeId]||"";
    //获取数据列表url
    var url = $rootScope.URL_ROOT + "/article/list?typeId="+typeId;
    var listConfig = {
        url: url
    }
    $scope.currentPage = 1;
    //加载数据列表   
    function loadList(){
        service.genRecord(listConfig,$scope,{
            proName: "list",
            totalPage : "pageCount"
        });
    }
    loadList(); 
    //加载更多 
    $scope.loadMore = function(){
        service.loadMore(listConfig,$scope,{
            proName: "list",
            totalPage : "pageCount",
            currentPage: "currentPage"
        });
    } 
}]);
//文章数据详情
app.controller("artDetailController",["$scope","$rootScope","$routeParams","$sce","commonService",
    function($scope, $rootScope, $routeParams,$sce,service){
    //文章id
    var artId = $routeParams.artId;
    //获取数据详情url
    service.loadRecord({
        url : $rootScope.URL_ROOT + "/article/detail?articleId="+artId
    }).success(function(response){
        $rootScope.loading = false;
        //文章信息
        var artInfo = response.entity;
        if(artInfo){
            $scope.artContent = $sce.trustAsHtml(artInfo.articleBody);
            $scope.articleTitle = artInfo.articleTitle;
            $scope.publishTime = artInfo.publishTime;
            $scope.author = artInfo.author;
            $scope.hits = artInfo.hits;
        }       
    }).error(function(e){
       alert("异常：" + e);
    });
}]);
/**签到场景**/
app.controller('SignController', ['$rootScope', '$scope', '$http', '$routeParams', 'SharedState', '$location', 'baseService',
    function($rootScope, $scope, $http, $routeParamsp, SharedState, $location, service) {

        var token = "";
        if (!isEmpty($routeParamsp.token)) {
            token = $routeParamsp.token;
        }

        service.initValue($scope, $rootScope);

        if (isEmpty($scope.SignInfo)) {
            $scope.SignInfo = "点击签到";
        }
        //token="628BD89B475B668E8BE2AE265DBD4E4833F391EADCB9E4DCA9F476FD1C2D401402CECC319ACF7892";
        if (isEmpty($scope.currentPage)) {
            $scope.currentPage = 1;
            $scope.totalPageCount = 1;
        }
        if (isEmpty($scope.showMask)) {
            $scope.showMask = false;
        }

        var url = "";
        if (!isEmpty(token)&&token.length>0) {
            url = service.makeUrl("/sign/get?token=" + token);
        } else {
            url = service.makeUrl("/sign/get");
        }
        //是否显示签到成功页面
        $scope.signDialog = function(status) {
            $scope.showMask = status;
        }
        //加载签到数据
        $scope.loadSingData = function() {
            service.loadEntity(url, $scope, "entity", function(response) {

                var indicate;
                var entity = $scope.entity;

                if (isEmpty($scope.details)) {
                    $scope.details = entity.lastSignDetail.list;
                }
                $scope.totalPageCount = entity.lastSignDetail.pageCount;

                if (isNaN(entity.continuityDay) || isNaN(entity.maxContinuityDay)) {
                    $scope.entity.needDay = entity.maxContinuityDay;
                }
                $scope.entity.needDay = parseInt(entity.maxContinuityDay) - parseInt(entity.continuityDay);
                if($scope.entity.needDay<0)
                {
                    $scope.entity.needDay=0;
                }
                entity.items = [];
                for (var i = 0; i < entity.maxContinuityDay; i++) {
                    var already = 1;
                    var last = 0;
                    if (i >= entity.continuityDay) {
                        already = 0;
                    }
                    if (i == entity.maxContinuityDay - 1) {
                        last = 1;
                    }
                    entity.items.push({
                        "already": already,
                        "last": last
                    });
                };
                if (entity.continuityDay >= entity.maxContinuityDay) {
                    $scope.indicate = 1;
                } else {
                    $scope.indicate = 0;
                }

            });
        }
        //签到
        $scope.sign = function() {
            var signUrl = "";
            if (!isEmpty(token)&&token.length>0) {
                signUrl = service.makeUrl("/sign/sign?token=" + token);
            } else {
                signUrl = service.makeUrl("/sign/sign");
            }
            service.loadEntity(signUrl, $scope, "sign", function(response) {
                $scope.loadSingData();
                $scope.signDialog(true);
            });
        };
        //签到明细
        $scope.signDetail = function() {
            if(!isEmpty(token)&&token.length>0)
            {
                $location.url("/signlist?token="+token);    
            }
            else
            {
                $location.url("/signlist");    
            }
            
        };
        //加载更多
        $scope.loadMore = function() {

            if ($scope.currentPage < $scope.totalPageCount) {

                $scope.currentPage = $scope.currentPage + 1;
                var detailUrl = "";
                if (!isEmpty(token)&&token.length>0) {
                    detailUrl = service.makeUrl("/sign/page?token=" + token + "&pi=" + $scope.currentPage + "&ps=10");
                } else {
                    detailUrl = service.makeUrl("/sign/page?pi=" + $scope.currentPage + "&ps=10");
                }

                service.loadEntities(detailUrl, $scope, "details", null, function(response) {
                    
                });
            }
        };

        if (isEmpty($scope.entity)) {
            $scope.loadSingData();
        }
    }
]);
//新手标
app.directive("newComer",function(){
    return{
        restrict: "AE",
        templateUrl:"/m/jujin/sc/newcomer.html"
    }
})
//车贷产品介绍
app.directive("carProduct",function(){
    return{
        restrict: "AE",
        templateUrl:"/m/jujin/sc/car.html"
    }
})
//苹果贷产品介绍
app.directive("appleProduct",function(){
    return{
        restrict:"A",
        templateUrl:"/m/jujin/sc/apple.html"
    }
})
//房产抵押产品介绍
app.directive("fcdyProduct",function(){
    return{
        restrict:"A",
        templateUrl:"/m/jujin/sc/fcdy.html"
    }
})
//车分期产品介绍
app.directive("cfqProduct",function(){
    return{
        restrict:"A",
        templateUrl:"/m/jujin/sc/cfq.html"
    }
})
//三板贷产品介绍
app.directive("sbdProduct",function(){
    return{
        restrict:"A",
        templateUrl:"/m/jujin/sc/sbd.html"
    }
})
