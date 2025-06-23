const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  description: String,
  image: String,
  status: {
    type: String,
    enum: ['Available', 'Adopted'],
    default: 'Available'
  }
});

module.exports = mongoose.model('Pet', petSchema);
