const ResourceData = [
    {name: 'Iron'        },
    {name: 'Ice'         },
    {name: 'Wood'        },
    {name: 'Oxygen'      }
];

//Add resource drop rate here?
const PlanetTypeData = [
    {type: 'Lush',      resources: ['Wood', 'Oxygen']   },
    {type: 'Fiery',     resources: ['Iron']             },
    {type: 'Frozen',    resources: ['Ice']              }
];

const ShipUpgradeData = [
    {name: 'Warp Range',      dependencies: []               },
    {name: 'Shields',         dependencies: []               },
    {name: 'Speed 1',         dependencies: []               },
    {name: 'Speed 2',         dependencies: ['Speed 1']      }
];

//to be auto generated through seeding
const SolarSystemData = [
    {name: 'Milky Way',       planets: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']               }
];