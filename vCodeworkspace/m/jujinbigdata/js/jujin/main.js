(function() {
    "use strict";
	var mainApp = angular.module("jujinApp",['ngRoute','ngTable']);
	//定义全局变量---存储报表配置信息
	var JJGlobal = {};
	//路由信息配置
	mainApp.config(function($routeProvider) {
	    //原首页
	    //TODO:优化配置方式
	    $routeProvider.when('/report', {
	        templateUrl: 'pages/report.html',
	        controller: "ReportCtrl",
	        controllerAs: "report",
	        reloadOnSearch: true,
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
	    }); //首页
	});
	//http拦截器
	mainApp.factory("httpInterceptor", [ "$q","$rootScope", function($q,$rootScope) {
		return {			
			response: function(response) {
				//响应值
				var data = response.data;
				//错误信息
				$rootScope.errorMsg = "";
				if(data && data.status === false){
					//未登录
					if(data.loginStatus == false){
						$rootScope.$emit("userIntercepted",response);
					}else{
						//错误信息
						$rootScope.errorMsg = data.msg;
					}					
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
	    $rootScope.URL_ROOT = SERVER_ADDRESS + "/skynet"; //全局地址
	    $rootScope.ROOT = SERVER_ADDRESS + "/m/jujin/";

	    //用户名
	    $rootScope.username = JJToolKit.getCookie("username");
	    //未登录
	    $rootScope.$on('userIntercepted',function(){
	    	//跳转到登陆页
			window.location.href="login/login.html";
		});
		//切换视图
		$rootScope.$on("$routeChangeSuccess",function(){			
			//获取菜单id
			var menuId = getMenuId($rootScope.menuData,$location.url());
			if($("#menu_" + menuId) && !$("#menu_" + menuId).hasClass("active")){
				//展开上级菜单
				$("#menu_" + menuId).parents("ul").prev().removeClass("sidebar-nav-fold").addClass("sidebar-nav");
				//显示选中
				$("#menu_" + menuId).addClass("active");
			}
		})
	}]);
	//顶部菜单控制器
	mainApp.controller("topbarController",["$rootScope",'$scope','commonService',function($rootScope,$scope,service){
		//退出系统
		$scope.logout = function (){
			service.loadRecord({
				url : $rootScope.URL_ROOT + "/user/logout"
			}).success(function (response) {
				if($rootScope.errorMsg){
					alert($rootScope.errorMsg);
					return false;
				}
				//TODO
				if(response.status){
					//跳转到登陆页
					window.location.href="login/login.html";
				}
			});
		}
	}]);
	//左侧菜单控制器
	mainApp.controller("mainSlidebarCtrl",["$rootScope","$http","$scope",function($rootScope,$http,$scope){
		var menuUrl = $rootScope.URL_ROOT + "/menu/list";
		//var menuUrl = "data/menu.json";
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
		});
	}]);
	//左侧菜单
	mainApp.directive("jujinMainSidebar",["$rootScope",'$location',function($rootScope,$location){
		return {
			 restrict: "A",
			 controller:"mainSlidebarCtrl",
			 link:function(scope, element, attrs){
			 	//菜单栏切换
			 	scope.toggleSidebarStatus = function(){
			 		element.toggleClass("console-sidebar").toggleClass("console-sidebar-role");
			 	}
			 	//父菜单折叠隐藏
			 	scope.toggleFoldStatus = function(event){
			 		//当前元素
			 		var _thisDom = angular.element(event.currentTarget);
			 		_thisDom.toggleClass("sidebar-nav-fold").toggleClass("sidebar-nav");
			 	}
			 	//选中子菜单
			 	scope.selectMenu = function(event){
			 		//当前元素
			 		var _thisDom = event.currentTarget;
			 		//展开父级节点
			 		$(_thisDom).parents("ul").prev().removeClass("sidebar-nav-fold").addClass("sidebar-nav");
			 		//将其他选中节点清除
			 		$(".console-sidebar-leaf").removeClass("active");
			 		//选中当前节点
					$(_thisDom).addClass("active")
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
})();

