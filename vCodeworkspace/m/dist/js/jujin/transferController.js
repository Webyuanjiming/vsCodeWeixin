 
/*app.service('myService', function() {

	  var _artist = '1231';
    var service = {};

    service.getArtist = function() {
        return _artist;
    }


    service.sayHello = function() {
        return "Hello World";
    }

    return service;
});*/



//债权转让控制器
app.controller('TransferController', ['$rootScope', '$scope', '$http', '$location', 'baseService',
    function($rootScope, $scope, $http, $location, service) {

        console.log(service);
    
        //console.log(service.getArtist());
        //console.log(service.sayHello());

    }
]);
