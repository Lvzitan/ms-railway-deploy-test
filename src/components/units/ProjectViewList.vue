<template>
  <main class="filters-wrapper">
    <section class="filters-container">
      <p class="-str filter-item" v-for="filter in filters" :key="filter">
        {{ filter }} <i class="i-close"></i>
      </p>
      <div class="filters-toggler-container">
        <i class="i-checkbox-menu-toggler"></i>
        <p class="-str">More filters</p>
      </div>
    </section>
    <div class="search-wrapper">
      <SearchBar />
    </div>
  </main>

  <main class="company-list-container"><ProjectOverviewTable /></main>
  <!-- <main class="company-list-container"><UnitZeroOverviewTable /></main> -->
</template>

<script>
import SearchBar from "../utils/BaseSearchBar.vue";
import ProjectOverviewTable from "../units/ProjectOverviewTable.vue";
import UnitZeroOverviewTable from "../units/UnitZeroOverviewTable.vue";
export default {
  components: { SearchBar, ProjectOverviewTable, UnitZeroOverviewTable },
  data() {
    return {
      filters: ["All time"],
    };
  },
};
</script>

<style scoped>
.filters-wrapper {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filters-container {
  display: flex;
  gap: 8px;
  height: 40px;
}
.filters-toggler-container {
  box-shadow: var(--myBoxShadow);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 2px;
  padding-inline: 10px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
}
.filter-item {
  color: var(--secondary);
  background: var(--info);
  padding-block: 2px;
  padding-inline: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
i {
  position: absolute;
  transform: scale(0.4);
  position: relative;
  cursor: pointer;
}
.search-wrapper {
  width: 240px;
  height: 40px;
}
.company-list-container {
  /* height: calc(100% - 60px); */
  /* height: 200px; */
  width: 100%;
}
@media screen and (max-width: 950px) {
  .filters-wrapper {
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
  }
  .filters-container {
    display: flex;
    gap: 8px;
    height: 40px;
  }
  .search-wrapper {
    width: 100%;
  }
}
</style>