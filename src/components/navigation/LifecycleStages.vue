<template>
  <main class="lifecycle-stages-container">
    <section class="change-stage-container">
      <div
        class="current-stage"
        ref="currentStageRef"
        :style="`height: calc(100% / ${stages.length});`"
      ></div>
      <div
        v-for="(stage, index) in stages"
        :key="stage"
        class="stage-placeholder"
        :ref="`stage${stage.stage_value}`"
        :style="{ 'background: red': stage.stage_value > currentStage }"
        @mouseenter="
          toggleBackground(`stage${stage.stage_value}`, stage.bgColor)
        "
        @mouseleave="
          toggleBackground(`stage${stage.stage_value}`, stage.bgColor)
        "
        @click="
          setCurrentStage(
            'currentStageRef',
            index,
            stage.bgColor,
            stage.stage_value
          )
        "
      ></div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["stages"],
  data() {
    return {};
  },
  methods: {
    toggleBackground(ref, bgColor) {
      const elProperty = this.$refs[ref][0].style;
      !elProperty.background
        ? (this.$refs[ref][0].style = `background: ${bgColor}`)
        : (this.$refs[ref][0].style = `background: ""`);
    },
    setCurrentStage(ref, index, bgColor, stage) {
      let currentStage = this.$refs[ref].style;
      currentStage.top = `calc(${index} * 100% / ${this.stages.length})`;
      currentStage.background = `${bgColor}`;
      this.$store.dispatch("currentStage", stage);

      this.setSelectedStages(stage);
    },
    setSelectedStages(value) {
      const newSelectedStages = [];
      newSelectedStages.push(value);
      this.$store.dispatch("selectedStages", newSelectedStages);
    },
    getIndexOfCurrentStage() {
      const stageValuesArr = this.stages.map((stage) => stage.stage_value);
      const stageColorsArr = this.stages.map((stage) => stage.bgColor);
      const index = stageValuesArr.indexOf(this.$store.state.currentStage);

      const stage = { index: index, bgColor: stageColorsArr[index] };
      return stage;
    },
  },
  computed: {
    ...mapGetters(["currentStage"]),
  },
  mounted() {
    const stage = this.getIndexOfCurrentStage();
    this.setCurrentStage(
      "currentStageRef",
      stage.index,
      stage.bgColor,
      this.currentStage
    );
  },
};
</script>

<style scoped>
.lifecycle-stages-container {
  height: 100%;
  width: 100%;
}
.change-stage-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px -1px;
  position: relative;
  background: var(--gray6);
}
.stage-placeholder {
  height: 100%;
  width: 100%;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms ease;
  opacity: 0.33;
  /* border-radius: 4px; */
}
.current-stage {
  position: absolute;
  width: 100%;
  /* border-radius: 4px; */
  top: 0;
  transition: 200ms ease-in-out;
  opacity: 0.75;
  z-index: 1;
}
</style>