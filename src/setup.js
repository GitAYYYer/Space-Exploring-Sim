function preload() {
    // Loads files into the game for use later, does not actually render
    CenterX = game.config.width/2;
    CenterY = game.config.height/2;
    console.log(CenterX + " " + game.config.width/2)
}

function create() {

}

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    scene: [ MainScene ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};
var game = new Phaser.Game(config);