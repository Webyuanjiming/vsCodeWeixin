


app.config(function($routeProvider) {

    //原首页
    $routeProvider.when('/sign', {
        templateUrl: '/m/jujin/sign/index.html',
        reloadOnSearch: false,
        controller: 'SignController'
    }); //首页


/**签到场景**/
app.controller('SignController', ['$rootScope', '$scope', '$http', '$routeParams', 'SharedState', '$location', 'baseService',
    function($rootScope, $scope, $http, $routeParamsp, SharedState, $location, service) {
        

            $scope.entity={};

            var entity={"signDays",20,
            "totalReward":40,
            "continuityDay":1,
            "maxContinuityDay":3,
            "maxReward":2};


            $scope.entity=entity;

            if(isNaN(entity.continuityDay)||isNaN(entity.maxContinuityDay))
            {
                $scope.entity.needDay=entity.maxContinuityDay;
            }
            $scope.entity.needDay=parseInt(entity.maxContinuityDay)-parseInt(entity.continuityDay);
             





    });