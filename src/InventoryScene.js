class InventoryScene extends Phaser.Scene {
    constructor() {
        super({key:'InventoryScene'});
    }

    preload() {

    }

    create() {
        this.InventoryTitleText = this.add.text(this.game.config.width * .75, this.game.config.height * 0.08, 'Inventory');
        this.InventoryText = this.add.text(this.game.config.width * .75, this.game.config.height * 0.1, Inventory);
    }

    putInInventory(resourceName) {
        // Check if inventory contains that resource
        if (Inventory.has(resourceName)) {
            Inventory.set(resourceName,Inventory.get(resourceName) + 1);
        } else {
            Inventory.set(resourceName, 1);
        }

        //Inventory UI
        let prettyInventoryText = "";
        Inventory.forEach((values, keys) => {
            prettyInventoryText += values + "x " + keys + '\n';
        });

        this.InventoryText = this.InventoryText.setText(prettyInventoryText);
    }


}