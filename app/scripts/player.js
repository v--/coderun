function Player(game) {

  this.logger = Logger.get('player');
  this.game = game;
  this.sprite = null;
  this.arrows = null;
  this.wasd = null;
  this.jumpTimer = 0;
  this.exceptions = 1;
  this.beers = 0;
  this.coffee = 0;
  this.labels = 0;
  this.direction = null;
  this.fixedBugs = 0;
  this.loaded = false;
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
      this.direction = 'left';
      this.sprite.scale.x = -0.3;
    },

    right: function() {
      this.sprite.body.velocity.x = 300;
      this.direction = 'right';
      this.sprite.scale.x = 0.3;
    }
  },

  playerTouch: function(body, shapeA, shapeB, equation) {
    if(body != null) {
      if(body.sprite != null) {
        switch(body.sprite.key) {
        case 'exit':
          toastr.error('Next level!');
          this.game.levelCleared = true;
          break;
        case 'exception_pack':
          toastr.info('Gun ammo!');
          body.sprite.destroy();
          this.exceptions += 1;
          break;
        case 'beer':
          toastr.info('BEER!');
          body.sprite.destroy();
          this.beers += 1;
          break;
        case 'coffee':
          toastr.info('Coffee...');
          body.sprite.destroy();
          this.coffee += 1;
          break;
        case 'label':
          toastr.info('A label.');
          body.sprite.destroy();
          this.labels += 1;
          break;
        case 'bug':
          toastr.error('You died!');
          this.sprite.destroy();
          this.game.paused = true;
          break;
        default:
          break;
      }
      }
    }
  },

  shoot: function() {
    if(this.exceptions == 0) {
      return;
    }
    var offset = 1;
    if(this.direction == 'left') {
      offset = -1;
    }
    //toastr.info("Exception");
    //var shootTimer = this.game.time.now + offset;
    var bullet = this.game.add.sprite(this.game.player.sprite.x + offset*32, this.game.player.sprite.y, 'bullet');
    this.game.physics.p2.enable(bullet);
    //bullet.body.moveRight(300);
    bullet.lifespan = 3000;
    bullet.body.restitution = 3000;
    bullet.body.velocity.x = offset*900;
    bullet.body.velocity.y = 0;
    this.exceptions -= 1;
    bullet.body.onBeginContact.add(this.bulletHit, this);
  },

  bulletHit: function(body, shapeA, shapeB, equation) {
    if(body != null) {
      if(body.sprite != null) {
        if(body.sprite.key == 'bug') {
          toastr.info('Bug fixed!');
          this.fixedBugs += 1;
          this.game.fixedBugs += 1;
          body.sprite.destroy();
          if(equation[0].bodyA.parent.sprite != null) {
            equation[0].bodyA.parent.sprite.destroy();
          } else {
            equation[0].bodyB.parent.sprite.destroy();
          }
        }
      }
    }
  },

  preload: function() {
    this.logger.info("Loading player sprite.");
    this.game.load.spritesheet('player', 'img/man.png', 260, 260);
  },

  create: function() {
    this.loaded = true;
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
    this.direction = 'right';
    this.arrows = this.game.input.keyboard.createCursorKeys();

    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.space.onDown.add(this.shoot.bind(this));

    //this.sprite.body.onBeginContact();

    var keyGroups = ['wasd', 'arrows']

    for (i in keyGroups) {
      for (direction in this.move)
        this[keyGroups[i]][direction].onHoldCallback = this.move[direction].bind(this);
    }

    this.sprite.body.onBeginContact.add(this.playerTouch, this);
  },

  update: function() {
    // this.logger.info(this.direction);
    // this.game.physics.arcade.collide(this.sprite, this.game.level.collisionGroup);
    // this.sprite.body.velocity.y = 0;
    // this.sprite.body.velocity.x = 0;
  }
}

module.exports = Player;
