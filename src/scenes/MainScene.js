class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "mainScene"});
    }

    preload() {
        this.load.image('button', 'assets/button.png');
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