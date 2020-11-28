function preload() {
}

function create() {

}

var config = {
    type: Phaser.AUTO,
    parent: canvasContainer,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    navWidth: (window.innerWidth * window.devicePixelRatio) * 0.2,
    centerWithNav: (window.innerWidth * window.devicePixelRatio) - ((window.innerWidth * window.devicePixelRatio) * 0.2) / 2,
    scene: [ MainScene, SkillTreeScene, NavScene ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    }
};
var game = new Phaser.Game(config);