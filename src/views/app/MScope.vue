<template>
  <main class="main-route-container">
    <section class="sec-topnav-container"><MScopeTopnav /></section>

    <section class="child-route-container">
      <router-view :getRouteName="routeName" />
    </section>
  </main>

  <ScopeModal v-if="scopeModal.cmd && scopeModal.scope" />
</template>

<script>
import { mapGetters } from "vuex";
import MScopeTopnav from "../navigation/mscope/MScopeTopnav.vue";
import ScopeModal from "./mscope/ScopeModal.vue";
import { getRouteName } from "../../helpers/routerGetters";
export default {
  components: { MScopeTopnav, ScopeModal },
  data() {
    return {
      routeName: getRouteName,
    };
  },
  mounted() {
    //if no tool is selected redirect to the first child route
    if (this.$route.matched.length === 1)
      this.$router.push({ name: "Dashboard" });
  },
  computed: {
    ...mapGetters(["scopeModal"]),
  },
};
</script>

<style scoped>
* {
  --sec-topnav-height: 65px;
}
.main-route-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-inline: 16px;
  padding-top: 4px;
  gap: 8px;
}
.sec-topnav-container {
  width: 100%;
  height: var(--sec-topnav-height);
  z-index: 99;
}
.child-route-container {
  width: 100%;
  height: calc(100% - var(--sec-topnav-height));
  overflow: auto;
}

@media screen and (max-width: 1023px) {
  * {
    --sec-topnav-height: 160px;
  }
}
</style>