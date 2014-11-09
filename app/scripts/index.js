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
var Exit = require('exit');
var StatScreen = require('stat_screen');
var Interpreter = require('interpreter');

var htmlConsole =  new Console(document.getElementById('console'));
var phaserContainer = document.getElementById('phaser');
var player = null;
var level = null;
var statScreen = null;
var currentLevel = 0;
var game = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, { init: init, preload: preload, create: create, update: update }, true);
mainLogger.info('Game initialized');

function init() {
  game.player = new Player(game);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  game.currentLevel = currentLevel + 1;
  game.levelCleared = false;
  game.bugs = 0;
  game.fixedBugs = 0;


  game.levels = [];
  game.levels.push(new Level(game, 1));
  game.levels[0].entities.push(new Map(this.game, 1));
  game.levels[0].entities.push(new Label(this.game, 200, 440));
  game.levels[0].entities.push(new ExceptionPack(this.game, 1300, 100));
  game.levels[0].entities.push(new Coffee(this.game, 300, 300));
  game.levels[0].entities.push(new Block(this.game, true, 515, 500));
  game.levels[0].entities.push(new Block(this.game, false, 100, 100));
  game.levels[0].entities.push(new Block(this.game, true, 100, 300));
  game.levels[0].entities.push(new Bug(this.game, 2000, 100));
  game.levels[0].entities.push(new Exit(this.game, 2300, 550));

  game.levels.push(statScreen);
  //game.levels.push(new StatScreen(game, game.player, currentLevel));

  //console.log(game.levels);

  game.levels.push(new Level(game, 1));
  game.levels[2].entities.push(new Map(this.game, 2));
  game.levels[2].entities.push(new Label(this.game, 200, 440));
  game.levels[2].entities.push(new ExceptionPack(this.game, 320, 440));
  game.levels[2].entities.push(new Coffee(this.game, 300, 300));
  game.levels[2].entities.push(new Block(this.game, false, 400, 200));
  game.levels[2].entities.push(new Block(this.game, true, 1400, 100));
  game.levels[2].entities.push(new Block(this.game, true, 500, 300));
  game.levels[2].entities.push(new Bug(this.game, 950, 100));
  game.levels[2].entities.push(new Bug(this.game, 1250, 100));
  game.levels[2].entities.push(new Bug(this.game, 1150, 100));
  game.levels[2].entities.push(new Exit(this.game, 2300, 550));

  game.levels.push(statScreen);

}

function preload() {
  game.levels[currentLevel].preload();
  game.player.preload();
}

function create() {
  game.levels[currentLevel].create();
  game.player.create();
  game.camera.follow(game.player.sprite);
  initInterpreters();
}

function update() {
  if(game.levelCleared) {
    setLevel(game.currentLevel);
  }
  game.levels[currentLevel].update();
  game.player.update();
}

function initInterpreters() {
  var moveable = game.levels[currentLevel].entities.filter(function(entity) {
    return entity instanceof Block && entity.isMovable;
  });

  var move = new Interpreter(
    [/(block)(\d+)/, /(up|down|left|right)/, /\d*/],
    function(args) {
      var blockIndex = Number(args[0].replace('block', '')) - 1;

      if (blockIndex > moveable.length - 1)
        throw new Error('Invalid block index');

      moveable[blockIndex].move(args[1], args[2] || 1);
  });

  htmlConsole.interpreters.move = move;
}

function setLevel() {
  currentLevel += 1;
  var newGame = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, { init: init, preload: preload, create: create, update: update }, true);
  statScreen = new StatScreen(game, newGame, currentLevel);
  game.destroy();
  game = newGame;
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
