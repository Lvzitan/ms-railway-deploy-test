<template>
  <main class="assign-agent-wrapper">
    <section class="searchbar-wrapper">
      <BaseSearchBar
        :searchString="searchString"
        @setSearchString="setSearchString"
      />
    </section>
    <section class="results-wrapper">
      <p
        v-if="!searchString || searchString.length < 3"
        class="-xstr"
        style="color: var(--gray3)"
      >
        Type above to start searching by agent, first name, last name or email
      </p>
      <div
        v-else
        v-for="agent in filteredAgents"
        :key="agent"
        :ref="`a${agent.id}`"
        @click="setAssignedAgent(agent)"
        class="result-item"
        :class="{ isSelected: agent.isSelected }"
      >
        <DynaBadge :firstName="agent.firstName" :lastName="agent.lastName" />
        <div class="flex-column">
          <p class="-xstb">{{ agent.agent_title }}</p>
          <p class="-xstr" :title="agent.email">
            {{ agent.firstName }} {{ agent.lastName }}
          </p>
        </div>
      </div>
      <div
        v-if="searchString.length > 2 && !filteredAgents.length"
        class="search-help-wrapper"
      >
        <p class="-str">
          We're sorry. We can't find
          <span class="-stb">{{ searchString }}</span
          >...
        </p>
        <div class="search-help">
          <p class="-str">Search tips</p>
          <ul>
            <li class="-xstr">
              Try searchig by agent, email, first name or last name
            </li>
            <li class="-xstr">Check your spelling</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import BaseSearchBar from "../utils/BaseSearchBar.vue";
import DynaBadge from "../utils/DynaBadge.vue";
export default {
  props: ["agents", "propSearchString"],
  components: {
    BaseSearchBar,
    DynaBadge,
  },
  data() {
    return {
      searchString: "",
      selecedItemID: null,
    };
  },
  methods: {
    setAssignedAgent(agent) {
      if (this.selecedItemID) {
        if (this.selecedItemID !== agent.id) {
          this.removeSelectedState();
          this.addSelectedState(agent);
        } else {
          agent.isSelected = !agent.isSelected;
          this.selecedItemID = null;
        }
      } else {
        this.addSelectedState(agent);
      }
    },
    addSelectedState(agent) {
      agent.isSelected = !agent.isSelected;
      this.selecedItemID = agent.id;
    },
    removeSelectedState() {
      const indexOfSelectedAgent = this.agents.findIndex(
        (agent) => agent.id === this.selecedItemID
      );
      this.agents[indexOfSelectedAgent].isSelected =
        !this.agents[indexOfSelectedAgent].isSelected;
    },
    setSearchString(stringFromChild) {
      this.searchString = stringFromChild;
      console.log(this.searchString);
    },
  },
  computed: {
    filteredAgents() {
      if (this.searchString === "" || this.searchString.length < 3) return;

      //get filtered agents from api instead of this

      return this.agents.filter((agent) => {
        return (
          agent.firstName
            .toLowerCase()
            .includes(this.searchString.toLowerCase()) ||
          agent.lastName
            .toLowerCase()
            .includes(this.searchString.toLowerCase()) ||
          agent.email.toLowerCase().includes(this.searchString.toLowerCase()) ||
          agent.agent_title
            .toLowerCase()
            .includes(this.searchString.toLowerCase())
        );
      });
    },
  },
  mounted() {
    if (this.propSearchString) this.searchString = this.propSearchString;
  },
};
</script>

<style scoepd>
* {
  --searchbar-height: 38px;
}
.assign-agent-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  height: 100%;
}
.searchbar-wrapper {
  height: var(--searchbar-height);
  width: 100%;
}
.results-wrapper {
  height: 100%;
  min-height: 60px;
  max-height: 120px;
  width: 100%;
  border: 1px solid var(--gray5);
  border-radius: 4px;
  background: var(--white1);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 8px;
  gap: 8px;
  overflow: auto;
}

.result-item {
  min-height: 40px;
  min-width: 180px;
  max-width: 180px;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  outline: 1px solid var(--gray5);
  transition: 200ms ease;
  user-select: none;
}
.flex-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.result-item:hover {
  cursor: pointer;
  background: var(--success-light-transp);
}
.isSelected {
  background: var(--success-light);
  outline-color: var(--success);
  transition: 200ms ease;
}
.search-help-wrapper,
.search-help {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-flow: column;
}
.search-help-wrapper li {
  list-style-type: circle;
  color: var(--gray1);
}
.search-help {
  gap: 4px;
  width: auto;
  padding-block: 4px;
  padding-inline: 24px;
  background: var(--focus3);
  border-radius: 4px;
  margin-top: 4px;
}
</style>