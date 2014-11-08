 function Player(game, onTilde) {

  this.logger = Logger.get('player');
  this.game = game;
  this.onTilde = onTilde;
  this.sprite = null;
  this.arrows = null;
  this.wasd = null;
  this.jumpTimer = 0;
  this.collisionGroup = null;
}

Player.prototype = {

  preload: function() {
    this.logger.info("Loading player sprite.");
    this.game.load.spritesheet('player', 'img/man.png', 260, 260);
  },

  create: function() {
    this.collisionGroup = this.game.physics.p2.createCollisionGroup();
    this.logger.info("Creating player.");
    this.sprite = this.game.add.sprite(32, 100, 'player');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.allowRotation = false;
    this.sprite.scale.x = 0.3;
    this.sprite.scale.y = 0.3;
    this.game.physics.p2.enable(this.sprite);

    this.sprite.body.fixedRotation = true;
    this.sprite.body.collideWorldBounds = true;
    //this.sprite.body.setCollisionGroup(this.collisionGroup);
    //this.sprite.body.collides(this.game.level.collisionGroup);

    this.wasd = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    this.arrows = this.game.input.keyboard.createCursorKeys();

    this.tilde = this.game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
  },

  update: function() {
    //
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

    if (this.arrows.up.isDown && this.game.time.now > this.jumpTimer) {
      this.sprite.body.moveUp(300);
      this.jumpTimer = this.game.time.now + 750;
    }
  }

}

module.exports = Player;
