<template>
  <main class="content-page">
    <section class="submenu">
      <span class="highlight"></span>
      <h1 class="-h6">Lifecycle</h1>
    </section>
    <section class="lifecycle-container" title="Change Current Stage">
      <div class="lifecycle-stages-container">
        <LifecycleStages :stages="stages" />
      </div>
      <div class="lifecycle-listing-container">
        <LifecycleListing :stages="stages" />
      </div>
    </section>
  </main>
</template>

<script>
import LifecycleStages from "../../../components/navigation/LifecycleStages.vue";
import LifecycleListing from "../../../components/tables/mscope/LifecycleListing.vue";
export default {
  components: {
    LifecycleStages,
    LifecycleListing,
  },
  data() {
    return {
      stages: [
        {
          stage_name: "Strategic Definition",
          stage_value: 0,
          bgColor: "#f79c33",
          start_date: "01/06/2022",
          deadline: "20/07/2022",
          budget: "9.000",
          cost: "6.000.000",
          notes:
            "Identify client buisness case and set main project strategy in accordance with the project's core requierments. Define design and construction approach. Establish economic and financial goals.",
        },
        {
          stage_name: "Preparation and Brief",
          stage_value: 1,
          bgColor: "#eda3c6",
          start_date: "20/07/2022",
          deadline: "01/08/2022",
          budget: "18.000",
          cost: "6.500.000",
          notes:
            "Define the main projet objectives and outcomes. Establish Sustainability and Budget targets. Undertake Feasability Studies and review site information ",
        },
        {
          stage_name: "Concept Design",
          stage_value: 2,
          bgColor: "#73ccd2",
          start_date: "01/04/2021",
          deadline: "30/06/2021",
          budget: "22.000",
          cost: "7.000.000",
          notes:
            "Prepare Concept Design considering outline proposals for both structural and architectural design, building service systems. Outline Preliminary Cost information in accordance with the Design Programme. Final Project Brief can be issued once all initial brief alterations are consolidated.",
        },
        {
          stage_name: "Spatial Coordination",
          stage_value: 3,
          bgColor: "#ffd322",
          start_date: "01/07/2021",
          deadline: "30/08/2021",
          budget: "30.000",
          cost: "6.800.320",
          notes:
            "Developed Design, with coordinated and updated proposals for Structural, Architectural and Building Service Systems. Define Cost Information reports and Project Strategis in accordance to Design Programme.",
        },
        {
          stage_name: "Technical Design",
          stage_value: 4,
          bgColor: "#83bf9b",
          start_date: "18/07/2021",
          deadline: "30/09/2021",
          budget: "50.000",
          cost: "6.500.250",
          notes:
            "Develop Technical Design in accordance with the Design Responsability Matrix and Project Strategies. Inclue Structural, Architecture and Building Service Systems information, specialist subcontractor design and specifications in accordance with Design Programme.",
        },
        {
          stage_name: "Manufacturing and Construction",
          stage_value: 5,
          bgColor: "#a4a8d7",
          start_date: "01/02/2022",
          deadline: "30/03/2022",
          budget: "1.000.000",
          cost: "6.250.000",
          notes:
            "Begining of offsite manufacturing and onsite construction in accordance with Construction Programme. Settle emerging design querires from on site works.",
        },
        {
          stage_name: "Handover",
          stage_value: 6,
          bgColor: "#eed39b",
          start_date: "01/04/2022",
          deadline: "30/05/2022",
          budget: "200.000",
          cost: "6.250.000",
          notes:
            "Bulding handover and conclusion of all building contract specifications",
        },
        {
          stage_name: "Use",
          stage_value: 7,
          bgColor: "#5caad8",
          start_date: "01/06/2022",
          deadline: "01/06/2042",
          budget: "3.000.000",
          cost: "-",
          notes:
            "Undertake In Use service and assistance in accordance with the Schedule of Services. Develop and implement O&M specific work scope.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.content-page {
  height: calc(100% - 4px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.submenu {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
}
.highlight {
  display: inline-block;
  height: 50%;
  width: 1px;
  border-radius: 8px;
  border: 2px solid var(--highlight);
}
.submenu h1 {
  text-transform: uppercase;
  padding-left: 8px;
}
.actions {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
.search-container {
  height: 100%;
  width: 272px;
  text-align: right;
}
.btn-container {
  width: 144px;
  height: 100%;
}
.lifecycle-container {
  height: 95%;
  min-height: 500px;
  width: 100%;
  display: flex;
  --lifecyclestages-container: 12px;
  gap: 8px;
  overflow: auto;
}
.lifecycle-stages-container {
  --th-height: 22px;
  width: var(--lifecyclestages-container);
  top: var(--th-height);
  height: calc(100% - var(--th-height));
  position: relative;
}
.lifecycle-listing-container {
  width: calc(100% - var(--lifecyclestages-container));
  height: 100%;
}
@media screen and (max-height: 1023px) {
  .highlight {
    display: none;
  }
}
</style>