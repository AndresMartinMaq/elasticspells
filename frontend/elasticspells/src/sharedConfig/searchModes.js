const searchModes = [
  {
    value: "default_fullTermInTitleOrDesc",
    displayName: "Full term in title or description",
  },
  {
    value: "byTitle",
    displayName: "By Title",
  },
  {
    value: "byDescriptionSimple",
    displayName: "By Description",
  },
  {
    value: "nameAndDescByPartialString",
    displayName: "Partial string in title or description",
  },
  {
    value: "fuzzyDesc",
    displayName: "Fuzzy description",
  },
  {
    value: "spellLevelRange",
    displayName: "Spell Level (eg. '3' or '2-4') (inclusive)",
  },
];

export default searchModes;
