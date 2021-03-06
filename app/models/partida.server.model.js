const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Jogador = require('./jogador.server.model.js');

var PartidaSchema = new Schema({
  jogador_1: {type: Schema.Types.ObjectId, ref: 'Jogador'},
  jogador_2: {type: Schema.Types.ObjectId, ref: 'Jogador'},
  data: String,
  horario: String,
  vitoria_jogador_1: Boolean,
  vitoria_jogador_2: Boolean,
  empate: Boolean,
  realizada: {type: Boolean, default: false},
});

function getJogador(){
	return "123";
}

mongoose.model('Partida', PartidaSchema);
