const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

require('../constants');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
        
    },

    password:{
        type: String,
        required: 'Password is required'

    },

    role:{
        type :String,
        enum: [ROLE_BOSS, ROLE_DEVELOPER, ROLE_TA],
        default: ROLE_DEVELOPER
    }

})

userSchema.pre('save', function(next) {
    if (this.email === FIRST_ADMIN_EMAIL) {
      this.role = constants.ROLE_BOSS;
    }
  
    if (this.isModified('password')) {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(this.password, salt)
        })
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch(error => next(error));
    } else {
      next();
    }
  });
  
  userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }

const User = mongoose.model('User', userSchema);
module.exports = User;
