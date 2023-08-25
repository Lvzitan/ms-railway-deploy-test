<template>
  <main class="project-units-container">
    <p class="-ltb title">Project Units</p>
    <ul class="units-container">
      <li
        class="unit"
        :style="[
          unit.imagePath
            ? `background-image: url('${unit.imagePath}')`
            : `background-image: var(--project-thumbnail); filter: hue-rotate(90deg);`,
        ]"
        v-for="unit in units"
        :key="unit"
        @click="enterUnit(unit)"
      >
        <div class="unnit-banner">
          <p id="ref" class="-stb">{{ unit.ref }}</p>
          <p class="-stb">{{ unit.name }}</p>
          <p class="-stb">Stage: {{ unit.stage }}</p>

          <p class="-xstr">{{ unit.admin }}</p>
          <p class="-xstr">{{ unit.group }}</p>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  props: ["units"],
  methods: {
    enterUnit(unit) {
      this.$store.dispatch("unit", unit);
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style scoped>
.project-units-container {
  display: flex;
  flex-flow: column;
  /* grid-template-rows: repeat(12, 1fr); */
  overflow: auto;
  padding-top: 8px;
  gap: 16px;
}
.title {
  font-family: "Montserrat-Bold";
  font-size: 32px;
  justify-self: start;
  align-self: center;
  white-space: nowrap;
}
.units-container {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  max-height: 840px;
  overflow: auto;
  /* overflow: auto; */
  /* overflow-x: hidden;
  overflow-y: auto; */
}
.unit {
  grid-column: span 1;
  height: 200px;
  min-height: 200px;
  width: 100%;

  border-radius: 18px;
  cursor: pointer;
  /* background-image: var(--project-thumbnail); */
  /* filter: hue-rotate(90deg); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  transform: scale(0.95);
  transition: transform 200ms ease;
  user-select: none;
}
.unnit-banner {
  height: 100px;
  width: 100%;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  background: rgba(0, 0, 0, 0.44);
  color: var(--white1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: flex-start;
  padding-inline: 1rem;
  padding-block: 0.5rem;
  column-gap: 4px;
}
.unnit-banner p {
  grid-column: span 1;
}
#ref {
  grid-column: span 2;
  justify-self: left;
}

/*=== EFFECTS ===*/
.unit:hover {
  transform: scale(1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

@media screen and (max-width: 1280px) {
  .unit {
    width: 60%;
    min-width: 240px;
    align-self: center;
  }
  .units-container {
    max-height: none;
  }
}
</style>