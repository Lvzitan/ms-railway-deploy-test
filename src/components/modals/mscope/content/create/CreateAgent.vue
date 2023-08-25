<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-3" style="white-space: none">
      Create New Agent
    </h1>
    <section class="column-span-3 steps-wrapper">
      <section class="step step-active">
        <p class="-stb step-number step-number-active">1</p>
        <p class="-stb">Select Agent</p>
      </section>
      <section class="step" :class="{ 'step-active': currentStep > 1 }">
        <p
          class="-stb step-number"
          :class="{ 'step-number-active': currentStep > 1 }"
        >
          2
        </p>
        <p class="-stb">Assign Member</p>
      </section>
    </section>
    <hr class="column-span-3" />

    <article v-show="currentStep === 1" class="column-span-3">
      <section class="column-span-3 field">
        <p class="-xstb column-span-1">Select Agent</p>
        <select
          ref="agentDpdownRef"
          :disabled="customAgent"
          @change="removeErrFromEl(['agentInputRef', 'agentDpdownRef'])"
          class="column-span-2 -xstb"
        >
          <option selected disabled hidden>
            {{ dropdownInitValue }}
          </option>
          <option v-for="agent in agents" :key="agent" class="-xstb">
            {{ agent.title }}
          </option>
        </select>
        <p
          class="-xstb error-msg"
          style="grid-column: 2 / span 1; justify-self: start"
        >
          Please select an agent!
        </p>
      </section>

      <section class="column-span-3 field">
        <div class="column-span-1 flex-item">
          <input
            type="checkbox"
            id="custom"
            @change="[(customAgent = !customAgent), focusEl('agentInputRef')]"
          />
          <div class="flex-item-column">
            <label for="custom" class="-xstb">Custom Agent</label>
            <label for="custom" class="-xstr"
              >Use this option to create a custom Agent</label
            >
          </div>
        </div>
        <input
          type="text"
          :disabled="!customAgent"
          ref="agentInputRef"
          @focus="removeErrFromEl(['agentInputRef', 'agentDpdownRef'])"
          class="column-span-2 -xstb"
        />
        <p
          class="-xstb error-msg"
          style="grid-column: 2 / span 1; justify-self: start"
        >
          {{ dropdownInitValue }}
        </p>
      </section>
      <hr class="column-span-3" />
      <section class="column-span-1 btn-wrapper">
        <Button :state="'primary'" :title="'Next Step'" @click="nextStep" />
      </section>
    </article>
    <!-- STEP 2 -->
    <article v-show="currentStep === 2" class="column-span-3">
      <p
        class="-stb column-span-3"
        style="white-space: nowrap; color: var(--info)"
      >
        {{ newAgent }}
      </p>

      <div class="column-span-3 field">
        <p class="-xstb column-span-1">
          Who will be responsible for this agent?
        </p>
        <input
          type="text"
          placeholder="user@ms4aeco.com"
          ref="searchUserRef"
          v-model="userSearch"
          class="-xstb column-span-2"
          @focus="[(usersList = data), removeErrFromEl(['searchUserRef'])]"
        />
        <p
          class="-xstb error-msg"
          style="grid-column: 2 / span 1; justify-self: start"
        >
          {{ userSearchErrMsg }}
        </p>
        <ul class="column-span-3 users-list" v-if="usersList">
          <li
            v-for="user in usersList"
            :key="user"
            @click="
              [(user.toggled = !user.toggled), stageUserInvites(user.email)]
            "
            class="user-li"
            :class="{ selected: user.toggled }"
          >
            <!-- <p class="-xstr">{{ user.name }}</p> -->
            <section class="flex-item">
              <DynaBadge
                :firstName="user.firstName"
                :lastName="user.lastName"
                :picturePath="user.picturePath"
              />
              <div>
                <p class="-xstb">{{ user.firstName }}</p>
                <p class="-xstr">{{ user.lastName }}</p>
              </div>
            </section>
            <p class="-xstb">{{ user.email }}</p>
          </li>
          <hr class="column-span-3" />
          <li
            class="user-li"
            ref="customEmailRef"
            @click="
              [
                stageUserInvites(userSearch),
                toggleUserSelection(customEmailRef),
              ]
            "
          >
            <section class="flex-item">
              <DynaBadge />
              <div>
                <p class="-xstb"></p>
                <p class="-xstr"></p>
              </div>
            </section>

            <p class="-xstb">{{ userSearch }}</p>
          </li>
          <p class="-xstb column-span-3 warnMsg" v-show="customInvite">
            This user does not exist. An invitation will be sent to the inserted
            email as a request to join both the platform and your unit as an
            observer.
          </p>
        </ul>
      </div>
      <hr class="column-span-3" />
      <section class="btn-wrapper-step2">
        <div class="btn-previous">
          <Button
            :state="'secondary'"
            :title="'Previous Step'"
            @click="previousStep"
          />
        </div>

        <div class="main-btns-wrapper">
          <Button
            :state="'secondary'"
            :title="'Skip Step and Create Agent'"
            @click="skipAndCreate"
            style="scale: 0.9"
          />
          <Button
            :state="'primary'"
            :title="'Create and Invite'"
            @click="inviteAndCreate('searchUserRef')"
          />
        </div>
      </section>
    </article>
  </main>
