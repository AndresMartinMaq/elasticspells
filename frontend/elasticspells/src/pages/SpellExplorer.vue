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

fieldset {
  position: absolute;
  top: 100px;
  right: 20%;
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
