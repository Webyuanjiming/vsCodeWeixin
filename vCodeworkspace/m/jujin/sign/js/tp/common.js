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
        RETURN: "" //��¼����ת��ҳ��
    };
    /**
    ��������makeUrl
    ������
        serviceName��������(����get�Ĳ���������������������ֱ�ۣ�����һ�𣬾���ô����!^_^)
        pi�������ҳ��
        ps����ǰҳ��
    ˵�����ӷ�����ȡ���������ݷ���$scope�ж�Ӧ��������

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
        ��������loadEntities
        ������
            $scope��Controller����
            proName��$scope���������ȼ���$scope.messages,$scope.rows
            rowhandler:�Ƿ���Ҫ��ÿ�����ݽ��и�ʽת���ʹ���
            handler:�Խ����ת������
        ˵�����ӷ�����ȡ���������ݷ���$scope�ж�Ӧ��������

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
        ��������loadEntity
        ������
            $scope��Controller����
            proName��$scope���������ȼ���$scope.messages,$scope.rows
            handler:�Ƿ���Ҫ��ÿ�����ݽ��и�ʽת���ʹ���
        ˵�����ӷ�����ȡ���������$scope��

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
    ��������loadMore
    ������
        $scope��Controller����
        serviceName:�ü��϶�Ӧ�ķ�����
        proName��$scope���������ȼ���$scope.messages,$scope.rows
        pageSize��ÿҳ���ֵ����ݣ��粻��Ĭ��ΪConfig.PAGE_SIZE
        rowHandler:�Ƿ���Ҫ��ÿ�����ݽ��и�ʽת���ʹ���
        handler:���������������
    ˵������ҳҳ��ʹ�ôӷ�����ȡ���������ݷ���$scope�ж�Ӧ��������

    **/
    service.loadMore = function($scope, serviceName, proName, pageSize, rowHandler, handler) {
        if ($scope.currentPage < $scope.totalPageCount) {
            $scope.currentPage = $scope.currentPage + 1;
            var url = service.makeUrl(serviceName, $scope.currentPage, pageSize);

            service.loadEntities(url, $scope, proName, rowHandler, handler);
        }
    }

    /**
           ��������initValue
           ������
               $scope��Controller����
           ˵����ȷ����ǰ�������õ���ȷ�ĳ�ʼ��(������ϴ�ִ����Ϣ����ǰҳ��õ���ȷ����)

           **/
    service.initValue = function($scope, handler) {
        setDefaultValue($scope);
        if (handler && typeof(handler) == 'function') {
            handler();
        }
    }

    /**
    ��������clone
    ������
        url:
    ˵������������¡    
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
     ��������execAction
     ������
         url:
     ˵����ִ��һ���򵥵�����Ȼ��ִ�лص�����
     ע�⣺���󷵻ص�����ʼ�����ǵ�һ������

     **/
    service.execAction = function($scope, url, handler, args) {
        $rootScope.loading = true;
        $http.get(url).success(function(response) {
            if (checkResponse($rootScope, $scope, response)) {
                //response ʼ�ջ��ڵ�һλ
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







