function InitialiseSolarSystem() {
    let emitter = EventDispatcher.getInstance();

    //setting this solar system to milky way
    CurrentSolarSystemName = 'Milky Way';
    console.log(SolarSystemData);
    Object.entries(SolarSystemData[CurrentSolarSystemName].planets).map(([key, value]) => {
        OrbitingPlanets.push(value);
    });
    CurrentPlanet = PlanetData['Earth'];

    emitter.emit('updateCurrentPlanetUI', CurrentPlanet.name);
    emitter.emit('updatePlanetListUI');

    console.log('Solar System Initialised');
}

function PlanetSelected(planetName) {
    let emitter = EventDispatcher.getInstance();

    let canTravel = false;
    if (CurrentSolarSystem[planetName].type === 'Fiery') {
        if (FrostResist < 1) {
            emitter.emit('writeToTextBox','Your ship cannot resist temperatures this hot fucking idiot');
        } else {
            canTravel = true;
        }
    } else if (CurrentSolarSystem[planetName].type === 'Frozen') {
        if (HeatResist < 1) {
            emitter.emit('writeToTextBox','Your ship cannot resist temperatures this cold fucking idiot');
        } else {
            canTravel = true;
        }
    } else {
        canTravel = true;
    }

    if (canTravel) {
        CurrentPlanet = CurrentSolarSystem[planetName];
        emitter.emit('writeToTextBox','You have travelled to ' + planetName);
        emitter.emit('updateCurrentPlanetUI',planetName);

    }


}