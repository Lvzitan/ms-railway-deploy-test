<template>
  <main class="form-container">
    <h1 class="-xxxltb column-span-4 title">
      Register your Organization profile
    </h1>
    <p class="-str column-span-4" style="color: var(--gray3)">
      Our team will validate your organization's profile.
    </p>
    <div class="flex-column column-span-2">
      <p class="-xstb">Organization Name <span>*</span></p>
      <input
        type="text"
        placeholder="Your organization name"
        v-model="name"
        ref="nameRef"
        @blur="validateString(name, 'nameRef')"
        class="-str"
      />
      <p class="-xstb error-msg">This field is required!</p>
    </div>
    <div class="column-span-2 dropzone">
      <DropZone
        :type="'single'"
        :title="'Drag and drop your logo'"
        @commitFiles="commitFile"
      />
    </div>
    <div class="flex-column column-span-2">
      <p class="-xstb">Organization Registration Number</p>
      <input
        type="text"
        placeholder="00000-0000"
        v-model="regNumber"
        ref="regNumberRef"
        @blur="validateString(regNumber, 'regNumberRef')"
        class="-str"
      />
      <p class="-xstb error-msg">This field is required!</p>
    </div>
    <div class="flex-column column-span-2">
      <p class="-xstb">Email <span>*</span></p>
      <input
        type="text"
        placeholder="you@organization.com"
        v-model="email"
        ref="emailRef"
        @blur="validateString(email, 'emailRef')"
        class="-str"
      />
      <p class="-xstb error-msg">This field is required!</p>
    </div>
    <div class="flex-column column-span-2">
      <p class="-xstb">Website</p>
      <input
        type="text"
        placeholder="www.yourorganization.com"
        v-model="website"
        ref="websiteRef"
        class="-str"
      />
    </div>
    <div class="flex-column column-span-2">
      <p class="-xstb">Phone number</p>
      <input
        type="text"
        placeholder="+1 (555) 00-0000"
        v-model="contact"
        ref="contactRef"
        class="-str"
      />
    </div>
    <div class="flex-column column-span-2">
      <p class="-xstb">Organization Size</p>
      <select
        @change="changeDpdownValue('sizeRef')"
        ref="sizeRef"
        class="-str"
        style="color: var(--gray3)"
      >
        <option
          v-for="sizeNumber in organization_size"
          :key="sizeNumber"
          class="-str"
        >
          {{ sizeNumber }}
        </option>
      </select>
    </div>
    <div class="flex-column column-span-2">
      <p class="-xstb">Address</p>
      <input
        type="text"
        placeholder="Your organization's address"
        v-model="address"
        ref="addressRef"
        class="-str"
      />
    </div>
    <div class="flex-column column-span-2">
      <p class="-xstb">Sector <span>*</span></p>
      <input
        type="text"
        placeholder="Sector of organization"
        v-model="sector"
        ref="sectorRef"
        @blur="validateString(sector, 'sectorRef')"
        class="-str"
      />
      <p class="-xstb error-msg">This field is required!</p>
    </div>
    <div class="flex-column column-span-2" style="grid-row: span 2">
      <p class="-xstb">Areas of Experience</p>
      <textarea
        maxlength="255"
        placeholder="Your organization's expertise"
        v-model="experience"
        ref="experienceRef"
        class="-str"
      ></textarea>
      <p class="-xstr" style="color: var(--gray3)">
        {{ remainingChars }} characters left
      </p>
    </div>
    <div class="flex-column column-span-1">
      <p class="-xstb">Country <span>*</span></p>
      <input
        type="text"
        placeholder="Your organization's country"
        v-model="country"
        ref="countryRef"
        @blur="validateString(country, 'countryRef')"
        class="-str"
      />
      <p class="-xstb error-msg">This field is required!</p>
    </div>
    <div class="flex-column column-span-1">
      <p class="-xstb">City</p>
      <input
        type="text"
        placeholder="Your organization's city"
        v-model="city"
        ref="cityRef"
        class="-str"
      />
    </div>

    <div class="flex-column column-span-2">
      <p class="-xstb">Zip-Code</p>
      <input
        type="text"
        placeholder="0000-000"
        v-model="zipCode"
        ref="zipCodeRef"
        class="-str"
        style="width: calc(50% - 12px)"
      />
    </div>
    <p class="-ntr column-span-3 tip-msg">
      You can reach us anytime via
      <a href="mailto:support@ms4aeco.com">support@ms4aeco.com</a>
    </p>
    <div class="column-span-1">
      <Button
        :title="'Register Organization'"
        :state="'primary'"
        @click="handleClick(['nameRef', 'emailRef', 'sectorRef', 'countryRef'])"
      />
    </div>
  </main>
