<template>
  <main class="column-span-3 grid-wrapper">
    <div class="column-span-3 grid-wrapper">
      <p class="-xstb column-span-1">First name</p>
      <input type="text" v-model="firstName" class="-xstr column-span-1" />
    </div>
    <div class="column-span-3 grid-wrapper">
      <p class="-xstb column-span-1">Last name</p>
      <input type="text" v-model="lastName" class="-xstr column-span-1" />
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column">
        <p class="-xstb">Your photo</p>
        <p class="-xstr">This will be displayed on your profile.</p>
      </div>
      <div class="column-span-1 flex justify-space-between user-photo-wrapper">
        <DynaBadge
          :picturePath="require('../../../assets/temp/admin.png')"
          :firstName="'Francisco'"
          :lastName="'Reis'"
          style="scale: 1.3"
        />
        <div class="flex align-start gap16 photo-controls">
          <p class="-xstb">Delete</p>
          <p class="-xstb">Update</p>
        </div>
      </div>
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Your bio</p>
        <p class="-xstr">Write a short introduction.</p>
      </div>
      <div class="column-span-1 flex-column width-full align-start gap4">
        <textarea
          maxlength="255"
          placeholder="Start typing here..."
          v-model="bio"
          class="-xstr column-span-1"
        ></textarea>
        <p class="-xstr" style="color: var(--gray3)">
          {{ remainingChars }} characters left
        </p>
      </div>
    </div>
    <div class="column-span-3 grid-wrapper">
      <p class="-xstb column-span-1">Country</p>
      <div class="column-span-1 flex align-center justify-space-between gap8">
        <img
          :src="selectedCountry.flag"
          :alt="selectedCountry.name"
          class="flag"
        />
        <select @change="setSelectedCountry()" ref="countryRef" class="-xstr">
          <option selected disabled hidden>{{ selectedCountry.name }}</option>
          <option v-for="country in countriesList" :key="country">
            {{ country.name }}
          </option>
        </select>
      </div>
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column">
        <p class="-xstb">Job title</p>
        <p class="-xstr">This will be displayed on your profile.</p>
      </div>
      <input type="text" v-model="jobTitle" class="-xstr column-span-1" />
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column">
        <p class="-xstb">Alternative contact email</p>
        <p class="-xstr">
          Enter an alternative email if you'd like to be contacted via a
          different email.
        </p>
      </div>
      <input
        type="text"
        class="-xstr column-span-1"
        placeholder="you@example.com"
      />
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 flex justify-end gap16 btns-wrapper">
      <div class="btn" @click="teste"><p class="-xstb">Cancel</p></div>
      <div class="btn"><p class="-xstb">Save</p></div>
    </div>
  </main>
</template>

<script>
import DynaBadge from "../../../components/utils/DynaBadge.vue";
import getCountries from "../../../services/requests/getters/getCountries";
export default {
  components: {
    DynaBadge,
  },
  data() {
    return {
      firstName: "Andrew",
      lastName: "Armstrong",
      bio: "",
      jobTitle: "Project Coordinator",
      selectedCountry: {
        name: "United Kingdom",
        flag: "https://flagcdn.com/gb.svg",
      },
      countriesList: null,
      //REFS
      countryRef: "countryRef",
    };
  },
  async created() {
    this.countriesList = await getCountries();
  },
  methods: {
    setSelectedCountry() {
      const domElement = this.$refs.countryRef.value.trim();
      console.log(domElement);
      this.selectedCountry = this.countriesList.find(
        (country) => country.name === domElement
      );
    },
  },
  computed: {
    remainingChars() {
      let maxChars = 255;
      return maxChars - this.bio.length;
    },
  },
};
</script>

<style scoped>
.grid-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.column-span-3 {
  grid-column: span 3;
  width: 100%;
  justify-items: start;
}
.column-span-2 {
  grid-column: span 2;
  width: 100%;
  justify-items: start;
}
.column-span-1 {
  grid-column: span 1;
  width: 100%;
  text-align: start;
}
.photo-controls p:first-child {
  cursor: pointer;
  color: var(--gray2);
}
.photo-controls p:last-child {
  cursor: pointer;
  color: var(--secondary);
}
.photo-controls p:first-child:hover {
  color: var(--error);
}
.photo-controls p:last-child:hover {
  color: var(--info);
}

.flag {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  outline: 1px solid var(--gray5);
}
.user-photo-wrapper {
  padding-inline: 8px;
  padding-block: 4px;
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
  height: 36px;
}
input,
select,
textarea {
  width: 100%;
}

textarea {
  resize: none;
  height: 110px;
}
input[type="text"]:focus,
select:focus,
option:focus,
textarea:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}
.btn {
  cursor: pointer;
  border-radius: 4px;
  padding-block: 8px;
  padding-inline: 16px;
}
.btn:first-child {
  border: 1px solid var(--gray5);
}
.btn:last-child {
  background: var(--secondary);
  color: var(--white1);
  transition: 500ms ease;
}
.btn:first-child:hover {
  background: var(--gray6);
}
.btn:last-child:hover {
  box-shadow: inset 0 -50px 0 0 var(--success);
}

@media screen and (max-width: 1022px) {
  .column-span-2 {
    grid-column: span 3;
  }
  .column-span-1 {
    grid-column: span 3;
  }
}
@media screen and (max-width: 719px) {
  .user-photo-wrapper {
    justify-content: flex-start;
    gap: 40px;
  }
}
</style>