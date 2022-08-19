<template>
  <div class="home">
    <img alt="Spellbook" src="../assets/spellbook1.png" />
    <SearchBar />
    <div class="spellsArea">
      <SpellCard
        spellName="Fire Storm"
        castingTime="1 actioon"
        :range="150"
        components="V, S"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import SpellCard from "@/components/SpellCard/SpellCard.vue";

export default {
  name: "HomeView",
  components: {
    SearchBar,
    SpellCard,
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
