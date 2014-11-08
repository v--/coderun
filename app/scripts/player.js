function Player(game) {

  this.logger = Logger.get('player');
  this.game = game;
  this.sprite = null;
  this.controls = null;

}

Player.prototype = {

  preload: function() {
    this.logger.info("Loading player sprite.");
    this.game.load.spritesheet('player', 'img/man.png', 32, 48);
  },

  create: function() {
    this.logger.info("Creating player.");
    this.sprite = this.game.add.sprite(32, 100, 'player');
  },

  update: function() {

  }

}

module.exports = Player;