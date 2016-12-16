var Jogador = require('mongoose').model('Jogador');

module.exports.home = function(req, res, next) {
  Jogador.find({}).sort({'elo': 'desc'}).exec(function(err, jogadores) {
    if (err) {
      next(err);
    } else {
      res.render('index',{jogadores:jogadores});
    }
  });
}