//定义全局变量
var JJGlobal = {
	"channel_traffic_report": {
		"reportTitle":"渠道流量统计报表",
		"columns":["CHANNEL","INSDATE","MOBILE","TENDACCOUNT","REALNAME","USERID"],
		"columnInfos": {
			"CHANNEL": {
				"title": "渠道",
				"sortable": true,
				"rowMerge": true
			},
			"INSDATE": {
				"title": "注册时间",
				"sortable": true,
				"rowMerge": false
			},
			"MOBILE": {
				"title": "手机号",
				"sortable": false,
				"rowMerge": false
			},
			"REALNAME": {
				"title": "真实姓名",
				"sortable": false,
				"rowMerge": false
			},
			"TENDACCOUNT": {
				"title": "总投资金额",
				"sortable": false,
				"rowMerge": false
			},
			"USERID": {
				"title": "用户名",
				"sortable": false,
				"rowMerge": false
			}
		},
		"mapper":'com.jujin.channel.mapper.queryChannelTrafficData',
		"conditions": [
			{
				"label": "用户名",
				"type": "input",
				"id": "userId",
				"value":""
			},{
				"label": "手机号",
				"type": "input",
				"id": "mobile",
				"value":""
			},{
				"label":"开始时间",
				"type":"datepicker",
				"id":"startDate",
				"value":""
			},{
				"label":"结束时间",
				"type":"datepicker",
				"id":"endDate",
				"value":""
			},{
				"label":"渠道",
				"type":"select",
				"id":"channel",
				"value":"",
				"options":[
					{
						id:"BSY",
						name:"比搜益"
					},{
						id:"WDTY",
						name:"网贷天眼"
					},{
						id:"RRL",
						name:"人人利"
					},{
						id:"WDZTC",
						name:"网贷直通车"
					},{
						id:"RRT",
						name:"人人投"
					},{
						id:"YMTS",
						name:"玉米投手"
					},{
						id:"xglc",
						name:"西瓜理财"
					}
				]
			}
		],
		"buttons":[{
			"type":"query",
			"text":"查询"
		},{
			"type":"export",
			"text":"导出"
		}]
	},
	"user": {
		"reportTitle":"注册用户统计报表",
		"columns":["CHANNEL","MOBILE","TENDACCOUNT","INSDATE","REALNAME","USERID"],
		"columnInfos": {
			"CHANNEL": {
				"title": "渠道",
				"sortable": true,
				"rowMerge": false
			},
			"INSDATE": {
				"title": "注册时间",
				"sortable": true,
				"rowMerge": false
			},
			"MOBILE": {
				"title": "手机号",
				"sortable": false,
				"rowMerge": false
			},
			"REALNAME": {
				"title": "真实姓名",
				"sortable": false,
				"rowMerge": false
			},
			"TENDACCOUNT": {
				"title": "总投资金额",
				"sortable": false,
				"rowMerge": false
			},
			"USERID": {
				"title": "用户名",
				"sortable": false,
				"rowMerge": false
			}
		},
		"mapper":"com.jujin.channel.mapper.queryChannelTrafficData",
		"conditions": [
			{
				"label": "用户名",
				"type": "input",
				"id": "userId",
				"value":""
			},{
				"label": "手机号",
				"type": "input",
				"id": "mobile",
				"value":""
			},{
				"label":"开始时间",
				"type":"datepicker",
				"id":"startDate",
				"value":""
			},{
				"label":"结束时间",
				"type":"datepicker",
				"id":"endDate",
				"value":""
			},{
				"label":"渠道",
				"type":"select",
				"id":"channel",
				"value":"",
				"options":[
					{
						id:"BSY",
						name:"比搜益"
					},{
						id:"WDTY",
						name:"网贷天眼"
					},{
						id:"RRL",
						name:"人人利"
					},{
						id:"WDZTC",
						name:"网贷直通车"
					},{
						id:"RRT",
						name:"人人投"
					},{
						id:"YMTS",
						name:"玉米投手"
					},{
						id:"xglc",
						name:"西瓜理财"
					}
				]
			}
		],
		"buttons":[{
			"type":"query",
			"text":"查询"
		},{
			"type":"export",
			"text":"导出"
		}]
	}
}