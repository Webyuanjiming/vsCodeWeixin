
function isCardID(idcard) {
    var Errors = new Array(
    "验证通过!",
    "身份证号码位数不对!",
    "身份证号码出生日期超出范围或含有非法字符!",
    "身份证号码校验错误!",
    "身份证地区非法!"
    );
    if (isEmpty(idcard)) {
        return "请输入身份证号";
    }
    var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }

    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    //地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null) {
        //alert(Errors[4]);
        return Errors[4];
    }
    //身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
            }
            if (ereg.test(idcard)) return "";
            else {
                //alert(Errors[2]);
                return Errors[2];
            }
            break;
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {//测试出生日期的合法性
                //计算校验位
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
				+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
				+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
				+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
				+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
				+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
				+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
				+ parseInt(idcard_array[7]) * 1
				+ parseInt(idcard_array[8]) * 6
				+ parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1);//判断校验位
                if (M == idcard_array[17]) return ""; //检测ID的校验位
                else {
                    //alert(Errors[3]);
                    //return false;
                    return Errors[3];
                }
            }
            else {
                //alert(Errors[2]);
                //return false;
                return Errors[2];
            }
            break;
        default:
            return "请检查输入身份证号是否有误";
            break;
    }
    return "";
}



function check_surname(str) {
    var str = str.substr(0, 1); //截取用户提交的用户名的前两字节，也就是姓。
    var surname = " 赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅付洒卜凡郅芦康皮卞齐伍余元顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁锺徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄麴家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭历戎祖武符刘景詹束龙叶幸司韶郜黎蓟溥印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阳郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍却璩桑桂濮牛寿通边扈燕冀僪浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逮盍益桓公万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容司徒司空召有舜叶赫那拉丛岳寸贰皇侨彤竭端赫实甫集象翠狂辟典良函芒苦其京中夕之章佳那拉冠宾香果依尔根觉罗依尔觉罗萨嘛喇赫舍里额尔德特萨克达钮祜禄他塔喇喜塔腊讷殷富察叶赫那兰库雅喇瓜尔佳舒穆禄爱新觉罗索绰络纳喇乌雅范姜碧鲁张廖张简图门太史公叔乌孙完颜马佳佟佳富察费莫蹇称诺来多繁戊朴回毓税荤靖绪愈硕牢买但巧枚撒泰秘亥绍以壬森斋释奕姒朋求羽用占真穰翦闾漆贵代贯旁崇栋告休褒谏锐皋闳在歧禾示是委钊频嬴呼大威昂律冒保系抄定化莱校么抗祢綦悟宏功庚务敏捷拱兆丑丙畅苟随类卯俟友答乙允甲留尾佼玄乘裔延植环矫赛昔侍度旷遇偶前由咎塞敛受泷袭衅叔圣御夫仆镇藩邸府掌首员焉戏可智尔凭悉进笃厚仁业肇资合仍九衷哀刑俎仵圭夷徭蛮汗孛乾帖罕洛淦洋邶郸郯邗邛剑虢隋蒿茆菅苌树桐锁钟机盘铎斛玉线针箕庹绳磨蒉瓮弭刀疏牵浑恽势世仝同蚁止戢睢冼种涂肖己泣潜卷脱谬蹉赧浮顿说次错念夙斯完丹表聊源姓吾寻展出不户闭才无书学愚本性雪霜烟寒少字桥板斐独千诗嘉扬善揭祈析赤紫青柔刚奇拜佛陀弥阿素长僧隐仙隽宇祭酒淡塔琦闪始星南天接波碧速禚腾潮镜似澄潭謇纵渠奈风春濯沐茂英兰檀藤枝检生折登驹骑貊虎肥鹿雀野禽飞节宜鲜粟栗豆帛官布衣藏宝钞银门盈庆喜及普建营巨望希道载声漫犁力贸勤革改兴亓睦修信闽北守坚勇汉练尉士旅五令将旗军行奉敬恭仪母堂丘义礼慈孝理伦卿问永辉位让尧依犹介承市所苑杞剧第零谌招续达忻六鄞战迟候宛励粘萨邝覃辜初楼城区局台原考妫纳泉老清德卑过麦曲竹百福言第五佟爱年笪谯哈墨南宫赏伯佴佘牟商西门东门左丘梁丘琴后况亢缑帅微生羊舌海归呼延南门东郭百里钦鄢汝法闫楚晋谷梁宰父夹谷拓跋壤驷乐正漆雕公西巫马端木颛孙子车督仉司寇亓官鲜于锺离盖逯库郏逢阴薄厉稽闾丘公良段干开光操瑞眭泥运摩伟铁迮";
    r = surname.search(str);             // 查找字符串。
    if (r == -1)
        return false
    else
        return true
}
function isValiName(theform) {
    if (isEmpty(theform)) {
        return "请输入用户名";
    }
    if (theform != "") {
        if (theform.length == 1) {
            //alert("真实姓名必须是一个字以上！");
            return "真实姓名必须是一个字以上！";
        }
        if (theform.length > 10) {
            //alert("真实姓名必须是四十个汉字以内！");
            return "真实姓名必须是十个汉字以内！";
        }
        var nnname = theform;
        var reg = /^([\u4E00-\u9FA5])*$/;
        if (arr = nnname.match(reg)) {
            if (!check_surname(nnname)) {
                //alert("真实姓名必须符合中国姓氏规则，请重新输入真实姓名！");
                //return false;
                return "真实姓名必须符合中国姓氏规则，请重新输入真实姓名！";
            }
        }
        else {
            //alert("真实姓名必须全部为中文");
            //return false;
            return "真实姓名必须全部为中文";
        }
    }
    return "";
}
 
