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
		var menuUrl = $rootScope.URL_ROOT + "/menu/list?userId=admin";
		$http.get(menuUrl).success(function(response) {
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
	//生成表格行
	function genTRCont(type){
		//报表列信息配置
    	var columnsInfo = JJGlobal[type].columnInfos;
    	var columnsData = JJGlobal[type].columns;
    	var trHtml = '<tr ng-repeat="item in list">';
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
    	return trHtml;
	}

	//报表控制器
	mainApp.controller("ReportCtrl",["$rootScope",'$scope','$filter','$routeParams',"NgTableParams",'commonService',
	function($rootScope,$scope,$filter,$routeParams,NgTableParams,service){
		var self = this;
    	//登录
    	service.loadRecord({
			url : $rootScope.URL_ROOT + "/user/login",
	    	method: "POST",
	    	params:{
	    		username:"admin",
	    		password:"admin"
	    	}
    	}).success(function(response){
			$scope.queryData();
    	});
    	//报表类型
    	$scope.type =  $routeParams.type;
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
				}else{
					//数据信息---合并数组信息--对应页信息
					$scope.reportList = $scope.reportList.concat(response.data.rows);
				}				
				//数据总数
				$scope.totalNum = response.data.totalCount;
				//开始取得条数
				var startNum = ($scope.currentPage - 1) * $scope.curPerPage;
				//结束条数
				var endNum = $scope.currentPage * $scope.curPerPage;
				//获取当前页数据
				var curPageData = $scope.reportList.slice(startNum, endNum);					
				//数据
	            $scope.list = formatTableData(curPageData,[0]);
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
			//列名
			var parmColumns = JJGlobal[$scope.type].columns;
			//查询条件
			$scope.queryParams = {           	
                "mobile":$scope.mobile,
                "userId":$scope.userId,
                "startDate":$scope.startDate,
                "endDate":$scope.endDate,
                "channel":$scope.channel,
                "columns": parmColumns.join("|"),
                "mapper": JJGlobal[$scope.type].mapper
	    	};
	    	//前排序条件
	    	var preOrder = {};
			var httpConfig = config;
			httpConfig.params = $scope.queryParams;
			//开始条数
			httpConfig.params.rowStart = 1;
			//所需条数
			httpConfig.params.rowCount = 10;	
			service.loadPageRecord(httpConfig).success(function (response) {
				//数据信息
				$scope.reportList = response.data.rows;
				//数据总数
				$scope.totalNum = response.data.totalCount;
				//列名
				$scope.columns = response.data.columns;							
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
						//排序字段，排序方式
						var orderField = "",orderType = "";
						for (var key in params.sorting() ) {
					        orderField = key;
					        orderType = params.sorting()[key];
					    }
					    //开始取得条数
						var startNum = ($scope.currentPage - 1) * $scope.curPerPage;
						//结束条数
						var endNum = $scope.currentPage * $scope.curPerPage;
						//最多取到总数
						if(endNum > $scope.totalNum){
							endNum = $scope.totalNum;
						}
						//重新排序
						if(orderField && params.sorting() != preOrder){
							preOrder = params.sorting();
							//获取过全部数据
							if($scope.reportList.length == $scope.totalNum){								
								//排序
								$filter('jjOrderBy')($scope.reportList,orderField,orderType,JJGlobal[$scope.type])
								//获取当前页数据
								var curPageData = $scope.reportList.slice(startNum, endNum);							
								//数据
					            $scope.list = formatTableData(curPageData,[0]);	
							}else{
								//更新参数
								var newParams = $scope.queryParams;
								//开始条数
								newParams.rowStart = 1;
								//所需条数
								newParams.rowCount = 100;								
								//排序字段
								newParams.orderBy = orderField;
								//排序方式
								newParams.orderType = orderType.toUpperCase();
								//更新数据
				            	updataPageRecord(newParams,true);
							}
						}else{							
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
					            $scope.list = formatTableData(curPageData,[0]);	
							}
						}
			            return $scope.list;
					}
				});
			});
		}
		//导出
		$scope.exportData = function(){
	    	service.loadRecord({
				url : $rootScope.URL_ROOT + "/report/export",
		    	method: "POST",
		    	params: $scope.queryParams
	    	}).success(function(response){
				if(response.status == true){
                    window.open($rootScope.URL_ROOT+"/"+response.msg);
                }else{
                    alert("导出失败,"+response.msg);
                }
	    	}).error(function(e){
	    		alert("异常:"+e);
	    	});
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
	//深度复制
	var deepCopy= function(source) { 
		var result=[];
		for (var key in source) {
		    result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
	    } 
	    return result; 
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
	//处理列表数据-----数据，字段名，列名
	function formatTableData(list,fields,columns){	
		var formatData = deepCopy(list);    
	    for(var i=0;i<fields.length;i++){	    	
	    	//需要合并字段的数组下标
	    	var indexNum = fields[i];
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
	    return formatData;
	}

})();

