function Player(game) {

  this.game = game;
  this.sprite = null;
  this.controls = null;

}

Player.prototype = {

  preload: function() {
    logger.info("Loading player sprite.");
    this.game.load.spritesheet('player', 'img/man.png', 32, 48);
  },

  create: function() {
    logger.info("Creating player.");
    this.sprite = game.add.sprite(32, 100, 'player');
  },

  update: function() {

  }

}