</template>

<script>
import Button from "../../components/utils/BaseButton.vue";
import DropZone from "../../components/utils/DropZone.vue";
import { validateForm } from "../../helpers/formValidations";
import { removeErrInputText } from "../../helpers/styleToggler";
export default {
  components: {
    Button,
    DropZone,
  },
  data() {
    return {
      name: "",
      regNumber: "",
      email: "",
      contact: "",
      address: "",
      website: "",
      size: "",
      sector: "",
      country: "",
      city: "",
      zipCode: "",
      experience: "",
      file: null,
      //simulated from db
      organization_size: [
        "0 - 10 employees",
        "10 - 50 employees",
        "50 - 250 employees",
        "+ 250 employees",
      ],
    };
  },
  methods: {
    handleClick(refsArray) {
      console.log(this.file);
      //prepare info for validateForm()
      const infoToValidate = [this.name, this.email, this.sector, this.country];
      let arrayOfElements = [];
      refsArray.forEach((element) => {
        arrayOfElements.push(this.$refs[element]);
      });

      if (!this.validateForm(arrayOfElements, infoToValidate)) return;
      //

      console.log("validated, send request"); //write api code here
    },
    commitFile(file) {
      this.file = file;
    },
    validateForm(arrayOfElements, infoToValidate) {
      const result = validateForm(arrayOfElements, infoToValidate);
      return result;
    },
    validateString(value, inputRef) {
      if (!value.length) return;
      removeErrInputText(this.$refs[inputRef]);
    },
    changeDpdownValue(ref) {
      this.size = this.$refs[ref].value.trim();
    },
  },
  computed: {
    remainingChars() {
      let maxChars = 255;
      return maxChars - this.experience.length;
    },
  },
};
</script>

<style scoped>
.form-container {
  padding-block: 32px;
  padding-inline: 64px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  background: var(--white1);
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  overflow: auto;
}
.column-span-4 {
  grid-column: span 4;
}
.column-span-3 {
  grid-column: span 3;
}
.column-span-2 {
  grid-column: span 2;
}
.column-span-1 {
  grid-column: span 1;
}
.dropzone {
  grid-row: span 2;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
input,
select,
option,
textarea {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  padding: 8px;
  outline: none;
}
input,
select {
  height: 38px;
}

input,
textarea,
select {
  width: 100%;
}
textarea {
  resize: none;
  height: 100%;
}
.tip-msg {
  color: var(--gray2);
  align-self: end;
  text-align: left;
}
/**EFFECTS **/
input:focus,
select:focus,
option:focus,
textarea:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}
p {
  user-select: none;
}
span {
  color: var(--error);
}
a {
  color: rgb(89, 0, 255);
  text-decoration: none;
}

@media screen and (max-width: 1365px) {
  .form-container {
    width: 100%;
  }
}

@media screen and (max-width: 1023px) {
  .form-container {
    width: 100%;
  }
  .column-span-3 {
    grid-column: span 4;
  }
  .column-span-2 {
    grid-column: span 4;
  }
  .column-span-1 {
    grid-column: span 4;
  }
  .dropzone {
    height: 160px;
  }
}
</style>