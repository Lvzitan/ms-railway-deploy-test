<template>
  <main class="table-container">
    <table>
      <thead>
        <tr class="-stb t-header">
          <th>Company</th>
          <th>Tasks Completed</th>
          <th>Users</th>
          <th>Contact</th>
        </tr>
      </thead>
      <!---->
      <tbody v-for="item in tableContent" :key="item">
        <tr class="t-body">
          <td>
            <div class="flex-row">
              <DynaBadge
                :picturePath="item.organization.imagePath"
                :firstName="item.organization.name"
              />

              <p class="-stb">{{ item.organization.name }}</p>
            </div>
          </td>
          <td>
            <div class="progressbar-container">
              <div
                class="progressbar"
                :style="`width: ${item.tasksCompleted}`"
                :title="item.tasksCompleted"
              ></div>
            </div>
          </td>
          <td nowrap>
            <div class="users-container">
              <DynaBadge
                v-for="(user, index) in item.users"
                :key="user"
                :picturePath="user.imagePath"
                :firstName="user.firstName"
                :lastName="user.lastName"
                :style="{
                  transform: `translateX(calc( -1 * (calc(16px + calc(${index} * 10px)) ))`,
                }"
              />
            </div>
          </td>
          <td>
            <div>
              <p class="-stb">{{ item.organization.email }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <section class="pagination-container">
      <div class="buttons-container">
        <div class="btn-command"><p class="-stb">Previous</p></div>
        <div class="btn-command"><p class="-stb">Next</p></div>
      </div>
      <p class="-xstb">Page 1 of 1</p>
    </section> -->
  </main>
</template>

<script>
import DynaBadge from "../utils/DynaBadge.vue";
export default {
  components: { DynaBadge },
  data() {
    return {
      tableContent: [
        {
          organization: {
            name: "B&M",
            email: "management@bm.net",
            imagePath: require("../../assets/temp/orgs/bm.png"),
          },
          tasksCompleted: "70%",
          users: [
            {
              firstName: "Andrew",
              lastName: "Armstrong",
              imagePath: require("../../assets/temp/admin.png"),
            },
            {
              firstName: "Travis",
              lastName: "Chambers",
              imagePath: require("../../assets/temp/users/bcaires.png"),
            },
          ],
        },
        {
          organization: {
            name: "IM Architecture",
            email: "helpdesk@imarch.uk",
            imagePath: require("../../assets/temp/orgs/imarch.png"),
          },
          tasksCompleted: "60%",
          users: [
            {
              firstName: "Sophia",
              lastName: "Holland",
              imagePath: require("../../assets/temp/users/imacena.png"),
            },
          ],
        },
        {
          organization: {
            name: "Brooks & Sons",
            email: "support@brooks.com",
            imagePath: require("../../assets/temp/orgs/bs.png"),
          },
          tasksCompleted: "80%",
          users: [
            {
              firstName: "Mark",
              lastName: "Green",
              imagePath: require("../../assets/temp/users/jribeiro.png"),
            },
            {
              firstName: "Jimmy",
              lastName: "Stone",
              imagePath: "",
            },
          ],
        },
        {
          organization: {
            name: "RS Prime",
            email: "general@rsp.com",
            imagePath: require("../../assets/temp/orgs/rs.png"),
          },
          tasksCompleted: "55%",
          users: [
            {
              firstName: "Mark",
              lastName: "Thompson",
              imagePath: require("../../assets/temp/users/jaleixo.png"),
            },
          ],
        },
        {
          organization: {
            name: "Zafir",
            email: "support@zafir.com",
            imagePath: require("../../assets/temp/orgs/zafir.png"),
          },
          tasksCompleted: "74%",
          users: [{ firstName: "Jessica", lastName: "Smith", imagePath: "" }],
        },
        {
          organization: {
            name: "Norcraft",
            email: "general@nocraft.net",
            imagePath: require("../../assets/temp/orgs/norcraft.png"),
          },
          tasksCompleted: "82%",
          users: [
            {
              firstName: "Leighton",
              lastName: "Green",
              imagePath: "",
            },
          ],
        },
        {
          organization: {
            name: "TNS",
            email: "support@tns.com",
            imagePath: require("../../assets/temp/orgs/tns.png"),
          },
          tasksCompleted: "69%",
          users: [
            {
              firstName: "Alan",
              lastName: "Davis",
              imagePath: "",
            },
          ],
        },
        {
          organization: {
            name: "Siterra",
            email: "general@siterra.com",
            imagePath: require("../../assets/temp/orgs/siterra.png"),
          },
          tasksCompleted: "49%",
          users: [
            {
              firstName: "Ralph",
              lastName: "Ward",
              imagePath: "",
            },
          ],
        },
        {
          organization: {
            name: "D&F",
            email: "support@dnf.com",
            imagePath: require("../../assets/temp/orgs/df.png"),
          },
          tasksCompleted: "89%",
          users: [
            {
              firstName: "Robert",
              lastName: "Hunt",
              imagePath: require("../../assets/temp/users/dfrancisco.png"),
            },
          ],
        },
        {
          organization: {
            name: "BSafety",
            email: "general@bsafety.com",
            imagePath: require("../../assets/temp/orgs/bsafe.png"),
          },
          tasksCompleted: "58%",
          users: [
            {
              firstName: "Jimmy",
              lastName: "Hopkins",
              imagePath: require("../../assets/temp/users/asousa.png"),
            },
          ],
        },
        {
          organization: {
            name: "Gradient",
            email: "support@gradient.com",
            imagePath: require("../../assets/temp/orgs/gradient.png"),
          },
          tasksCompleted: "57%",
          users: [
            {
              firstName: "Elizabeth",
              lastName: "Fox",
              imagePath: "",
            },
          ],
        },
        {
          organization: {
            name: "Niteroica",
            email: "helpdesk@niteroica.com",
            imagePath: require("../../assets/temp/orgs/niteroica.png"),
          },
          tasksCompleted: "77%",
          users: [
            {
              firstName: "Harris",
              lastName: "Marshall",
              imagePath: require("../../assets/temp/users/msantos.png"),
            },
          ],
        },
      ],

      upics: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/65.jpg",
        "https://randomuser.me/api/portraits/women/63.jpg",
        "https://randomuser.me/api/portraits/men/83.jpg",
        "https://randomuser.me/api/portraits/men/79.jpg",
      ],
    };
  },
  computed: {
    filteredUpics() {
      return this.upics.slice(0, 4);
    },
    unshownUsers() {
      let counter = 0;

      for (let index = 0; index < this.upics.length; index++) {
        counter++;
      }
      counter = counter - 4;
      return counter;
    },
  },
};
</script>

