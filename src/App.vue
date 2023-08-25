<template>
  <main
    class="app-container"
    :style="[
      !insideOfApp
        ? { backgroundImage: 'var(--homeBg)' }
        : { backgroundImage: 'var(--appBg)' },
    ]"
  >
    <TopNav v-if="insideOfApp" />
    <SideNav v-if="unit" />
    <section
      :class="[
        getAuthStyle,
        unit ? 'content' : 'page',
        { 'toggled-content': sidenavOpened },
      ]"
      ref="appView"
    >
      <router-view />
    </section>
  </main>
</template>

<script>
import TopNav from "./views/navigation/TopNav.vue";
import SideNav from "./views/navigation/SideNav.vue";
import { mapGetters } from "vuex";
export default {
  components: { TopNav, SideNav },
  data() {
    return {
      hiddenTopnav: true,
      insideOfApp: null,
      appOutRouteNames: [
        "Home",
        "Login",
        "Register",
        "NotFound",
        "RecoverPassword",
        "NewPassword",
      ],
    };
  },
  beforeCreate() {
    //reset modal to null state
    if (this.$store.state.scopeModal) {
      const scopeModal = { cmd: null, scope: null };
      this.$store.dispatch("scopeModal", scopeModal);
    }
  },
  computed: {
    ...mapGetters(["unit", "sidenavOpened"]),
    getAuthStyle() {
      if (!this.$route.name) return;

      return {
        "auth-page-wrapper": this.$route.matched[0].name === "Auth",
      };
    },
  },
  watch: {
    $route: {
      //This algorithm will dynamically change bg and show/hide topnav according to insideOfApp value
      //Compares the appOutRouteNames with the route current name and counter is used to update it
      //Somehow this is faster than .includes ????
      handler: function () {
        this.insideOfApp = null;

        let counter = 1;
        for (let i = 0; i < this.appOutRouteNames.length; i++) {
          if (counter === 0) break;
          if (this.$route.name === this.appOutRouteNames[i]) {
            counter--;
          }
        }
        counter > 0 ? (this.insideOfApp = true) : (this.insideOfApp = false);

        // this.insideOfApp = this.appOutRouteNames.includes(this.$route.name);
      },
    },
  },
};
</script>


<style>
#app {
  font-family: "Montserrat-Regular", "Inter-Black", Avenir, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black3);
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.auth-page-wrapper {
  height: 100%;
  top: 0;
}
</style>
