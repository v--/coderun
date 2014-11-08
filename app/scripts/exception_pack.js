var Collectable = require('collectable');

function Exception_pack() {
	Collectable.apply(this, arguments);
	this.image = 'img/exceptionGun.png';
	this.name = 'exception_pack';
}

Exception_pack.prototype = Object.create(Collectable.prototype);

Exception_pack.prototype.preload = Collectable.prototype.preload;

Exception_pack.prototype.create = Collectable.prototype.create;

module.exports = Exception_pack;