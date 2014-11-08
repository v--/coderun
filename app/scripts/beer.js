var Collectable = require('collectable');

function Beer() {
	Collectable.apply(this, arguments);
	this.image = 'img/beer.png';
	this.name = 'beer';
}

Beer.prototype = Object.create(Collectable.prototype);

Beer.prototype.preload = Collectable.prototype.preload;

Beer.prototype.create=Collectable.prototype.create;

module.exports = Beer;