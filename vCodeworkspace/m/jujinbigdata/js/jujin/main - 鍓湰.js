(function() {
    "use strict";
	var mainApp = angular.module("jujinApp",['ngRoute','ngTable']);

	//路由信息配置
	mainApp.config(function($routeProvider) {

	    //原首页
	    //TODO:优化配置方式
	    $routeProvider.when('/report', {
	        templateUrl: 'pages/report.html',
	        reloadOnSearch: false
	    }); //首页
	});

	//主配置信息
	mainApp.run(["$rootScope",function($rootScope) {
		var SERVER_ADDRESS = "http://192.168.0.47:9000";
		//默认10条
	    $rootScope.pageSize = 10;

	    $rootScope.SERVER = SERVER_ADDRESS;
	    $rootScope.URL_ROOT = SERVER_ADDRESS + "/skynet"; //全局地址
	    $rootScope.ROOT = SERVER_ADDRESS + "/m/jujin/";

	}]);
	//左侧菜单控制器
	mainApp.controller("mainSlidebarCtrl",["$rootScope","$http","$scope",function($rootScope,$http,$scope){
		$http.get("data/menu.json").success(function(response) {
			//菜单数据
			$rootScope.menuData = response.navData;
			$scope.menuList = response.navData;
		});
	}]);
	//左侧菜单
	mainApp.directive("jujinMainSidebar",["$rootScope",function($rootScope){
		return {
			 restrict: "A",
			 controller:"mainSlidebarCtrl",
			 link:function(scope, element, attrs){
			 	//菜单栏切换
			 	scope.toggleSidebarStatus = function(){
			 		angular.element(element).toggleClass("console-sidebar").toggleClass("console-sidebar-role");
			 	}
			 	//父菜单折叠隐藏
			 	scope.toggleFoldStatus = function(event){
			 		//当前元素
			 		var _thisDom = angular.element(event.currentTarget);
			 		_thisDom.toggleClass("sidebar-nav-fold").toggleClass("sidebar-nav");
			 	}
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
	mainApp.controller("ReportCtrl",["$rootScope",'$scope','$filter',"NgTableParams",'commonService',function($rootScope,$scope,$filter,NgTableParams,service){
		var self = this;
    	//登录
    	service.loadPageRecord({
			url : $rootScope.URL_ROOT + "/user/login",
	    	method: "POST",
	    	params:{
	    		username:"admin",
	    		password:"admin"
	    	}
    	}).success(function(response){
			$scope.queryData();
    	});
	    /*self.cols = [
			{ field: "MOBILE", title: "手机号", sortable: "MOBILE", show: true },
			{ field: "USERID", title: "用户名", sortable: "USERID", show: true },
			{ field: "REALNAME", title: "真实姓名", sortable: "REALNAME", show: true },
			{ field: "TENDACCOUNT", title: "总投资金额", sortable: "TENDACCOUNT", show: true },
			{ field: "INSDATE", title: "注册时间", sortable: "INSDATE", show: true },
			{ field: "CHANNEL", title: "渠道", sortable: "CHANNEL", show: true,rowspanflag: true }      
	    ];*/

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
			service.loadPageRecord(httpConfig).success(function(response){
				//刷新
				if(refresh){
					//数据信息
					$scope.reportList = response.data.rows;
					$scope.reportData = response.data.rows;
				}else{
					//数据信息---合并数组信息--对应页信息
					$scope.reportList = $scope.reportList.concat(response.data.rows);
					$scope.reportData = $scope.reportList.concat(response.data.rows);
				}				
				//数据总数
				$scope.totalNum = response.data.pageCount;
				//开始取得条数
				var startNum = ($scope.currentPage - 1) * $scope.curPerPage;
				//结束条数
				var endNum = $scope.currentPage * $scope.curPerPage;
				//获取当前页数据
				var curPageData = $scope.reportList.slice(startNum, endNum);						
				//数据
	            $scope.list = formatTableData(curPageData,['CHANNEL','REALNAME']);
			});
	    }	    
		//日历控件点击事件
		$scope.calendarClick = function($event){
			var thisObj = event.currentTarget;
			var iptObj = $(thisObj).find("input")[0];
			new Calendar().show(iptObj, thisObj);
		}
		//查询
		$scope.queryData = function(){
			//查询条件
			$scope.queryParams = {           	
                "mobile":$scope.mobile,
                "userId":$scope.userId,
                "startDate":$scope.startDate,
                "endDate":$scope.endDate,
                "channel":$scope.channel,
                "mapper":'com.jujin.channel.mapper.queryChannelTrafficData'
	    	};
	    	//前排序条件
	    	var preOrder = {};
	    	/*$http({
				method:'POST',
				url:'http://1da79fb7.ittun.com/skynet/data',
				params:{rowStart:1,rowTotal:100,mapper:'com.jujin.channel.mapper.queryChannelTrafficData'}
			})*/
			//$http.post('http://1da79fb7.ittun.com/skynet/data',{rowStart:1,rowTotal:100,mapper:'com.jujin.channel.mapper.queryChannelTrafficData'})
			var httpConfig = config;
			httpConfig.params = $scope.queryParams;
			//开始条数
			httpConfig.params.rowStart = 1;
			//所需条数
			httpConfig.params.rowCount = 100;	
			service.loadPageRecord(httpConfig)
			.success(function (response) {
				//数据信息
				$scope.reportList = response.data.rows;
				$scope.reportData = response.data.rows;
				//数据总数
				$scope.totalNum = response.data.totalCount;
			    //表格
				//$scope.tableParams= new NgTableParams({}, {total: totalNum,dataset: $scope.list});
				self.tableParams= new NgTableParams({}, {
					total: $scope.totalNum,
					counts: 0,
					paginationMaxBlocks: 8,
					getData: function(params){
						//当前页
						$scope.currentPage = params.page();
						//每页显示条数
						$scope.curPerPage = params.count();  
						var orderBy = "",orderType = "";
						for (var key in params.sorting() ) {
					        orderBy = key;
					        orderType = params.sorting()[key];
					    }
						//重新排序
						if(orderBy && params.sorting() != preOrder){
							preOrder = params.sorting();
							//获取过全部数据
							if($scope.reportList == $scope.totalNum){
								$scope.reportList = $scope.reportData;
								$filter('orderBy')($scope.reportList, params.orderBy())
							}else{
								//更新参数
								var newParams = $scope.queryParams;
								//开始条数
								newParams.rowStart = $scope.reportList.length || 1;
								//所需条数
								newParams.rowCount = 100;								
								//排序字段
								newParams.orderBy = orderBy;
								//排序方式
								newParams.orderType = orderType.toUpperCase();
								//更新数据
				            	updataPageRecord(newParams,true);
							}
						}else{
							//开始取得条数
							var startNum = ($scope.currentPage - 1) * $scope.curPerPage;
							//结束条数
							var endNum = $scope.currentPage * $scope.curPerPage;
							//最多取到总数
							if(endNum > $scope.totalNum){
								endNum = $scope.totalNum;
							}
							if(endNum > $scope.reportList.length){
								//更新参数
								var newParams = $scope.queryParams;
								//开始条数
								newParams.rowStart = $scope.reportList.length || 1;
								//所需条数
								newParams.rowCount = 100;
								//更新数据
				            	updataPageRecord(newParams);
							}else{
								//获取当前页数据
								var curPageData = $scope.reportList.slice(startNum, endNum);						
								//数据
					            $scope.list = formatTableData(curPageData,['CHANNEL','REALNAME']);
							}
						}
			            return $scope.list;
					}
				});
			});
		}
		//导出
		$scope.exportData = function(){

		}
		function exportData(){
	        $.ajax({
	            type : "POST",
	            url : basepath+"/skynet/report/export",
	            data : {
	                "reportId" : "channel_traffic_report",
	                "mobile":$scope.mobile,
	                "userId":$scope.userId,
	                "startDate":$scope.startDate,
	                "endDate":$scope.endDate,
	                "channel":$scope.channel
	            },
	            dataType : "json",
	            success : function(data) {
	                if(data.status == true){
	                    window.open(basepath+"/skynet/"+data.msg);
	                }else{
	                    alert("导出失败,"+data.msg);
	                }
	            },
	            error : function(e) {
	                alert("异常:"+e);
	            }	            
	        });   
	    }
	    
	}]);

	//展开折叠
	mainApp.directive("jjMainFold",function(){
		return {
			restrict: "A",
			link: function(scope,element,attrs){
				//点击事件				
				angular.element(element).click(function(){
					//隐藏展示查询条件
					angular.element(".queryCont").toggle();
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
				angular.element(element).click(function(){
					$(this).parent().toggleClass("cont-narrow");
				});
			}
		}
	});
	//处理列表数据
	function formatTableData(list,fields){
	    var formatData = list;
	    //前一元素
	    var preItem = {};
	    //遍历表格数据
	    $.each(formatData,function(index,item){
	        var newItem = {};
	        //单元格对象
	        for(var j=0;j<fields.length;j++){
	            var key = fields[j];
	            var value = item[key];
	            newItem[key] = {};
	            newItem[key]["value"] = value;
	            formatData[index][key] = newItem[key] ;
	            if(preItem[key] && preItem[key]["value"] != "" && preItem[key]["value"] != null && preItem[key]["value"] == value){
	                var rownum = preItem[key]["rownum"] != undefined ? preItem[key]["rownum"] + 1 : 2;
	                preItem[key]["rownum"] = rownum;  
	                newItem[key]["rownum"] = rownum; 
	                newItem[key]["rowflag"] = false; 
	                for(var i=index+1-rownum;i<index+1 && i< formatData.length;i++){
	                    formatData[i][key]["rownum"] = rownum;
	                    formatData[i][key]["rowflag"] = false;
	                }   
	                formatData[index+1-rownum][key]["rowflag"] = true;     
	            }else{
	                preItem[key] = {};
	                preItem[key]["value"] = value;
	            }
	        }       
	    });
	    return formatData;
	}

})();

