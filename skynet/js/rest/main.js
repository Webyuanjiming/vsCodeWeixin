(function() {
    "use strict";
	var mainApp = angular.module("jujinApp",['ngRoute','ngTable']);
	function GetQueryString(name)
	{
		var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
		var result = window.location.search.substr(1).match(reg);
		return result?decodeURIComponent(result[2]):null;
	}
	//定义全局变量---存储报表配置信息
	var JJGlobal = {};
	//路由信息配置
	mainApp.config(function($routeProvider) {
	    //报表
	    //TODO:优化配置方式
	    $routeProvider.when('/report', {
	        templateUrl: 'pages/report.html',
	        controller: "ReportCtrl",
	        controllerAs: "report"
	    });
        //存管报表补发
        $routeProvider.when('/addReissueData', {
            templateUrl: 'pages/addReissueData.html',
            controller: "addreissuedataCtrl",
            controllerAs: "addreissuedata"
        });
	    //渠道管理
        $routeProvider.when('/channel', {
	    	templateUrl: 'pages/channel.html',
	    	controller: "channelCtrl",
	        controllerAs: "channel"
	    });
        //交易结果查询
        $routeProvider.when('/personInfo', {
            templateUrl: 'pages/personInfoQuerySecond.html',
            controller: "personInfoCtrl",
            controllerAs: "personInfo"
        });
        /**-服务商银行账户余额查询-**/
        $routeProvider.when('/balanceInfo', {
            templateUrl: 'pages/balanceQuery.html',
            controller: "balanceInfoCtrl",
            controllerAs: "balanceInfo"
        });
        /**-子账户余额查询-**/
        $routeProvider.when('/subBalance', {
            templateUrl: 'pages/subBalanceQuery.html',
            controller: "subBalanceCtrl",
            controllerAs: "subBalance"
        });
        /**-交易结果查询-**/
        $routeProvider.when('/transResult', {
            templateUrl: 'pages/transResultQuery.html',
            controller: "transResultCtrl",
            controllerAs: "transResult"
        });
        /***-服务商发起风险赔付-***/
        $routeProvider.when('/riskCompensate', {
            templateUrl: 'pages/riskCompensate.html',
            controller: "riskCompensateCtrl",
            controllerAs: "riskCompensate"
        });
        /***-标的信息查询-***/
        $routeProvider.when('/bidQuery', {
            templateUrl: 'pages/bidQuery.html',
            controller: "bidQueryCtrl",
            controllerAs: "bidQuery"
        });
        /***-服务商收益划出-***/
        $routeProvider.when('/income', {
            templateUrl: 'pages/income.html',
            controller: "incomeCtrl",
            controllerAs: "income"
        });
        /**-服务商发起客户佣金派送-**/
        $routeProvider.when('/commission', {
            templateUrl: 'pages/commissionTransfer.html',
            controller: "commissionCtrl",
            controllerAs: "commission"
        });
        /**-服务商发起子账户入金-**/
        $routeProvider.when('/subrecharge', {
            templateUrl: 'pages/subrecharge.html',
            controller: "subrechargeCtrl",
            controllerAs: "subrecharge"
        });
        /**-回款补发-**/
        $routeProvider.when('/replacement', {
            templateUrl: 'pages/replacement.html',
            controller: "replacementCtrl",
            controllerAs: "replacement"
        });
        /**-对账报表-**/
        $routeProvider.when('/checkresult', {
            templateUrl: 'pages/checkresult.html',
            controller: "checkresultCtrl",
            controllerAs: "checkresult"
        });
        //优惠码管理
        $routeProvider.when('/promocode',{
            templateUrl:'pages/promocode.html',
            controller:"promoCtrl",
            controllerAs:"promocode"
        });
	    //系统设置
        $routeProvider.when('/systemlayout',{
            templateUrl:'pages/systemconfig.html',
            controller:"systemlayoutCtrl",
            controllerAs:"systemlayout"
        });
        //兑换物品查看编辑
        $routeProvider.when('/exchange',{
            templateUrl:'pages/exchange.html',
            controller:"exchangeCtrl",
            controllerAs:"exchange"
        });
        //客服工作台
        //处理页面
        $routeProvider.when('/taskProcess',{
            templateUrl:'pages/taskProcess.html',
            controller:"taskProcessCtrl",
            controllerAs:"taskProcess"
        });
        //查看页面
        $routeProvider.when('/infoDetails',{
            templateUrl:'pages/infoDetails.html',
            controller:"infoDetailsCtrl",
            controllerAs:"infoDetails"
        });
        //消息提醒页面
        $routeProvider.when('/msgNotice',{
            templateUrl:'pages/msgNotice.html',
            controller:"msgNoticeCtrl",
            controllerAs:"msgNotice"
        });
        //存管财务专用-收支明细表
        $routeProvider.when('/incomeAndExpenses',{
            templateUrl:'pages/incomeAndExpenses.html',
            controller:"incomeAndExpCtrl",
            controllerAs:"incomeAndExpenses"
        });
        //用户可用余额
        $routeProvider.when('/userAvailableBalance',{
            templateUrl:'pages/userAvailableBalance.html',
            controller:"userAvailBalCtrl",
            controllerAs:"userAvailableBalance"
        });
        /**定时任务管理**/
        //定时任务详情
        $routeProvider.when('/taskDetails',{
            templateUrl:'pages/taskDetails.html',
            controller:"taskDetailsCtrl",
            controllerAs:"taskDetails"
        });

        //定时任务维护
        $routeProvider.when('/taskMaintain',{
            templateUrl:'pages/taskMaintain.html',
            controller:"taskMaintainCtrl",
            controllerAs:"taskMaintain"
        });
		//订单管理2017-03-28
		$routeProvider.when('/mortgageOrder',{
			templateUrl:'pages/mortgageOrder.html',
			controller:"mortgageCtrl",
			controllerAs:"mortgageOrder"
		});
		//房抵贷列表详情
		$routeProvider.when('/orderdetails',{
			templateUrl:'pages/orderdetails.html',
			controller:"orderdetailsCtrl",
			controllerAs:"orderdetails"
		});
		//信用卡申请列表
		$routeProvider.when('/creditcard',{
			templateUrl:'pages/creditcardlist.html',
			controller:"creditcardCtrl",
			controllerAs:"creditcard"
		});
	});
	/**-拦截器截取处理参数-**/
	mainApp.config(function($httpProvider){
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		var param = function(obj) {
			var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
			for(name in obj) {
				value = obj[name];

				if(value instanceof Array) {
					for(i=0; i<value.length; ++i) {
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				}
				else if(value instanceof Object) {
					for(subName in value) {
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				}
				else if(value !== undefined && value !== null)
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}

			return query.length ? query.substr(0, query.length - 1) : query;
		};

		$httpProvider.defaults.transformRequest = [function(data) {
			return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
		}];
	});
	//http拦截器
	/**-拦截器处理session-**/
	mainApp.factory("httpInterceptor", ["$q", "$rootScope","$window", function ($q, $rootScope) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if (sessionStorage && sessionStorage.getItem("session")) {
					config.headers.session = sessionStorage.getItem("session");
				}
				return config;
			}
		};
	}]);
	/*mainApp.factory("httpInterceptor", [ "$q","$rootScope", function($q,$rootScope) {
		return {			
			response: function(response) {
				//响应值
				var data = response.data;
				//错误信息
				$rootScope.errorMsg = "";
				//未成功
				if(data && data.status === false){
					//未登录
					if(data.loginStatus == false){
						$rootScope.$emit("userIntercepted",response);
					}else{
						//错误信息
						$rootScope.errorMsg = "错误信息：" + data.msg;
					}
				}
				return response || $q.when(response);
			}
		};
	}]);*/
	//拦截器
	mainApp.config(['$httpProvider', function($httpProvider){
		$httpProvider.interceptors.push('httpInterceptor');
	}]);
	//主配置信息
	mainApp.run(["$rootScope","$http","$location",function($rootScope,$http,$location) {
		//默认10条
	    $rootScope.pageSize = 10;
	    $rootScope.SERVER = SERVER_ADDRESS;
	    $rootScope.URL_ROOT = SERVER_ADDRESS; //全局报表地址
	    //用户名
	    // $rootScope.username = JJToolKit.getCookie("username");
	    //未登录
	    $rootScope.$on('userIntercepted',function(){
	    	//跳转到登陆页
			//window.location.href="/eloanadmin";
		});
		//切换视图
		$rootScope.$on("$routeChangeSuccess",function(){
			//获取菜单id
			var menuId = getMenuId($rootScope.menuData,$location.url());
			if($("#menu_" + menuId) && !$("#menu_" + menuId).hasClass("active")){
				//展开上级菜单
				$("#menu_" + menuId).parents("ul").prev().removeClass("sidebar-nav-fold").addClass("sidebar-nav");
				//清楚选中
				$(".console-sidebar-leaf").removeClass("active");
				//显示选中
				$("#menu_" + menuId).addClass("active");
			}
		})
		$(document).bind("click",function(event){
			var e = event || window.event; //浏览器兼容性
			var elem = e.target || e.srcElement;
			if($(elem).hasClass("topbar-search") || $(elem).parents(".topbar-search").length > 0){
				return false;
			}else{
				$(".search-dropdown").hide();
			}
		});
		/**logo**/
		var $this=$(".jujin-console-logo");
		$this.hover(function() {
			$(this).addClass("three-d");
		}, function() {
			$(this).removeClass("three-d");
		});
	}]);
	//顶部菜单控制器
	mainApp.controller("topbarController",["$rootScope",'$scope','commonService',function($rootScope,$scope,service){
		//退出系统
		$scope.logout = function (){
			service.loadRecord({
				url : $rootScope.URL_ROOT + "/logout?callback=JSON_CALLBACK",
				method: "JSONP"
			}).success(function (response) {
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//TODO
				if(response.status == true){
					//跳转到登陆页
					window.location.href="/eloanadmin";
				}
			});
		}
		//搜索菜单
		$scope.searchMenu = function($event){
			//阻止冒泡
			$event && $event.stopPropagation();
			//搜索菜单值
			var searchValue = $scope.searchValue;
			var newList = [];
			if(searchValue == undefined || $.trim(searchValue) == ""){
				newList = $rootScope.leafMenuData;
			}else{
				angular.forEach($rootScope.leafMenuData,function(menuData, key) {
					if(menuData.name.indexOf(searchValue) > -1){
						newList.push(menuData);
					}
				});
			}
			$scope.leafMenuList = newList;
			//重置搜索状态
			$scope.searchFlag = true;
			$(".search-dropdown").show();
		}
		//重置搜索菜单
		$scope.resetSearchMenu = function(){
			//清空搜索值
			$scope.searchValue = "";
			//清空菜单搜索结果
			$scope.leafMenuList = $rootScope.leafMenuData;
			//重置搜索状态
			$scope.searchFlag = false;
		}
		//重置搜索状态
		$scope.searchFlag = false;
		//叶子菜单列表
		$scope.leafMenuList = $rootScope.leafMenuData;
	}]);
	//左侧菜单控制器
	mainApp.controller("mainSlidebarCtrl",["$rootScope","$http","$scope",function($rootScope,$http,$scope){
		var menuUrl = "data/menu.json";
		/*$scope.paremsMenu={};
		$scope.paremsMenu.session=JJToolKit.getQueryString("session"),
		$scope.paremsMenu.source="webmanage";
		//RSA加密
		$rootScope.encrypt=encrypt;
		var public_key="-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA59nmWjcxRXSzaTuCcSZPRjzdBESaYeaXZUNBNapiMo40/AIExg64pg1uLcHBDtLZBcCHecuZe43UpRpTje4GvldeP7GjhHkgEmWDKz3ic8QrMrRwpaIuLnS8EfWuir0J3WNtlbKsThJ5f7P6gRFYwLXYPuwJQQppSc12G3zFZZvURDIIHhWvEoSRdVM1oT9bQ66bPXRkDtNr4V915dyK3OS4Gn8k+NuJPfKlBaJ3wjxlchlYDsfck2sTkIBoAdGjASEFILtlcJfPwIM5mYG7Z98XVbX7e6261wbfCE9KSda+QNDPrWG3Xl7bdHflc9f4lAfWaD92XxCpGcCIrBtSDuZ8JUM20ubB6XUbpafO4oUfuX0ctrANsTG+NAbN3PgCL3xsbIRwKq1q/9YEYXJW3ojVQwj+fR8YzYEhK+F9IKRuGMuTM09RNqtF/Yb9gr97VK6yssS6MNFqGkyyqO2uIG3E9/CoTi6+NfE8rsAs+hvGLR1z4ZllqCqkKwBJrQ+U1xaOKCvA73Vuw8XSwfJ5176e34NdZlbs6AT0tkxcr/P79vma7HX5xrHrfL45mrWQ90KIMMNIpZob0+AqdzpO3Y6tCIoEjSD5+lJqWLacP6DAKq/VHfdGd9bIa7IJvVQyEkXV0SkYWgo+u2MzM1fcaD+1Hl7PRo5LtTZrnkVH/lcCAwEAAQ==-----END PUBLIC KEY-----";
		encrypt.setPublicKey(public_key);
		$scope.enPrams = encrypt.encrypt(JSON.stringify($scope.paremsMenu));
		//加密结果
		$http({
			method:"POST",
			url:SERVER_ADDRESS + "/system/menu/",
			data:{
				parmater:$scope.enPrams
			},
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
				'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
			},
		}).success(function (response) {
			if(response.status=="200"){
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				var resData = [];
				//var navList = response.data.split("|");
			/!*for(var i=0,len=navList.length;i<len;i++){
					var jsonData = JSON.parse(navList[i]);
					resData = resData.concat(jsonData.navData);
				}*!/
				//转成json对象
				//var resData = JSON.parse(response.data);
				var resData = response;
				//菜单数据
				$rootScope.menuData = resData.data;
				$scope.menuList = resData.data;
				//$rootScope.menuData = resData;
				//$scope.menuList = resData;
				//获取叶子节点信息
				//$rootScope.leafMenuData = [];
				//genLeafMenu($rootScope.menuData,$rootScope.leafMenuData);
			}else if(response.status=="208"){
				window.location.href="./login/login.html";
			}
		});*/

		//var menuUrl = "";
		$http.get(menuUrl).success(function(response) {
			if($rootScope.errorMsg){
				alert($rootScope.errorMsg);
				return false;
			}
			var resData = [];
			//var navList = response.data.split("|");
			/*for(var i=0,len=navList.length;i<len;i++){
				var jsonData = JSON.parse(navList[i]);
				resData = resData.concat(jsonData.navData);
			}*/
			//转成json对象
			//var resData = JSON.parse(response.data);
			var resData = response;
			//菜单数据
			$rootScope.menuData = resData.navData;
			$scope.menuList = resData.navData;
			//$rootScope.menuData = resData;
			//$scope.menuList = resData;
			//获取叶子节点信息
			//$rootScope.leafMenuData = [];
			//genLeafMenu($rootScope.menuData,$rootScope.leafMenuData);
		});
	}]);
	//生成菜单
	function genMenuHtml($compile,scope,menuList,retHtml,menuLevel){	
		var level = menuLevel;	
		for(var i=0;i<menuList.length;i++){	
			level = menuLevel;	
			var newScope = scope.$new(true);
				newScope.item = menuList[i];	
			//叶子节点
			if(menuList[i].children == undefined || menuList[i].children.length == 0){	
				var leafMenu = $compile('<li class="console-sidebar-leaf" id="menu_'+ menuList[i].menuId +'" leaf-menu item="item"></li>')(newScope);	
				retHtml.append(leafMenu);	
			}else{//非叶子节点
				var notList = $('<li id="menu_'+ menuList[i].menuId +'"></li>');
				retHtml.append(notList);
				var notLeafMenu = $compile('<div not-leaf-menu item="item" class="console-sidebar-header" ng-class="{true:\'sidebar-nav\',false:\'sidebar-nav-fold\'}[item.expanded]"></div>')(newScope);
				notList.append(notLeafMenu);
				var childList = $('<ul class="slidebar-chid-'+level+'"></ul>');
				notList.append(childList);
				level++;	
				genMenuHtml($compile,scope,menuList[i].children,childList,level);				
			}
		}							
	}
	//左侧菜单
	mainApp.directive("jujinMainSidebar",["$rootScope","$http","$compile",function($rootScope,$http,$compile){
		return {
			restrict: "A",
			controller:"mainSlidebarCtrl",
			templateUrl: "pages/directives/menu.html",
			link:function(scope, element, attrs){
			 	//菜单栏切换
			 	scope.toggleSidebarStatus = function(){
			 		element.toggleClass("console-sidebar").toggleClass("console-sidebar-role");
			 		angular.element(".viewFramework-body").toggleClass("viewFramework-sidebar-mini");
			 	}
			 	//是否获取到菜单值
			 	var menuWatch = scope.$watch('menuList',function(newVal,oldVal){
			 		if(newVal!=undefined){
			 			var menuHtml = element.find("ul");			
						var menuLevel = 2;
						//生成左侧菜单
						genMenuHtml($compile,scope,scope.menuList,menuHtml,menuLevel);
						menuWatch();
			 		}
			 	});		 
			 }
		}
	}]);
	//叶子菜单
	mainApp.directive("leafMenu",[function(){
		return {
			restrict: "A",
			templateUrl: "pages/directives/leafMenu.html",
			scope: {
				item: "="
			},
			link: function(scope, element, attrs){
			 	element.click(function(){
			 		//展开父级节点
			 		$(element).parents("ul").prev().removeClass("sidebar-nav-fold").addClass("sidebar-nav");
					//将其他父节点清除
					$(".console-sidebar-header").removeClass("active");
			 		//将其他选中节点清除
			 		$(".console-sidebar-leaf").removeClass("active");
			 		//选中当前节点
					$(element).addClass("active")					
			 	});
			}	
		}
	}]);
	//非叶子菜单
	mainApp.directive("notLeafMenu",[function(){
		return {
			restrict:"A",
			templateUrl: "pages/directives/notLeafMenu.html",
			scope: {
				item: "="
			},
			link: function(scope, element, attrs){
				//父菜单折叠隐藏
			 	element.click(function(){
			 		element.toggleClass("sidebar-nav-fold").toggleClass("sidebar-nav");
					//将其他选中节点清除
					$(".console-sidebar-header").removeClass("active");
					//将其他子节点清除
					$(".console-sidebar-leaf").removeClass("active");
					//选中当前节点
					$(element).addClass("active")
					if(element.$$hashKey=="object:123"){
                      console.log("dfsdf");
                  }
			 	});
			}
		}
	}]);
	//通用服务
	mainApp.factory("commonService",["$http","$rootScope",function($http,$rootScope){
	    var service = {};
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
	                rowCount: $rootScope.PAGE_SIZE,//所需条数
	                rowStart: 1//起始页数
	            }
	        }
	        config.params = angular.extend(httpConfig.params,config.params);
	        // delete config.params;
	        //获取数据
	        return service.loadRecord(config);
	    }
	    return service;
	}]);
	//获取基础数据
	mainApp.service("baseService",["$rootScope","commonService",function($rootScope,commonService){
		var service = {};
		var area = undefined,channel = undefined,kefu=undefined;
		//地区
		service.genAreas = function(scope){
			if(area == undefined){
				commonService.loadRecord({
					url: "/eloanadmin/domain/query?key=area"		
				}).success(function(data){
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
					if(data.entity && data.entity.area){
						scope.areas = data.entity.area;
					}
				});
			}else{
				scope.areas = area;
			}			
		}
		//渠道
		service.genChannel = function(scope){
			if(channel == undefined){
				commonService.loadRecord({
					url: "/eloanadmin/domain/query?key=channel"		
				}).success(function(data){
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
					if(data.entity && data.entity.channel){
						scope.channels = data.entity.channel;
					}
				});
			}else{
				scope.channels = channel;
			}			
		}
		//客服
		service.genKefu = function(scope){
			if(kefu == undefined){
				commonService.loadRecord({
					url: "/eloanadmin/domain/query?key=kefu"		
				}).success(function(data){
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
					if(data.entity && data.entity.kefu){
						scope.kefus = data.entity.kefu;
					}
				});
			}else{
				scope.kefus = kefu;
			}			
		}
		return service;
	}]);
	/**-location-获取参数的拦截器-**/
	mainApp.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode({
			enabled:false,
			requireBase:false
		});
	}]);
	/**2018-04-10**/
	//订单管理
	mainApp.controller("mortgageCtrl",["$location","$filter","$rootScope","$scope","NgTableParams","commonService","dialogService",
		function($location,$filter,$rootScope,$scope,NgTableParams,service,dialog){
			var self = this;
			//当前页
			$scope.currentPage = 1;
			//每页显示条数
			$scope.curPerPage = 15;
			//口令状态
			var codeStatus = [{
				id:"0",
				name:"全部订单"
			},{
				id:"1",
				name:"待上传资料"
			},{
				id:"2",
				name:"待付定金"
			},{
				id:"3",
				name:"待审核"
			},{
				id:"4",
				name:"待付评估费"
			},{
				id:"5",
				name:"待抵押"
			},{
				id:"6",
				name:"待确认"
			},{
				id:"7",
				name:"待评价"
			},{
				id:"8",
				name:"待完成"
			}];
			//获取活动信息
			/*var genActivities = function(scope){
				if($scope.activities){
					scope.activities = $scope.activities;
				}else{
					var url = $rootScope.URL_ROOT + "/redeem/activity?callback=JSON_CALLBACK";
					service.loadRecord({
						url : url,
						method: "JSONP"
					}).success(function(response){
						if($rootScope.errorMsg){
							alert("活动信息："+$rootScope.errorMsg);
							return false;
						}
						//列表
						scope.activities = response.list;
						$scope.activities = response.list;
					}).error(function(e){
						alert("异常:"+e);
					});
				}
			}*/
			//获取渠道信息
			/*var genChannels = function(scope){
				if($scope.channels){
					scope.channels = $scope.channels;
				}else{
					var url = $rootScope.URL_ROOT + "/channel/select?callback=JSON_CALLBACK";
					service.loadRecord({
						url : url,
						method: "JSONP"
					}).success(function(response){
						if($rootScope.errorMsg){
							alert("渠道信息："+$rootScope.errorMsg);
							return false;
						}
						//列表
						scope.channels = response.list;
						$scope.channels = response.list;
					}).error(function(e){
						alert("异常:"+e);
					});
				}
			}*/
			//获取兑换物品信息
			/*var genGoods = function(scope){
				if($scope.goods){
					scope.goods = $scope.goods;
				}else{
					var url = $rootScope.URL_ROOT + "/award/select?callback=JSON_CALLBACK";
					service.loadRecord({
						url : url,
						method: "JSONP"
					}).success(function(response){
						if($rootScope.errorMsg){
							alert("兑换物品信息："+$rootScope.errorMsg);
							return false;
						}
						//列表
						scope.goods = response.list;
						$scope.goods = response.list;
					}).error(function(e){
						alert("异常:"+e);
					});
				}
			}*/
			//口令状态
			$scope.codeStatus = codeStatus;
			//获取分页数据----更新数据
			var url = $rootScope.URL_ROOT +"/order";
			function updataPageRecord(url,params){
				//加载中
				JJToolKit.mask($(".main-cont"));
				service.loadRecord({
					url : url+"?page="+$scope.currentPage+"&ps="+$scope.curPerPage,
				}).success(function(response){
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
					//刷新
					$scope.list = response.data.dataList;
					//数据总数
					$scope.totalNum = response.data.total;
				}).error(function(e){
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					alert("异常:"+e);
				});
			}
			//updataPageRecord(url);
			//全选
			$scope.selectAll = function(selected){
				angular.forEach($scope.list,function(item){
					item.selected = selected;
				});
			}
			self.selected = false;
			//搜索
			$scope.proQuery = function(){
				if(isEmpty($scope.codeStatus[$scope.order_st])){
					$scope.coder="";
				}else{
					$scope.coder=$scope.codeStatus[$scope.order_st].name;
				}
				if(isEmpty($scope.keyword)){
					$scope.keyword="";
				}
				if(isEmpty($scope.aftersale)){
					$scope.aftersale="";
				}
				//当前页
				$scope.currentPage = 1;
				//每页显示条数
				$scope.curPerPage = 15;
				var proUrl=url+"?page="+$scope.currentPage+"&ps="+$scope.curPerPage+"&startTime="+$("#start_time").val()+"&endTime="+$("#end_time").val()+"&orderStatus="+$scope.coder
					+"&aftersale="+$scope.aftersale+"&keyword="+$scope.keyword;
				//加载中
				JJToolKit.mask($(".main-cont"));
				//查询加载
				var queryLoad = true;
				service.loadRecord({
					url:proUrl
				}).success(function (response) {
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
					//数据总数
					$scope.totalNum = response.data.total;
					//表格
					self.tableParams= new NgTableParams({
							count: $scope.curPerPage
						},
						{
							total: $scope.totalNum,
							counts: 0,
							paginationMaxBlocks: 8,
							getData: function(params){
								//重置全选
								self.selected	= false;
								//当前页
								$scope.currentPage = params.page();
								//排序字段，排序方式
								var orderField = "",orderType = "";
								for (var key in params.sorting() ) {
									orderField = key;
									orderType = params.sorting()[key];
								}
								//重新排序
								if(orderField && params.sorting() != preOrder){
									preOrder = params.sorting();
									//获取过全部数据
									if($scope.list.length == $scope.totalNum){
										//排序

									}else{
										//更新数据
										updataPageRecord(url);
									}
								}else{
									if(queryLoad){
										queryLoad = false;
										//数据信息
										$scope.list = response.data.dataList;
									}else{
										//更新数据
										updataPageRecord(url);
									}
								}
								return $scope.list;
							}
						});
				}).error(function(e){
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					alert("异常:"+e);
				});
			}
			//导出
			$scope.proExport = function(){
				var exportUrl=$rootScope.URL_ROOT+"/order/excel";
				window.location.href=exportUrl+"?startTime="+$("#start_time").val()+"&endTime="+$("#end_time").val()+
					"&orderStatus="+$scope.coder+"&aftersale="+$scope.aftersale+"&keyword="+$scope.keyword;
			}
			//添加
			/*$scope.proAdd = function(){
				//弹出窗口
				dialog.showDialog($scope,{
					templateUrl:"pages/promocodeAdd.html",
					title:"生成优惠码信息",
					buttons:[{
						handler: function(scope,windowCont){
							var dialog = angular.element(windowCont).find(".modal-dialog");
							//保存中
							JJToolKit.mask(dialog);
							//口令有效期
							var code_expirydate = form.code_expirydate.value;
							if(code_expirydate == undefined || code_expirydate == ""){
								scope.no_code_expirydate = true;
								return false;
							}
							var params = scope.formData;
							//口令有效期
							params.code_expirydate = code_expirydate;
							params = JSON.stringify(params) || "";
							service.loadRecord({
								url : $rootScope.URL_ROOT + "/redeem/createpromocode?callback=JSON_CALLBACK&param="+params,
								method: "JSONP"
							}).success(function(response){
								JJToolKit.unmask(dialog);
								if($rootScope.errorMsg){
									alert($rootScope.errorMsg);
									return false;
								}
								//关闭窗口
								scope.close();
								//刷新列表
								$scope.proQuery();
							}).error(function(e){
								JJToolKit.unmask(dialog);
								alert("异常:"+e);
							});
						},
						selectDisabled:"form.$invalid",
						label: "确定",
						cssClass: "btn-primary"
					},{
						label: "取消",
						cssClass: "btn-default"
					}],
					callback: function(scope){
						//口令类型
						scope.comdType = comdType;
						//渠道
						genChannels(scope);
						//兑换物品
						genGoods(scope);
						//活动
						genActivities(scope);
						//生成数量
						scope.formData.num = 1;
						//选择物品---物品类型
						scope.changeGoods = function(){
							//兑换物品
							var goodid = scope.formData.goods;
							var curGood = _.findWhere(scope.goods, {id: goodid});
							//兑换物品类型
							var type = curGood.type;
							//加息券
							if(type == "2"){
								var temp = angular.copy(comdType);
								//删除限额
								temp.splice(1,1);
								scope.comdType = temp;
							}else if(type == "3"){//vip
								var temp = angular.copy(comdType);
								//删除限额、限次
								temp.splice(1,2);
								scope.comdType = temp;
							}else{
								//口令类型
								scope.comdType = comdType;
							}
						}
					}
				});
			};*/
			//修改
			/*$scope.proEdit = function(code){
				//弹出窗口
				dialog.showDialog($scope,{
					templateUrl:"pages/promocodeUpdate.html",
					title:"修改优惠码信息",
					buttons:[{
						handler: function(scope,windowCont){
							var dialog = angular.element(windowCont).find(".modal-dialog");
							//保存中
							JJToolKit.mask(dialog);
							//口令有效期
							var code_expirydate = form.code_expirydate.value;
							if(code_expirydate == undefined || code_expirydate == ""){
								scope.no_code_expirydate = true;
								return false;
							}
							var params = scope.formData;
							//口令有效期
							params.code_expirydate = code_expirydate;
							params = JSON.stringify(params) || "";
							service.loadRecord({
								url : $rootScope.URL_ROOT + "/redeem/update?callback=JSON_CALLBACK&param="+params,
								method: "JSONP"
							}).success(function(response){
								JJToolKit.unmask(dialog);
								if($rootScope.errorMsg){
									alert($rootScope.errorMsg);
									return false;
								}
								//关闭窗口
								scope.close();
								//刷新列表
								$scope.proQuery();
							}).error(function(e){
								JJToolKit.unmask(dialog);
								alert("异常:"+e);
							});
						},
						selectDisabled:"form.$invalid",
						label: "确定",
						cssClass: "btn-primary"
					},{
						label: "取消",
						cssClass: "btn-default"
					}],
					callback: function(scope){
						//口令类型
						scope.comdType = comdType;
						//发放状态
						scope.usedStatus = usedStatus;
						//兑换物品
						genGoods(scope);
						//获取优惠码信息
						service.loadRecord({
							url : $rootScope.URL_ROOT + "/redeem/getpromocode?callback=JSON_CALLBACK&code="+code,
							method: "JSONP"
						}).success(function(response){
							if($rootScope.errorMsg){
								alert($rootScope.errorMsg);
								return false;
							}
							scope.formData = response.entity;
							//口令有效期
							var code_expirydate = response.entity.code_expirydate;
							scope.formData.code_expirydate = $filter('date')(code_expirydate,'yyyy-MM-dd');
						}).error(function(e){
							alert("异常:"+e);
						});
					}
				});
			};*/
			//发放
/*			$scope.proGrant = function(){
				//获取选中行的口令
				var codes = "";
				angular.forEach($scope.list,function(item){
					if(item.selected == true){
						codes += item.code + ",";
					}
				});
				//未选中
				if(codes == ""){
					alert("请选择要发放的记录！");
					return false;
				}else{
					codes = codes.substring(0,codes.length-1);
				}
				if(confirm("您确认要发放选中的信息吗？")){
					service.loadRecord({
						url : $rootScope.URL_ROOT + "/redeem/send?callback=JSON_CALLBACK&param="+codes,
						method: "JSONP"
					}).success(function(response){
						if($rootScope.errorMsg){
							alert($rootScope.errorMsg);
							return false;
						}
						//刷新列表
						$scope.proQuery();
					}).error(function(e){
						alert("异常:"+e);
					});
				}
			}*/
			//删除
			/*$scope.proDelete = function(){
				//获取选中行的口令
				var codes = "";
				angular.forEach($scope.list,function(item){
					if(item.selected == true){
						codes += item.code + ",";
					}
				});
				//未选中
				if(codes == ""){
					alert("请选择要删除的记录！");
					return false;
				}else{
					codes = codes.substring(0,codes.length-1);
				}
				if(confirm("您确认要删除选中的信息吗？")){
					service.loadRecord({
						url : $rootScope.URL_ROOT + "/redeem/delete?callback=JSON_CALLBACK&param="+codes,
						method: "JSONP"
					}).success(function(response){
						if($rootScope.errorMsg){
							alert($rootScope.errorMsg);
							return false;
						}
						//刷新列表
						$scope.proQuery();
					}).error(function(e){
						alert("异常:"+e);
					});
				}
			}*/
			/**待操作**/
			$scope.operating=function () {
				
			}
			/**售后**/
			$scope.afterMarket=function () {
				$scope.aftersale="1";
				$scope.proQuery();
			}
			/**订单详情**/
			$scope.orderDetail=function (order_id) {
				$location.url("/orderdetails?order_id="+order_id);
			}
		}]);
	//单一的模态弹窗窗口service
	mainApp.factory("cpmService",["$document","$compile","$q","$templateCache","$http","$rootScope",
		function($document,$compile,$q,$templateCache,$http,$rootScope){
			var cpm = {};
			//获取html
			function genHtml(settings) {
				return settings.template ? $q.when(settings.template) : $http.get(settings.templateUrl, {
					cache: $templateCache
				}).then(function(response) {
					return response.data;
				})
			}
			//打开窗口
			cpm.open = function(settings){
				var $body = $document.find("body").eq(0);
				//创建新的子作用域
				var newScope = $rootScope.$new(true);
				newScope.index = $(".modal-backdrop").length;
				//遮罩层
				var backdrop = $compile("<div modal-backdrop></div>")(newScope);
				$body.append(backdrop);
				var $window = angular.element("<div modal-window style=top:30%;></div>");
				$window.attr("window-class", settings.windowClass);
				$window.attr("index", $(".modal-window").length);
				$window.attr("animate", "animate");
				//添加窗口框架
				var content = '<div class="modal-header"><button type="button" class="close" ng-click="close(false)">×</button>'
					+'<h5 class="modal-title">{{title}}</h5></div>'+
					'<div class="modal-body clearfix row">'+settings.content+'</div>';
				$window.html(content);
				//创建新的子作用域
				var contScope = settings.scope.$new(true);
				//标题
				contScope.title = settings.title;
				//关闭窗口
				contScope.close=function(){
					backdrop.remove();
					windowCont.remove();
					$body.removeClass("modal-open");
				}
				var windowCont = $compile($window)(contScope);
				//弹出窗口
				$body.append(windowCont);
				$body.addClass("modal-open");
			}
			//显示窗口
			cpm.showDialog = function(scope,settings){
				//获取内容html
				genHtml(settings).then(function(response){
					cpm.open({
						//作用域
						scope:scope,
						//窗口内容
						content: response,
						//自定义窗口样式
						windowClass:settings.windowClass,
						//窗口标题
						title:settings.title
					});
				});
			}
			return cpm;
		}]);
	//房抵贷订单详情
	mainApp.controller("orderdetailsCtrl",["$location","$rootScope","$http","$scope","commonService","cpmService",
		function($location,$rootScope,$http,$scope,service,cpm){
			//详情接口
			var detailsUrl=$rootScope.URL_ROOT+"/order/detail";
			//加载中
			JJToolKit.mask($(".main-cont"));
			//判断输入的字数是否是28个以上
			$scope.myKey=function () {
				var textArea=$("textarea[name='d1']").val();//文本区域内容
				var tArea=$.trim(textArea);//去掉文本内容第一个和最后一个的空格字符
				$scope.tArea=tArea;
			}
			//保存备注
			$scope.remarks=function () {
				//备注接口
				var remarksParams={
					"orderId":$location.search().order_id,
					"info":$scope.tArea
				}
				var remarksUrl=$rootScope.URL_ROOT+"/order/info";
				service.loadRecord({
					url : remarksUrl,
					method:"POST",
					data: remarksParams
				}).success(function(response){
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					if(response.status=="200"){
						//弹出窗口
						cpm.showDialog($scope,{
							templateUrl:"pages/dialog.html",
							title:"温馨提示:",
								handler: function(scope,windowCont){
									var dialog = angular.element(windowCont).find(".modal-dialog");
									//关闭窗口
									scope.close();
								}
						});
						$("textarea[name='d1']").val("");
					}
					$(".modal-footer").hide();
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
				});
			}
			service.loadRecord({
				url : detailsUrl+"?orderId="+$location.search().order_id,
			}).success(function(response){
				//加载完成
				JJToolKit.unmask($(".main-cont"));
				if(response.status=="200"){
					/**房产证+不动产-图片列表**/
					$scope.attachments=response.data.attachments;
					/**订单状态进度**/
					$scope.progress=response.data.progress;
					/*for(var i=0;i<$scope.progress.length;i++){
						console.log($scope.progress[i].order_state);
					}*/
					/**订单状态**/
					$scope.order_status=response.data.order_status;
					/**订单详情**/
					$scope.particulars=response.data;
					/**支付记录**/
					$scope.paysList=response.data.paymentLogs;
					/**历史记录**/
					$scope.history=response.data.history;
				}
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
			});

		}]);
	//信用卡列表
	mainApp.controller("creditcardCtrl",["$location","$filter","$rootScope","$scope","NgTableParams","commonService","dialogService",
		function($location,$filter,$rootScope,$scope,NgTableParams,service,dialog){
			var self = this;
			//当前页
			$scope.currentPage = 1;
			//每页显示条数
			$scope.curPerPage = 15;
			//获取分页数据----更新数据
			var url = $rootScope.URL_ROOT +"/order";
			function updataPageRecord(url,params){
				//加载中
				JJToolKit.mask($(".main-cont"));
				service.loadRecord({
					url : url+"?page="+$scope.currentPage+"&ps="+$scope.curPerPage,
				}).success(function(response){
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
					//刷新
					$scope.list = response.data.dataList;
					//数据总数
					$scope.totalNum = response.data.total;
				}).error(function(e){
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					alert("异常:"+e);
				});
			}
			//updataPageRecord(url);
			//全选
			$scope.selectAll = function(selected){
				angular.forEach($scope.list,function(item){
					item.selected = selected;
				});
			}
			self.selected = false;
			//搜索
			$scope.proQuery = function(){
				if(isEmpty($scope.codeStatus[$scope.order_st])){
					$scope.coder="";
				}else{
					$scope.coder=$scope.codeStatus[$scope.order_st].name;
				}
				if(isEmpty($scope.keyword)){
					$scope.keyword="";
				}
				if(isEmpty($scope.aftersale)){
					$scope.aftersale="";
				}
				//当前页
				$scope.currentPage = 1;
				//每页显示条数
				$scope.curPerPage = 15;
				var proUrl=url+"?page="+$scope.currentPage+"&ps="+$scope.curPerPage+"&startTime="+$("#start_time").val()+"&endTime="+$("#end_time").val()+"&orderStatus="+$scope.coder
					+"&aftersale="+$scope.aftersale+"&keyword="+$scope.keyword;
				//加载中
				JJToolKit.mask($(".main-cont"));
				//查询加载
				var queryLoad = true;
				service.loadRecord({
					url:proUrl
				}).success(function (response) {
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
					//数据总数
					$scope.totalNum = response.data.total;
					//表格
					self.tableParams= new NgTableParams({
							count: $scope.curPerPage
						},
						{
							total: $scope.totalNum,
							counts: 0,
							paginationMaxBlocks: 8,
							getData: function(params){
								//重置全选
								self.selected	= false;
								//当前页
								$scope.currentPage = params.page();
								//排序字段，排序方式
								var orderField = "",orderType = "";
								for (var key in params.sorting() ) {
									orderField = key;
									orderType = params.sorting()[key];
								}
								//重新排序
								if(orderField && params.sorting() != preOrder){
									preOrder = params.sorting();
									//获取过全部数据
									if($scope.list.length == $scope.totalNum){
										//排序

									}else{
										//更新数据
										updataPageRecord(url);
									}
								}else{
									if(queryLoad){
										queryLoad = false;
										//数据信息
										$scope.list = response.data.dataList;
									}else{
										//更新数据
										updataPageRecord(url);
									}
								}
								return $scope.list;
							}
						});
				}).error(function(e){
					//加载完成
					JJToolKit.unmask($(".main-cont"));
					alert("异常:"+e);
				});
			}
			//导出
			$scope.proExport = function(){
				var exportUrl=$rootScope.URL_ROOT+"/order/excel";
				window.location.href=exportUrl+"?startTime="+$("#start_time").val()+"&endTime="+$("#end_time").val()+
					"&orderStatus="+$scope.coder+"&aftersale="+$scope.aftersale+"&keyword="+$scope.keyword;
			}
			//添加
			/*$scope.proAdd = function(){
			 //弹出窗口
			 dialog.showDialog($scope,{
			 templateUrl:"pages/promocodeAdd.html",
			 title:"生成优惠码信息",
			 buttons:[{
			 handler: function(scope,windowCont){
			 var dialog = angular.element(windowCont).find(".modal-dialog");
			 //保存中
			 JJToolKit.mask(dialog);
			 //口令有效期
			 var code_expirydate = form.code_expirydate.value;
			 if(code_expirydate == undefined || code_expirydate == ""){
			 scope.no_code_expirydate = true;
			 return false;
			 }
			 var params = scope.formData;
			 //口令有效期
			 params.code_expirydate = code_expirydate;
			 params = JSON.stringify(params) || "";
			 service.loadRecord({
			 url : $rootScope.URL_ROOT + "/redeem/createpromocode?callback=JSON_CALLBACK&param="+params,
			 method: "JSONP"
			 }).success(function(response){
			 JJToolKit.unmask(dialog);
			 if($rootScope.errorMsg){
			 alert($rootScope.errorMsg);
			 return false;
			 }
			 //关闭窗口
			 scope.close();
			 //刷新列表
			 $scope.proQuery();
			 }).error(function(e){
			 JJToolKit.unmask(dialog);
			 alert("异常:"+e);
			 });
			 },
			 selectDisabled:"form.$invalid",
			 label: "确定",
			 cssClass: "btn-primary"
			 },{
			 label: "取消",
			 cssClass: "btn-default"
			 }],
			 callback: function(scope){
			 //口令类型
			 scope.comdType = comdType;
			 //渠道
			 genChannels(scope);
			 //兑换物品
			 genGoods(scope);
			 //活动
			 genActivities(scope);
			 //生成数量
			 scope.formData.num = 1;
			 //选择物品---物品类型
			 scope.changeGoods = function(){
			 //兑换物品
			 var goodid = scope.formData.goods;
			 var curGood = _.findWhere(scope.goods, {id: goodid});
			 //兑换物品类型
			 var type = curGood.type;
			 //加息券
			 if(type == "2"){
			 var temp = angular.copy(comdType);
			 //删除限额
			 temp.splice(1,1);
			 scope.comdType = temp;
			 }else if(type == "3"){//vip
			 var temp = angular.copy(comdType);
			 //删除限额、限次
			 temp.splice(1,2);
			 scope.comdType = temp;
			 }else{
			 //口令类型
			 scope.comdType = comdType;
			 }
			 }
			 }
			 });
			 };*/
			//修改
			/*$scope.proEdit = function(code){
			 //弹出窗口
			 dialog.showDialog($scope,{
			 templateUrl:"pages/promocodeUpdate.html",
			 title:"修改优惠码信息",
			 buttons:[{
			 handler: function(scope,windowCont){
			 var dialog = angular.element(windowCont).find(".modal-dialog");
			 //保存中
			 JJToolKit.mask(dialog);
			 //口令有效期
			 var code_expirydate = form.code_expirydate.value;
			 if(code_expirydate == undefined || code_expirydate == ""){
			 scope.no_code_expirydate = true;
			 return false;
			 }
			 var params = scope.formData;
			 //口令有效期
			 params.code_expirydate = code_expirydate;
			 params = JSON.stringify(params) || "";
			 service.loadRecord({
			 url : $rootScope.URL_ROOT + "/redeem/update?callback=JSON_CALLBACK&param="+params,
			 method: "JSONP"
			 }).success(function(response){
			 JJToolKit.unmask(dialog);
			 if($rootScope.errorMsg){
			 alert($rootScope.errorMsg);
			 return false;
			 }
			 //关闭窗口
			 scope.close();
			 //刷新列表
			 $scope.proQuery();
			 }).error(function(e){
			 JJToolKit.unmask(dialog);
			 alert("异常:"+e);
			 });
			 },
			 selectDisabled:"form.$invalid",
			 label: "确定",
			 cssClass: "btn-primary"
			 },{
			 label: "取消",
			 cssClass: "btn-default"
			 }],
			 callback: function(scope){
			 //口令类型
			 scope.comdType = comdType;
			 //发放状态
			 scope.usedStatus = usedStatus;
			 //兑换物品
			 genGoods(scope);
			 //获取优惠码信息
			 service.loadRecord({
			 url : $rootScope.URL_ROOT + "/redeem/getpromocode?callback=JSON_CALLBACK&code="+code,
			 method: "JSONP"
			 }).success(function(response){
			 if($rootScope.errorMsg){
			 alert($rootScope.errorMsg);
			 return false;
			 }
			 scope.formData = response.entity;
			 //口令有效期
			 var code_expirydate = response.entity.code_expirydate;
			 scope.formData.code_expirydate = $filter('date')(code_expirydate,'yyyy-MM-dd');
			 }).error(function(e){
			 alert("异常:"+e);
			 });
			 }
			 });
			 };*/
			//发放
			/*			$scope.proGrant = function(){
			 //获取选中行的口令
			 var codes = "";
			 angular.forEach($scope.list,function(item){
			 if(item.selected == true){
			 codes += item.code + ",";
			 }
			 });
			 //未选中
			 if(codes == ""){
			 alert("请选择要发放的记录！");
			 return false;
			 }else{
			 codes = codes.substring(0,codes.length-1);
			 }
			 if(confirm("您确认要发放选中的信息吗？")){
			 service.loadRecord({
			 url : $rootScope.URL_ROOT + "/redeem/send?callback=JSON_CALLBACK&param="+codes,
			 method: "JSONP"
			 }).success(function(response){
			 if($rootScope.errorMsg){
			 alert($rootScope.errorMsg);
			 return false;
			 }
			 //刷新列表
			 $scope.proQuery();
			 }).error(function(e){
			 alert("异常:"+e);
			 });
			 }
			 }*/
			//删除
			/*$scope.proDelete = function(){
			 //获取选中行的口令
			 var codes = "";
			 angular.forEach($scope.list,function(item){
			 if(item.selected == true){
			 codes += item.code + ",";
			 }
			 });
			 //未选中
			 if(codes == ""){
			 alert("请选择要删除的记录！");
			 return false;
			 }else{
			 codes = codes.substring(0,codes.length-1);
			 }
			 if(confirm("您确认要删除选中的信息吗？")){
			 service.loadRecord({
			 url : $rootScope.URL_ROOT + "/redeem/delete?callback=JSON_CALLBACK&param="+codes,
			 method: "JSONP"
			 }).success(function(response){
			 if($rootScope.errorMsg){
			 alert($rootScope.errorMsg);
			 return false;
			 }
			 //刷新列表
			 $scope.proQuery();
			 }).error(function(e){
			 alert("异常:"+e);
			 });
			 }
			 }*/
			/**待操作**/
			$scope.operating=function () {

			}
			/**售后**/
			$scope.afterMarket=function () {
				$scope.aftersale="1";
				$scope.proQuery();
			}
			/**订单详情**/
			$scope.orderDetail=function (order_id) {
				$location.url("/orderdetails?order_id="+order_id);
			}
		}]);
	//报表控制器
	mainApp.controller("ReportCtrl",["$location","$rootScope",'$scope','$filter','$routeParams',"NgTableParams",'commonService',
	function($location,$rootScope,$scope,$filter,$routeParams,NgTableParams,service){
		var self = this;		
    	//报表类型
    	$scope.type = $routeParams.type;
		//获取菜单配置
		if(JJGlobal[$scope.type] == undefined){
			service.loadRecord({
				url : $rootScope.URL_ROOT+"/report/pqc?reportId="+$scope.type
			}).success(function(response){
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//转成json对象
				var resData = JSON.parse(response.data);
				//菜单数据
				JJGlobal[$scope.type] = resData.configInfos[$scope.type];
				$scope.repertConfig = JJGlobal[$scope.type];
			});
		}else{
			$scope.repertConfig = JJGlobal[$scope.type];
		}
		//加载过报表配置
		$scope.$watch('repertConfig',function(newValue,oldValue){
			if(newValue){
				//报表名称
		    	$scope.reportTitle = JJGlobal[$scope.type].reportTitle;
		    	//生成查询表单信息
		    	$scope.searchItems = JJGlobal[$scope.type].conditions;
		    	//按钮
		    	$scope.btnList = JJGlobal[$scope.type].buttons;
		    	//高级搜索
		    	$scope.more = JJGlobal[$scope.type].more;
		    	//分页
    			$scope.rowCount = 15;
		    	$scope.queryData();
			}
	    });
	    //获取分页配置信息
	    var config = {
	    	url : $rootScope.URL_ROOT + "/report/data",
	    	method: "POST"
	    }
	    //获取分页数据----更新数据
	    function updataPageRecord(params,refresh){
	    	//配置信息
	    	var httpConfig = config;
	    	//请求参数
	    	httpConfig.params = params;
	    	//加载中
			JJToolKit.mask($(".main-cont"));
			service.loadPageRecord(httpConfig).success(function(response){
				//加载完成
				JJToolKit.unmask($(".main-cont"));
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//刷新
				$scope.reportList = response.data.rows;
				//数据总数
				$scope.totalNum = response.data.totalCount;
				//获取当前页数据
				var curPageData = $scope.reportList.slice(0);
				//数据
	            $scope.list = formatTableData(curPageData,$scope.type);
			}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
	    }
	    //获取参数
	    function genParams(){
	    	//列名
			var parmColumns = JJGlobal[$scope.type].columns;
	    	//查询条件
	    	var queryParams = {
	    		"columns": parmColumns.join("|"),
                "mapper": JJGlobal[$scope.type].mapper,
                "db": JJGlobal[$scope.type].db
	    	};
	    	var searchItems = $scope.searchItems;
	    	for(var i=0,len=searchItems.length;i<len;i++){
	    		var key = searchItems[i].id;
	    		//日期区间类型
	    		if(searchItems[i].type == "datepicker" && searchItems[i].dq == "1"){
	    			//开始时间
					queryParams["dq_"+key+"_startdate"] = $("#dq_"+key+"_startdate").val();
					//结束时间
					queryParams["dq_"+key+"_enddate"] = $("#dq_"+key+"_enddate").val();
	    		}
	    		//日期类型
	    		else if(searchItems[i].type == "datepicker" && searchItems[i].dq == "0"){
					queryParams[key] = $("#"+key).val() || searchItems[i].value;
	    		}else{
	    			queryParams[key] = searchItems[i].value;
	    		}
	    	}
	    	return queryParams;
	    }
		//查询
		$scope.queryData = function(){
			//加载中
			JJToolKit.mask($(".main-cont"));
			//查询加载
			var queryLoad = true;
	    	//查询条件
	    	$scope.queryParams = genParams();
	    	//高级搜索条件
	    	if($scope.more && $scope.more.length>0){
	    		$scope.highParams = genHighParams();
	    		$scope.queryParams = angular.extend($scope.queryParams, $scope.highParams);	 
	    	}  	    		
	    	//前排序条件
	    	var preOrder = {};
			var httpConfig = config;
			httpConfig.params = $scope.queryParams;
			//开始页数
			httpConfig.params.rowStart = 1;
			//所需条数
			httpConfig.params.rowCount = $scope.rowCount;
			service.loadPageRecord(httpConfig).success(function (response) {
				//加载完成
				JJToolKit.unmask($(".main-cont"));
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//数据信息
				$scope.reportList = response.data.rows;
				//数据总数
				$scope.totalNum = response.data.totalCount;
				//列名
				$scope.columns = response.data.columns;
			    //表格
				//$scope.tableParams= new NgTableParams({}, {total: totalNum,dataset: $scope.list});
				self.tableParams= new NgTableParams({
					count: 15
				},
				{
					total: $scope.totalNum,
					counts: 0,
					paginationMaxBlocks: 8,
					getData: function(params){
						//当前页
						$scope.currentPage = params.page();
						//每页显示条数
						$scope.curPerPage = params.count();
						//排序字段，排序方式
						var orderField = "",orderType = "";
						for (var key in params.sorting() ) {
					        orderField = key;
					        orderType = params.sorting()[key];
					    }
					    //开始取得条数修改为起始页数
						// var startNum = ($scope.currentPage - 1) * $scope.curPerPage + 1;
						var startNum = $scope.currentPage;
						//重新排序
						if(orderField && params.sorting() != preOrder){
							preOrder = params.sorting();
							//获取过全部数据
							if($scope.reportList.length == $scope.totalNum){
								//排序
								$filter('jjOrderBy')($scope.reportList,orderField,orderType,JJGlobal[$scope.type])
								//获取当前页数据
								var curPageData = $scope.reportList.slice(0);
								//数据
					            $scope.list = formatTableData(curPageData,$scope.type);
							}else{
								//更新参数
								var newParams = $scope.queryParams;
								//开始页数
								newParams.rowStart = startNum;
								//所需条数
								newParams.rowCount = $scope.rowCount;
								//排序字段
								newParams.orderBy = orderField;
								//排序方式
								newParams.orderType = orderType.toUpperCase();
								//更新数据
				            	updataPageRecord(newParams,true);
							}
						}else{
							if(queryLoad){
								//获取当前页数据
								var curPageData = $scope.reportList.slice(0);
								//数据
					            $scope.list = formatTableData(curPageData,$scope.type);
					            queryLoad = false;
							}else{
								//更新参数
								var newParams = $scope.queryParams;
								//开始页数
								newParams.rowStart = startNum;
								//所需条数
								newParams.rowCount = $scope.rowCount;
								//更新数据
				            	updataPageRecord(newParams);
							}
						}
			            return $scope.list;
					}
				});
			}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
		}
		//导出
		$scope.exportData = function(){
			//查询信息
			var exportParams = genParams();
			//高级搜索条件
			if($scope.more && $scope.more.length>0){
	    		$scope.highParams = genHighParams();
	    		exportParams = angular.extend(exportParams, $scope.highParams);	 
	    	}   
			//标题
			exportParams.title = $scope.reportTitle;
			//报表标识
			exportParams.reportId = $scope.type;
			//列头
			exportParams.columnNames = getColumnNames($scope.type).join("|");
			//加载中
			JJToolKit.mask($(".main-cont"));
	    	service.loadRecord({
				url : $rootScope.URL_ROOT + "/report/export",
		    	method: "POST",
		    	params: exportParams
	    	}).success(function(response){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
				if(response.status == true){
                    window.open($rootScope.URL_ROOT+"/"+response.msg);
                }else{
                    alert("导出失败,"+response.msg);
                }
	    	}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
		}
		//高级查询----条件
		function genHighParams(){
			var highParams = {};
			var user = $scope.user;
			//用户条件
			var more_user = "";
			_.mapObject(user, function(val, key) {
			  return more_user += "&" + key + "=" + val;
			});
			//注册时间
			var regdatemin = $("#dq_reg_startdate").val();
			var regdatemax = $("#dq_reg_enddate").val();
			if(regdatemin){
				more_user += "&dq_reg_startdate=" + regdatemin;
			}
			if(regdatemax){
				more_user += "&dq_reg_enddate=" + regdatemax;
			}
			//实名时间
			var realdatemin = $("#dq_real_startdate").val();
			var realdatemax = $("#dq_real_enddate").val();
			if(realdatemin){
				more_user += "&dq_real_startdate=" + realdatemin;
			}
			if(realdatemax){
				more_user += "&dq_real_enddate=" + realdatemax;
			}
			if(more_user){
				more_user = more_user.substring(1);
				highParams.more_user = more_user;
			}
			/*//投资条件
			var more_tend = "";
			var tend = $scope.tend;
			_.mapObject(tend, function(val, key) {
			  return more_tend += "&" + key + "=" + val;
			});
			//投资时间
			var tenddatemin = $("#tenddatemin").val();
			var tenddatemax = $("#tenddatemax").val();
			if(tenddatemin){
				more_tend += "&tenddatemin=" + tenddatemin;
			}
			if(tenddatemax){
				more_tend += "&tenddatemax=" + tenddatemax;
			}
			//回款时间
			var recoverdatemin = $("#recoverdatemin").val();
			var recoverdatemax = $("#recoverdatemax").val();
			if(recoverdatemin){
				more_tend += "&recoverdatemin=" + recoverdatemin;
			}
			if(recoverdatemax){
				more_tend += "&recoverdatemax=" + recoverdatemax;
			}
			if(more_tend){
				more_tend = more_tend.substring(1);
				highParams.more_tend = more_tend;
			}*/
			//账户条件
			var more_account = "";
			var account = $scope.account;
			_.mapObject(account, function(val, key) {
			  return more_account += "&" + key + "=" + val;
			});
			if(more_account){
				more_account = more_account.substring(1);
				highParams.more_account = more_account;
			}
			//标签
			var more_tag = "";
			if($scope.tag && $scope.tag.ids){
				more_tag = $scope.tag.ids.join("_");
				highParams.more_tag = more_tag;
			}
			return highParams;
		}
		//清除高级搜索条件
		$scope.clearHigh = function(){
			$scope.highParams = "";
			//用户条件
			angular.forEach($scope.user,function(value,key){
				$scope.user[key] = "";
			});
			//注册时间
			$("#dq_reg_date").val("");
			$("#dq_reg_startdate").val("");
			$("#dq_reg_enddate").val("");
			//实名时间
			$("#dq_real_date").val("");
			$("#dq_real_startdate").val("");
			$("#dq_real_enddate").val("");
			//账户条件
			angular.forEach($scope.account,function(value,key){
				$scope.account[key] = "";
			});
			//标签
			$scope.tag = {};
		}
		//显示/隐藏更多筛选
		$scope.showMoreQuery = function(){
			$scope.isShowMore = !$scope.isShowMore;
		}
	}]);
    /**-服务商发起个人信息查询 -**/
    var trustUrl="/eloanadmin";
    mainApp.controller("personInfoCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            /**-服务商发起个人信息查询 -**/
            $scope.scopeId=0;
            $scope.postData=function(){
                var userId=$scope.userId;
                if(userId == undefined || userId == ""){
                    return false;
                }
                var data={
                    "userId":userId
                };
                service.loadRecord({
                    url:trustUrl+"/bid/personInfoQuery",
                    data:data,
                    method:"POST"
                }).success(
                    function(response){
                        $scope.personList=response;
                        if(response.length!=0){
                            $scope.scopeId=1;
                        }
                    }
                );
            }
        }
    ]);
    /**-服务商银行账户余额查询-**/
    mainApp.controller("balanceInfoCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.scopeId=0;
            service.loadRecord({
                url:trustUrl+"/bid/balanceQuery",
                method:"GET"
            }).success(
                function(response){
                    $scope.balanceAll=response;
                    if(response.length!=0){
                        $scope.scopeId=1;
                    }
                }
            );
        }
    ]);
    /**-子账户余额查询-**/
    mainApp.controller("subBalanceCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.scopeId=0;
            service.loadRecord({
                url:trustUrl+"/bid/subBalanceQuery",
                method:"GET"
            }).success(
                function(response){
                    $scope.subBalanceQuery=response;
                    if(response.length!=0){
                        $scope.scopeId=1;
                    }
                }
            );
        }]);
    /**-交易结果查询-**/
    mainApp.controller("transResultCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.scopeId=0;
            //获取渠道信息
            $scope.getTrans=function(){
                var url = $rootScope.URL_ROOT + "/bid/queryBusinessCode";
                service.loadRecord({
                    url : url,
                    method: "GET"
                }).success(function(response){
                    //列表
                    $scope.transResult = response;
                }).error(function(e){
                    alert("异常:"+e);
                });
            }
            $scope.getTrans();

            //是否更新
            $scope.getupdate=function(){
                var url = $rootScope.URL_ROOT + "/bid/ifUpdate";
                service.loadRecord({
                    url : url,
                    method: "GET"
                }).success(function(response){
                    //列表
                    $scope.ifupdate = response;
                    $scope.channel_update = $scope.ifupdate[1].code;
                }).error(function(e){
                    alert("异常:"+e);
                });
            }
            $scope.getupdate();

            $scope.transData=function(){
                var TimeDate= $scope.insert_time || $("#insert_time").val().replace(/-/g,'');
                var params = {
                    "businessCode":$scope.channel_id,//
                    "serialNum":$scope.channel_code,//口令
                    "date":TimeDate,//生成时间
                    "type":$scope.channel_update//是否更新
                }
                if($scope.channel_id==undefined||$scope.channel_code==undefined||TimeDate==''){
                    return false;
                }else{
                    service.loadRecord({
                        url:trustUrl+"/bid/transResultQuery",
                        data:params,
                        method:"POST"
                    }).success(
                        function(response){
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            $scope.transResultQuery=response;
                            if(response.length!=0){
                                $scope.scopeId=1;
                            }
                        }
                    );
                }
            }
        }]);
    /***-服务商发起风险赔付-***/
    mainApp.controller("riskCompensateCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.tbRisk=false;
            $scope.riskInfo=true;

            $scope.addRisk=function(){
                //弹出窗口
               /* $scope.tbRisk=true;
                $scope.riskInfo=false;*/
                dialog.showDialog($scope,{
                    templateUrl:"pages/riskInfo.html",
                    title:"添加数据信息",
                    callback:function(scope){
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/bid/recoverPeriod",
                            method: "GET"
                        }).success(function(response){
                            scope.periodSelect=response;
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            JJToolKit.mask(dialog);
                            var parmar={
                                bidId:scope.formData.bidId,
                                period:scope.formData.period
                            };
                            service.loadRecord({
                                url : $rootScope.URL_ROOT + "/bid/riskCompensate",
                                data:parmar,
                                method: "POST"
                            }).success(function(response){
                                $scope.tbRisk=true;
                                $scope.riskInfo=false;
                                JJToolKit.unmask(dialog);
                                if($rootScope.errorMsg){
                                    alert($rootScope.errorMsg);
                                    return false;
                                }
                                $scope.riskList=response;
                                if(response.status==true){
                                    scope.channelExist = response.msg;
                                    location.reload();
                                }else{
                                    scope.channelExist = response.msg;
                                }
                            }).error(function(e){
                                JJToolKit.unmask(dialog);
                                alert("异常:"+e);
                            });
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }
            /***-查询数据-***/
            $scope.scopeId=0;
            $scope.queryrisk=function(){
                var TimeDate= $scope.insert_time || $("#insert_time").val().replace(/-/g,'');
                if(TimeDate==''){
                    TimeDate=undefined;
                }
                var params = {
                	"userId": $scope.userId,
                    "bidId":$scope.bidId,//标ID
					"bidTitle":$scope.bidTitle, //标名
                    "date":TimeDate//生成时间
                }
                service.loadRecord({
                    url:trustUrl+"/bid/queryRiskCompensate",
                    data:params,
                    method:"POST"
                }).success(
                    function(response){
                        $scope.tbRisk=false;
                        $scope.riskInfo=true;
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        $scope.queryRisked=response;
                        if(response.length!=0){
                            $scope.scopeId=1;
                        }
                    }
                );
            };
            $scope.queryrisk();
        }]);



    mainApp.controller("bidQueryCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            /**-服务商发起标的信息查询 -**/
            $scope.scopeId=0;
            $scope.postData=function(){
                var bidId=$scope.bidId;
                if(bidId == undefined || bidId == ""){
                    return false;
                }
                var data={
                    "bidId":bidId
                };
                service.loadRecord({
                    url:trustUrl+"/bid/bidQuery",
                    data:data,
                    method:"POST"
                }).success(
                    function(response){
                        $scope.personList=response.entity;
                        if(response.length!=0){
                            $scope.scopeId=1;
                        }
                    }
                );
            }
        }
    ]);


    /***-服务商收益划出-***/
    mainApp.controller("incomeCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            /**-弹窗-**/
                //$scope.tbIncome=true;
            $scope.incomeInfo=true;
            service.loadRecord({
                url : $rootScope.URL_ROOT + "/bid/queryIncomeType",
                method: "GET"
            }).success(function(response){
                $scope.comeSelect=response;
            });
            $scope.addIncome = function(){
                //弹出窗口
                dialog.showDialog($scope,{
                    templateUrl:"pages/incomeInfo.html",
                    title:"添加数据信息",
                    callback:function(scope){
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/bid/queryIncomeType",
                            method: "GET"
                        }).success(function(response){
                            scope.incomeSelect=response;
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            JJToolKit.mask(dialog);
                            var parmar={
                                type:scope.formData.channel_id,
                                amount:scope.formData.amount
                            };
                            service.loadRecord({
                                url : $rootScope.URL_ROOT + "/bid/income",
                                data:parmar,
                                method: "POST"
                            }).success(function(response){
                                //$scope.tbIncome=true;
                                //$scope.incomeInfo=false;
                                JJToolKit.unmask(dialog);
                                if($rootScope.errorMsg){
                                    alert($rootScope.errorMsg);
                                    return false;
                                }
                                $scope.incomeList=response;
                                if(response.status==true){
                                    scope.channelExist = response.msg;
                                    location.reload();
                                }else{
                                    scope.channelExist = response.msg;
                                }
                            }).error(function(e){
                                JJToolKit.unmask(dialog);
                                alert("异常:"+e);
                            });
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }
            /**-服务商收益划出类型的下拉框-**/
            /***-查询数据-***/
            $scope.scopeId=0;
            $scope.queryCome=function(){
                var TimeDate= $scope.insert_time || $("#insert_time").val().replace(/-/g,'');
                if(TimeDate==''){
                    TimeDate=undefined;
                }
                var params = {
                    "type":$scope.incomeId,//
                    "date":TimeDate//生成时间
                }
                service.loadRecord({
                    url:trustUrl+"/bid/queryIncome",
                    data:params,
                    method:"POST"
                }).success(
                    function(response){
                        // $scope.tbIncome=false;
                        //$scope.incomeInfo=true;
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        $scope.queryIncome=response;
                        if(response.length!=0){
                            $scope.scopeId=1;
                        }
                    }
                );
            }
        }]);
    /**-服务商发起客户佣金派送-**/
    mainApp.controller("commissionCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.tbCode=true;
            $scope.tbInfo=false;
            $scope.addCommission = function(){
                //弹出窗口
                dialog.showDialog($scope,{
                    templateUrl:"pages/commissionInfo.html",
                    title:"添加数据信息",
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            JJToolKit.mask(dialog);
                            var parmar={
                                userId:scope.formData.userId,
                                amount:scope.formData.amount
                            };
                            service.loadRecord({
                                url : $rootScope.URL_ROOT + "/bid/commissionTransfer",
                                data:parmar,
                                method: "POST"
                            }).success(function(response){
                                $scope.tbCode=true;
                                $scope.tbInfo=false;
                                JJToolKit.unmask(dialog);
                                if($rootScope.errorMsg){
                                    alert($rootScope.errorMsg);
                                    return false;
                                }
                                $scope.commissionList=response;
                                if(response.status==true){
                                    scope.channelExist = response.msg;
                                    location.reload();
                                }else{
                                    scope.channelExist = response.msg;
                                }
                                /*                                        JJToolKit.mask(dialog);
                                 var params = scope.formData;
                                 params = JSON.stringify(params) || "";
                                 service.loadRecord({
                                 url : $rootScope.URL_ROOT + "/channel/insert?callback=JSON_CALLBACK&param="+params,
                                 method: "JSONP"
                                 }).success(function(response){
                                 JJToolKit.unmask(dialog);
                                 if($rootScope.errorMsg){
                                 alert($rootScope.errorMsg);
                                 return false;
                                 }
                                 //关闭窗口
                                 scope.close();
                                 //刷新列表
                                 $scope.queryData();
                                 }).error(function(e){
                                 JJToolKit.unmask(dialog);
                                 alert("异常:"+e);
                                 });*/
                            }).error(function(e){
                                JJToolKit.unmask(dialog);
                                alert("异常:"+e);
                            });
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }
            /***-查询数据-***/
            $scope.scopeId=0;
            $scope.querySion=function(){
                var TimeDate= $scope.insert_time || $("#insert_time").val().replace(/-/g,'');
                if(TimeDate==''){
                    TimeDate=undefined;
                }
                if($scope.userId==''){
                    $scope.userId=undefined;
                }
                var params = {
                    "userId":$scope.userId,//
                    "date":TimeDate//生成时间
                }
                service.loadRecord({
                    url:trustUrl+"/bid/queryCommissionTransfer",
                    data:params,
                    method:"POST"
                }).success(
                    function(response){
                        $scope.tbCode=false;
                        $scope.tbInfo=true;
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        $scope.queryCommission=response;
                        if(response.length!=0){
                            $scope.scopeId=1;
                        }
                    }
                );
            }
        }]);
    /***-服务商发起子账户入金-***/
    mainApp.controller("subrechargeCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){

            $scope.insert_year = "2017";
    	$scope.showyearep = false;
    	$scope.shownummodel = function () {
            $scope.showyearep = !$scope.showyearep;
        }

            $scope.datapick = [
                {"name":"1999"},
                {"name":"2000"},
                {"name":"2001"},
                {"name":"2002"},
                {"name":"2003"},
                {"name":"2004"},
                {"name":"2005"},
                {"name":"2006"},
                {"name":"2007"},
                {"name":"2008"},
                {"name":"2009"},
                {"name":"2010"},
                {"name":"2011"},
                {"name":"2012"},
                {"name":"2013"},
                {"name":"2014"},
                {"name":"2015"},
                {"name":"2016"},
                {"name":"2017"},
                {"name":"2018"},
                {"name":"2019"},
                {"name":"2020"},
            ];

            $scope.datapickmonth = [
                {"monthname":"3月31号","monthnum":"-3-31"},
                {"monthname":"6月30号","monthnum":"-6-30"},
                {"monthname":"9月30号","monthnum":"-9-30"},
                {"monthname":"12月31号","monthnum":"-12-31"}
            ];
            
            $scope.chosemonth = function (monthnum) {
				$scope.aa = monthnum;
            }
            $scope.suresearch = function () {
				$scope.insert_yeartime = $scope.insert_year + $scope.aa;
                $scope.shownummodel();
            }


            $scope.year_time =  $scope.insert_year + $scope.insert_month;

            /**-弹窗-**/
                //$scope.tbRecharge=true;
            $scope.rechargeInfo=true;
            service.loadRecord({
                url : $rootScope.URL_ROOT + "/bid/querySubAccRechargeType",
                method: "GET"
            }).success(function(response){
                $scope.rechargeSelect=response;
            });
            $scope.addRecharge = function(){
                //弹出窗口
                dialog.showDialog($scope,{
                    templateUrl:"pages/subrechargeInfo.html",
                    title:"添加数据信息",
                    callback:function(scope){
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/bid/querySubAccRechargeType",
                            method: "GET"
                        }).success(function(response){
                            scope.subSelect=response;
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            JJToolKit.mask(dialog);
                            var parmar={
                                type:scope.formData.recharge_id,
                                amount:scope.formData.amount
                            };
                            service.loadRecord({
                                url : $rootScope.URL_ROOT + "/bid/subAccRecharge",
                                data:parmar,
                                method: "POST"
                            }).success(function(response){
                                //$scope.tbRecharge=true;
                                //$scope.rechargeInfo=false;
                                JJToolKit.unmask(dialog);
                                if($rootScope.errorMsg){
                                    alert($rootScope.errorMsg);
                                    return false;
                                }
                                $scope.rechargeList=response;
                                if(response.status==true){
                                    scope.channelExist = response.msg;
                                    location.reload();
                                }else{
                                    scope.channelExist = response.msg;
                                }
                            }).error(function(e){
                                JJToolKit.unmask(dialog);
                                alert("异常:"+e);
                            });
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }
            /**-服务商收益划出类型的下拉框-**/
            /***-查询数据-***/
            $scope.scopeId=0;
            $scope.queryCharge=function(){
                var TimeDate= $scope.insert_time || $("#insert_time").val().replace(/-/g,'');
                if(TimeDate==''){
                    TimeDate=undefined;
                }
                var params = {
                    "type":$scope.rechargeId,//
                    "date":TimeDate,//生成时间
                }
                service.loadRecord({
                    url:trustUrl+"/bid/querySubAccRecharge",
                    data:params,
                    method:"POST"
                }).success(
                    function(response){
                        //$scope.tbRecharge=false;
                        //$scope.rechargeInfo=true;
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        $scope.queryRecharge=response;
                        if(response.length!=0){
                            $scope.scopeId=1;
                        }
                    }
                );
            }
        }]);


    /***-存管报表补发-***/
    mainApp.controller("addreissuedataCtrl",["$rootScope","$scope","commonService",


		function ($rootScope, $scope,service) {
            /*获取相应补发功能下拉框*/
			service.loadRecord({
                url: $rootScope.URL_ROOT + "/bid/queryReissueBusinessCode",
                method: "GET"
            }).success(function (response) {
                $scope.reissueSelect = response;
            });



            /*还款期次*/
            service.loadRecord({
                url : $rootScope.URL_ROOT + "/bid/recoverPeriod",
                method: "GET"
            }).success(function(response){
                $scope.periodSelect=response;
            });


            $scope.submit = function () {

                service.loadRecord({
                    url: $rootScope.URL_ROOT + "/bid/addReissueData?service="+$scope.formData.service+"&bidId="+$scope.formData.bidId+"&seq="+$scope.formData.seq+"&fee="+$scope.formData.fee+"&userId="+$scope.formData.userId+"&recoverTimes="+$scope.formData.recoverTimes+"&repayTimes="+$scope.formData.repayTimes,
                    method: "GET"
                }).success(function (response) {
                   /* if ($rootScope.errorMsg) {
                        alert($rootScope.errorMsg);
                        location.reload();
                    }*/
                    if (response.status == true) {
                        alert(response.msg);
                        location.reload();
                    } else {
                        alert("错误消息："+response.msg);
                        location.reload();
                    }
                }).error(function (e) {
                    alert("异常:" + e);
                    location.reload();
                });
				/*alert("11232");*/
            };
        }])

    /***-回款补发-***/
    mainApp.controller("replacementCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            /**-弹窗-**/
            $scope.tbRecover=false;
            $scope.recoverInfo=true;
            service.loadRecord({
                url : $rootScope.URL_ROOT + "/bid/recoverPeriod",
                method: "GET"
            }).success(function(response){
                $scope.recoverSelect=response;
            });
            service.loadRecord({
                url : $rootScope.URL_ROOT + "/bid/pushstatus",
                method: "GET"
            }).success(function(response){
                $scope.pushSelect=response;
            });
            $scope.addcover = function(){
                //弹出窗口
                dialog.showDialog($scope,{
                    templateUrl:"pages/replacementInfo.html",
                    title:"添加数据信息",
                    callback:function(scope){
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/bid/recoverPeriod",
                            method: "GET"
                        }).success(function(response){
                            scope.periodSelect=response;
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            JJToolKit.mask(dialog);
                            var parmar={
                                period:scope.formData.periodId,
                                bidId:scope.formData.bidId
                            };
                            service.loadRecord({
                                url : $rootScope.URL_ROOT + "/bid/reissue",
                                data:parmar,
                                method: "POST"
                            }).success(function(response){
                                $scope.tbRecover=true;
                                $scope.recoverInfo=false;
                                JJToolKit.unmask(dialog);
                                if($rootScope.errorMsg){
                                    alert($rootScope.errorMsg);
                                    return false;
                                }
                                $scope.overList=response;
                                if(response.status==true){
                                    scope.channelExist = response.msg;
                                }else{
                                    scope.channelExist = response.msg;
                                }
                            }).error(function(e){
                                JJToolKit.unmask(dialog);
                                alert("异常:"+e);
                            });
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }
            /**-服务商收益划出类型的下拉框-**/
            /***-查询数据-***/
            $scope.scopeId=0;
            $scope.querycover=function(){
                var TimeDate= $scope.insert_time || $("#insert_time").val().replace(/-/g,'');
                if(TimeDate==''){
                    TimeDate=undefined;
                }
                var params = {
                    "date":TimeDate,//生成时间
                    "bidId":$scope.bidId,
                    "period":$scope.recoverId,//
                    "type":$scope.pushId,
					"bidTitle":$scope.bidTitle//标名
                }
                /*if($scope.bidId==undefined && $scope.recoverId==undefined && $scope.pushId==undefined){
                    return false;
                }else{*/
                    service.loadRecord({
                        url:trustUrl+"/bid/recover",
                        data:params,
                        method:"POST"
                    }).success(
                        function(response){
                            $scope.tbRecover=false;
                            $scope.recoverInfo=true;
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            $scope.queryRecover=response;
                            if(response.length!=0){
                                $scope.scopeId=1;
                            }
                        }
                    );
                }
          /*  }*/

            $scope.querycover();
        }]);


    /**-财务存管专用收支明细表-**/
    mainApp.controller("incomeAndExpCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.scopeId=0;
            //获取收入支出下拉框
            $scope.getTrans=function(){
                var url = $rootScope.URL_ROOT + "/bid/incomeAndExpensesType";
                service.loadRecord({
                    url : url,
                    method: "GET"
                }).success(function(response){
                    //列表
                    $scope.transResult = response;
                }).error(function(e){
                    alert("异常:"+e);
                });
            }
            $scope.getTrans();


            //收入支出明细类型
            $scope.getinoutdil=function(){
                var url = $rootScope.URL_ROOT + "/bid/incomeAndExpensesType2";
                service.loadRecord({
                    url : url,
                    method: "GET"
                }).success(function(response){
                    //列表
                    $scope.getinoutdilRes = response;
                }).error(function(e){
                    alert("异常:"+e);
                });
            }
            $scope.getinoutdil();

            $scope.transData=function(){
                var startTime= $scope.startTime || $("#startTime").val().replace(/-/g,'');
                var endTime= $scope.endTime || $("#endTime").val().replace(/-/g,'');
                if($scope.type == undefined){
                    $scope.type ="";
                }
                if($scope.incomeAndExpensesType == undefined){
                    $scope.incomeAndExpensesType ="";
                }

               /* var params = {
                    "startTime":startTime,// 开始时间
                    "endTime":endTime,//结束时间
                    "type":$scope.type,//收入支出类型
                    "incomeAndExpensesType":$scope.incomeAndExpensesType //收入支出明细类型
                }*/
                /*if($scope.type==undefined||$scope.incomeAndExpensesType==undefined||startTime=='' || endTime==''){
                    return false;
                }else{*/
                    service.loadRecord({
                        url:trustUrl+"/bid/incomeAndExpenses?startTime="+startTime+"&endTime="+endTime+"&type="+$scope.type+ "&incomeAndExpensesType="+$scope.incomeAndExpensesType,
                        method:"GET"
                    }).success(
                        function(response){
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            $scope.transResultQuery=response.list;
                            $scope.inouttol =  response.total;
                            if(response.list.length!=0){
                                $scope.scopeId=1;
                            }else{
                                $scope.scopeId=0;
                            }
                        }
                    );
                }
          /*  }*/
            $scope.transData();
        }]);


    /**-定时任务管理-**/
    //定时任务详情
    mainApp.controller("taskDetailsCtrl",["NgTableParams","$rootScope","$scope","commonService","dialogService",
        function(NgTableParams,$rootScope,$scope,service,dialog){
            //是否存在
            $scope.labelEn = '';
            $scope.labelCn = '';

            //查询渠道
            $scope.queryTimingtask=function(){
                service.loadRecord({
                    url:trustUrl+"/db/list?labelEn="+$scope.labelEn+ "&labelCn="+$scope.labelCn,
                    method:"GET"
                }).success(
                    function(response){
                        $scope.tbRisk=false;
                        $scope.riskInfo=true;
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        $scope.queryTimingTask=response.entity;
                        if(response.entity.length!=0){
                            $scope.scopeId=1;
                        }else{
                            $scope.scopeId=0;
						}
                    }
                );
            };
            $scope.queryTimingtask();

            //添加定时任务信息
            $scope.addtimingData = function(){
                //弹出窗口
                dialog.showDialog($scope,{
                    templateUrl:"pages/taskDetailsInfo.html",
                    title:"添加定时任务信息",
                    callback:function(scope){
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/form", //任务类型
                            method: "GET"
                        }).success(function(response){
                            scope.TaskSelect=response;
                        });
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/form2", //状态类型
                            method: "GET"
                        }).success(function(response){
                            scope.TaskStatusSelect=response;
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            JJToolKit.mask(dialog);
                            var parmar={
                                labelEn:scope.formData.labelEn,//任务标识
                                labelCn:scope.formData.labelCn,//任务名称
                                memo:scope.formData.memo, //备注
                                machine:scope.formData.machine, //部署主机
                                period:scope.formData.period, //执行周期
                                taskType:scope.formData.taskType, //任务类型
                                enable:scope.formData.enable, //是否可用
                                fileName:scope.formData.fileName, //文件名
                                mainFile:scope.formData.mainFile, //任务入口文件
                            };
                            service.loadRecord({
                                url : $rootScope.URL_ROOT + "/db/add",
                                data:parmar,
                                method: "POST"
                            }).success(function(response){
                                JJToolKit.unmask(dialog);
                                if($rootScope.errorMsg){
                                    alert($rootScope.errorMsg);
                                    return false;
                                }
                                /*$scope.incomeList=response;*/
                                if(response.status==true){
                                    alert(response.msg);
                                    location.reload();
                                }else{
                                    $scope.timingtTaskExist = response.msg;
                                }
                            }).error(function(e){
                                JJToolKit.unmask(dialog);
                                alert("异常:"+e);
                            });
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }


            //修改定时任务信息
            $scope.editTimingData = function(labelEn){
                //弹出窗口
                dialog.showDialog($scope,{
                    templateUrl:"pages/taskDetailsInfo.html",
                    title:"修改定时任务信息",
                    callback: function(scope){

                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/form", //任务类型
                            method: "GET"
                        }).success(function(response){
                            scope.TaskSelect=response;
                        });
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/form2", //状态类型
                            method: "GET"
                        }).success(function(response){
                            scope.TaskStatusSelect=response;
                        });

                        //获取渠道信息
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/list?labelEn="+labelEn,
                            method: "GET"
                        }).success(function(response){
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            scope.formData = response.entity[0];
                            scope.formData.taskType = response.entity[0].taskType.toString();
                            scope.formData.enable =   response.entity[0].enable.toString();
                            scope.formData.labelEncode = labelEn;

                        }).error(function(e){
                            alert("异常:"+e);
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            //保存中
                            JJToolKit.mask(dialog);
                            var params = scope.formData;
                            params = JSON.stringify(params) || "";
                            service.loadRecord({
                                url : $rootScope.URL_ROOT + "/db/alter",
                                data:params,
                                method: "POST"
                            }).success(function(response){
                                JJToolKit.unmask(dialog);
                                if(response.status == false){
                                    alert(response.msg);
                                    return false;
                                }else{
                                    //关闭窗口
                                    scope.close();
                                    //刷新列表
                                    $scope.queryTimingtask();
								}


                            }).error(function(e){
                                JJToolKit.unmask(dialog);
                                alert("异常:"+e);
                            });
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }
            //删除定时任务信息
            $scope.deleteData = function(labelEn){
                if(confirm("您确认要删除吗？")){
                    service.loadRecord({
                        url : $rootScope.URL_ROOT + "/db/delete?labelEn="+labelEn,
                        method: "GET"
                    }).success(function(response){
                        if(response.msg  == "失败"){
                            alert(response.msg);
                            return false;
                        }else{
                            //刷新列表
                            $scope.queryTimingtask();
						}
                    }).error(function(e){
                        alert("异常:"+e);
                    });
                }
            }
        }]);

    //定时任务维护
    mainApp.controller("taskMaintainCtrl",["NgTableParams","$rootScope","$scope","commonService","dialogService",
        function(NgTableParams,$rootScope,$scope,service,dialog){
            //是否存在
            $scope.labelEn = '';
            $scope.labelCn = '';
            $scope.startTime = '';
            $scope.endTime = '';

            //查询维护任务
            $scope.queryMaintaintask=function(){
                var startTime= $scope.startTime || $("#startTime").val();
                var endTime= $scope.endTime || $("#endTime").val();

                service.loadRecord({
                    url:trustUrl+"/db/query?labelEn="+$scope.labelEn+ "&labelCn="+$scope.labelCn+ "&startTime=" +startTime + "&endTime=" + endTime,
                    method:"GET"
                }).success(
                    function(response){
                        $scope.tbRisk=false;
                        $scope.riskInfo=true;
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        $scope.queryMaintainTask=response.entity;
                        if(response.entity.length!=0){
                            $scope.scopeId=1;
                        }else{
                            $scope.scopeId=0;
                        }
                    }
                );
            };
            $scope.queryMaintaintask();

            //查看任务维护详情
            $scope.seeMaintainData = function(labelEn){
                //弹出窗口
                dialog.showDialog($scope,{
                    templateUrl:"pages/taskMaintainInfo.html",
                    title:"查看定时任务维护信息",
                    callback: function(scope){

                        //获取任务维护信息
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/query?labelEn="+labelEn,
                            method: "GET"
                        }).success(function(response){
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            scope.formData = response.entity[0];

                        }).error(function(e){
                            alert("异常:"+e);
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            //保存中
                            JJToolKit.mask(dialog);
                            //关闭窗口
                                    scope.close();
                                    //刷新列表
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }


            //查看重启命令
            $scope.seeRestart = function(labelEn){
                //弹出窗口
                dialog.showDialog($scope,{
                    template:'<span   style="line-height: 26px;padding-left: 20px;" ng-bind="restartCmd"></span>',
                    title:"查看定时任务重启命令",
                    callback: function(scope){

                        //获取任务维护信息
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/info?labelEn="+labelEn,
                            method: "GET"
                        }).success(function(response){
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            scope.restartCmd = response.entity.restartCmd;

                        }).error(function(e){
                            alert("异常:"+e);
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            //保存中
                            JJToolKit.mask(dialog);
                            //关闭窗口
                            scope.close();
                            //刷新列表
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }


            //查看执行描述
            $scope.seeDescribe = function(labelEn){
                //弹出窗口
                dialog.showDialog($scope,{
                    template:'<span   style="line-height: 26px;padding-left: 20px;" ng-bind="describe"></span>',
                    title:"查看定时任务执行描述",
                    callback: function(scope){

                        //获取任务维护信息
                        service.loadRecord({
                            url : $rootScope.URL_ROOT + "/db/info?labelEn="+labelEn,
                            method: "GET"
                        }).success(function(response){
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            scope.describe = response.entity.describe;

                        }).error(function(e){
                            alert("异常:"+e);
                        });
                    },
                    buttons:[{
                        handler: function(scope,windowCont){
                            var dialog = angular.element(windowCont).find(".modal-dialog");
                            //保存中
                            JJToolKit.mask(dialog);
                            //关闭窗口
                            scope.close();
                            //刷新列表
                        },
                        selectDisabled:"form.$invalid",
                        label: "确定",
                        cssClass: "btn-primary"
                    },{
                        label: "取消",
                        cssClass: "btn-default"
                    }]
                });
            }


            //执行定时任务
            $scope.doTask = function(labelEn){
                if(confirm("确认执行任务吗？")){
                    service.loadRecord({
                        url : $rootScope.URL_ROOT + "/db/reset?labelEn="+labelEn,
                        method: "GET"
                    }).success(function(response){
                        if(response.status  == false){
                            alert(response.msg);
                            return false;
                        }else{
                            //刷新列表
                            $scope.queryMaintaintask();
                        }
                    }).error(function(e){
                        alert("异常:"+e);
                    });
                }
            }
        }]);



    /**-用户可用余额明细表-**/
    mainApp.controller("userAvailBalCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.scopeId=0;

            $scope.useravailData=function(){
                if($scope.username == undefined){
                    $scope.username ="";
                }
                if($scope.fundcount == undefined){
                    $scope.fundcount ="";
                }

                /* var params = {
                 "startTime":startTime,// 开始时间
                 "endTime":endTime,//结束时间
                 "type":$scope.type,//收入支出类型
                 "incomeAndExpensesType":$scope.incomeAndExpensesType //收入支出明细类型
                 }*/
                /*if($scope.type==undefined||$scope.incomeAndExpensesType==undefined||startTime=='' || endTime==''){
                 return false;
                 }else{*/
                service.loadRecord({
                    url:trustUrl+"/bid/userAvailableBalance?userId="+$scope.username+"&depositoryId="+$scope.fundcount,
                    method:"GET"
                }).success(
                    function(response){
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        $scope.delResultQuery=response.list;
                        $scope.inouttol =  response.total;
                        if(response.list.length!=0){
                            $scope.scopeId=1;
                        }else{
                            $scope.scopeId=0;
                        }
                    }
                );
            }
            /*  }*/
            $scope.useravailData();
        }]);


    /***-对账报表-****/
    mainApp.controller("checkresultCtrl",["$rootScope","$scope","commonService","dialogService",
        function($rootScope,$scope,service,dialog){
            $scope.repFalse=true;
            $scope.ptsType=true;
            /**-下拉框name-**/
            service.loadRecord({
                url:$rootScope.URL_ROOT+"/check/checkPartType",
                method:"GET"
            }).success(function(responseType){
                $scope.checkType=responseType;
            });
            service.loadRecord({
                url:$rootScope.URL_ROOT+"/check/checkResultType",
                method:"GET"
            }).success(function(responseType){
                $scope.resultType=responseType;
            });
            $scope.resultCheck=function(){
                $scope.reshResult=[];
                $scope.ptsType=true;
                $scope.repFalse=false;
            }
            /**-重新核对-**/
            $scope.afresh=function(){
                var checkTime= $scope.check_time || $("#check_time").val().replace(/-/g,'');
                if(checkTime==''){
                    checkTime=undefined;
                }
                var freshData={
                    "name":$scope.partsType,//
                    "date":checkTime//时间
                };
                if($scope.partsType==undefined||checkTime==undefined){
                    return false;
                }else{
                    service.loadRecord({
                        url :trustUrl+"/check/recheck",
                        data:freshData,
                        method: "POST"
                    }).success(function(response){
                        if(response.status==true){
                            $scope.repFalse=false;
                            dialog.showDialog($scope,{
                                template:"<div class=\'show_text\'>重新核对成功</div>",
                                title:"添加数据信息"
                            });
                        }
                    });
                }
            }
            /**-查询数据-**/
            $scope.queryResult=function(){
                var checkTime= $scope.check_time || $("#check_time").val().replace(/-/g,'');
                if(checkTime==''){
                    checkTime=undefined;
                }
                var freshData={
                    "checkResult":$scope.resultId,
                    "name":$scope.partsType,//
                    "date":checkTime//时间
                };
                if($scope.partsType==undefined||checkTime==undefined){
                    return false;
                }else{
                    service.loadRecord({
                        url :trustUrl+"/check/queryCheckResult",
                        data:freshData,
                        method: "POST"
                    }).success(function(response){
                        $scope.reshResult=response;
                        $scope.repFalse=false;
                        if(response.length==0){
                            $scope.ptsType=true;
                        }else{
                            $scope.ptsType=false;
                        }
                    });
                }
            }
        }]);
	//渠道管理
	mainApp.controller("channelCtrl",["NgTableParams","$rootScope","$scope","commonService","dialogService",
		function(NgTableParams,$rootScope,$scope,service,dialog){
		var self = this;
		//当前页
		$scope.currentPage = 1;
		//每页显示条数
		$scope.curPerPage = 15;
		//是否存在
		$scope.channelExist = false;
		//获取分页数据----更新数据
	    function updataPageRecord(url,params){
	    	//加载中
			JJToolKit.mask($(".main-cont"));
			service.loadRecord({
				url : url+"&pi="+$scope.currentPage+"&ps="+$scope.curPerPage,
		    	method: "JSONP"
	    	}).success(function(response){
				//加载完成
				JJToolKit.unmask($(".main-cont"));
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//刷新
				$scope.list = response.list;
				//数据总数
				$scope.totalNum = response.total;
			}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
	    }
		//查询渠道
		$scope.queryData = function(){
			//当前页
			$scope.currentPage = 1;
			//每页显示条数
			$scope.curPerPage = 15;
			var name = $scope.channelName;
			var url = $rootScope.URL_ROOT + "/channel/all?callback=JSON_CALLBACK";
			if(name){
				url = url + "&name="+name;
			}
			//加载中
			JJToolKit.mask($(".main-cont"));
			//查询加载
			var queryLoad = true;
            service.loadRecord({
                url:url+"&pi="+$scope.currentPage+"&ps="+$scope.curPerPage,
                method:"JSONP"
            }).success(function(response){
                //加载完成
                JJToolKit.unmask($(".main-cont"));
                if($rootScope.errorMsg){
                    alert($rootScope.errorMsg);
                    return false;
                }
                //数据总数
				$scope.totalNum = response.total;
			    //表格
				self.tableParams= new NgTableParams({
					count: $scope.curPerPage
				},
				{
					total: $scope.totalNum,
					counts: 0,
					paginationMaxBlocks: 8,
					getData: function(params){					
						//当前页
						$scope.currentPage = params.page();
						//排序字段，排序方式
						var orderField = "",orderType = "";
						for (var key in params.sorting() ) {
					        orderField = key;
					        orderType = params.sorting()[key];
					    }
						//重新排序
						if(orderField && params.sorting() != preOrder){
							preOrder = params.sorting();
							//获取过全部数据
							if($scope.changelist.length == $scope.totalNum){
								//排序

							}else{
								//更新数据
				            	updataPageRecord(url);
							}
						}else{
							if(queryLoad){
					            queryLoad = false;
					            //数据信息
								$scope.list = response.list;
							}else{
								//更新数据
				            	updataPageRecord(url);
							}
						}
			            return $scope.list;
					}
				});
	    	}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
		}
		//添加渠道信息
		$scope.addData = function(){
			//弹出窗口
			dialog.showDialog($scope,{
				templateUrl:"pages/channelInfo.html",
				title:"添加渠道信息",
				buttons:[{
					handler: function(scope,windowCont){
						var dialog = angular.element(windowCont).find(".modal-dialog");
						JJToolKit.mask(dialog);
						//判断渠道标识是否存在
						service.loadRecord({
							url : $rootScope.URL_ROOT + "/channel/isexist?callback=JSON_CALLBACK&code="+scope.formData.code,
					    	method: "JSONP"
				    	}).success(function(response){
				    		JJToolKit.unmask(dialog);
					    	if($rootScope.errorMsg){
								alert($rootScope.errorMsg);
								return false;
							}
							//是否存在
							scope.channelExist = response.msg;
							if(response.msg == "true"){
								
							}else{
								JJToolKit.mask(dialog);
								var params = scope.formData;
								params = JSON.stringify(params) || "";
								service.loadRecord({
									url : $rootScope.URL_ROOT + "/channel/insert?callback=JSON_CALLBACK&param="+params,
							    	method: "JSONP"
						    	}).success(function(response){
						    		JJToolKit.unmask(dialog);
							    	if($rootScope.errorMsg){
										alert($rootScope.errorMsg);
										return false;
									}
						    		//关闭窗口
						    		scope.close();
						    		//刷新列表
						    		$scope.queryData();
						    	}).error(function(e){
						    		JJToolKit.unmask(dialog);
						    		alert("异常:"+e);
						    	});
							}
				    	}).error(function(e){
				    		JJToolKit.unmask(dialog);
				    		alert("异常:"+e);
				    	});
					},
					selectDisabled:"form.$invalid",
					label: "确定",
            		cssClass: "btn-primary"
				},{
					label: "取消",
            		cssClass: "btn-default"
				}]
			});
		}
		//修改渠道信息

		$scope.editData = function(channelid){
			//弹出窗口
			dialog.showDialog($scope,{
				templateUrl:"pages/channelInfo.html",
				title:"修改渠道信息",
				callback: function(scope){
					//获取渠道信息
					service.loadRecord({
						url : $rootScope.URL_ROOT + "/channel/getchannel?callback=JSON_CALLBACK&id="+channelid,
				    	method: "JSONP"
			    	}).success(function(response){
				    	if($rootScope.errorMsg){
							alert($rootScope.errorMsg);
							return false;
						}
						scope.formData = response.entity;
			    	}).error(function(e){
			    		alert("异常:"+e);
			    	});
				},
				buttons:[{
					handler: function(scope,windowCont){
						var dialog = angular.element(windowCont).find(".modal-dialog");
						//保存中
						JJToolKit.mask(dialog);
						var params = scope.formData;
						params = JSON.stringify(params) || "";
						service.loadRecord({
							url : $rootScope.URL_ROOT + "/channel/update?callback=JSON_CALLBACK&param="+params,
					    	method: "JSONP"
				    	}).success(function(response){
				    		JJToolKit.unmask(dialog);
					    	if($rootScope.errorMsg){
								alert($rootScope.errorMsg);
								return false;
							}
				    		//关闭窗口
				    		scope.close();
				    		//刷新列表
				    		$scope.queryData();
				    	}).error(function(e){
				    		JJToolKit.unmask(dialog);
				    		alert("异常:"+e);
				    	});
					},
					selectDisabled:"form.$invalid",
					label: "确定",
            		cssClass: "btn-primary"
				},{
					label: "取消",
            		cssClass: "btn-default"
				}]
			});
		}
		//删除渠道信息
		$scope.deleteData = function(channelid){
			if(confirm("您确认要删除吗？")){
				service.loadRecord({
					url : $rootScope.URL_ROOT + "/channel/delete?callback=JSON_CALLBACK&id="+channelid,
			    	method: "JSONP"
		    	}).success(function(response){
			    	if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
		    		//刷新列表
		    		$scope.queryData();
		    	}).error(function(e){
		    		alert("异常:"+e);
		    	});
			}
		}
	}]);

    //优惠码管理
    mainApp.controller("promoCtrl",["$filter","$rootScope","$scope","NgTableParams","commonService","dialogService",
    	function($filter,$rootScope,$scope,NgTableParams,service,dialog){
		var self = this;
		//当前页
        $scope.currentPage = 1;
        //每页显示条数
        $scope.curPerPage = 15; 
        //口令类型
        var comdType = [{
			id:"1",
			name:"新人"
		},{
			id:"2",
			name:"限额"
		},{
			id:"3",
			name:"限次"
		},{
			id:"4",
			name:"不限"
		},{
			id:"5",
			name:"单次"
		}];
		//口令状态
		var codeStatus = [{
			id:"0",
			name:"全部订单"
		},{
			id:"1",
			name:"待上传资料"
		},{
			id:"2",
			name:"待付定金"
		},{
			id:"3",
			name:"待审核"
		},{
			id:"4",
			name:"待付评估费"
		},{
			id:"5",
			name:"待抵押"
		},{
			id:"6",
			name:"待确认"
		},{
			id:"7",
			name:"待评价"
		},{
			id:"8",
			name:"待完成"
		}];
		//发放状态
		var usedStatus = [{
			id:"0",
			name:"未发放"
		},{
			id:"1",
			name:"已发放"
		}];
		//物品类型
        var goodTypes = [{
        	id: "1",
        	name: "抵现红包"
        },{
        	id: "2",
        	name: "加息券"
        },{
        	id: "3",
        	name: "VIP"
        }];
		//获取活动信息
		var genActivities = function(scope){
			if($scope.activities){
				scope.activities = $scope.activities;
			}else{
				var url = $rootScope.URL_ROOT + "/redeem/activity?callback=JSON_CALLBACK";
				service.loadRecord({
					url : url,
			    	method: "JSONP"
		    	}).success(function(response){
			    	if($rootScope.errorMsg){
						alert("活动信息："+$rootScope.errorMsg);
						return false;
					}
		    		//列表
		    		scope.activities = response.list;
		    		$scope.activities = response.list;
		    	}).error(function(e){
		    		alert("异常:"+e);
		    	});
			}		
		}
		//获取渠道信息
		var genChannels = function(scope){
			if($scope.channels){
				scope.channels = $scope.channels;
			}else{
				var url = $rootScope.URL_ROOT + "/channel/select?callback=JSON_CALLBACK";
				service.loadRecord({
					url : url,
			    	method: "JSONP"
		    	}).success(function(response){
			    	if($rootScope.errorMsg){
						alert("渠道信息："+$rootScope.errorMsg);
						return false;
					}
		    		//列表
		    		scope.channels = response.list;
		    		$scope.channels = response.list;
		    	}).error(function(e){
		    		alert("异常:"+e);
		    	});
			}		
		}
		//获取兑换物品信息
		var genGoods = function(scope){
			if($scope.goods){
				scope.goods = $scope.goods;
			}else{
				var url = $rootScope.URL_ROOT + "/award/select?callback=JSON_CALLBACK";
				service.loadRecord({
					url : url,
			    	method: "JSONP"
		    	}).success(function(response){
			    	if($rootScope.errorMsg){
						alert("兑换物品信息："+$rootScope.errorMsg);
						return false;
					}
		    		//列表
		    		scope.goods = response.list;
		    		$scope.goods = response.list;
		    	}).error(function(e){
		    		alert("异常:"+e);
		    	});
			}			
		}  
		//口令状态
		$scope.codeStatus = codeStatus;
		//发放状态
		$scope.usedStatus = usedStatus;
		//物品类型
		$scope.goodTypes = goodTypes;
		//获取渠道
		genChannels($scope);
		//获取活动
		genActivities($scope);
		//获取分页数据----更新数据
	    function updataPageRecord(url,params){
	    	//加载中
			JJToolKit.mask($(".main-cont"));
			service.loadRecord({
				url : url+"&pi="+$scope.currentPage+"&ps="+$scope.curPerPage,
		    	method: "JSONP"
	    	}).success(function(response){
				//加载完成
				JJToolKit.unmask($(".main-cont"));
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//刷新
				$scope.list = response.list;
				//数据总数
				$scope.totalNum = response.total;
			}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
	    }
	    //全选
	    $scope.selectAll = function(selected){
	    	angular.forEach($scope.list,function(item){
	    		item.selected = selected;
	    	});
	    }
	    self.selected = false;
		//查询优惠码
		$scope.proQuery = function(){	
			//当前页
			$scope.currentPage = 1;
			//每页显示条数
			$scope.curPerPage = 15;		
			var params = {
				"channel_id":$scope.channel_id,//渠道
				"code":$scope.code,//口令
				"is_used":$scope.is_used,//口令状态
				"is_send":$scope.is_send,//发放状态
				"user_id":$scope.user_id,//兑换人
				"goods_type":$scope.goods_type,//物品类型
				"insert_time":$scope.insert_time || $("#insert_time").val(),//生成时间
				"activity_id":$scope.activity_id//活动
			}
			var url = $rootScope.URL_ROOT + "/redeem/list?callback=JSON_CALLBACK&param="+JSON.stringify(params);
	    	//加载中
			JJToolKit.mask($(".main-cont"));
			//查询加载
			var queryLoad = true;
			service.loadRecord({
				url : url+"&pi="+$scope.currentPage+"&ps="+$scope.curPerPage,
		    	method: "JSONP"
	    	}).success(function (response) {
				//加载完成
				JJToolKit.unmask($(".main-cont"));
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}				
				//数据总数
				$scope.totalNum = response.total;
			    //表格
				self.tableParams= new NgTableParams({
					count: $scope.curPerPage
				},
				{
					total: $scope.totalNum,
					counts: 0,
					paginationMaxBlocks: 8,
					getData: function(params){	
						//重置全选
						self.selected	= false;				
						//当前页
						$scope.currentPage = params.page();
						//排序字段，排序方式
						var orderField = "",orderType = "";
						for (var key in params.sorting() ) {
					        orderField = key;
					        orderType = params.sorting()[key];
					    }
						//重新排序
						if(orderField && params.sorting() != preOrder){
							preOrder = params.sorting();
							//获取过全部数据
							if($scope.list.length == $scope.totalNum){
								//排序

							}else{
								//更新数据
				            	updataPageRecord(url);
							}
						}else{
							if(queryLoad){
					            queryLoad = false;
					            //数据信息
								$scope.list = response.list;
							}else{
								//更新数据
				            	updataPageRecord(url);
							}
						}
			            return $scope.list;
					}
				});
			}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});	    	
		}
		//导出
		$scope.proExport = function(){
			var params = {
				"channel_id":$scope.channel_id,//渠道
				"code":$scope.code,//口令
				"is_used":$scope.is_used,//口令状态
				"is_send":$scope.is_send,//发放状态
				"user_id":$scope.user_id,//兑换人
				"goods_type":$scope.goods_type,//物品类型
				"insert_time":$scope.insert_time || $("#insert_time").val(),//生成时间
				"activity_id":$scope.activity_id//活动
			}
			var url = $rootScope.AUTH_URL + "/redeem/export";
			//加载中
			JJToolKit.mask($(".main-cont"));
			service.loadRecord({
				url : url,
		    	method: "POST",
				params:{
					param:JSON.stringify(params)
				}
	    	}).success(function(response){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
				if(response.status == true && response.entity){
                    window.open($rootScope.URL_ROOT+"/"+response.entity.path);
                }else{
                    alert("导出失败,"+response.msg);
                }
	    	}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
		}
        //添加
        $scope.proAdd = function(){
			//弹出窗口
			dialog.showDialog($scope,{
				templateUrl:"pages/promocodeAdd.html",
				title:"生成优惠码信息",
				buttons:[{
					handler: function(scope,windowCont){
						var dialog = angular.element(windowCont).find(".modal-dialog");
						//保存中
						JJToolKit.mask(dialog);
						//口令有效期
						var code_expirydate = form.code_expirydate.value;
						if(code_expirydate == undefined || code_expirydate == ""){
							scope.no_code_expirydate = true;
							return false;
						}
						var params = scope.formData;
						//口令有效期
						params.code_expirydate = code_expirydate;
						params = JSON.stringify(params) || "";
						service.loadRecord({
							url : $rootScope.URL_ROOT + "/redeem/createpromocode?callback=JSON_CALLBACK&param="+params,
					    	method: "JSONP"
				    	}).success(function(response){
				    		JJToolKit.unmask(dialog);
					    	if($rootScope.errorMsg){
								alert($rootScope.errorMsg);
								return false;
							}
				    		//关闭窗口
				    		scope.close();
				    		//刷新列表
				    		$scope.proQuery();
				    	}).error(function(e){
				    		JJToolKit.unmask(dialog);
				    		alert("异常:"+e);
				    	});				
					},
					selectDisabled:"form.$invalid",
					label: "确定",
            		cssClass: "btn-primary"
				},{
					label: "取消",
            		cssClass: "btn-default"
				}],
				callback: function(scope){
					//口令类型
			        scope.comdType = comdType;
					//渠道
					genChannels(scope);
					//兑换物品
					genGoods(scope);
					//活动
					genActivities(scope);
					//生成数量
					scope.formData.num = 1;
					//选择物品---物品类型
					scope.changeGoods = function(){
						//兑换物品
						var goodid = scope.formData.goods;
						var curGood = _.findWhere(scope.goods, {id: goodid});
						//兑换物品类型
						var type = curGood.type;
						//加息券
						if(type == "2"){
							var temp = angular.copy(comdType);
							//删除限额
							temp.splice(1,1);
							scope.comdType = temp;
						}else if(type == "3"){//vip
							var temp = angular.copy(comdType);
							//删除限额、限次
							temp.splice(1,2);
							scope.comdType = temp;
						}else{
							//口令类型
			        		scope.comdType = comdType;
						}
					}
				}
			});
        };
        //修改
        $scope.proEdit = function(code){
			//弹出窗口
			dialog.showDialog($scope,{
				templateUrl:"pages/promocodeUpdate.html",
				title:"修改优惠码信息",
				buttons:[{
					handler: function(scope,windowCont){
						var dialog = angular.element(windowCont).find(".modal-dialog");
						//保存中
						JJToolKit.mask(dialog);
						//口令有效期
						var code_expirydate = form.code_expirydate.value;
						if(code_expirydate == undefined || code_expirydate == ""){
							scope.no_code_expirydate = true;
							return false;
						}
						var params = scope.formData;
						//口令有效期
						params.code_expirydate = code_expirydate;
						params = JSON.stringify(params) || "";
						service.loadRecord({
							url : $rootScope.URL_ROOT + "/redeem/update?callback=JSON_CALLBACK&param="+params,
					    	method: "JSONP"
				    	}).success(function(response){
				    		JJToolKit.unmask(dialog);
					    	if($rootScope.errorMsg){
								alert($rootScope.errorMsg);
								return false;
							}
				    		//关闭窗口
				    		scope.close();
				    		//刷新列表
				    		$scope.proQuery();
				    	}).error(function(e){
				    		JJToolKit.unmask(dialog);
				    		alert("异常:"+e);
				    	});				
					},
					selectDisabled:"form.$invalid",
					label: "确定",
            		cssClass: "btn-primary"
				},{
					label: "取消",
            		cssClass: "btn-default"
				}],
				callback: function(scope){
					//口令类型
			        scope.comdType = comdType;
					//发放状态
					scope.usedStatus = usedStatus;
					//兑换物品
					genGoods(scope);
					//获取优惠码信息
					service.loadRecord({
						url : $rootScope.URL_ROOT + "/redeem/getpromocode?callback=JSON_CALLBACK&code="+code,
				    	method: "JSONP"
			    	}).success(function(response){
				    	if($rootScope.errorMsg){
							alert($rootScope.errorMsg);
							return false;
						}
						scope.formData = response.entity;
						//口令有效期
						var code_expirydate = response.entity.code_expirydate;
						scope.formData.code_expirydate = $filter('date')(code_expirydate,'yyyy-MM-dd');
			    	}).error(function(e){
			    		alert("异常:"+e);
			    	});
				}
			});
        };
        //发放
        $scope.proGrant = function(){
			//获取选中行的口令
        	var codes = "";
        	angular.forEach($scope.list,function(item){
	    		if(item.selected == true){
	    			codes += item.code + ",";
	    		}
	    	});
	    	//未选中
	    	if(codes == ""){
	    		alert("请选择要发放的记录！");
	    		return false;
	    	}else{
	    		codes = codes.substring(0,codes.length-1);
	    	}
        	if(confirm("您确认要发放选中的信息吗？")){
				service.loadRecord({
					url : $rootScope.URL_ROOT + "/redeem/send?callback=JSON_CALLBACK&param="+codes,
			    	method: "JSONP"
		    	}).success(function(response){
			    	if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
		    		//刷新列表
		    		$scope.proQuery();
		    	}).error(function(e){
		    		alert("异常:"+e);
		    	});
			}
        }
        //删除
        $scope.proDelete = function(){
        	//获取选中行的口令
        	var codes = "";
        	angular.forEach($scope.list,function(item){
	    		if(item.selected == true){
	    			codes += item.code + ",";
	    		}
	    	});
	    	//未选中
	    	if(codes == ""){
	    		alert("请选择要删除的记录！");
	    		return false;
	    	}else{
	    		codes = codes.substring(0,codes.length-1);
	    	}
        	if(confirm("您确认要删除选中的信息吗？")){
				service.loadRecord({
					url : $rootScope.URL_ROOT + "/redeem/delete?callback=JSON_CALLBACK&param="+codes,
			    	method: "JSONP"
		    	}).success(function(response){
			    	if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}
		    		//刷新列表
		    		$scope.proQuery();
		    	}).error(function(e){
		    		alert("异常:"+e);
		    	});
			}
        }
    }]);

    //系统设置
    mainApp.controller("systemlayoutCtrl",["$compile","$rootScope","$scope","commonService",function($compile,$rootScope,$scope,service){
    	//动态生成表单内容
    	function genSystemHtml(list){
    		var returnHtml = "";
    		if(list == undefined || list == null){
    			return returnHtml;
    		}
    		//detail最大值
    		var detAry = [];
    		angular.forEach(list,function(item){
    			//每一行内容
    			returnHtml = returnHtml + '<tr class="config_item" config_id="'+item.config_id+'">';
    			//左侧总标题
    			returnHtml = returnHtml + '<td class="config_hd">'+item.label_cn+'</td>';
    			//右侧对应的配置项
    			var detail = item.detail;
    			detAry.push(detail.length);
    			for(var i=0,len=detail.length;i<len;i++){
    				returnHtml = returnHtml + '<td class="config_bd">';
    				//标签
    				if(detail[i].label && detail[i].label != ""){
    					returnHtml = returnHtml + '<label class="label-fx">'+detail[i].label+':</label>';
    				} 
    				returnHtml = returnHtml + '<input class="emb form-control" type="text" value="'+detail[i].value+'"/>'; 				
    				returnHtml = returnHtml + '</td>';
    			}
    			returnHtml = returnHtml + '</tr>';
    		});
    		//最大值
    		var detMax = Math.max.apply(null,detAry);
    		returnHtml = returnHtml + '<tr class="config_item"><td colspan="'+(detMax+1)+'" class="txtr">';			
			returnHtml = returnHtml + '<button class="btn btn-primary" ng-click="sysSubmit();">提交</button>';
			returnHtml = returnHtml + '</td></tr>';
    		return returnHtml;
    	}
    	//获取表单信息
    	$scope.genSystemForm = function(){
			var url = $rootScope.URL_ROOT + "/redeem/getconfig?callback=JSON_CALLBACK";
			//加载中
			JJToolKit.mask($(".main-cont"));	
			service.loadRecord({
				url : url,
		    	method: "JSONP"
	    	}).success(function(response){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));  
		    	if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}	
	    		var tableCont = genSystemHtml(response.list);
	    		$("#systemConfig").html($compile(tableCont)($scope));
	    	}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));  
	    		alert("异常:"+e);
	    	});
    	}
        //提交
        $scope.sysSubmit = function(){
        	var list = {},paramlist = [];
        	var trlist = $("#systemConfig tr");
        	angular.forEach(trlist,function(item){
        		//配置id
        		var config_id = angular.element(item).attr("config_id");
        		if(config_id){
        			var param = {
	        			"config_id" : config_id
	        		}
	        		var valuelist = "";
	        		//输入框
	        		var inputList = angular.element(item).find(".form-control");
	        		for (var i = 0; i < inputList.length; i++) {
	        			valuelist = valuelist +inputList[i].value + ",";
	        		}
	        		if(valuelist != ""){
	        			valuelist = valuelist.substring(0,valuelist.length-1);
	        		}
	        		param.value = valuelist; 
	        		paramlist.push(param);       		  
        		} 
        	});
        	//参数
        	list.param = paramlist;
        	var url = $rootScope.URL_ROOT + "/redeem/updateconfig?callback=JSON_CALLBACK&param="+JSON.stringify(list);
			//加载中
			JJToolKit.mask($(".main-cont"));	
			service.loadRecord({
				url : url,
		    	method: "JSONP"
	    	}).success(function(response){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));  
		    	if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}	
				alert("保存成功！");
	    	}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));  
	    		alert("异常:"+e);
	    	});
        };
        $scope.genSystemForm();
    }]);

    //兑换物品查看编辑
    mainApp.controller("exchangeCtrl",["NgTableParams","$rootScope","$scope","commonService","dialogService","$http",
    	function(NgTableParams,$rootScope,$scope,service,dialog,$http){
        var self = this;
        //当前页
        $scope.currentPage=1;
        //每条显示页数
        $scope.curPerPage=15;
        //物品类型
        var types = [{
        	id: "1",
        	name: "抵现红包"
        },{
        	id: "2",
        	name: "加息券"
        },{
        	id: "3",
        	name: "VIP"
        }];
        $scope.types = types;
        //加息券下拉框
        function genTickets(scope){
        	if($scope.tickets){
				scope.tickets=$scope.tickets;
        	}else{
        		$http.jsonp($rootScope.URL_ROOT + "/award/tickets?callback=JSON_CALLBACK").success(
	            function(response){
	                $scope.tickets=response.list;    
	                scope.tickets=response.list;                
	            });
        	}
        }
		//vip下拉框
        function genVips(scope){
        	if($scope.vips){
				scope.vips=$scope.vips;
        	}else{
        		$http.jsonp($rootScope.URL_ROOT + "/award/vipmenu?callback=JSON_CALLBACK").success(
	            function(response){
	                $scope.vips=response.list;    
	                scope.vips=response.list;                
	            });
        	}
        }
		//获取分页数据----更新数据
	    function updataPageRecord(url,params){
	    	//加载中
			JJToolKit.mask($(".main-cont"));
			service.loadRecord({
				url : url+"&pi="+$scope.currentPage+"&ps="+$scope.curPerPage,
		    	method: "JSONP"
	    	}).success(function(response){
				//加载完成
				JJToolKit.unmask($(".main-cont"));
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//刷新
				$scope.changelist = response.list;
				//数据总数
				$scope.totalNum = response.total;
			}).error(function(e){
	    		//加载完成
				JJToolKit.unmask($(".main-cont"));
	    		alert("异常:"+e);
	    	});
	    }
        //搜索---兑换物品列表
        $scope.changeQuery = function(){            
            //当前页
			$scope.currentPage = 1;
			//每页显示条数
			$scope.curPerPage = 15;		
			//类型
			var type = $scope.exchangeType;
			var url = $rootScope.URL_ROOT + "/award/all?callback=JSON_CALLBACK";
			if(type != undefined && type != ""){
				url = url + "&type="+type;
			}
	    	//加载中
			JJToolKit.mask($(".main-cont"));
			//查询加载
			var queryLoad = true;
            service.loadRecord({
                url:url+"&pi="+$scope.currentPage+"&ps="+$scope.curPerPage,
                method:"JSONP"
            }).success(function(response){
                //加载完成
                JJToolKit.unmask($(".main-cont"));
                if($rootScope.errorMsg){
                    alert($rootScope.errorMsg);
                    return false;
                }
                //数据总数
				$scope.totalNum = response.total;
			    //表格
				self.tableParams= new NgTableParams({
					count: $scope.curPerPage
				},
				{
					total: $scope.totalNum,
					counts: 0,
					paginationMaxBlocks: 8,
					getData: function(params){					
						//当前页
						$scope.currentPage = params.page();
						//排序字段，排序方式
						var orderField = "",orderType = "";
						for (var key in params.sorting() ) {
					        orderField = key;
					        orderType = params.sorting()[key];
					    }
						//重新排序
						if(orderField && params.sorting() != preOrder){
							preOrder = params.sorting();
							//获取过全部数据
							if($scope.changelist.length == $scope.totalNum){
								//排序

							}else{
								//更新数据
				            	updataPageRecord(url);
							}
						}else{
							if(queryLoad){
					            queryLoad = false;
					            //数据信息
								$scope.changelist = response.list;
							}else{
								//更新数据
				            	updataPageRecord(url);
							}
						}
			            return $scope.changelist;
					}
				});
            }).error(function(e){
                //加载完成
                JJToolKit.unmask($(".main-cont"));
                alert("异常:"+e);
            });
        };
        //添加
        $scope.changeAdd = function(){
            //弹出窗口
            dialog.showDialog($scope,{
                templateUrl:"pages/exchangeInfo.html",
                title:"添加兑换物品",
                callback: function(scope){
                	//类型
                	scope.types = types;
                	//加息券下拉框
                	genTickets(scope);
                	//vip下拉框
                	genVips(scope);
                },
                buttons:[{
                    handler:function(scope,windowCont){
						var dialog = angular.element(windowCont).find(".modal-dialog");
						//保存中
						JJToolKit.mask(dialog);
                        var pramas = scope.formData;
                        pramas = JSON.stringify(pramas)|| "";
                        service.loadRecord({
                            url:$rootScope.URL_ROOT + "/award/insert?callback=JSON_CALLBACK&param="+encodeURI(pramas),
                            method:"JSONP"
                        }).success(function(response){
                        	JJToolKit.unmask(dialog);
                            if($rootScope.errorMsg){
                                alert($rootScope.errorMsg);
                                return false;
                            }
                            //关闭窗口
                            scope.close();
                            //刷新列表
                            $scope.changeQuery();
                        }).error(function(e){
                        	JJToolKit.unmask(dialog);
                            alert("异常"+e);
                        });
                    },
                    selectDisabled:"form.$invalid",
                    label:"确定",
                    cssClass:"btn-primary"
                },{
                    label:"取消",
                    cssClass:"btn-default"
                }]
            });
        }
        //修改兑换物品
        $scope.changeEdit = function(exchangeid){
            //弹出窗口
            dialog.showDialog($scope,{
                templateUrl:"pages/exchangeInfo.html",
                title:"修改兑换物品信息",
                callback:function(scope){
                	//类型
                	scope.types = types;
                	//加息券下拉框
                	genTickets(scope);
                	//vip下拉框
                	genVips(scope);
                    //获取兑换物品
                    service.loadRecord({
                        url:$rootScope.URL_ROOT + "/award/getaward?callback=JSON_CALLBACK&id="+exchangeid,
                        method:"JSONP"
                    }).success(function(response){
                        if($rootScope.errorMsg){
                            alert($rootScope.errorMsg);
                            return false;
                        }
                        scope.formData = response.entity;
                    }).error(function(e){
                        alert("异常"+e);
                    });
                },
                buttons:[{
                    handler:function(scope,windowCont){
						var dialog = angular.element(windowCont).find(".modal-dialog");
						//保存中
						JJToolKit.mask(dialog);
                        var params = scope.formData;
                        params = JSON.stringify(params) || "";
                        service.loadRecord(
                            {
                                url:$rootScope.URL_ROOT + "/award/update?callback=JSON_CALLBACK&param="+params,
                                method:"JSONP"
                            }).success(function(response){
                            	JJToolKit.unmask(dialog);
                                if($rootScope.errorMsg){
                                    alert($rootScope.errorMsg);
                                    return false;
                                }
                                //关闭窗口
                                scope.close();
                                //刷新列表
                                $scope.changeQuery();
                            }).error(function(e){
                            	JJToolKit.unmask(dialog);
                                alert("异常"+e);
                            });
                    },
                    selectDisabled:"form.$invalid",
                    label:"确定",
                    cssClass:"btn-primary"
                },{
                    label:"取消",
                    cssClass:"btn-dafault"
                }]
            });
        }
        //删除兑换物品
        $scope.changeDelete =  function(exchangeid){
            if(confirm("您确认要删除吗？")){
                service.loadRecord({
                    url:$rootScope.URL_ROOT + "/award/delete?callback=JSON_CALLBACK&id="+exchangeid,
                    method:"JSONP"
                }).success(function(response){
                    if($rootScope.errorMsg){
                        alert($rootScope.errorMsg);
                        return false;
                    }
                    //刷新列表
                    $scope.changeQuery();
                }).error(function(e){
                    alert("异常"+e)
                });
            }
        }
    }]);
	//模态窗口service
	mainApp.factory("dialogService",["$document","$compile","$q","$templateCache","$http","$rootScope",
		function($document,$compile,$q,$templateCache,$http,$rootScope){
		var dialog = {};
		//默认按钮
		var defaultButtonConfig = [{
            label: "确定",
            cssClass: "btn-primary"
        }, {
            label: "取消",
            cssClass: "btn-default"
        }];
		//获取html
		function genHtml(settings) {
            return settings.template ? $q.when(settings.template) : $http.get(settings.templateUrl, {
                cache: $templateCache
            }).then(function(response) {
                return response.data;
            })
        }
		//打开窗口
		dialog.open = function(settings){
			var $body = $document.find("body").eq(0);
			//创建新的子作用域
			var newScope = $rootScope.$new(true);
			newScope.index = $(".modal-backdrop").length;
			//遮罩层
			var backdrop = $compile("<div modal-backdrop></div>")(newScope);
			$body.append(backdrop);
			var $window = angular.element("<div modal-window></div>");
	        $window.attr("window-class", settings.windowClass);
	        $window.attr("index", $(".modal-window").length);
	        $window.attr("animate", "animate");
	        //添加窗口框架
	        var content = '<div class="modal-header"><button type="button" class="close" ng-click="close(false)">×</button>'
            	+'<h5 class="modal-title">{{title}}</h5></div>'+
            	'<div class="modal-body clearfix row">'+settings.content+'</div>'+
            	'<div class="modal-footer"><button ng-repeat="btn in buttons" ng-click="eventHandler(btn.handler)"'
            	+'  ng-disabled="{{btn.selectDisabled}}" class="btn" ng-class="btn.cssClass">{{btn.label}}</button></div>';
	        $window.html(content);
	        //创建新的子作用域
			var contScope = settings.scope.$new(true);
			//标题
			contScope.title = settings.title;
			//按钮
			contScope.buttons = settings.buttons || defaultButtonConfig;
			//表单内容
			contScope.formData = settings.formData || {};
			//回调函数
			angular.isFunction(settings.callback) && settings.callback(contScope);
			//关闭窗口
			contScope.close=function(){
				backdrop.remove();
				windowCont.remove();
				$body.removeClass("modal-open");
			}
			//点击按钮方法
			contScope.eventHandler = function(handler) {
                if (angular.isFunction(handler)) {
                    handler(contScope,windowCont);
                    return;
                }
                contScope.close();
            }
	        var windowCont = $compile($window)(contScope);
	        //弹出窗口
	        $body.append(windowCont);
	        $body.addClass("modal-open");
		}
		//显示窗口
		dialog.showDialog = function(scope,settings){
			//获取内容html
			genHtml(settings).then(function(response){
				dialog.open({
					//作用域
					scope:scope,
					//窗口内容
					content: response,
					//自定义窗口样式
					windowClass:settings.windowClass,
					//窗口标题
					title:settings.title,
					//窗口显示按钮
					buttons:settings.buttons || defaultButtonConfig,
					//打开窗口时回调函数
					callback:settings.callback
				});
			});
		}
		return dialog;
	}]);
	//遮罩层
	mainApp.directive("modalBackdrop",["$timeout",function($timeout){
		return{
			restrict:"A",
			replace:true,
			templateUrl:"pages/directives/backdrop.html",
			link:function(scope){
				scope.animate = false;
				$timeout(function() {
					scope.animate = true;
				}, 0);
			}
		}
	}]);
	//模态窗口
	mainApp.directive("modalWindow",["$timeout",function($timeout){
		return{
			restrict:"A",
			scope: {
	            index: "@",
	            animate: "="
	        },
			replace:true,
			transclude: true,
			templateUrl:"pages/directives/window.html",
			link:function(scope,elem,attrs){
				//自定义样式
				scope.windowClass = attrs.windowClass || "";
				scope.animate = false;
				$timeout(function() {
					scope.animate = true;
				}, 0);
			}
		}
	}]);
	//排序
	mainApp.filter("jjOrderBy",function(){
		return function(arryVal,orderField,orderType,columnsData){
			//排序字段的索引
			var orderFieldNum = getIndexByField(columnsData.columns,orderField);
			//排序字段类型
			var orderFieldType = getTypeByField(columnsData.columnInfos);
			arryVal.sort(function(ary1,ary2){
				var retVal = "";
				if(orderFieldType == "number"){
					retVal = ary1[orderFieldNum]-ary2[orderFieldNum];
				}else if(orderFieldType == "date"){
					retVal = new Date(ary1[orderFieldNum]).getTime()-new Date(ary2[orderFieldNum]).getTime();
				}else{
					retVal = ary1[orderFieldNum].localeCompare(ary2[orderFieldNum])
				}
				//倒叙
				if(orderType == "desc"){
					return -retVal;
				}
				return retVal;
			});
		}
	});
	//列表行信息
	mainApp.directive("jjTable",["$compile","$routeParams",function($compile,$routeParams){
		return {
			restrict: "A",
			link: function(scope,element,attrs){
				//报表类型
				var type = $routeParams.type;
				scope.$watch('repertConfig',function(newValue,oldValue){
					if(newValue){						
						//生成表格行
						var tableHtml = genTRCont(type);
						var $table = $(element).find(".reportTable");
						$table.html(tableHtml);
						$compile($table)(scope);
					}
			    });
			}
		}
	}]);
	//展开折叠
	mainApp.directive("jjMainFold",function(){
		return {
			restrict: "A",
			link: function(scope,element,attrs){
				//点击事件
				element.click(function(){
					//隐藏展示查询条件
					angular.element(".queryCont").toggle();
				});
			}
		}
	});
	mainApp.directive("dropdown",function(){
		return {
			restrict: "A",
			link: function(scope,element,attrs){
				element.click(function(){
					$(this).toggleClass("open");
				});
			}
		}
	});
	//报表内容扩大缩小
	mainApp.directive("jjContZoom",function(){
		return {
			restrict: "A",
			link: function(scope,element,attrs){
				//点击事件
				element.click(function(){
					$(this).parent().toggleClass("cont-narrow");
					var table= $(this).next();
				});
			}
		}
	});
	//日期控件
	mainApp.directive("jjDatePicker",function(){
		return {
			restrict: "A",
			link: function(scope,element,attrs){
				//日期格式
				var datefm = scope.searchItem.fm || 'yyyy-MM-dd';
				var ehtml = '<label class="font-x  px-i0">'+scope.searchItem.label+'：</label>';
				ehtml += '<input class="editbox4 form-control Wdate" size="12" type="text" ng-model="searchItem.value" id="'+scope.searchItem.id+'" onfocus="WdatePicker({readOnly:true,dateFmt:\''+datefm+'\'})" />';
				element.html(ehtml);
			}
		}
	});
	//日期范围控件
	mainApp.directive("jjDateRangePicker",function(){
		return {
			restrict: "A",
			link: function(scope,element,attrs){
				var optionSet = {
					startDate: moment().subtract('days', 30),
					endDate: moment(),
					dateLimit: { days: 600 },
					showDropdowns: true,
					showWeekNumbers: false,// 可以选择当前为第几周
					timePicker: false,// 可以选择时分
					timePickerIncrement: 1,
					timePicker12Hour: false,// 可以选择时间是12小时制还是24小时制
					  getValue: function () {
				          return false;
					  },
					ranges: {
					   '今天': [moment().startOf('day'), moment()],
					   '昨天': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
					   '最近七天': [moment().subtract('days', 6).startOf('day'), moment()],
					   '最近三十天': [moment().subtract('days', 29).startOf('day'), moment()],
					   '本月': [moment().startOf('month'), moment()]
					},
					opens: 'right',
					format: 'YYYY-MM-DD',
					separator: '  至  ',
					locale: {
						applyLabel: '确定选择',
						cancelLabel: '取消',
						fromLabel: '开始时间',
						toLabel: '结束时间',
						customRangeLabel: '自定义选择',
						daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
						monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
						firstDay: 1
					}
				};
				$(element).daterangepicker(optionSet, function(start, end, label) {
			    }).on('apply.daterangepicker',function(ev,picker){
			    	var $start = $(element).next(".start");
			        $start.val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
			        $start.next(".end").val(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			        $(element).val(picker.startDate.format('YYYY-MM-DD') + '  至  ' + picker.endDate.format('YYYY-MM-DD')).attr("readonly","true");
			    });
			    //清除
			    $(element).siblings(".clear").click(function(){
			    	$(element).val("");
			    	$(element).next(".start").val("");
			    	$(element).next(".start").next(".end").val("");
			    })
			}
		}
	});

	mainApp.filter('to_trusted', ['$sce', function ($sce) {
	    return function (text) {
	        return $sce.trustAsHtml(text);
	    };
	}]);

	//任务类型
	mainApp.filter('to_timingType',function () {
		return function (inputtype) {
			var outtype = "";
			if(inputtype == "0"){
				outtype = "每日执行";
			}else if(inputtype == "1"){
                outtype = "每日多次执行";
            }else if(inputtype == "2"){
                outtype = "每月执行";
			}else  if(inputtype == "3"){
                outtype = "每周执行";
			}
			return outtype;
        }
    })

    //任务维护状态
    mainApp.filter('to_maintainType',function () {
        return function (inputtype) {
            var outtype = "";
            if(inputtype == "0"){
                outtype = "执行中";
            }else if(inputtype == "1"){
                outtype = "执行完成";
            }else if(inputtype == "2"){
                outtype = "执行失败";
            }
            return outtype;
        }
    })

	//高级搜索内容
	mainApp.directive("highMore",["$compile",function($compile){
		return {
			restrict: "A",
			scope: {
				more: "=",
				user: "=",
				account: "=",
				tend: "=",
				tag: "="
			},
			link: function(scope,element,attrs){
				var more = scope.more;
				scope.$watch("more",function(newVal,oldVal){
					if(newVal){
						var moreConds = newVal;
						var moreHtml = "";
						for(var i=0;i<moreConds.length;i++){
							moreHtml += "<div high-" + moreConds[i] +"></div>";
						}
						var $highbd = $(".highbd");
						$highbd.html(moreHtml);
						$compile($highbd)(scope);
					}
				});
				
			}
		}
	}]);
	//高级搜索-基本信息
	mainApp.directive("highUser",["$rootScope","baseService",function($rootScope,baseService){
		return {
			restrict: "A",
			replace: true,
			templateUrl: "pages/directives/user.html",
			link: function(scope,element,attrs){
				//渠道
				//scope.channels = [{"id":"BSY","name":"比搜益"},{"id":"WDTY","name":"网贷天眼"},{"id":"TZJ","name":"投之家"}];
				//客服
				//scope.kefus = [{"id":"ALL","name":"所有客服"},{"id":"聚金航航","name":"聚金航航"},{"id":"聚金岚岚","name":"聚金岚岚"},{"id":"聚金攀攀","name":"聚金攀攀"},{"id":"聚金央央","name":"聚金央央"},{"id":"聚金妍妍","name":"聚金妍妍"},{"id":"聚金格格","name":"聚金格格"},{"id":"聚金督导","name":"聚金督导"},{"id":"聚金鲁克","name":"聚金鲁克"}];
				//地区
				baseService.genAreas(scope);
				//渠道
				baseService.genChannel(scope);
				//客服
				baseService.genKefu(scope);
				scope.$watch('areas',function(newVal,oldVal){
					if(newVal){
						//省
						scope.provinces = _.where(newVal, {PARENTID: "0"});	
					}
				});
							
				//修改省
				scope.$watch('user.province',function(newVal,oldVal){
					if(newVal){
						//市
						scope.cities = _.where(scope.areas, {PARENTID: newVal});
					}
				});
			}
		}
	}]);
	//高级搜索-账户信息
	mainApp.directive("highAccount",function(){
		return {
			restrict: "A",
			replace: true,
			templateUrl: "pages/directives/account.html",
			link: function(scope,element,attrs){
				
			}
		}
	});
	//高级搜索-投资信息
	mainApp.directive("highTend",function(){
		return {
			restrict: "A",
			replace: true,
			templateUrl: "pages/directives/tend.html",
			link: function(scope,element,attrs){
				
			}
		}
	});
	//高级搜索-标签
	mainApp.directive("highTag",["$rootScope","commonService",function($rootScope,commonService){
		return {
			restrict: "A",
			replace: true,
			templateUrl: "pages/directives/tag.html",
			link: function(scope,element,attrs){
				scope.tag = {};
				//参数
                var settings={};
                settings.params = {
                    "id": "1000000"
                };
                settings.url="/eloanadmin/crm/tag/list";
                commonService.loadRecord(settings).success(function(data){ 
                	if($rootScope.errorMsg){
						alert($rootScope.errorMsg);
						return false;
					}  
                    if(data.status == true){
                       var entity = data.entity;
                       var taglist = entity && entity.tags; 
                       scope.taglist = taglist;                          
                    }
                });
                //标签选择
                scope.tagSelect = function(tagid){
                	if(scope.tag.ids == undefined){
                		scope.tag.ids = [tagid];
                	}else{
                		var index = $.inArray(tagid,scope.tag.ids);
                		//不存在
                		if(index == -1){
                			scope.tag.ids.push(tagid);
                		}else{
                			scope.tag.ids.splice(index,1);
                		}
                	};
                    scope.tag[tagid] = !scope.tag[tagid];
                } 
			}
		}
	}]);
	//深度复制
	var deepCopy= function(source) {
		var result=[];
		for (var key in source) {
		    result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
	    }
	    return result;
	}
	//生成表格行
	function genTRCont(type){
		//报表列信息配置
    	var columnsInfo = JJGlobal[type].columnInfos;
    	var columnsData = JJGlobal[type].columns;
    	var trHtml = '<tr ng-repeat="item in list"><td data-title="\'序号\'">{{((currentPage-1)*curPerPage)+($index+1)}}</td>';
    	//遍历列信息
    	for(var i=0,len=columnsData.length;i<len;i++){
    		//列ID
    		var colId = columnsData[i];
    		if(columnsInfo[colId]){
    			//标题
	    		var title = columnsInfo[colId].title;
	    		//是否排序
	    		var sortable = columnsInfo[colId].sortable;
	    		//是否html
	    		var isHtml = columnsInfo[colId].html;
	    		//是否合并列
	    		var rowMerge = columnsInfo[colId].rowMerge;
	    		var tdHtml = "<td data-title=\"'"+ title +"'\"";
	    		//排序
	    		if(sortable) {
	    			tdHtml += " sortable=\"'" + colId + "'\""
	    		}	    		
	    		//合并行
	    		if(rowMerge){
	    			var _tmpTd = tdHtml;
	    			tdHtml += " ng-if=\"item["+i+"].rowflag && item["+i+"].rownum > 1\" rowspan={{item["+i+"].rownum}}>{{item["+i+"].value}}</td>";
	    			tdHtml += _tmpTd + " ng-if=\"!item["+i+"].rowflag && item["+i+"].rownum > 1\" ng-show={{item["+i+"].rowflag}}>{{item["+i+"].value}}</td>";
	    			tdHtml += _tmpTd + " ng-if=\"item["+i+"].rowflag == undefined\">{{item["+i+"].value}}</td>"
	    		}else{
	    			//是否html
		    		if(isHtml){
						tdHtml += " ng-bind-html='item["+i+"] | to_trusted'></td>";
					}else{
						tdHtml += ">{{item["+i+"]}}</td>";
					}	    			
	    		}
	    		//添加到tr中
	    		trHtml += tdHtml;
    		}
    	}
    	trHtml += '</tr>';
    	trHtml += '<tr ng-if="list.length == 0" height="300"><td colspan="'+columnsData.length+1+'" style="text-align: center;"><span class="none-data-info">没有查询到符合条件的数据</span></td></tr>'
    	return trHtml;
	}
	//生成列名---报表标识
	function getColumnNames(type){
		//报表列信息配置
    	var columnsInfo = JJGlobal[type].columnInfos;
    	var columnsData = JJGlobal[type].columns;
    	//列名数组
    	var columnNames = [];
    	//遍历列信息
    	for(var i=0,len=columnsData.length;i<len;i++){
    		//列ID
    		var colId = columnsData[i];
    		if(columnsInfo[colId]){
    			//标题
	    		var title = columnsInfo[colId].title;
	    		columnNames.push(title);
	    	}
	    }
	    return columnNames;
	}
	//获取字段下标
	function getIndexByField(columns,field){
		for(var i=0;i<columns.length;i++){
			//字段名
			if(columns[i] === field){
				return i;
			}
		}
		return null;
	}
	//获取字段类型
	function getTypeByField(columns,field){
		//字段类型
		return (columns[field] && columns[field].type) || "string";
	}
	//处理列表数据-----数据，报表类型
	function formatTableData(list,type){
		var formatData = deepCopy(list);
		//报表配置信息
		var reportConfig = JJGlobal[type];
		//列信息
		var columnInfos = reportConfig.columnInfos;
		//列
		var columns = reportConfig.columns;
		for(var i=0,len=columns.length;i<len;i++){
			//合并行
			if(columnInfos[columns[i]] && columnInfos[columns[i]].rowMerge){
				//需要合并字段的数组下标
	    		var indexNum = i;
		    	//前一元素
		    	var preItem = {};
		    	angular.forEach(formatData,function(item,index){
		    		index = parseInt(index);
		    		var value = item[indexNum];
		            formatData[index][indexNum] = {
		            	value: value
		            };
		    		if(preItem[indexNum] && preItem[indexNum]["value"] != "" && preItem[indexNum]["value"] != null && preItem[indexNum]["value"] == value){
						var rownum = preItem[indexNum]["rownum"] != undefined ? preItem[indexNum]["rownum"] + 1 : 2;
						preItem[indexNum]["rownum"] = rownum;
		                for(var j=index+1-rownum;j<index+1 && j< formatData.length;j++){
		                    formatData[j][indexNum]["rownum"] = rownum;
		                    formatData[j][indexNum]["rowflag"] = false;
		                }
		                formatData[index+1-rownum][indexNum]["rowflag"] = true;
		    		}else{
		    			preItem[indexNum] = {};
		    			preItem[indexNum]["value"] = value;
		    		}
		    	});
			}
		}
	    return formatData;
	}
	//根据URL找到对应的菜单ID
	function getMenuId(menuData,linkVal){
		if(!menuData || !linkVal)
			return null;
		for(var i=0,len=menuData.length;i<len;i++){
			if(menuData[i].link == linkVal){
				return menuData[i].menuId;
			}else{
				if(menuData[i].children && menuData[i].children.length >0){
					var menuID = getMenuId(menuData[i].children,linkVal);
					if(menuID != null){
						return menuID;
					}
				}
			}
		}
		return null;
	}
	//获取菜单的叶子节点
	function genLeafMenu(menuData,leafMenuList){
		if(menuData != undefined && menuData != null){
			for(var i=0,len=menuData.length;i<len;i++){
				if(menuData[i].children == undefined){
					leafMenuList.push({
						name: menuData[i].name,
						menuId: menuData[i].menuId,
						link: menuData[i].link
					});
				}else{
					genLeafMenu(menuData[i].children,leafMenuList);
				}
			}
		}
	}
})();
