module.exports = function(app) {
  var partida = require('../controllers/partida.server.controllers.js');
  app.route("/partida/cadastro.html").get(partida.form).post(partida.create);
  app.route('/partida/resultado.html').get(partida.formResultado).post(partida.createResultado);
  app.route('/partida').get(partida.list);
}
