function update() {
    let prettyInventoryText = "";
    Object.entries(Inventory).map(([key, value]) => {
        prettyInventoryText += `${Inventory[key]['name']} - x${Inventory[key]['qty']}\n`;
    });
    this.InventoryText = this.InventoryText.setText(prettyInventoryText);

    let prettyPlanetText = "";
    Object.entries(OrbitingPlanets).map(([key, value]) => {
        // prettyPlanetText += `${OrbitingPlanets[key]}\n`;
        var planet = new Phaser.GameObjects.Text(this.centerX * 0.9, this.centerY * 0.1, OrbitingPlanets[key]);
    });
    this.PlanetsText = this.PlanetsText.setText(prettyPlanetText);
    this.SystemText = this.SystemText.setText(CurrentSolarSystemName);
}

function listener(pointer, gameObject) {
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

    for (var i = 0; i < OrbitingPlanets.length; i++) {
        this.textArray[i] = this.game.add.text(this.game.world.centerX, 150 + i * 20, this.OrbitingPlanets[i].text);
        this.textArray[i].name = 'text' + i;
        this.textArray[i].inputEnabled = true;
        this.textArray[i].events.onInputDown.add(this.dialogueNext, this);
    }

    // If resource has not been added yet, create a new entry in the inventory.
    if (!newResourceAdded) {
        let newResource = {
            name: resourceName,
            qty: 1
        }
        Inventory.push(newResource);
    }

    console.log(JSON.stringify(Inventory, null, 2));

    gameObject.angle += 10;

}

export {update, listener};