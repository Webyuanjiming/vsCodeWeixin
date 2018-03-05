var app = angular.module('VoteApp', [
    'ngRoute'
    // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
    // it is at a very beginning stage, so please be careful if you like to use
    // in production. This is intended to provide a flexible, integrated and and 
    // easy to use alternative to other 3rd party libs like hammer.js, with the
    // final pourpose to integrate gestures into default ui interactions like 
    // opening sidebars, turning switches on/off ..
]);

var SERVER_ADDRESS = "http://114.215.100.75";



app.factory('baseService', ['$location', '$rootScope', '$http', '$sce', function($location, $rootScope, $http, $sce) {


    var service = {};
    var config = {
        SERVER: SERVER_ADDRESS,
        URL_ROOT: SERVER_ADDRESS + "/api",
        ROOT: SERVER_ADDRESS + "/m/jujin/",
        IS_LOGIN: false,
        PAGE_SIZE: 5,
        RETURN: "" //登录后跳转的页面
    };
    /**
    函数名：makeUrl
    参数：
        serviceName：服务名(包含get的参数，单独拉出来反倒不直观，合在一起，就这么定了!^_^)
        pi：请求的页数
        ps：当前页数
    说明：从服务器取出集合数据放在$scope中对应的属性中

    **/
    service.makeUrl = function(serviceName, pi, ps) {

        var url = config.URL_ROOT + serviceName;

        if (!isEmpty(pi)) {
            if (serviceName.indexOf("?") == -1) {
                url += "?pi=" + pi;
            } else {
                url += "&pi=" + pi;
            }

            if (!isEmpty(ps)) {
                url += "&ps=" + ps;
            } else {
                url += "&ps=" + config.PAGE_SIZE;
            }
        }
        return url;
    }

    service.getConfig = function() {
            return config;
        }
        /**
        函数名：loadEntities
        参数：
            $scope：Controller函数
            proName：$scope中属性名等价于$scope.messages,$scope.rows
            rowhandler:是否需要对每条数据进行格式转换和处理
            handler:对结果集转换函数
        说明：从服务器取出集合数据放在$scope中对应的属性中

        **/
    service.loadEntities = function(url, $scope, proName, rowhandler, handler) {
            $rootScope.loading = true;
            $http.get(url).success(function(response) {
                if (checkResponse($rootScope, $scope, response)) {
                    if (isEmpty($scope)) return;
                    var list = response.list;
                    if (isEmpty($scope[proName]) || !Array.isArray($scope[proName])) {
                        $scope[proName] = [];
                    }
                    list.forEach(function(item, index, array) {
                        $scope[proName].push(!isEmpty(rowhandler) && typeof(rowhandler) == 'function' ? rowhandler(item) : item);
                    });

                    if (!isEmpty(handler) && typeof(handler) == 'function') {
                        handler(response);
                    }




                }
            }).error(function(response, status, headers, config) {
                checkResponse($rootScope, $scope, response);
                //TODO:LOG ERROR
            });
        }
        /**
        函数名：loadEntity
        参数：
            $scope：Controller函数
            proName：$scope中属性名等价于$scope.messages,$scope.rows
            handler:是否需要对每条数据进行格式转换和处理
        说明：从服务器取出对象放在$scope中

        **/
    service.loadEntity = function(url, $scope, proName, handler) {
        $rootScope.loading = true;
        $http.get(url).success(function(response) {

            if (checkResponse($rootScope, $scope, response)) {
                if (isEmpty($scope)) return;
                var entity = response.entity;
                $scope[proName] = entity;

                if (!isEmpty(handler) && typeof(handler) == 'function') {
                    handler(response);
                }

            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
            //TODO:LOG ERROR
        });
    }

    /**
    函数名：loadMore
    参数：
        $scope：Controller函数
        serviceName:该集合对应的服务名
        proName：$scope中属性名等价于$scope.messages,$scope.rows
        pageSize：每页呈现的数据，如不传默认为Config.PAGE_SIZE
        rowHandler:是否需要对每条数据进行格式转换和处理
        handler:对整个结果集处理
    说明：翻页页面使用从服务器取出集合数据放在$scope中对应的属性中

    **/
    service.loadMore = function($scope, serviceName, proName, pageSize, rowHandler, handler) {
        if ($scope.currentPage < $scope.totalPageCount) {
            $scope.currentPage = $scope.currentPage + 1;
            var url = service.makeUrl(serviceName, $scope.currentPage, pageSize);

            service.loadEntities(url, $scope, proName, rowHandler, handler);
        }
    }

    /**
           函数名：initValue
           参数：
               $scope：Controller函数
           说明：确保当前控制器得到正确的初始化(如清除上次执行消息，当前页面得到正确设置)

           **/
    service.initValue = function($scope, handler) {
        setDefaultValue($scope);
        if (handler && typeof(handler) == 'function') {
            handler();
        }
    }

    /**
    函数名：clone
    参数：
        url:
    说明：对象的深克隆    
    **/
    service.clone = function clone(o) {
        var k, ret = o,
            b;
        if (o && ((b = (o instanceof Array)) || o instanceof Object)) {
            ret = b ? [] : {};
            for (k in o) {
                if (o.hasOwnProperty(k)) {
                    ret[k] = clone(o[k]);
                }
            }
        }
        return ret;
    }

    /**
     函数名：execAction
     参数：
         url:
     说明：执行一个简单的请求，然后执行回调函数
     注意：请求返回的内容始终在是第一个参数

     **/
    service.execAction = function($scope, url, handler, args) {
        $rootScope.loading = true;
        $http.get(url).success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {
                //response 始终会在第一位
                if (!isEmpty(handler) && typeof(handler) == 'function') {
                    if (isEmpty(args)) {
                        handler(response);
                    } else if (!Array.isArray(args)) {
                        handler(response, args);
                    } else {
                        args.unshift(response);
                        handler(args);
                    }
                }
            }
        }).error(function(response, status, headers, config) {
            checkResponse($rootScope, $scope, response);
            //TODO:LOG ERROR
        });
    }

    service.postAction = function($scope, url, handler, args) {

        $rootScope.loading = true;
        $http.post(url, args).success(function(data, status) {

            if (checkResponse($rootScope, $scope, data)) {
                if (handler && typeof(handler) == 'function') {
                    handler(data, status);
                }
            }
        }).error(function(data, status) {
            checkResponse($rootScope, $scope, data);
        });
    }
    return service;

}]);







