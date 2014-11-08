var Console = require('console');
var Player = require('player');
var Level = require('level');

var console =  new Console(document.getElementById('console'));
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


function preload() {
  game.level = new Level(game);
  game.level.preload();

  game.player = new Player(game, console.focus.bind(console));
  console.onEnter = game.player.focus.bind(game.player);
  game.player.preload();

  beer = new Beer(game);
  beer.preload();
  exception_pack = new ExceptionPack(game);
  exception_pack.preload();
  label = new Label(game);
  label.preload();
  beer = new Beer(game);
  beer.preload();

  block1 = new Block(game);
  block1.preload();
  block2 = new Block(game);
  block2.isMovable = true;
  block2.preload();

  block3 = new Block(game);
  block3.isMovable = true;
  block3.preload();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 300;

  game.level.create();
  game.player.create();
  game.camera.follow(game.player.sprite);

}

function update() {
  game.level.update();
  game.player.update();

}

window.addEventListener('resize', function () {
  game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
