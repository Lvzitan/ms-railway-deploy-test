<template>
  <main class="chart-container">
    <section class="chart-label">
      <p class="-stb">{{ title }}</p>
      <p class="-ltb">{{ count }}</p>
      <div class="status-container" v-if="!hideNotes">
        <i :class="[rating ? 'i-arrow-up-success' : 'i-arrow-down-fail']"></i>
        <p class="-ntb">
          <span :class="[rating ? 'status-success' : 'status-fail']">{{
            pvalue
          }}</span>
          vs last month
        </p>
      </div>
    </section>
    <section class="chart-graph">
      <div id="chart">
        <apexchart
          type="area"
          height="100%"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  props: ["title", "count", "pvalue", "rating", "dataValues", "hideNotes"],
  data() {
    return {
      success: "#12b76a",
      fail: "#eb5757",
      //THIS IS THE CHART OBJECT
      series: [
        {
          name: "members",
          data: this.dataValues,
        },
      ],
      chartOptions: {
        chart: {
          height: "100%",
          type: "area",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: ["", "", "", ""],
          labels: { show: false },
          axisBorder: {
            show: false,
          },
        },
        yaxis: { show: false },
        grid: { show: false },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        colors: [""],
        fill: {
          shade: "light",
          colors: [""],

          gradient: {
            gradientToColors: [""],
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
          },
        },
      },
    };
  },
  created() {
    if (this.rating) {
      this.chartOptions.colors[0] = this.success;
      this.chartOptions.fill.colors[0] = this.success;
      this.chartOptions.fill.gradient.gradientToColors[0] = this.success;
      this;
    } else {
      this.chartOptions.colors[0] = this.fail;
      this.chartOptions.fill.colors[0] = this.fail;
      this.chartOptions.fill.gradient.gradientToColors[0] = this.fail;
    }
  },
};
</script>

<style scoped>
.status-succcess {
  color: var(--success);
}
.status-fail {
  color: var(--error);
}
.fail {
  color: var(--fail);
}
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  --myColor: black;
}
.chart-label,
.chart-graph {
  width: 50%;
  height: 100%;
}
.chart-label {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: flex-start;
  white-space: nowrap;
}

.status-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.status-container i {
  transform: scale(0.4);
}
.status-container p {
  color: var(--gray3);
  font-size: 12px;
}
.-ltb {
  font-size: 28px;
  padding-top: 16px;
}
#chart {
  height: 100%;
}
</style>