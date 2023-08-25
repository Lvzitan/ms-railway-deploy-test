<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-2" style="white-space: none">
      Add New Deliverable
    </h1>
    <section class="column-span-2 steps-wrapper">
      <section class="step step-active">
        <p class="-stb step-number step-number-active">1</p>
        <p class="-stb">Define Deliverable</p>
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
    <hr class="column-span-2" />

    <article v-show="currentStep === 1" class="column-span-2">
      <div class="column-span-1 field">
        <p class="-xstb">Reference <span title="Mandatory Field">*</span></p>
        <div class="field">
          <input
            ref="refRef"
            type="text"
            v-model="ref"
            @focus="removeErrFromEl(['refRef'])"
            class="-str"
          />
          <p class="-xstb error-msg">Please enter a reference!</p>
        </div>
      </div>

      <div class="column-span-1 field">
        <p class="-xstb">
          Deliverable Title <span title="Mandatory Field">*</span>
        </p>
        <div class="field">
          <input
            ref="delivTitleRef"
            type="text"
            v-model="delivTitle"
            @focus="removeErrFromEl(['delivTitleRef'])"
            class="-str"
          />
          <p class="-xstb error-msg">Please enter a title!</p>
        </div>
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
      <div class="column-span-1 field">
        <p class="-xstb">Deliverable Type</p>
        <section class="flex-item">
          <div
            @click="setDelivType('Single Document')"
            class="deliv-type"
            :class="{ selected: delivType === 'Single Document' }"
          >
            <i class="i-single-file"></i>
            <p class="-str">Single Document</p>
          </div>
          <div
            @click="setDelivType('Multiple Output')"
            class="deliv-type"
            :class="{ selected: delivType === 'Multiple Output' }"
          >
            <i class="i-multiple-files"></i>
            <p class="-str">Multiple Output</p>
          </div>
        </section>
      </div>

      <hr class="column-span-2" />
      <section class="column-span-1 btn-wrapper">
        <Button
          :state="'primary'"
          :title="'Next Step'"
          @click="nextStep(['refRef', 'delivTitleRef'])"
        />
      </section>
    </article>

    <!--        -->
    <!-- STEP 2 -->
    <!--        -->
    <article v-show="currentStep === 2" class="column-span-2">
      <p
        class="-ntb column-span-2"
        style="white-space: nowrap; color: var(--info)"
      >
        {{ ref }} - {{ delivTitle }}
      </p>

      <div class="column-span-1 flex-column">
        <p class="-xstb column-span-1">
          Originator <span title="Mandatory Field">*</span>
        </p>
        <input
          ref="originatorInputRef"
          @keyup="setSearchString(originatorInputRef)"
          @focus="[getSearchResults(), setCustomAdd(addOriginator)]"
          type="text"
          placeholder="Click to start searching"
          class="-xstr"
        />
      </div>
      <div class="column-span-1 flex-column">
        <p class="-xstb column-span-1">Contributors</p>
        <input
          ref="contributorsInputRef"
          @keyup="setSearchString(contributorsInputRef)"
          @focus="[getSearchResults(), setCustomAdd(addContributors)]"
          type="text"
          placeholder="Click to start searching"
          class="-xstr"
        />
      </div>
      <!-- <div class="column-span-1 flex-column">
        <p class="-xstb column-span-1">Recipient</p>
        <div
          ref="recipientInputRef"
          @click="[getRecipientForm(), setCustomAdd(addRecipient)]"
          class="create-recipient"
        >
          <p class="-xstr">Click to create a recipient</p>
        </div>
      </div> -->

      <!-- *** SEARCH RESULTS ARE HERE *** -->

      <section
        ref="searchResultsRef"
        v-if="searchResults"
        class="column-span-2 search-result-wrapper"
      >
        <div
          v-for="res in searchResults"
          :key="res"
          class="search-result-item"
          :title="[res.isSelected ? 'Click to Dismiss' : 'Click to Select']"
          @click="[(res.isSelected = !res.isSelected), setStagedItems(res)]"
          :class="{ selected: res.isSelected }"
        >
          <DynaBadge
            :firstName="res.firstName"
            :lastName="res.lastName"
            :picturePath="res.picturePath"
          />
          <div>
            <p class="-xstb">{{ res.agent_title }}</p>
            <p class="-xstr">{{ res.firstName }} {{ res.lastName }}</p>
          </div>
        </div>
      </section>
      <!-- ***          ***            *** -->

      <!-- *** RECIPIENT FORM *** -->
      <!-- <section v-if="showRecipientForm" class="column-span-2">
        <hr class="column-span-2" />
        <p class="-str">Please input your recipient's information.</p>
        <div class="column-span-2">
          <p
            class="-xstb column-span-1"
            style="text-align: right; align-self: center"
          >
            Name:
          </p>
          <input
            type="text"
            class="-xstr column-span-1"
            v-model.trim="recipient.name"
          />
        </div>
        <div class="column-span-2">
          <p
            class="-xstb column-span-1"
            style="text-align: right; align-self: center"
          >
            Email:
          </p>
          <input
            type="text"
            class="-xstr column-span-1"
            v-model.trim="recipient.email"
          />
        </div>
      </section> -->
      <!-- ***       ***        *** -->

      <!-- *** STAGED INFO HERE *** -->
      <section
        v-show="
          (stagedOriginators.length && !searchResults && !showRecipientForm) ||
          (stagedContributors.length && !searchResults && !showRecipientForm) ||
          (stagedRecipients.length && !searchResults && !showRecipientForm)
        "
        class="column-span-2"
      >
        <section
          v-show="stagedOriginators.length && !searchResults"
          class="column-span-1 staged-items-wrapper"
          style="grid-column: 1 / span 1"
        >
          <div
            v-for="(item, index) in stagedOriginators"
            :key="item"
            class="staged-item"
            @click="removeItem(index, addOriginator)"
          >
            <p class="-xstb">
              {{ item.agent_title }}
            </p>
            <p class="-xstr">{{ item.firstName }} {{ item.lastName }}</p>
          </div>
        </section>

        <section
          v-show="stagedContributors.length && !searchResults"
          class="column-span-1 staged-items-wrapper"
          style="grid-column: 2 / span 1"
        >
          <div
            v-for="(item, index) in stagedContributors"
            :key="item"
            class="staged-item"
            @click="removeItem(index, addContributors)"
          >
            <p class="-xstb">
              {{ item.agent_title }}
            </p>
            <p class="-xstr">{{ item.firstName }} {{ item.lastName }}</p>
          </div>
        </section>

        <section
          v-show="stagedRecipients.length && !searchResults"
          class="column-span-1 staged-items-wrapper"
          style="grid-column: 3 / span 1"
        >
          <div
            v-for="(item, index) in stagedRecipients"
            :key="item"
            @click="removeItem(index, addRecipient)"
            class="staged-item"
          >
            <p class="-xstb">
              {{ item.name }}
            </p>
            <p class="-xstr">{{ item.email }}</p>
          </div>
        </section>
        <p class="column-span-2 -xstr warnMsg">
          Click on an item to remove it from the list.
        </p>
      </section>
      <!-- ***                  *** -->

      <section
        v-if="searchResults || showRecipientForm"
        class="column-span-2"
        style="display: flex; width: 100%; justify-content: space-between"
      >
        <div class="btn-previous">
          <Button
            :state="'secondary'"
            :title="'Close Search'"
            @click="resetSearch"
          />
        </div>
        <div class="main-btns-wrapper">
          <Button
            :state="'primary'"
            :title="customAdd"
            @click="commitItems(customAdd)"
          />
        </div>
      </section>

      <hr class="column-span-2" />

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
            @click="nextStep([originatorInputRef])"
          />
        </div>
      </section>
    </article>

    <!--        -->
    <!-- STEP 3 -->
    <!--        -->
    <article v-show="currentStep === 3" class="column-span-2">
      <p class="-ntb column-span-2">Summary</p>

      <section class="summary-container">
        <div class="summary-item" v-if="ref">
          <p class="-xstb column-span-1">Reference:</p>
          <p class="-xstr column-span-1">{{ ref }}</p>
        </div>
        <div class="summary-item" v-if="delivTitle">
          <p class="-xstb column-span-1">Task Title:</p>
          <p class="-xstr column-span-1">{{ delivTitle }}</p>
        </div>
        <div class="summary-item" v-if="deadline">
          <p class="-xstb column-span-1">Deadline:</p>
          <p class="-xstr column-span-1">Due on {{ deadline }}</p>
        </div>
        <div class="summary-item" v-if="delivType">
          <p class="-xstb column-span-1">Deliverable Type:</p>
          <p class="-xstr column-span-1">{{ delivType }}</p>
        </div>
        <div class="summary-item" v-if="stagedOriginators.length">
          <p class="-xstb column-span-1" v-if="stagedOriginators.length === 1">
            Originator:
          </p>
          <p class="-xstb column-span-1" v-else>Originators:</p>
          <div class="summary-column-span-1">
            <div v-for="item in stagedOriginators" :key="item">
              <p class="-xstb">
                {{ item.agent_title }}
              </p>
              <p class="-xstr">{{ item.firstName }} {{ item.lastName }}</p>
            </div>
          </div>
        </div>
        <div class="summary-item" v-if="stagedContributors.length">
          <p class="-xstb column-span-1" v-if="stagedContributors.length === 1">
            Contributor:
          </p>
          <p class="-xstb column-span-1" v-else>Contributors:</p>
          <div class="summary-column-span-1">
            <div v-for="item in stagedContributors" :key="item">
              <p class="-xstb">{{ item.agent_title }}</p>
              <p class="-xstr">{{ item.firstName }} {{ item.lastName }}</p>
            </div>
          </div>
        </div>
        <div class="summary-item" v-if="stagedRecipients.length">
          <p class="-xstb column-span-1" v-if="stagedRecipients.length === 1">
            Recipient:
          </p>
          <p class="-xstb column-span-1" v-else>Recipients:</p>
          <div class="summary-column-span-1">
            <div v-for="item in stagedRecipients" :key="item">
              <p class="-xstb">{{ item.name }}</p>
              <p class="-xstr">{{ item.email }}</p>
            </div>
          </div>
        </div>
      </section>

      <hr class="column-span-2" />

      <div class="column-span-2">
        <div class="column-span-1 flex-column">
          <p class="-xstb">Add a note</p>
          <p class="-xstr">(Optional)</p>
        </div>

        <div class="column-span-1 field">
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
      <hr class="column-span-2" />

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
      ref: "",
      delivTitle: "",
      deadline: "",
      delivType: null,
      exchangeIR: "",
      relatedElement: "",
      relatedDeliv: "",
      notes: "",
      recipient: {
        name: "",
        email: "",
      },
      //LOGIC
      stagedItems: [],
      stagedOriginators: [],
      stagedContributors: [],
      stagedRecipients: [],
      //MISC
      currentStep: 1,
      customAdd: "",
      showRecipientForm: false,
      addOriginator: "Add Originator",
      addContributors: "Add Contributors",
      addRecipient: "Add Recipient",
      //SEARCHES
      searchString: "",
      searchResults: null,
      //REFS
      originatorInputRef: "originatorInputRef",
      contributorsInputRef: "contributorsInputRef",
      recipientInputRef: "recipientInputRef",
      //TEMP
      usersSearchRes: [
        {
          id: 1,
          agent_title: "Architect",
          firstName: "Rogan",
          lastName: "Lancaster",
          email: "emailex@gmail.com",
        },
        {
          id: 2,
          agent_title: "Contractor",
          firstName: "Rosie",
          lastName: "Fernandez",
          email: "ex@gmail.com",
        },
        {
          id: 3,
          agent_title: "Civil Engineer",
          firstName: "Rylan",
          lastName: "Philip",
          email: "teste@gmail.com",
        },
      ],
    };
  },
  methods: {
    submit() {
      //RUN API CODE HERE
      this.$emit("closeModal");
    },
    nextStep(refsArray) {
      const validation = this.validateFields(refsArray);
      if (!validation) return;

      const lastStep = 3;
      if (this.currentStep === lastStep) return; //just in case, probably unnecessary
      this.currentStep++;
    },
    previousStep() {
      const firstStep = 1;
      if (this.currentStep === firstStep) return; //just in case, probably unnecessary
      this.currentStep--;
    },
    getSearchResults() {
      this.resetSearchBoxes();
      this.resetStagedItems();

      //api code in here
      this.searchResults = JSON.parse(JSON.stringify(this.usersSearchRes));
    },
    getRecipientForm() {
      this.resetSearch();
      if (!this.showRecipientForm) this.showRecipientForm = true;
    },
    setDelivType(value) {
      this.delivType === value
        ? (this.delivType = "")
        : (this.delivType = value);
    },
    setDeadline(ref) {
      const value = this.$refs[ref].value.trim();
      this.deadline = value;
      console.log(this.deadline);
    },
    setSearchString(ref) {
      this.searchString = this.$refs[ref].value.trim();
      console.log(this.searchString);
    },
    setCustomAdd(btnTitle) {
      this.customAdd = btnTitle;
    },
    setStagedItems(userInfo) {
      if (userInfo === "") return; //just in case

      this.stagedItems.some((item) => item.id === userInfo.id)
        ? (this.stagedItems = this.stagedItems.filter(
            (itemToRemove) => userInfo !== itemToRemove
          ))
        : this.stagedItems.push(userInfo);

      // console.log(this.stagedItems);
    },
    resetStagedItems() {
      this.stagedItems = [];
    },
    commitItems(scope) {
      if (scope === this.addOriginator) {
        this.stagedItems.forEach((item) => {
          this.stagedOriginators.push(item);
        });
        console.log(this.stagedOriginators);
      }
      if (scope === this.addContributors) {
        this.stagedItems.forEach((item) => {
          this.stagedContributors.push(item);
        });
        console.log(this.stagedContributors);
      }
      if (scope === this.addRecipient) {
        if (this.recipient.name === "" && this.recipient.email === "") return; //trolhice-refactor assim que possivel
        this.stagedRecipients.push(this.recipient);
        this.resetRecipient();
      }

      this.resetSearch();
    },
    removeItem(indexToRemove, scope) {
      if (scope === this.addOriginator) {
        this.stagedOriginators.splice(indexToRemove, 1);
      }
      if (scope === this.addContributors) {
        this.stagedContributors.splice(indexToRemove, 1);
      }
      if (scope === this.addRecipient) {
        this.stagedRecipients.splice(indexToRemove, 1);
      }
    },
    validateFields(refsArray) {
      const elsToValidate = [this.ref, this.delivTitle];
      const numberOfFieldsToValidate = 2;
      let fieldsValidated = 0;

      elsToValidate.forEach((el, index) => {
        const elValidation = this.validateEl(el);
        const domEl = this.$refs[refsArray[index]];

        elValidation ? fieldsValidated++ : addErrInputText(domEl);
      });

      return numberOfFieldsToValidate === fieldsValidated;
    },

    validateEl(stringToValidate) {
      return stringToValidate.trim() ? true : false;
    },
    resetSearchBoxes() {
      if (this.showRecipientForm) this.showRecipientForm = false;
      if (!this.searchString) return;

      const domElsToReset = [
        this.originatorInputRef,
        this.contributorsInputRef,
      ];

      domElsToReset.forEach((el) => {
        let domElValue = this.$refs[el];

        if (domElValue.value.trim() === this.searchString) {
          domElValue.value = "";
          this.searchString = "";
        } else return;
      });
    },
    resetSearch() {
      this.customAdd = "";
      this.searchString = "";
      this.searchResults = null;
      this.showRecipientForm = false;
      this.resetStagedItems();
    },
    resetRecipient() {
      this.recipient = {
        name: "",
        email: "",
      };
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
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: repeat(12, 1fr); */
  padding-inline: 32px;
  padding-block: 16px;
  gap: 12px;
}
.column-span-2 {
  grid-column: span 2;
  align-self: start;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
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
.flex-item,
.search-result-item {
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
  grid-column: 1 / span 2;
  justify-self: end;
  padding-top: 8px;
}
.btn-wrapper-step2 {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.btn-previous {
  scale: 0.8;
}
.user-li {
  padding-block: 8px;
  padding-inline: 16px;
  border-radius: 4px;
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  gap: 8px;
}
.user-li:hover {
  background: var(--success-light-transp);
}
.summary-container {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 300px;
  overflow: auto;
}
.summary-item {
  grid-column: span 2;
  padding-inline: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.summary-column-span-1 {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.main-btns-wrapper {
  display: flex;
  gap: 8px;
}
.search-result-wrapper {
  height: auto;
  max-height: 350px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  user-select: none;
  flex-wrap: wrap;
}
.search-result-item {
  background: var(--focus3);
  padding-block: 4px;
  padding-inline: 8px;
  border-radius: 4px;
}
.search-result-item:hover {
  background: var(--secondary-highlight);
  cursor: pointer;
}

.staged-item {
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-bottom: 1px solid var(--gray6);
}
.staged-item:last-child {
  border-bottom: none;
}
.staged-item:hover {
  background: rgba(255, 0, 0, 0.05);
  cursor: pointer;
  border-radius: 4px;
  border-color: transparent;
}
label {
  user-select: none;
  cursor: pointer !important;
}
.flex-column {
  gap: 4px;
}

.create-recipient {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transition: 150ms ease;
}
.create-recipient:hover {
  background: var(--focus3);
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}
.staged-items-wrapper {
  max-height: 350px;
  overflow: auto;
}
input[type="text"],
input[type="date"],
.create-recipient,
select,
option,
.deliv-type,
.search-result-wrapper,
.staged-items-wrapper,
textarea {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  padding: 8px;
  outline: none;
}
input[type="text"],
input[type="date"],
.deliv-type,
.create-recipient,
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
.warnMsg {
  color: var(--warn);
}
.-xltb {
  white-space: nowrap;
}
.step,
.step-number {
  transition: all 200ms ease-in-out !important;
}
.deliv-type {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  box-shadow: var(--gray5) 0 0 0 1px;
}
.deliv-type p {
  padding-right: 8px;
}
.deliv-type:hover {
  background: var(--gray6);
  border: none;
}
.error-msg {
  white-space: nowrap;
}
.selected,
.selected:hover {
  background: var(--success-light);
  box-shadow: var(--success) 0 0 0 1px;
}
.selected:hover {
  filter: brightness(105%);
}
i {
  scale: 0.6;
}
/* *** QUERIES *** */
@media screen and (max-width: 599px) {
  .column-span-2 {
    grid-column: span 2;
    width: 100%;
  }
  .column-span-1 {
    grid-column: span 2;
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
  .staged-items-wrapper {
    display: none;
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