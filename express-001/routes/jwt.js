var jwt = require('jsonwebtoken');

console.log("jwt===",jwt);
var token=jwt.sign(
	{data: 'foobar'},
	'secret',
	{ expiresIn: 6 }//6秒后过期
);

var token2=jwt.sign(
	{data: 'foobar1123'},
	'secret',//加盐，防止伪造
	{ expiresIn: 666 }//6秒后过期
);

//decode只解码不验证
var decode_token=jwt.decode(token),
	decode_token2=jwt.decode(token,{complete: true});
	
console.log("token===",token);
console.log("token2===",token2);

//只返回payload
console.log("decode_token===",decode_token);

//返回header payload signature
console.log("decode_token2===",decode_token2);

setTimeout(
	function(){
		jwt.verify(token, 'secret', function(err, decoded) {
			console.log("err",err);//null
			console.log("decoded",decoded);//decode value
			if(err){
				console.log("====token无效====");
			}else{
				console.log("====token有效====");
			}
		});
	},
	1000
);


setTimeout(
	function(){
		jwt.verify(token, 'secret', function(err, decoded) {
			console.log("err",err);//err object
			console.log("decoded",decoded);//undefined
			if(err){
				console.log("====token无效====");
			}else{
				console.log("====token有效====");
			}
		});
	},
	9000
);









//module.exports = router;
