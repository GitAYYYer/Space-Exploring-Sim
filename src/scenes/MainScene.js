var content = 'cunt';
var textbox;
var crafting;

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
        crafting = new Crafting(this);

        this.travelPlanetTitleText = this.add.text(this.game.config.width * .6, this.game.config.height * 0.08, 'Travel');
        let i = 0;
        for (const planet of OrbitingPlanets) {
            this.incrementButton = new TextButton(this, this.game.config.width * 0.6, this.game.config.height * 0.1 + i, planet, {fill: '#0f0'}, () => this.planetSelected(planet));
            this.add.existing(this.incrementButton);
            i += 15;
        }


        this.gatherResourceButton = new TextButton(this, this.game.config.width * .1, this.game.config.height * 0.1, 'Gather Resource', {fill: '#0f0'}, () => this.gatherResource());
        this.add.existing(this.gatherResourceButton);

        this.currentPlanetTitleText = this.add.text(this.game.config.width * .3, this.game.config.height * 0.08, 'Current Planet');
        this.currentPlanetText = this.add.text(this.game.config.width * .3, this.game.config.height * 0.1, "CurrentPlanet");
        // this.add.existing(this.gatherResourceButton);

        this.InventoryTitleText = this.add.text(this.game.config.width * .75, this.game.config.height * 0.08, 'Inventory');
        this.InventoryText = this.add.text(this.game.config.width * .75, this.game.config.height * 0.1, Inventory);

        this.currentPlanetText = this.currentPlanetText.setText('Earth');

        textbox = new Textbox(this, this.game.config.width / 3, this.game.config.height / 2, {
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

        let resourceName = '';

        let rand = Math.random();
        let found = false;
        let tempTotal = 0;
        Object.entries(PlanetTypeData[CurrentPlanet.type].resources).map(([key, value]) => {
            tempTotal += value[1];
            if (rand <= tempTotal && found === false) {
                resourceName = value[0];
                found = true;
            }
        });

        // Check if inventory contains that resource
        if (Inventory.has(resourceName)) {
            Inventory.set(resourceName,Inventory.get(resourceName) + 1);
        } else {
            Inventory.set(resourceName, 1);
        }

        //Inventory UI
        let prettyInventoryText = "";
        Inventory.forEach((values, keys) => {
            prettyInventoryText += values + "x " + keys + '\n';
        });

        this.InventoryText = this.InventoryText.setText(prettyInventoryText);
    }

    update() {
    }
}
