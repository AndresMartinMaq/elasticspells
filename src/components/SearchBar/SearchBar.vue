<template>
  <div class="hello">
    <input placeholder="Search in spell book" />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    msg: String,
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
