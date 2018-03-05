 var pageSize = 10;
    var maxPage = 5;//最多显示页数
    $(document).ready(function(){
        initDatagrid();

    })

    function initDatagrid(){
        var mobile = $("#mobile").val();
        var userId = $("#username").val();
        var startDate = $("#id13").val();
        var endDate = $("#id14").val();
        $.ajax({
            type : "POST",
            url : basepath+"/skynet/report/data",
            data : {
                "reportId" : "user_development_report",
                "pageNumber":1,//当前选中页数
                "pageSize":pageSize,
                "mobile":mobile,
                "userId":userId,
                "startDate":startDate,
                "endDate":endDate
            },

            dataType : "json",
            success : function(data) {
                //总记录数
                var totalCount = data.datagrid.total;
                $("#totalCount").val(totalCount);
                loadData(1);
                loadpage();

            },
            error : function(e) {
                alert("异常:"+e);
            }
            
        });
      
    }

    function loadData(pageNumber){
       
        var mobile = $("#mobile").val();
        var userId = $("#username").val();
        var startDate = $("#id13").val();
        var endDate = $("#id14").val();
        $.ajax({
            type : "POST",
            url : basepath+"/skynet/report/data",
            data : {
                "reportId" : "user_development_report",
                "pageNumber":pageNumber,//当前选中页数
                "pageSize":pageSize,
                "mobile":mobile,
                "userId":userId,
                "startDate":startDate,
                "endDate":endDate
            },

            dataType : "json",
            success : function(data) {
                //总记录数
                var totalCount = data.datagrid.total;
                //总页数
                var pageCount = data.datagrid.pageCount;
                //当前页面
                var pageNumber = data.datagrid.pageNumber;
                //数据
                var list = data.datagrid.rows;
				
                //先清空id里面的内容
                $("#jdata").empty();
                //遍历查询数组
                for(var i=0;i<list.length;i++){
                    if(i%2==0){
                         $("#jdata").append(
                            "<tr style=\"background:#eaf3f5;\">"+
                                    "<td>"+list[i].CHANNEL+"</td>"+
                                    "<td>"+list[i].USERID+"</td>"+
                                    "<td>"+list[i].MOBILE+"</td>"+
                                    "<td>"+formatUndefined(list[i].REALNAME)+"</td>"+
                                    "<td>"+formatUndefined(list[i].REFEREE)+"</td>"+
                                    "<td>"+formatUndefined(list[i].LOGINTIMES)+"</td>"+
                                    "<td>"+list[i].REGTIME+"</td>"+
                                    "<td>"+list[i].RECHARGE+"</td>"+
                                    "<td>"+list[i].CASH+"</td>"+
                                    "<td>"+list[i].BALANCE+"</td>"+
                                    "<td>"+list[i].TENDTIMES+"</td>"+
                                    "<td>"+formatUndefined(list[i].TENDACCOUNT)+"</td>"+
                                    "</tr>"
                    );
                    }else{
                    $("#jdata").append(
                            "<tr style=\"background:#ffffff;\">"+
                                    "<td>"+list[i].CHANNEL+"</td>"+
                                    "<td>"+list[i].USERID+"</td>"+
                                    "<td>"+list[i].MOBILE+"</td>"+
                                    "<td>"+formatUndefined(list[i].REALNAME)+"</td>"+
                                    "<td>"+formatUndefined(list[i].REFEREE)+"</td>"+
                                    "<td>"+formatUndefined(list[i].LOGINTIMES)+"</td>"+
                                    "<td>"+list[i].REGTIME+"</td>"+
                                    "<td>"+list[i].RECHARGE+"</td>"+
                                    "<td>"+list[i].CASH+"</td>"+
                                    "<td>"+list[i].BALANCE+"</td>"+
                                    "<td>"+list[i].TENDTIMES+"</td>"+
                                    "<td>"+formatUndefined(list[i].TENDACCOUNT)+"</td>"+
                                    "</tr>"
                    );
                    }
                    
                }
            },
            error : function(e) {
                alert("异常:"+e);
            }
            
        });
    
    
    }

    function loadpage(){
        var totalCount = parseInt($("#totalCount").val());
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
                    exeData(num, type);
                }
            }
        });
    }

    function exeData(num, type) {
        loadData(num);
        loadpage();
    }



    //处理空值
    function formatUndefined(name){
        //判断name是否为underfined
        if(typeof(name)=="undefined"){
            return "";
            //返回空字符串
        }else{
            return name;
        }
    }

   



    function exportData(){
        var mobile = $("#mobile").val();
        var userId = $("#username").val();
        var startDate = $("#id13").val();
        var endDate = $("#id14").val();
        $.ajax({
            type : "POST",
            url : basepath+"/skynet/report/export",
            data : {
                "reportId" : "user_development_report",
                "mobile":mobile,
                "userId":userId,
                "startDate":startDate,
                "endDate":endDate
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