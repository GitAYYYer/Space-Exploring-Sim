function update() {
    this.text.setText(Counter);
}

function listener (pointer, gameObject) {
    console.log(`You clicked on ${JSON.stringify(gameObject,null,2)}`);

    if (ClickReady && gameObject.name == 'button') {
        Counter++;
        let resource = CurrentPlanet.resources[0];
        console.log(resource);
        //Inventory[resource].Quantity += 1;
        gameObject.angle += 10;
        var progress = 0;

    }
}

export { update, listener };