function Collectable(game){
  this.game = game;
  this.name = null
  this.image = null;
  this.sprite=null;
}

Collectable.prototype = {

  preload: function() {
    this.game.load.image(this.name, this.image);
  },

  create: function(x,y) {
    game.physics.startSystem(Phaser.Physics.P2JS);
    this.sprite = this.game.add.sprite(x,y,this.name);
    this.sprite.scale.x = 1;
    this.sprite.scale.y =1;
  },

  update: function() {

    
  }
}


module.exports = Collectable;