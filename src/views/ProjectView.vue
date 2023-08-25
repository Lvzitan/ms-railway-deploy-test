<template>
  <main class="project-view-container">
    <section class="top-container">
      <p class="-ltb title">Project View</p>
      <div class="stages-progress-wrapper">
        <StagesProgress />
      </div>
    </section>

    <section class="content-container">
      <section class="charts-container">
        <article class="simple-chart" v-for="chart in charts" :key="chart">
          <SimpleChart
            :title="chart.title"
            :count="chart.count"
            :pvalue="chart.pvalue"
            :rating="chart.rating"
            :dataValues="chart.dataValues"
          />
        </article>
      </section>

      <section class="list-container"><ProjectViewList /></section>
    </section>
  </main>
</template>

<script>
import StagesProgress from "../components/units/StagesProgress.vue";
import SimpleChart from "../components/charts/SimpleChart.vue";
import ProjectViewList from "../components/units/ProjectViewList.vue";
export default {
  components: {
    StagesProgress,
    SimpleChart,
    ProjectViewList,
  },
  data() {
    return {
      charts: [
        {
          title: "Total Members",
          count: 58,
          pvalue: "40%",
          rating: true,
          dataValues: [31, 40, 28, 58],
        },
        {
          title: "Guests",
          count: 21,
          pvalue: "10%",
          rating: false,
          dataValues: [35, 27, 30, 21],
        },
        {
          title: "Active Now",
          count: 12,
          pvalue: "20%",
          rating: true,
          dataValues: [31, 40, 28, 58],
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  --charts-container-gap: 16px;
}
.project-view-container {
  display: grid;
  /* height: 100%; */
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(12, 1fr); */
  gap: 8px;
}
.top-container {
  width: 100%;
  min-height: 100px;
  /* align-self: start; */
  justify-self: start;
  grid-column: 1 / span 4;
  display: flex;
  /* align-items: flex-end; */
}
.title {
  font-family: "Montserrat-Bold";
  font-size: 32px;
  white-space: nowrap;
  align-self: center;
}
.stages-progress-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-container {
  grid-column: span 4;
  /* grid-row: 2 / span 11; */
  background: var(--white1);
  border-radius: 16px;
  margin-bottom: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(13, 1fr); */
  /* gap: 16px; */
  padding: 32px;
}
.charts-container {
  grid-column: 1 / span 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 160px;
  gap: var(--charts-container-gap);
}
.simple-chart {
  height: 160px;
  /* width: 370px; */
  width: calc(100% / 3 - var(--charts-container-gap));
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 2px 2px;
  padding: 16px;
}
.list-container {
  grid-column: 1 / span 4;
  /* grid-row: 2 / span 12; */
}

@media screen and (max-width: 1279px) {
  .project-view-container {
    display: grid;
    height: auto;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(12, 1fr); */
    gap: 8px;
  }
  .content-container {
    grid-column: span 4;
    /* grid-row: 2 / span 11; */
    background: var(--white1);
    border-radius: 16px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* grid-template-rows: repeat(13, 1fr); */
    /* grid-template-rows: auto; */
    gap: 16px;
    padding: 32px;
  }
  .list-container {
    grid-column: 1 / span 4;
    /* grid-row: 2 / span 12; */
    /* grid-row: auto; */
  }
  .title {
    grid-column: 2 / span 2;
    justify-self: center;
  }
}
@media screen and (max-width: 1023px) {
  .charts-container {
    grid-column: 1 / span 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column;
    width: 100%;
    height: auto;
  }
  .simple-chart {
    width: calc(80% - var(--charts-container-gap));
  }
}

@media screen and (max-width: 949px) {
  .content-container {
    grid-column: span 4;
    /* grid-row: 2 / span 11; */
    background: var(--white1);
    border-radius: 16px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 16px;
    padding: 32px;
  }
  /* .charts-container {
    grid-column: 1 / span 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    gap: 32px;
  } */
  .simple-chart {
    width: 100%;
  }
}

@media screen and (max-width: 849px) {
  .top-container {
    min-height: 40px;
  }
}
@media screen and (max-width: 430px) {
  .content-container {
    grid-column: span 4;
    /* grid-row: 2 / span 11; */
    background: var(--white1);
    border-radius: 16px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 16px;
    padding: 16px;
  }
  .simple-chart {
    width: 100%;
  }
}
</style>