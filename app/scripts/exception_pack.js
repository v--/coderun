var Collectable = require('collectable');

function ExceptionPack() {
  Collectable.apply(this, arguments);
  this.image = 'img/exceptionGun.png';
  this.name = 'exception_pack';
}

ExceptionPack.prototype = Object.create(Collectable.prototype);

ExceptionPack.prototype.preload = Collectable.prototype.preload;

ExceptionPack.prototype.create = Collectable.prototype.create;

module.exports = ExceptionPack;
