const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => {
      res.render('/list', {
        users: users
      });
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  res.render('/');
}

module.exports.doCreate = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.render('/', {
          user: req.body,
          errors: { email: 'Email already registered' }
        });
      } else {
        user = new User (req.body);
        return user.save()
          .then(user => {
            res.redirect('/list');
          });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('/', {
          user: req.body,
          errors: error.errors
        });
      } else {
        next(error);
      }
    })
}

module.exports.doDelete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('/');
      }
    })
    .catch(error => next(error));
}