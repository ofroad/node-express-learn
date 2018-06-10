var mongoose = require('mongoose');
var dashboardLog = require('../schemas/dashboardlog.js');
console.log("mongoose.model===",mongoose.model);
module.exports = mongoose.model('dashboardlog',dashboardLog);