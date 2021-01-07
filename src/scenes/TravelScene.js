class TravelScene extends Phaser.Scene {
    constructor() {
        super({key: 'TravelScene'});
    }

    create() {
        this.emitter = EventDispatcher.getInstance();
        this.setListeners();

        this.travelPlanetTitleText = this.add.text(this.game.config.width * .6, this.game.config.height * 0.08, 'Travel');
        this.currentPlanetTitleText = this.add.text(this.game.config.width * .3, this.game.config.height * 0.08, 'Current Planet');
        this.currentPlanetText = this.add.text(this.game.config.width * .3, this.game.config.height * 0.1, "CurrentPlanet");

    }

    setListeners() {
        this.emitter.on('updateCurrentPlanetUI', this.updateCurrentPlanetUI.bind(this));
        this.emitter.on('updatePlanetListUI', this.updatePlanetListUI.bind(this));
    }

    updateCurrentPlanetUI(planetName) {
        console.log('updating planet name ui');
        this.currentPlanetText = this.currentPlanetText.setText(planetName + '\nType: ' + CurrentSolarSystem[planetName].type );
    }

    updatePlanetListUI() {
        if (this.incrementButton !== undefined) {
            this.incrementButton.destroy();
        }
        let i = 0;
        // for (const planet of OrbitingPlanets) {
        //     this.incrementButton = new TextButton(this, this.game.config.width * 0.6, this.game.config.height * 0.1 + i, planet, {fill: '#0f0'}, () => PlanetSelected(planet));
        //     this.add.existing(this.incrementButton);
        //     i += 15;
        // }
        Object.entries(CurrentSolarSystem).map(([key, value]) => {
            this.incrementButton = new TextButton(this, this.game.config.width * 0.6, this.game.config.height * 0.1 + i, key, {fill: '#0f0'}, () => PlanetSelected(key));
                this.add.existing(this.incrementButton);
                i += 15;
        });
    }

    updateGalaxyListUI() {
        if (this.incrementButton !== undefined) {
            this.incrementButton.destroy();
        }
        let i = 0;
        for (const system of CurrentGalaxy) {
            this.incrementButton = new TextButton(this, this.game.config.width * 0.6, this.game.config.height * 0.1 + i, system, {fill: '#0f0'}, () => PlanetSelected(system));
            this.add.existing(this.incrementButton);
            i += 15;
        }
    }
}