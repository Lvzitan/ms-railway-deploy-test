<template>
  <main class="content-page">
    <section class="top-section">
      <section class="charts-wrapper">
        <div
          class="simple-chart"
          v-for="chart in charts"
          :key="chart"
          :style="`width: calc(100% / (${charts.length})`"
        >
          <SimpleChart
            :title="chart.title"
            :count="chart.count"
            :rating="chart.rating"
            :hideNotes="true"
            :dataValues="chart.dataValues"
          />
        </div>
      </section>
      <section class="top-filters-wrapper">
        <div class="flex-item">
          <div class="searchbar-container"><SearchBar /></div>
        </div>
        <div class="flex-item">
          <select class="-xstb">
            <option selected disabled hidden>Filters</option>
            <option class="-xstb">Option 1</option>
          </select>

          <select class="-xstb">
            <option selected disabled hidden>Originator</option>
            <option class="-xstb">Option 1</option>
          </select>
          <div class="btn"><i class="i-list"></i></div>
          <div class="btn"><i class="i-grid"></i></div>
        </div>
      </section>
    </section>
    <section class="listing-wrapper">
      <OverviewListing />
    </section>
  </main>
</template>

<script>
import SimpleChart from "../../../components/charts/SimpleChart.vue";
import SearchBar from "../../../components/utils/BaseSearchBar.vue";
import OverviewListing from "../../../components/tables/msource/OverviewListing.vue";
export default {
  components: {
    SimpleChart,
    SearchBar,
    OverviewListing,
  },
  data() {
    return {
      // TEMP
      charts: [
        {
          title: "Files Submitted",
          count: 16,
          rating: true,
          hideNotes: true,
          dataValues: [0, 5, 15],
        },
        {
          title: "Files For Approval",
          count: 12,
          rating: false,
          dataValues: [0, 5, 7],
        },
        {
          title: "RFI's",
          count: 7,
          rating: true,
          dataValues: [0, 12, 12],
        },
        {
          title: "Files On Hold",
          count: 3,
          rating: false,
          dataValues: [0, 1],
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  --filtersWidth: 520px;
  --filterItemHeight: 40px;
  --search-btn-width: 100px;
  --top-section-height: 110px;
  --content-page-gap: 8px;
}
.content-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--content-page-gap);
}
.top-section {
  width: 100%;
  height: var(--top-section-height);
  display: flex;
}
.charts-wrapper {
  width: calc(100% - var(--filtersWidth));
  height: 100%;
  display: flex;
  gap: 16px;
}
.simple-chart {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 2px 2px;
  padding-left: 12px;
  border-radius: 8px;
  background: var(--white1);
}
.top-filters-wrapper {
  width: var(--filtersWidth);
  height: 100%;
  padding-left: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  gap: 8px;
}
.searchbar-container {
  width: 100%;
  height: var(--filterItemHeight);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.btn {
  background: var(--secondary);
  width: calc(var(--search-btn-width) / 2 - 10px);
  box-shadow: var(--myBoxShadow);
  user-select: none;
  cursor: pointer;
  transition: filter 200ms ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn:hover {
  filter: brightness(110%);
}
.flex-item {
  width: 100%;
  display: flex;
  gap: 8px;
}

select {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  padding: 8px;
  outline: none;
  height: var(--filterItemHeight);
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
select:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--secondary-transp);
}
select:first-child {
  width: calc(30% - calc(var(--search-btn-width) / 2));
}
select:nth-child(2) {
  width: calc(70% - calc(var(--search-btn-width) / 2));
}
i {
  scale: 1;
}
.listing-wrapper {
  width: 100%;
  height: calc(100% - var(--top-section-height) - var(--content-page-gap));
}
@media screen and (max-width: 1599px) {
  * {
    --filtersWidth: 440px;
  }
}
@media screen and (max-width: 1366px) {
  .top-section {
    height: auto;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  .charts-wrapper {
    height: 100px;
    width: 100%;
  }
  .listing-wrapper {
    height: calc(100% - 212px);
  }
}

@media screen and (max-width: 719px) {
  .charts-wrapper {
    display: none;
  }
  .simple-chart {
    width: 60% !important;
  }
  .listing-wrapper {
    height: calc(100% - 100px);
  }
}
@media screen and (max-width: 499px) {
  .top-filters-wrapper {
    padding-left: 0;
    width: 100%;
  }
}
</style>