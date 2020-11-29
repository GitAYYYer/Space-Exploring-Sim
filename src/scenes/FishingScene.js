var fishReady = false;
var startTime;

class FishingScene extends Phaser.Scene {
    constructor() {
        super({key: "FishingScene"});
    }

    preload() {
        this.load.image('waiting1', 'assets/fishing/waiting1.png');
        this.load.image('waiting2', 'assets/fishing/waiting2.png');
        this.load.image('waiting3', 'assets/fishing/waiting3.png');
        this.load.image('catch4', 'assets/fishing/catch4.png');
        this.load.image('noCatch4', 'assets/fishing/noCatch4.png');
        this.load.image('failedCatch', 'assets/fishing/failedCatch.png');
        this.load.image('successCatch', 'assets/fishing/successCatch.png');
    }

    create() {
        let context = this;

        this.mainSceneButton = new TextButton(this, this.game.config.width * .15, this.game.config.height * 0.05, 'Back to MainScene', {fill: '#0f0'}, () => this.backToMainScene());
        this.add.existing(this.mainSceneButton);

        // Create animation for waiting and play it immediately
        this.anims.create({
            key: 'fullWait',
            frames: [
                { key: 'waiting1' },
                { key: 'waiting2' },
                { key: 'waiting3' }
            ],
            frameRate: 1,
            repeat: -1
        });
        this.add.sprite(this.game.config.width/2, this.game.config.height/2, 'waiting1').play('fullWait');

        // Get random number of seconds for player to wait.
        let timeUntilFish = Math.random() * 5 + 2;
        console.log(timeUntilFish);

        setTimeout(function() {
            startTime = new Date().getTime();
            context.add.image(context.game.config.width/2, context.game.config.height/2, 'catch4');
            fishReady = true;
            console.log(`Fish Ready at ${startTime}`);
        }, timeUntilFish * 1000);
    }

    update() {
        // if (this.fishReadyImage !== undefined) {
        //     this.fishReadyImage.setInteractive();
        //     console.log('happened');
        //     this.fishReadyImage.on('clicked', this.handleFishClick, this);

        //     this.
        // }
        this.input.on('pointerup', (e) => this.handleFishClick(e));
    }

    backToMainScene() {
        this.scene.setVisible(true, 'MainScene');
        this.scene.setActive(true, 'MainScene');
        this.scene.remove();
    }

    handleFishClick(e) {
        if (fishReady) {
            let timeClicked = new Date().getTime();
            let timeTaken = timeClicked - startTime;
            console.log(`Took you ${timeTaken} milliseconds to click.`);

            if (timeTaken < 600) {
                console.log('You got the fish in time!');
                this.add.image(this.game.config.width/2, this.game.config.height/2, 'successCatch');
            } else {
                console.log('Boomer reactions lol');
                this.add.image(this.game.config.width/2, this.game.config.height/2, 'failedCatch');
            }

        } else {
            console.log('nice 1');
            this.add.image(this.game.config.width/2, this.game.config.height/2, 'failedCatch');
        }
    }
}