function Level(game) {
  Phaser.Stage.apply(this, [game]);
  this.logger    = Logger.get('level');
  this.game      = game;
  this.backgroundSprite = null;
}

Level.prototype = Object.create(Phaser.Stage.prototype);

Level.prototype.preload = function() {
  this.game.load.image('background', 'img/env/background.jpg');
  this.game.load.image('level', 'img/tileset_13.png');
  this.game.load.tilemap('map', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
};

Level.prototype.create = function() {
  this.game.physics.startSystem(Phaser.Physics.P2JS);
  this.game.add.tilemap('map');

  this.backgroundSprite = this.game.add.sprite(0, 0, 'background', 'env');
};

Level.prototype.update = function() {

};

module.exports = Level;