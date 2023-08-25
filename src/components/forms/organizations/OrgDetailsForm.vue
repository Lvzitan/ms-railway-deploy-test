
  <template>
  <main class="grid-wrapper">
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <p class="-xstb column-span-1">Organization name</p>
      <input type="text" v-model="orgName" class="-xstr column-span-1" />
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column">
        <p class="-xstb">Company logo</p>
        <p class="-xstr">This will be displayed on your company profile.</p>
      </div>
      <div class="column-span-1 flex justify-space-between user-photo-wrapper">
        <DynaBadge
          :picturePath="require('../../../assets/temp/orgs/tns.png')"
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
        <p class="-xstb">About</p>
        <p class="-xstr">Write a short description.</p>
      </div>
      <div class="column-span-1 flex-column width-full align-start gap4">
        <textarea
          maxlength="255"
          placeholder="Start typing here..."
          v-model="description"
          class="-xstr column-span-1"
        ></textarea>
        <p class="-xstr" style="color: var(--gray3)">
          {{ remainingDescriptionChars }} characters left
        </p>
      </div>
    </div>
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Country</p>
        <p class="-xstr">Headquarters</p>
      </div>
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
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Website</p>
        <p class="-xstr">Link your website here</p>
      </div>
      <input
        type="text"
        placeholder="www.catalog.com"
        v-model="website"
        class="-xstr column-span-1"
      />
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Company registration number</p>
        <p class="-xstr">
          Need help? Reach us at
          <a href="mailto:support@ms4aeco.com">support@ms4aeco.com</a>
        </p>
      </div>
      <input
        type="text"
        placeholder="000000"
        v-model="registrationNumber"
        maxlength="6"
        class="-xstr column-span-1"
      />
    </div>

    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Organization size</p>
        <p class="-xstr">Choose from the values</p>
      </div>
      <div class="column-span-1">
        <select class="-xstr">
          <option selected disabled hidden>
            Choose according to the size of the organization
          </option>
          <option>0 - 10</option>
          <option>10 - 50</option>
          <option>50 - 250</option>
          <option>+ 250</option>
        </select>
      </div>
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Sector</p>
      </div>
      <input
        type="text"
        placeholder="Ex: Civil Engineering"
        v-model="sector"
        class="-xstr column-span-1"
      />
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Phone number</p>
        <p class="-xstr">Please include the country's code</p>
      </div>
      <input
        type="text"
        placeholder="Ex: +44 7975777666"
        v-model="phoneNumber"
        class="-xstr column-span-1"
      />
    </div>
    <hr class="column-span-3 hr-form" />
    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Areas of experience</p>
        <p class="-xstr">Write a short description.</p>
      </div>
      <div class="column-span-1 flex-column width-full align-start gap4">
        <textarea
          maxlength="255"
          placeholder="Start typing here..."
          v-model="areasOfExperience"
          class="-xstr column-span-1"
        ></textarea>
        <p class="-xstr" style="color: var(--gray3)">
          {{ remainingExperienceChars }} characters left
        </p>
      </div>
    </div>
    <hr class="column-span-3 hr-form" />

    <div class="column-span-3 grid-wrapper">
      <p class="-xstb column-span-1">City</p>
      <input
        type="text"
        placeholder="City"
        v-model="city"
        class="-xstr column-span-1"
      />
    </div>

    <div class="column-span-3 grid-wrapper">
      <div class="column-span-1 flex-column justify-start">
        <p class="-xstb">Address</p>
        <p class="-xstr">You may include the street number here</p>
      </div>
      <input
        type="text"
        placeholder="Organization Address"
        v-model="address"
        class="-xstr column-span-1"
      />
    </div>

    <div class="column-span-3 grid-wrapper">
      <p class="-xstb column-span-1">Zip-Code</p>
      <input
        type="text"
        placeholder="Zip-Code"
        v-model="zipCode"
        class="-xstr column-span-1"
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
      orgName: "TNS",
      description: "",
      website: "",
      companyRegistrationNumber: "",
      organizationSize: "",
      sector: "",
      phoneNumber: "",
      areasOfExperience: "",
      registrationNumber: "",
      address: "",
      city: "",
      zipCode: "",
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
    remainingDescriptionChars() {
      let maxChars = 255;
      return maxChars - this.description.length;
    },
    remainingExperienceChars() {
      let maxChars = 255;
      return maxChars - this.areasOfExperience.length;
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
.btns-wrapper {
  margin-top: 1rem;
}
a {
  color: rgb(89, 0, 255);
  text-decoration: none;
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
