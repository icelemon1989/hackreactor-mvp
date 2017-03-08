var mongoose = require('mongoose');
var Promise = require('promise');

mongoose.Promise = global.Promise;

var PhotoSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
        unique: true
    },
    photos: [String],
    count: Number,
    date: { type: Date, required: true, default: Date.now }
});

PhotoSchema.pre('save', function preSave(next){
  var photomodel = this;
  photomodel.updatedAt(Date.now());
  next();
});

module.exports = mongoose.model('Photos', PhotoSchema);