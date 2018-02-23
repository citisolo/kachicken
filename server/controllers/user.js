const mongoose = require('mongoose');
const utils = require('../models/utils');
const User  = mongoose.model('User');


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
          const token = User.signToken(user._id);
          utils.sendJsonResponse(res, 201,{ auth: true, token: token, _id: user._id});
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

  } else if(req.body.logemail && req.body.logpassword){
    User.authenticate(req.body.logemail, req.body.logpassword,
            function(error, user, next){
              if (error || !user){
                var err = new Error();
                err.status = 401;
                err.message = 'Wrong email or password.';
                return utils.sendJsonResponse(res, 401, err);
              } else {
                const token = User.signToken(user._id);
                utils.sendJsonResponse(res, 201,{ auth: true, token: token});
              }
            })
  }else {
    req.assert('email', 'name cannot be blank').notEmpty();
    req.assert('username', 'type cannot be blank').notEmpty();
    req.assert('password', 'serves cannot be blank').notEmpty();
    req.assert('passwordConf', 'meal Time cannot be blank').notEmpty();
    var errors = req.validationErrors();
    return res.status(400).send(errors ? errors : "passwords do not match");
  }
};

module.exports.userDelete = function(req, res) {
  let id = req.params.user ;
  if(id){
    User
        .findByIdAndRemove(id)
        .exec(
          (err, data) => {
            if(err){
              utils.sendJsonResponse(res, 404, err);
              return;
            }
            utils.sendJsonResponse(res, 204, null);
          });
  }else{
    utils.sendJsonResponse(res, 404, {
      "message" : "No user  found"
    });
  }
  //  User.authorize(req, res, function(req, res, decoded){
  //    let id = req.params.user ;
  //    if(id){
  //      User
  //          .findByIdAndRemove(id)
  //          .exec(
  //            (err, data) => {
  //              if(err){
  //                utils.sendJsonResponse(res, 404, err);
  //                return;
  //              }
  //              utils.sendJsonResponse(res, 204, null);
  //            });
  //    }else{
  //      utils.sendJsonResponse(res, 404, {
  //        "message" : "No user  found"
  //      });
  //    }
  //  })

}
