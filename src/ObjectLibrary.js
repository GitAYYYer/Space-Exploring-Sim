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
}

const ShipUpgradeData = [
    {'name': 'Warp Range',      'dependencies': []               },
    {'name': 'Shields',         'dependencies': []               },
    {'name': 'Speed 1',         'dependencies': []               },
    {'name': 'Speed 2',         'dependencies': ['Speed 1']      }
];

//to be auto generated through seeding
const SolarSystemData = [
    {'name': 'Milky Way',       'planets': ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']               }
];

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
}

const ShipUpgradeData = {
    'Warp Range': {
        name: 'Warp Range',
        dependencies: [],
        maxLevel: 99
    },
    'Shields': {
        name: 'Warp Range',
        dependencies: [],
        maxLevel: 99
    },
    'Speed 1': {
        name: 'Warp Range',
        dependencies: [],
        maxLevel: 99
    },
    'Speed 2': {
        name: 'Warp Range',
        dependencies: [],
        maxLevel: 99
    },
    
}