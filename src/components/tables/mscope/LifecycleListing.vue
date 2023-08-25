<template>
  <main class="table-container" title="">
    <table class="my-table">
      <thead class="my-thead">
        <tr id="lifecycleThead">
          <th class="my-th">
            <p class="-stb">Stage</p>
          </th>
          <th class="my-th">
            <p class="-stb">Start Date</p>
          </th>
          <th class="my-th">
            <p class="-stb">Deadline</p>
          </th>
          <th class="my-th">
            <p class="-stb">Stage Budget</p>
          </th>
          <th class="my-th">
            <p class="-stb">Construction Cost</p>
          </th>
          <th class="my-th">
            <p class="-stb">Stage Notes</p>
          </th>
          <th class="my-th"></th>
        </tr>
      </thead>
      <tbody
        v-for="(stage, index) in stages"
        :key="stage"
        :style="[`height: calc(100% / ${stages.length}) !important;`]"
      >
        <tr
          class="tr-content"
          :class="[
            index % 2 ? 'bg-primary' : 'bg-secondary',
            { 'current-stage': currentStage === stage.stage_value },
          ]"
        >
          <td>
            <div class="my-td" style="padding-left: 16px">
              <p class="-stb">{{ stage.stage_value }}</p>
            </div>
          </td>
          <td>
            <div class="my-td">
              <p class="-xstb">{{ stage.start_date }}</p>
            </div>
          </td>
          <td>
            <div class="my-td">
              <p class="-xstb">{{ stage.deadline }}</p>
            </div>
          </td>
          <td>
            <div class="my-td flex-center">
              <p class="-xstb">{{ stage.budget }} €</p>
            </div>
          </td>
          <td>
            <div class="my-td flex-center">
              <p class="-xstb">{{ stage.cost }} €</p>
            </div>
          </td>
          <td>
            <div
              class="my-td notes-wrapper"
              style="justify-content: flex-start; min-width: 886px"
            >
              <p class="-xstb">{{ stage.notes }}</p>
            </div>
          </td>
          <td>
            <div class="my-td" style="overflow: hidden">
              <IconEdit title="Edit Row" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import IconEdit from "../../../assets/icons/dynamicIcons/IconEdit.vue";
export default {
  props: ["stages"],
  components: { IconEdit },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentStage"]),
  },
};
</script>

<style scoped>
/*TABLE*/
.listing {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.bg-primary {
  background: #f9fafb !important;
}
.bg-secondary {
  background: var(--white1) !important;
}
.table-container {
  width: 100%;
  height: auto;
  /* overflow: auto; */
}
.item-hover {
  cursor: pointer;
}
.my-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  transition: all 250ms ease;
}
.my-thead {
  background: var(--primary);
}

.my-th {
  padding: 8px;
  color: var(--white1);
}
.my-th:first-child {
  border-top-left-radius: 8px;
}
.my-th:last-child {
  border-top-right-radius: 8px;
}
.my-td {
  padding: 8px;
}
.toggled-row {
  position: relative;
  box-shadow: 0px 8px 8px -6px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.tr-content:hover {
  background: rgb(243, 248, 254) !important;
}
.tr-toggled-content {
  /* border-block: 1px solid var(--gray5); */
  background: var(--gray6);
}
.tr-toggled-content:last-child {
  box-shadow: inset 0px -8px 8px -6px rgba(0, 0, 0, 0.1);
}
.flex-row {
  display: flex;
  gap: 4px;
  justify-content: flex-start;
  align-items: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-column p:last-child {
  color: var(--gray2);
}

.toggled {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 64px;
  padding-inline: 12px;
}
.toggled-text {
  color: var(--gray2);
}
/*ICONS*/
i {
  transform: scale(0.5);
  cursor: pointer;
}

.rotate {
  transform: rotateZ(180deg) scale(0.5);
}

/*STATUS*/
.status-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: fit-content;
  padding-inline: 8px;
  padding-block: 4px;
  border-radius: 32px;
}
.completed {
  background: #e3ffef;
  color: #027a48;
}
.ongoing {
  background: #e0f6ff;
  color: #0044b9;
}
.awaiting-verification {
  white-space: nowrap;
  background: #f8edff;
  color: #c973ff;
}
thead {
  position: sticky;
  top: 0;
  z-index: 2;
}

.table-container {
  height: 100%;
}
.my-table {
  height: 100%;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  min-width: 1023px;
}
.my-thead {
  height: 44px !important;
  white-space: nowrap;
}
.my-th {
  padding-inline: 16px;
}
.my-td {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.current-stage,
.current-stage:hover {
  transition: background 150ms ease;
  background: rgb(230, 247, 255) !important;
  background: linear-gradient(
    156deg,
    rgba(230, 247, 255, 1) 25%,
    rgba(215, 232, 255, 1) 100%
  ) !important;
}

@media screen and (max-width: 1023px) {
  .submenu {
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* border: 1px solid black; */
    gap: 16px;
  }
  .highlight {
    display: none;
  }
  .actions {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>