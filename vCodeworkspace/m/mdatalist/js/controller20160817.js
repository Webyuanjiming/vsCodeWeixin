var app = angular.module('myApp',[ ]);

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

app.controller('allCtrl',function($scope,$http){
    $http.jsonp("https://www.jujinziben.com/pc/reveal/info?callback=JSON_CALLBACK")
        .success(
        function(response)
        {
            $scope.allData = response.entity;
            //console.log($scope.allData);

        });
});

//数字变化
app.directive("incrementNumber",[function(){
    return {
        restrict: "A",
        scope:{
            incnum: "&"
        },
        link:function(scope,element,attrs){
            var totalNumber = scope.incnum;
            scope.$watch(totalNumber,function(newVal,oldVal){
                if(newVal != undefined){
                    //间隔数
                    var intervalNum = newVal/5;
                    //自增数
                    var incNumber = 0;
                    function show(){
                        if(incNumber >= newVal){
                            //取消循环
                            clearInterval(intervalFuc);
                        }else{
                            incNumber = incNumber + intervalNum;
                            element.text(incNumber);
                        }
                    }
                    var intervalFuc=setInterval(show,100);
                }
            });
        }
    }
}]);


app.directive('pagteUrl', ['$rootScope',function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            //是否App过来
            var mobileFlag=GetQueryString("mobile");
            //console.log(mobileFlag);
            var borrowid=scope.pagte.BORROW_ID;
            var borrowtype=scope.pagte.BORROW_TYPE;
            var trabsferflg=scope.pagte.TRANSFER_FLG;
            //console.log(borrowid);
            if(mobileFlag == 1){
                element.attr("href",'jsbridge://action?data={"action":"borrow","flag":"可选","type": "'+borrowtype+'","borrowId":"'+borrowid+'","transferFlg":"'+trabsferflg+'"}');
            }else{
                element.attr("href","http://m.jujinziben.com/m/jujin/#/borrowinfo?id="+borrowid);
            }
        }
    }
}]);
/*--回款列表--*/
app.controller('sectCtrl',function($scope,$http){
    /*-悬浮数据框-*/
    $http.jsonp("https://www.jujinziben.com/pc/reveal/borrowinfo?callback=JSON_CALLBACK").success(
        function(response){
            $scope.pag=response.list;
           $scope.firstpag=response.list[0];
            var BORROW_ID=[],BORROW_TITLE=[],BORROW_PERIOD=[],BORROW_ACCOUNT=[],BORROW_STATUS=[],BORROW_TYPE=[],TRANSFER_FLG=[];
            for(var i=0,len=$scope.pag.length;i<len;i++){
                if($scope.pag[i] != null){
                    BORROW_ACCOUNT.push($scope.pag[i].BORROW_ACCOUNT);
                    BORROW_ID.push($scope.pag[i].BORROW_ID);
                    BORROW_TYPE.push($scope.pag[i].BORROW_TYPE);
                    TRANSFER_FLG.push($scope.pag[i].TRANSFER_FLG);
                    BORROW_TITLE.push($scope.pag[i].BORROW_TITLE);
                    BORROW_PERIOD.push($scope.pag[i].BORROW_PERIOD);
                    BORROW_STATUS.push($scope.pag[i].BORROW_STATUS);
                }
                //console.log($scope.pag);
            }
        });
    /*--下拉框数据--*/
    $scope.change = function(){
        if($scope.slectCge== 0){
            //debugger;
            $("#dxr").hide();
            $scope.cage();
        }else if($scope.slectCge==1||$scope.slectCge== 2||$scope.slectCge== 3){
            $scope.volume=[];
            $(".rey-box").hide();
            $("#dxr").show();
       }
    }
    $scope.brand = function(){
        if($(".x-cort-list").css("display")=="none"){
            $(".x-cort-list").show();
        }
        else{
            $(".x-cort-list").hide();
        }
    }
    $scope.cage=function(){
        $http.jsonp("https://www.jujinziben.com/pc/reveal/repayweek?callback=JSON_CALLBACK").success(
            function(response){
                $scope.volume=response.list;
                //console.log($scope.volume);
                var borrowTitle=[],repayTimes=[],borrowRate=[],repayAccountTimes=[],userTenderCount=[],
                    repayTimeYes=[],borrowPeriod=[],repayAccountCapitalWait=[],repayAccountInterestWait=[];
                for(var i= 0,len=$scope.volume.length;i<len;i++){
                    if($scope.volume[i] != null){
                        //进行排序
                        borrowTitle.push($scope.volume[i].borrowTitle);
                        repayTimes.push($scope.volume[i].repayTimes);
                        borrowRate.push($scope.volume[i].borrowRate);
                        repayAccountTimes.push($scope.volume[i].repayAccountTimes);
                        userTenderCount.push($scope.volume[i].userTenderCount);
                        repayTimeYes.push($scope.volume[i].repayTimeYes);
                        borrowPeriod.push($scope.volume[i].borrowPeriod);
                        repayAccountCapitalWait.push($scope.volume[i].repayAccountCapitalWait);
                        repayAccountInterestWait.push($scope.volume[i].repayAccountInterestWait);
                    }
                    //console.log($scope.volume[i]);
                }

            });
    }
});

