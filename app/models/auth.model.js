const mongoose = require('mongoose')

const AuthSchem = mongoose.Schema({
  userName: String,
  userPassword: String,
  userId: String,
  marks: Array
}, {
  timestamps: true
})

module.exports = mongoose.model('Auth', AuthSchem)
