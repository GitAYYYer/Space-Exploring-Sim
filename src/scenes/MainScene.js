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
            console.log(planet);
            this.incrementButton = new TextButton(this, this.game.config.width * 0.6, (this.game.config.height  * 0.1) + i, planet, {fill: '#0f0'}, () => console.log(planet));
            this.add.existing(this.incrementButton);
            i += 15;
        }

        this.gatherResourceButton = new TextButton(this, 100, 150, 'Gather Resource', {fill: '#0f0'}, () => this.gatherResource());
        this.add.existing(this.gatherResourceButton);

        this.InventoryText = this.add.text(this.game.config.width * .75, (this.game.config.height  * 0.1), Inventory);
        console.log(this.game.config.width);
    }

    initialiseSolarSystem() {
        //setting this solar system to milky way
        CurrentSolarSystemName = 'Milky Way';
        for (var value of SolarSystemData) {
            if (CurrentSolarSystemName === value.name) {
                console.log("true");
                Object.entries(value.planets).map(([key, value]) => {
                    OrbitingPlanets.push(value);
                });
            }
        }
    }

    planetSelected(planetName) {
        console.log("You selected: " + planetName);
    }

    gatherResource() {
        // Get random resource to add to inventory
        let randomType = Math.floor(Math.random() * PlanetTypeData.length);
        let randomResourceNumber = Math.floor(Math.random() * PlanetTypeData[randomType]['resources'].length);
        let resourceName = PlanetTypeData[randomType]['resources'][randomResourceNumber];

        // Check if inventory contains that resource
        console.log(`Found ${resourceName}`);
        let newResourceAdded = false;
        Object.entries(Inventory).map(([key, value]) => {
            if (Inventory[key]['name'] == resourceName) {
                console.log("GOT EM");
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

        console.log(JSON.stringify(Inventory, null, 2));

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