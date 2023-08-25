<template>
  <main class="units-view">
    <section class="project-info"><ProjectInfo /></section>
    <section class="new-unit"><NewUnit /></section>
    <section class="project-view"><ProjectView /></section>

    <section class="units-list" v-if="!units">
      <SkipUnitCreation />
    </section>

    <section class="units-list" v-else>
      <UnitsList :units="units" />
    </section>

    <section class="project-view-summary">
      <ProjectViewSummary />
    </section>
  </main>
</template>

<script>
import ProjectInfo from "../components/units/ProjectInfo.vue";
import SearchBar from "../components/utils/BaseSearchBar.vue";
import NewUnit from "../components/units/NewUnit.vue";
import SkipUnitCreation from "../components/units/SkipUnitCreation.vue";
import UnitsList from "../components/units/UnitsList.vue";
import ProjectViewSummary from "../components/units/ProjectViewSummary.vue";
import ProjectView from "../views/ProjectView.vue";
export default {
  components: {
    ProjectInfo,
    SearchBar,
    NewUnit,
    UnitsList,
    ProjectViewSummary,
    ProjectView,
    SkipUnitCreation,
  },
  data() {
    return {
      PROJECTID: parseInt(this.$route.params.id),
      units: null,
    };
  },
  mounted() {
    this.units = [
      {
        id: 1,
        name: "Entry Block",
        ref: "EB.01",
        stage: 5,
        admin: "Andrew Armstrong",
        group: "B&M",
        imagePath:
          "https://cdn.discordapp.com/attachments/928228506939297852/1029693386346745866/blocoA.jpg",
      },
      {
        id: 2,
        name: "Main Building",
        ref: "MB.02",
        stage: 3,
        admin: "Andrew Armstrong",
        group: "B&M",
        imagePath:
          "https://cdn.discordapp.com/attachments/928228506939297852/1029693386648731648/blocoC.jpg",
      },
      {
        id: 3,
        name: "Block C",
        ref: "C.03",
        stage: 4,
        admin: "Andrew Armstrong",
        group: "B&M",
        imagePath:
          "https://cdn.discordapp.com/attachments/928228506939297852/1029693386950725692/blocoB.jpg",
      },
    ];
  },
};
</script>

<style scoped>
.units-view {
  display: grid;
  height: 100%;
  width: 100%;
  gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  /* grid-template-rows: repeat(12, 1fr); */
  padding-inline: 4px;
  padding-top: 4px;
  overflow: auto;
  position: relative;
  z-index: 1;
  background-image: var(--appBg) !important;
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: cover;
}
.project-info {
  grid-column: 1 / span 1;
  grid-row: 1 / span 5;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  padding-top: 4px;
  align-self: start;
}
.new-unit {
  grid-column: 1 / span 1;
  grid-row: span 1;
}
.project-view-summary {
  grid-column: 1 / span 1;
  grid-row: span 3;
}
.project-view {
  grid-column: 2 / span 4;
  grid-row: 1 / span 12;
}
.delete-unit {
  grid-column: 1 / span 1;
  grid-row: 12 / span 1;
  align-self: end;
  margin-bottom: 8px;
}
.units-list {
  grid-column: 6 / span 1;
  grid-row: 1 / span 12;
  min-width: 220px;
  /* overflow: auto; */
}
@media screen and (max-width: 1280px) {
  .units-view {
    display: flex;
    flex-direction: column;
    /* padding: 32px; */
    /* overflow-x: hidden; */
    padding-block: 8px;
  }
  .project-info {
    display: flex;
    width: 80%;
    order: 1;
    align-self: center;
    justify-content: center;
    align-items: center;
  }
  .new-unit {
    order: 4;
  }
  .project-view {
    order: 2;
    width: 80%;
    align-self: center;
  }
  .units-list {
    position: relative;
    order: 3;
    width: 80%;
    justify-self: start;
    align-self: center;
  }
  .project-view-summary {
    order: 5;
    align-self: center;
  }
  .delete-unit {
    order: 6;
  }
  .new-unit {
    align-self: center;
  }

  .delete-unit {
    align-self: center;
  }
}
@media screen and (max-width: 430px) {
  .units-view {
    padding: 0;
    margin: 0;
  }
}
</style>