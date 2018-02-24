const mongoose = require('mongoose');
const utils = require('../models/utils');
const User  = mongoose.model('User');
const jwt = require('jwt-simple');
//const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.userLogout = function(req, res, next) {
  if(req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return utils.sendJsonResponse(res, 200, { auth: false, token: null });
      }
    })
  }
  res.status(200).send({ auth: false, token: null });
}


module.exports.userLogin = function(req, res) {

if(req.body.logemail && req.body.logpassword){
  //authenticate user
  User.findOne({email: req.body.logemail}, function (err, user) {
      if(err) {
        return utils.sendJsonResponse(res, 401, err);
      } else if (!user) {
        var err = utils.createErrorObject(401, 'Wrong username or Password');
        return utils.sendJsonResponse(res, 401, err);
      }
      user.comparePassword(req.body.logpassword, function (err, isMatch) {
        if(isMatch) {
          const token = jwt.encode(user, config.secret);
          // const token = jwt.sign(user.toJSON(), config.secret, {
          //   expiresIn: 10080 // in seconds
          // });
          utils.sendJsonResponse(res, 200, {success: true, token:'JWT ' + token});

        } else {
          //return callback();
          var err = utils.createErrorObject(401, 'Wrong username or Password');
          utils.sendJsonResponse(res, 401, err);
        }
      });
    });
  }else {
    req.assert('logemail', 'name cannot be blank').notEmpty();
    req.assert('logpassword', 'type cannot be blank').notEmpty();
    var errors = req.validationErrors();
    return res.status(400).send(errors ? errors : "passwords do not match");
  }
}


module.exports.userPost = function(req, res){

  if (req.body.email && req.body.username &&
    req.body.password && req.body.passwordConf){
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }

      User.create(userData, function (err, user){
        if(err) {
          //console.log("MONGODB_ERROR: " + err);
          return utils.sendJsonResponse(res, 400, err);
        }

        try {
          utils.sendJsonResponse(res, 201,{id: user._id});
        } catch (e) {
          //if something goes wrong, remove the user
          User
              .findByIdAndRemove(user._id)
              .exec(
                (err, data) => {
                  if(err){
                    utils.sendJsonResponse(res, 404, err);
                    return;
                  }
                  return utils.sendJsonResponse(res, 400, e);
                });
        }
      })

  } else {
    req.assert('email', 'name cannot be blank').notEmpty();
    req.assert('username', 'type cannot be blank').notEmpty();
    req.assert('password', 'serves cannot be blank').notEmpty();
    req.assert('passwordConf', 'meal Time cannot be blank').notEmpty();
    var errors = req.validationErrors();
    return res.status(400).send(errors ? errors : "passwords do not match");
  }
};

//FIXME: modify this to account for the case when user does not exist
module.exports.userDelete = function(req, res) {
  let id = req.params.user ;
  if(id){
    var token = utils.getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      if (decoded._id === id) {
        User
            .findByIdAndRemove(id)
            .exec(
              (err, data) => {
                if(err){
                  console.log("user not found");
                  return utils.sendJsonResponse(res, 404, err);
                }
                console.log(data);
                utils.sendJsonResponse(res, 204, null);
              });
      }
    } else {
      utils.sendJsonResponse(res, 401, {
        message: "action unauthorized!"
      })
    }

  }else{
    utils.sendJsonResponse(res, 404, {
      "message" : "No user  found"
    });
  }
}
