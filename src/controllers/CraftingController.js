function IsCraftable(item) {
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

function Craft(item) {
    let emitter = EventDispatcher.getInstance();
    console.log(item);
    if (IsCraftable(item)) {
        //taking away the cost from the player
        for (const resource of CraftingRecipes[item].requirement) {
            Inventory.set(resource[0], parseInt(Inventory.get(resource[0]) - resource[1]));
        }
        console.log('made a ' + item + '!');
        emitter.emit('writeToTextBox', item + ' crafted');
        emitter.emit('updateInventoryUI');

        PutInInventory(item);
    } else {
        // this.scene.get('MainScene').textboxWrite('Can\'t afford this idiot');
        emitter.emit('writeToTextBox', 'Can\'t afford this idiot');

    }
}