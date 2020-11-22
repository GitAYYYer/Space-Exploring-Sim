let textbox;

class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "MainScene"});
    }

    preload() {
        this.load.image('button', 'assets/button.png');
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');

        //temp, this should be load in from save or only run if no save is detected
        this.initialiseSolarSystem();
    }

    create() {
        this.emitter = EventDispatcher.getInstance();
        this.setListeners();

        this.travelPlanetTitleText = this.add.text(this.game.config.width * .6, this.game.config.height * 0.08, 'Travel');

        if (this.incrementButton !== undefined) {
            this.incrementButton.destroy();
        }
        let i = 0;
        for (const planet of OrbitingPlanets) {
            this.incrementButton = new TextButton(this, this.game.config.width * 0.6, this.game.config.height * 0.1 + i, planet, {fill: '#0f0'}, () => this.planetSelected(planet));
            this.add.existing(this.incrementButton);
            i += 15;
        }

        this.createWindow(InventoryScene);
        this.createWindow(CraftingScene);

        this.planetAscii = this.add.text(this.game.config.width / 2.7, this.game.config.height / 1.5, fancyPlanet);

        this.gatherResourceButton = new TextButton(this, this.game.config.width * .1, this.game.config.height * 0.1, 'Gather Resource', {fill: '#0f0'}, () => this.gatherResource());
        this.add.existing(this.gatherResourceButton);

        this.currentPlanetTitleText = this.add.text(this.game.config.width * .3, this.game.config.height * 0.08, 'Current Planet');
        this.currentPlanetText = this.add.text(this.game.config.width * .3, this.game.config.height * 0.1, "CurrentPlanet");
        // this.add.existing(this.gatherResourceButton);

        this.currentPlanetText = this.currentPlanetText.setText('Earth');

        textbox = new Textbox(this, this.game.config.width / 3, this.game.config.height / 2, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
        });
        this.textBoxWrite('cunt');

        // Button to transition to skill tree scene
        this.skillTreeButton = new TextButton(this, this.game.config.width * .1, 400, 'Open Skill Tree', {fill: '#0f0'}, () => this.openSkillTree());
        this.add.existing(this.skillTreeButton);
    }

    setListeners() {
        this.emitter.on('writeToTextBox', this.textBoxWrite.bind(this));
    }

    openSkillTree() {
        this.scene.start('SkillTreeScene');
    }

    textBoxWrite(content) {
        textbox.start(content, 20);
    }

    initialiseSolarSystem() {
        //setting this solar system to milky way
        CurrentSolarSystemName = 'Milky Way';
        console.log(SolarSystemData);
        Object.entries(SolarSystemData[CurrentSolarSystemName].planets).map(([key, value]) => {
            OrbitingPlanets.push(value);
        });
        CurrentPlanet = PlanetData['Earth'];
    }

    planetSelected(planetName) {
        let canTravel = false;
        if (PlanetData[planetName].type === 'Fiery') {
            if (FrostResist < 1) {
                this.textBoxWrite('Your ship cannot resist temperatures this hot fucking idiot');
            } else {
                canTravel = true;
            }
        } else if (PlanetData[planetName].type === 'Frozen') {
            if (HeatResist < 1) {
                this.textBoxWrite('Your ship cannot resist temperatures this cold fucking idiot');
            } else {
                canTravel = true;
            }
        } else {
            canTravel = true;
        }

        if (canTravel) {
            CurrentPlanet = PlanetData[planetName];
            this.currentPlanetText = this.currentPlanetText.setText(planetName);
            textbox.start('You have travelled to ' + planetName);
        }
    }

    gatherResource() {
        let content = 'stop mining my shit you cunt fuck off bitch did i say you could mine me like that no fuck off go to a different planet this is bullshit you dont deserve to mine here go suckle someone elses resources you shit cunt fuck you stupid think about what youve done';
        this.textBoxWrite(content);

        let resourceName = '';

        let rand = Math.random();
        let found = false;
        let tempTotal = 0;
        Object.entries(PlanetTypeData[CurrentPlanet.type].resources).map(([key, value]) => {
            tempTotal += value[1];
            if (rand <= tempTotal && found === false) {
                resourceName = value[0];
                found = true;
            }
        });

        PutInInventory(resourceName);
    }

    update() {
    }

    createWindow (func)
    {
        let handle = 'window' + this.count++;
        let win = this.add.zone(0,0, func.WIDTH, func.HEIGHT);
        let demo = new func(handle, win);
        this.scene.add(handle, demo, true);
    }
}

let fancyPlanet =
    '                   ooo OOO OOO ooo\n' +
    '               oOO                 OOo\n' +
    '           oOO                         OOo\n' +
    '        oOO                               OOo\n' +
    '      oOO                                   OOo\n' +
    '    oOO                                       OOo\n' +
    '   oOO                                         OOo\n' +
    '  oOO                                           OOo\n' +
    ' oOO                                             OOo\n' +
    ' oOO                                             OOo\n' +
    ' oOO           pretend this is a planet          OOo\n' +
    ' oOO                 very cool                   OOo\n' +
    ' oOO                                             OOo\n' +
    '  oOO                                           OOo\n' +
    '   oOO                                         OOo\n' +
    '    oOO                                       OOo\n' +
    '      oOO                                   OOo\n' +
    '        oO                                OOo\n' +
    '           oOO                         OOo\n' +
    '               oOO                 OOo\n' +
    '                   ooo OOO OOO ooo'
