<template>
  <main class="table-container" v-if="tasks.length">
    <table class="my-table">
      <thead class="my-thead">
        <tr>
          <th class="my-th" style="min-width: 120px">
            <p class="-stb">Reference</p>
          </th>
          <th class="my-th" style="width: 38%; min-width: 300px">
            <p class="-stb">Task Title</p>
          </th>
          <th class="my-th" style="min-width: 170px">
            <p class="-stb">Responsible</p>
          </th>
          <th class="my-th" style="min-width: 100px">
            <p class="-stb">Status</p>
          </th>
          <th class="my-th" style="min-width: 110px">
            <p class="-stb">DeadLine</p>
          </th>
          <th
            class="my-th"
            style="width: 4%"
            v-show="selectedStages.length > 1"
          >
            <p class="-stb">Stage</p>
          </th>
          <th class="my-th" style="width: 4%"></th>
          <th class="my-th" style="width: 4%"></th>
          <th class="my-th" style="width: 4%"></th>
        </tr>
      </thead>
      <tbody v-for="(task, index) in tasks" :key="task">
        <tr
          class="tr-content"
          :class="[index % 2 ? 'bg-primary' : 'bg-secondary']"
        >
          <td class="my-td">
            <p class="-stb">
              {{ task.ref }}
            </p>
          </td>
          <td class="my-td">
            <p class="-str">{{ task.title }}</p>
          </td>
          <td class="my-td">
            <div class="flex-row">
              <DynaBadge
                :picturePath="task.user.picture"
                :firstName="task.user.firstName"
                :lastName="task.user.lastName"
              />
              <div class="flex-column">
                <p class="-stb">{{ task.agent }}</p>
                <p class="-str">
                  {{ task.user.firstName }}
                  {{ task.user.lastName }}
                </p>
              </div>
            </div>
          </td>
          <td class="my-td">
            <div class="status-container" :class="getStatusStyle(task.status)">
              <p class="-xstb">{{ task.status }}</p>
            </div>
          </td>
          <td class="my-td">
            <p class="-str">{{ task.deadline }}</p>
          </td>
          <td
            class="my-td"
            style="max-width: 40px; padding-left: 30px"
            v-show="selectedStages.length > 1"
          >
            <p class="-stb">{{ task.stage }}</p>
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconLink title="Link to Deliverable" />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconEdit title="Edit Row" @click="setModal('update', task)" />
          </td>
          <td class="my-td" style="max-width: 40px">
            <IconTrash @click="removeItem(task.id)" title="Delete Row" />
          </td>
        </tr>
      </tbody>
    </table>
  </main>
  <main class="no-data" v-else>
    <NoData :item="'task'" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import IconTrash from "../../../assets/icons/dynamicIcons/IconTrash.vue";
