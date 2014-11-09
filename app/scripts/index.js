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
var currentScreen = 0;
var currentLevel = 0;

var statScreen = null;
var levelStat = null;


var game = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, { init: init, preload: preload, create: create, update: update }, true);
mainLogger.info('Game initialized');

function init() {
  game.player = new Player(game);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  game.levelCleared = false;
  game.bugs = 0;
  game.fixedBugs = 0;

  game.levels = [];
  game.levels.push(new Level(game, 1));
  game.levels[0].entities.push(new Map(this.game, 1));
 //game.levels[0].entities.push(new Label(this.game, 200, 440));
  game.levels[0].entities.push(new ExceptionPack(this.game, 1300, 100));
  game.levels[0].entities.push(new Coffee(this.game, 200, 300));
  game.levels[0].entities.push(new Block(this.game, true, 515, 500, 0.3, 0.5));
  game.levels[0].entities.push(new Block(this.game, false, 100, 100, 0.3, 0.3));
  game.levels[0].entities.push(new Block(this.game, true, 100, 300, 0.3, 0.3));
  game.levels[0].entities.push(new Bug(this.game, 2000, 100));
  game.levels[0].entities.push(new Exit(this.game, 2300, 550));

  game.levels.push(statScreen);

  //game.levels.push(new StatScreen(game, game.player, currentScreen));

  //console.log(game.levels);
  
  game.levels.push(new Level(game, 1));
  game.levels[2].entities.push(new Map(this.game, 2));
  //game.levels[2].entities.push(new Label(this.game, 200, 440));
  game.levels[2].entities.push(new ExceptionPack(this.game, 800, 100));
  game.levels[2].entities.push(new Coffee(this.game, 1700, 580));
  game.levels[2].entities.push(new Block(this.game, false, 400, 520, 0.3, 0.3));
  game.levels[2].entities.push(new Block(this.game, true, 1400, 100, 0.3, 0.3));
  game.levels[2].entities.push(new Block(this.game, true, 500, 450, 0.3, 0.3));
  game.levels[2].entities.push(new Block(this.game, true, 1750, 450, 0.3, 0.3));
  game.levels[2].entities.push(new Bug(this.game, 950, 100));
  game.levels[2].entities.push(new Bug(this.game, 1350, 100));
  game.levels[2].entities.push(new Bug(this.game, 1150, 100));
  game.levels[2].entities.push(new Exit(this.game, 2300, 550));

  game.levels.push(statScreen);

  if(game.levels[currentScreen] instanceof Level) {
    currentLevel += 1;
  }
}

function preload() {
  game.load.audio('fx.bugkill', 'audio/fx/errororfailed.mp3');
  game.load.audio('fx.exceptiongunFire', 'audio/fx/cork.mp3');
  game.load.audio('fx.itemPickup', 'audio/fx/pick.wav');
  game.levels[currentScreen].preload();
  game.player.preload();
}

function create() {
  game.fx = {};
  game.fx.bugkill          = game.add.audio('fx.bugkill');
  game.fx.exceptiongunFire = game.add.audio('fx.exceptiongunFire');
  game.fx.itemPickup       = game.add.audio('fx.itemPickup');

  game.levels[currentScreen].create();
  game.player.create();
  // game.camera.follow(game.player.sprite);
  game.camera.follow(game.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

  createLevelStat();
  initInterpreters();
}

function update() {
  if(game.levelCleared) {
    setLevel();
  }
  game.levels[currentScreen].update();
  game.player.update();
  updateLevelStat();
}

function initInterpreters() {
  var moveable = game.levels[currentScreen].entities.filter(function(entity) {
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
  currentScreen += 1;
  var newGame = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, { init: init, preload: preload, create: create, update: update }, true);
  statScreen = new StatScreen(game, newGame, currentScreen);
  game.destroy();
  game = newGame;
}

function createLevelStat() {
  text = "Level: " + currentLevel
         + "\nBugs fixed: " + game.fixedBugs + "/" + game.bugs
         + "\nExceptions : " + game.player.exceptions
         + "\nCoffee: " + game.player.coffee
         + "\nBeer: " + game.player.beers
         + "\nLabels: " + game.player.labels;

  var style = { font: "20px Courier New", fill: "#000", align: "left" };
  levelStat = game.add.text(window.innerWidth - 250, 75 , text, style);
  levelStat.fixedToCamera = true;
}

function updateLevelStat() {
  levelStat.setText("Level: " + currentLevel
             + "\nBugs fixed: " + game.fixedBugs + "/" + game.bugs
             + "\nExceptions : " + game.player.exceptions
             + "\nCoffee: " + game.player.coffee
             + "\nBeer: " + game.player.beers
             + "\nLabels: " + game.player.labels);
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
