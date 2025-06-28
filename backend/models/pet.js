const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => typeof value === 'number' && !isNaN(value),
      message: 'Age must be a valid number'
    }
  },
  breed: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  status: {
    type: String,
    enum: ['Available', 'Adopted'],
    default: 'Available'
  }
});

module.exports = mongoose.model('Pet', petSchema);
