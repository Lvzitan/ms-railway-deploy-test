<template>
  <main class="content-page">
    <section class="submenu">
      <span class="highlight"></span>
      <h1 class="-h6">Agents</h1>

      <section class="actions">
        <div class="btn-container">
          <Button
            :state="'secondary'"
            :title="'Create New Agent'"
            @click="setModal('create')"
          />
        </div>
        <div class="btn-container">
          <Button
            :state="'primary'"
            :title="'Invite Member'"
            @click="setModal('invite')"
          />
        </div>
        <div class="search-container">
          <SearchBar />
        </div>
      </section>
    </section>

    <div class="listing"><AgentsListing @setModal="setModal" /></div>
  </main>
</template>

<script>
import SearchBar from "../../../components/utils/BaseSearchBar.vue";
import Button from "../../../components/utils/BaseButton.vue";
import AgentsListing from "../../../components/tables/mscope/AgentsListing.vue";

export default {
  props: ["getRouteName"],
  components: { SearchBar, Button, AgentsListing },
  methods: {
    setModal(cmd, item) {
      const route = this.getRouteName();
      const scopeModal = {
        cmd: cmd,
        scope: route,
        item: item,
      };
      this.$store.dispatch("scopeModal", scopeModal);
    },
  },
};
</script>

<style scoped>
* {
  --submenu-height: 40px;
}
.content-page {
  height: calc(100% - 4px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.submenu {
  width: 100%;
  height: var(--submenu-height);
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
  padding-top: 8px;
}
.listing {
  width: 100%;
  height: calc(100% - var(--submenu-height));
  overflow: auto;
}
.highlight {
  display: inline-block;
  height: 50%;
  width: 1px;
  border-radius: 8px;
  border: 2px solid var(--highlight);
}
.submenu h1 {
  text-transform: uppercase;
  padding-left: 8px;
}
.actions {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
.search-container {
  height: 100%;
  width: 272px;
  text-align: right;
}
.btn-container {
  width: 144px;
  height: 100%;
}
@media screen and (max-width: 1023px) {
  .submenu {
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
  }
  .highlight {
    display: none;
  }
  .actions {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>