var phaserContainer = document.getElementById('phaser');
// var game = new Phaser.Game(phaserContainer.scrollWidth, phaserContainer.scrollHeight, Phaser.AUTO, phaserContainer, {}, true);

window.addEventListener('resize', function () {
	game.renderer.resize(phaserContainer.scrollWidth, phaserContainer.scrollHeight);
});
