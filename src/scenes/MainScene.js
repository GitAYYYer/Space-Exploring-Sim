class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "MainScene"});
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

        textbox = new Textbox(this, this.game.config.width / 3, this.game.config.height / 2, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
        });
        textbox.start(content, 50);

        // Button to transition to skill tree scene
        this.skillTreeButton = new TextButton(this, this.game.config.width * .1, 400, 'Open Skill Tree', {fill: '#0f0'}, () => this.openSkillTree());
        this.add.existing(this.skillTreeButton);
    }

    openSkillTree() {
        this.scene.start('SkillTreeScene');
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

    gatherResource() {
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

var content = 'cunt';
var textbox;