<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-4" style="white-space: none">
      Update Element
    </h1>
    <hr class="column-span-4" />
    <div class="column-span-4 flex-column">
      <p class="-ntb">{{ updatedElement.classification }}</p>
      <p class="-stb" style="color: var(--info)">{{ updatedElement.title }}</p>
    </div>
    <hr class="column-span-4" />

    <div class="column-span-1 flex-column">
      <p class="-xstb">LOD</p>
      <select ref="lodRef" @change="setLod(lodRef)" class="-xstr">
        <option selected hidden disabled class="-xstr">
          {{ updatedElement.lod }}
        </option>
        <option v-for="lod in lodList" :key="lod" class="-xstr">
          {{ lod }}
        </option>
      </select>
    </div>

    <div class="column-span-1 flex-column">
      <p class="-xstb">LOI</p>
      <select ref="loiRef" @change="setLoi(loiRef)" class="-xstr">
        <option selected hidden disabled class="-xstr">
          {{ updatedElement.loi }}
        </option>
        <option v-for="loi in lodList" :key="loi" class="-xstr">
          {{ loi }}
        </option>
      </select>
    </div>

    <div class="column-span-4 flex-column">
      <p class="-xstb">Assign Responsible</p>
      <AssignSingleAgent
        :agents="users"
        :propSearchString="setPropSearchString(updatedElement.agent)"
      />
    </div>

    <hr class="column-span-4" />
    <section class="btns-wrapper">
      <BaseButton
        :state="'primary'"
        :title="'Update Element'"
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
      updatedElement: null,
      //REFS
      lodRef: "lodRef",
      loiRef: "loiRef",
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
      lodList: [2, 3, 4, 5],
      loiList: [2, 3, 4, 5, 6],
    };
  },
  methods: {
    handleClick() {
      //prepare for api code here and send and then:
      this.$emit("closeModal");
    },
    setLod(ref) {
      this.updatedElement.lod = this.$refs[ref].value.trim();
      console.log(this.updatedElement.lod);
    },
    setLoi(ref) {
      this.updatedElement.loi = this.$refs[ref].value.trim();
      console.log(this.updatedElement.loi);
    },
    setPropSearchString(prop) {
      const invalidValue = "Not Assigned";
      if (!prop || prop === invalidValue) return;
      return prop;
    },
  },
  created() {
    console.log(this.item);
    this.updatedElement = JSON.parse(JSON.stringify(this.item));
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
  align-self: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.column-span-3 {
  grid-column: span 3;
  align-self: center;
}
.column-span-2 {
  grid-column: span 2;
  align-self: center;
}
.column-span-1 {
  grid-column: span 1;
  align-self: center;
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
  .column-span-2 {
    grid-column: span 4;
    width: 100%;
  }
  .column-span-1 {
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