<template>
  <main class="orgs-wrapper">
    <section class="orgs-nav">
      <div class="search-container">
        <BaseSearchBar />
      </div>
      <div class="new-btn">
        <SidenavBtn :title="'Add Organization'" :context="1" @event="create" />
      </div>

      <div class="router-wrapper">
        <ul>
          <li class="-str">Organization Members</li>
          <li class="-str">Organization Roles</li>
          <li class="-str">Organization Profile</li>
        </ul>
      </div>
    </section>

    <section class="child-route">
      <router-view />
    </section>
  </main>
</template>

<script>
import SidenavBtn from "../components/utils/SidenavBtn.vue";
import BaseSearchBar from "../components/utils/BaseSearchBar.vue";
export default {
  components: { SidenavBtn, BaseSearchBar },
  data() {
    return {};
  },
  methods: {
    create() {
      this.$router.push({ name: "CreateOrganization" });
    },
  },
  // mounted() {
  //   this.$router.push({ name: "OrgsListing" });
  // },
};
</script>

<style scoped>
.orgs-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 8px;
  gap: 16px;
}
.orgs-nav {
  display: flex;
  flex-flow: column;
  gap: 16px;
  width: 240px;
}
.search-container {
  height: 36px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.1) 0px 3px 6px;
}
ul {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  width: 100%;
}
li {
  padding: 8px;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid var(--gray5);
  transition: transform 100ms ease-out;
  background: var(--white1);
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background: var(--gray5);
}
.child-route {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

@media screen and (max-width: 1023px) {
  .orgs-wrapper {
    flex-flow: column;
    gap: 8px;
  }
}
</style>