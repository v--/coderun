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

  move: {
    up: function() {
      if (this.game.time.now > this.jumpTimer) {
        this.sprite.body.moveUp(500);
        this.jumpTimer = this.game.time.now + 950;
      }
    },

    left: function() {
      this.sprite.body.velocity.x = -300;
    },

    right: function() {
      this.sprite.body.velocity.x = 300;
    }
  },

  focus: function() {
    this.game.input.keyboard.disabled = false;
  },

  blur: function() {
    this.logger.info('Blurring');
    this.game.input.keyboard.disabled = true;

    if (this.onTilde)
      this.onTilde();

    return false;
  },

  shoot: function() {
    //toastr.info("Exception");
    var shootTimer = this.game.time.now + 300;
    var bullet = this.game.add.sprite(this.game.player.sprite.x + 32, this.game.player.sprite.y, 'bullet');
    this.game.physics.p2.enable(bullet);
    //bullet.body.moveRight(300);
    bullet.lifespan = 3000;
    bullet.body.restitution = 3000;
    bullet.body.velocity.x = 900;
    bullet.body.velocity.y = 0;
    bullet.body.onBeginContact.add(this.bulletHit, this);
  },

  bulletHit: function(body, shapeA, shapeB, equation) {
    if(body.sprite != null) {
      if(body.sprite.key == 'bug') {
        toastr.info('Bug fixed!');
        body.sprite.destroy();
        console.log(equation);

      }
    }

  },

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
    //this.sprite.body.collideWorldBounds = true;
    //this.sprite.body.setCollisionGroup(this.collisionGroup);
    //this.sprite.body.collides(this.game.level.collisionGroup);
    this.sprite.body.velocity.x = 0;
    this.sprite.body.damping = 0.9;

    this.wasd = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    this.arrows = this.game.input.keyboard.createCursorKeys();

    this.tilde = this.game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
    this.tilde.onDown.add(this.blur.bind(this));

    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.space.onDown.add(this.shoot.bind(this));

    //this.sprite.body.onBeginContact(); 

    var keyGroups = ['wasd', 'arrows']

    for (i in keyGroups) {
      for (direction in this.move)
        this[keyGroups[i]][direction].onHoldCallback = this.move[direction].bind(this);
    }
  },

  update: function() {
    // this.game.physics.arcade.collide(this.sprite, this.game.level.collisionGroup);
    // this.sprite.body.velocity.y = 0;
    // this.sprite.body.velocity.x = 0;
  }
}

module.exports = Player;