//undefined 
function isEmpty(obj) {
    if (typeof (obj) == "undefined" || obj == null) {
        return true;
    }
    return false;
}

function setDefaultValue($scope, $rootScope) {

    $scope.userAgent = navigator.userAgent;
    $scope.msg = "";

    $scope.currentPage = $scope.pi;//当前页
    if (isEmpty($scope.currentPage)) {
        $scope.currentPage = 1;
    }
}


function convertToFloat(data) {
    if (!isEmpty(data) && !isNaN(data)) {
        return parseFloat(data);
    }
    return 0;
}


//格式化数字
function formatData(num, precision)
{
    if (isEmpty(num)) return "";
    if (isNan(num)) return "";

    if (isNan(precision)) return "";
    if (isEmpty(precision)) { precision = 2; }


    return convertToFloat(num).toFixed(precision);
}



/*请求是否正常结束,并设置异常状态*/
function checkResponse($rootScope, $scope, response) {

    if (isEmpty(response)) {
        return false;
    }
    $rootScope.loading = false;

    if (!response.status || typeof (response) != 'object') {
        if (response.msg == "请登录") {
            window.location.href = "http://m.jujinziben.com/m/jujin/#/login";//直接登录页面
            return;
        }
        if (response.msg == "NOATTESTIDENTITY")//未实名认证
        {
            window.location.href = $rootScope.ROOT + "#/attest/";//实名认证
            return;
        }
        $rootScope.Ui.turnOn('showinfo');
        $scope.msg = response.msg;
        $scope.title = "提示";
        return false;
    }
    else {
        //设置总页数
        if (typeof (response.pageCount) != "undefined" && response.pageCount != null) {
            $scope.totalPageCount = response.pageCount;
        }
        else {
            $scope.totalPageCount = 0;
        }
    }
    return true;
}

function checkIsMobile(mobile) {

    if (isEmpty(mobile) || !(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(mobile))) {
        return false;
    }
    return true;
}

function checkIsEmail(email) {
    //if (isEmpty(email) || !(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email))) {
    if ((isEmpty(email) || !(/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9-]+[\.a-zA-Z]+$/).test(email))) {

        return false;
    }
    return true;
}

function preMultiExec($scope)
{
    if (isEmpty($scope.preExecTime)) {
        $scope.preExecTime = new Date();
        return true;
    }
    else {
        if ((new Date) - $scope.preExecTime < 5000)//5秒以内
        {
            return false;
        }
    }
    return true;
}



function Share($scope, $rootScope, $http) {

    var userUrl = $rootScope.ROOT;
    var shareUrl = $rootScope.ROOT;
    if (isEmpty($scope.entity)) {
        return;
    }
    if (!isEmpty($scope.phone)) {
        shareUrl = $rootScope.ROOT + '/#/register?invite=' + $scope.phone;
    }


    wx.config({
        debug: false,
        appId: "wx30235c7115ff82d5",
        timestamp: $scope.entity.timestamp,
        nonceStr: $scope.entity.noncestr,
        signature: $scope.entity.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
    });

    var shareSuccessNotifyUrl = "";
    if (!isEmpty($scope.userId)) {
        shareSuccessNotifyUrl = $rootScope.URL_ROOT + "/sharesuccess?userId=" + $scope.userId;
    }

    wx.ready(function () {
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: '来，聚金吧', // 分享标题
            desc: '聚金资本，普惠金融首席运营商', // 分享描述
            link: shareUrl,
            imgUrl: $rootScope.SERVER + '/m/img/account/icon/account.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function (res) {
                if (!isEmpty(userId)) {
                    $http.get(shareSuccessNotifyUrl);
                }
            },
        });
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: '来，聚金吧', // 分享标题
            link: $rootScope.SERVER + '/m/jujin',
            imgUrl: $rootScope.SERVER + '/m/img/account/icon/account.png', // 分享图标
            success: function (res) {
                if (!isEmpty(userId)) {
                    $http.get(shareSuccessNotifyUrl);
                }
            },
        });
    });

}


function getBorrowByType(borrow) {
    if (isEmpty(borrow)) {
        return "/m/images/diya.png";
    }
    else if (isEmpty(borrow) && borrow.isNew == 1) {
        return "/m/images/new.png";
    }
    return "/m/images/diya.png";
}


















