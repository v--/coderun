function Block(game, movable, x, y) {
  this.logger = Logger.get('block');
  this.game = game;
  this.isMovable = movable;
  this.sprite = null;
  this.collidableSprite = null;
  this.tween = null;
  this.x = x;
  this.y = y;
}

Block.prototype = {

  preload: function() {
    this.logger.info('Loading block sprite.');
    this.game.load.image('block', 'img/block.jpg');
  },

  create: function(x,y) {
    this.logger.info('Creating block');
    this.sprite =  this.game.add.sprite(this.x, this.y, '');
    this.sprite.scale.x = 0.3;
    this.sprite.scale.y = 0.3;
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.static = true;
    this.sprite.body.gravity = 0;

    this.collidableSprite =  this.game.add.sprite(x, y, 'block');
    //this.collidableSprite.visible = false;
    this.collidableSprite.scale.x = 0.3;
    this.collidableSprite.scale.y = 0.3;
    this.game.physics.p2.enable(this.collidableSprite);
    this.collidableSprite.body.kinematic = true;
    this.collidableSprite.body.gravity = 0;
  },

  update: function() {
    this.collidableSprite.reset(this.sprite.x, this.sprite.y);
    //this.collidableSprite.visible = false;
  },

  move: function(direction, number) {
    if(this.isMovable) {
      var tileSize = 100;
      var currentX = this.sprite.x;
      var currentY = this.sprite.y;
      var offset = tileSize;

      if (number)
        offset *= number;

      var duration = offset * 5;
      var ease = Phaser.Easing.Linear.NONE;
      var directionTo;

      switch(direction) {
        case 'left':
          directionTo = { x: currentX = offset };
          break;
        case 'right':
          directionTo = { x: currentX - offset };
          break;
        case 'up':
          directionTo = { y: currentY - offset };
          break;
        case 'down':
          directionTo = { y: currentY + offset };
          break;
      }

      this.tween = this.game.add.tween(this.sprite).to(directionTo, duration, ease, true);
    }
  },

  setCollisionGroup: function(group) {
    this.collidableSprite.body.setCollisionGroup(group);
  }
}

module.exports = Block;