/*--柱状图--*/
require.config({
    paths: {
        echarts: './js'
    }
});
require(
    [
        'echarts',
        'echarts/chart/bar',
        'echarts/chart/line'
    ],
    function (ec) {
        //--- 折柱 ---
        var myChart = ec.init(document.getElementById('main'));
        myChart.setOption({
            tooltip : {
                trigger: 'axis',
                position:[30,100],
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                show : true
            },
            calculable : true,
            yAxis : [
                {
                    show: true,
                    type : 'value',
                    axisLabel: {
                        formatter: function(value) {
                            return value / 10000000 +' 千万';
                        }
                    }
                }
            ]
        });
        /*-2start-*/
        var myChart1 = ec.init(document.getElementById('main2'));
        myChart1.setOption({
            tooltip : {
                trigger: 'axis',
                position:[30,100],
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['一月标','二月标','三月标']
            },
            toolbox: {
                show : true
            },
            calculable : true
        });
/*--2end--*/
        /*--3start--*/
        var myChart3 = ec.init(document.getElementById('main3'));
        myChart3.setOption({
                tooltip : {
                    trigger: 'axis',
                    position:[30,100]
                },
                legend: {
                    data:['每日成交量']
                },
                toolbox: {
                    show : true
                },
                calculable : true,
                yAxis : [
                    {
                        type : 'value',
                        splitArea : {show : true},
                        axisLabel: {
                            formatter: function(value) {
                                return value / 10000000 +' 千万';
                            }
                        },
                        splitNumber:5
                    }
                ]
        });
        /*--3end--*/

  /*=一月标/二月标/三月标/数据图表=*/
        $.ajax({
            url:"https://www.jujinziben.com/pc/reveal/monthsvolume",
            dataType:"jsonp",
            success: function(data){
                //console.log(data);
                var monthData = data.list;
                var VERIFY_DATE=[],BORROW_ACCOUNT_ONE = [],BORROW_ACCOUNT_TWO=[],BORROW_ACCOUNT_THR=[],BORROW_ACCOUNT_YES=[];
                for(var i= 0,len=monthData.length;i<len;i++){
                    if(monthData[i] != null){
                    //排序
                    VERIFY_DATE.push(monthData[i].VERIFY_DATE);
                    BORROW_ACCOUNT_ONE.push(monthData[i].BORROW_ACCOUNT_ONE);
                    BORROW_ACCOUNT_TWO.push(monthData[i].BORROW_ACCOUNT_TWO);
                    BORROW_ACCOUNT_THR.push(monthData[i].BORROW_ACCOUNT_THR);
                    BORROW_ACCOUNT_YES.push(monthData[i].BORROW_ACCOUNT_YES);
                    }
                }
                myChart1.setOption(
                    {
                    xAxis : [
                        {
                            type : 'category',
                            data : VERIFY_DATE,
                            axisLabel:{
                                //X轴刻度配置
                                interval:4 //0：表示全部显示不间隔；
                            }
                        }
                    ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel: {
                                    formatter: function(value) {
                                        return value / 10000000 +' 千万';
                                    }
                                },
                                axisTick:{
                                    show:true

                                }
                            }
                        ],
                    grid: {
                            x:'55',
                        width:'80%'
                   },
                    series : [
                        {
                            name:'一月标',
                            type:'bar',
                            stack: '总量',
                            barWidth :8,
                            itemStyle : { normal: {label : {show: false},color: "#FF985A"}},
                            data:BORROW_ACCOUNT_ONE
                        },
                        {
                            name:'二月标',
                            type:'bar',
                            stack: '总量',
                            barWidth :8,
                            itemStyle : { normal: {label : {show: false},color: "#FF5965"}},
                            data:BORROW_ACCOUNT_TWO
                        },
                        {
                            name:'三月标',
                            type:'bar',
                            stack: '总量',
                            barWidth :8,
                            itemStyle : { normal: {label : {show: false}, color: "#599FFF"}},
                            data:BORROW_ACCOUNT_THR
                        }
                    ]
                });
            }

        });

  /*=未来30天待收总额=*/
        $.ajax({
            url:"https://www.jujinziben.com/pc/reveal/repaydays",
            dataType:"jsonp",
            success:function(data){
                var DaysMoney=data.list;
                var AccountAll=data.entity;
                var MIN_REPAY_ACCOUNT_ALL=AccountAll.MIN_REPAY_ACCOUNT_ALL;
                var MAX_REPAY_ACCOUNT_ALL=AccountAll.MAX_REPAY_ACCOUNT_ALL;
                var AVG_REPAY_ACCOUNT_ALL=AccountAll.AVG_REPAY_ACCOUNT_ALL;
                //console.log(MIN_REPAY_ACCOUNT_ALL);
                //console.log(DaysMoney);
                var REPAY_ACCOUNT_ALL=[],REPAY_TIME=[];
                for(var i= 0,len=DaysMoney.length;i<len;i++){
                    if(DaysMoney[i] != null){
                        REPAY_ACCOUNT_ALL.push(DaysMoney[i].REPAY_ACCOUNT_ALL);
                        REPAY_TIME.push(DaysMoney[i].REPAY_TIME);
                    }
                    //console.log(DaysMoney[i].REPAY_ACCOUNT_ALL);

                }
                myChart.setOption({
                    xAxis : [
                        {
                            type : 'category',
                            data :REPAY_TIME
                        }

                    ],
                    grid: {
                        x:'55',
                        width:'80%'
                    },
                    series : [
                        {
                            name:'待收金额',
                            type:'bar',
                            stack: '总量',
                            barWidth :5,
                            itemStyle:{
                                normal:{
                                    color: "#FF6772" //图标颜色
                                }
                            },
                            data:REPAY_ACCOUNT_ALL,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值',itemStyle:{normal:{label : {show: true},color:'#FF6772'}}},
                                    {type : 'min', name: '最小值',itemStyle:{normal:{label : {show: true},color:'#FF6772'}}}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值',itemStyle:{normal:{color:'#FF6772'}}}
                                ]
                            }

                        }
                    ]
                });
            }
        });
      /*--daysvolume---*/
        $.ajax({
            url:"https://www.jujinziben.com/pc/reveal/daysvolume",
            dataType:"jsonp",
            success:function(data){
                var dayVolume=data.list;
                var VERIFY_DATE=[],BORROW_ACCOUNT_YES= [];
                for(var i= 0,len=dayVolume.length;i<len;i++){
                    if(dayVolume[i] != null){
                        VERIFY_DATE.push(dayVolume[i].VERIFY_DATE);
                        BORROW_ACCOUNT_YES.push(dayVolume[i].BORROW_ACCOUNT_YES);
                    }
                }
                myChart3.setOption({
                    xAxis : [
                        {
                            type : 'category',
                            data :VERIFY_DATE
                        }
                    ],
                    grid: {
                        x:'55',
                        width:'80%'
                    },
                    series : [
                        {
                            name:'每日成交量',
                            type:'bar',
                            barWidth :5,
                            itemStyle:{
                                normal:{
                                    color: "#FF985A" //图标颜色
                                }
                            },
                            data:BORROW_ACCOUNT_YES
                        }
                    ]
                });
            }
        });
    }
);



