var Collectable = require('collectable');

function Coffee() {
  Collectable.apply(this, arguments);
  this.image = 'img/coffee.png';
  this.name = 'coffee';
}

Coffee.prototype = Object.create(Collectable.prototype);

Coffee.prototype.preload = Collectable.prototype.preload;

Coffee.prototype.create = Collectable.prototype.create;

module.exports = Coffee;