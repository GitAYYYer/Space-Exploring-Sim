function update() {
    this.InventoryText = this.InventoryText.setText(Inventory);
}

function listener (pointer, gameObject) {
    // console.log(`You clicked on ${JSON.stringify(gameObject,null,2)}`);

    // Inventory += `${1}\n`;
    let randomType = Math.floor(Math.random() * planetTypeData.length);
    let randomResourceNumber = Math.floor(Math.random() * planetTypeData[randomType]['resources'].length);
    let resourceName = planetTypeData[randomType]['resources'][randomResourceNumber];
    console.log(randomType);
    console.log(randomResourceNumber);
    console.log(resourceName);
    Inventory += `${resourceName}\n`;
    //let resource = CurrentPlanet.resources[0];
    //console.log(resource);
    //Inventory[resource].Quantity += 1;
    gameObject.angle += 10;

}

export { update, listener };