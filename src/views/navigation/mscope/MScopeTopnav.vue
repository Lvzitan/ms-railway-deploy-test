<template>
  <main class="nav-container">
    <section><UnitsDropdown /></section>
    <section><StagesMenu /></section>
    <section><ProjectDate /></section>
  </main>
</template>

<script>
import UnitsDropdown from "../../../components/navigation/mscopeTopnav/UnitsDropdown.vue";
import StagesMenu from "../../../components/navigation/mscopeTopnav/StagesMenu.vue";
import ProjectDate from "../../../components/navigation/mscopeTopnav/ProjectDate.vue";
export default {
  components: {
    UnitsDropdown,
    StagesMenu,
    ProjectDate,
  },
};
</script>

<style scoped>
.nav-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* background: rgba(0, 0, 0, 0.2); */
}

@media screen and (max-width: 1023px) {
  .nav-container {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
}
</style>