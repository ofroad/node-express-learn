var express = require('express');
var router = express.Router();
var URL = require('url');
var userapi = require('./userapi');

// 引入model模块，定义一个对象，通过操作对象的方式去操作数据库
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = require('../Models/User');
var Article = require('../Models/article');
console.log(mongoose);

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
        message:'',
		data:[]
    };
    next();
});


// 查询所有用户
router.post('/user/getall',function (req,res) {
    // console.log(req.body);

	//User是Model，Model有方法find,不返回email和__v字段
	User.find({},"-__v -email",function(err,docs){
		if(err){
			console.log(err)
		}else{
			console.log(docs)
			responseData.code = 4;
			responseData.message = '查询成功';
			responseData.data=docs;
			res.json(responseData);
			return;
		}
	});
});





module.exports = router;
