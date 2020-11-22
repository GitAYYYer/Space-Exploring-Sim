class SkillTreeScene extends Phaser.Scene {
    constructor() {
        super({key: "SkillTreeScene"});
    }

    preload() {
        this.load.script('cytoscape', 'node_modules/cytoscape/dist/cytoscape.min.js');

        // Create div for cytoscape graph and attach to Phaser.
        var div = document.createElement("div");
        div.className = "nodeGraph";
        div.id = "htmlDiv";
        div.style = `width: ${this.game.config.width * .8}px; height: ${this.game.config.height * .8}px; background-color: white;`;
        this.add.dom(this.game.config.width / 2, this.game.config.height / 2, div);
    }

    create() {
        this.mainSceneButton = new TextButton(this, this.game.config.width * .15, this.game.config.height * 0.08, 'Back to MainScene', {fill: '#0f0'}, () => this.backToMainScene());
        this.add.existing(this.mainSceneButton);

        // Loop through ShipUpgradeData, for each key make it a node, and connect the node to relevant dependencies.
        // Upgrades will be used as nodes in cytoscape.
        let upgrades = {};
        let nodes = [];
        let edges = [];
        Object.entries(ShipUpgradeData).map(([outerKey, outerValue]) => {
            // First, create the node and add it to upgrades.
            let node = {};
            node.data = {
                id: `${outerKey}`
            };
            nodes.push(node)

            // Next, for each dependency, create a new object. It's an array, so you just have the index.
            // Note*: Need better id's. Id is upgrade + upgrade, so it'll be e.g. 'Warp Range + Speed 1'.
            Object.entries(ShipUpgradeData[outerKey]['dependencies']).map(([dependencyIndex]) => {
                let dependencyEdge = {};
                dependencyEdge.data = {
                    id: `${outerKey} + ${ShipUpgradeData[outerKey]['dependencies'][dependencyIndex]}`,
                    source: `${ShipUpgradeData[outerKey]['dependencies'][dependencyIndex]}`,
                    target: `${outerKey}`
                }
                
                edges.push(dependencyEdge);
            });
        });
        upgrades.nodes = nodes;
        upgrades.edges = edges;

        console.log(JSON.stringify(upgrades, null, 2));

        var cy = cytoscape({
            container: document.getElementById("htmlDiv"),

            elements: upgrades,

            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            
            layout: {
                name: 'breadthfirst',
                rows: 2
            }
        });

        // Properties for the cy graph.
        cy.autolock(true);
        cy.zoom({ level: 1.0, renderedPosition: { x: 0, y: 0 } });
        cy.on('click', 'node', e => this.checkDependencies(e));
    }

    update() {
        
    }

    backToMainScene() {
        this.scene.remove('SkillTreeScene');
        this.scene.resume('MainScene');
    }

    // Function to check that before purchasing an upgrade, you have bought the prereqs necessary.
    checkDependencies(e) {
        let dependencyNodes = e.target.predecessors().nodes().map(node => node.data().id);

        // For each dependency node, check if player can afford to buy the upgrade.
        let dependenciesMet = true;
        Object.keys(dependencyNodes).map(nodeIndex => {
            let upgradeName = dependencyNodes[nodeIndex];

            if (!this.isAffordable(upgradeName)) {
                dependenciesMet = false;
            }
        });

        if (dependenciesMet) {
            ShipPlayerUpgrades[e.target.id()] = {
                currentLevel: 1
            };
            e.target.predecessors().edges().animate({
                style: {
                    lineColor: "red"
                }
            });
            e.target.style({
                'background-color': 'lime'
            });
        } else {
            console.log("Please buy the previous upgrades.");
        }
    }

    isAffordable(upgradeName) {
        for (const resource of ShipUpgradeData[upgradeName].cost) {
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
}