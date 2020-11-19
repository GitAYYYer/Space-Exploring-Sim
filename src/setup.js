function preload() {
}

function create() {

}

var config = {
    type: Phaser.AUTO,
    parent: canvasContainer,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    // width: 1000,
    // height: 500,
    scene: [ MainScene, SkillTreeScene ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    }
};
var game = new Phaser.Game(config);