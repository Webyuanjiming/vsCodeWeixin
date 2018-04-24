(function() {
    "use strict";
    var mainApp = angular.module("viewApp",['ui.bootstrap','angular-growl','ngSanitize']);
    //提示信息
    mainApp.config(['growlProvider', function(growlProvider) {
        growlProvider.globalTimeToLive(5000);
        growlProvider.onlyUniqueMessages(true);
        growlProvider.globalEnableHtml(true);
    }]);
    mainApp.factory("baseService",["$rootScope","$http","growl",function($rootScope,$http,growl){
		var sendRequest = function(setting){
			var setting = setting || {};
			if(setting.method == undefined){
				setting.method = "GET";
			}
            var successMessage = "";
            if(setting.successMessage){
                successMessage = setting.successMessage;
                delete setting.successMessage;
            }
			return $http(setting).success(function(response){
                if(response.status == false){
                    growl.addErrorMessage("错误信息："+response.msg);
                }else if(successMessage != ""){
                    growl.addSuccessMessage(successMessage);
                }
				return response;
			}).error(function(response){
                growl.addErrorMessage("错误信息："+response);
			});
		}
		var sendRequestWithUrl = function(url,setting){
			var url = SERVER_ADDRESS + "/eloanadmin" +url;
			setting.url = url;
			return sendRequest(setting);
		}
		return {
			sendRequestWithUrl: sendRequestWithUrl
		}
	}]);
    mainApp.controller("viewController",["$http","$scope","dateFilter","baseService","rcDialog",'$sce',function($http,$scope,dateFilter,baseService,dialog,$sce){
    	//用户名
    	var userId =JJToolKit.getQueryString("userId");
        //来源
        var from = JJToolKit.getQueryString("from");
        //类型
        var type = JJToolKit.getQueryString("type");
        //任务id
        var uuid = JJToolKit.getQueryString("uuid");
        //用户状态
        var userState = JJToolKit.getQueryString("userState");
        //是否有客服
        var hasKefu = JJToolKit.getQueryString("hasKefu");
        if(hasKefu == "true"){
            $scope.hasKefu = true;
        }else{
            $scope.hasKefu = false;
        }
        //默认10天
        var day = 10;
        if(from == "workbench"){
            $scope.showKefu = true;
        }
        if(type=="task"){
            $scope.showNext = true;
        }
        //维护状态
        if(userState == "2"){
            day = 25;
        }
        //是否主管
        $scope.isManager = JJToolKit.getCookie("isManager");
        //将字符串根据时间分割
        function splitByTime(str){
            //备注
            var remarks1 = str;
            var hion_remarks = [];
            if(remarks1){
                var matches = remarks1.match(/\[\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}/g);
                if(matches){
                    for(var i=0,len=matches.length;i<len;i++){
                        var startIndex = remarks1.indexOf(matches[i]);
                        if(i+1<len){
                            var endIndex = remarks1.indexOf(matches[i+1]);
                            hion_remarks.push(remarks1.substring(startIndex,endIndex));
                        }else{
                            hion_remarks.push(remarks1.substr(startIndex));
                        }                       
                    }
                }else{
                    hion_remarks.push(remarks1);
                }               
            }                   
            return hion_remarks;
        }
        //获取用户基础数据
        function genUserData(){
            //提交参数
            var settings={};
            settings.params = {
                "key":"dv_user",
                "userId": userId
            }
            baseService.sendRequestWithUrl("/domain/query",settings).success(function(data){            
                if(data.status == true){
                    var entity = data.entity;
                    //用户基础数据
                    $scope.dv_user = (entity && entity.dv_user[0]) || {};
                    //备注
                    var remarks1 = $scope.dv_user.memo1;
                    if($scope.dv_user.memo2){
                        remarks1 += $scope.dv_user.memo2
                    }
                    if($scope.dv_user.memo3){
                        remarks1 += $scope.dv_user.memo3
                    }           
                    $scope.memolist = splitByTime(remarks1);  
                }
            });
        }
        //获取客服列表
        $scope.genKefuList = function(){
            //提交参数
            var settings={};
            settings.params = {
                "user":userId
            }
            settings.method = "POST";
            baseService.sendRequestWithUrl("/kefu/listKefuLog",settings).success(function(data){                     
                if(data.status == true){
                    var entity = data.entity;
                    $scope.kefulist = entity;                           
                }
            });
        }
    	//数据展示
    	$scope.genData = function(){
    		//提交参数
			var settings={};
			settings.data = {
				"key":"dv_user,dv_user_account,dv_user_ticket,dv_user_tender,dv_hion_record,dv_hion_customer",
				"autoMap":"false",
				"parameters":{
					"userId": userId
				}
			}
            settings.method = "POST";
    		baseService.sendRequestWithUrl("/domain/queryformbatch",settings).success(function(data){	
    		// $http.get("custom.json").success(function(data){			
    			if(data.status == true){
    				var entity = data.entity;
    				//用户基础数据
    				$scope.dv_user = (entity && entity.dv_user[0]) || {};
    				//用户账户
    				$scope.dv_user_account = (entity && entity.dv_user_account[0]) || {};
					//拨打记录信息
                    $scope.dv_hion_customer = (entity && entity.dv_hion_customer[0]) || {};
                    //拨打记录列表
                    $scope.dv_hion_record = entity && entity.dv_hion_record;

    				//投资
    				$scope.dv_user_tender = (entity && entity.dv_user_tender[0]) || {};
					
    				//加息券
    				$scope.dv_user_ticket = entity && entity.dv_user_ticket;
    				//转化周期=投资时间-注册时间
    				var registerDate = $scope.dv_user.registerDate;
    				var firstTenderTime = $scope.dv_user_tender.firstTenderTime;
    				$scope.dv_user.transDate = JJToolKit.dateMinus(registerDate,firstTenderTime);
                    //备注
                    var remarks1 = $scope.dv_user.memo1;
                    if($scope.dv_user.memo2){
                        remarks1 += $scope.dv_user.memo2
                    }
                    if($scope.dv_user.memo3){
                        remarks1 += $scope.dv_user.memo3
                    }                  
                    $scope.memolist = splitByTime(remarks1);
    				//投资总额
    				var tenderTotal = $scope.dv_user_tender.tenderTotal;
    				//投资次数
    				var tenderCount = $scope.dv_user_tender.tenderCount;
    				//笔均投资额=投资总额/投资次数
    				$scope.dv_user_tender.avgTrenderAccount = JJToolKit.divide(tenderTotal,tenderCount);
    				//自动投标总额
    				var autoTenderTotal = $scope.dv_user_tender.autoTenderTotal;
    				//自动投标次数
    				var autoTenderCount = $scope.dv_user_tender.autoTenderCount;
    				//自动投标均额=自动投标总额/自动投标次数
    				$scope.dv_user_tender.avgAutoTrenderAccount = JJToolKit.divide(autoTenderTotal,autoTenderCount);
										
    				//次数分布
    				$scope.dv_user_tender.frequency = "1月["+JJToolKit.formart($scope.dv_user_tender.tenderOneMon)+"] 2月[" + JJToolKit.formart($scope.dv_user_tender.tenderTwoMon)
    					+ "] 3月[" + JJToolKit.formart($scope.dv_user_tender.tenderThreeMon) +"] 4月["+ JJToolKit.formart($scope.dv_user_tender.tenderFourMon) + "] 5月[" + JJToolKit.formart($scope.dv_user_tender.tenderFiveMon)
    					+ "] 6月[" + JJToolKit.formart($scope.dv_user_tender.tenderSixMon) + "] 其他[" + JJToolKit.formart($scope.dv_user_tender.tenderOtherMon) + "]";	

                    //拨打记录备注
                    var remarks1 = $scope.dv_hion_customer.remarks1;                  
                    $scope.hion_remarks = splitByTime(remarks1);		
    			}
    		});
    	}
    	//数据示例展示
    	$scope.genDataHelp = function(){
    		//提交参数
			var settings={};
			settings.data = {
				"key":"dv_user_memo,dv_user_account_memo,dv_user_tender_memo"
			}
            settings.method = "POST";
    		baseService.sendRequestWithUrl("/domain/queryformbatch",settings).success(function(data){	
    			if(data.status == true){
    				var entity = data.entity;
    				//用户基础数据
    				$scope.dv_user_memo = (entity && entity.dv_user_memo && entity.dv_user_memo[0]) || {};
    				//用户账户
    				$scope.dv_user_account_memo = (entity && entity.dv_user_account_memo && entity.dv_user_account_memo[0]) || {};					
    				//投资
    				$scope.dv_user_tender_memo = (entity && entity.dv_user_tender_memo && entity.dv_user_tender_memo[0]) || {};					
    			}
    		});
    	}
    	//改变展开折叠状态
    	$scope.changeStatus = function(module){
    		$scope[module] = !$scope[module];	
    	}
        //编辑客户信息
        $scope.editRemark = function(){
            //弹出窗口
            dialog.showDialogByUrl('remarkInfo.html',function(scope){
                //标题
                scope.dialogTitle = "用户信息";
                //获取用户信息
                //提交参数
                var settings={};
                settings.params = {
                    "776354A1E883A44D": userId
                }
                scope.loadingState = true;
                baseService.sendRequestWithUrl("/crm/usersetting/query",settings).success(function(data){   
                    if(data.status == true){
                        if(data.entity){
                            scope.formData = data.entity;
                        }else{
                            scope.formData = {
                                "userId":userId
                            }
                        }                        
                    }
                    scope.loadingState = false;
                }).error(function(response){
                    scope.loadingState = false;
                });
                //确定
                scope.doAction = function(form){
                    var formData = scope.formData;
                    // var params = {
                    //     "userId": userId
                    // };
                    // //修改过表单
                    // if(form.$dirty == true){
                    //     for(var key in formData){
                    //         //修改过
                    //         if(form[key] && form[key].$dirty == true){
                    //             params[key] = formData[key];
                    //         }
                    //     }
                    // } 
                    // console.log(params);
                    // if(params.remark){
                    //     params.memo = params.remark;
                    //     delete params.remark;
                    // }  
                    // //提交参数
                    // var settings={};
                    // settings.data = params;
                    // settings.method = "POST";
                    // scope.loadingState = true;
                    // baseService.sendRequestWithUrl("/crm/usersetting/updatebycols",settings).success(function(data){   
                    //     if(data.status == true){
                    //        scope.formData = data.entity;
                    //     }
                    //     scope.loadingState = false;
                    // }).error(function(response){
                    //     scope.loadingState = false;
                    // });  
                    //提交参数
                    var settings={};
                    if(formData.remark){
                        formData.memo = formData.remark;
                        delete formData.remark;
                    }else{
                        formData.memo = null;
                    } 
                    //删除字段,否则报错
                    delete  formData.insUserId;
                    delete  formData.updUserId;
                    delete  formData.insDate;
                    delete  formData.updDate;

                    settings.data = formData;
                    settings.method = "POST";
                    scope.loadingState = true;
                    baseService.sendRequestWithUrl("/crm/usersetting/update",settings).success(function(data){   
                        if(data.status == true){
                            scope.close();
                            genUserData();                           
                        }
                        scope.loadingState = false;
                    }).error(function(response){
                        scope.loadingState = false;
                    });            
                }
            });          
        }
        //添加标签
        $scope.addTag = function(){
            //弹出窗口
            dialog.showDialogByUrl('tagInfo.html',function(scope){
                //标题
                scope.dialogTitle = "添加标签";
                //标签选择
                scope.tagChecked = function(tagid){
                    if(scope.change == undefined){
                        scope.change = {};
                    }
                    scope['change'][tagid] = !scope['change'][tagid];
                }
                //获取标签列表
                function genTagsData(){
                    //参数
                    var settings={};
                    settings.params = {
                        "id": "1000000"
                    };
                    baseService.sendRequestWithUrl("/crm/tag/list",settings).success(function(data){   
                        if(data.status == true){
                           var entity = data.entity;
                           var taglist = entity && entity.tags; 
                           scope.taglist = taglist;                          
                        }
                    }); 
                }
                //处理选中
                function handlerTags(entity){
                    //当前选中标签
                    var curTags = [];
                    scope.change = {};   
                    if(entity){
                        for(var i=0;i<entity.length;i++){
                            if(entity[i].tag && entity[i].tag.id){
                                curTags.push(entity[i].tag.id);
                                scope.change[entity[i].tag.id] = true;
                            }                                   
                        } 
                    }
                    scope.curTags = curTags;  
                }
                //获取当前用户标签
                function genCurrentTags(){
                    if($scope.curTaglist){
                        handlerTags($scope.curTaglist);
                    }else{
                        //参数
                        var settings={};
                        settings.params = {
                            "776354A1E883A44D": userId
                        };
                        baseService.sendRequestWithUrl("/crm/tag/query",settings).success(function(data){   
                            if(data.status == true){
                                var entity = data.entity;
                                handlerTags(entity);
                            }
                        }); 
                    }
                }
                genTagsData();
                genCurrentTags();
                //确定
                scope.doAction = function(){                     
                    //删除ids
                    var deleteIds = [];
                    //新增ids
                    var insertIds = [];
                    var curTags = scope.curTags; 
                    for(var key in scope.change){
                        if(scope.change[key] == true){
                            if(_.indexOf(curTags, key) == -1){
                                insertIds.push(key);
                            }                           
                        }else{
                            if(_.indexOf(curTags, key) != -1){
                                deleteIds.push(key);
                            }
                        }
                    } 
                    //参数
                    var settings={};
                    settings.data = {
                        "key": userId,
                        "parameters":{
                            "delete":deleteIds,
                            "insert":insertIds
                        }
                    };
                    settings.method="POST";
                    scope.loadingState = true;
                    baseService.sendRequestWithUrl("/crm/tag/update",settings).success(function(data){ 
                        if(data.status == true){ 
                            genViewCurrentTags(); 
                            scope.close();
                        }
                        scope.loadingState = false;
                    }).error(function(response){
                        scope.loadingState = false;
                    });                     
                }
            });             
        }
        //获取当前用户标签
        function genViewCurrentTags(){
            //参数
            var settings={};
            settings.params = {
                "776354A1E883A44D": userId
            };
            baseService.sendRequestWithUrl("/crm/tag/query",settings).success(function(data){   
                if(data.status == true){
                    var entity = data.entity;
                    $scope.curTaglist = entity;                 
                }
            }); 
        }
        //删除标签
        $scope.delTag = function(id,index){
            //参数
            var settings={};
            settings.data = {
                "key": userId,
                "parameters":{
                    "delete":id
                }
            };
            settings.method="POST";
            baseService.sendRequestWithUrl("/crm/tag/update",settings).success(function(data){  
                //删除成功 
                if(data.status == true){
                    $scope.curTaglist.splice(index,1);
                }
            });  
        }
        //分配客服
        $scope.assignKefu = function(){
            //弹出窗口
            dialog.showDialogByUrl('assignKefu.html',function(scope){
                //标题
                scope.dialogTitle = "分配客服";
                //获取客服下拉框数据
                scope.loadingState = true;
                baseService.sendRequestWithUrl("/kefu/listCanAssignKefu",{
                    method:"POST",
                    params:{
                        users:userId
                    }
                }).success(function(data){  
                    scope.loadingState = false; 
                    if(data.status == true){
                        scope.kefuList = data.entity;                       
                    }                   
                }).error(function(response){
                    scope.loadingState = false;
                });
                //确定
                scope.doAction = function(form){ 
                    scope.loadingState = true;
                    baseService.sendRequestWithUrl("/kefu/assign",{
                        method:"POST",
                        params:{
                            users:userId,
                            kefuId:scope.formData.kefuId
                        },
                        successMessage:"分配成功"
                    })
                    .then(function(response){
                        var resData = response.data;
                        scope.loadingState = false;
                        if(resData.status == true){
                            scope.close();
                            //刷新客户列表
                            $scope.genKefuList();
                        }                       
                    },function(response){
                        scope.loadingState = false;
                    });          
                }
            });          
        }
        //下次处理时间
        $scope.handleTask = function(){
            //弹出窗口
            dialog.showDialogByUrl('handleTask.html',function(scope){
                //标题
                scope.dialogTitle = "任务时间";
                //时间控件
                scope.dateOptions = {
                    maxDate: new Date(new Date().getTime()+1000*60*60*24*day),
                    minDate: new Date()
                };
                //时间控件
                scope.showSpinners = false;
                scope.showMeridian = false;             
                //确定
                scope.doAction = function(form){ 
                    var date = dateFilter(scope.formData.nextDate,'yyyy-MM-dd');
                    var time = dateFilter(scope.formData.nextTime,'HH:mm');
                    var dateTime = date+" "+time;
                    scope.loadingState = true;
                    baseService.sendRequestWithUrl("/kefu/doTask",{
                        method:"POST",
                        params:{
                            uuid:uuid,
                            time:dateTime
                        },
                        successMessage:"保存成功"
                    })
                    .then(function(response){
                        var resData = response.data;
                        scope.loadingState = false;
                        if(resData.status == true){
                            scope.close();
                        }                       
                    },function(response){
                        scope.loadingState = false;
                    });          
                }
            });  
        }
        //放弃
        $scope.giveUp = function(){
            $scope.loadingState = true;
            baseService.sendRequestWithUrl("/kefu/cancelTask",{
                method:"POST",
                params:{
                    uuid:uuid
                },
                successMessage:"操作成功"
            }).then(function(response){
                var resData = response.data;
                $scope.loadingState = false;
                if(resData.status == true){
                }                       
            },function(response){
                $scope.loadingState = false;
            }); 
        }
        //收回
        $scope.takeBackKefu = function(){
            $scope.loadingState = true;
            baseService.sendRequestWithUrl("/kefu/callback",{
                method:"POST",
                params:{
                    users:userId
                },
                successMessage:"收回成功"
            }).then(function(response){
                var resData = response.data;
                $scope.loadingState = false;
                if(resData.status == true){
                }                       
            },function(response){
                $scope.loadingState = false;
            }); 
        }
        //获取视图信息
    	$scope.genData();
        if(from == "workbench"){
            $scope.genKefuList();
        }
        //用户标签
        genViewCurrentTags();
        //获取视图说明信息
    	$scope.genDataHelp();
    }]);
    mainApp.filter('to_trusted', ['$sce', function ($sce) {
	    return function (text) {
	        return $sce.trustAsHtml(text);
	    };
	}]);	
	//tooltip
	mainApp.directive('jjTooltip', [function () {
	    return {
			restrict: "A",
			replace: true,
			template:'<span class="help_icon" ng-show="tipTitle"></span>',
			scope:{
				tipTitle:"="
			},
			link: function(scope,element,attrs){				
				//是否获取到title值
			 	var titleWatch = scope.$watch('tipTitle',function(newVal,oldVal){
			 		if(newVal!=undefined){
			 			$(element).tooltip({
			 				title: newVal
			 			});
						titleWatch();
			 		}
			 	});		
			}
	    };
	}]);
    //tooltip---显示提示信息
    mainApp.directive("toolTipTag",[function(){
        return {
            restrict: "A",
            scope:{
                tipItem:"="
            },
            link: function(scope,element,attrs){
                //是否获取到item值
                var itemWatch = scope.$watch('tipItem',function(newVal,oldVal){
                    if(newVal!=undefined){
                        var title = "";
                        title = '<p class="tag-tip">操作人：'+newVal.adminUserId+'</p><p class="tag-tip">时间：'+ newVal.insDate+'</p>';
                        //自动
                        if(newVal.type == "0"){
                            title += "<p class='tag-tip'>规则："+newVal.ruleName+"</p>";
                        }
                        $(element).tooltip({
                            title: title,
                            html: true
                        });
                        itemWatch();
                    }
                }); 
            }
        }
    }]);
    //时间差
    mainApp.filter("timeMinus",function(){
        return function(input){
            return JJToolKit.timeMinus(input.startTime,input.endTime);
        }
    });
    //呼入呼出类型
    mainApp.filter("callType",function(){
        return function(input){
            var retStr = "";
            if(input == 100){
                retStr="呼出";
            }else if(input == 1){
                retStr = "呼入"
            }
            return retStr;
        }
    });
    //日期格式化
    mainApp.directive('dateModelFormat', ['dateFilter', '$parse', function(dateFilter, $parse){
        return {
            restrict: 'A',
            require:'?ngModel',
            link: function(scope, element, attr, ngModel){
                var format = attr.dateModelFormat || 'yyyy-MM-dd';
                ngModel.$parsers.push(function(viewValue){
                    return dateFilter(viewValue, format);
                });
            }
        }
    }]);
    //日期控件
    mainApp.directive('jjDatepicker',function(){
        return {
            restrict: 'A',
            replace: true,
            scope:{
                ngModel:"=",
                value:"@",
                datepickerOptions:"="
            },
            template:'<p class="input-group"><input type="text" class="form-control" uib-datepicker-popup datepicker-options="datepickerOptions" ng-model="ngModel" is-open="opened" close-text="关闭" clear-text="清空" current-text="今天"/><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open()"><i class="glyphicon glyphicon-calendar"></i></button></span></p>',
            link: function(scope, element, attr, ngModel){
                scope.open = function(){
                    scope.opened = true;
                }
                if(attr.value){
                    scope.ngModel = new Date(attr.value.replace(/-/, "/"));
                }                
            }
        }
    });
    mainApp.provider('rcDialogConfig', function() {
        var defaultConfig = {
            defaultButtonConfig: [{
                result: true,
                label: "确定",
                cssClass: 'btn-primary'
            }, {
                result: false,
                label: "取消",
                cssClass: 'btn-default'
            }]
        };
        
        return {          
            setButtonLabels: function(labels) {
                angular.forEach(defaultConfig.defaultButtonConfig, function(item, index) {
                    item.label = labels[index]
                })
            },           
            setProviderOptions: function(options) {
                angular.extend(defaultConfig, options);
            },           
            $get: function() {
                return defaultConfig;
            }
        }
    })
    mainApp.factory("rcDialog",["$uibModal","rcDialogConfig",function($uibModal,rcDialogConfig){
        //显示模态窗口
        var showDialog = function(options){
            //默认配置信息
            var defOptions = {
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false
            }
            var modelOptions = angular.extend({}, defOptions, options)
            var modalInstance = $uibModal.open(modelOptions);
            return modalInstance;
        }
        var showDialogByUrl = function(url,callback, passedObject){
            var modalInstance;
            var locChangeHandler;
            var options = {
                templateUrl: url,
                resolve: {
                    passedObject: function(){
                        return passedObject;
                    }
                },
                controller:["$uibModalInstance","$scope",'passedObject', function($uibModalInstance,$scope,passedObject){
                    //切换页面时关闭窗口
                    locChangeHandler = $scope.$on("$locationChangeSuccess",function(){
                        if (modalInstance && $scope._dialogShow == true) {
                            $scope.close(false)
                        }
                    });
                    //默认class-图标
                    var iconClass = "icon-warning";
                    if(passedObject!=undefined && passedObject.iconClass){
                        iconClass = passedObject.iconClass;
                    }
                    //默认class-颜色
                    var iconColor = "text-warning";
                    if(passedObject!=undefined&& passedObject.iconColor){
                        iconColor = passedObject.iconColor;
                    }
                    $scope.iconClass = iconClass + ' ' + iconColor;
                    $scope._passedObject = passedObject;
                    $scope._dialogShow = true;
                    $scope.close = function (result) {
                        $scope._dialogShow = false;
                        $uibModalInstance.close(result);
                        modalInstance = null ;
                    };
                    //回调函数
                    if (angular.isFunction(callback)) {
                        callback($scope)
                    }
                }]
            }
            if (passedObject && passedObject.windowClass) {
                options.windowClass = passedObject.windowClass;
            }
            if (passedObject && passedObject.size) {
                options.size = passedObject.size;
            }
            modalInstance = showDialog(options);
            var unbindHandler = function(result) {
                if (locChangeHandler) {
                    locChangeHandler();
                }
                return result;
            }
            modalInstance.result.then(function (result) {
                unbindHandler(result);
            }, function (dismiss) {
                unbindHandler(dismiss);
            });
            return modalInstance;
        }
        var showMessageDialog = function(options, callback, passedObject){
            var url = 'pages/template/message.html';
            var defaultButtons = rcDialogConfig.defaultButtonConfig;
            callback = callback || options.callback;
            passedObject = passedObject || options.passedObject;
            var buttons = options.buttons || defaultButtons;
            var innerCallback = function(scope) {
                scope.title = options.title;
                scope.message = options.message;
                scope.buttons = buttons;
                
                scope.eventHandler = function(result) {
                    if (angular.isFunction(result)) {
                        result(scope);
                        return;
                    }
                    scope.close(result);
                }
                
                if (angular.isFunction(callback)) {
                    callback(scope);
                }
            }
            return showDialogByUrl(url, innerCallback, passedObject);
        }
        var showMessageDialogSimple = function(title, message, buttons, passedObject) {
            return showMessageDialog({
                title: title,
                message: message,
                buttons: buttons,
                passedObject: passedObject
            })
        }
        return {
            showDialog: showDialog,
            showDialogByUrl: showDialogByUrl,
            showMessageDialog: showMessageDialog,
            showMessageDialogSimple: showMessageDialogSimple
        };
    }]);
})();