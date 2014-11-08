var phaserContainer = document.getElementById('phaser');
var game = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, { preload: preload, create: create, update: update }, true);

var player = null;
var level = null;

function preload() {

  player = new Player(game);
  player.preload();

}

function create() {
  player.create();
}

function update() {

}

window.addEventListener('resize', function () {
  game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
