var mongoose = require('mongoose');
var usersSchema = require('../schemas/users.js');
console.log(mongoose.model);
module.exports = mongoose.model('User',usersSchema);