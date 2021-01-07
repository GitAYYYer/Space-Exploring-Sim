class CraftingScene extends Phaser.Scene {

    constructor() {
        super({key:'CraftingScene'});
    }

    create() {
        this.displayRecipes();
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
            this.craftingButton = new TextButton(this, this.game.config.width * 0.45, this.game.config.height * 0.1 + i, recipe, {fill: '#0f0'}, () => Craft(recipe));
            this.add.existing(this.craftingButton);
            i += 15;
        }
    }
}
