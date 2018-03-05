app.controller('MediatorController', ['$rootScope', '$scope', '$http', '$routeParams', '$location',
	function ($rootScope, $scope, $http, $routeParams, $location) {

	    $scope.phone = "";
	    $scope.msg = "";

	    $scope.$watch('phone', function () {

	        $scope.msg = "";
	        if (isEmpty($scope.phone))
	        {
	            return;
	        }
	        if ($scope.phone.toString().length > 11) {
	            $scope.phone = $scope.phone.substring(0, 11);
	            $scope.msg = "请输入手机号";
	            //return;
	        }
	        if ($scope.phone.toString().length == 11 && !checkIsMobile($scope.phone)) {
	            $scope.msg = "请输入手机号";
	        }
	    });


	    $scope.tran = function () {
	        if ($scope.phone.toString().length == 11&&checkIsMobile($scope.phone)) {
	            $location.url("med?phone=" + $scope.phone);
	        }
	    };
	}]);