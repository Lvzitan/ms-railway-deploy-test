<template>
  <main class="table-container" v-if="elements.length">
    <table class="my-table">
      <thead class="my-thead">
        <tr>
          <th class="my-th" style="min-width: 150px">
            <p class="-stb">Classification</p>
          </th>
          <th class="my-th" style="min-width: 300px">
            <p class="-stb">Element Title</p>
          </th>
          <th class="my-th" style="min-width: 170px">
            <p class="-stb">Responsible</p>
          </th>
          <th class="my-th" style="width: 4%; text-align: center">
            <p class="-stb">LOD</p>
          </th>
          <th class="my-th" style="width: 4%; text-align: center">
            <p class="-stb">LOI</p>
          </th>
          <!-- <th class="my-th" style="width: 4%"><p class="-stb">Stage</p></th> -->
          <th class="my-th" style="width: 4%"></th>
          <th class="my-th" style="width: 4%"></th>
          <th class="my-th" style="width: 4%"></th>
          <th class="my-th" style="width: 4%"></th>
        </tr>
      </thead>
      <tbody v-for="(element, index) in elements" :key="element">
        <tr
          class="tr-content"
          :class="[
            index % 2 ? 'bg-primary' : 'bg-secondary',
            { 'toggled-row': element.toggled && element.children },
          ]"
        >
          <td
            @click="element.toggled = !element.toggled"
            class="my-td item-hover"
          >
            <div class="flex-row">
              <p class="-stb">{{ element.classification }}</p>
              <i
                v-if="element.children"
                class="i-arrow-open-down"
                :class="{ rotate: element.toggled }"
              ></i>
            </div>
          </td>
          <td
            @click="element.toggled = !element.toggled"
            class="my-td item-hover"
          >
            <p class="-str">{{ element.title }}</p>
          </td>

          <td class="my-td">
            <div class="flex-row">
              <DynaBadge
                :picturePath="element.user.picture"
                :firstName="element.user.firstName"
                :lastName="element.user.lastName"
              />
              <div class="flex-column">
                <p class="-stb">{{ element.agent }}</p>
                <p class="-xstr">
                  {{ element.user.firstName }} {{ element.user.lastName }}
                </p>
              </div>
            </div>
          </td>
          <td class="my-td" style="text-align: center">
            <div class="lodloi-container">
              <p class="-stb flex-align">{{ element.lod }}</p>
            </div>
          </td>
          <td class="my-td" style="text-align: center">
            <div class="lodloi-container">
              <p class="-stb flex-align">{{ element.loi }}</p>
            </div>
          </td>
          <!-- <td class="my-td" style="max-width: 40px; padding-left: 30px">
            <p class="-stb">0</p>
          </td> -->
          <td class="my-td" style="max-width: 40px">
            <IconSpecify title="Specify Element" />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconLink title="Link to Deliverable" />
          </td>

          <td class="my-td" style="max-width: 40px">
            <IconEdit title="Edit Row" @click="setModal('update', element)" />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconTrash @click="removeItem(element.id)" title="Delete Row" />
          </td>
        </tr>
        <tr
          class="tr-toggled-content"
          v-show="element.children && element.toggled"
          v-for="child in element.children"
          :key="child"
        >
          <td class="my-td">
            <p class="-xstb" style="color: var(--gray2)">
              {{ child.classification }}
            </p>
          </td>
          <td class="my-td" colspan="5">
            <p class="-xstr" style="color: var(--gray2)">{{ child.title }}</p>
          </td>
          <td class="my-td" style="max-width: 40px" colspan="4">
            <IconSpecify title="Specify Element" />
          </td>
        </tr>
      </tbody>
    </table>
  </main>
  <main class="no-data" v-else>
    <NoData :item="'element'" />
  </main>
</template>

