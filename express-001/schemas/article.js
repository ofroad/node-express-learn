var mongoose = require('mongoose');

// 用户的表结构
module.exports =mongoose.Schema({
    // 标题
    title:String,
    // 内容
    content:String

})