var mongoose = require('mongoose');

// 用户的表结构
module.exports =new mongoose.Schema({
    // 用户名
    username:String,
    // 密码
    password:String,
	// 邮箱
    email:String,
	// 年龄
    age:Number,
	// 姓名
    truename:String,
	// 性别
    sex:{type:String, default : '男'},
	// 手机
    mobile:{type:String, default : '13811110000'},
	// 工龄
    workage:{type:Number, default : 2},
	// 职业
    job:{type:String, default : "学生"},
	// 子女数量
    childnumb:{type:Number, default : 1},
	// 房产数量
    housenumb:{type:Number, default : 2}

},{
	collection:"userstable"
})