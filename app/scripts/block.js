function Block(game) {
  this.logger = Logger.get('block');
  this.game = game;
  this.isMovable = false;
  this.sprite = null;
  this.tween = null;
}

Block.prototype = {

  preload: function() {
    this.logger.info('Loading block sprite.');
    this.game.load.image('block', 'img/block.jpg');
  },

  create: function(x,y) {
    this.logger.info('Creating block');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.sprite =  this.game.add.sprite(x, y, 'block');
    this.sprite.scale.x = 0.3;
    this.sprite.scale.y = 0.3;
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.static = true;
    this.sprite.body.gravity = 0;
  },

  update: function() {

  },

  translate: function(direction, number) {
    if(this.isMovable) {
      var currentX = this.sprite.x;
      var currentY = this.sprite.y;
      console.log(currentX);
      console.log(currentY);
      // switch(direction) {
      //   case 'left':
      //     this.game.physics.arcade.moveToXY(this.sprite, currentX + number, currentY, 100); break;
      //   case 'right':
      //     this.game.physics.arcade.moveToXY(this.sprite, currentX - number, currentY, 100); break;
      //   case 'up':
      //     this.game.physics.arcade.moveToXY(this.sprite, currentX, currentY - number, 100); break;
      //   case 'down':
      //     this.game.physics.arcade.moveToXY(this.sprite, currentX, currentY + number, 100); break;
      //   default:
      //     break;
      // }
      var duration = number * 5;
      var ease = Phaser.Easing.Linear.NONE;

      switch(direction) {
        case 'left':
          this.tween = this.game.add.tween(this.sprite).to({ x: currentX + number}, duration, ease, true); break;
        case 'right':
          this.tween = this.game.add.tween(this.sprite).to({ x: currentX - number}, duration, ease, true); break;
        case 'up':
          this.tween = this.game.add.tween(this.sprite).to({ y: currentY - number}, duration, ease, true); break;
        case 'down':
          this.tween = this.game.add.tween(this.sprite).to({ y: currentY + number}, duration, ease, true); break;
        default:
          break;
      }
    }
  },

  setCollisionGroup: function(group) {
    this.sprite.body.setCollisionGroup(group);
  }
}

module.exports = Block;