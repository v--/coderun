 function Player(game, onTilde) {

  this.logger = Logger.get('player');
  this.game = game;
  this.onTilde = onTilde;
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
    this.tilde = this.game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
  },

  update: function() {
    this.sprite.body.setZeroVelocity();

    if (this.tilde.isDown && !this.game.input.keyboard.disabled) {
      this.logger.info('Blurring');
      this.game.input.keyboard.disabled = true;

      if (this.onTilde)
        this.onTilde();

      return;
    }

    if (this.arrows.right.isDown || this.wasd.right.isDown) {
      this.sprite.body.moveRight(300);
    }

    if (this.arrows.left.isDown || this.wasd.left.isDown) {
      this.sprite.body.moveLeft(300);
    }

    if (this.arrows.up.isDown) {
      this.sprite.body.velocity.y = -800;
    }
  }

}

module.exports = Player;
