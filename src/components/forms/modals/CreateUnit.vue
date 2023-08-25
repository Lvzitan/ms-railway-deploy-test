<template>
  <main class="form-container">
    <p class="-xltb title">Create New Unit</p>
    <div class="column-span-4 flex-column">
      <p class="-ntb">Unit Info</p>
      <p class="-xstr" style="color: var(--gray3)">Input details here</p>
      <hr style="margin-top: 20px" />
    </div>
    <div class="column-span-4">
      <p class="-xstb column-span-1">
        Unit Reference <span title="Required field">*</span>
      </p>

      <div class="column-span-2">
        <input
          type="text"
          v-model="ref"
          ref="refRef"
          class="-xstb"
          @blur="quickCheck(ref, 'refRef')"
        />
        <p class="-xstb error-msg">This field is required!</p>
      </div>
      <hr class="column-span-4" />
    </div>

    <div class="column-span-4">
      <p class="-xstb column-span-1">
        Unit Title <span title="Required field">*</span>
      </p>
      <div class="column-span-2">
        <input
          type="text"
          v-model="title"
          ref="titleRef"
          class="-xstb"
          @blur="quickCheck(title, 'titleRef')"
        />
        <p class="-xstb error-msg">This field is required!</p>
      </div>
    </div>

    <div class="column-span-4" style="grid-row: span 2">
      <div class="column-span-1">
        <p class="-xstb">Description</p>
        <p class="-xstr" style="color: var(--gray3)">
          Write a short description
        </p>
      </div>
      <div class="column-span-2 flex-column">
        <textarea
          rows="4"
          cols="50"
          maxlength="255"
          v-model="description"
          ref="descRef"
          class="column-span-2 -xstb"
        ></textarea>
        <p class="-xstr" style="color: var(--gray3)">
          {{ remainingChars }} characters left
        </p>
      </div>

      <hr class="column-span-4" style="margin-top: 20px" />
    </div>

    <section class="form-btns-group">
      <div class="form-btn-cancel" @click="$emit('closeModal')">
        <p class="-xstb">Cancel</p>
      </div>
      <div class="form-btn-create" @click="handleClick(['refRef', 'titleRef'])">
        <p class="-xstb">Create</p>
      </div>
    </section>
  </main>
</template>

<script>
import { validateForm } from "../../../helpers/formValidations";
import { removeErrInputText } from "../../../helpers/styleToggler";
export default {
  data() {
    return {
      ref: "",
      title: "",
      description: "",
    };
  },
  methods: {
    handleClick(refsArray) {
      //prepare info for validateForm()
      const infoToValidate = [this.ref, this.title];
      let arrayOfElements = [];
      refsArray.forEach((element) => {
        arrayOfElements.push(this.$refs[element]);
      });

      if (!this.validateForm(arrayOfElements, infoToValidate)) return;

      console.log("validated, send request"); //write api code here
    },
    validateForm(arrayOfElements, infoToValidate) {
      const result = validateForm(arrayOfElements, infoToValidate);
      return result;
    },
    quickCheck(value, inputRef) {
      if (!value.length) return;
      removeErrInputText(this.$refs[inputRef]);
    },
  },
  computed: {
    remainingChars() {
      let maxChars = 255;
      return maxChars - this.description.length;
    },
  },
};
</script>

<style scoped>
.form-container {
  height: 100%;
  width: 100%;
  padding-block: 16px;
  padding-inline: 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 4px;
}
.title {
  grid-column: span 4;
}
.column-span-4 {
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
.flex-column {
  display: flex;
  flex-direction: column;
}
span {
  color: var(--error);
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
textarea {
  width: 100%;
}
select {
  width: 65%;
}
textarea {
  resize: none;
  height: 110px;
}
hr {
  border: none;
  border-top: 1px solid var(--gray6);
  margin-block: 8px;
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
@media screen and (max-width: 719px) {
  .column-span-3,
  .column-span-2,
  .column-span-1 {
    grid-column: span 4;
  }
  select {
    width: 100%;
  }
  hr {
    border: none;
  }
}
</style>