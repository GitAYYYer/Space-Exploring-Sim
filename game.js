function update() {
    let prettyInventoryText = "";
    Object.entries(Inventory).map(([key, value]) => {
        prettyInventoryText += `${Inventory[key]['name']} - x${Inventory[key]['qty']}\n`;
    });
    this.InventoryText = this.InventoryText.setText(prettyInventoryText);
}

function listener (pointer, gameObject) {
    // Get random resource to add to inventory
    let randomType = Math.floor(Math.random() * planetTypeData.length);
    let randomResourceNumber = Math.floor(Math.random() * planetTypeData[randomType]['resources'].length);
    let resourceName = planetTypeData[randomType]['resources'][randomResourceNumber];

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
            qty: 0
        }
        Inventory.push(newResource);
    }

    console.log(JSON.stringify(Inventory, null, 2));

    gameObject.angle += 10;

}

export { update, listener };