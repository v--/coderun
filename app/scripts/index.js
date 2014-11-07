var game = new Phaser.Game(document.body.scrollWidth, document.body.scrollHeight);

window.addEventListener('resize', function (event) {
    game.renderer.resize(document.body.scrollWidth, document.body.scrollHeight)
});
