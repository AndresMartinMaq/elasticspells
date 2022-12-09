<template>
  <div class="spellWrapper">
    <h2>{{ spellName }}</h2>
    <p><span class="inlineTitle">Casting Time:</span> {{ castingTime }}</p>
    <p>
      <span class="inlineTitle">Range:</span><span> {{ range }}ft</span>
    </p>
    <p><span class="inlineTitle">Components:</span> {{ components }}</p>
    <p><span class="inlineTitle">Level:</span> {{ level }}</p>
    <hr />
    <div>
      <p v-for="(paragraph, index) in description" :key="index">
        {{ paragraph }}
      </p>
      <p class="availabilitySection">
        Available to the following classes:
        <span
          v-for="(dndClass, index) in dndClasses.fromClassList"
          :key="dndClass"
        >
          {{
            dndClass.name +
            (index + 1 === dndClasses.fromClassList.length ? "." : ",")
          }}
        </span>
      </p>
      <p v-if="dndClasses.fromSubclass" class="availabilitySection">
        Available to the following sub-classes:
        <span
          v-for="(dndClass, index) in dndClasses.fromSubclass"
          :key="dndClass"
        >
          {{
            dndClass.class.name +
            (index + 1 === dndClasses.fromSubclass.length ? "." : ",")
          }}
        </span>
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
    components: String,
    description: {
      type: Array,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    dndClasses: Object,
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

.availabilitySection {
  color: gray;
}
</style>
