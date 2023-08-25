<template>
  <main class="stages-progress-container">
    <section class="progress-bar-container">
      <section
        v-for="(stage, index) in stages"
        :key="stage"
        v-show="index < stages.length - 1"
        class="progress-bar"
      >
        <section
          v-for="unit in units"
          :key="unit"
          class="unit-stage-progress-container"
          v-show="stage.stage_value === unit.stage"
          :style="`left: calc(${unit.pcomplete} - 20px)`"
        >
          <div
            class="unit-stage-progress"
            :style="`background-color: ${stage.bgColor}`"
            :title="`${unit.name}`"
          >
            <p class="-xstb" style="color: white">{{ unit.ref }}</p>
          </div>
          <div
            class="bottom-part"
            :style="`background-color: ${stage.bgColor}`"
          ></div>
        </section>
        <!-- <div
          v-if="stage.value === getUnitStage[index]"
          class="unit-stage-progress"
        >
          <p>{{ getUnitStage[index] }}</p>
        </div> -->
      </section>
    </section>

    <section class="stage-badges-container">
      <div
        v-for="(stage, index) in stages"
        :key="stage"
        class="stage-badge"
        :ref="`stage${index}`"
        :style="`background-color: ${stage.bgColor}`"
        :title="stage.stage_name"
      >
        <p class="-ltb">{{ stage.stage_value }}</p>
        <!-- 
        <div v-show="index === stages.length - 1" class="last-stage">
          <p class="-xstb">EX</p>
 
        </div> -->
        <!-- <div class="bottom-part" style></div> -->
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      stages: [
        {
          stage_name: "Strategic Definition",
          stage_value: 0,
          bgColor: "#f79c33",
        },
        {
          stage_name: "Preparation and Brief",
          stage_value: 1,
          bgColor: "#eda3c6",
        },
        { stage_name: "Concept Design", stage_value: 2, bgColor: "#73ccd2" },
        {
          stage_name: "Spatial Coordination",
          stage_value: 3,
          bgColor: "#ffd322",
        },
        { stage_name: "Technical Design", stage_value: 4, bgColor: "#83bf9b" },
        {
          stage_name: "Manufacturing and Construction",
          stage_value: 5,
          bgColor: "#a4a8d7",
        },
        { stage_name: "Handover", stage_value: 6, bgColor: "#eed39b" },
        { stage_name: "Use", stage_value: 7, bgColor: "#5caad8" },
      ],
      units: [
        {
          name: "Entry Block",
          ref: "EB.01",
          stage: 5,
          pcomplete: "56%",
        },
        {
          name: "Main Building",
          ref: "MB.02",
          stage: 3,
          pcomplete: "50%",
        },
        {
          name: "Block C",
          ref: "C.03",
          stage: 4,
          pcomplete: "25%",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("stages", this.stages);
  },
  // mounted() {
  //   //set stageColors
  //   for (let i = 0; i < this.stages.length; i++) {
  //     const stageRef = `stage${i}`;

  //     this.$refs[stageRef][0].style.background = this.stages[i].bgColor;
  //   }
  // },
  computed: {
    getUnitStage() {
      const unitStages = this.units.map((unit) => {
        for (let i = 0; i < this.stages.length; i++) {
          if (unit.stage === this.stages[i].stage_value) return unit.stage;
        }
      });

      console.log(unitStages);
      return unitStages;
    },
  },
};
</script>

<style scoped>
* {
  --stageBadgeDiameter: 32px;
  --stageBadgeRadius: calc(var(--stageBadgeDiameter) / 2);
  --stageBarHeight: 8px;
}
.stages-progress-container {
  position: relative;
  height: var(--stageBadgeDiameter);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  /* background: rgba(0, 128, 0, 0.341); */
}
.stage-badges-container {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}
.stage-badge {
  width: var(--stageBadgeDiameter);
  height: var(--stageBadgeDiameter);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0px 5px var(--white1);
}
.progress-bar-container {
  position: absolute;
  bottom: 12px;
  right: var(--stageBadgeRadius);
  width: calc(100% - var(--stageBadgeDiameter));
  padding-left: 10%;
  height: 150%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: var(--stageBadgeRadius);
  z-index: -1;
  overflow: auto;
  /* background: rgba(255, 0, 0, 0.407); */
}
.progress-bar {
  --progressBarsNumber: 7;
  position: relative;
  height: var(--stageBarHeight);
  width: calc(100% / var(--progressBarsNumber) - var(--stageBadgeRadius));
  background: var(--white1);
}
.unit-stage-progress-container {
  position: absolute;
  top: -33px;
  width: 40px;
  height: var(--stageBadgeRadius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* left: -20px; */
}
.unit-stage-progress {
  border-radius: 16px;
  height: 100%;
  width: 100%;
}
.bottom-part {
  position: absolute;
  top: 75%;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  z-index: -2;
}
.last-stage {
  position: absolute;
  top: -65.5%;
  width: 40px;
  height: 16px;
  color: var(--white1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5caad8;
}

.-ltb {
  color: var(--white1);
}
@media screen and (max-width: 849px) {
  .stages-progress-container {
    display: none;
  }
}
</style>