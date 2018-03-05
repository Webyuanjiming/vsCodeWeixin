app.controller('SingleBorrowController', ['$rootScope', '$scope', '$http', '$routeParams', '$location', 'baseService',
	function ($rootScope, $scope, $http, $routeParams, $location, service) {

	    if (!preMultiExec($scope)) return;
	    service.initValue($scope);

	    var borrowId = $routeParams.id;

	    var borrowUrl = service.makeUrl("/borrowinfo?id=" + borrowId);

	    service.loadEntity(borrowUrl, $scope, "entity", function (obj) {
	    	$scope.borrow=$scope.entity.borrow;
	    });

	}]);