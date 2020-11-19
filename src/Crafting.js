let scene;

class Crafting {

    constructor(scene) {
        this.scene = scene;
        this.displayRecipes(scene);
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
            this.updateInventoryUI();
        }
    }

    displayRecipes(scene) {
        let recipes = [];
        Object.entries(CraftingRecipes).map(([key, value]) => {
            recipes.push(key);
        });

        let i = 0;
        for (const recipe of recipes) {
            console.log(recipe);
            scene.craftingTitle = scene.add.text(scene.game.config.width * .45, scene.game.config.height * 0.08, "Crafting");
            scene.craftingButton = new TextButton(scene, scene.game.config.width * 0.45, scene.game.config.height * 0.1 + i, recipe, {fill: '#0f0'}, () => this.craft(recipe));
            scene.add.existing(scene.craftingButton);
            i += 15;
        }
    }

    updateInventoryUI() {
        let prettyInventoryText = "";
        Inventory.forEach((values, keys) => {
            prettyInventoryText += values + "x " + keys + '\n';
        });

        this.scene.InventoryText = this.scene.InventoryText.setText(prettyInventoryText);
    }
}
