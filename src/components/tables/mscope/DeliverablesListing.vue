<template>
  <main class="table-container" v-if="deliverables.length">
    <table class="my-table">
      <thead class="my-thead">
        <tr>
          <th class="my-th" style="min-width: 110px">
            <p class="-stb">Reference</p>
          </th>
          <th class="my-th" style="width: 20%; min-width: 300px">
            <p class="-stb">Deliverable Title</p>
          </th>
          <th class="my-th" style="min-width: 170px">
            <p class="-stb">Originator</p>
          </th>
          <th class="my-th" style="min-width: 170px">
            <p class="-stb">Contributors</p>
          </th>
          <th class="my-th" style="min-width: 110px">
            <p class="-stb">Deadline</p>
          </th>
          <th class="my-th">
            <p class="-stb">Status</p>
          </th>
          <th
            class="my-th"
            style="width: 4%"
            v-show="selectedStages.length > 1"
          >
            <p class="-stb">Stage</p>
          </th>
          <th class="my-th" style="width: 3%"></th>
          <th class="my-th" style="width: 3%"></th>
          <th class="my-th" style="width: 3%"></th>
          <th class="my-th" style="width: 3%"></th>
        </tr>
      </thead>
      <tbody v-for="(deliverable, index) in deliverables" :key="deliverable">
        <tr
          class="tr-content"
          :class="[
            index % 2 ? 'bg-primary' : 'bg-secondary',
            { 'toggled-row': deliverable.toggled && deliverable.files },
          ]"
        >
          <td
            @click="deliverable.toggled = !deliverable.toggled"
            class="my-td item-hover"
          >
            <div class="flex-row">
              <p class="-stb">{{ deliverable.ref }}</p>
              <i
                v-if="deliverable.files"
                class="i-arrow-open-down"
                :class="{ rotate: deliverable.toggled }"
              ></i>
            </div>
          </td>
          <td
            @click="deliverable.toggled = !deliverable.toggled"
            class="my-td item-hover"
          >
            <p class="-str">
              {{ deliverable.title }}
            </p>
          </td>

          <td class="my-td flex-column" style="gap: 8px">
            <div class="flex-row">
              <DynaBadge
                :picturePath="deliverable.user.picture"
                :firstName="deliverable.user.firstName"
                :lastName="deliverable.user.lastName"
              />
              <div class="flex-column">
                <p class="-stb">{{ deliverable.agent }}</p>
                <p class="-xstr">
                  {{ deliverable.user.firstName }}
                  {{ deliverable.user.lastName }}
                </p>
              </div>
            </div>
          </td>

          <td class="my-td">
            <div class="users-container">
              <DynaBadge
                v-for="(c, index) in deliverable.contributor"
                :key="c"
                :picturePath="c.picture"
                :firstName="c.firstName"
                :lastName="c.lastName"
                :style="{
                  transform: `translateX(calc( -1 * (calc(16px + calc(${index} * 10px)) ))`,
                }"
              />
              <!-- <div class="flex-column">
                <p class="-stb">{{ deliverable.contributor.name }}</p>
                <p class="-xstr">
                  {{ deliverable.contributor.email }}
                </p>
              </div> -->
            </div>
          </td>

          <td class="my-td">
            <p class="-str">{{ deliverable.deadline }}</p>
          </td>
          <td class="my-td">
            <p
              class="-xstb status-container"
              :class="getStatusStyle(deliverable.status)"
            >
              {{ deliverable.status }}
            </p>
          </td>
          <td
            class="my-td"
            style="max-width: 20px !important; padding-left: 30px"
            v-show="selectedStages.length > 1"
          >
            <p class="-stb">{{ deliverable.stage }}</p>
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconNewDoc title="Add New Document" />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconLink title="Link to Workflow/Element" />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconEdit
              title="Edit Row"
              @click="setModal('update', deliverable)"
            />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconTrash @click="removeItem(deliverable.id)" title="Delete Row" />
          </td>
        </tr>
        <tr
          v-show="deliverable.files && deliverable.toggled"
          class="tr-toggled-content"
        >
          <td colspan="11">
            <InnerTable :files="deliverable.files" />
          </td>
        </tr>
      </tbody>
    </table>
  </main>
  <main class="no-data" v-else>
    <NoData :item="'deliverable'" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import IconTrash from "../../../assets/icons/dynamicIcons/IconTrash.vue";
