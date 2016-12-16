module.exports  = function(app) {
  var user = require('../controllers/user.server.controllers.js');
  app.route('/user')
        .post(user.create)
        .get(user.list);
  app.route('/user/:userId')
        .get(user.read)
        .put(user.update)
        .delete(user.remove);
  app.param("userId", user.userById);
}
