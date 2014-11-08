var Console = require('console');
var Player = require('player');
var Block = require('block');
var phaserContainer = document.getElementById('phaser');
var player = null;
var level = null;
var block1 = null;
var block2 = null;

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
  block1 = new Block(game);
  block1.preload();
  block2 = new Block(game);
  block2.isMovable = true;
  block2.preload();
}

function create() {
  player.create();
  block1.create(0,0);
  block2.create(100,100);
  block2.update();
}

function update() {
  block1.update();
  block2.update();
}

window.addEventListener('resize', function () {
  game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
