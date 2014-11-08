var Console = require('console');
var Player = require('player');
var Beer = require('beer');
var ExceptionGun = require('exceptiongun');
var Level = require('level');
var Beer = require('beer');
var ExceptionGun = require('exceptionGun');
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

  level = new Level(game);
  level.preload();

  player = new Player(game);
  player.preload();
  beer = new Beer(game);
  beer.preload();
  exceptiongun = new ExceptionGun(game);
  exceptiongun.preload();
  label = new Label(game);
  label.preload();
  beer=new Beer(game);
  beer.preload();
  exceptionGun = new ExceptionGun(game);
  exceptionGun.preload();

  block1 = new Block(game);
  block1.preload();
  block2 = new Block(game);
  block2.isMovable = true;
  block2.preload();

}

function create() {

  level.create();
  player.create();
  beer.create(0,0);
  exceptiongun.create(120,120);
  label.create();
  block1.create(0,0);
  block2.create(100,100);
  block2.update();


}

function update() {

  block1.update();
  block2.update();
  player.update();

  exceptionGun.create(120,120);
  block1.create(0,0);
  block2.create(100,100);
  block2.update();
}

function update() {
  level.update();
  block1.update();
  block2.update();
  player.update();

}

window.addEventListener('resize', function () {
  game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
