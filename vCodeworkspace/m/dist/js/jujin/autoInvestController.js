
app.controller('AutoInvestController', ['$rootScope', '$scope', '$http', '$location',
    function ($rootScope, $scope, $http,$location) {


        
        //模型
        var array = [];
        var RATE_ARRAY = [10, 12, 17, 15, 18, 20, 24];
        var PERIOD_ARRAY = [10, 12, 17, 15, 18, 20, 24];
        var AMOUNT_ARRAY = [500, 600, 700, 800, 900, 2000];

        for (var i = 0; i < 10; i++) {
            var data = {
                "id":i,
                "enable": true, //是否启用
                "capital": 6000,//账户 余额 元
                "amount": 500,//投资金额 元
                "period": 3,//借款期限上限：单位月
                "award": 1,//是否奖励:1:奖励;0:不奖励
                "borrowType": 0,//下拉形式0：全部，7：聚金优选，2：抵押标
                "rate": 10//利率下限
            };


            var random = Math.random();

            var index = random * 10;
            index=index.toFixed(0);
            console.log(index);

            data.period = PERIOD_ARRAY[index > PERIOD_ARRAY.length ? PERIOD_ARRAY.length - 1 : index];
            data.amount = AMOUNT_ARRAY[index >AMOUNT_ARRAY.length ? AMOUNT_ARRAY.length - 1 : index];
            data.rate = RATE_ARRAY[index > RATE_ARRAY.length ? RATE_ARRAY.length - 1 : index];

            array.push(data);
        }
        //列表
        $scope.entities = array;


        var defaultSettings = {
            "enable": true, //是否启用
            "capital": 6000,//账户 余额 元
            "amount": 500,//投资金额 元
            "period": 3,//借款期限上限：单位月
            "award": 1,//是否奖励:1:奖励;0:不奖励
            "borrowType": 0,//下拉形式0：全部，7：聚金优选，2：抵押标
            "rate": 10//利率下限
        };
        //设置默认属性
        $scope.currentSetting = defaultSettings;

/*

        //列表栏目

        $scope.subs=[
            {
                "borrower_name":"借款人",
                "b_type":"标类型",
                "b_rate":"利率",
                "b_amount":"借出金额"
            }
        ];
*/


        var recordsArray = [];

        var USER_ARRAY = ["mi***ng", "xu***un", "li***mm", "li***ir", "wa***mm", "hn***mm"];
        var TITLE_ARRAY = ["【房产抵押】150630JZM", "【房产抵押】150703YYX", "【房产抵押】150721LSL"];
        for (var i = 0; i < 10; i++) {

            var data = {
                "id":i,
                "borrowUser": "xun***",
                "status": "复审通过",
                "title": "",
                "rate":0,
                "period": 3,
                "amount": 200
            };
            var random = Math.random();

            var index = random * 10;
            index=index.toFixed(0);
            data.period = PERIOD_ARRAY[index > PERIOD_ARRAY.length ? PERIOD_ARRAY.length - 1 : index];
            data.amount = AMOUNT_ARRAY[index > AMOUNT_ARRAY.length ? AMOUNT_ARRAY.length - 1 : index];
            data.rate = RATE_ARRAY[index > RATE_ARRAY.length ? RATE_ARRAY.length - 1 : index];
            data.borrowUser = USER_ARRAY[index > USER_ARRAY.length ? USER_ARRAY.length - 1 : index];
            data.title = TITLE_ARRAY[index > TITLE_ARRAY.length ? TITLE_ARRAY.length - 1 : index];


            recordsArray.push(data);
        }



        //自动投标记录
        $scope.records = recordsArray;//列表


        $scope.changeStatus=function(item)
        {
            console.log(item.id+"       "+item.enable);
        }



    }]);