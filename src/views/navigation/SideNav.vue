<template>
  <main
    class="sidenav"
    :class="{ 'sidenav-opened': sidenavOpened }"
    ref="sidenav"
  >
    <section
      class="sidenav-img"
      :style="[
        unit.imagePath
          ? `background-image: url('${unit.imagePath}')`
          : `background-image: var(--project-thumbnail);`,
      ]"
    >
      <div class="ref-container">
        <p class="-stb">{{ project.ref }}</p>
      </div>
    </section>
    <section class="nav-elements-container">
      <ProjectToolNav />
      <ProjectTools />
    </section>

    <section
      :class="[sidenavOpened ? 'toggler-container' : 'nav-closed']"
      @click="toggleNav"
    >
      <i
        class="i-toggler"
        :class="{ 'i-toggler-close': sidenavOpened }"
        ref="navbarToggler"
      ></i>
      <p
        v-show="sidenavOpened"
        class="-xstb version"
        style="color: white; letter-spacing: 1px"
      >
        Version 0.1
      </p>
    </section>
  </main>
</template>

<script>
import ProjectToolNav from "../../components/navigation/ProjectToolNav.vue";
import ProjectTools from "../../components/navigation/ProjectTools.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    ProjectToolNav,
    ProjectTools,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      project: {
        title: "New Building",
        ref: "NB_001",
      },
    };
  },
  methods: {
    async toggleNav() {
      if (this.$store.state.sidenavOpened) {
        await this.$store.dispatch("sidenavOpened", false);

        // this.$refs.sidenav.classList.remove("sidenav-opened");
        // this.$refs.navbarToggler.classList.remove("i-toggler-close");
      } else {
        await this.$store.dispatch("sidenavOpened", true);
        // this.$refs.sidenav.classList.add("sidenav-opened");
        // this.$refs.navbarToggler.classList.add("i-toggler-close");
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (
        (this.window.width < 720 && this.sidenavOpened) ||
        (this.window.height < 720 && this.sidenavOpened)
      ) {
        console.log("it ran");
        this.$store.dispatch("sidenavOpened", false);
        // this.$refs.sidenav.classList.remove("sidenav-opened");
        // this.$refs.navbarToggler.classList.remove("i-toggler-close");
      }
    },
  },
  mounted() {
    //spaghetti code (para o titulo do projecto ficar sempre alinhado quando nao ha sidenav)
    this.$store.dispatch("sidenavOpened", true);

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    //spaghetti code (para o titulo do projecto ficar sempre alinhado quando nao ha sidenav)
    this.$store.dispatch("sidenavOpened", false);
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapGetters(["sidenavOpened", "unit"]),
  },
};
</script>

<style scoped>
* {
  --sidenavImageHeight: 15%;
  --navigationHeight: 95%;
}
.sidenav {
  /* background: var(--primary); */
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  padding: 4px;
  /* height: max(min(calc(100% - 40px), 95%), calc(100% - 40rem)); */
  height: min(calc(100% - 40px), 95%);
  width: max(80px, 5%);
  display: flex;
  flex-direction: column;
  user-select: none;
}
.sidenav-opened {
  width: max(200px, 10%);
}
.sidenav-img {
  height: var(--sidenavImageHeight);
  width: 100%;
  /* background-image: var(--project-thumbnail); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  box-shadow: rgba(33, 35, 38, 1) 0px 10px 10px -10px;
}

.nav-elements-container {
  width: 100%;
  height: var(--navigationHeight);
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ref-container {
  writing-mode: vertical-rl;
  user-select: none;
  display: flex;
  align-items: flex-end;
  color: var(--white1);
  overflow: auto;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.ref-container .-stb {
  width: auto;
  left: 0;
  padding: 4px;
  background: rgba(0, 0, 0, 0.6);
}
.toggler-container {
  background: #4c5c84;
  padding-left: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
}
.nav-closed {
  background: #4c5c84;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
}
.toggler-container:hover,
.nav-closed:hover {
  background: #677496;
}

.i-toggler {
  width: 32px;
  height: 32px;
  transform: scale(0.6);
  display: inline-block;
  transition: transform 200ms ease-in-out;
}
.i-toggler-close {
  transform: rotateZ(-180deg) scale(0.6);
}
.version {
  padding-left: 10%;
}
@media (max-height: 719px), (max-width: 719px) {
  .sidenav {
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1); */
  }
  .sidenav-img {
    height: 100%;
    width: 20%;
    border-radius: 0;
  }
  .ref-container {
    position: relative;
    height: 100%;
    writing-mode: initial;
    color: var(--white1);
    overflow: auto;
    border-radius: none;
  }
  .ref-container .stb {
    width: auto;
    padding: 0.25rem;
    background: rgba(0, 0, 0, 0.2);
  }
  .nav-elements-container {
    height: 100%;
    padding-top: 0;
    flex-direction: row;
  }
  .toggler-container,
  .nav-closed {
    display: none;
  }
}
@media screen and (max-width: 499px) {
  .sidenav-img {
    display: none;
  }
}
</style>