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

/* GET users listing. */
/*
router.get('/getUserInfo', function(req, res, next) {
    var user = new userapi();
    var params = URL.parse(req.url, true).query;
	console.log(typeof req.query);
	console.log("req.hostname==",req.hostname);
	console.log("req.ip==",req.ip);
	console.log("req.originalUrl==",req.originalUrl);
  console.log(params)
  
  //参数判断
  if(!('id' in req.query)){
	  res.status(400);
	  res.json({ error: "Bad request. 参数错误" });
	  return;
  }
 if(params.id == '1') {

    user.name = "ligh";
    user.age = "1";
    user.city = "北京市";

}else if(params.id == '2'){  
    user.name = "SPTING";
    user.age = "1";
    user.city = "杭州市";
}

  var response = {status:1,data:user};
  //res.send也可以
  //res.send(JSON.stringify(response));
   res.json(response);

});
*/
// 统一返回格式
var responseData;

router.use( function (req,res,next) {
    responseData = {
        code: 0,
        message:''
    };
    next();
});


// 用户注册
router.post('/user/register',function (req,res) {
    // console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var mobilephone = req.body.mobile;
    var email = req.body.email;
	var age = req.body.age;
	var sex = req.body.sex;
	var name = req.body.truename;
	var workage = req.body.workage;
	var job = req.body.job;
	var childnumb = req.body.childnumb;
	var housenumb = req.body.housenumb;
	
    // 判断用户名是否为空
    if( username == ''){
        responseData.code = 2;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    // 判断密码是否为空
    if( password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 判断两次密码是否一致
    if( password != repassword){
        responseData.code = 2;
        responseData.message = '两次输入密码不一致';
        res.json(responseData);
        return;
    }
	// 判断邮箱是否为空
    if( email == ''){
        responseData.code = 2;
        responseData.message = '邮箱不能为空';
        res.json(responseData);
        return;
    }
	// 判断年龄是否为空
    if( age == ''){
        responseData.code = 2;
        responseData.message = '年龄不能为空';
        res.json(responseData);
        return;
    }
	// 判断姓名是否为空
    if( name == ''){
        responseData.code = 2;
        responseData.message = '姓名不能为空';
        res.json(responseData);
        return;
    }
    // 判断用户名是否已经注册
	//User是Model，Model有方法findOne
    User.findOne({
        username:username
    },function (err,doc) {
        if(doc){
			console.log(doc)
            responseData.code = 3;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        // 保存用户注册的信息到数据中
        var user = new User({
            username: username,
            password: password,
			email:email,
			age:age,
			truename:name
        });
		if(mobilephone.length){
			user.mobile=mobilephone;
		}
		if(sex.length){
			user.sex=sex;
		}
		if(workage.length){
			user.workage=workage;
		}
		if(job.length){
			user.job=job;
		}
		if(childnumb.length){
			user.childnumb=childnumb;
		}
		if(housenumb.length){
			user.housenumb=housenumb;
		}
		
		
		
		
		console.log(user);
		console.log(user.mobile);
		console.log(user.id);
		console.log(user._id);
		//user是User(Model)的实例，即document,document有方法save
        user.save();
        responseData.code = 4;
        responseData.message = '注册成功';
        res.json(responseData);
        return;
    });


});

router.post('/user/submitArticle',function (req,res) {
    // console.log(req.body);
    var title = req.body.title;
    var con= req.body.content;
	
    // 判断用户名是否为空
    if( title == ''){
        responseData.code = 2;
        responseData.message = '标题不能为空';
        res.json(responseData);
        return;
    }
    // 判断密码是否为空
    if( con == ''){
        responseData.code = 2;
        responseData.message = '内容不能为空';
        res.json(responseData);
        return;
    }
    
    // 保存
	//User是Model，Model有方法findOne
    // 保存用户文章的信息到数据中
	var article = new Article({
		title: title,
		content: con
	});
	
	article.save();
	responseData.code = 4;
	responseData.message = '文章发布成功';
	res.json(responseData);


});

// 用户登录
router.post('/user/login',function (req,res) {
    // console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    if(password == ''|| username==''){
        responseData.code = 2;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return
    }
    // 判断用户名是否已经注册
    User.findOne({
        username:username,
        password:password
    },function (err,doc) {
        if(doc){
            responseData.code = 4;
            responseData.message = '登录成功';
            responseData.userInfo = {
                _id: doc._id,
                username: doc.username
            };
            req.cookies.set('userInfo',JSON.stringify({
                _id: doc._id,
                username: doc.username
            }));
            res.json(responseData);
            return
        }
        responseData.code = 2;
        responseData.message = '用户名和密码不存在';
        res.json(responseData);
        return
    });
});

//find查询--01
/*
var find_01=User.find({workage:2},function(err,doc){
	if(err){
		console.log("err===",err);
	}else{
		console.log("typeof doc===",typeof doc)
		console.log("doc===",doc);
		console.log("doc===",doc[0]);
		console.log("doc username===",doc[0].username);
		console.log("doc password===",doc[0].password);
		console.log("doc email===",doc[0].email);
		console.log("doc mobile===",doc[0].mobile);
		console.log("doc id===",doc[0].id);
		console.log("doc _id===",doc[0]._id);
		console.log("doc $init===",doc[0].$init);
		console.log("doc job===",doc[0].job);
		console.log("doc truename===",doc[0].truename);
		console.log("doc housenumb===",doc[0].housenumb);
		console.log("doc workage===",doc[0].workage);
		console.log("doc typeof workage===",typeof doc[0].workage);
		console.log("doc _doc===",doc[0]._doc);
	}
});
console.log(find_01);

//find查询--02
var find_02=User.find({sex:"女",age:{ $gte:40}},function(err,doc){
	if(err){
		console.log("err===",err);
	}else{
		console.log("typeof doc===",typeof doc)
		console.log("doc===",doc);
		console.log("doc===",doc[0]);
		console.log("doc username===",doc[0].username);
		console.log("doc password===",doc[0].password);
		console.log("doc email===",doc[0].email);
		console.log("doc mobile===",doc[0].mobile);
		console.log("doc id===",doc[0].id);
		console.log("doc _id===",doc[0]._id);
		console.log("doc $init===",doc[0].$init);
		console.log("doc job===",doc[0].job);
		console.log("doc truename===",doc[0].truename);
		console.log("doc housenumb===",doc[0].housenumb);
		console.log("doc workage===",doc[0].workage);
		console.log("doc typeof workage===",typeof doc[0].workage);
		console.log("doc _doc===",doc[0]._doc);
	}
});
console.log(find_02);

//find查询--03(过滤字段)--想返回哪些字段，需要让他的值为true,如果设为false,会报错，如下
var find_03=User.find({sex:"女"},{truename:-1,mobile:-1,job:1,email:2,housenumb:true},function(err,doc){
	if(err){
		console.log("err===",err);
	}else{
		console.log("typeof doc===",typeof doc)
		console.log("doc===",doc);
		console.log("doc===",doc[0]);
		console.log("doc username===",doc[0].username);
		console.log("doc password===",doc[0].password);
		console.log("doc email===",doc[0].email);
		console.log("doc mobile===",doc[0].mobile);
		console.log("doc id===",doc[0].id);
		console.log("doc _id===",doc[0]._id);
		console.log("doc $init===",doc[0].$init);
		console.log("doc job===",doc[0].job);
		console.log("doc truename===",doc[0].truename);
		console.log("doc housenumb===",doc[0].housenumb);
		console.log("doc workage===",doc[0].workage);
		console.log("doc typeof workage===",typeof doc[0].workage);
		console.log("doc _doc===",doc[0]._doc);
	}
});
console.log(find_03);

//find查询--04(限制查询结果返回的数量)--
var find_04=User.find({sex:"女"},null,{limit:2},function(err,doc){
	if(err){
		console.log("err===",err);
	}else{
		console.log("typeof doc===",typeof doc)
		console.log("doc===",doc);
		console.log("doc===",doc[0]);
		console.log("doc username===",doc[0].username);
		console.log("doc password===",doc[0].password);
		console.log("doc email===",doc[0].email);
		console.log("doc mobile===",doc[0].mobile);
		console.log("doc id===",doc[0].id);
		console.log("doc _id===",doc[0]._id);
		console.log("doc $init===",doc[0].$init);
		console.log("doc job===",doc[0].job);
		console.log("doc truename===",doc[0].truename);
		console.log("doc housenumb===",doc[0].housenumb);
		console.log("doc workage===",doc[0].workage);
		console.log("doc typeof workage===",typeof doc[0].workage);
		console.log("doc _doc===",doc[0]._doc);
	}
});
console.log(find_04);
*/
//find查询--05(返回的查询结果跳过前n个，即返回的查询的结果不包含前n个)--
var find_05=User.find({sex:"女",age:{ $gte:30}},null,{skip:1},function(err,doc){
	if(err){
		console.log("err===",err);
	}else{
		console.log("typeof doc===",typeof doc)
		console.log("doc===",doc);
		console.log("doc===",doc[0]);
		console.log("doc username===",doc[0].username);
		console.log("doc password===",doc[0].password);
		console.log("doc email===",doc[0].email);
		console.log("doc mobile===",doc[0].mobile);
		console.log("doc id===",doc[0].id);
		console.log("doc _id===",doc[0]._id);
		console.log("doc $init===",doc[0].$init);
		console.log("doc job===",doc[0].job);
		console.log("doc truename===",doc[0].truename);
		console.log("doc housenumb===",doc[0].housenumb);
		console.log("doc workage===",doc[0].workage);
		console.log("doc typeof workage===",typeof doc[0].workage);
		console.log("doc _doc===",doc[0]._doc);
	}
});
console.log(find_05);


//find查询--06(返回结果排序，-1表示降序，1表示升序)
var find_06=User.find({sex:"女"},null,{sort:{age:1}},function(err,doc){
	if(err){
		console.log("err===",err);
	}else{
		console.log("typeof doc===",typeof doc)
		console.log("doc===",doc);
		console.log("doc===",doc[0]);
		console.log("doc username===",doc[0].username);
		console.log("doc password===",doc[0].password);
		console.log("doc email===",doc[0].email);
		console.log("doc mobile===",doc[0].mobile);
		console.log("doc id===",doc[0].id);
		console.log("doc _id===",doc[0]._id);
		console.log("doc $init===",doc[0].$init);
		console.log("doc job===",doc[0].job);
		console.log("doc truename===",doc[0].truename);
		console.log("doc housenumb===",doc[0].housenumb);
		console.log("doc workage===",doc[0].workage);
		console.log("doc typeof workage===",typeof doc[0].workage);
		console.log("doc _doc===",doc[0]._doc);
	}
});
console.log(find_06);


module.exports = router;
