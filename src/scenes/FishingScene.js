class FishingScene extends Phaser.Scene {
    constructor() {
        super({key: "FishingScene"});
    }

    preload() {
        this.load.image('wait1', 'assets/fishing/waiting1.png');
        this.load.image('wait2', 'assets/fishing/waiting2.png');
        this.load.image('wait3', 'assets/fishing/waiting3.png');
        this.load.image('catch4', 'assets/fishing/catch4.png');
        this.load.image('noCatch4', 'assets/fishing/noCatch4.png');
    }

    create() {
        let image = this.add.image(200, 200, 'wait1');
    }

    update() {

    }
}