<script>
import IconTrash from "../../../assets/icons/dynamicIcons/IconTrash.vue";
import IconEdit from "../../../assets/icons/dynamicIcons/IconEdit.vue";
import IconLink from "../../../assets/icons/dynamicIcons/IconLink.vue";
import IconSpecify from "../../../assets/icons/dynamicIcons/IconSpecify.vue";
import DynaBadge from "../../utils/DynaBadge.vue";
import NoData from "../../utils/NoData.vue";
export default {
  components: { IconTrash, IconEdit, IconLink, IconSpecify, DynaBadge, NoData },
  data() {
    return {
      onBehalf: false,
      elements: [
        {
          id: 1,
          classification: "Ss_15_10_30",
          title: "Excavating, filling and erosion control systems",
          agent: "Not Assigned",
          children: [
            {
              classification: "Ss_15_10",
              title: "Groundworks and earthworks systems",
            },
            {
              classification: "Ss_15",
              title: "Earthworks, remediation and temporary systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },
          lod: 3,
          loi: 3,
        },
        {
          id: 2,
          classification: "Ss_15_30_15",
          title: "Concrete and masonry cleaning systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_15_30",
              title: "Remediation, repair and renovation systems",
            },
            {
              classification: "Ss_15",
              title: "Earthworks, remediation and temporary systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 3,
          classification: "Ss_15_30_50",
          title: "Masonry repair and renovation systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_15_30",
              title: "Remediation, repair and renovation systems",
            },
            {
              classification: "Ss_15",
              title: "Earthworks, remediation and temporary systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            picture: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 4,
          classification: "Ss_15_30_90",
          title: "Timber repair and renovation systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_15_30",
              title: "Remediation, repair and renovation systems",
            },
            {
              classification: "Ss_15",
              title: "Earthworks, remediation and temporary systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            picture: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 5,
          classification: "Ss_20_05_15",
          title: "Concrete foundation systems",
          agent: "Structural Engineer",
          children: [
            {
              classification: "Ss_20_05",
              title: "Substructure systems",
            },
            {
              classification: "Ss_20",
              title: "Structural systems",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 6,
          classification: "Ss_20_05_50",
          title: "Minor concrete substructure systems",
          agent: "Structural Engineer",
          children: [
            {
              classification: "Ss_20_05",
              title: "Substructure systems",
            },
            {
              classification: "Ss_15",
              title: "Earthworks, remediation and temporary systems",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 6,
          classification: "Ss_20_05_65",
          title: "Piling systems",
          agent: "Structural Engineer",
          children: [
            {
              classification: "Ss_20_05",
              title: "Substructure systems",
            },
            {
              classification: "Ss_15",
              title: "Earthworks, remediation and temporary systems",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 7,
          classification: "Ss_20_10_70",
          title: "Shelter systems",
          agent: "Landscape Architect",
          children: [
            {
              classification: "Ss_20_10",
              title: "Structural frame systems",
            },
            {
              classification: "Ss_20",
              title: "Structural systems",
            },
          ],
          user: {
            firstName: "Elizabeth",
            lastName: "Fox",
            picture: "",
            email: "mromao@gradient.net",
            contact: "+351 915 555 555",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 8,
          classification: "Ss_20_10_75",
          title: "Structural framing systems",
          agent: "Structural Engineer",
          children: [
            {
              classification: "Ss_20_10",
              title: "Structural frame systems",
            },
            {
              classification: "Ss_20",
              title: "Structural systems",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 9,
          classification: "Ss_25_10_20",
          title: "Curtain walling systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_20_10",
              title: "Structural frame systems",
            },
            {
              classification: "Ss_20",
              title: "Structural systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 10,
          classification: "Ss_25_10_30",
          title: "Framed partition systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_10",
              title: "Framed wall systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 11,
          classification: "Ss_25_10_32",
          title: "Framed wall structure systems",
          agent: "Structural Engineer",
          children: [
            {
              classification: "Ss_15_30",
              title: "Remediation, repair and renovation systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 12,
          classification: "Ss_25_10_35",
          title: "Glass repair and renovation systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_10",
              title: "Framed wall systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 13,
          classification: "Ss_25_11_16",
          title: "Concrete wall systems",
          agent: "Structural Engineer",
          children: [
            {
              classification: "Ss_25_11",
              title: "Monolithic wall structure systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 14,
          classification: "Ss_25_12_60",
          title: "Panel enclosure systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_12",
              title: "Panel wall structure systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 15,
          classification: "Ss_25_12_65",
          title: "Panel partition systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_12",
              title: "Panel wall structure systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 16,
          classification: "Ss_25_12_80",
          title: "Structural glass wall systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_12",
              title: "Panel wall structure systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 17,
          classification: "Ss_25_13_33",
          title: "Glass wall systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_13",
              title: "Unit wall structure systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 18,
          classification: "Ss_25_13_50",
          title: "Masonry wall systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_25_13",
              title: "Unit wall structure systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 19,
          classification: "Ss_25_14_63",
          title: "Post, rail and board fence systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_25_14",
              title: "Fence systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 20,
          classification: "Ss_25_14_67",
          title: "Post, wire and mesh fence systems",
          agent: "Landscape Architect",
          children: [
            {
              classification: "Ss_25_14",
              title: "Fence systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Elizabeth",
            lastName: "Fox",
            picture: "",
            email: "mromao@gradient.net",
            contact: "+351 915 555 555",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 21,
          classification: "Ss_25_15_60",
          title: "Pedestrian safety barrier and guarding systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_25_15",
              title: "Fixed pedestrian barrier systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 22,
          classification: "Ss_25_16_94",
          title: "Vehicle restraint systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_25_16",
              title: "Fixed traffic and protective barrier systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 23,
          classification: "Ss_25_20_14",
          title: "Composite panel cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 24,
          classification: "Ss_25_20_15",
          title: "Concrete cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 25,
          classification: "Ss_25_20_33",
          title: "Glass fibre-reinforced plastics (GRP) cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 26,
          classification: "Ss_25_20_35",
          title: "Glass fibre-reinforced plastics (GRP) cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 27,
          classification: "Ss_25_20_50",
          title: "Metal sheet fully supported wall-covering systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 28,
          classification: "Ss_25_20_68",
          title: "Profiled sheet self-supporting cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 29,
          classification: "Ss_25_20_70",
          title: "Rainscreen cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 30,
          classification: "Ss_25_20_72",
          title: "Sheet cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 31,
          classification: "Ss_25_20_85",
          title: "Stone cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 32,
          classification: "Ss_25_20_90",
          title: "Unit cladding systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_20",
              title: "Wall cladding systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 33,
          classification: "Ss_25_25_45",
          title: "Lining and casing systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_25",
              title: "Wall lining systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 34,
          classification: "Ss_25_25_75",
          title: "Rigid sheet fine lining and panelling systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_25",
              title: "Wall lining systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },

        {
          id: 35,
          classification: "Ss_25_25_85",
          title: "Stone lining systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_25",
              title: "Wall lining systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 36,
          classification: "Ss_25_25_95",
          title: "Wall sheathing systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_25",
              title: "Wall lining systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 37,
          classification: "Ss_25_30_20",
          title: "Door, shutter and hatch systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_30",
              title: "Door and window systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 38,
          classification: "Ss_25_30_95",
          title: "Window systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_30",
              title: "Door and window systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 39,
          classification: "Ss_25_32_35",
          title: "Gate systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_25_32",
              title: "Gate and access control systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 40,
          classification: "Ss_25_36_95",
          title: "Vehicle access point control systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_25_36",
              title: "Operable barrier systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 41,
          classification: "Ss_25_38_20",
          title: "Door and window hardware systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_38",
              title: "Wall and barrier opening hardware systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 42,
          classification: "Ss_25_45_02",
          title: "Acoustic covering systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_45",
              title: "Wall covering and finish systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 43,
          classification: "Ss_25_45_70",
          title: "Render and roughcast coating systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_45",
              title: "Wall covering and finish systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 44,
          classification: "Ss_25_45_72",
          title: "Wall insulation systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_45",
              title: "Wall covering and finish systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 45,
          classification: "Ss_25_45_85",
          title: "Sprayed coating systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_45",
              title: "Wall covering and finish systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 46,
          classification: "Ss_25_45_88",
          title: "Tiling systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_45",
              title: "Wall covering and finish systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 47,
          classification: "Ss_25_50_45",
          title: "Louvre and shading systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_50",
              title: "Wall-mounted canopy and screen systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 48,
          classification: "Ss_25_60_30",
          title: "Fire stopping systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_25_60",
              title: "Wall and barrier accessory systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 49,
          classification: "Ss_25_60_35",
          title: "Glazing systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_60",
              title: "Wall and barrier accessory systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 50,
          classification: "Ss_25_60_50",
          title: "Metal sheet wall flashing and weathering systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_25_60",
              title: "Wall and barrier accessory systems",
            },
            {
              classification: "Ss_25",
              title: "Wall and barrier systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 51,
          classification: "Ss_30_10_30",
          title: "Framed roof structure systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_30_10",
              title: "Roof structure systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 52,
          classification: "Ss_30_10_50",
          title: "Monolithic roof structure systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_30_10",
              title: "Roof structure systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 53,
          classification: "Ss_30_10_90",
          title: "Unit roof structure systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_30_10",
              title: "Roof structure systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 54,
          classification: "Ss_30_12_85",
          title: "Structural deck systems",
          agent: "Structural Engineer",
          children: [
            {
              classification: "Ss_30_12",
              title: "Floor and deck structure systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 55,
          classification: "Ss_30_14_05",
          title: "Asphalt road and paving systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_30_14",
              title: "Paving systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 56,
          classification: "Ss_30_14_15",
          title: "Concrete road and paving systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_30_14",
              title: "Paving systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 57,
          classification: "Ss_30_14_80",
          title: "Unbound aggregate paving systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_30_14",
              title: "Paving systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 58,
          classification: "Ss_30_20_10",
          title: "Board and rigid sheet floor systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_20",
              title: "Flooring and decking systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 59,
          classification: "Ss_30_20_30",
          title: "External deck and boardwalk systems",
          agent: "Not assigned",
          children: [
            {
              classification: "Ss_30_20",
              title: "Flooring and decking systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 60,
          classification: "Ss_30_20_70",
          title: "Raised floor systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_20",
              title: "Flooring and decking systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 61,
          classification: "Ss_30_20_90",
          title: "Wood and composite unit flooring systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_20",
              title: "Flooring and decking systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 62,
          classification: "Ss_30_20_95",
          title: "Wood strip and board fine flooring systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_20",
              title: "Flooring and decking systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 63,
          classification: "Ss_30_25_10",
          title: "Board and sheet ceiling systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_25",
              title: "Ceiling and soffit systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 64,
          classification: "Ss_30_25_22",
          title: "Demountable suspended ceiling systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_25",
              title: "Ceiling and soffit systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 65,
          classification: "Ss_30_30_72",
          title: "Rooflight and roof window systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_30",
              title: "Roof and floor opening systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 66,
          classification: "Ss_30_30_73",
          title: "Roof ventilator systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_30",
              title: "Roof and floor opening systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
        {
          id: 67,
          classification: "Ss_30_40_10",
          title: "Board roof covering systems",
          agent: "Architect",
          children: [
            {
              classification: "Ss_30_40",
              title: "Roof and balcony covering and finish systems",
            },
            {
              classification: "Ss_30",
              title: "Roof, floor and paving systems",
            },
          ],
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },

          lod: 3,
          loi: 3,
        },
      ],
    };
  },
  methods: {
    removeItem(toRemove) {
      this.elements = this.elements.filter(
        (element) => element.id !== toRemove
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
};
</script>

<style scoped>
/*TABLE*/

.bg-primary {
  background: #f9fafb !important;
}
.bg-secondary {
  background: var(--white1) !important;
}
.table-container {
  width: 100%;
  height: 100%;
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

/* .tr-content {
  transition: 100ms ease;
} */
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
.tr-toggled-content:hover {
  background: var(--gray5);
}
.lodloi-container {
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
}
.lodloi-container p {
  border-radius: 4px;
  padding-block: 4px;
  padding-inline: 8px;
  background: rgb(206, 238, 255);
  background: linear-gradient(
    156deg,
    rgba(206, 238, 255, 1) 0%,
    rgba(199, 223, 255, 1) 100%
  );
}
</style>