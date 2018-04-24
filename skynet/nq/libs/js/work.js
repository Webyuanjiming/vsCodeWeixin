var app = angular.module('myApp',[]);
//获取参数
    function GetQueryString(phone)
    {
        var reg = new RegExp("(^|&)"+ phone +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return unescape(r[2]); return null;
    }
/**控制器**/
app.controller('workCtrl',['$scope','$filter','$http',function($scope,$filter,$http){
        $scope.tableStart=function(){
            $scope.isTable=1;
        }
        $scope.tableStart();
        $scope.changeTab=function($em){
            $scope.isTable=$em;
            var $is=".sur"+$em;
            $($is).addClass("cur");
            $($is).siblings().removeClass("cur");
        }
        var now = new Date();
        var formatDate = $filter('date')(now,'yyyy-MM-dd');
        $scope.maskBak=true;

     $scope.oprInfoResult=function(data){
         for(var a=0;a<data[0].listInfo.content.length;a++){
             $scope.resultList=data[0].listInfo.content;
             $scope.xxfcbjIcon=data[0].listInfo.content[a].xxfcbj;
             if($scope.xxfcbjIcon=="0"){
                 $scope.isIcon=true;
             }else if($scope.xxfcbjIcon=="1"){
                 $scope.isIcon=false;
             }
         }
         $scope.detailPager= {
             totalElements: data[0].listInfo.totalElements,
             size:data[0].listInfo.size,
             page:data[0].listInfo.number
         }
     }
        $scope.urlStart=function(){
            var valUrl="https://www.jujinziben.com/nqhqController/detailCompany.do?callback=JSON_CALLBACK&zqdm="+ GetQueryString("code");
            $http.jsonp(valUrl).success(
                function(response){
                    $scope.baseinfos=response.baseinfo;
                    $scope.executive=response.executives;
                    $scope.tolds=response.topTenHolders;
                    $scope.finances=response.finance;
                    $scope.maskBak=false;
                }
            ).error(function(e){console.log(e);});
            $http({
                url: "https://www.jujinziben.com/disclosureInfoController/infoResult.do?callback=$scope.oprInfoResult",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                method: "post",
                data: "disclosureType=5&page=0&companyCd=" + GetQueryString("code") + "&isNewThree=1&startTime=2015-01-01&endTime=" + formatDate + "&keyword=%E5%85%B3%E9%94%AE%E5%AD%97&xxfcbj="
            }).success(function (response) {
                eval(response);
            }).error(function (e) {
                console.log(e);
            });
            var personUrl = "https://www.jujinziben.com/nqhqController/nqhq.do?callback=JSON_CALLBACK&page=0&zqdm="+ GetQueryString("code");
            $http.jsonp(personUrl).success(function (response) {
                for(var t=0;t<response[0].content.length;t++){
                    $scope.personDetails=response[0].content[t];
                    $scope.yearsDetails=$scope.personDetails.hqjsrq.substring(0,4)+"年"+$scope.personDetails.hqjsrq.substring(4,6)+"月"+$scope.personDetails.hqjsrq.substring(6,8)+"日";
                }
            }).error(function (e) {
                console.log(e);
            });
        }
        $scope.urlStart();
        $scope.cagPage = function (pager) {
            curPage = pager.page;
            var ss = {
                pi: curPage
            }
            $http({
                url:"https://www.jujinziben.com/disclosureInfoController/infoResult.do?callback=$scope.oprInfoResult",
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                method:"post",
                data:"disclosureType=5&page="+ss.pi+"&companyCd="+GetQueryString("code")+"&isNewThree=1&startTime=2015-01-01&endTime="+formatDate+"&keyword=%E5%85%B3%E9%94%AE%E5%AD%97&xxfcbj="
            }).success(function(response){eval(response);}).error(function(e){console.log(e);});
        }
    }]);

//分页
app.controller("jjPageCtrl",["$q","$scope",function($q,$scope){
        //默认每页条数
        var defPageNum = 20;
        //显示页
        var defShowPageNum = 5;
        //初始化分页信息
        $scope.state = {
            //防止重复加载
            flipping: !0,
            //分页数据
            pages: [],
            //范围
            range: {
                min: 0,
                max: 0
            },
            //跳转页数
            jumpPage: 0,
            //总页数
            totalPages: 0,
            //每页条数
            pagesNumber: defPageNum,
            //分页中显示页
            showPageNum: defShowPageNum
        };
        var stateData = $scope.state,
        //分页数据
        jjPager = $scope.pagerInfo;
        //上一页
        $scope.prevPage = function(){
            var toPageNum = parseInt(stateData.jumpPage) - 1;
            toPageNum > 0 && $scope.gotoPage(toPageNum);
        }
        //下一页
        $scope.nextPage = function(){
            var toPageNum = parseInt(stateData.jumpPage) + 1;
            //不超过最大页数
            toPageNum <= stateData.totalPages && $scope.gotoPage(toPageNum);
        }
        //首页
        $scope.firstPage = function(){
            $scope.gotoPage();
        }
        //末页
        $scope.lastPage = function(){
            $scope.gotoPage(stateData.totalPages);
        }
        //跳到几页
        $scope.gotoPage = function(num){
            //在正常页数内
            if(stateData.filpping || num>0 && num <=stateData.totalPages){
                //未加载过数据
                if(num != jjPager.page){
                    //加载数据页
                    jjPager.page = num,
                        //生成分页信息
                        $scope.genPageData(jjPager);
                    //获取分页数据
                    if(angular.isDefined($scope.onPageChange)){
                        $q.when($scope.onPageChange({
                            pager: jjPager
                        }))["finally"](function() {
                            //加载完成
                            stateData.flipping = !1;
                        });
                    }
                }
            }
        }
        //生成分页信息
        $scope.genPageData = function(pagerData){
            if(pagerData){
                var pageSize = pagerData.pageSize || defPageNum;
                //总页数
                stateData.totalPages = Math.ceil(pagerData.totalElements / pageSize);
                if(pagerData.totalElements > 0&&pagerData.page==0){
                    //跳转页数
                    stateData.jumpPage = pagerData.page+1;
                }else if(pagerData.totalElements > 0&&pagerData.page > 1){
                    //跳转页数
                    stateData.jumpPage = pagerData.page;
                }
                stateData.pages = [];
                stateData.range = genRange(stateData.jumpPage, stateData.totalPages, stateData.showPageNum);
                for(var i = stateData.range.min;i<=stateData.range.max;i++){
                    stateData.pages.push({
                        index: i,
                        current: i == stateData.jumpPage
                    })
                    //当前页
                    if(i == stateData.jumpPage){
                        //当前页说明：从几到几
                        var startNum  = ((stateData.jumpPage-1)*pageSize+1);
                        var endNum = stateData.jumpPage*pageSize;
                        if(endNum>pagerData.totalElements){
                            endNum = pagerData.totalElements;
                        }
                        stateData.currentPageInfo = startNum + "-" + endNum;
                    }
                }
            }
        }
        //生成范围
        function genRange(jumpPage, totalPages, showPageNum){
            var range = {
                    min: 0,
                    max: 0
                },
            //左右显示页数
                lrnum = parseInt((showPageNum) / 2),
                lnum = jumpPage - 1;
            range.min = lnum < lrnum ? 1 : jumpPage - lrnum,
                range.max = Math.min(totalPages, range.min + showPageNum - 1);
            //显示页数
            var curNum = range.max - range.min + 1;
            curNum < showPageNum && range.min > 1 && (range.min = Math.max(1, range.min - (showPageNum - curNum)));
            return range;
        }
        $scope.$watch("pagerInfo", function(newVal){
            //分页数据
            jjPager = newVal;
            $scope.genPageData(newVal);
        });
    }]);
app.directive("jjPager",[function(){
        return {
            restrict: "A",
            scope: {
                pagerInfo: "=",
                onPageChange: "&"
            },
            templateUrl: "resources/directives/ui/jj-pager.html",
            controller:"jjPageCtrl",
            link:function(scope,element,attrs){
                //显示页数
                if(!isNaN(attrs.showpagenum)){
                    scope.state.showPageNum = parseInt(attrs.showpagenum);
                }
                //生成分页信息
                //scope.genPageData(scope.pagerInfo);
            }
        }
    }]);





