var Collectable = require('collectable');
function Bug(game) {

    this.game = game;
    this.options = null;

    this.walkOffsetX = 0;
    this.tween = null;
}


Bug.prototype = {};

Bug.prototype.preload = function () {
    this.game.load.spritesheet('bug', 'img/bug_black.png', 36, 20, 2);
}

Bug.prototype.create = function (options) {
    this.sprite               = this.game.add.sprite(options.x, options.y, 'bug');
    this.sprite.allowRotation = false;
    this.sprite.scale.x       = 1.2;
    this.sprite.scale.y       = 1.2;
    this.sprite.anchor.setTo(0.5, 0.5);

    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.fixedRotation = true;

    this.sprite.animations.add('bug');

    this.sprite.animations.frame = 1;
    this.sprite.animations.play('bug', 1, true);
    this.game.add.tween(this.sprite.body).to( { x: this.sprite.x + 25}, 1000, Phaser.Easing.Elastic.Out ).to( { x: this.sprite.x - 25}, 1000, Phaser.Easing.Elastic.Out, true).loop();
}

Bug.prototype.update = function () {
}

module.exports = Bug;