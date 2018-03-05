/**
 * 乙方, 回调JSON数据响应格式举例说明【类型不能错误, 否则校验不过】：
 * {
 * 	 "pcode" : "BSY-BIZ-10001", // 甲方分配乙方平台编码【字符串类型】
 *   "token" : "jkyls86kh23dl2h32llj3hk23h", // 授权指令【字符串类型】
 *   "stime" : 192382087827322, // 授权开始时间,【长整型】
 *   "etime" : 192382089212345, // 授权截止时间,【长整型】(etime - stime) = 0表示永久授权, <0表示失效, >0表示剩余过期时间
 *   "status" : 1 // 授权状态,【整型】0表示失败, 1表示成功
 * }
 * 授权回调函数：BSY.Oauth({'pcode':'甲方分配乙方平台编码','token':'授权指令','stime':19238208782732,'etime':192382089212345,'status':1});
 */
BSY={Review:function(b){var a=0,e="";for(var d in b){var c=b[d];if(d==="pcode"||d==="token"){if(typeof c==="string"){e+="'"+d+"':'"+c+"',";(++a)}continue}if(d==="stime"||d==="etime"){if(typeof c==="number"){e+="'"+d+"':"+c+",";(++a)}continue}if(d==="status"){if(c===0||c===1){e+="'"+d+"':"+c+",";(++a)}continue}}if(a===5){return"{"+e.substring(0,e.length-1)+"}"}else{return"Invalid"}},Format:function(d,a){var b=d==null?"{'pcode':'','token':'','stime':-1,'etime':-1,'status':0}":d;if(a==="ios"){return b.replace(/\"/g,"\'")}else{if(a==="android"){return b.replace(/\'/g,'\"')}else{throw new Error("Format")}}},Oauth:function(f){try{var a=BSYAPP.jsVersion();if(typeof f==="undefined"||f==null){if(a==="ios"){BSYAPP.jsCallackFailure(BSY.Format(null,a));return}else{if(a==="android"){BSYAPP.jsCallackFailure(BSY.Format(null,a));return}else{throw new Error("Version")}}}var c=null;if(typeof f==="object"){c=BSY.Review(f)}else{if(typeof f==="string"){c=BSY.Review((new Function("","return "+BSY.Format(f,a))))}else{throw new Error("Data")}}if(c==null||c==="Invalid"){BSYAPP.jsCallackFailure(BSY.Format(null,a))}else{BSYAPP.jsCallackSuccess(BSY.Format(c,a))}}catch(b){BSYAPP.jsCallackException(b.message)}}};