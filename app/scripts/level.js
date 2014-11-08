function Level(game) {
  Phaser.Stage.apply(this, [game]);
  this.logger           = Logger.get('level');
  this.game             = game;
  this.backgroundSprite = null;
  this.map              = null;
  this.collisionGroup   = null;
}

Level.prototype = Object.create(Phaser.Stage.prototype);

Level.prototype.preload = function() {
  this.game.load.image('background', 'img/env/background.jpg');
  this.game.load.image('level', 'img/tileset_13.png');
  this.game.load.tilemap('map', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
};

Level.prototype.create = function() {
  this.collisionGroup = this.game.physics.p2.createCollisionGroup();

  // this.backgroundSprite = this.game.add.sprite(0, 0, 'background', 'env');

  // this.map = this.game.add.tilemap('map');
  // this.map.addTilesetImage('level');


  // var layer = this.map.createLayer('Tile Layer 1');
  // this.map.setCollisionBetween(1, 5);
  // layer.resizeWorld();
};

Level.prototype.update = function() {

};

module.exports = Level;