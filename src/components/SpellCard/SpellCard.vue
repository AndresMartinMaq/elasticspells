<template>
  <div class="spellWrapper">
    <h2>{{ spellName }}</h2>
    <p><span class="inlineTitle">Casting Time:</span> {{ castingTime }}</p>
    <p>
      <span class="inlineTitle">Range:</span><span> {{ range }}ft</span>
    </p>
    <p><span class="inlineTitle">Componenets:</span> {{ components }}</p>
    <p>{{ description }}</p>
    <hr />
    <div>
      <p>
        A storm made up of sheets of roaring flame appears in a location you
        choose within range. The area of the storm consists of up to ten 10-foot
        cubes, which you can arrange as you wish. Each cube must have at least
        one face adjacent to the face of another cube. Each creature in the area
        must make a Dexterity saving throw. It takes 7d10 fire damage on a
        failed save, or half as much damage on a successful one.
      </p>
      <p>
        The fire damages objects in the area and ignites flammable objects that
        aren't being worn or carried. If you choose, plant life in the area is
        unaffected by this spell.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpellCard",
  props: {
    spellName: {
      type: String,
      required: true,
    },
    castingTime: {
      type: String,
      required: true,
    },
    range: {
      type: Number,
      required: true,
    },
    components: {
      type: String,
      default: "V, S, C",
    },
    description: String,
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin: 20px 0 0;
  color: firebrick;
}
.inlineTitle {
  color: firebrick;
}
.spellWrapper {
  background-color: #fdf1dc;
  width: 20%;
  padding: 5px 20px;
  margin: 10px 10px;
}
</style>
