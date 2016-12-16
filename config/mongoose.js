const config = require('./config');

const mongoose = require('mongoose');
module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/jogador.server.model.js');
  require('../app/models/partida.server.model.js');
  return db;
};
