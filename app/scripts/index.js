var Console = require('console');
var Player = require('player');

var phaserContainer = document.getElementById('phaser');
var player = null;
var level = null;

try {
  var game = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, { preload: preload, create: create, update: update }, true);
  mainLogger.info('Game initialized');
}
catch (e) {
  mainLogger.error('The game could not be created: ' + e.message);
}

var console =  new Console(document.getElementById('console'));

function preload() {
  player = new Player(game);
  player.preload();
}

function create() {
  player.create();
}

function update() {
  player.update();
}

window.addEventListener('resize', function () {
  game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
