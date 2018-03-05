/**
 * Created by w8 on 15-10-14.
 * author:YuanJiMing
 */
app.controller('wisdomlistController', ['$rootScope', '$scope', '$http', '$routeParams', '$sce',
    function ($rootScope, $scope, $http, $routeParamsp, $sce) {


        $scope.phone="";
        setDefaultValue($scope, $rootScope);
        $scope.loadMessage=function()
        {
            if(isEmpty($scope.phone)||$scope.phone.length!=11)
            {
                return;
            }
            if(!isEmpty($scope.messages))
            {
                $scope.messages=[];
            }
            var url = $rootScope.URL_ROOT + "/QuerySms?tel="+$scope.phone;
            console.log(url);
            $http.get(url).success(function (response) {

                if (checkResponse($rootScope, $scope, response)) {
                    var list = response.list;
                    if (isEmpty($scope.messages) && Array.isArray($scope.messages))//列表中已有元素
                    {
                        list.forEach(function (item, index, array) { $scope.messages.push(item); });
                    }
                    else {
                        $scope.messages = [];
                        list.forEach(function (item, index, array) { $scope.messages.push(item); });
                    }
                }
            }).error(function (response, status, headers, config) {
                checkResponse($rootScope, $scope, response);

            });
        }

    }]);
