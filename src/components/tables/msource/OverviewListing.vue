<template>
  <main class="info-container">
    <ul class="labels-wrapper">
      <p class="-xstb" style="color: var(--gray1); padding-right: 4px">
        <i class="i-Labels"></i>LABELS
      </p>
      <li
        v-for="label in labels"
        :key="label"
        @click="label.isNotActive = !label.isNotActive"
        class="label-filter-item"
        :class="{ isNotActive: label.isNotActive }"
        :style="`color: ${label.color}; background: ${label.bgColor}; box-shadow: 0 0 0 1px ${label.color}`"
      >
        <p class="-xstb">{{ label.name }}</p>
      </li>
      <p class="-xstb">+</p>
    </ul>
    <section class="table-wrapper">
      <table class="my-table">
        <thead class="my-thead">
          <tr>
            <th class="my-th">
              <p class="-stb">Type</p>
            </th>
            <th class="my-th">
              <p class="-stb">Description</p>
            </th>
            <th class="my-th">
              <p class="-stb">Reference</p>
            </th>
            <th class="my-th">
              <p class="-stb" style="text-align: center">Revision</p>
            </th>
            <th class="my-th">
              <p class="-stb" style="text-align: center">Version</p>
            </th>
            <th class="my-th">
              <p class="-stb">Date</p>
            </th>
            <th class="my-th">
              <p class="-stb">Status</p>
            </th>
            <th class="my-th">
              <p class="-stb">Publisher</p>
            </th>
            <th class="my-th" style="width: 280px">
              <p class="-stb">Labels</p>
            </th>
          </tr>
        </thead>
        <tbody v-for="(file, index) in files" :key="file">
          <tr
            class="tr-content"
            :class="[index % 2 ? 'bg-primary' : 'bg-secondary']"
          >
            <td class="my-td">
              <i :class="`i-${file.extension}`"></i>
            </td>
            <td class="my-td">
              <p class="-xstb">{{ file.name }}</p>
              <p class="-xstr">{{ file.size }}</p>
            </td>
            <td class="my-td">
              <p class="-str">{{ file.ref }}</p>
            </td>
            <td class="my-td">
              <p class="-xstb" style="text-align: center">
                {{ file.revision }}
              </p>
            </td>
            <td class="my-td">
              <p class="-xstb" style="text-align: center">{{ file.version }}</p>
            </td>
            <td class="my-td">
              <p class="-xstb">{{ file.date }}</p>
            </td>
            <td class="my-td">
              <div
                class="status-container"
                :class="getStatusStyle(file.status)"
              >
                <p class="-xstb">{{ file.status }}</p>
              </div>
            </td>
            <td class="my-td">
              <div class="flex-row">
                <DynaBadge
                  :picturePath="file.publisher.corporate.logoPath"
                  :firstName="file.publisher.corporate.name"
                />
                <div class="flex-column">
                  <p class="-xstb">
                    {{ file.publisher.agent_title }}
                  </p>
                  <p class="-xstr">{{ file.publisher.name }}</p>
                </div>
              </div>
            </td>

            <td class="my-td">
              <div class="label-container">
                <p
                  v-for="label in getComputedLabels(file.labels)"
                  :key="label"
                  :class="['-stb', 'label']"
                  :style="`color: ${label.color}; background: ${label.bgColor}`"
                >
                  {{ label.name }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import DynaBadge from "../../utils/DynaBadge.vue";
export default {
  components: {
    DynaBadge,
  },
  data() {
    return {
      files: [
        {
          name: "Facade Model",
          extension: "rvt",
          size: "220 MB",
          ref: "NUC-Bl1-ICM-ZZ-A-PM_40_35_04-M3-S0-P01_01-FAC",
          revision: 1,
          version: 1,
          date: "Sep 4, 2022",
          status: "S1",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/imarch.png"),
              name: "IM Architecture",
            },
            agent_title: "Architect",
            name: "Sophia Holland",
          },
          labels: ["ARCH", "FAC", "ZZ", "ST4", "WF1", "Preliminary"],
        },
        {
          name: "Facade Description",
          extension: "pdf",
          size: "8 MB",
          ref: "NUC-Bl1-ZZ-ICM-A-PM_10_10_60-RP-S1-P01_01-FAC",
          revision: 1,
          version: 1,
          date: "Sep 4, 2022",
          status: "S1",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/imarch.png"),
              name: "IM Architecture",
            },
            agent_title: "Architect",
            name: "Sophia Holland",
          },
          labels: ["ARCH", "FAC", "ZZ", "ST4", "WF1", "Preliminary"],
        },
        {
          name: "Facade BoQ",
          extension: "xls",
          size: "5 MB",
          ref: "NUC-Bl1-ZZ-ICM-A-PM_60_50_23-BQ-S0-P01_01_FAC",
          revision: 1,
          version: 1,
          date: "Jan 8, 2022",
          status: "S0",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/imarch.png"),
              name: "IM Architecture",
            },
            agent_title: "Architect",
            name: "Sophia Holland",
          },
          labels: ["ARCH", "FAC", "ZZ", "ST4", "WF1"],
        },
        {
          name: "Landscape Model",
          extension: "rvt",
          size: "188 MB",
          ref: "NUC-Bl1-GF-GRD-A-PM_40_35_45-M3-S2-P01_02-LND",
          revision: 1,
          version: 2,
          date: "Sep 8, 2022",
          status: "S2",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/gradient.png"),
              name: "Gradient",
            },
            agent_title: "Landscape Architect",
            name: "Jessica Smith",
          },
          labels: ["ARCH", "LND", "GF", "ST4", "WF1"],
        },
        {
          name: "Landscape Description",
          extension: "pdf",
          size: "7 MB",
          ref: "NUC-Bl1-GF-GRD-A-PM_10_10_60-RP-S0-P01_01-LND",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S2",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/gradient.png"),
              name: "Gradient",
            },
            agent_title: "Landscape Architect",
            name: "Jessica Smith",
          },
          labels: ["ARCH", "LND", "GF", "ST4", "WF1"],
        },
        {
          name: "Landscape Plan",
          extension: "dwg",
          size: "4 MB",
          ref: "NUC-Bl1-GF-GRD-A-PM_70_90_46-DG-S2-P01_01-LND",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S2",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/gradient.png"),
              name: "Gradient",
            },
            agent_title: "Landscape Architect",
            name: "Jessica Smith",
          },
          labels: ["ARCH", "LND", "GF", "ST4", "WF1"],
        },
        {
          name: "Lighting Design BoQ",
          extension: "xls",
          size: "3 MB",
          ref: "NUC-Bl1-ZZ-ICM-A-PM_40_20_47-BQ-S0-P01_03-LTD",
          revision: 1,
          version: 3,
          date: "Sep 8, 2022",
          status: "S3",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/imarch.png"),
              name: "IM Architecture",
            },
            agent_title: "Architect",
            name: "Sophia Holland",
          },
          labels: ["ARCH", "LTD", "XX", "ST4", "WF1"],
        },
        {
          name: "Lighting Design Drawings",
          extension: "dwg",
          size: "6 MB",
          ref: "NUC-Bl1-ZZ-ICM-A-PM_40_20_47-DG-S0-P0_01-LTD",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S0",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/imarch.png"),
              name: "IM Architecture",
            },
            agent_title: "Architect",
            name: "Sophia Holland",
          },
          labels: ["ARCH", "LTD", "FL01", "ST4", "WF1"],
        },
        {
          name: "Lighting Design Report",
          extension: "pdf",
          size: "3 MB",
          ref: "NUC-Bl1-ZZ-ICM-A-PM_40_20_47-RP-S0-P01_01-LTD",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S0",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/imarch.png"),
              name: "IM Architecture",
            },
            agent_title: "Architect",
            name: "Sophia Holland",
          },
          labels: ["ARCH", "LTD", "FL01", "ST4", "WF1"],
        },
        {
          name: "Structural Model - Cast-in-place Concrete",
          extension: "ifc",
          size: "40 MB",
          ref: "NUC-Bl1-GF-BMS-S-PM_40_35_83-M3-S0-P01_01-CNC",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S0",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/tns.png"),
              name: "TNS",
            },
            agent_title: "Structural Engineer",
            name: "Alan Davis",
          },
          labels: ["STR", "CNC", "ZZ", "ST4", "WF2"],
        },
        {
          name: "Cast-in-place Concrete Report",
          extension: "pdf",
          size: "5 MB",
          ref: "NUC-Bl1-02-BMS-S-PM_40_20_83-RP-S1-P01_01-CNC",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S1",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/tns.png"),
              name: "TNS",
            },
            agent_title: "Structural Engineer",
            name: "Alan Davis",
          },
          labels: ["STR", "CNC", "ZZ", "ST4", "WF2"],
        },
        {
          name: "Steelwork BoQ",
          extension: "xls",
          size: "3 MB",
          ref: "NUC-Bl1-ZZ-BMS-S-PM_40_30_20-BQ-S1-P01_01-STW",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S1",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/tns.png"),
              name: "TNS",
            },
            agent_title: "Structural Engineer",
            name: "Alan Davis",
          },
          labels: ["STR", "STW", "ZZ", "ST4", "WF2"],
        },
        {
          name: "Steelwork Design Report",
          extension: "pdf",
          size: "2 MB",
          ref: "NUC-Bl1-02-BMS-S-PM_40_30_20-CA-S1-P01_02-STW",
          revision: 1,
          version: 2,
          date: "Sep 8, 2022",
          status: "S1",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/tns.png"),
              name: "TNS",
            },
            agent_title: "Structural Engineer",
            name: "Alan Davis",
          },
          labels: ["STR", "STW", "ZZ", "ST4", "WF2"],
        },
        {
          name: "Post Tension Slabs Model",
          extension: "pdf",
          size: "18 MB",
          ref: "NUC-Bl1-03-BMS-S-PM_40_30_20-CA-S2-P01_01-PST",
          revision: 1,
          version: 1,
          date: "Sep 8, 2022",
          status: "S2",
          publisher: {
            corporate: {
              logoPath: require("../../../assets/temp/orgs/tns.png"),
              name: "TNS",
            },
            agent_title: "Structural Engineer",
            name: "Alan Davis",
          },
          labels: ["STR", "PST", "ZZ", "ST4", "WF2"],
        },
      ],

      labels: [
        //Discipline
        { name: "ARCH", color: "#01682A", bgColor: "#B1FFD0" },
        { name: "STR", color: "#01682A", bgColor: "#B1FFD0" },
        { name: "MEC", color: "#01682A", bgColor: "#B1FFD0" },
        { name: "ELE", color: "#01682A", bgColor: "#B1FFD0" },
        { name: "CVL", color: "#01682A", bgColor: "#B1FFD0" },
        { name: "STT", color: "#01682A", bgColor: "#B1FFD0" },
        { name: "HVAC", color: "#01682A", bgColor: "#B1FFD0" },
        //Subdiscipline
        //ARCH
        { name: "LND", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "FAC", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "IDSG", color: "#01682A", bgColor: "#C2FFAC" },
        //STR
        { name: "CNC", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "PRC", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "PST", color: "#01682A", bgColor: "#C2FFAC" },
        //MEC
        { name: "LFT", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "PMP", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "BMS", color: "#01682A", bgColor: "#C2FFAC" },
        //ELE
        { name: "ALR", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "D&T", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "LGT", color: "#01682A", bgColor: "#C2FFAC" },
        //CVL
        { name: "DRN", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "PAV", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "R&P", color: "#01682A", bgColor: "#C2FFAC" },
        //STT
        { name: "LIC", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "PER", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "CND", color: "#01682A", bgColor: "#C2FFAC" },
        //HVAC
        { name: "DCT", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "SPL", color: "#01682A", bgColor: "#C2FFAC" },
        { name: "FCU", color: "#01682A", bgColor: "#C2FFAC" },
        //Level&Location
        { name: "B02", color: "#175CD3", bgColor: "#ebebff" },
        { name: "B01", color: "#175CD3", bgColor: "#ebebff" },
        { name: "GF", color: "#175CD3", bgColor: "#ebebff" },
        { name: "F01", color: "#175CD3", bgColor: "#ebebff" },
        { name: "F02", color: "#175CD3", bgColor: "#ebebff" },
        { name: "F03", color: "#175CD3", bgColor: "#ebebff" },
        { name: "M01", color: "#175CD3", bgColor: "#ebebff" },
        { name: "M02", color: "#175CD3", bgColor: "#ebebff" },
        { name: "RF", color: "#175CD3", bgColor: "#ebebff" },
        { name: "SITE", color: "#175CD3", bgColor: "#ebebff" },
        { name: "ZZ", color: "#175CD3", bgColor: "#ebebff" },
        { name: "XX", color: "#175CD3", bgColor: "#ebebff" },
        //Status
        { name: "S0", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "S1", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "S2", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "S3", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "D1", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "D2", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "D3", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "D4", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "A1", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "A2", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "B1", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "B2", color: "#FEA800", bgColor: "#FFEDCA" },
        { name: "AB", color: "#FEA800", bgColor: "#FFEDCA" },
        //Stage
        { name: "ST0", color: "#F08151", bgColor: "#F6C6AA" },
        { name: "ST1", color: "#F08151", bgColor: "#F6C6AA" },
        { name: "ST2", color: "#F08151", bgColor: "#F6C6AA" },
        { name: "ST3", color: "#F08151", bgColor: "#F6C6AA" },
        { name: "ST4", color: "#F08151", bgColor: "#F6C6AA" },
        { name: "ST5", color: "#F08151", bgColor: "#F6C6AA" },
        { name: "ST6", color: "#F08151", bgColor: "#F6C6AA" },
        { name: "ST7", color: "#F08151", bgColor: "#F6C6AA" },
        //Workflow
        { name: "WF_Arch", color: "#F05151", bgColor: "#F9C3C3" },
        { name: "WF_Str", color: "#F05151", bgColor: "#F9C3C3" },
        { name: "WF_Mec", color: "#F05151", bgColor: "#F9C3C3" },
        { name: "WF_Ele", color: "#F05151", bgColor: "#F9C3C3" },
        { name: "WF_Stt", color: "#F05151", bgColor: "#F9C3C3" },
        { name: "WF_TBD", color: "#F05151", bgColor: "#F9C3C3" },
        //Suitability
        { name: "Contractual", color: "#120FCD", bgColor: "#cddfff" },
        { name: "Preliminary", color: "#120FCD", bgColor: "#cddfff" },
      ],
    };
  },
  methods: {
    getStatusStyle(status) {
      const statusList = ["Ongoing", "Awaiting Verification", "Completed"];
      const filtered = statusList.filter((msg) => msg === status);

      return filtered.toString().replace(" ", "-").toLowerCase();
    },
    getComputedLabels(labelsArray) {
      const computedLabels = this.labels.filter((label) =>
        labelsArray.includes(label.name)
      );

      return computedLabels;
    },
    getLabelsFromAllFiles() {
      //returns new array of all the labels accros all the files - should come from DB but still an amazing 1 line code
      const filesLabels = [
        ...new Set(this.files.map((file) => file.labels).flat(1)),
      ];
      return filesLabels;
    },
  },
};
</script>

