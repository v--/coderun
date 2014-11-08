function Collectable(game){
  this.game = game;
  this.name = null
  this.image = null;
}

Collectable.prototype = {

  preload: function() {
    this.game.load.image(this.name, this.image);
  },

  create: function(x,y) {
     this.game.add.sprite(x,y,this.name);
  },

  update: function() {

  }

}

module.exports = Collectable;