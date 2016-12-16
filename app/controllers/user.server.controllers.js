var User = require('mongoose').model('User');
module.exports.create = function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err) {
    if(err) {
      next(err);
    } else {
      res.json(user);
    }
  });
}

module.exports.list = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      next(err);
    } else {
      res.json(users);
    }
  });
}

module.exports.userById = function(req, res, next, id) {
  User.findOne({"_id":id},
      function(err, user) {
        if (err) {
          next(err);
        } else {
          req.user = user;
          next();
        }
  });
}

module.exports.read = function(req, res, next) {
      res.json(req.user);
}

module.exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id,
      req.body,
      function(err, user2) {
        if (err) {
          next(err);
        } else {
          res.json(user2);
        }
      });
}

module.exports.remove = function(req, res, next) {
  User.findByIdAndRemove(req.user.id,
      req.body,
      function(err, user2) {
        if (err) {
          next(err);
        } else {
          res.json(user2);
        }
      });
}
