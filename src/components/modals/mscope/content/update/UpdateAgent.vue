<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-3" style="white-space: none">
      Update New Agent
    </h1>
    <hr class="column-span-3" />
    <div class="column-span-3">
      <p class="-xstb column-span-1">Select Agent</p>
      <select
        ref="agentsDpdownRef"
        @change="setAgentTitle(agentsDpdownRef)"
        class="column-span-2 -xstb"
      >
        <option selected disabled hidden>
          {{ updatedAgent.title }}
        </option>
        <option v-for="agent in agents" :key="agent" class="-xstb">
          {{ agent.title }}
        </option>
        <option class="-xstb">{{ otherDpdownValue }}</option>
      </select>
    </div>
    <div class="column-span-3">
      <p class="-xstb column-span-1">Assign Member</p>
      <div class="column-span-2">
        <AssignSingleAgent
          :agents="users"
          :propSearchString="updatedAgent.title"
        />
      </div>
    </div>
    <hr class="column-span-3" />

    <section class="btns-wrapper">
      <BaseButton
        :state="'primary'"
        :title="'Update Agent'"
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
      updatedAgent: null,
      customAgent: false,
      otherDpdownValue: "Other (Custom Agent)",
      //REFS
      agentsDpdownRef: "agentsDpdownRef",
      agentInputRef: "agentInputRef",

      //TEMP
      agents: [
        { id: 1, title: "Architect" },
        { id: 2, title: "Contractor" },
        { id: 3, title: "Civil Engineer" },
        { id: 4, title: "Services Engineer" },
        { id: 5, title: "Client" },
        { id: 6, title: "Design Director" },
        { id: 7, title: "Structures Engineer" },
      ],
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
    };
  },
  methods: {
    handleClick() {
      if (this.customAgent)
        this.updatedAgent.title = this.$refs[this.agentInputRef].value.trim();

      //prepare for api code here and send and then:

      this.$emit("closeModal");
    },
    setAgentTitle(ref) {
      this.updatedAgent.title = this.$refs[ref].value.trim();

      this.toggleCustomAgent();
      console.log(this.updatedAgent.title);
    },
    toggleCustomAgent() {
      if (
        !this.customAgent &&
        this.updatedAgent.title !== this.otherDpdownValue
      )
        return;
      if (this.updatedAgent.title === this.otherDpdownValue)
        this.customAgent = true;
      else this.customAgent = false;
    },
  },
  created() {
    console.log(this.item);
    this.updatedAgent = JSON.parse(JSON.stringify(this.item));
  },
};
</script>

<style scoped>
.form-wrapper {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-inline: 32px;
  padding-block: 16px;
  gap: 12px;
}
.column-span-3 {
  grid-column: span 3;
  align-self: start;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
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
}
hr {
  border: none;
  border-top: 1px solid var(--gray6);
  margin-block: 8px;
}
/* *** TENTAR GLBOALIZAR *** */
input[type="text"],
select,
option,
.users-list {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  padding: 8px;
  outline: none;
}
input[type="text"],
select {
  height: 38px;
}
input[type="text"],
select {
  width: 100%;
}

/**EFFECTS **/
input[type="text"]:focus,
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
  grid-column: 3 / span 1;
}

/* *** QUERIES *** */
@media screen and (max-width: 599px) {
  .column-span-2 {
    grid-column: span 3;
    width: 100%;
  }
  .column-span-1 {
    grid-column: span 3;
    width: 100%;
  }
  .column-span-1 {
    grid-column: span 3;
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