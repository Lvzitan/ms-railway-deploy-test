<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-4" style="white-space: none">Add New Task</h1>
    <section class="column-span-4 steps-wrapper">
      <section class="step step-active">
        <p class="-stb step-number step-number-active">1</p>
        <p class="-stb">Define Task</p>
      </section>
      <section class="step" :class="{ 'step-active': currentStep >= 2 }">
        <p
          class="-stb step-number"
          :class="{ 'step-number-active': currentStep >= 2 }"
        >
          2
        </p>
        <p class="-stb">Define Relations</p>
      </section>
      <section class="step" :class="{ 'step-active': currentStep >= 3 }">
        <p
          class="-stb step-number"
          :class="{ 'step-number-active': currentStep >= 3 }"
        >
          3
        </p>
        <p class="-stb">Confirm & Submit</p>
      </section>
    </section>
    <hr class="column-span-4" />

    <article v-show="currentStep === 1" class="column-span-4">
      <div class="column-span-3 field">
        <p class="-xstb">Task Title <span title="Mandatory Field">*</span></p>
        <div class="field">
          <input
            ref="taskTitleRef"
            type="text"
            v-model="taskTitle"
            @focus="removeErrFromEl(['taskTitleRef'])"
            class="-str"
          />
          <p class="-xstb error-msg">Please enter a task!</p>
        </div>
      </div>

      <div class="column-span-1 field">
        <p class="-xstb">Assigned to</p>
        <select
          ref="assignedToRef"
          @change="setAssignedTo('assignedToRef')"
          @blur="setAssignedTo('assignedToRef')"
          class="-str"
        >
          <option class="-xstb" selected>{{ dropdownInitValue }}</option>
          <option v-for="agent in agents" :key="agent" class="-xstb">
            {{ agent.title }}
          </option>
        </select>
      </div>

      <div class="column-span-3 field">
        <p class="-xstb">Exchange Information Requirements</p>
        <input type="text" v-model="exchangeIR" class="-str" />
      </div>

      <div class="column-span-1 field">
        <p class="-xstb">Deadline</p>
        <input
          ref="deadlineRef"
          type="date"
          @change="setDeadline('deadlineRef')"
          class="-str"
        />
      </div>
      <hr class="column-span-4" />
      <section class="column-span-1 btn-wrapper">
        <Button
          :state="'primary'"
          :title="'Next Step'"
          @click="nextStep('taskTitleRef')"
        />
      </section>
    </article>

    <!--        -->
    <!-- STEP 2 -->
    <!--        -->
    <article v-show="currentStep === 2" class="column-span-4">
      <p
        class="-ntb column-span-4"
        style="white-space: nowrap; color: var(--info)"
      >
        {{ taskTitle }}
      </p>

      <div class="column-span-4">
        <p class="-xstb column-span-1">Related Element</p>
        <select
          ref="relatedElementRef"
          class="column-span-3 -xstb"
          @change="setRelatedElement('relatedElementRef')"
          @blur="setRelatedElement('relatedElementRef')"
        >
          <option selected class="-xstb">
            {{ relatedElementDefaultValue }}
          </option>
          <option class="-xstb">Option 1</option>
          <option class="-xstb">Option 2</option>
        </select>
      </div>

      <div class="column-span-4">
        <p class="-xstb column-span-1">Related Deliverable</p>
        <select
          ref="relatedDelivRef"
          class="column-span-3 -xstb"
          @change="setRelatedDeliv('relatedDelivRef')"
          @blur="setRelatedDeliv('relatedDelivRef')"
        >
          <option selected class="-xstb">
            {{ relatedDelivDefaultValue }}
          </option>
          <option class="-xstb">Opcao 1</option>
          <option class="-xstb">Opcao 2</option>
        </select>
      </div>
      <hr class="column-span-4" />
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
            :state="'primary'"
            :title="'Next Step'"
            @click="currentStep++"
          />
        </div>
      </section>
    </article>

    <!--        -->
    <!-- STEP 3 -->
    <!--        -->
    <article v-show="currentStep === 3" class="column-span-4">
      <p class="-ntb column-span-4">Summary</p>

      <section class="summary-container">
        <div class="summary-item" v-if="taskTitle">
          <p class="-xstb column-span-1">Task Title:</p>
          <p class="-str column-span-2">{{ taskTitle }}</p>
        </div>
        <div class="summary-item" v-if="assignedTo">
          <p class="-xstb column-span-1">Assigned To:</p>
          <p class="-str column-span-2">{{ assignedTo }}</p>
        </div>
        <div class="summary-item" v-if="exchangeIR">
          <p class="-xstb column-span-1">Exchange Information Requirements:</p>
          <p class="-str column-span-2">{{ exchangeIR }}</p>
        </div>
        <div class="summary-item" v-if="deadline">
          <p class="-xstb column-span-1">Deadline:</p>
          <p class="-str column-span-2">Due on {{ deadline }}</p>
        </div>
        <div class="summary-item" v-if="relatedElement">
          <p class="-xstb column-span-1">Related to Element:</p>
          <p class="-str column-span-2">{{ relatedElement }}</p>
        </div>
        <div class="summary-item" v-if="relatedDeliv">
          <p class="-xstb column-span-1">Related to Deliverable:</p>
          <p class="-str column-span-2">{{ relatedDeliv }}</p>
        </div>
      </section>

      <hr class="column-span-4" />

      <div class="column-span-4">
        <div class="column-span-1 flex-column">
          <p class="-xstb">Add a note</p>
          <p class="-xstr">(Optional)</p>
        </div>

        <div class="column-span-3">
          <textarea
            rows="4"
            cols="50"
            maxlength="255"
            v-model="notes"
            ref="descRef"
            class="-xstb"
          ></textarea>
          <p class="-xstr" style="color: var(--gray3); text-align: right">
            {{ remainingChars }} characters left
          </p>
        </div>
      </div>
      <hr class="column-span-4" />

      <section class="btn-wrapper-step2">
        <div class="btn-previous">
          <Button
            :state="'secondary'"
            :title="'Previous Step'"
            @click="previousStep"
          />
        </div>

        <div class="main-btns-wrapper">
          <Button :state="'primary'" :title="'Submit'" @click="submit" />
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
      //FORM
      taskTitle: "",
      assignedTo: null,
      exchangeIR: "",
      deadline: "",
      relatedElement: "",
      relatedDeliv: "",
      notes: "",
      //MISC
      agents: [
        { id: 1, title: "Agent 1" },
        { id: 2, title: "Agent 2" },
        { id: 3, title: "Agent 3" },
      ],
      dropdownInitValue: "Select an Agent",
      relatedElementDefaultValue: "Select an element",
      relatedDelivDefaultValue: "Select a deliverable",
      currentStep: 1,
    };
  },
  methods: {
    submit() {
      //RUN API CODE HERE
      this.$emit("closeModal");
    },
    nextStep(ref) {
      const elValidation = this.validateEl(this.taskTitle);
      if (!elValidation) {
        const domEl = this.$refs[ref];
        addErrInputText(domEl);
        return;
      }

      const lastStep = 3;
      if (this.currentStep === lastStep) return; //just in case, probably unnecessary
      this.currentStep++;
    },
    previousStep() {
      const firstStep = 1;
      if (this.currentStep === firstStep) return; //just in case, probably unnecessary
      this.currentStep--;
    },

    setAssignedTo(ref) {
      const value = this.$refs[ref].value.trim();
      value === this.dropdownInitValue
        ? (this.assignedTo = "")
        : (this.assignedTo = value);
      console.log(this.assignedTo);
    },
    setDeadline(ref) {
      const value = this.$refs[ref].value.trim();
      this.deadline = value;
      console.log(this.deadline);
    },
    setRelatedElement(ref) {
      const value = this.$refs[ref].value.trim();

      value === this.relatedElementDefaultValue
        ? (this.relatedElement = "")
        : (this.relatedElement = value);

      console.log(this.relatedElement);
    },
    setRelatedDeliv(ref) {
      const value = this.$refs[ref].value.trim();

      value === this.relatedDelivDefaultValue
        ? (this.relatedDeliv = "")
        : (this.relatedDeliv = value);

      console.log(this.relatedDeliv);
    },

    validateEl(stringToValidate) {
      return stringToValidate.trim() ? true : false;
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
      /***                          ***/
      /***MAYBE USE THOS ON DEADLINE***/
      /***                          ***/
      if (!this.customAgent) return;
      else {
        const el = this.$refs[ref];
        this.$nextTick(() => el.focus());
      }
    },
  },
  computed: {
    remainingChars() {
      let maxChars = 255;
      return maxChars - this.notes.length;
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
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(12, 1fr); */
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
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  grid-column: 1 / span 4;
  justify-self: end;
  padding-top: 8px;
}
.btn-wrapper-step2 {
  grid-column: span 4;
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.btn-previous {
  scale: 0.8;
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
.summary-container {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.summary-item {
  grid-column: span 4;
  padding-inline: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
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
input[type="date"],
select,
option,
.users-list,
textarea {
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
input[type="date"],
select,
textarea {
  width: 100%;
}
textarea {
  resize: none;
  height: 70px;
}
span {
  color: var(--error);
}
/**EFFECTS **/
input[type="text"]:focus,
input[type="date"]:focus,
select:focus,
option:focus,
textarea:focus {
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

  .btn-wrapper-step2 {
    flex-direction: column-reverse;
  }
  .step-number {
    display: none;
  }
  .steps-wrapper {
    justify-content: space-between;
  }
}
@media screen and (max-width: 454px) {
  .main-btns-wrapper {
    flex-direction: column-reverse;
  }
  .error-msg {
    white-space: normal;
  }
  .step-number {
    display: flex;
  }
  .step p:last-child {
    display: none;
  }
}
</style>