<style scoped>
.bg-primary {
  background: #f9fafb !important;
}
.bg-secondary {
  background: var(--white1) !important;
}
.table-container {
  width: 100%;
  height: auto;
}
.item-hover {
  cursor: pointer;
}
.my-table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;
  transition: all 250ms ease;
  overflow: auto;
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

.info-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
}

.labels-wrapper {
  display: flex;
  gap: 8px;
  height: auto;
  padding-block: 4px;
  padding-inline: 4px;
  /* border: 1px solid red; */
  align-items: center;
  white-space: nowrap;
  flex-wrap: wrap;
  overflow: auto;
  max-height: 52px;
}
.table-wrapper {
  width: 100%;
  height: calc(100% - 8px);
  overflow: auto;
}
.status-container {
  display: flex;
  justify-content: flex-start;
  padding-left: 16px;
  align-items: center;
  width: 100%;
}
.labels-wrapper > p:last-child {
  background: #eff8ff;
  color: var(--info);
  padding-inline: 8px;
  padding-block: 2px;
  border-radius: 8px;
  cursor: pointer;
}

.label-filter-item {
  padding-block: 2px;
  color: var(--gray3);
  background: var(--gray6);
  user-select: none;
  cursor: pointer;
  transition: letter-spacing 200ms ease;
}
.label-filter-item:hover {
  opacity: 0.6;
}
i {
  scale: 2.6;
}
.label-container {
  display: flex;
  /* justify-content: space-between; */
  gap: 8px;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}
.label,
.label-filter-item {
  padding-inline: 8px;
  border-radius: 8px;
  height: 18px;
}

.i-Labels {
  height: 16px;
  align-self: flex-start;
}
.isNotActive {
  color: var(--gray2) !important;
  background: var(--gray5) !important;
  box-shadow: none !important;
}
thead {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>