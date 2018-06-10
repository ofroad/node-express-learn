var mongoose = require('mongoose');

// 用户的表结构
module.exports =new mongoose.Schema({
    // 时间
    time:{type:String, default : ''},
    // 接口名和地址
    api:{type:String, default : ''},
	// 接口方法
    method:{type:String, default : ''},
	// 接口参数
    params:{type:String, default : ''},
	// 项目版本(pad,xinghui,chengdu)
    project:{type:String, default : ''},
	// 项目语言(cn,en)
    project_language:{type:String, default : ''},
	// 接口响应
	response:{type:String, default : ''}

},{
	collection:"dashboardlog"
})