function Block(game) {
  this.logger = Logger.get('block');
  this.game = game;
  this.isMovable = false;
  this.sprite = null;
  this.collidableSprite = null;
  this.tween = null;
}

Block.prototype = {

  preload: function() {
    this.logger.info('Loading block sprite.');
    this.game.load.image('block', 'img/block.jpg');
  },

  create: function(x,y) {
    this.logger.info('Creating block');
    this.sprite =  this.game.add.sprite(x, y, '');
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

  translate: function(direction, number) {
    if(this.isMovable) {
      var currentX = this.sprite.x;
      var currentY = this.sprite.y;
      var duration = number * 5;
      var ease = Phaser.Easing.Linear.NONE;

      switch(direction) {
        case 'left':
          this.tween = this.game.add.tween(this.sprite).to({ x: currentX + number }, duration, ease, true);
          break;
        case 'right':
          this.tween = this.game.add.tween(this.sprite).to({ x: currentX - number }, duration, ease, true); break;
        case 'up':
          this.tween = this.game.add.tween(this.sprite).to({ y: currentY - number }, duration, ease, true); break;
        case 'down':
          this.tween = this.game.add.tween(this.sprite).to({ y: currentY + number }, duration, ease, true); break;
        default:
          break;
      }
    }
  },

  setCollisionGroup: function(group) {
    this.collidableSprite.body.setCollisionGroup(group);
  }
}

module.exports = Block;