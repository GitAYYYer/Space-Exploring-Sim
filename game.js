function update() {
    this.InventoryText = this.InventoryText.setText(Inventory);
}

function listener (pointer, gameObject) {
    console.log(`You clicked on ${JSON.stringify(gameObject,null,2)}`);

        // Inventory += `${Counter}\n`;
        //let resource = CurrentPlanet.resources[0];
        //console.log(resource);
        //Inventory[resource].Quantity += 1;
        gameObject.angle += 10;

}

export { update, listener };