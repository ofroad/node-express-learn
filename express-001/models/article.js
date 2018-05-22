var mongoose = require('mongoose');
var articleSchema = require('../schemas/article.js');

module.exports = mongoose.model('article',articleSchema);