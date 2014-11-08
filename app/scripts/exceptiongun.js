var Collectable = require('collectable');

function ExceptionGun() {
	Collectable.apply(this, arguments);
	this.image = 'img/exceptionGun.png';
	this.name = 'exceptiongun';
}

ExceptionGun.prototype = Object.create(Collectable.prototype);

ExceptionGun.prototype.preload = Collectable.prototype.preload;

ExceptionGun.prototype.create = Collectable.prototype.create;

module.exports = ExceptionGun;