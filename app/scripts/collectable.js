function Collectable(game, x, y){
  this.game   = game;
  this.name   = null;
  this.image  = null;
  this.sprite = null;
  this.x = x;
  this.y = y;
}

Collectable.prototype = {

  preload: function() {
    this.game.load.image(this.name, this.image);
  },

  create: function() {
    this.sprite = this.game.add.sprite(this.x, this.y, this.name);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.x = 1;
    this.sprite.scale.y = 1;
    this.game.physics.p2.enable(this.sprite);
    //this.sprite.body.kinematic = true;
    this.sprite.body.fixedRotation = true;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.damping = 0.9;
  },

  update: function() {
    //this.sprite.body.velocity.y = 10;
  }
}


module.exports = Collectable;