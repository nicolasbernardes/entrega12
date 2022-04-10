const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'usar un email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'usar email valido']
  },
  password: {
    type: String,
    required: [true, 'usar una contrsena'],
    minlength: [6, 'minimo 6 caracteres'],
  }
});


userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('contrasena no es corecta');
  }
  throw Error('email no es corecto');
};

const User = mongoose.model('user', userSchema);

module.exports = User;