var express = require('express');
var router = express.Router();
var URL = require('url');
var userapi = require('./userapi');

// 引入model模块，定义一个对象，通过操作对象的方式去操作数据库
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = require('../Models/User');
var Article = require('../Models/article');
//console.log(mongoose);

//设置cors
router.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
	res.header("Cache-Control", "no-store");
    next();
});


// 统一返回格式
var responseData;

router.use( function (req,res,next) {
    responseData = {
        code: 0,
        message:''
    };
    next();
});

//新增记录--doc.save()
/*
var user_01=new User({
		username:"a1",
		password:"63456hy",
		email:"twer@adf.com",
		age:19
});
user_01.truename="牛大师傅";
user_01.save(function(err,doc){
	if(err){
		console.log(err);
	}else{
		console.log(doc);
	}
});
*/

//新增记录--doc.save()返回的是promise
/*
var user_02=new User({
		username:"a2",
		password:"63456hy2",
		email:"twer12@adf.com",
		age:23
});
user_02.truename="牛黄金";
user_02.save().then(function(doc){
	console.log(doc);
})
.catch(function(err){
	console.log(err);
});
*/

//Model.create()新增一条或多条记录
/*
User.create(
	{username:"a2",password:"63456hy2",email:"twer12@adf.com",age:23,truename:"打的费"},
	{username:"a3",password:"63456hy3",email:"fgtwer12@adf.com",age:25,truename:"读后感"},
	{username:"a4",password:"63456hy4",email:"twer12@cdf.com",age:29,truename:"军火库"},
	function(err,doc1,doc2,doc3){
		if(err){
			console.log(err);
		}else{
			console.log(doc1);
			console.log(doc2);
			console.log(doc3);
		}
	}
);
*/

//Model.create()新增一条或多条记录--传递数组
/*
var arr=[
	{username:"a5",password:"63456hy2",email:"5twer12@adf.com",age:33,truename:"根深蒂固"},
	{username:"a6",password:"63456hy3",email:"1fgtwer12@adf.com",age:45,truename:"似懂非懂"},
	{username:"a7",password:"63456hy4",email:"trwer12@cdf.com",age:59,truename:"公司的风格"}
];
User.create(arr,function(err,docs){
	if(err){
		console.log(err);
	}else{
		console.log(docs);
	}
});
*/

//Model.insertMany()新增一条或多条记录--传递数组
/*
var arr22=[
	{username:"a8",password:"63456hy2",email:"h5twer12@adf.com",age:63,truename:"借记卡"},
	{username:"a9",password:"63456hy3",email:"u1fgtwer12@adf.com",age:55,truename:"恩也会"},
	{username:"a10",password:"63456hy4",email:"7trwer12@cdf.com",age:79,truename:"也同样"}
];
User.insertMany(arr22,function(err,docs){
	if(err){
		console.log(err);
	}else{
		console.log(docs);
	}
});
*/



console.log("========form add.js========");


module.exports = router;
