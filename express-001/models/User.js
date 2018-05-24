var mongoose = require('mongoose');
var usersSchema = require('../schemas/users.js');
console.log("mongoose.model===",mongoose.model);
console.log("usersSchema===",usersSchema);
console.log("usersSchema===",usersSchema.add);
module.exports = mongoose.model('User',usersSchema);