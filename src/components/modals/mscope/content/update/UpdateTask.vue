<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-4" style="white-space: none">Update Task</h1>
    <hr class="column-span-4" />
    <div class="column-span-1 flex-column">
      <p class="-xstb">Reference</p>
      <input
        type="text"
        disabled
        class="-xstb"
        v-model.trim="updatedTask.ref"
      />
    </div>

    <div class="column-span-3 flex-column">
      <p class="-xstb">Task Title</p>
      <input type="text" class="-xstr" v-model.trim="updatedTask.title" />
    </div>

    <div class="column-span-1 flex-column">
      <p class="-xstb">Change Status</p>
      <select
        ref="statusDpdownRef"
        @change="setStatus(statusDpdownRef)"
        class="-xstr"
      >
        <option selected disabled hidden class="-xstr">
          {{ updatedTask.status }}
        </option>
        <option v-for="s in status" :key="s" class="-xstr">
          {{ s }}
        </option>
      </select>
    </div>

    <div class="column-span-3 flex-column assign-agent-container">
      <p class="-xstb">Assign Agent</p>
      <AssignSingleAgent
        :agents="users"
        :propSearchString="updatedTask.agent"
      />
    </div>

    <div class="column-span-1 flex-column">
      <p class="-xstb">Deadline</p>
      <input ref="deadlineRef" type="date" class="-xstr" />
    </div>

    <hr class="column-span-4" />

    <div class="column-span-2 flex-column">
      <p class="-xstb">Related Element</p>
      <select
        ref="relatedElementRef"
        @change="setRelatedElement(relatedElementRef)"
        class="-xstr"
      >
        <option selected class="-xstr">Option 1</option>
        <option class="-xstr">Option 2</option>
      </select>
    </div>

    <div class="column-span-2 flex-column">
      <p class="-xstb">Related Element</p>
      <select
        ref="relatedDeliverableRef"
        @change="setRelatedDeliverable(relatedDeliverableRef)"
        class="-xstr"
      >
        <option selected class="-xstr">Option 1</option>
        <option class="-xstr">Option 2</option>
      </select>
    </div>

    <hr class="column-span-4" />
    <section class="btns-wrapper">
      <BaseButton
        :state="'primary'"
        :title="'Update Task'"
        @click="handleClick()"
      />
    </section>
  </main>
</template>

