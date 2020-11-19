class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "mainScene"});
    }

    preload() {
        this.load.image('button', 'assets/button.png');
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }

    create() {
        this.initialiseSolarSystem();

        let i = 0;
        for (const planet of OrbitingPlanets) {
            this.incrementButton = new TextButton(this, this.game.config.width * 0.6, this.game.config.height * 0.1 + i, planet, {fill: '#0f0'}, () => this.planetSelected(planet));
            this.add.existing(this.incrementButton);
            i += 15;
        }

        this.gatherResourceButton = new TextButton(this, this.game.config.width * .1, this.game.config.height * 0.1, 'Gather Resource', {fill: '#0f0'}, () => this.gatherResource());
        this.add.existing(this.gatherResourceButton);

        this.currentPlanetText = this.add.text(this.game.config.width * .3, this.game.config.height * 0.1, "CurrentPlanet");
        this.add.existing(this.gatherResourceButton);

        this.InventoryText = this.add.text(this.game.config.width * .75, this.game.config.height * 0.1, Inventory);

        this.currentPlanetText = this.currentPlanetText.setText('Earth');

        textbox = createTextBox(this, this.game.config.width / 3, this.game.config.height / 2, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
        });
        textbox.start(content, 50);
    }

    initialiseSolarSystem() {
        //setting this solar system to milky way
        CurrentSolarSystemName = 'Milky Way';
        console.log(SolarSystemData);
        Object.entries(SolarSystemData[CurrentSolarSystemName].planets).map(([key, value]) => {
            OrbitingPlanets.push(value);
        });
        CurrentPlanet = PlanetData['Earth'];
    }

    planetSelected(planetName) {
        CurrentPlanet = PlanetData[planetName];

        this.currentPlanetText = this.currentPlanetText.setText(planetName);
    }

    async gatherResource() {
        content = 'stop mining my shit you cunt fuck off bitch did i say you could mine me like that no fuck off go to a different planet this is bullshit you dont deserve to mine here go suckle someone elses resources you shit cunt fuck you stupid think about what youve done';
        textbox.start(content, 50);

        let planet = CurrentPlanet;

        let resourceName;
        let randomResourceNumber = Math.floor(Math.random() * PlanetTypeData[planet.type]['resources'].length);
        resourceName = PlanetTypeData[planet.type]['resources'][randomResourceNumber];

        // Check if inventory contains that resource
        let newResourceAdded = false;
        Object.entries(Inventory).map(([key, value]) => {
            if (Inventory[key]['name'] == resourceName) {
                Inventory[key]['qty'] += 1;
                newResourceAdded = true;
            }
        });

        // If resource has not been added yet, create a new entry in the inventory.
        if (!newResourceAdded) {
            let newResource = {
                name: resourceName,
                qty: 1
            };
            Inventory.push(newResource);
        }

        //Inventory UI
        let prettyInventoryText = "";
        Object.entries(Inventory).map(([key, value]) => {
            prettyInventoryText += `${Inventory[key]['name']} - x${Inventory[key]['qty']}\n`;
        });
        this.InventoryText = this.InventoryText.setText(prettyInventoryText);
    }

    update() {
    }
}

//textbox plugin stolen from https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-textbox/
//how to encapsulate this
const COLOR_PRIMARY = 0x000000;
const COLOR_LIGHT = 0x00FF00;
const COLOR_DARK = 0x000000;

var content = 'cunt';
var textbox;

const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT),

        icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
        text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10,
            text: 10,
        }
    })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
            width: wrapWidth
        },
        maxLines: 3
    })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}