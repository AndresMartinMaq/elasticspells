<template>
  <div>
    <img alt="Spellbook" src="../assets/spellbook1.png" />
    <fieldset>
      <legend>Select a search mode:</legend>
      <div
        v-for="mode in searchModes"
        :key="mode.value"
        @click="searchMode = mode.value"
      >
        <input
          type="radio"
          v-model="searchMode"
          :id="`radioBtn_${mode.value}`"
          name="searchMode"
          :value="mode.value"
        />
        <label :for="`radioBtn_${mode.value}`">
          {{ mode.displayName }}
        </label>
      </div>
    </fieldset>
    <div class="tips">
      Feeling uninspired? Try searching:
      <ul>
        <li>storm</li>
        <li>fire</li>
        <li>flame</li>
        <li>flames</li>
        <li>free</li>
      </ul>
    </div>
    <SearchBar :searchMode="searchMode" />
    <div class="spellsArea">
      <SpellCard
        v-for="s in spells"
        :key="s.name"
        :spellName="s.name"
        :castingTime="getCastingTime(s)"
        :range="s.range.distance.amount"
        :components="getComponentsString(s)"
        :description="s.entries"
        :level="s.level"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import SpellCard from "@/components/SpellCard/SpellCard.vue";
import searchModes from "../sharedConfig/searchModes.js";

export default {
  name: "SpellExplorer",
  components: {
    SearchBar,
    SpellCard,
  },
  data() {
    return {
      searchMode: "default_fullTermInTitleOrDesc",
    };
  },
  mounted() {
    this.$store.dispatch("getSpells");
  },
  computed: {
    ...mapState(["spells"]),
    searchModes() {
      return searchModes;
    },
  },
  methods: {
    getCastingTime(spell) {
      return `${spell.time[0].number} ${spell.time[0].unit}`;
    },
    getComponentsString({ components }) {
      // Could make this fancier with spaces and commas, but not the point of this project.
      return (
        (components.v ? "V" : "") +
        (components.s ? "S" : "") +
        (components.m ? "M" : "")
      );
    },
  },
};
</script>

<style scoped>
.spellsArea {
  display: flex;
  justify-content: center;
  background-color: floralwhite;
  margin-top: 10px;
}
.home img {
  max-height: 300px;
}

div.tips {
  position: absolute;
  top: 120px;
  right: 355px;
  text-align: left;
}

div.tips ul {
  margin: 5px -15px;
}

fieldset {
  position: absolute;
  top: 100px;
  left: 300px;
}

fieldset div {
  text-align: left;
  cursor: pointer;
  padding: 5px 5px;
}
fieldset div:hover {
  background-color: #fdf1dc;
}
fieldset div input,
fieldset div label {
  cursor: pointer;
}
</style>
