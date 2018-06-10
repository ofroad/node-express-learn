var express = require('express');
var router = express.Router();
var URL = require('url');
var userapi = require('./userapi');

// 引入model模块，定义一个对象，通过操作对象的方式去操作数据库
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = require('../Models/User');
var Article = require('../Models/article');
var dashboardLog = require('../Models/dashboardlog');
console.log(mongoose);

//设置cors
router.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
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


// 查询所有用户
router.get('/user/pushlog',function (req, res, next) {
    // console.log(req.body);
	console.log(req);
	
	var log = new dashboardLog({
            time: req.query.time,
            api: req.query.api,
			method: req.query.method,
			params: req.query.params,
			project: req.query.project,
			project_language: req.query.project_language,
			response: req.query.response
        });
	
	log.save().then(function(doc){
		console.log(doc)
	}).catch(function(err){
		console.log(err)
	});
	responseData.code = 4;
	responseData.message = '日志提交成功';
	res.json(responseData);
	return;
});





module.exports = router;
