var Collectable = require('collectable');

function Label() {
  Collectable.apply(this, arguments);
  this.image = 'img/label.png';
  this.name = 'label';
}

Label.prototype = Object.create(Collectable.prototype);

Label.prototype.preload = Collectable.prototype.preload;

Label.prototype.create = Collectable.prototype.create;



module.exports = Label;