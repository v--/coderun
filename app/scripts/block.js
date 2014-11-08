function Block(game) {
  this.logger = Logger.get('block');
  this.game = game;
  this.isMovable = false;
  this.sprite = null;
}

Block.prototype = {

  preload: function() {
    this.logger.info('Loading block sprite.');
    this.game.load.image('block', 'img/block.jpg');
  },

  create: function(x,y) {
    this.logger.info('Creating block');
    this.sprite =  this.game.add.sprite(x, y, 'block');
    this.sprite.scale.x = 0.5;
    this.sprite.scale.y = 0.5;
    if (this.isMovable) {
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.gravity = 0;
    }
  },

  update: function() {

    if(this.isMovable) {
    }
  }

}

module.exports = Block;