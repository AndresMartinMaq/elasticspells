<template>
  <div class="home">
    <img alt="Spellbook" src="../assets/spellbook1.png" />
    <SearchBar />
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

export default {
  name: "SpellExplorer",
  components: {
    SearchBar,
    SpellCard,
  },
  mounted() {
    this.$store.dispatch("getSpells");
  },
  computed: {
    ...mapState(["spells"]),
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
</style>
