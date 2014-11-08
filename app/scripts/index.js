var Console = require('console');
var Player = require('player');
var Level = require('level');

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

var console =  new Console(document.getElementById('console'), function() {
  game.input.keyboard.disabled = false;
});

function preload() {
  game.level = new Level(game);
  game.level.preload();

  game.player = new Player(game, function() {
    console.focus();
  });

  game.player.preload();
  

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

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
