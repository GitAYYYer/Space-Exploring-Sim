function update() {
    this.text.setText(Counter);
    this.InventoryText = this.InventoryText.setText(Inventory);
}

function listener (pointer, gameObject) {
    // console.log(`You clicked on ${JSON.stringify(gameObject,null,2)}`);

    if (ClickReady && gameObject.name == 'button') {
        Counter++;
        Inventory += `${Counter}\n`;
        //let resource = CurrentPlanet.resources[0];
        //console.log(resource);
        //Inventory[resource].Quantity += 1;
        gameObject.angle += 10;

    }
}

export { update, listener };