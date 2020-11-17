const resourceData = [
    {name: 'Iron'        },
    {name: 'Ice'         },
    {name: 'Wood'        },
    {name: 'Oxygen'      }
];

//Add resource drop rate here?
const planetTypeData = [
    {type: 'Lush',      resources: ['Wood', 'Oxygen']   },
    {type: 'Fiery',     resources: ['Iron']             },
    {type: 'Frozen',    resources: ['Ice']              }
];

const shipUpgradeData = [
    {name: 'Warp Range',      dependencies: []               },
    {name: 'Shields',         dependencies: []               },
    {name: 'Speed 1',         dependencies: []               },
    {name: 'Speed 2',         dependencies: ['Speed 1']      }
];