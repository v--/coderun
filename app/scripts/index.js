var Console = require('console');
var Player = require('player');
var Level = require('level');
var Beer = require('beer');
var ExceptionPack = require('exception_pack');
var Label = require('label');
var Block = require('block');

var htmlConsole =  new Console(document.getElementById('console'));
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

function preload() {
  game.level = new Level(game);
  game.level.preload();

  game.player = new Player(game);
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

window.addEventListener('keydown', function (e) {
  if (e.keyCode != 192 && e.keyCode != 13)
    return;

  e.preventDefault();

  var keyboard = game.input;

  if (keyboard.disabled) {
    htmlConsole.blur();
    keyboard.disabled = false;
  }

  else if (e.keyCode == 192) {
    htmlConsole.focus();
    keyboard.disabled = true;
  }
});
