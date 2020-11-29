let textbox;

class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "MainScene"});
    }

    preload() {
        this.load.image('button', 'assets/button.png');
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');

        this.loadLocalStorageData();
        //temp, this should be load in from save or only run if no save is detected
    }

    create() {
        this.emitter = EventDispatcher.getInstance();
        this.setListeners();

        this.createWindow(InventoryScene);
        this.createWindow(CraftingScene);
        this.createWindow(TravelScene);

        this.gatherResourceButton = new TextButton(this, this.game.config.width / 2.7, this.game.config.height / 1.5, fancyPlanet, {fill: '#0f0'}, () => this.gatherResource());
        this.add.existing(this.gatherResourceButton);

        textbox = new Textbox(this, this.game.config.width / 3, this.game.config.height / 2, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
        });
        this.textBoxWrite('cunt');

        // Button to transition to skill tree scene
        this.skillTreeButton = new TextButton(this, this.game.config.width * .1, 400, 'Open Skill Tree', {fill: '#0f0'}, () => this.openSkillTree());
        this.add.existing(this.skillTreeButton);

        // Button to fish
        this.fishingButton = new TextButton(this, this.game.config.width * .1, 600, 'Start Fishing', {fill: '#0f0'}, () => this.startFishing());
        this.add.existing(this.fishingButton);

        GenerateGalaxy();
    }

    setListeners() {
        this.emitter.on('writeToTextBox', this.textBoxWrite.bind(this));
    }

    openSkillTree() {
        this.createWindow(SkillTreeScene);
    }

    startFishing() {
        this.scene.setActive(false);
        this.scene.setVisible(false);
        this.createWindow(FishingScene);
    }

    textBoxWrite(content) {
        textbox.start(content, 20);
    }

    gatherResource() {
        let content = 'stop mining my shit you cunt fuck off bitch did i say you could mine me like that no fuck off go to a different planet this is bullshit you dont deserve to mine here go suckle someone elses resources you shit cunt fuck you stupid think about what youve done';
        this.textBoxWrite(content);

        let resourceName = '';

        let rand = Math.random();
        let found = false;
        let tempTotal = 0;
        //todo: this needs to be made more efficient probably
        Object.entries(PlanetTypeData[CurrentPlanet.type].resources).map(([key, value]) => {
            tempTotal += value[1];
            if (rand <= tempTotal && found === false) {
                resourceName = value[0];
                found = true;
            }
        });

        //debug
        for (let i = 0; i < 50; i++) {
            PutInInventory(resourceName);
        }
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

    loadLocalStorageData() {
        localStorage.setItem('PlayerData', JSON.stringify({
            PlayerData: {
                ShipPlayerUpgrades: {
                    'Proper Ship': {
                        currentLevel: 1
                    },
                    'Guns': {
                        currentLevel: 1
                    }
                },
                Fishing: {
                    currentLevel: 1
                }
            }
        }));
        let localStorageData = JSON.parse(localStorage.getItem('PlayerData'));
        // let localStorageData = JSON.parse(localStorage.getItem('PlayerData'));
        
        // localStorageData is only 1 key, but you loop over the many keys that are in PlayerData.
        Object.entries(localStorageData['PlayerData']).map(([dataKey, dataValue]) => {
            if (dataKey === 'ShipPlayerUpgrades') {
                ShipPlayerUpgrades = localStorageData['PlayerData'][dataKey];
            }
        });
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
    ' oOO                 click  me                   OOo\n' +
    '  oOO                to gather                  OOo\n' +
    '   oOO                                         OOo\n' +
    '    oOO                                       OOo\n' +
    '      oOO                                   OOo\n' +
    '        oO                                OOo\n' +
    '           oOO                         OOo\n' +
    '               oOO                 OOo\n' +
    '                   ooo OOO OOO ooo';
