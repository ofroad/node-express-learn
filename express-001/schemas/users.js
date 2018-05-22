var mongoose = require('mongoose');

// 用户的表结构
module.exports =mongoose.Schema({
    // 用户名
    username:String,
    // 密码
    password:String,
	// 邮箱
    email:String,
	// 手机
    mobile:String

})