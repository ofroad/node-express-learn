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


//Model.update()更新一条或多条记录
/*
User.update({username:"a2"},{username:"a2111"},function(err,raw){
	if(err){
		console.log(err);
	}else{
		console.log(typeof raw);
		//{ n: 1, nModified: 1, ok: 1 }
		console.log(raw);
	}
});
*/


//Model.update()更新一条或多条记录,设置multi:true更新多条记录
/*
User.update({username:"a8"},{username:"a8111"},{multi:true},function(err,raw){
	if(err){
		console.log(err);
	}else{
		console.log(typeof raw);
		//{ n: 2, nModified: 2, ok: 1 }
		console.log(raw);
	}
});
*/


//Model.updateMany()更新多条记录
User.updateMany({username:"a9"},{username:"a943"},{multi:true},function(err,raw){
	if(err){
		console.log(err);
	}else{
		console.log(typeof raw);
		//{ n: 2, nModified: 2, ok: 1 }
		console.log(raw);
	}
});



console.log("========form add.js========");


module.exports = router;
