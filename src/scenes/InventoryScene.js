class InventoryScene extends Phaser.Scene {
    constructor() {
        super({key: 'InventoryScene'});
    }

    create() {
        this.emitter = EventDispatcher.getInstance();
        this.setListeners();
        this.InventoryTitleText = this.add.text(this.game.config.width * .75, this.game.config.height * 0.08, 'Inventory');
        this.InventoryText = this.add.text(this.game.config.width * .75, this.game.config.height * 0.1, Inventory);
    }

    setListeners() {
        this.emitter.on('updateInventoryUI', this.updateInventoryUI.bind(this));
    }

    updateInventoryUI() {
        let prettyInventoryText = "";
        Inventory.forEach((values, keys) => {
            prettyInventoryText += values + "x " + keys + '\n';
        });

        this.InventoryText = this.InventoryText.setText(prettyInventoryText);
    }
}