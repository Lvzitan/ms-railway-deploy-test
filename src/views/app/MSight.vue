<template>
  <main v-show="!loadIFC" class="main-route-container">
    <IFCFilesContainer :files="projectFiles" :mainTitle="'Full Project'" />
    <IFCFilesContainer
      :files="units.unit1Files"
      :mainTitle="'BLO01. Main-Entry Block'"
    />
    <IFCFilesContainer
      :files="units.unit2Files"
      :mainTitle="'BL02. Eastern Block'"
    />
    <IFCFilesContainer
      :files="units.unit3Files"
      :mainTitle="'BL03. Office Complex'"
    />
  </main>
  <main v-if="loadIFC" class="main-route-container"><MSightViewer /></main>
</template>

<script>
import { mapGetters } from "vuex";
import MSightViewer from "../../components/projects/msight/MSightViewer.vue";
import IFCFilesContainer from "../../components/projects/msight/IFCFilesContainer.vue";
export default {
  name: "MSight",
  components: { MSightViewer, IFCFilesContainer },
  data() {
    return {
      projectFiles: null,
      units: {
        unit1Files: null,
        unit2Files: null,
        unit3Files: null,
      },
    };
  },
  created() {
    this.$store.dispatch("loadIFC", null);
    this.$store.dispatch("msightLink", null);
    this.projectFiles = [
      {
        id: 1,
        title: "Federated",
        imgPath: require("../../assets/temp/msight/project-federated.svg"),
        link: "https://msight.ms4aeco.com",
      },
      {
        id: 2,
        title: "Architectural",
        imgPath: require("../../assets/temp/msight/project-architectural.svg"),
        link: "",
      },
      {
        id: 3,
        title: "Structural",
        imgPath: require("../../assets/temp/msight/project-structural.svg"),
        link: "",
      },
      {
        id: 4,
        title: "Mechanical",
        imgPath: require("../../assets/temp/msight/project-mechanical.svg"),
        link: "",
      },
    ];
    this.units.unit1Files = [
      {
        id: 5,
        title: "Federated",
        imgPath: require("../../assets/temp/msight/unit1-federated.svg"),
        link: "",
      },
      {
        id: 6,
        title: "Architectural",
        imgPath: require("../../assets/temp/msight/unit1-architectural.svg"),
        link: "https://aa.ms4aeco.com",
      },
      {
        id: 7,
        title: "Structural",
        imgPath: require("../../assets/temp/msight/unit1-structural.svg"),
        link: "https://ae.ms4aeco.com",
      },
      {
        id: 8,
        title: "Mechanical",
        imgPath: require("../../assets/temp/msight/unit1-mechanical.svg"),
        link: "https://am.ms4aeco.com",
      },
    ];
    this.units.unit2Files = [
      {
        id: 9,
        title: "Federated",
        imgPath: require("../../assets/temp/msight/unit2-federated.svg"),
        link: "",
      },
      {
        id: 10,
        title: "Architectural",
        imgPath: require("../../assets/temp/msight/unit2-architectural.svg"),
        link: "https://ba.ms4aeco.com",
      },
      {
        id: 11,
        title: "Structural",
        imgPath: require("../../assets/temp/msight/unit2-structural.svg"),
        link: "https://be.ms4aeco.com",
      },
      {
        id: 12,
        title: "Mechanical",
        imgPath: require("../../assets/temp/msight/unit2-mechanical.svg"),
        link: "https://bm.ms4aeco.com",
      },
    ];
    this.units.unit3Files = [
      {
        id: 13,
        title: "Federated",
        imgPath: require("../../assets/temp/msight/unit3-federated.svg"),
        link: "",
      },
      {
        id: 14,
        title: "Architectural",
        imgPath: require("../../assets/temp/msight/unit3-architectural.svg"),
        link: "https://ca.ms4aeco.com",
      },
      {
        id: 15,
        title: "Structural",
        imgPath: require("../../assets/temp/msight/unit3-structural.svg"),
        link: "https://ce.ms4aeco.com",
      },
      {
        id: 16,
        title: "Mechanical",
        imgPath: require("../../assets/temp/msight/unit3-mechanical.svg"),
        link: "https://cm.ms4aeco.com",
      },
    ];
  },
  computed: {
    ...mapGetters(["loadIFC"]),
  },
};
</script>

<style scoped>
.main-route-container {
  width: 100%;
  height: 100%;
  padding-block: 16px;
  padding-inline: 32px;
  display: flex;
  flex-flow: row;
  gap: 64px;
  justify-content: space-evenly;
  align-items: flex-start;
  overflow: auto;
  transition: 200ms ease;
}

/* //TEMP// */
@media screen and (max-width: 1479px) {
  .main-route-container {
    justify-content: flex-start;
  }
}
</style>