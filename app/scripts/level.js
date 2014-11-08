var ExceptionPack = require('exception_pack');
var Beer = require('beer');
var Block = require('block');
var Label = require ('label');

function Level(game) {
  // Phaser.Stage.apply(this, [game]);
  this.logger           = Logger.get('level');
  this.game             = game;
  this.backgroundSprite = null;
  this.map              = null;

  this.layer            = null;
  this.player           = null;
  this.tileset           = null;


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
  beer=new Beer(this.game);
  beer.preload();

  block1 = new Block(this.game);
  block1.preload();
  block2 = new Block(this.game);
  block2.isMovable = true;
  block2.preload();

  block3 = new Block(this.game);
  block3.isMovable = true;
  block3.preload();

};

Level.prototype.create = function() {

  this.map = this.game.add.tilemap('map');
  this.map.addTilesetImage('tileset_13');
  this.collisionGroup = this.game.physics.p2.createCollisionGroup();

  beer.create(0,0);
  exception_pack.create(120,120);
  label.create();
  block1.create(0,0);
  block2.create(100,100);
  block3.create(0, 300);

  block2.translate('left', 300);
  //block3.setCollisionGroup(this.collisionGroup);

  this.layer = this.map.createLayer('solid');
  this.layer.debug = true;
  //this.layer.fixedToCamera = false;

  this.layer.resizeWorld();

  this.map.setCollisionBetween(0, 100, true, this.layer, true);
  this.game.physics.p2.convertTilemap(this.map, this.layer);
  this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
};

Level.prototype.update = function() {
  block1.update();
  block2.update();
  block3.update();
};

module.exports = Level;