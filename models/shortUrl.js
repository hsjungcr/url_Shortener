//Template/structure/model of document for shortUrl
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const urlSchema = new Schema({
  originalUrl: String,
  shorterUrl: String
}, {timestamps: true});

var ModelClass = mongoose.model('shortUrl', urlSchema);

module.exports = ModelClass;
