<template>
  <main class="stages-wrapper" v-show="showStages">
    <!-- :class="{ active: currentStage === stage.stage_value }" -->
    <div
      v-for="(stage, index) in stages"
      :key="stage"
      class="stage-container"
      :class="{ active: getSelectedStage(stage.stage_value) }"
      :style="`border-color: ${stage.bgColor}`"
      :ref="`s${index}`"
      @click="setSelectedStages(stage.stage_value, `s${index}`)"
    >
      <p class="-ntb stage" :ref="`p${index}`">{{ stage.stage_value }}</p>
      <p class="tooltip -xstr">
        {{ stage.stage_name }}
      </p>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      hideOnRoutes: ["Lifecycle", "Elements", "Overview", "UploadFile"],
      showStages: true,
      selectedStages: [],
    };
  },
  methods: {
    toggleActive(ref) {
      const domElement = this.$refs[ref][0];
      !domElement.classList.value.includes("active")
        ? domElement.classList.add("active")
        : domElement.classList.remove("active");
    },
    getSelectedStage(value) {
      return this.selectedStages.includes(value) ? true : false;
    },
    setSelectedStages(value, ref) {
      if (!this.selectedStages.includes(value)) {
        this.selectedStages.push(value);
        this.selectedStages.sort();
        // this.toggleActive(ref);
      } else {
        if (this.selectedStages.length === 1) return;
        this.selectedStages = this.selectedStages.filter(
          (val) => val !== value
        );
        // this.toggleActive(ref);
      }
    },
  },
  created() {
    // console.log(this.$store.state.stages);
    // console.log(this.$store.state.currentStage);
  },
  async mounted() {
    this.selectedStages.push(this.$store.state.currentStage);
    await this.$store.dispatch("selectedStages", this.selectedStages.sort());

    console.log("CURRENT STAGES: ", this.$store.state.selectedStages);
  },
  computed: {
    ...mapGetters(["stages", "currentStage"]),
  },
  watch: {
    $route: {
      handler: function () {
        const excludedRoute = this.hideOnRoutes.filter((route) => {
          return route === this.$route.name;
        });

        if (this.$route.name === excludedRoute[0]) {
          if (!this.showStages) return;
          this.showStages = !this.showStages;
          // console.log("ran false");
        } else {
          if (this.showStages) return;
          this.showStages = !this.showStages;
          // console.log("ran true");
        }
      },
      immediate: true,
    },

    "selectedStages.length": async function () {
      await this.$store.dispatch("selectedStages", this.selectedStages.sort());
      console.log(this.selectedStages);
    },

    "$store.state.selectedStages": function () {
      this.selectedStages = JSON.parse(
        JSON.stringify(this.$store.state.selectedStages)
      );
    },

    "$store.state.currentStage": function () {
      this.selectedStages = [];
      this.selectedStages.push(this.$store.state.currentStage);
    },
  },
};
</script>

<style scoped>
.stages-wrapper {
  display: flex;
  /* gap: 4px; */
  justify-content: space-between;
  user-select: none;
  height: 45px;
}
.stage-container {
  width: 65px;
  height: 100%;
  display: flex;
  /* align-items: center;*/
  justify-content: center;
  background: #1522435d;
  /* box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 6px 0px inset; */
  /* border-radius: 4px; */
  cursor: pointer;
  color: var(--white1);
}
.stage-container:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.stage-container:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.stage-container:hover p:first-child {
  transform: scale(1.25);
}
.stage-container:hover .tooltip {
  display: inline;
}
.active {
  background: var(--primary);
  border-bottom: 4px solid;
  box-shadow: none;
}
.stage {
  align-self: center;
  transition: transform 250ms ease;
}
.tooltip {
  position: absolute;
  display: none;
  top: 60px;
  white-space: nowrap;
  background: var(--black3);
  padding-inline: 8px;
  padding-block: 4px;
  border-radius: 4px;
}
@media screen and (max-width: 1023px) {
  .tooltip {
    top: 110px;
  }
}
@media screen and (max-width: 719px) {
  .stage-container {
    width: 40px;
  }
}
</style>