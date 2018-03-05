var app = angular.module('MobileAngularUiExamples', [
    'ngRoute'
]);
app.config(function($routeProvider) {
    $routeProvider.when('/list', {
        templateUrl: 'list.html',
        reloadOnSearch: false,
        controller: 'listController'
    });
    $routeProvider.when('/detail', {
        templateUrl: 'detail.html',
        reloadOnSearch: false,
        controller: 'detailController'
    });
});
//数据列表
app.controller("listController",["$scope","$http","$location","$routeParams",function($scope,$http,$location,$routeParams){
    
    //当前页
    var curPage = 1,
        //总页数
        pageCount = 1;
	var typeId = $routeParams.typeId;
	//类型映射
	var typeMap = {
		"01":"常见问题",
		"05":"最新动态",
		"06":"媒体动态",
		"08":"发标公告"
	}
	$scope.title = typeMap[typeId]||"";
    $scope.list = [];
    $scope.showMore = false;
    //加载数据列表   
    function loadList(){
        //获取数据列表url
		var url = "https://m.jujinziben.com/api/article/list?typeId="+typeId+"&pi="+curPage+"&ps=10";
        $http.get(url).success(function(response){
			if(response.list && Array.isArray(response.list)){
				$scope.list = $scope.list.concat(response.list);
			}
            pageCount = response.pageCount;
            if(curPage < pageCount){
                $scope.showMore = true;
            }else{
                $scope.showMore = false;
            }
        }).error(function(e){
            alert("异常：" + e);
        });
    }
    loadList(); 
    //加载更多 
    $scope.loadMore = function(){
        curPage++; 
        loadList();
    } 
}]);
//数据详情
app.controller("detailController",["$scope","$http","$routeParams","$sce",function($scope, $http, $routeParams,$sce){
    //文章id
    var artId = $routeParams.artId;
    //获取数据详情url
    var url = "https://m.jujinziben.com/api/article/detail?articleId="+artId;
    $http.get(url).success(function(response){
		//文章信息
		var artInfo = response.entity;
		if(artInfo){
			$scope.artContent = $sce.trustAsHtml(artInfo.articleBody);
			$scope.articleTitle = artInfo.articleTitle;
			$scope.publishTime = artInfo.publishTime;
			$scope.author = artInfo.author;
			$scope.hits = artInfo.hits;
		}       
    }).error(function(e){
       alert("异常：" + e);
    });
}]);