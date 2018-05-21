var express = require('express');
var router = express.Router();
var URL = require('url');
var userapi = require('./userapi');

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

module.exports = router;
