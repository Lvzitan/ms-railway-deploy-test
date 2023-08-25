<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-3" style="white-space: none">Invite Member</h1>
    <hr class="column-span-3" />
    <section class="top-section">
      <section class="project-info-wrapper">
        <p class="-xstb" style="color: var(--info)">Project:</p>
        <div class="project-info">
          <p class="-xstb">{{ project.name }}</p>
          <p class="-xstr">{{ project.ref }}</p>
        </div>
      </section>
      <i class="i-arrow-right" style="cursor: default"></i>
      <section class="project-info-wrapper">
        <p class="-xstb" style="color: var(--info)">Unit:</p>
        <div class="project-info">
          <p class="-xstb">{{ unit.name }}</p>
          <p class="-xstr">{{ unit.ref }}</p>
        </div>
      </section>
    </section>

    <hr class="column-span-3" />

    <article class="column-span-3">
      <p class="-stb column-span-3" style="white-space: nowrap">
        Who would you like to invite?
      </p>

      <div class="column-span-3">
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
          style="grid-column: 1 / span 3; justify-self: start"
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
      <section class="btn-wrapper">
        <Button
          :state="'primary'"
          :title="'Send Invite'"
          @click="handleClick('searchUserRef')"
        />
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
      // DUMMY DATA
      agents: [
        { id: 1, title: "Agent 1" },
        { id: 2, title: "Agent 2" },
        { id: 3, title: "Agent 3" },
      ],
      data: [
        { firstName: "Teste", lastName: "Ultimo", email: "teste@gmail.com" },
      ],
      project: {
        name: "Project Example",
        ref: "NP_001",
      },
      unit: {
        name: "Unit Example",
        ref: "NB_001",
      },
      usersList: null,
      dropdownInitValue: "Search *Framework Name* for a new agent",
      currentStep: 1,
      customAgent: false,
      newAgent: null,
      userSearch: "",
      customInvite: false,
      userSearchErrMsg: "Please enter a valid email address!",
      selectedEmails: [],
      //REFS
      customEmailRef: "customEmailRef",
    };
  },
  methods: {
    handleClick(searchUserRef) {
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
    toggleUserSelection(ref) {
      if (this.userSearch === "") return; //just in case

      let documentEl = this.$refs[ref];
      const styleToToggle = "selected";

      !documentEl.classList.value.includes(styleToToggle)
        ? documentEl.classList.add("selected")
        : documentEl.classList.remove("selected");

      this.customInvite = !this.customInvite; //toggle custom invite message
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
.top-section {
  grid-column: span 3;
  display: flex;
  gap: 40px;
}
.project-info-wrapper {
  display: flex;
  gap: 8px;
}
.project-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
.warnMsg {
  color: var(--warn);
}
i {
  scale: 0.6;
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
}
@media screen and (max-width: 454px) {
  .error-msg {
    white-space: normal;
  }
  .btn-wrapper {
    justify-self: center;
    width: 100%;
  }
}
</style>