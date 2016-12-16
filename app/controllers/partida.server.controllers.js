var Partida = require('mongoose').model('Partida');
var Jogador = require('mongoose').model('Jogador');


module.exports.form = function(req, res, next) {
  Jogador.find({}, function(err, jogadores) {
    if (err) {
      next(err);
    } else {
      res.render('partida/cadastro',{jogadores:jogadores});
    }
  });
};

module.exports.formResultado = function(req, res, next) {
  Partida.find({}).populate('jogador_1').populate('jogador_2').exec(function(err, partidas) {
    if (err) {
      next(err);
    } else {
      res.render('partida/resultado',{partidas:partidas});
    }
  });
};

module.exports.formResultado = function(req, res, next) {
  Partida.find({'realizada': false}).populate('jogador_1').populate('jogador_2').exec(function(err, partidas) {
    if (err) {
      next(err);
    } else {
      res.render('partida/resultado',{partidas:partidas});
    }
  });
};

module.exports.createResultado = function(req, res, next) {
  Partida.findByIdAndUpdate(req.body.partida, {$set: {
    'pontuacao_jogador_1': req.body.pontuacao_jogador_1,
    'pontuacao_jogador_2': req.body.pontuacao_jogador_2,
    'realizada': true
    }}
   ).exec( function (err, partida) {
    if (err) {
        next(err);
    }
    else{
       atualizaJogadores(partida);
       res.redirect('/partida');
    }
  });
};

var atualizaJogadores = function(partida) {
  Jogador.findById(partida.jogador_1).exec(function(err, jogador1){
    Jogador.findById(partida.jogador_2).exec(function(err, jogador2){
      if(partida.pontuacao_jogador_1 > partida.pontuacao_jogador_2){
        jogador1.vitorias++; 
        jogador2.derrotas++; 
      }
      else if(partida.pontuacao_jogador_1 < partida.pontuacao_jogador_2){
        jogador1.derrotas++; 
        jogador2.vitorias++; 
      }
      else{
        jogador1.empates++;
        jogador2.empates++;
      }

      jogador1.save();
      jogador2.save();
    });
  });
};


module.exports.create = function(req, res, next) {
  var partida = new Partida(req.body);
  partida.save(function(err) {
    if(err) {
      next(err);
    } else {
 		 res.redirect('/partida');
    }
  });
};


module.exports.list = function(req, res, next) {
  Partida.find({}).populate('jogador_1').populate('jogador_2').exec(function(err, partidas) {
    if (err) {
      next(err);
    } else {
      res.render('partida/index',{partidas:partidas});
    }
  });
}