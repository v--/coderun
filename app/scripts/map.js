function Map(game, level) {
  this.game = game;
  this.tilesetRef = null;
  this.tilemapRef = null;
  this.layer            = null;
  this.tileset          = null;
  this.backgroundSprite = null;
  this.map              = null;
  this.currentLevel = level;
}


Map.prototype = {
  preload: function() {
    // this.tilesetRef = this.game.load.image('tileset_13', 'img/tileset_13.png');
    this.tilesetRef = this.game.add.text(0, 0, scriptText);
    this.tilemapRef = this.game.load.tilemap('map', 'maps/level'+ this.currentLevel +'.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    this.map = this.game.add.tilemap('map');
    // this.map.addTilesetImage('tileset_13');

    this.collisionGroup = this.game.physics.p2.createCollisionGroup();

    this.layer = this.map.createLayer('solid');
    this.layer.debug = true;

    this.layer.resizeWorld();

    this.map.setCollisionBetween(0, 100, true, this.layer, true);
    this.game.physics.p2.convertTilemap(this.map, this.layer);
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
  },

  update: function() {

  }
}

module.exports = Map;
