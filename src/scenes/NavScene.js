let navWidth;

class NavScene extends Phaser.Scene {
    constructor() {
        super({key: "NavScene"});

    }

    preload() {
        this.load.image('1', 'assets/1.png');
    }

    create() {
        navWidth = this.game.config.width * 0.2;

        this.planetAscii = this.add.text(this.game.config.width / 3, this.game.config.height / 1.5, fancyPlanet);

        this.travelPlanetTitleText = this.add.text(this.game.config.width * .6, this.game.config.height * 0.08, 'Travel');

        this.graphics = this.add.graphics();

        this.graphics.lineStyle(2, 0x00FF00, 1);

        //  32px radius on the corners
        this.graphics.strokeRect(0, 0, navWidth, this.game.config.height);
    }

}