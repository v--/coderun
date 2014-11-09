var ExceptionPack = require('exception_pack');
var Beer = require('beer');
var Block = require('block');
var Label = require ('label');
var Coffee = require('coffee');
var Collectable = require('collectable');
var Bug = require('bug');

function Level(game, level) {
  this.logger           = Logger.get('level');
  this.game             = game;
  this.currentLevel = level;
  this.entities = [];
}

Level.prototype = {
  preload: function() {
    this.entities.forEach(function(entity) {
      entity.preload();
    });
  },

  create: function() {
  toastr.info('Level ' + this.game.currentLevel);
  this.entities.forEach(function(entity) {
    entity.create();
  });

  /*collectables = this.game.add.group();
  collectables.enableBody = true;

  for (var i = 0; i < 1 ; i++){
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'label');
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'coffee');
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'exception_pack');
    collectable = collectables.create(this.game.world.randomX, this.game.world.randomY,'beer');

  }*/
  //this.physics.arcade.overlap(this.player, collectobles, this.handle, null, this);
  //block2.move('left');
  //block3.setCollisionGroup(this.collisionGroup);
  //this.layer.fixedToCamera = false;
  },

  update: function() {
    this.entities.forEach(function(entity) {
      entity.update();
    });
  }
}

module.exports = Level;