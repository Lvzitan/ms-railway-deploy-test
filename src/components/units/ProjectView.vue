<template>
  <section class="p-info-container" v-if="selectedProject">
    <p class="-ltb p-name">{{ selectedProject.project_name }}</p>
    <p class="-mtb p-units">Units: {{ selectedProject.units_size }}</p>
    <p class="-ntb p-ref">{{ selectedProject.ref }}</p>
    <p class="-ntr u-name">{{ selectedProject.project_admin }}</p>
    <p class="-ntr p-group">{{ selectedProject.group }}</p>
  </section>
</template>

<script>
export default {
  props: ["selectedProject"],
};
</script>

<style scoped>
.p-info-container {
  grid-row: 3 / span 1;
  bottom: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
  color: var(--white1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-left: 32px;
  letter-spacing: 1px;
}
.p-name,
.p-units,
.u-name,
.p-group {
  grid-column: span 1;
  justify-self: flex-start;
}
.p-ref {
  grid-column: span 2;
  justify-self: flex-start;
}
p {
  align-self: flex-start;
  text-align: left;
}
</style>