</template>

<script >
import Button from "../../../../utils/BaseButton.vue";
import DynaBadge from "../../../../utils/DynaBadge.vue";
import {
  addErrInputText,
  removeErrInputText,
} from "../../../../../helpers/styleToggler";
export default {
  emits: ["closeModal"],
  components: {
    Button,
    DynaBadge,
  },
  data() {
    return {
      agents: [
        { id: 1, title: "Agent 1" },
        { id: 2, title: "Agent 2" },
        { id: 3, title: "Agent 3" },
      ],
      usersList: null,
      data: [
        { firstName: "Nome", lastName: "Exemplo", email: "emailex@gmail.com" },
        { firstName: "Exemplo", lastName: "Nome", email: "ex@gmail.com" },
        { firstName: "Teste", lastName: "Ultimo", email: "teste@gmail.com" },
      ],
      dropdownInitValue: "Search *Framework Name* for a new agent",
      currentStep: 1,
      customAgent: false,
      newAgent: null,
      userSearch: "",
      userSearchErrMsg: "Please enter a valid email address!",
      selectedEmails: [],
      customInvite: false,
      //REFS
      customEmailRef: "customEmailRef",
    };
  },
  methods: {
    inviteAndCreate(searchUserRef) {
      const valueToValidate = this.$refs[searchUserRef].value;
      if (!valueToValidate.length) {
        this.userSearchErrMsg = "Please enter a valid email address!";
        addErrInputText(this.$refs[searchUserRef]);
        return;
      }
      if (!this.selectedEmails.length) {
        this.userSearchErrMsg =
          "Please select the emails to whom you wish to send the invitation.";
        addErrInputText(this.$refs[searchUserRef]);
        return;
      }
      //RUN API CODE HERE
      this.$emit("closeModal");
    },
    stageUserInvites(email) {
      if (email === "") return; //just in case

      this.selectedEmails.some((arrayItem) => arrayItem === email)
        ? (this.selectedEmails = this.selectedEmails.filter(
            (emailToRemove) => email !== emailToRemove
          ))
        : this.selectedEmails.push(email);

      console.log(this.selectedEmails);
    },
    toggleUserSelection(ref) {
      if (this.userSearch === "") return; //just in case

      let documentEl = this.$refs[ref];
      const styleToToggle = "selected";

      !documentEl.classList.value.includes(styleToToggle)
        ? documentEl.classList.add("selected")
        : documentEl.classList.remove("selected");

      this.customInvite = !this.customInvite; //toggle custom invite message
    },
    skipAndCreate() {
      console.log("skip and create ran");
      this.$emit("closeModal");
    },
    nextStep() {
      const lastStep = 2;
      if (this.currentStep === lastStep) return;

      const stageNewAgent = this.getNewAgentToDropdownValue();
      if (!stageNewAgent.length || stageNewAgent === this.dropdownInitValue) {
        let elRef;
        this.customAgent
          ? (elRef = "agentInputRef")
          : (elRef = "agentDpdownRef");
        addErrInputText(this.$refs[elRef]);
        return;
      }

      this.newAgent = stageNewAgent;
      console.log(this.newAgent);
      this.currentStep++;
    },
    previousStep() {
      const firstStep = 1;
      if (this.currentStep === firstStep) return;
      this.currentStep--;
    },
    getNewAgentToDropdownValue() {
      const dropdownRef = "agentDpdownRef";
      const inputRef = "agentInputRef";
      let agentRef;

      !this.customAgent ? (agentRef = dropdownRef) : (agentRef = inputRef);

      return this.$refs[agentRef].value.trim();
    },
    removeErrFromEl(refsArray) {
      const errorClassName = "error-input";
      refsArray.forEach((ref) => {
        const elClasses = this.$refs[ref].classList.value; //this is a string

        if (!elClasses.includes(errorClassName)) {
          return;
        } else {
          removeErrInputText(this.$refs[ref]);
        }
      });
    },
    focusEl(ref) {
      if (!this.customAgent) return;
      else {
        const el = this.$refs[ref];
        this.$nextTick(() => el.focus());
      }
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  width: 100%;
  height: auto;
  /* width: auto;
  height: auto; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(12, 1fr); */
  padding-inline: 32px;
  padding-block: 16px;
  gap: 12px;
}
.column-span-3 {
  grid-column: span 3;
  align-self: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.column-span-2 {
  grid-column: span 2;
  align-self: center;
}
.column-span-1 {
  grid-column: span 1;
  align-self: center;
}
.steps-wrapper {
  display: flex;
  justify-content: flex-start;
  gap: 64px;
  user-select: none;
}
.step {
  display: flex;
  align-items: center;
  padding-inline: 8px;
  gap: 8px;
  border-bottom: 2px solid var(--gray4);
  color: var(--gray3);
  height: 40px;
}
.step:hover {
  filter: brightness(110%);
}
.step-number {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--gray4) 0 0 0 2px;
}
.step-number-active {
  box-shadow: var(--highlight) 0 0 0 2px;
}
.step-active {
  border-bottom: 2px solid var(--highlight);
  color: var(--highlight);
}
.step-active:hover {
  /* border-bottom: 2px solid var(--highlight);
  color: var(--highlight); */
  filter: brightness(140%);
}
hr {
  border: none;
  border-top: 1px solid var(--gray6);
  margin-block: 8px;
}
.flex-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.flex-item-column {
  display: flex;
  flex-direction: column;
  padding-right: 16px;
}
.btn-wrapper {
  grid-column: 1 / span 3;
  justify-self: end;
  padding-top: 8px;
}
.btn-wrapper-step2 {
  grid-column: span 3;
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.btn-previous {
  scale: 0.8;
  margin-left: -24px;
}
.users-list {
  height: auto;
  max-height: 240px;
  width: 100%;
  overflow: auto;
}
.users-list p:last-child {
  display: flex;
  align-items: center;
}
.user-li {
  padding-block: 8px;
  padding-inline: 16px;
  border-radius: 4px;
  grid-column: span 3;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  gap: 8px;
}
.user-li:hover {
  background: var(--success-light-transp);
}
.main-btns-wrapper {
  display: flex;
  gap: 8px;
}
label {
  user-select: none;
  cursor: pointer !important;
}
.error-msg {
  white-space: nowrap;
}
.selected,
.selected:hover {
  background: var(--success-light);
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
/* *** QUERIES *** */
@media screen and (max-width: 599px) {
  .column-span-3 {
    grid-column: span 3;
    width: 100%;
  }
  .column-span-2 {
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