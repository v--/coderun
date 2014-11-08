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

    this.game.physics.arcade.enable(this.sprite);
    this.game.physics.arcade.gravity.y = 8000;
    this.sprite.allowRotation = false;
    this.sprite.body.fixedRotation = true;
    this.arrows = this.game.input.keyboard.createCursorKeys();

    this.sprite.body.collideWorldBounds = true;

    this.tilde = this.game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
  },

  update: function() {
    this.game.physics.arcade.collide(this.sprite, this.game.level.collisionGroup);
    this.sprite.body.velocity.y = 0;
    this.sprite.body.velocity.x = 0;

    if (this.tilde.isDown) {
      this.logger.info('Blurring');
      this.game.input.keyboard.disabled = true;

      if (this.onTilde)
        this.onTilde();

      return;
    }

    if (this.arrows.right.isDown || this.wasd.right.isDown) {
      this.sprite.body.velocity.x = 300;
    }

    if (this.arrows.left.isDown || this.wasd.left.isDown) {
      this.sprite.body.velocity.x = -300;
    }

    if (this.arrows.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.body.velocity.y = -8000;
    }
  }

}

module.exports = Player;
