module.exports = function(app) {
  var index = require('../controllers/index.server.controllers.js');
  app.get("/", index.home);
  app.get("/index.html", index.home);
}