<style scoped>
.table-container {
  position: relative;
  width: 100%;
  /* height: 100%; */
  box-shadow: var(--myBoxShadow);
  border-radius: 4px;
  max-height: 500px;
  overflow: auto;
}
table {
  width: 100%;
  max-height: calc(100% - 60px);
  border-collapse: collapse;
  text-align: left;
  position: relative;
  overflow-x: auto;
}
.t-header {
  color: var(--gray3);
  height: 40px;
  background: var(--white1);
  position: sticky;
  top: 0;
  z-index: 1;
}
th {
  user-select: none;
  cursor: pointer;
  padding-inline: 1rem;
  border-bottom: 1px solid var(--gray5);
}
td {
  padding-inline: 1rem;
  height: 60px;
  border-bottom: 1px solid var(--gray5);
}
.t-body:nth-child(even) {
  background-color: #f9fafb;
}
.company-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url("https://www.itjobs.pt/empresa/bimms/logo/social");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.progressbar-container {
  width: 100%;
  height: 12px;
  border-radius: 8px;
  background: #eee2ff;
}
.progressbar {
  height: 100%;
  width: 70%;
  border-radius: 8px;
  background: var(--secondary);
}
.status {
  color: var(--success);
}
.status {
  display: inline;
  padding-block: 4px;
  padding-inline: 8px;
  border-radius: 16px;
  background: rgba(0, 205, 116, 0.1);
}
/* .users-container {
  height: 40px;
  padding-left: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
} */
.users-container {
  height: 40px;
  padding-left: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50px; /*isto é estupido, alterar quando der*/
}
.user-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: var(--secondary);
  background: #f9f5ff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: white 0px 0px 0px 2px;
  user-select: none;
}
/****PAGINATION****/
.pagination-container {
  width: 100%;
  height: 60px;
  padding-inline: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
}
.buttons-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}
.btn-command {
  box-shadow: var(--myBoxShadow);
  color: var(--gray2);
  padding-block: 8px;
  padding-inline: 16px;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
}
.btn-command:hover {
  background: rgba(0, 0, 0, 0.1);
}

/*ICONS*/
i {
  transform: scale(0.55);
}
i:hover {
  transform: scale(0.7);
  cursor: pointer;
}
.flex-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

@media screen and (max-width: 1280px) {
  .pagination-container {
    position: relative;
  }
}
@media screen and (max-width: 1280px) {
  .table-container {
    position: relative;
    width: 100%;
    /* height: auto; */
    box-shadow: var(--myBoxShadow);
    border-radius: 4px;
    overflow-x: auto;
  }
}
</style>