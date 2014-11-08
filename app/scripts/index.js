var Console = require('console');
var Player = require('player');
var Level = require('level');

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

  level = new Level(game);
  level.preload();

  player = new Player(game);
  player.preload();
}

function create() {

  level.create();
  player.create();
}

function update() {

  level.update();
  player.update();
}

window.addEventListener('resize', function () {
  game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
