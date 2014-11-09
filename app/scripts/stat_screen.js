var Block = require('block');
var Exit = require('exit');

function StatScreen(game, newGame, currentLevel) {
  this.game = game;
  this.newGame = newGame;
  this.currentLevel = currentLevel;
  this.exit = new Exit(this.newGame, 800, 330);
  this.floor = new Block(this.newGame, false, 0, 0, 0.3, 0.3);
}


StatScreen.prototype = {
  preload: function() {
    this.floor.preload();
    this.exit.preload();
  },

  create: function() {

    this.newGame.fixedBugs += this.game.fixedBugs;
    this.newGame.player.fixedBugs += this.game.player.fixedBugs;
    this.newGame.player.coffee += this.game.player.coffee;
    this.floor.create();
    var text = "Level Stats" 
             + "\n Level:" + this.currentLevel
             + "\n Bugs fixed:" + this.game.fixedBugs + "/" + this.game.bugs
             + "\n Total Coffee found:" + this.game.player.coffee
             + "\n Total Bugs fixed:" + this.game.player.fixedBugs;
    var style = { font: "24px Arial", fill: "#ff0044", align: "center" };

    var t = this.newGame.add.text(this.newGame.world.centerX - 100, 20, text, style);
    this.currentLevel -= 1;
    this.exit.create();

  },

  update: function() {
    this.floor.update();
    this.exit.update();
  }
}

module.exports = StatScreen;