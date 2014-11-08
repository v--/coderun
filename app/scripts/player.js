function Player(game) {

  this.logger = Logger.get('player');
  this.game = game;
  this.sprite = null;
  this.arrows = null;
  this.wasd = null;
}

Player.prototype = {

  preload: function() {
    this.logger.info("Loading player sprite.");
    this.game.load.spritesheet('player', 'img/man.png', 260, 260);
  },

  create: function() {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.logger.info("Creating player.");
    this.sprite = this.game.add.sprite(32, 100, 'player');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.x = 0.3;
    this.sprite.scale.y = 0.3;
    this.wasd = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    this.game.physics.p2.enable(this.sprite);
    this.game.physics.p2.gravity.y = 10800;
    this.sprite.allowRotation = false;
    this.sprite.body.fixedRotation = true;
    this.arrows = this.game.input.keyboard.createCursorKeys();
  },

  update: function() {
    this.sprite.body.setZeroVelocity();
    if(this.arrows.right.isDown || this.wasd.right.isDown) {
      this.sprite.body.moveRight(300);
    } else if(this.arrows.left.isDown || this.wasd.left.isDown) {
      this.sprite.body.moveLeft(300);
    } else if(this.arrows.up.isPressed) {
      this.sprite.body.velocity.y = -400;
    }
  }

}

module.exports = Player