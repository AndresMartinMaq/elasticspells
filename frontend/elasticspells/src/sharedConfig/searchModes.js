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
  {
    value: "nameAndDescByFullPhrase",
    displayName:
      "Full phrase in title or description (try search multiple words)",
  },
  {
    value: "nameAndDescByPartialString_alternative1",
    displayName:
      "Partial string in title or description, alternative implementation 1",
  },
  {
    value: "nameAndDescByPartialString_alternative2",
    displayName:
      "Partial string in title or description, alternative implementation 2",
  },
];

export default searchModes;
