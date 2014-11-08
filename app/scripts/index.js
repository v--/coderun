var Console = require('console');
var Player = require('player');
<<<<<<< HEAD
var Beer = require('beer');
var ExceptionGun = require('exceptionGun');
=======
<<<<<<< HEAD
var Block = require('block');
=======
>>>>>>> 6b60023418a1742b63f7371fdfc312f29b47de71

>>>>>>> 2bc7eb45caa688d77a1d83f252ad18979b09241e
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
<<<<<<< HEAD
  beer=new Beer(game);
  beer.preload();
  exceptionGun = new ExceptionGun(game);
  exceptionGun.preload();
=======
  block1 = new Block(game);
  block1.preload();
  block2 = new Block(game);
  block2.isMovable = true;
  block2.preload();
>>>>>>> 6b60023418a1742b63f7371fdfc312f29b47de71
}

function create() {
  player.create();
<<<<<<< HEAD
  beer.create(0,0);
  exceptionGun.create(120,120);
=======
  block1.create(0,0);
  block2.create(100,100);
  block2.update();
>>>>>>> 6b60023418a1742b63f7371fdfc312f29b47de71
}

function update() {
<<<<<<< HEAD
  block1.update();
  block2.update();
=======
  player.update();
>>>>>>> 2bc7eb45caa688d77a1d83f252ad18979b09241e
}

window.addEventListener('resize', function () {
  game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
