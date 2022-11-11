<template>
  <div class="hello">
    <input
      placeholder="Search in spell book"
      v-model="searchTerm"
      v-on:keyup.enter="search"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    searchMode: String,
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  watch: {
    searchMode(newVal, oldVal) {
      if (newVal !== oldVal) this.search();
    },
  },
  methods: {
    search() {
      // TODO search on any keyup + debounce
      console.log("Searching for " + this.searchTerm);
      this.$store.dispatch("getSpellsFiltered", {
        searchTerm: this.searchTerm,
        searchMode: this.searchMode,
      });
    },
  },
};
</script>

<style scoped>
input {
  padding: 20px;
  font-size: 18px;
  color: blueviolet;
  width: 500px;
  text-align: center;
}
</style>