<script>
import BaseButton from "../../../../utils/BaseButton.vue";
import AssignSingleAgent from "../../../../utils/AssignSingleAgent.vue";
export default {
  props: ["item"],
  emits: ["closeModal"],
  components: {
    BaseButton,
    AssignSingleAgent,
  },
  data() {
    return {
      updatedTask: null,
      //REFS
      usersDpdownRef: "usersDpdownRef",
      agentsDpdownRef: "agentsDpdownRef",
      statusDpdownRef: "statusDpdownRef",
      deadlineRef: "deadlineRef",
      relatedElementRef: "relatedElementRef",
      relatedDeliverableRef: "relatedDeliverableRef",
      //TEMP
      users: [
        {
          id: 1,
          firstName: "Luciana",
          lastName: "Palmer",
          email: "lucianapalmer@ms4aeco.com",
          agent_title: "Architect",
        },
        {
          id: 2,
          firstName: "Betsy",
          lastName: "Brandt",
          email: "betsybrandt@ms4aeco.com",
          agent_title: "Civil Engineer",
        },
        {
          id: 3,
          firstName: "Milo",
          lastName: "Roberts",
          email: "miloroberts@ms4aeco.com",
          agent_title: "Civil Engineer",
        },
        {
          id: 4,
          firstName: "Theodora",
          lastName: "Olsen",
          email: "theodoraolsen@ms4aeco.com",
          agent_title: "Structures Engineer",
        },
        {
          id: 5,
          firstName: "Rudi",
          lastName: "Pierce",
          email: "rpierce@ms4aeco.com",
          agent_title: "Client",
        },
        {
          id: 6,
          firstName: "Savanna",
          lastName: "Hamilton",
          email: "savannah@ms4aeco.com",
          agent_title: "Architect",
        },
        {
          id: 7,
          firstName: "Kaden",
          lastName: "Douglas",
          email: "kadendouglas@ms4aeco.com",
          agent_title: "Mechanical Engineer",
        },
      ],
      agents: [
        { id: 1, title: "Architect" },
        { id: 2, title: "Contractor" },
        { id: 3, title: "Civil Engineer" },
        { id: 4, title: "Services Engineer" },
        { id: 5, title: "Client" },
        { id: 6, title: "Design Director" },
        { id: 7, title: "Structures Engineer" },
      ],
      status: ["Ongoing", "Completed", "Awaiting Verification"],
    };
  },
  methods: {
    handleClick() {
      //prepare for api code here and send and then:
      this.$emit("closeModal");
    },
    setTaskTitle(ref) {
      this.updatedTask.title = this.$refs[ref].value.trim();

      this.toggleCustomtask();
      console.log(this.updatedTask.title);
    },
    setAgent(ref) {
      this.updatedTask.agent = this.$refs[ref].value.trim();
      console.log(this.updatedTask.agent);
    },
    setUser(ref) {
      const res = this.users.filter(
        (item) => item.email === this.$refs[ref].value.trim()
      );
      this.updatedTask.user = res[0];

      console.log(this.updatedTask.user);
    },
    setStatus(ref) {
      this.updatedTask.status = this.$refs[ref].value.trim();
      console.log(this.updatedTask.status);
    },
    setDeadline(ref) {
      this.updatedTask.deadline = this.$refs[ref].value.trim();
      console.log(this.updatedTask.deadline);
    },
    setRelatedElement(ref) {
      this.updatedTask.relatedElement = this.$refs[ref].value.trim();
      console.log(this.updatedTask.relatedElement);
    },
    setRelatedDeliverable(ref) {
      this.updatedTask.relatedDeliverable = this.$refs[ref].value.trim();
      console.log(this.updatedTask.relatedDeliverable);
    },
  },
  created() {
    console.log(this.item);
    this.updatedTask = JSON.parse(JSON.stringify(this.item));
  },
};
</script>

<style scoped>
.form-wrapper {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-inline: 32px;
  padding-block: 16px;
  gap: 12px;
}
.column-span-4 {
  grid-column: span 4;
  align-self: start;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.column-span-3 {
  grid-column: span 3;
  align-self: start;
}
.column-span-2 {
  grid-column: span 2;
  align-self: start;
}
.column-span-1 {
  grid-column: span 1;
  align-self: start;
}
.flex-item {
  display: flex;
  gap: 8px;
  /* flex-wrap: wrap; */
}
.flex-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.assign-agent-container {
  grid-row: span 2;
  height: 100%;
}
hr {
  border: none;
  border-top: 1px solid var(--gray6);
  margin-block: 8px;
}
/* *** TENTAR GLBOALIZAR *** */
input[type="text"],
input[type="date"],
select,
option,
.users-list {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  padding: 8px;
  outline: none;
}
input[type="text"],
input[type="date"],
select {
  height: 38px;
}
input[type="text"],
select {
  width: 100%;
}

/**EFFECTS **/
input[type="text"]:focus,
input[type="date"]:focus,
select:focus,
option:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}
p {
  user-select: none;
}
.-xltb {
  white-space: nowrap;
}
.step,
.step-number {
  transition: all 200ms ease-in-out !important;
}
.warnMsg {
  color: var(--warn);
}
.btns-wrapper {
  grid-column: 4 / span 1;
}

/* *** QUERIES *** */
@media screen and (max-width: 599px) {
  .column-span-3 {
    grid-column: span 4;
    width: 100%;
  }
  .column-span-2 {
    grid-column: span 4;
    width: 100%;
  }
  .column-span-1 {
    grid-column: span 4;
    width: 100%;
  }
  .field {
    display: flex;
    flex-direction: column;
  }
  .btn-wrapper-step2 {
    flex-direction: column-reverse;
  }
}
@media screen and (max-width: 454px) {
  .step-number {
    display: none;
  }
  .main-btns-wrapper {
    flex-direction: column-reverse;
  }
  .error-msg {
    white-space: normal;
  }
}
</style>