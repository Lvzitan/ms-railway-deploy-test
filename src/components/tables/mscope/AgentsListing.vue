<template>
  <main class="table-container" v-if="agents.length">
    <table class="my-table">
      <thead class="my-thead">
        <tr>
          <th class="my-th" style="width: 17.5%; min-width: 150px">
            <p class="-stb">Agent Title</p>
          </th>
          <th class="my-th" style="width: 20%; min-width: 170px">
            <p class="-stb">Assigned To</p>
          </th>
          <th class="my-th" style="width: 17.5%; min-width: 170px">
            <p class="-stb">Organization</p>
          </th>
          <th class="my-th" style="width: 25%; min-width: 350px">
            <p class="-stb">Squad</p>
          </th>
          <th
            class="my-th"
            style="width: 5%"
            v-show="selectedStages.length > 1"
          >
            <p class="-stb">Stage</p>
          </th>
          <th class="my-th" style="width: 5%"></th>
          <th class="my-th" style="width: 5%"></th>
          <th class="my-th" style="width: 5%"></th>
        </tr>
      </thead>
      <tbody v-for="(agent, index) in agents" :key="agent">
        <tr
          class="tr-content"
          :class="[
            index % 2 ? 'bg-primary' : 'bg-secondary',
            { 'toggled-row': agent.toggled && agent.user.firstName },
          ]"
        >
          <td @click="agent.toggled = !agent.toggled" class="my-td item-hover">
            <div class="flex-row">
              <i
                class="i-arrow-open-down"
                :class="{ rotate: agent.toggled }"
              ></i>
              <p class="-stb">
                {{ agent.title }}
              </p>
            </div>
          </td>
          <td @click="agent.toggled = !agent.toggled" class="my-td item-hover">
            <div class="flex-row">
              <DynaBadge
                :picturePath="agent.user.picture"
                :firstName="agent.user.firstName"
                :lastName="agent.user.lastName"
              />

              <div class="flex-column">
                <p class="-stb">
                  {{ agent.user.firstName }}
                  {{ agent.user.lastName }}
                </p>
                <p class="-str">{{ agent.user.tag }}</p>
              </div>
            </div>
          </td>

          <td class="my-td">
            <div class="flex-row">
              <DynaBadge
                :picturePath="agent.company.logo"
                :firstName="agent.company.name"
              />
              <div class="flex-column">
                <p class="-stb">{{ agent.company.name }}</p>
              </div>
            </div>
          </td>
          <td class="my-td">
            <div class="flex-row">
              <p
                class="-stb tag"
                v-for="squad in shownSquads(agent.squads)"
                :key="squad"
              >
                {{ squad }}
              </p>
              <p
                class="-stb additional-tag"
                v-if="hiddenSquads(agent.squads) > 0"
              >
                + {{ hiddenSquads(agent.squads) }}
              </p>
            </div>
          </td>
          <td
            class="my-td"
            style="max-width: 40px; padding-left: 30px"
            v-show="selectedStages.length > 1"
          >
            <p class="-stb">{{ agent.stage }}</p>
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconHierarchy
              title="Allow this person to act on my behalf"
              :onBehalf="agent.onMyBehalf"
              @click="agent.onMyBehalf = !agent.onMyBehalf"
            />
          </td>

          <td class="my-td" style="max-width: 40px">
            <IconEdit title="Edit Row" @click="setModal('update', agent)" />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconTrash @click="removeItem(agent.id)" title="Delete Row" />
          </td>
        </tr>
        <tr
          class="tr-toggled-content"
          v-show="agent.user.firstName && agent.toggled"
        >
          <td class="my-td">
            <div class="flex-row">
              <DynaBadge
                :picturePath="agent.user.picture"
                :firstName="agent.user.firstName"
                :lastName="agent.user.lastName"
              />
              <div class="flex-column">
                <p class="-stb">
                  {{ agent.user.firstName }}
                  {{ agent.user.lastName }}
                </p>
              </div>
            </div>
          </td>
          <td class="my-td">
            <p class="-xstb toggled-text">
              {{ agent.user.email }}
            </p>
          </td>
          <td class="my-td" colspan="6">
            <p class="-xstb toggled-text">Contact: {{ agent.user.contact }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
  <main class="no-data" v-else>
    <NoData :item="'agent'" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import IconTrash from "../../../assets/icons/dynamicIcons/IconTrash.vue";
import IconEdit from "../../../assets/icons/dynamicIcons/IconEdit.vue";
import IconHierarchy from "../../../assets/icons/dynamicIcons/IconHierarchy.vue";
import DynaBadge from "../../utils/DynaBadge.vue";
import NoData from "../../utils/NoData.vue";
export default {
  components: { IconTrash, IconEdit, IconHierarchy, DynaBadge, NoData },
  data() {
    return {
      onBehalf: false,
      dummyAgents: [
        {
          id: 1,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 0,
        },
        {
          id: 2,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 1,
        },
        {
          id: 3,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 2,
        },
        {
          id: 4,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 3,
        },
        {
          id: 5,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 4,
        },
        {
          id: 6,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 5,
        },
        {
          id: 7,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 6,
        },
        {
          id: 8,
          title: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.uk",
            contact: "+351 911 989 002",
          },
          onMyBehalf: false,
          company: {
            name: "IM Architecture",
            logo: require("../../../assets/temp/orgs/imarch.png"),
          },
          squads: [
            "OP1",
            "BIM Leader",
            "Architecture",
            "BIM Leader",
            "Product",
          ],
          stage: 7,
        },
        {
          id: 9,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 0,
        },
        {
          id: 10,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 1,
        },
        {
          id: 11,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 2,
        },
        {
          id: 12,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 3,
        },
        {
          id: 13,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 4,
        },
        {
          id: 14,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 5,
        },
        {
          id: 15,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 6,
        },
        {
          id: 16,
          title: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          onMyBehalf: false,
          company: {
            name: "B&M",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: ["OP3", "Product"],
          stage: 7,
        },
        {
          id: 17,
          title: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          onMyBehalf: false,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: ["OP2", "Product", "Structures", "BIM Leader"],
          stage: 0,
        },
        {
          id: 18,
          title: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          onMyBehalf: false,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: ["OP2", "Product", "Structures", "BIM Leader"],
          stage: 1,
        },
        {
          id: 19,
          title: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          onMyBehalf: false,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: ["OP2", "Product", "Structures", "BIM Leader"],
          stage: 2,
        },
        {
          id: 20,
          title: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          onMyBehalf: false,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: ["OP2", "Product", "Structures", "BIM Leader"],
          stage: 3,
        },
        {
          id: 21,
          title: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          onMyBehalf: false,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: ["OP2", "Product", "Structures", "BIM Leader"],
          stage: 4,
        },
        {
          id: 22,
          title: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          onMyBehalf: false,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: ["OP2", "Product", "Structures", "BIM Leader"],
          stage: 5,
        },
        {
          id: 23,
          title: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          onMyBehalf: false,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: ["OP2", "Product", "Structures", "BIM Leader"],
          stage: 7,
        },
        {
          id: 24,
          title: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          onMyBehalf: null,
          company: {
            name: "RS Prime",
            logo: require("../../../assets/temp/orgs/rs.png"),
          },
          squads: [],
          stage: 0,
        },
        {
          id: 25,
          title: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          onMyBehalf: null,
          company: {
            name: "RS Prime",
            logo: require("../../../assets/temp/orgs/rs.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 26,
          title: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          onMyBehalf: null,
          company: {
            name: "RS Prime",
            logo: require("../../../assets/temp/orgs/rs.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 27,
          title: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          onMyBehalf: null,
          company: {
            name: "RS Prime",
            logo: require("../../../assets/temp/orgs/rs.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 28,
          title: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          onMyBehalf: null,
          company: {
            name: "RS Prime",
            logo: require("../../../assets/temp/orgs/rs.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 29,
          title: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          onMyBehalf: null,
          company: {
            name: "RS Prime",
            logo: require("../../../assets/temp/orgs/rs.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 30,
          title: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          onMyBehalf: null,
          company: {
            name: "RS Prime",
            logo: require("../../../assets/temp/orgs/rs.png"),
          },
          squads: [],
          stage: 7,
        },
        {
          id: 31,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 0,
        },
        {
          id: 32,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 31,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 31,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 31,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 31,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 31,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 31,
          title: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Zafir",
            website: "",
            logo: require("../../../assets/temp/orgs/zafir.png"),
          },
          squads: [],
          stage: 7,
        },
        {
          id: 32,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            website: "",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 0,
        },
        {
          id: 33,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            website: "",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 34,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            tag: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            website: "",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 35,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            tag: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            website: "",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 36,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            tag: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            website: "",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 37,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            tag: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            website: "",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 38,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            tag: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            website: "",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 39,
          title: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Norcraft",
            logo: require("../../../assets/temp/orgs/norcraft.png"),
          },
          squads: [],
          stage: 7,
        },
        {
          id: 40,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/bm.png"),
          },
          squads: [],
          stage: 0,
        },
        {
          id: 41,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/ms4aeco.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 42,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/ms4aeco.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 43,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/ms4aeco.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 44,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/ms4aeco.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 45,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/ms4aeco.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 46,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/ms4aeco.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 47,
          title: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          onMyBehalf: null,
          company: {
            name: "MSolutions",
            logo: require("../../../assets/temp/orgs/ms4aeco.png"),
          },
          squads: [],
          stage: 7,
        },
        {
          id: 48,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            website: "",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 0,
        },
        {
          id: 49,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 50,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 51,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 52,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 53,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 54,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 55,
          title: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.uk",
            contact: "+351 911 114",
          },
          onMyBehalf: null,
          company: {
            name: "TNS",
            logo: require("../../../assets/temp/orgs/tns.png"),
          },
          squads: [],
          stage: 7,
        },
        {
          id: 56,
          title: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          onMyBehalf: null,
          company: {
            name: "Siterra",
            logo: require("../../../assets/temp/orgs/siterra.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 57,
          title: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          onMyBehalf: null,
          company: {
            name: "Siterra",
            logo: require("../../../assets/temp/orgs/siterra.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 58,
          title: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          onMyBehalf: null,
          company: {
            name: "Siterra",
            logo: require("../../../assets/temp/orgs/siterra.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 59,
          title: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          onMyBehalf: null,
          company: {
            name: "Siterra",
            logo: require("../../../assets/temp/orgs/siterra.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 60,
          title: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          onMyBehalf: null,
          company: {
            name: "Siterra",
            logo: require("../../../assets/temp/orgs/siterra.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 61,
          title: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          onMyBehalf: null,
          company: {
            name: "Siterra",
            logo: require("../../../assets/temp/orgs/siterra.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 62,
          title: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          onMyBehalf: null,
          company: {
            name: "Siterra",
            logo: require("../../../assets/temp/orgs/siterra.png"),
          },
          squads: [],
          stage: 7,
        },
        {
          id: 63,
          title: "Contract administrator",
          user: {
            firstName: "Robert",
            lastName: "Hunt",
            picture: require("../../../assets/temp/users/dfrancisco.png"),
            email: "rhunt@dandf.net",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "D&F",
            logo: require("../../../assets/temp/orgs/df.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 64,
          title: "Contract administrator",
          user: {
            firstName: "Robert",
            lastName: "Hunt",
            picture: require("../../../assets/temp/users/dfrancisco.png"),
            email: "rhunt@dandf.net",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "D&F",
            logo: require("../../../assets/temp/orgs/df.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 65,
          title: "Contract administrator",
          user: {
            firstName: "Robert",
            lastName: "Hunt",
            picture: require("../../../assets/temp/users/dfrancisco.png"),
            email: "rhunt@dandf.net",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "D&F",
            logo: require("../../../assets/temp/orgs/df.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 66,
          title: "Contract administrator",
          user: {
            firstName: "Robert",
            lastName: "Hunt",
            picture: require("../../../assets/temp/users/dfrancisco.png"),
            email: "rhunt@dandf.net",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "D&F",
            logo: require("../../../assets/temp/orgs/df.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 67,
          title: "Health and safety adviser",
          user: {
            firstName: "Seth",
            lastName: "Hopkins",
            picture: require("../../../assets/temp/users/asousa.png"),
            email: "shopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "BSafety",
            logo: require("../../../assets/temp/orgs/bsafe.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 68,
          title: "Health and safety adviser",
          user: {
            firstName: "Seth",
            lastName: "Hopkins",
            picture: require("../../../assets/temp/users/asousa.png"),
            email: "shopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "BSafety",
            logo: require("../../../assets/temp/orgs/bsafe.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 69,
          title: "Health and safety adviser",
          user: {
            firstName: "Seth",
            lastName: "Hopkins",
            picture: require("../../../assets/temp/users/asousa.png"),
            email: "shopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "BSafety",
            logo: require("../../../assets/temp/orgs/bsafe.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 70,
          title: "Health and safety adviser",
          user: {
            firstName: "Seth",
            lastName: "Hopkins",
            picture: require("../../../assets/temp/users/asousa.png"),
            email: "shopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "BSafety",
            logo: require("../../../assets/temp/orgs/bsafe.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 71,
          title: "Health and safety adviser",
          user: {
            firstName: "Seth",
            lastName: "Hopkins",
            picture: require("../../../assets/temp/users/asousa.png"),
            email: "shopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "BSafety",
            logo: require("../../../assets/temp/orgs/bsafe.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 72,
          title: "Health and safety adviser",
          user: {
            firstName: "Seth",
            lastName: "Hopkins",
            picture: require("../../../assets/temp/users/asousa.png"),
            email: "shopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "BSafety",
            logo: require("../../../assets/temp/orgs/bsafe.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 73,
          title: "Health and safety adviser",
          user: {
            firstName: "Seth",
            lastName: "Hopkins",
            picture: require("../../../assets/temp/users/asousa.png"),
            email: "shopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          onMyBehalf: null,
          company: {
            name: "BSafety",
            logo: require("../../../assets/temp/orgs/bsafe.png"),
          },
          squads: [],
          stage: 7,
        },
        {
          id: 74,
          title: "Landscape Architect",
          user: {
            firstName: "Elizabeth",
            lastName: "Fox",
            picture: "",
            email: "efox@gradient.net",
            contact: "+351 915 555 555",
          },
          onMyBehalf: null,
          company: {
            name: "Gradient",
            logo: require("../../../assets/temp/orgs/gradient.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 75,
          title: "Lift engineer",
          user: {
            firstName: "Harris",
            lastName: "Marshall",
            picture: require("../../../assets/temp/users/msantos.png"),
            email: "msantos@niteroica.uk",
            contact: "+351 9111 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Niteroica",
            logo: require("../../../assets/temp/orgs/niteroica.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 76,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 0,
        },
        {
          id: 77,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 1,
        },
        {
          id: 78,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 2,
        },
        {
          id: 79,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 3,
        },
        {
          id: 80,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 4,
        },
        {
          id: 81,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 5,
        },
        {
          id: 82,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 6,
        },
        {
          id: 83,
          title: "Mechanical Engineer",
          user: {
            firstName: "Jimmy",
            lastName: "Stone",
            picture: "",
            email: "jstone@brooks.com",
            contact: "+351 9117 111 111",
          },
          onMyBehalf: null,
          company: {
            name: "Brooks & Sons",
            logo: require("../../../assets/temp/orgs/bs.png"),
          },
          squads: [],
          stage: 7,
        },
      ],
    };
  },
  methods: {
    shownSquads(squads) {
      if (squads.length <= 3) {
        return squads;
      } else {
        const res = squads.slice(0, 3);
        return res;
      }
    },
    hiddenSquads(squads) {
      const res = squads.slice(3, squads.length).length;
      return res;
    },
    removeItem(toRemove) {
      this.agents = this.agents.filter((agent) => agent.id !== toRemove);
    },
    // will need mapGetters : user, selectedStages
    setModal(cmd, item) {
      this.$emit("setModal", cmd, item);
    },
  },
  computed: {
    ...mapGetters(["selectedStages"]),
    agents() {
      const agents = [];
      const selectedStages = JSON.parse(
        JSON.stringify(this.$store.state.selectedStages)
      );

      selectedStages.forEach((stage) => {
        agents.push(this.dummyAgents.filter((agent) => agent.stage == stage));
      });
      return agents.flat();
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

.tag,
.additional-tag {
  display: inline;
  width: auto;
  padding-block: 4px;
  padding-inline: 12px;
  border-radius: 32px;
  background: #eff8ff;
  color: #175cd3;
}
.tag:first-child {
  color: #6941c6;
  background: #f9f5ff;
}
.tag:last-child {
  color: #3538cd;
  background: #eef4ff;
}
.additional-tag {
  color: #344054;
  background: #f2f4f7;
  white-space: nowrap;
}
</style>