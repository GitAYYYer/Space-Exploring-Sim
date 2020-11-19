const ResourceData = [
    {'name': 'Iron'        },
    {'name': 'Ice'         },
    {'name': 'Wood'        },
    {'name': 'Oxygen'      }
];

//Add resource drop rate here?
const PlanetTypeData = {
    Lush: {
        resources: ['Wood', 'Oxygen']
    },
    Fiery: {
        resources: ['Iron']  
    },
    Frozen: {
        resources: ['Ice']  
    },
    Gaseous: {
        resources: ['Hydrogen', 'Helium']  
    }
};

const ShipUpgradeData = {
    'Warp Range': {
        name: 'Warp Range',
        dependencies: ['Speed 1'],
        maxLevel: 1
    },
    'Shields': {
        name: 'Shields',
        dependencies: [],
        maxLevel: 5
    },
    'Speed 1': {
        name: 'Speed 1',
        dependencies: ['Shields'],
        maxLevel: 5
    },
    'Guns': {
        name: 'Guns',
        dependencies: ['Speed 1'],
        maxLevel: 5
    }
};

//to be auto generated through seeding
const SolarSystemData = {
    'Milky Way' : {
        planets : ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
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
