const sampleData = [
  {
    name: "Fire Storm",
    source: "PHB",
    page: 242,
    srd: true,
    basicRules: true,
    level: 7,
    school: "V",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A storm made up of sheets of roaring flame appears in a location you choose within range. The area of the storm consists of up to ten 10-foot cubes, which you can arrange as you wish. Each cube must have at least one face adjacent to the face of another cube. Each creature in the area must make a Dexterity saving throw. It takes {@damage 7d10} fire damage on a failed save, or half as much damage on a successful one.",
      "The fire damages objects in the area and ignites flammable objects that aren't being worn or carried. If you choose, plant life in the area is unaffected by this spell.",
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    areaTags: ["C"],
    classes: {
      fromClassList: [
        {
          name: "Cleric",
          source: "PHB",
        },
        {
          name: "Druid",
          source: "PHB",
        },
        {
          name: "Sorcerer",
          source: "PHB",
        },
      ],
    },
  },
  {
    name: "Fireball",
    source: "PHB",
    page: 241,
    srd: true,
    basicRules: true,
    level: 3,
    school: "V",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a tiny ball of bat guano and sulfur",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes {@damage 8d6} fire damage on a failed save, or half as much damage on a successful one.",
      "The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "At Higher Levels",
        entries: [
          "When you cast this spell using a spell slot of 4th level or higher, the damage increases by {@scaledamage 8d6|3-9|1d6} for each slot level above 3rd.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    areaTags: ["S"],
    classes: {
      fromClassList: [
        {
          name: "Sorcerer",
          source: "PHB",
        },
        {
          name: "Wizard",
          source: "PHB",
        },
      ],
      fromSubclass: [
        {
          class: {
            name: "Cleric",
            source: "PHB",
          },
          subclass: {
            name: "Light",
            source: "PHB",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Fiend",
            source: "PHB",
          },
        },
        {
          class: {
            name: "Cleric",
            source: "PHB",
          },
          subclass: {
            name: "Zeal (PSA)",
            source: "PSA",
          },
        },
        {
          class: {
            name: "Artificer (Revisited)",
            source: "UAArtificerRevisited",
          },
          subclass: {
            name: "Artillerist",
            source: "UAArtificerRevisited",
          },
        },
        {
          class: {
            name: "Druid",
            source: "PHB",
          },
          subclass: {
            name: "Wildfire (UA)",
            source: "UAClericDruidWizard",
          },
        },
        {
          class: {
            name: "Artificer",
            source: "TCE",
          },
          subclass: {
            name: "Artillerist",
            source: "TCE",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Genie (UA)",
            source: "UA2020SubclassesRevisited",
            subSubclass: "Efreeti",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Genie",
            source: "TCE",
            subSubclass: "Efreeti",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Genie (UA)",
            source: "UA2020SubclassesRevisited",
          },
        },
        {
          class: {
            name: "Monk",
            source: "PHB",
          },
          subclass: {
            name: "Four Elements",
            source: "PHB",
          },
        },
      ],
    },
    eldritchInvocations: [
      {
        name: "Kiss of Mephistopheles",
        source: "UAWarlockAndWizard",
      },
    ],
    hasFluffImages: true,
  },
  {
    name: "Sleet Storm",
    source: "PHB",
    page: 276,
    srd: true,
    level: 3,
    school: "C",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a pinch of dust and a few drops of water",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "Until the spell ends, freezing rain and sleet fall in a 20-foot-tall cylinder with a 40-foot radius centered on a point you choose within range. The area is heavily obscured, and exposed flames in the area are doused.",
      "The ground in the area is covered with slick ice, making it {@quickref difficult terrain||3}. When a creature enters the spell's area for the first time on a turn or starts its turn there, it must make a Dexterity saving throw. On a failed save, it falls {@condition prone}.",
      "If a creature starts its turn in the spell's area and is concentrating on a spell, the creature must make a successful Constitution saving throw against your spell save DC or lose concentration.",
    ],
    conditionInflict: ["prone"],
    savingThrow: ["dexterity", "constitution"],
    areaTags: ["Y"],
    classes: {
      fromClassList: [
        {
          name: "Druid",
          source: "PHB",
        },
        {
          name: "Sorcerer",
          source: "PHB",
        },
        {
          name: "Wizard",
          source: "PHB",
        },
      ],
      fromSubclass: [
        {
          class: {
            name: "Cleric",
            source: "PHB",
          },
          subclass: {
            name: "Tempest",
            source: "PHB",
          },
        },
        {
          class: {
            name: "Druid",
            source: "PHB",
          },
          subclass: {
            name: "Land",
            source: "PHB",
            subSubclass: "Arctic",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Lurker in the Deep (UA)",
            source: "UASorcererAndWarlock",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Genie (UA)",
            source: "UA2020SubclassesRevisited",
            subSubclass: "Marid",
          },
        },
        {
          class: {
            name: "Druid",
            source: "PHB",
          },
          subclass: {
            name: "Land",
            source: "PHB",
          },
        },
        {
          class: {
            name: "Sorcerer",
            source: "PHB",
          },
          subclass: {
            name: "Storm (UA)",
            source: "UAWaterborneAdventures",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Fathomless",
            source: "TCE",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Genie",
            source: "TCE",
            subSubclass: "Marid",
          },
        },
        {
          class: {
            name: "Warlock",
            source: "PHB",
          },
          subclass: {
            name: "Genie (UA)",
            source: "UA2020SubclassesRevisited",
            subSubclass: "Marid",
          },
        },
      ],
    },
    races: [
      {
        name: "Half-Elf (Mark of Storm)",
        source: "ERLW",
        baseName: "Half-Elf",
        baseSource: "PHB",
      },
    ],
  },
];

const sampleDataFiltered = [{ ...sampleData[0] }, { ...sampleData[1] }];

export { sampleDataFiltered, sampleData };
