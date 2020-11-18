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
            this.incrementButton = new TextButton(this, this.game.config.width * 0.6, this.game.config.height  * 0.1 + i, planet, {fill: '#0f0'}, () => this.planetSelected(planet));
            this.add.existing(this.incrementButton);
            i += 15;
        }

        this.gatherResourceButton = new TextButton(this, this.game.config.width * .1, this.game.config.height  * 0.1, 'Gather Resource', {fill: '#0f0'}, () => this.gatherResource());
        this.add.existing(this.gatherResourceButton);

        this.currentPlanetText = this.add.text( this.game.config.width * .3, this.game.config.height  * 0.1, "CurrentPlanet");
        this.add.existing(this.gatherResourceButton);

        this.InventoryText = this.add.text(this.game.config.width * .75, this.game.config.height  * 0.1, Inventory);
        console.log(this.game.config.width);

        this.currentPlanetText = this.currentPlanetText.setText('Earth');
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

        CurrentPlanet = 'Earth';
    }

    planetSelected(planetName) {
        console.log("You selected: " + planetName);
        CurrentPlanet = PlanetData[planetName];

        this.currentPlanetText = this.currentPlanetText.setText(planetName);
    }

    gatherResource() {
        // Get random resource to add to inventory
        // let randomType = Math.floor(Math.random() * PlanetTypeData.length);
        // console.log("planet type: " + PlanetData[CurrentPlanet]['type']);
        // console.log(CurrentPlanet);
        // console.log(PlanetData[CurrentPlanet]);

        let planet = this.getJSONByName(PlanetData, 'name','Earth');
        console.log("this is the planet: " + planet);
        this.getJSONByName(PlanetTypeData, 'type', planet.type);

        // let resourceName;
        // Object.entries(PlanetData).map(([key, value]) => {
        //     if (PlanetData[key]['name'] === CurrentPlanet) {
        //         console.log("GOT EM");
        //         Object.entries(PlanetTypeData).map(([key2, value]) => {
        //             if (PlanetTypeData[key2]['type'] === PlanetData[key]['type']) {
        //                 console.log("GOT EM");
        //                 let randomResourceNumber = Math.floor(Math.random() * PlanetTypeData[key2]['resources'].length);
        //                 resourceName = PlanetTypeData[key]['resources'][randomResourceNumber];
        //             }
        //         });
        //     }
        // });

        // for (let i in PlanetData) {
        //     console.log(CurrentPlanet);
        //     if (PlanetData[i].name === CurrentPlanet) {
        //         console.log("planet data: " + PlanetData[i]);
        //         for (let j in PlanetTypeData) {
        //             if (PlanetData[i].type === PlanetTypeData[PlanetData[i].name][type]) {
        //                 let randomResourceNumber = Math.floor(Math.random() * PlanetTypeData[j]['resources'].length);
        //                 resourceName = PlanetTypeData[j]['resources'][randomResourceNumber];
        //             }
        //         }
        //     }
        // }

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

    getJSONByName(array, keyName, name) {
        Object.entries(array).map(([key, value]) => {
            if (array[key][keyName] === name) {
                console.log(array[key]);
                return array[key];
            }
        });
    }

    update() {
    }
}