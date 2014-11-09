var phaserContainer = document.getElementById('phaser');

function Map(game, level) {
  this.game = game;
  this.tilesetRef = null;
  this.tilemapRef = null;
  this.layer            = null;
  this.tileset          = null;
  this.backgroundSprite = null;
  this.map              = null;
  this.currentLevel = level;
  this.canvas = document.getElementById('backgroundTiles');
  this.canvas.width = phaserContainer.scrollWidth;
  this.canvas.height = phaserContainer.scrollHeight;
  this.ctx = this.canvas.getContext('2d');
  this.ctx.fillStyle = '#506'
}

Map.prototype = {
  populateTiles: function() {
    var data = this.map.layers[0].data;

    for (var i = 0; i < data.length; ++i) {
      for (var j = 0; j < data[i].length; ++j) {
        if (data[i][j].index === -1) {
          this.ctx.fillRect(data[i][j].x * 16 - this.game.camera.view.x, data[i][j].y * 16, 16, 16);
        }
      };
    };
  },

  preload: function() {
    this.tilemapRef = this.game.load.tilemap('map', 'maps/level'+ this.currentLevel +'.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    this.map = this.game.add.tilemap('map');
    this.lastX = this.game.camera.view.x;
    this.populateTiles();

    this.collisionGroup = this.game.physics.p2.createCollisionGroup();

    this.layer = this.map.createLayer('solid');
    this.layer.resizeWorld();

    this.map.setCollisionBetween(0, 100, true, this.layer, true);
    this.game.physics.p2.convertTilemap(this.map, this.layer);
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);
  },

  update: function() {
    if (this.lastX != this.game.camera.view.x) {
      this.lastX = this.game.camera.view.x;
      this.ctx.clearRect(0, 0, phaserContainer.scrollWidth, phaserContainer.scrollHeight);
      this.populateTiles();
    }
  }
}

module.exports = Map;
