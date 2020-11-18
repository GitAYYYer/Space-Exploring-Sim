const ResourceData = [
    {'name': 'Iron'        },
    {'name': 'Ice'         },
    {'name': 'Wood'        },
    {'name': 'Oxygen'      }
];

//Add resource drop rate here?
const PlanetTypeData = [
    {'type': 'Lush',      'resources': ['Wood', 'Oxygen']                    },
    {'type': 'Fiery',     'resources': ['Iron']                              },
    {'type': 'Frozen',    'resources': ['Ice']                               },
    {'type': 'Gaseous',   'resources': ['Hydrogen', 'Helium']                }
];

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

const PlanetData = [
    {'name': 'Mercury',       'type': 'Fiery'           },
    {'name': 'Venus',         'type': 'Fiery'           },
    {'name': 'Earth',         'type': 'Lush'            },
    {'name': 'Mars',          'type': 'Fiery'           },
    {'name': 'Jupiter',       'type': 'Gaseous'         },
    {'name': 'Saturn',        'type': 'Lush'            },
    {'name': 'Uranus',        'type': 'Frozen'          },
    {'name': 'Neptune',       'type': 'Frozen'          },
    {'name': 'Pluto',         'type': 'Frozen'          }
];