module.exports = function(app) {
  var jogador = require('../controllers/jogador.server.controllers.js');
  app.route("/jogador/cadastro.html").get(jogador.form).post(jogador.create);
  app.route('/jogador').get(jogador.list);
  app.route('/jogador/index.html').get(jogador.list);
}
