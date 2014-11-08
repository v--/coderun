function Collectable(game){
  this.game = game;
  this.name = null
  this.image = null;
  this.isVisible = true;
  this.sprite=null;
}

Collectable.prototype = {

  preload: function() {
    this.game.load.image(this.name, this.image);
  },

  create: function(x,y) {
    this.sprite = this.game.add.sprite(x,y,this.name);
    this.sprite.scale.x = 1;
    this.sprite.scale.y =1;
  },

  update: function() {
    
   // game.physics.arcade.overlap(player, collectable, collect, null, this);
  },

  removee: function(){
    this.isVisible = false;
    this.sprite.kill();
  }


}
 // function collect (player, collectable) {
  
  //  collectable.kill();
 
//}




module.exports = Collectable;