import IconEdit from "../../../assets/icons/dynamicIcons/IconEdit.vue";
import IconLink from "../../../assets/icons/dynamicIcons/IconLink.vue";
import IconNewDoc from "../../../assets/icons/dynamicIcons/IconNewDoc.vue";
import DynaBadge from "../../utils/DynaBadge.vue";
import InnerTable from "../../utils/InnerTable.vue";
import NoData from "../../utils/NoData.vue";
export default {
  components: {
    IconTrash,
    IconEdit,
    IconLink,
    IconNewDoc,
    DynaBadge,
    InnerTable,
    NoData,
  },
  data() {
    return {
      onBehalf: false,
      dummyDeliverables: [
        {
          id: 1, //increment++
          ref: "GW.1.01",
          title: "Groundworks",
          agent: "Structural Engineer",
          files: [
            {
              title: "Groundworks and earthworks systems",
            },
            {
              title: "Topographic Survey ",
            },
            {
              title: "Landfill systems",
            },
            {
              title: "Stabilization systems",
            },
            {
              title: "Ground Condition Description.",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "", //deixa sempre este para ja
            //tag: "@TNovais",
            email: "adavis@tns.pt",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Elizabeth",
              lastName: "Fox",
              picture: "", //deixa sempre este para ja
              email: "mromao@gradient.net",
            },
          ],
          status: "Ongoing",
          deadline: "Sep 22, 2022",
          notes: "Site and Groundworks detail package ",
          stage: "3",
        },
        //------------------//
        {
          id: 2, //increment++
          ref: "H&S.1.01",
          title: "Health and Safety File",
          agent: "Construction Lead",
          files: [
            {
              title: "HVAC Model",
            },
            {
              title: "Audio-Visual Installation Model",
            },
            {
              title: "Alarm Systems Catalogue",
            },
            {
              title: "Fire Alarm Manual",
            },
            {
              title: "Risk Assesment",
            },
            {
              title: "Suppliers Listing Report",
            },
          ],
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "", //deixa sempre este para ja
            //tag: "@TNovais",
            email: "rward@siterra.uk",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Leighton",
              lastName: "Green",
              picture: "", //deixa sempre este para ja
              email: "lgreen@norcraft.net",
            },
          ],
          status: "Ongoing",
          deadline: "Jun 14, 2023",
          notes: "Health and Safety File and O&M Information ",
          stage: "6",
        },
        //------------------//
        {
          id: 3, //increment++
          ref: "DESING.V1",
          title: "Design Package",
          agent: "Lead Designer",
          files: [
            {
              title: "Facade Design Model",
            },
            {
              title: "Landscape Design Model",
            },
            {
              title: "Facade Design Description",
            },
            {
              title: "Lighting Design Plan",
            },
            {
              title: "Design Contract",
            },
            {
              title: "Post Tensioned Slabs Design",
            },
          ],
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "", //deixa sempre este para ja
            //tag: "@TNovais",
            email: "lgreen@norcraft.net",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Mark",
              lastName: "Green",
              picture: require("../../../assets/temp/users/jribeiro.png"), //deixa sempre este para ja
              email: "mgreen@brooks.com",
            },
            {
              firstName: "Alan",
              lastName: "Davis",
              picture: "", //deixa sempre este para ja
              email: "adavis@tns.pt",
            },
            {
              firstName: "Elizabeth",
              lastName: "Fox",
              picture: "", //deixa sempre este para ja
              email: "mromao@gradient.net",
            },
            {
              firstName: "Jimmy",
              lastName: "Stone",
              picture: "", //deixa sempre este para ja
              email: "abranco@brooks.com",
            },
          ],
          status: "Ongoing",
          deadline: "Sep 15, 2022",
          notes:
            "Design Package: Models and Plans for Architectural and Structural Design",
          stage: "4",
        },
        //------------------//
        {
          id: 4, //increment++
          ref: "Proposals.v1",
          title: "Proposals and Requests",
          agent: "Client",
          files: [
            {
              title: "Block 1 - Scope of Work",
            },
            {
              title: "Site Work Description",
            },
            {
              title: "Client Proposal Letter",
            },
            {
              title: "Payment Schedule",
            },
          ],
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"), //deixa sempre este para ja
            //tag: "@TNovais",
            email: "jaleixo@rsp.com",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Mark",
              lastName: "Green",
              picture: require("../../../assets/temp/users/jribeiro.png"), //deixa sempre este para ja
              email: "mgreen@brooks.com",
            },
            {
              firstName: "Jessica",
              lastName: "Smith",
              picture: "", //deixa sempre este para ja
              email: "jsmith@zafir.uk",
            },
            {
              firstName: "Robert",
              lastName: "Hunt",
              picture: require("../../../assets/temp/users/dfrancisco.png"), //deixa sempre este para ja
              email: "rhunt@dandf.net",
            },
          ],
          status: "Awaiting Verification",
          deadline: "Nov 10, 2022",
          notes: "Project proposals and design team requests ",
          stage: "4",
        },
        //------------------//
        {
          id: 5, //increment++
          ref: "B1.01",
          title: "Block 1 Package",
          agent: "Project Lead",
          files: [
            {
              title: "Block 1 - Facade Model",
            },
            {
              title: "Block 1 - Concrete Design",
            },
            {
              title: "Block 1 - Post Tensioned Elements",
            },
            {
              title: "Lift Systems",
            },
            {
              title: "HVAC Design Model",
            },
            {
              title: "Audio & Visual Installation",
            },
          ],
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"), //deixa sempre este para ja
            //tag: "@TNovais",
            email: "aarmstrong@ms4aeco.com",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Mark",
              lastName: "Green",
              picture: require("../../../assets/temp/users/jribeiro.png"), //deixa sempre este para ja
              email: "mgreen@brooks.com",
            },
            {
              firstName: "Sophia",
              lastName: "Holland",
              picture: require("../../../assets/temp/users/imacena.png"), //deixa sempre este para ja
              email: "sholland@imarch.pt",
            },
            {
              firstName: "Alan",
              lastName: "Davis",
              picture: "", //deixa sempre este para ja
              email: "adavis@tns.pt",
            },
            {
              firstName: "Seth",
              lastName: "Hopkins",
              picture: require("../../../assets/temp/users/asousa.png"), //deixa sempre este para ja
              email: "antonio@bsafety.net",
            },
          ],
          status: "Ongoing",
          deadline: "May 5, 2023",
          notes: "Block 1 information bundle ",
          stage: "5",
        },
        //------------------//
        {
          id: 6, //increment++
          ref: "BP.001",
          title: "Building Permits",
          agent: "Client",
          files: [
            {
              title: "Ocupation Permit",
            },
            {
              title: "Building License",
            },
            {
              title: "Planning Permission",
            },
            {
              title: "Responsability Matrix",
            },
          ],
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"), //deixa sempre este para ja
            //tag: "@TNovais",
            email: "jaleixo@rsp.com",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Andrew",
              lastName: "Armstrong",
              picture: require("../../../assets/temp/admin.png"), //deixa sempre este para ja
              email: "aarmstrong@ms4aeco.com",
            },
            {
              firstName: "Leighton",
              lastName: "Green",
              picture: "", //deixa sempre este para ja
              email: "lgreen@norcraft.net",
            },
          ],
          status: "Completed",
          deadline: "Aug 7, 2022",
          notes: "Issued Building Permits",
          stage: "3",
        },
        //------------------//
        {
          id: 7, //increment++
          ref: "P_RP.01",
          title: "Project Reports",
          agent: "Contract Administrator",
          files: [
            {
              title: "Ocupation Permit",
            },
            {
              title: "Building License",
            },
            {
              title: "Planning Permission",
            },
            {
              title: "Responsability Matrix",
            },
          ],
          user: {
            firstName: "Robert",
            lastName: "Hunt",
            picture: require("../../../assets/temp/users/dfrancisco.png"), //deixa sempre este para ja
            //tag: "@TNovais",
            email: "rhunt@dandf.net",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Andrew",
              lastName: "Armstrong",
              picture: require("../../../assets/temp/admin.png"), //deixa sempre este para ja
              email: "aarmstrong@ms4aeco.com",
            },
            {
              firstName: "Leighton",
              lastName: "Green",
              picture: "", //deixa sempre este para ja
              email: "lgreen@norcraft.net",
            },
            {
              firstName: "Mark",
              lastName: "Thompson",
              picture: require("../../../assets/temp/users/jaleixo.png"), //deixa sempre este para ja
              email: "jaleixo@rsp.com",
            },
          ],
          status: "Completed",
          deadline: "Aug 7, 2022",
          notes: "Issued Building Permits and Stuatory documentation",
          stage: "5",
        },
        //------------------//
        {
          id: 8, //increment++
          ref: "QC_v0",
          title: "Quality Assessment",
          agent: "Project Lead",
          files: [
            {
              title: "Quality Assurance Report - Site",
            },
            {
              title: "Quality Assurance Testing - Design",
            },
            {
              title: "Quality Assurance Testing - Concrete",
            },
            {
              title: "Quality Assurance Testing - Acoustic",
            },
          ],
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"), //deixa sempre este para ja
            //tag: "@TNovais",
            email: "aarmstrong@ms4aeco.com",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Leighton",
              lastName: "Green",
              picture: "", //deixa sempre este para ja
              email: "lgreen@norcraft.net",
            },
          ],
          status: "Completed",
          deadline: "Aug 7, 2022",
          notes: "Quality Assessment and Quality Control general documents",
          stage: "6",
        }, //------------------//
        {
          id: 9, //increment++
          ref: "BoQ_01",
          title: "Bills of Quantities",
          agent: "Cost Consultant",
          files: [
            {
              title: "Facade BoQ",
            },
            {
              title: "Steelwork BoQ",
            },
            {
              title: "Water Pumps BoQ",
            },
            {
              title: "Alarm System BoQ",
            },
          ],
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "", //deixa sempre este para ja
            //tag: "@TNovais",
            email: "jsmith@zafir.uk",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Leighton",
              lastName: "Green",
              picture: "", //deixa sempre este para ja
              email: "lgreen@norcraft.net",
            },
            {
              firstName: "Andrew",
              lastName: "Armstrong",
              picture: require("../../../assets/temp/admin.png"), //deixa sempre este para ja
              email: "aarmstrong@ms4aeco.com",
            },
            {
              firstName: "Alan",
              lastName: "Davis",
              picture: "", //deixa sempre este para ja
              email: "adavis@tns.pt",
            },
            {
              firstName: "Mark",
              lastName: "Green",
              picture: require("../../../assets/temp/users/jribeiro.png"), //deixa sempre este para ja
              email: "mgreen@brooks.com",
            },
            {
              firstName: "Jimmy",
              lastName: "Stone",
              picture: "", //deixa sempre este para ja
              email: "abranco@brooks.com",
            },
          ],
          status: "Ongoing",
          deadline: "Dec 27, 2022",
          notes: "Quantity takeoff and Bill of Quantities",
          stage: "5",
        }, //------------------//
        {
          id: 10, //increment++
          ref: "PR_001",
          title: "Product Documentation",
          agent: "Building Services Engineer",
          files: [
            {
              title: "Alarm Systems Certificate",
            },
            {
              title: "Balustrades Datasheet",
            },
            {
              title: "Doors and Doorframes Catalogue",
            },
            {
              title: "Lighting Datasheet",
            },
            {
              title: "Wifi Routers and APs Catalogue",
            },
          ],
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"), //deixa sempre este para ja
            //tag: "@TNovais",
            email: "tchambers@bm.net",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Jimmy",
              lastName: "Stone",
              picture: "", //deixa sempre este para ja
              email: "abranco@brooks.com",
            },
            {
              firstName: "Sophia",
              lastName: "Holland",
              picture: require("../../../assets/temp/users/imacena.png"), //deixa sempre este para ja
              email: "sholland@imarch.pt",
            },
            {
              firstName: "Harris",
              lastName: "Marshall",
              picture: require("../../../assets/temp/users/msantos.png"), //deixa sempre este para ja
              email: "msantos@niteroica.pt",
            },
            {
              firstName: "Mark",
              lastName: "Green",
              picture: require("../../../assets/temp/users/jribeiro.png"), //deixa sempre este para ja
              email: "mgreen@brooks.com",
            },
            {
              firstName: "Jimmy",
              lastName: "Stone",
              picture: "", //deixa sempre este para ja
              email: "abranco@brooks.com",
            },
          ],
          status: "Ongoing",
          deadline: "May 5, 2023",
          notes:
            "General product documentation: Catalogues, Certificates, Datasheet",
          stage: "6",
        }, //------------------//
        {
          id: 10, //increment++
          ref: "WR_v2",
          title: "Warranties",
          agent: "Project Lead",
          files: [
            {
              title: "FCU Warranties",
            },
            {
              title: "Spriklers system warranty",
            },
            {
              title: "Architectural Metalwork Warranty",
            },
            {
              title: "Lighting Warranty",
            },
          ],
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"), //deixa sempre este para ja
            //tag: "@TNovais",
            email: "tchambers@bm.net",
            //contact: "911 989 002",
          },
          contributor: [
            {
              firstName: "Jimmy",
              lastName: "Stone",
              picture: "", //deixa sempre este para ja
              email: "abranco@brooks.com",
            },
            {
              firstName: "Sophia",
              lastName: "Holland",
              picture: require("../../../assets/temp/users/imacena.png"), //deixa sempre este para ja
              email: "sholland@imarch.pt",
            },
            {
              firstName: "Harris",
              lastName: "Marshall",
              picture: require("../../../assets/temp/users/msantos.png"), //deixa sempre este para ja
              email: "msantos@niteroica.pt",
            },
            {
              firstName: "Mark",
              lastName: "Green",
              picture: require("../../../assets/temp/users/jribeiro.png"), //deixa sempre este para ja
              email: "mgreen@brooks.com",
            },
            {
              firstName: "Jimmy",
              lastName: "Stone",
              picture: "", //deixa sempre este para ja
              email: "abranco@brooks.com",
            },
          ],
          status: "Ongoing",
          deadline: "Jun 06, 2023",
          notes: "Product Warranty Sheets",
          stage: "6",
        }, //------------------//
      ],
    };
  },
  methods: {
    removeItem(toRemove) {
      this.deliverables = this.deliverables.filter(
        (deliverable) => deliverable.id !== toRemove
      );
    },
    getStatusStyle(status) {
      const statusList = ["Ongoing", "Awaiting Verification", "Completed"];
      const filtered = statusList.filter((msg) => msg === status);

      return filtered.toString().replace(" ", "-").toLowerCase();
    },
    // will need mapGetters : user, selectedStages
    setModal(cmd, item) {
      this.$emit("setModal", cmd, item);
    },
  },
  computed: {
    ...mapGetters(["selectedStages"]),
    deliverables() {
      const deliverables = [];
      const selectedStages = JSON.parse(
        JSON.stringify(this.$store.state.selectedStages)
      );

      selectedStages.forEach((stage) => {
        deliverables.push(
          this.dummyDeliverables.filter((deliv) => deliv.stage == stage)
        );
      });
      return deliverables.flat();
    },
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
.users-container {
  height: 40px;
  padding-left: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50px; /*isto é estupido, alterar quando der*/
}
</style>

