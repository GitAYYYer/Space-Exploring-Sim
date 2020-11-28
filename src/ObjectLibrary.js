const Config = {
    SolarSystem : {
        minPlanets: 3,
        maxPlanets: 15,
    },
    Galaxy : {
        numberOfSystems: 100,
    }
};

//todo: resources are different depending on mining/drill strength? e.g. drill strength of 3 can mine ores of strength 3 or less e.g. ['Diamond', 0.05, 4]
const ResourceData = {
    'Iron': {
        hardness: 1,
        type: 'gas'
    },
    'Ice': {
        hardness: 1,
        type: 'solid'
    },
    'Wood': {
        hardness: 1,
        type: 'solid'
    },
    'Oxygen': {
        hardness: 1,
        type: 'gas'
    },
    'Diamond': {
        hardness: 3,
        type: 'gas'
    },
    'Obsidian': {
        hardness: 3,
        type: 'solid'
    },
    'Victorian Bitter': {
        hardness: 1,
        type: 'liquid'
    },
    'Hydrogen': {
        hardness: 1,
        type: 'gas'
    },
    'Helium': {
        hardness: 1,
        type: 'gas'
    }
};

//IMPORTANT: currently resource drop rates need to be in order from rarest to most common
const PlanetTypeData = {
    Lush: {
        resources: [['Diamond', 0.05], ['Oxygen', 0.20], ['Wood', 0.75]]
    },
    Fiery: {
        resources: [['Obsidian', 0.3], ['Iron', 0.7]]
    },
    Frozen: {
        resources: [['Victorian Bitter', 0.01], ['Ice', 0.99]]
    },
    Gaseous: {
        resources: [['Hydrogen', 0.5], ['Helium', 0.5]]
    }
};

const ShipUpgradeData = {
    'Proper Ship': {
        name: 'Proper Ship',
        dependencies: [],
        maxLevel: 1,
        desc: 'A proper ship made of metal, not wood and duct tape.',
        cost: [['Iron', 50]]
    },
    'Warp Drive': {
        name: 'Warp Drive',
        dependencies: ['Proper Ship'],
        maxLevel: 1,
        desc: '',
        cost: [['Iron', 50]]
    },
    'Shields': {
        name: 'Shields',
        dependencies: ['Proper Ship'],
        maxLevel: 5,
        cost: [['Iron', 50]]
    },
    'Warp Range': {
        name: 'Warp Range',
        dependencies: ['Warp Drive'],
        maxLevel: 5,
        cost: [['Iron', 50]]
    },
    'Guns': {
        name: 'Guns',
        dependencies: ['Proper Ship'],
        maxLevel: 5,
        cost: [['Iron', 50]]
    },
    'Heat Resistance': {
        name: 'Heat Resistance',
        dependencies: ['Proper Ship'],
        maxLevel: 1,
        cost: [['Iron', 50]]
    },
    'Frost Resistance': {
        name: 'Frost Resistance',
        dependencies: ['Proper Ship'],
        maxLevel: 1,
        cost: [['Iron', 50]]
    }
};

//to be auto generated through seeding
const SolarSystemData = {
    'Milky Way': {
        planets: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    }
};

const PlanetData = {
    'Mercury': {
        name: 'Mercury',
        type: 'Fiery'
    },
    'Earth': {
        name: 'Earth',
        type: 'Lush'
    },
    'Venus': {
        name: 'Venus',
        type: 'Fiery'
    },
    'Mars': {
        name: 'Mars',
        type: 'Fiery'
    },
    'Jupiter': {
        name: 'Jupiter',
        type: 'Gaseous'
    },
    'Saturn': {
        name: 'Saturn',
        type: 'Lush'
    },
    'Uranus': {
        name: 'Uranus',
        type: 'Frozen'
    },
    'Neptune': {
        name: 'Neptune',
        type: 'Frozen'
    },
    'Pluto': {
        name: 'Pluto',
        type: 'Frozen'
    }
};

CraftingRecipes = {
    '1/8th figure of Hayasaka': {
        requirement: [['Diamond', 1]]
    },
    'Charcoal': {
        requirement: [['Wood', 2]]
    },
    'Steel': {
        requirement: [['Iron', 3], ['Charcoal', 1]]
    }
};
