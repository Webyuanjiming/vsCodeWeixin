(function() {
    "use strict";
	var mainApp = angular.module("jujinApp",['ngRoute','ngTable']);
	//定义全局变量---存储报表配置信息
	var JJGlobal = {};
	//路由信息配置
	mainApp.config(function($routeProvider) {
	    //报表
	    //TODO:优化配置方式
	    $routeProvider.when('/report', {
	        templateUrl: 'pages/report.html',
	        controller: "ReportCtrl",
	        controllerAs: "report",
	        resolve:{
	        	reportConfig: ['$q', '$timeout',"$rootScope","$http", function ($q, $timeout,$rootScope,$http) {
                    var deferred = $q.defer();
                    $timeout(function () {
                    	if($rootScope.reportConfig == undefined){
                    		$http.get($rootScope.URL_ROOT+"/report/pqc").success(function(response) {
	                    		if($rootScope.errorMsg){
									alert($rootScope.errorMsg);
									deferred.resolve("报表配置：" + $rootScope.errorMsg);
									return false;
								}
			            		//转成json对象
								var resData = JSON.parse(response.data);
								//菜单数据
								$rootScope.reportConfig = resData.configInfos;
								JJGlobal = resData.configInfos;
								deferred.resolve(response);
							});
                    	}else{
                    		deferred.resolve("已经存在");
                    	}
                    }, 0);
                    return deferred.promise;
                }]
	        }
	    });
	    //渠道管理
        $routeProvider.when('/channel', {
	    	templateUrl: 'pages/channel.html',
	    	controller: "channelCtrl",
	        controllerAs: "channel"
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
	});
	//http拦截器
	mainApp.factory("httpInterceptor", [ "$q","$rootScope", function($q,$rootScope) {
		return {			
			response: function(response) {
				//响应值
				var data = response.data;
				//错误信息
				$rootScope.errorMsg = "";
				//未登录
				if(data && data.status === true){
					//未登录
					if(data.loginstatus == 0){
						$rootScope.$emit("userIntercepted",response);
					}
				}
				//错误信息
				if(data && data.status === false){
					//错误信息
					$rootScope.errorMsg = "错误信息：" + data.msg;
				}
				return response || $q.when(response);
			}
		};
	}]);
	//拦截器
	mainApp.config(['$httpProvider', function($httpProvider){
		$httpProvider.interceptors.push('httpInterceptor');
	}]);
	//主配置信息
	mainApp.run(["$rootScope","$http","$location",function($rootScope,$http,$location) {
		//默认10条
	    $rootScope.pageSize = 10;

	    $rootScope.SERVER = SERVER_ADDRESS;
	    $rootScope.URL_ROOT = SERVER_ADDRESS + "/eloanadmin"; //全局报表地址
	    $rootScope.AUTH_URL = SERVER_ADDRESS + "/eloanadmin";

	    //用户名
	    $rootScope.username = JJToolKit.getCookie("username");
	    //未登录
	    $rootScope.$on('userIntercepted',function(){
	    	//跳转到登陆页
			window.location.href= $rootScope.URL_ROOT;
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
	}]);
	//顶部菜单控制器
	mainApp.controller("topbarController",["$rootScope",'$scope','commonService',function($rootScope,$scope,service){
		//退出系统
		$scope.logout = function (){
			service.loadRecord({
				url : $rootScope.AUTH_URL + "/logout?callback=JSON_CALLBACK",
				method: "JSONP"
			}).success(function (response) {
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//TODO
				if(response.status == true){
					//跳转到登陆页
					window.location.href= $rootScope.URL_ROOT;
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
		var menuUrl = $rootScope.URL_ROOT + "/menu/list";
		$http.get(menuUrl).success(function(response) {
			if($rootScope.errorMsg){
				alert($rootScope.errorMsg);
				return false;
			}
			//转成json对象
			var resData = JSON.parse(response.data);
			//菜单数据
			$rootScope.menuData = resData.navData;
			$scope.menuList = resData.navData;
			//获取叶子节点信息
			$rootScope.leafMenuData = [];
			genLeafMenu($rootScope.menuData,$rootScope.leafMenuData);			
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
	                rowStart: 1//起始条数
	            }
	        }
	        config.params = angular.extend(httpConfig.params,config.params);
	        //获取数据
	        return service.loadRecord(config);
	    }
	    return service;
	}]);
	//报表控制器
	mainApp.controller("ReportCtrl",["$location","$rootScope",'$scope','$filter','$routeParams',"NgTableParams",'commonService',
	function($location,$rootScope,$scope,$filter,$routeParams,NgTableParams,service){
		var self = this;
    	//报表类型
    	$scope.type =  $routeParams.type;

		//报表名称
    	$scope.reportTitle = JJGlobal[$scope.type].reportTitle;
    	//生成查询表单信息
    	$scope.searchItems = JJGlobal[$scope.type].conditions;
    	//按钮
    	$scope.btnList = JJGlobal[$scope.type].buttons;
    	//分页
    	$scope.rowCount = 15;

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
	    		//日期类型
	    		if(searchItems[i].type == "datepicker"){
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
	    	//前排序条件
	    	var preOrder = {};
			var httpConfig = config;
			httpConfig.params = $scope.queryParams;
			//开始条数
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
					    //开始取得条数
						var startNum = ($scope.currentPage - 1) * $scope.curPerPage + 1;
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
								//开始条数
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
								//开始条数
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
			var url = $rootScope.AUTH_URL + "/channel/all?callback=JSON_CALLBACK";
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
							url : $rootScope.AUTH_URL + "/channel/isexist?callback=JSON_CALLBACK&code="+scope.formData.code,
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
									url : $rootScope.AUTH_URL + "/channel/insert?callback=JSON_CALLBACK&param="+params,
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
						url : $rootScope.AUTH_URL + "/channel/getchannel?callback=JSON_CALLBACK&id="+channelid,
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
							url : $rootScope.AUTH_URL + "/channel/update?callback=JSON_CALLBACK&param="+params,
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
					url : $rootScope.AUTH_URL + "/channel/delete?callback=JSON_CALLBACK&id="+channelid,
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
			name:"未使用"
		},{
			id:"1",
			name:"已使用"
		},{
			id:"2",
			name:"已过期"
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
			var url = $rootScope.AUTH_URL + "/redeem/getconfig?callback=JSON_CALLBACK";
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
        	var url = $rootScope.AUTH_URL + "/redeem/updateconfig?callback=JSON_CALLBACK&param="+JSON.stringify(list);
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
        		$http.jsonp($rootScope.AUTH_URL + "/award/tickets?callback=JSON_CALLBACK").success(
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
        		$http.jsonp($rootScope.AUTH_URL + "/award/vipmenu?callback=JSON_CALLBACK").success(
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
			var url = $rootScope.AUTH_URL + "/award/all?callback=JSON_CALLBACK";
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
                            url:$rootScope.AUTH_URL + "/award/insert?callback=JSON_CALLBACK&param="+encodeURI(pramas),
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
                        url:$rootScope.AUTH_URL + "/award/getaward?callback=JSON_CALLBACK&id="+exchangeid,
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
                                url:$rootScope.AUTH_URL + "/award/update?callback=JSON_CALLBACK&param="+params,
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
                    url:$rootScope.AUTH_URL + "/award/delete?callback=JSON_CALLBACK&id="+exchangeid,
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
	mainApp.directive("jjTable",["$routeParams",function($routeParams){
		return {
			restrict: "A",
			compile: function(element,attrs){
				var type = $routeParams.type;
				//生成表格行
				var tableHtml = genTRCont(type);
				angular.element("#"+ attrs.parentid).html(tableHtml);
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
				var ehtml = '<label class="font-x  px-i0">'+scope.searchItem.label+':</label>';
				ehtml += '<input class="editbox4 form-control Wdate" size="12" type="text" ng-model="searchItem.value" id="'+scope.searchItem.id+'" onfocus="WdatePicker({readOnly:true,dateFmt:\''+datefm+'\'})" />';
				element.html(ehtml);
			}
		}
	});
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
	    			tdHtml += ">{{item["+i+"]}}</td>"
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
