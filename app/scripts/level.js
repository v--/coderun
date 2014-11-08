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
};

Level.prototype.create = function() {
  this.backgroundSprite = this.game.add.sprite(0, 0, 'background', 'env');

  this.map = this.game.add.tilemap('map');
  this.map.addTilesetImage('tileset_13');
  this.collisionGroup = this.game.physics.p2.createCollisionGroup();

  // this.backgroundSprite = this.game.add.sprite(0, 0, 'background', 'env');

  this.layer = this.map.createLayer('solid');
  this.layer.debug = true;
  this.layer.fixedToCamera = false;

  this.layer.resizeWorld();

  this.map.setCollisionBetween(0, 100, true, this.layer, true);
  this.game.physics.p2.convertTilemap(this.map, this.layer);
  this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
};

Level.prototype.update = function() {
  // this.game.physics.p2.collide(this.player, this.layer);
  // this.game.physics.arcade.collide(this.player, this.solidElements);
};

module.exports = Level;