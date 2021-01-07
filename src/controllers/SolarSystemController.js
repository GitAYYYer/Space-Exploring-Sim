function GenerateSolarSystem(seed) {
    let emitter = EventDispatcher.getInstance();

    //make sure you are using nextFloat and not next
    let rand;
    if (seed !== undefined)
        rand = new Random(seed);
    else
        rand = new Random(Math.random() * 100);
    //Generate number of planets
    //todo: Maybe variety from 3 to 15, using gaussian/normal distribution so that towards either the min or max are less common.
    //For each planet
    //  Core:
    //  Generate the type
    //  Visuals:
    //  Generate the size
    //  Generate the colour (to an extent depending on the type)
    //  Generate the Position
    //todo: ensure the player will never get trapped (end up in a solar system that they can't get out of) this will depend on how we implement that stuff anyway, might not even be here.

    let numberOfPlanets = Math.floor(rand.nextFloat() * (Config.SolarSystem.maxPlanets - Config.SolarSystem.minPlanets) + Config.SolarSystem.minPlanets);
    console.log('Number of planets: ' + numberOfPlanets);
    for (let i = 0; i < numberOfPlanets; i++) {
        let planetSeed = Math.floor(rand.next());
        let planetRand = new Random(planetSeed);
        planetRand.nextFloat();

        //number that will decide the planet's type
        let t = planetRand.nextFloat();
        let typeSeed = Math.floor(t * Object.keys(PlanetTypeData).length);
        let planetType = PickRandomJsonObjKey(PlanetTypeData, typeSeed);
        let planetName = Namegen(1, planetSeed)[0];

        CurrentSolarSystem[planetName] = {
                name: planetName,
                seed: planetSeed,
                type: planetType
        };

        //TEMP: this will make the last generated planet the one you start on
        //todo: this only sets the name, so you can't mine on this planet until u switch off and on.
        //should run PlanetSelect on it, but if it's a planet type that the player can't get to then
        //there won't be a home planet
        CurrentPlanet = planetName;
    }

    Object.entries(CurrentSolarSystem).map(([key, value]) => {
        console.log('k: ' + key + ' v: ' + JSON.stringify(value));
    });

    emitter.emit('updateCurrentPlanetUI', CurrentPlanet);
    emitter.emit('updatePlanetListUI');
    // console.log(CurrentSolarSystem);
}