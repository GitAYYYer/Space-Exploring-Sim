class CraftingScene extends Phaser.Scene {

    constructor() {
        super({key:'CraftingScene'});
    }

    create() {
        this.displayRecipes();
    }

    isCraftable(item) {
        console.log(Inventory);
        for (const resource of CraftingRecipes[item].requirement) {
            if (Inventory.has(resource[0])) {
                if (Inventory.get(resource[0]) < resource[1]) {
                    return false;
                }
            } else {
                console.log('Missing ' + resource);
                return false;
            }
        }
        return true;
    }

    craft(item) {
        console.log(item);
        if (this.isCraftable(item)) {
            //taking away the cost from the player
            for (const resource of CraftingRecipes[item].requirement) {
                Inventory.set(resource[0], parseInt(Inventory.get(resource[0]) - resource[1]));
            }
            console.log('made a ' + item + '!');
            this.scene.get('MainScene').textboxWrite('You made a ' + item);
            this.scene.get('InventoryScene').updateInventoryUI();
            this.scene.get('InventoryScene').putInInventory(item);
        } else {
            this.scene.get('MainScene').textboxWrite('Can\'t afford this idiot');
        }
    }

    displayRecipes() {
        let recipes = [];
        Object.entries(CraftingRecipes).map(([key, value]) => {
            recipes.push(key);
        });

        let i = 0;
        for (const recipe of recipes) {
            console.log(recipe);
            this.craftingTitle = this.add.text(this.game.config.width * .45, this.game.config.height * 0.08, "Crafting");
            this.craftingButton = new TextButton(this, this.game.config.width * 0.45, this.game.config.height * 0.1 + i, recipe, {fill: '#0f0'}, () => this.craft(recipe));
            this.add.existing(this.craftingButton);
            i += 15;
        }
    }

}
