var Console = require('console');
var Player = require('player');
var Level = require('level');
var Beer = require('beer');
var ExceptionPack = require('exception_pack');
var Label = require('label');
var Block = require('block');
var Coffee = require('coffee');
var Bug = require('bug');
var Map = require('map');

var htmlConsole =  new Console(document.getElementById('console'));
var phaserContainer = document.getElementById('phaser');
var player = null;
var level = null;

try {
  var game = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, { init: init, preload: preload, create: create, update: update }, true);
  mainLogger.info('Game initialized');
}

catch (e) {
  mainLogger.error('The game could not be created: ' + e.message);
}

function init() {
  game.level = new Level(game, 1);
  game.level.entities.push(new Map(this.game, 1));
  game.level.entities.push(new Beer(this.game, 300, 400));
  game.level.entities.push(new Label(this.game, 200, 440));
  game.level.entities.push(new ExceptionPack(this.game, 320, 440));
  game.level.entities.push(new Coffee(this.game, 300, 300));
  game.level.entities.push(new Block(this.game, false, 400, 200));
  game.level.entities.push(new Block(this.game, false, 100, 100));
  game.level.entities.push(new Block(this.game, true, 100, 300));
  game.level.entities.push(new Bug(this.game, 950, 100));


  game.player = new Player(game);

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
}

function preload() {
  game.level.preload();
  game.player.preload();
}

function create() {
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
