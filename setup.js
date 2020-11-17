import { update, listener } from './game.js';

function preload() {
    // Loads files into the game for use later, does not actually render
    this.centerX = game.config.width/2;
    this.centerY = game.config.height/2;
    this.load.image('button', 'assets/button.png');
    // for (let i = 1; i < 7; i++) {
    //     this.load.image(`${i}`, `assets/${i}.png`);
    // }

    ProgressBar = this.add.graphics();
    ProgressBox = this.add.graphics();
    ProgressBar.fillStyle(0xffffff, 0.5);
    ProgressBox.fillRect(240, 270, 400, 50);
}

function create() {
    var image = this.add.sprite(this.centerX, this.centerY, 'button');
    image.setName('button');
    this.text = this.add.text(300, 200, Counter);

    // for (let i = 1; i < 7; i++) {
    //     this.load.image(`${i}`, `assets/${i}.png`);
    //     let currentTab = this.add.sprite(120, (i - 1)*125+60, `${i}`);
    //     currentTab.setName(i);
    //     currentTab.setInteractive();
    // }

    image.setInteractive();
    this.input.on('gameobjectdown', listener);

    var myText = new Phaser.GameObjects.Text(this, 100, 100, "HELLO");
    this.add.text(100, 100, myText.text);
    this.InventoryText = this.add.text(this.centerX * 1.8, this.centerY * 0.1, Inventory);
}

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};
var game = new Phaser.Game(config);