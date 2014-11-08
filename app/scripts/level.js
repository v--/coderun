var ExceptionPack = require('exception_pack');
var Beer = require('beer');
var Block = require('block');
var Label = require ('label');
var Coffee = require('coffee');
var Collectable = require('collectable');
var Bug = require('bug');

var block1 = null;
var block2 = null;
var beer = null;
var exception_pack = null;
var label = null;
var coffee = null;
var collectables = null;
var bugs = [];


function Level(game) {
  // Phaser.Stage.apply(this, [game]);
  this.logger           = Logger.get('level');
  this.game             = game;
  this.backgroundSprite = null;
  this.map              = null;

  this.layer            = null;
  this.player           = null;
  this.tileset          = null;
  this.blocks           = [];

  this.tilesetRef = null;
  this.tilemapRef = null;
  this.collisionGroup   = null;
}

// Level.prototype = Object.create(Phaser.Stage.prototype);
Level.prototype = {};

Level.prototype.preload = function() {
  this.game.load.image('background', 'img/env/background.jpg');
  this.tilesetRef = this.game.load.image('tileset_13', 'img/tileset_13.png');
  this.tilemapRef = this.game.load.tilemap('map', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);

  beer = new Beer(this.game);
  beer.preload();
  exception_pack = new ExceptionPack(this.game);
  exception_pack.preload();
  label = new Label(this.game);
  label.preload();
  coffee = new Coffee(this.game);
  coffee.preload();

  block1 = new Block(this.game);
  block1.preload();
  block2 = new Block(this.game);
  block2.isMovable = true;
  block2.preload();

  block3 = new Block(this.game);
  block3.isMovable = true;
  block3.preload();

  var bug = new Bug(this.game);
  bug.preload();
  bugs.push(bug);

};

Level.prototype.create = function() {

  this.map = this.game.add.tilemap('map');
  this.map.addTilesetImage('tileset_13');
  this.collisionGroup = this.game.physics.p2.createCollisionGroup();
/*
  beer.create(300,300);
  exception_pack.create(120,120);
  label.create(0,100);
  */
  //coffee.create(300,300);

  collectables = this.game.add.group();
  collectables.enableBody = true;

  for (var i = 0; i < 1 ; i++){
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'label');
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'coffee');
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'exception_pack');
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'beer');

  }

 // this.physics.arcade.overlap(this.player, collectobles, this.handle, null, this);


  block1.create(0,0);
  block2.create(100,100);
  block3.create(0, 300);

  this.blocks = [block1, block2, block3];

  block2.translate('left', 300);
  //block3.setCollisionGroup(this.collisionGroup);

  this.layer = this.map.createLayer('solid');
  this.layer.debug = true;
  //this.layer.fixedToCamera = false;

  this.layer.resizeWorld();

  this.map.setCollisionBetween(0, 100, true, this.layer, true);
  this.game.physics.p2.convertTilemap(this.map, this.layer);
  this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

  for (var i = bugs.length - 1; i >= 0; i--) {
    bugs[i].create({
      x: 950,
      y: 100
    });
  };
};

Level.prototype.update = function() {
  block1.update();
  block2.update();
  block3.update();


  for (var i = bugs.length - 1; i >= 0; i--) {
    bugs[i].update();
  };
  
};

module.exports = Level;