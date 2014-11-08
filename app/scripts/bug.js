var Collectable = require('collectable');
function Bug(game) {

    this.game = game;
    this.options = null;

    this.walkOffsetX = 0;
    this.tween = null;
}


Bug.prototype = {};

Bug.prototype.preload = function () {
    this.game.load.image('bug', 'img/bug.png');
}

Bug.prototype.create = function (options) {
    this.sprite               = this.game.add.sprite(options.x, options.y, 'bug');
    this.sprite.allowRotation = false;
    this.sprite.scale.x       = 0.4;
    this.sprite.scale.y       = 0.4;
    this.sprite.anchor.setTo(0.5, 0.5);

    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.game.add.tween(this.sprite.body).to( { x: this.sprite.x + 25}, 1000, Phaser.Easing.Elastic.Out ).to( { x: this.sprite.x - 25}, 1000, Phaser.Easing.Elastic.Out).yoyo().loop().start();
}

Bug.prototype.update = function () {
}

module.exports = Bug;