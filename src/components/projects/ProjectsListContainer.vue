<template>
  <main class="projects-list-container">
    <ProjectsList :projects="projects" />
  </main>
</template>

<script>
import ProjectsList from "../projects/ProjectsList.vue";
export default {
  components: {
    ProjectsList,
  },
  props: ["projects"],
  data() {
    return {
      project: null,
    };
  },
  methods: {},
};
</script>

<style scoped>
.projects-list-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* grid-auto-rows: 128px; if we need scroll later!!!*/
  grid-template-rows: repeat(3, 1fr);
  gap: 50px;
  padding-inline: 1rem;
}

@media screen and (max-width: 719px) {
  .projects-list-container {
    padding: 0;
  }
}
</style>