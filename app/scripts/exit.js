function Exit(game, x, y) {
  this.logger = Logger.get('exit');
  this.game = game;
  this.sprite = null;
  this.x = x;
  this.y = y;
}

Exit.prototype = {

  preload: function() {
    this.logger.info('Loading exit');
    this.game.load.image('exit', 'img/beer.png');
  },

  create: function() {
    this.logger.info('Creating exit');
    this.sprite =  this.game.add.sprite(this.x, this.y, 'exit');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.x = 1.3;
    this.sprite.scale.y = 1.3;
    this.game.physics.p2.enable(this.sprite);
    //this.sprite.body.kinematic = true;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.fixedRotation = true;
  },

  update: function() {

  }
}

module.exports = Exit;
