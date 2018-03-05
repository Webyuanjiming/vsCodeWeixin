/*@Create by w8 on 2016/10/31@*/
/*@author:Web -YuanjiMing-@*
* @ js control is here!@*
* @ jquery is license;@*
* */
var app = angular.module('myApp',['ngRoute']);
app.controller('doubleCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
      /*  function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return unescape(r[2]); return null;
        }*/
        $(".dbe-btn").click(
            function(){
                window.location.href="http://114.215.100.75:8888/m/jujin/#/login";
            }
        );
        $scope.maxGg=function(){
            $http.get("data/json.json")
                .success(
                function(data){
                    var jg = data.entity.dldjs;
                    // console.log(jg);
                    var jgHtml = "";
                    for(var i=0,len = jg.length;i<len;i++){
                        jgHtml = jgHtml + '<ul><li>'+jg[i].name+'</li><li>'+jg[i].time+'</li></ul>';
                    }
                    $("#addTopList").html(jgHtml);

                });
        }
   $scope.maxGg();
        //投资记录列表
    $scope.Investment=function(){
        $http.get("http://114.215.100.75:8888/api/dafuweng/record").
//            dataType:"jsonp",
                success(function(data){
                    var invest = data.entity;
                    // console.log(invest);
                    var investHtml = "";
                    var intTotal=0;
                    for(var i=0,len = invest.length;i<len;i++){
                        intTotal=intTotal+parseFloat(invest[i].amount);
                        investHtml = investHtml + '<tr><td>'+invest[i].borrowTitle+'</td><td>'+invest[i].amount+'</td><td>'+invest[i].period+'</td><td>'+invest[i].tendDate+'</td></tr>';
                    }
                if(data.entity != null){
                    $(".ng-lit").hide();
                    $(".cot240-table").show();
                    $(".inr-list .in-p0").hide();
                    $(".inr-list .out-man").show();
                }else{
                    $(".ng-lit").show();
                    $(".cot240-table").hide();
                    $(".inr-list .in-p0").show();
                    $(".inr-list .out-man").hide();
                }
                //console.log(intTotal);
                    $("#oneList").html(investHtml);
                   $("#total").html(intTotal);
                });
        }
    $scope.Investment();
        //step

        $scope.step=function(){
            $http.get("http://114.215.100.75:8888/api/dafuweng/page").success(
                function(data){
                    if(data.status==true){
                            $(".cion-btn").click(
                                function(){
                                    if(data.loginstatus==0){
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/login";
                                    }else{
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/borrows";
                                    }
                                }
                            );
                            $(".box-t-btn").click(
                                function(){
                                    if(data.loginstatus==0){
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/login";
                                    }else{
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/borrows";
                                    }
                                }
                            );
                            $(".box-t-btn").click(
                                function(){
                                    if(data.loginstatus==0){
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/login";
                                    }else{
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/borrows";
                                    }
                                }
                            );
                            $(".ivt-btn").click(
                                function(){
                                    if(data.loginstatus==0){
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/login";
                                    }else{
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/borrows";
                                    }
                                }
                            );


                        $scope.renInvest=function(){
                            $(".name-cion").click(function(){
                                if(stp.realMedal==false){
                                    alert("请您进行实名认证，即可获得0.5%加息券一张");
                                    window.location.href="http://114.215.100.75:8888/m/jujin/#/attest";
                                }
                                if(stp.realMedal==true){
                                    $(".n-ig").hide();
                                    $(".n-ig0").show();
                                    $(".ir0").hide();
                                    $(".ir00").show();
                                }
                            });
                        }
                        $scope.renImg=function(){
                            $(".invest-cion").click(
                                function(){
                                    if(stp.tendMedal==false){
                                        alert("您还未投资，投资累计满2万元即可获得10元抵现红包");
                                        window.location.href="http://114.215.100.75:8888/m/jujin/#/";
                                    }
                                    if(stp.tendMedal==true){
                                        $(".iv-ig").hide();
                                        $(".iv-ig0").show();
                                        $(".ix0").hide();
                                        $(".ix00").show();
                                    }
                                }
                            );
                        }
                        var stp=data.entity;
                        var goStep=parseInt(stp.step);
                        switch(goStep){
                            case 1:
                                $(".ras-i00").remove();
                                $(".ras-i .radius-gif").show();
                                $(".radius-icon0").hide();
                                break;
                            case 2:
                                $(".ras-i00").remove();
                                $(".ras-i .radius-icon0").removeClass("radius-icon0").addClass("intro");
                                $(".ras-i0 .radius-gif").show();
                                $(".radius-icon1").hide();
                                break;
                            case 3:
                                $(".ras-i00").remove();
                                $(".ras-i0 .radius-icon1").removeClass("radius-icon1").addClass("intro");
                                $(".ras-i .radius-icon0").removeClass("radius-icon0").addClass("intro");
                                $(".ras-i1 .radius-gif").show();
                                $(".radius-icon2").hide();
                                break;
                            case 4:
                                $(".ras-i00").remove();
                                $(".ras-i1 .radius-icon2").removeClass("radius-icon2").addClass("intro");
                                $(".ras-i0 .radius-icon1").removeClass("radius-icon1").addClass("intro");
                                $(".ras-i .radius-icon0").removeClass("radius-icon0").addClass("intro");
                                $(".ras-i2 .radius-gif").show();
                                $(".radius-icon3").hide();
                                break;
                            case 5:
                                $(".ras-i00").remove();
                                $(".ras-i2 .radius-icon3").removeClass("radius-icon3").addClass("intro");
                                $(".ras-i1 .radius-icon2").removeClass("radius-icon2").addClass("intro");
                                $(".ras-i0 .radius-icon1").removeClass("radius-icon1").addClass("intro");
                                $(".ras-i .radius-icon0").removeClass("radius-icon0").addClass("intro");
                                $(".ras-i3 .radius-gif").show();
                                $(".radius-icon4").hide();
                                break;
                            case 6:
                                $(".ras-i00").remove();
                                $(".ras-i3 .radius-icon4").removeClass("radius-icon4").addClass("intro");
                                $(".ras-i2 .radius-icon3").removeClass("radius-icon3").addClass("intro");
                                $(".ras-i1 .radius-icon2").removeClass("radius-icon2").addClass("intro");
                                $(".ras-i0 .radius-icon1").removeClass("radius-icon1").addClass("intro");
                                $(".ras-i .radius-icon0").removeClass("radius-icon0").addClass("intro");
                                $(".ras-i4 .radius-gif").show();
                                $(".radius-icon5").hide();
                                break;
                        }
                        $scope.total=function(){
                            $("#total-top").html(stp.originalAwait);
                            $("#await").html(stp.await);
                            $("#addawait").html(stp.addAwait);
                            $("#step-one").html(stp.step);
                        }
                        if(data.loginstatus==0){
                            alert("您还未登录");
                            window.location.href="http://114.215.100.75:8888/m/jujin/#/login";
                        }else if(data.loginstatus==1){
                            $scope.renInvest();
                            $scope.renImg();
                            //console.log(stp.userType);
                            //console.log(parseInt(stp.userType));
                            if(parseInt(stp.userType)==1&&stp.realMedal==true){
                                $(".name-invest").hide();
                                $(".inr-list").show();
                                $(".ir0").hide();
                                $(".ir00").show();
                            }
                            if(parseInt(stp.userType)==1 && stp.realMedal==true && stp.tendMedal==true){
                                $(".name-invest").hide();
                                $(".inr-list").show();
                                $(".ir0").hide();
                                $(".ir00").show();
                                $(".ix0").hide();
                                $(".ix00").show();
                                $scope.total();
                            }
                            if(parseInt(stp.userType)==0 && stp.realMedal==true){
                                $(".name-invest").hide();
                                $(".inr-list").show();
                                $(".in-p0").hide();
                                $(".inr-box").hide();
                                $scope.total();
                            }
                            if(parseInt(stp.userType)==0 && stp.realMedal==true && stp.tendMedal==true){
                                $(".name-invest").hide();
                                $(".inr-list").show();
                                $(".in-p0").hide();
                                $(".inr-box").hide();
                                $scope.total();
                            }
                        }
                    }else if(data.status==false){
                        alert("msg:"+data.msg);
                    }
                });
        }
    $scope.step();
        $(function(){
            var _wrap=$('#addTopList');//定义滚动区域
            var _interval=600;//定义滚动间隙时间
            var _moving;//需要清除的动画
            _wrap.hover(function(){
                clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
            },function(){
                _moving=setInterval(function(){
                    var _field=_wrap.find('ul:first');//此变量不可放置于函数起始处,li:first取值是变化的
                    var _h=_field.height();//取得每次滚动高度(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
                    _field.animate({marginTop:-_h+'px'},300,function(){//通过取负margin值,隐藏第一行
                        _field.css('marginTop',0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
                    })
                },_interval)//滚动间隔时间取决于_interval
            }).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动
        });
}]);


