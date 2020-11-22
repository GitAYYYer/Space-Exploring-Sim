function PutInInventory(resourceName) {
    let emitter = EventDispatcher.getInstance();
    // Check if inventory contains that resource
    if (Inventory.has(resourceName)) {
        Inventory.set(resourceName, Inventory.get(resourceName) + 1);
    } else {
        Inventory.set(resourceName, 1);
    }

    emitter.emit("updateInventoryUI");
}