import IconEdit from "../../../assets/icons/dynamicIcons/IconEdit.vue";
import IconLink from "../../../assets/icons/dynamicIcons/IconLink.vue";
import DynaBadge from "../../utils/DynaBadge.vue";
import NoData from "../../utils/NoData.vue";
export default {
  components: { IconTrash, IconEdit, IconLink, DynaBadge, NoData },
  data() {
    return {
      onBehalf: false,
      dummyTasks: [
        {
          id: 1,
          ref: "0.010",
          title: "Identify Business Case requirements",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "Aug 06, 2022",
          stage: 0,
        },
        {
          id: 2,
          ref: "0.020",
          title: "Identify Strategic Brief",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Completed",
          deadline: "Aug 03, 2022",
          stage: 0,
        },
        {
          id: 3,
          ref: "0.030",
          title: "Identify Core Project Requirements",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "Sep 10, 2022",
          stage: 0,
        },
        {
          id: 4,
          ref: "0.040",
          title:
            "Collate comments and facilitate workshops to discuss Business Case and develop Strategic Brief with Project Team members",
          agent: "Project Lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 5,
          ref: "0.050",
          title:
            "Discuss initial considerations for assembling the Project Team",
          agent: "Project Lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 6,
          ref: "0.060",
          title: "Establish Project Programme",
          agent: "Project Lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 7,
          ref: "0.070",
          title: "Collate Feedback from previous projects",
          agent: "Project Lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 8,
          ref: "0.080",
          title: "Contribute to preparation of Strategic Brief",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 9,
          ref: "0.090",
          title: "Comment on project Programme",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 10,
          ref: "0.100",
          title: "Provide Feedback from previous projects",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 11,
          ref: "0.110",
          title: "Contribute to preparation of Strategic Brief",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 12,
          ref: "0.120",
          title: "Discuss project with appropriate planning authority",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 13,
          ref: "0.130",
          title: "Provide Feedback from previous projects",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/u1.svg"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 14,
          ref: "0.140",
          title: "Contribute to preparation of Strategic Brief",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 15,
          ref: "0.150",
          title: "Contribute to preparation of Strategic Brief",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 16,
          ref: "0.160",
          title: "Contribute to preparation of Strategic Brief",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },

        {
          id: 17,
          ref: "0.170",
          title:
            "Contribute Cost Information to preparation of Strategic Brief",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 18,
          ref: "0.180",
          title: "Test the robustness of the Strategic Brief",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 19,
          ref: "0.190",
          title: "Review feedback from previous projects",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 20,
          ref: "0.200",
          title:
            "Ensure that a strategic sustainability review of client needs and potential sites has been carried out, including reuse of existing facilities, building components or materials",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },
        {
          id: 21,
          ref: "0.210",
          title: "Strategic Brief Information Exchange",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 0,
        },

        {
          id: 22,
          ref: "1.010",
          title:
            "Contribute to development of Initial Project Brief including Project Objectives, Quality Objectives, Project Outcomes, Sustainability Aspirations, Project Budget and other parameters or constraints",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 23,
          ref: "1.020",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 24,
          ref: "1.030",
          title:
            "Develop Initial Project Brief with project team including Project Objectives, Quality Objectives, Project Outcomes, Sustainability Aspirations, Project Budget and other parameters or constraints",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 25,
          ref: "1.040",
          title:
            "Collate comments and facilitate workshops as required to develop Initial Project Brief",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 26,
          ref: "1.050",
          title:
            "Prepare Project Roles Table and Contractual Tree and continue assembling and appointing project team members",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 27,
          ref: "1.060",
          title:
            "Prepare Schedule of Services and develop Design Responsibility Matrix including Information Exchanges with Lead designer",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 28,
          ref: "1.070",
          title: "Review Project Programme and Feasibility Studies",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 29,
          ref: "1.080",
          title: "Prepare Risk Assessments",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 30,
          ref: "1.090",
          title: "Prepare Project Execution Plan",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 31,
          ref: "1.100",
          title: "Prepare Handover Strategy",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 32,
          ref: "1.110",
          title: "Monitor and review progress and performance of project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 33,
          ref: "1.120",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 34,
          ref: "1.130",
          title:
            "Where required, Contribute to preparation of Initial Project Brief",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 35,
          ref: "1.140",
          title: "Contribute assembly of project team",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 36,
          ref: "1.150",
          title:
            "Contribute to preparation of Handover Strategy and Risk Assessments",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 37,
          ref: "1.160",
          title: "Comment on Project Programme",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 38,
          ref: "1.170",
          title: "Monitor and review progress and performance of design team",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 39,
          ref: "1.180",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 40,
          ref: "1.190",
          title: "Contribute to preparation of Initial Project Brief",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 41,
          ref: "1.200",
          title: "Discuss project with appropriate planning authority",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 42,
          ref: "1.210",
          title: "Undertake Feasibility Studies",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 43,
          ref: "1.220",
          title: "Prepare Site Information report",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 44,
          ref: "1.230",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 45,
          ref: "1.240",
          title: "Contribute to preparation of Initial Project Brief",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 46,
          ref: "1.250",
          title: "Contribute to Site Information report",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 47,
          ref: "1.260",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 48,
          ref: "1.270",
          title: "Contribute to preparation of Initial Project Brief",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 49,
          ref: "1.280",
          title: "Contribute to Site Information report",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 50,
          ref: "1.290",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 51,
          ref: "1.300",
          title: "Contribute to preparation of Initial Project Brief",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 51,
          ref: "1.310",
          title: "Contribute to Site Information report",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 51,
          ref: "1.320",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 52,
          ref: "1.330",
          title: "Contribute to preparation of Initial Project Brief",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 51,
          ref: "1.340",
          title: "Prepare Project Budget in consultation with Client",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 51,
          ref: "1.350",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 51,
          ref: "1.360",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 52,
          ref: "1.370",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Contract administrator",
          user: {
            firstName: "Robert",
            lastName: "Hunt",
            picture: require("../../../assets/temp/users/dfrancisco.png"),
            email: "rhunt@dandf.net",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 53,
          ref: "1.380",
          title: "Review Health and Safety strategies",
          agent: "Health and safety adviser",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 54,
          ref: "1.390",
          title:
            "Provide information for and contribute to contents of Project Execution Plan as required",
          agent: "Health and safety adviser",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 55,
          ref: "1.400",
          title: "Agree Schedule of services",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 56,
          ref: "1.410",
          title: "Agree Design responsibility matrix",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 57,
          ref: "1.420",
          title:
            "Agree Technology and Communication strategies and common standards",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 58,
          ref: "1.430",
          title: "Confirm sustainability targets",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 59,
          ref: "1.440",
          title: "Confirm environmental requirements",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 60,
          ref: "1.450",
          title: "Carry out early stage consultations surveys or monitoring",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 61,
          ref: "1.460",
          title: "Confirm Handover strategy",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 62,
          ref: "1.470",
          title: "Site Waste Management Plan",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 63,
          ref: "1.480",
          title: "Exchange initial project brief",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 64,
          ref: "1.490",
          title: "Undertake UK government information exchange",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 1,
        },
        {
          id: 65,
          ref: "2.010",
          title: "Comment on Concept Design proposals",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 66,
          ref: "2.020",
          title: "Sign-off Concept Design and Final Project Brief",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 67,
          ref: "2.030",
          title: "Comment on Project Strategies as requested",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 68,
          ref: "2.040",
          title: "Monitor progress of Concept Design",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 69,
          ref: "2.050",
          title: "Prepare and issue Final Project Brief",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 70,
          ref: "2.060",
          title:
            "Review Handover Strategy and Risk Assessments with project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 67,
          ref: "2.070",
          title: "Review and update Project Execution Plan",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 68,
          ref: "2.080",
          title:
            "Review Project Programme and agree any changes with project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 69,
          ref: "2.090",
          title: "Comment on stage Design Programme and Cost Information",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 70,
          ref: "2.100",
          title: "Monitor and review progress and performance of project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 71,
          ref: "2.110",
          title:
            "Comment on design proposals and Project Strategies from design team members",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 72,
          ref: "2.120",
          title: "Prepare Sustainability Strategy",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 73,
          ref: "2.130",
          title: "Prepare Maintenance and operational Strategy",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 74,
          ref: "2.140",
          title: "Prepare stage Design Programme",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 75,
          ref: "2.150",
          title: "Comment on Cost Information",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 76,
          ref: "2.160",
          title: "Monitor and review progress and performance of design team",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 77,
          ref: "2.170",
          title: "Prepare architectural Concept Design",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 78,
          ref: "2.180",
          title: "Liaise with planning authorities",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 79,
          ref: "2.190",
          title: "Submit Planning Application (stage 3 recommended)",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 80,
          ref: "2.200",
          title: "Undertake third party consultations",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 81,
          ref: "2.210",
          title:
            "Assist Lead designer with preparation of Stage Design Programme",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 82,
          ref: "2.220",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 83,
          ref: "2.230",
          title: "Prepare Concept Design for building services design",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 84,
          ref: "2.240",
          title: "Undertake third party consultations",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 85,
          ref: "2.250",
          title:
            "Assist Lead designer with preparation of stage Design Programme",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 86,
          ref: "2.260",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 87,
          ref: "2.270",
          title: "Prepare Concept Design for structural design",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 88,
          ref: "2.280",
          title: "Undertake third party consultations",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 89,
          ref: "2.290",
          title:
            "Assist Lead designer with preparation of stage Design Programme",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 90,
          ref: "2.300",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 91,
          ref: "2.310",
          title: "Prepare Concept Design for structural design",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 92,
          ref: "2.320",
          title: "Undertake third party consultations",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 93,
          ref: "2.330",
          title:
            "Assist Lead designer with preparation of stage Design Programme",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 94,
          ref: "2.340",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 95,
          ref: "2.350",
          title: "Prepare preliminary Cost information",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 96,
          ref: "2.360",
          title:
            "Assist Lead designer with preparation of stage Design Programme",
          agent: "Cost consultant",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 97,
          ref: "2.370",
          title: "Prepare Construction Strategy",
          agent: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 98,
          ref: "2.380",
          title: "Develop Health and Safety Strategy",
          agent: "Health and safety adviser",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 99,
          ref: "2.390",
          title:
            "Formal sustainability pre-assessment and identification of key areas of design focus",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 100,
          ref: "2.400",
          title: "Initial energy assessment",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 101,
          ref: "2.410",
          title:
            "Plain English’ descriptions of internal environmental conditions and seasonal control strategies and systems",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 102,
          ref: "2.420",
          title: "Environmental impact check",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 103,
          ref: "2.430",
          title: "Climate change check",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 104,
          ref: "2.440",
          title: "Liaise with Project lead and Lead designer",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 105,
          ref: "2.441",
          title: "Liaise with Project lead and Lead designer",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 106,
          ref: "2.442",
          title: "Liaise with Project lead and Lead designer",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 107,
          ref: "2.443",
          title: "Liaise with Project lead and Lead designer",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 108,
          ref: "2.444",
          title: "Liaise with Project lead and Lead designer",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 109,
          ref: "2.445",
          title: "Liaise with Project lead and Lead designer",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 110,
          ref: "2.446",
          title: "Liaise with Project lead and Lead designer",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 111,
          ref: "2.447",
          title: "Liaise with Project lead and Lead designer",
          agent: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 112,
          ref: "2.448",
          title: "Liaise with Project lead and Lead designer",
          agent: "Health and safety adviser",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 113,
          ref: "2.450",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 114,
          ref: "2.451",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 115,
          ref: "2.452",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 116,
          ref: "2.453",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 117,
          ref: "2.454",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 118,
          ref: "2.455",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 119,
          ref: "2.456",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 120,
          ref: "2.457",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 121,
          ref: "2.458",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 122,
          ref: "2.459",
          title:
            "Provide information as set out in the Design Responsibility Matrix incorporating Information Exchanges in accordance with Design Programme",
          agent: "Health and safety adviser",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 123,
          ref: "2.460",
          title: "Contribute to Health & Safety Strategy",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 124,
          ref: "2.461",
          title: "Contribute to Health & Safety Strategy",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 125,
          ref: "2.462",
          title: "Contribute to Health & Safety Strategy",
          agent: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 126,
          ref: "2.463",
          title: "Contribute to Health & Safety Strategy",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 127,
          ref: "2.464",
          title: "Contribute to Health & Safety Strategy",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 128,
          ref: "2.465",
          title: "Contribute to Health & Safety Strategy",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 129,
          ref: "2.466",
          title: "Contribute to Health & Safety Strategy",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 130,
          ref: "2.467",
          title: "Contribute to Health & Safety Strategy",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 131,
          ref: "2.468",
          title: "Contribute to Health & Safety Strategy",
          agent: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 132,
          ref: "2.469",
          title: "Contribute to Health & Safety Strategy",
          agent: "Health and safety adviser",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 133,
          ref: "2.470",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Architect",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },

        {
          id: 134,
          ref: "2.471",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 134,
          ref: "2.472",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Civil Engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 135,
          ref: "2.463",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 136,
          ref: "2.464",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 137,
          ref: "2.465",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 138,
          ref: "2.466",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 139,
          ref: "2.467",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 140,
          ref: "2.468",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },
        {
          id: 141,
          ref: "2.469",
          title:
            "Provide information for and contribute to contents of Project Execution Plan",
          agent: "Health and safety adviser",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 2,
        },

        {
          id: 142,
          ref: "3.010",
          title: "Comment on Developed Design proposals",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },

        {
          id: 143,
          ref: "3.020",
          title: "Sign-off Developed Design",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },

        {
          id: 144,
          ref: "3.030",
          title: "Sign-off Developed Design",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 145,
          ref: "3.040",
          title: "Monitor progress of Developing Design",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 146,
          ref: "3.050",
          title:
            "Review Handover Strategy and Risk Assessments with project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 147,
          ref: "3.060",
          title: "Review and update Project Execution Plan",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 148,
          ref: "3.070",
          title:
            "Review Project Programme and agree any changes with project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 149,
          ref: "3.080",
          title: "Comment on stage Design Programme and Cost Information",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 150,
          ref: "3.090",
          title: "Manage Change Control process",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 151,
          ref: "3.100",
          title: "Monitor and review progress and performance of project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 152,
          ref: "3.110",
          title:
            "Co-ordinate and comment on design proposals and Project Strategies as they progress",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 153,
          ref: "3.120",
          title:
            "Update Sustainability Strategy and Maintenance and Operational Strategy",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 154,
          ref: "3.130",
          title:
            "Prepare stage Design Programme in conjunction with other design team members",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 155,
          ref: "3.140",
          title: "Comment on Cost Information",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 156,
          ref: "3.150",
          title: "Monitor and review progress and performance of design team",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 157,
          ref: "3.160",
          title: "Monitor and review progress and performance of design team",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 158,
          ref: "3.170",
          title: "Liaise with planning authorities",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 159,
          ref: "3.180",
          title: "Submit Planning Application",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 160,
          ref: "3.190",
          title: "Undertake third party consultations",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 161,
          ref: "3.200",
          title:
            "Assist lead designer with preparation of Stage Design Programme",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 162,
          ref: "3.210",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 163,
          ref: "3.220",
          title: "Prepare building services Developed Design",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 164,
          ref: "3.230",
          title: "Undertake third party consultations",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 165,
          ref: "3.240",
          title:
            "Assist lead designer with preparation of Stage Design Programme",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 166,
          ref: "3.250",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 167,
          ref: "3.260",
          title:
            "Prepare coordinated and updated proposals for structural design",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 168,
          ref: "3.270",
          title: "Undertake third party consultations",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 169,
          ref: "3.280",
          title:
            "Assist lead designer with preparation of Stage Design Programme",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 170,
          ref: "3.290",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 171,
          ref: "3.300",
          title:
            "Prepare coordinated and updated proposals for structural design",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 172,
          ref: "3.310",
          title: "Undertake third party consultations",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 173,
          ref: "3.320",
          title:
            "Assist lead designer with preparation of Stage Design Programme",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 174,
          ref: "3.330",
          title:
            "Provide information for preparation of Cost Information and Project Strategies",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 175,
          ref: "3.340",
          title: "Update preliminary Cost information",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 176,
          ref: "3.350",
          title:
            "Assist lead designer with preparation of stage Design Programme",
          agent: "Cost consultant",
          user: {
            firstName: "Jessica",
            lastName: "Smith",
            picture: "",
            email: "jsmith@zafir.uk",
            contact: "+351 915 555 555",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 177,
          ref: "3.360",
          title: "Update Construction Strategy",
          agent: "Construction lead",
          user: {
            firstName: "Ralph",
            lastName: "Ward",
            picture: "",
            email: "rward@siterra.uk",
            contact: "+351 911 111 258",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 178,
          ref: "3.370",
          title: "Check sustainability assessment",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 179,
          ref: "3.380",
          title: "Interim energy assessment",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 180,
          ref: "3.390",
          title: "Resource and Waste minimisation design review",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 181,
          ref: "3.400",
          title: "Update Health and Safety Strategy",
          agent: "Project lead",
          user: {
            firstName: "Jimmy",
            lastName: "Hopkins",
            picture: "",
            email: "jhopkins@bsafety.com",
            contact: "+351 911 111 777",
          },
          status: "Ongoing",
          deadline: "",
          stage: 3,
        },
        {
          id: 182,
          ref: "4.110",
          title: "Comment on Technical Design proposals",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 183,
          ref: "4.120",
          title: "Comment on updated Project Strategies",
          agent: "Client",
          user: {
            firstName: "Mark",
            lastName: "Thompson",
            picture: require("../../../assets/temp/users/jaleixo.png"),
            email: "mthompson@rsp.com",
            contact: "+310 6 27658856",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 184,
          ref: "4.130",
          title: "Monitor progress of developing design",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 185,
          ref: "4.140",
          title:
            "Review updated Handover Strategy, Project Strategies and Risk Assessments with project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 186,
          ref: "4.150",
          title: "Review and update Project Execution Plan",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 187,
          ref: "4.160",
          title: "Comment on stage Design Programme",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 188,
          ref: "4.170",
          title: "Manage Change Control process",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 189,
          ref: "4.180",
          title: "Monitor and review progress and performance of project team",
          agent: "Project lead",
          user: {
            firstName: "Andrew",
            lastName: "Armstrong",
            picture: require("../../../assets/temp/admin.png"),
            email: "aarmstrong@ms4aeco.com",
            contact: "+351 911 455 488",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 190,
          ref: "4.190",
          title:
            "Review Technical Design proposals and Project Strategies as they progress and integrate the design work specialist subcontractors",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 191,
          ref: "4.200",
          title:
            "Update Sustainability Strategy and Maintenance and Operational Strategy",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 192,
          ref: "4.210",
          title:
            "Prepare stage Design Programme in conjunction with other design team members",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 192,
          ref: "4.220",
          title: "Monitor and review progress and performance of design team",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 193,
          ref: "4.230",
          title: "Liaise with specialist subcontractors",
          agent: "Lead designer",
          user: {
            firstName: "Leighton",
            lastName: "Green",
            picture: "",
            email: "lgreen@norcraft.net",
            contact: "+351 911 111 111",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 194,
          ref: "4.240",
          title: "Prepare architectural Technical Design",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 195,
          ref: "4.250",
          title:
            "Submit Building Regulations Submission (Building Warrant in Scotland)",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 196,
          ref: "4.260",
          title: "Undertake third party consultations",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 197,
          ref: "4.270",
          title: "Undertake third party consultations",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 198,
          ref: "4.280",
          title: "Provide information for update of Project Strategies",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 199,
          ref: "4.290",
          title: "Liaise with specialist subcontractors",
          agent: "Architect",
          user: {
            firstName: "Sophia",
            lastName: "Holland",
            picture: require("../../../assets/temp/users/imacena.png"),
            email: "sholland@imarch.pt",
            contact: "+351 911 989 002",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 200,
          ref: "4.300",
          title: "Prepare building services Technical Design",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 201,
          ref: "4.310",
          title:
            "Undertake third party consultations as required and any Research and Development aspects",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 202,
          ref: "4.320",
          title:
            "Assist Lead designer with preparation of stage Design Programme",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 203,
          ref: "4.330",
          title:
            "Provide information for update of Cost Information and Project Strategies",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 204,
          ref: "4.340",
          title: "Liaise with specialist subcontractors",
          agent: "Building services engineer",
          user: {
            firstName: "Travis",
            lastName: "Chambers",
            picture: require("../../../assets/temp/users/bcaires.png"),
            email: "tchambers@bm.net",
            contact: "+351 912 312 312",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 205,
          ref: "4.350",
          title: "Prepare Civil Engineering Technical Design",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 206,
          ref: "4.360",
          title: "Undertake third party consultations",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 206,
          ref: "4.360",
          title: "Undertake third party consultations",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 207,
          ref: "4.370",
          title:
            "Assist Lead designer with preparation of stage Design Programme",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 208,
          ref: "4.380",
          title:
            "Provide information for update of Cost Information and Project Strategies",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 209,
          ref: "4.390",
          title: "Liaise with specialist subcontractors as necessary",
          agent: "Civil engineer",
          user: {
            firstName: "Mark",
            lastName: "Green",
            picture: require("../../../assets/temp/users/jribeiro.png"),
            email: "mgreen@brooks.com",
            contact: "+351 965 654 832",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 210,
          ref: "4.400",
          title: "Prepare Structural Technical Design",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 211,
          ref: "4.410",
          title:
            "Undertake third party consultations as required and any Research and Development aspects",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 212,
          ref: "4.420",
          title:
            "Undertake third party consultations as required and any Research and Development aspects",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 213,
          ref: "4.430",
          title:
            "Provide information for update of Cost Information and Project Strategies",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 214,
          ref: "4.440",
          title: "Liaise with specialist subcontractors as necessary",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 215,
          ref: "4.450",
          title: "Update preliminary Cost information",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
        {
          id: 216,
          ref: "4.460",
          title:
            "Assist Lead designer with preparation of stage Design Programme",
          agent: "Structural engineer",
          user: {
            firstName: "Alan",
            lastName: "Davis",
            picture: "",
            email: "adavis@tns.pt",
            contact: "+351 911 114",
          },
          status: "Ongoing",
          deadline: "",
          stage: 4,
        },
      ],
    };
  },
  methods: {
    removeItem(toRemove) {
      this.tasks = this.tasks.filter((task) => task.id !== toRemove);
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
    tasks() {
      const tasks = [];
      const selectedStages = JSON.parse(
        JSON.stringify(this.$store.state.selectedStages)
      );

      selectedStages.forEach((stage) => {
        tasks.push(this.dummyTasks.filter((task) => task.stage == stage));
      });
      return tasks.flat();
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
</style>