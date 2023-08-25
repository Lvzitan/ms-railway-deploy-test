<template>
  <main class="project-tool">
    <ul class="nav-ul">
      <router-link
        v-for="tool in projectTools"
        :key="tool"
        :to="{ name: `${tool}` }"
        class="nav-li"
      >
        <li :class="[{ 'nav-closed': !sidenavOpened }]" :title="tool">
          <i :class="`i-${tool}`"></i>
          <p v-show="sidenavOpened" class="-stb">{{ tool }}</p>
        </li>
      </router-link>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      projectTools: ["MScope", "MSight", "MSource"],
    };
  },
  computed: {
    ...mapGetters(["sidenavOpened"]),
  },
};
</script>

<style scoped>
.project-tool {
  position: relative;
  height: auto;
  width: 100%;
  margin-bottom: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: column;
  background: var(--white1);
}
.nav-ul {
  position: relative;
  padding: 0;
  margin: 0;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  cursor: pointer;
}
.nav-li {
  width: 100%;
  height: 50px;
  text-decoration: none;
  border-top: 1px solid var(--gray6);
}
.nav-li:first-child {
  border: none;
}
.nav-li:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
li {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding-left: 8px;
  border-radius: inherit;
}
.nav-closed {
  justify-content: center;
  padding-left: 0;
  gap: none;
}
.nav-li i {
  width: 32px;
  height: 32px;
  transform: scale(0.85);
  display: inline-block;
  transition: transform background-color 250ms ease-in-out;
}
.nav-li:hover i {
  transform: scale(1);
  background-color: transparent;
  filter: none;
}

.nav-li:hover {
  background: rgba(43, 150, 226, 0.1);
}
.-stb {
  color: var(--primary);
}
.selected {
  background: var(--secondary);
}
.router-link-active,
.router-link-active:hover {
  background: #8095ca;
  pointer-events: none;
}
@media screen and (max-height: 719px), (max-width: 719px) {
  .project-tool {
    height: 100%;
    box-shadow: none;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    border-radius: 0;
  }
  .nav-ul {
    flex-direction: row;
  }
  .nav-li {
    height: 100%;
    border: none;
  }
  li {
    justify-content: center;
    align-items: center;
    padding-left: 0;
  }
  .nav-li .-stb {
    display: none;
  }
  .nav-li:last-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
@media screen and (max-width: 499px) {
  i {
    scale: 0.8;
  }
  .nav-li {
    width: 36px !important;
  }
}
</style>