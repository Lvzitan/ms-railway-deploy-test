<template>
  <main class="temp-container">
    <!-- TEMP -->
    <section
      :class="[sidenavOpened ? 'upload-container-o' : 'upload-container-c']"
      @click="$router.push({ name: 'UploadFile' })"
    >
      <i class="i-Upload"></i>
      <p class="-ntb" v-if="sidenavOpened">Upload</p>
    </section>
    <!-- TEMP -->
    <main class="nav-container">
      <ul class="nav-ul">
        <li v-for="link in navigationLinks" :key="link" class="nav-li">
          <router-link
            :to="{ name: `${link.name}` }"
            class="nav-item"
            :class="{ 'nav-closed': !sidenavOpened }"
            :title="link.name"
          >
            <i :class="`i-${link.name}`"></i>
            <p v-show="sidenavOpened" class="-xstb">
              {{ getRouteName(link.name) }}
            </p>
          </router-link>
          <i
            v-if="link.children && sidenavOpened"
            @click="link.toggled = !link.toggled"
            class="i-arrow-open-down"
            :class="{ rotate: link.toggled }"
            :title="!link.toggled ? 'Open' : 'Close'"
          ></i>

          <!-- children -->
          <ul
            v-if="link.toggled || !sidenavOpened"
            :class="{ 'toggled-children-ul': !sidenavOpened }"
          >
            <li v-for="child in link.children" :key="child" class="children-li">
              <router-link :to="{ name: `${child.name}` }" class="child-item">
                <i :class="`i-${child.name}`"></i>
                <p class="-str">{{ child.name }}</p>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </main>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      navigationLinks: [
        { name: "Overview" },
        { name: "Generate_Document" },
        { name: "Workflows" },
        { name: "Information_Request" },
        { name: "Nonconforming" },
        { name: "Labels" },
      ],
    };
  },
  computed: {
    ...mapGetters(["sidenavOpened"]),
  },
  methods: {
    getRouteName(routeString) {
      return routeString.replace("_", " ");
    },
  },
};
</script>

<style scoped>
.upload-container-o,
.upload-container-c {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-inline: 8px;
  height: 50px;
  margin-bottom: 8px;
  background: var(--secondary);
  filter: brightness(105%);
  border-radius: 4px;
  transition: filter 200ms ease, transform 200ms ease;
}
.upload-container-o {
  justify-content: flex-start;
}
.upload-container-c {
  justify-content: center;
}
.upload-container-o:hover,
.upload-container-c:hover {
  filter: brightness(110%);
  transform: translateX(8px);
}

.nav-container {
  position: relative;
  height: auto;
  width: 100%;
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
}
.nav-li:first-child {
  border: none;
}
.nav-li:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.nav-li {
  position: relative;
  width: 100%;
  text-decoration: none;
  border-top: 1px solid var(--gray6);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nav-item {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding-left: 8px;
  text-decoration: none;
  border-radius: inherit;
}
.i-arrow-open-down {
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
}

.nav-closed {
  justify-content: center;
  padding-left: 0;
  gap: none;
}
i {
  width: 32px;
  height: 32px;
  transform: scale(0.6);
  display: inline-block;
  transition: transform background-color 250ms ease-in-out;
}
.nav-item:hover i {
  transform: scale(0.75);
  background-color: transparent;
  filter: none;
}

.i-arrow-open-down:hover {
  transform: scale(0.6) rotateZ(-90deg) !important;
}
.nav-li:hover,
.nav-item:hover,
.child-item:hover {
  background: rgba(43, 150, 226, 0.1);
}
.-xstb,
.-str {
  color: var(--primary);
}
.children-li {
  height: 40px;
}
.child-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.child-item i {
  transform: scale(0.6);
}
.child-item:hover i {
  transform: scale(0.75);
}
.rotate {
  transform: rotateZ(180deg) scale(0.6);
}
.router-link-exact-active,
.router-link-exact-active:hover {
  background: var(--secondary);
}

.toggled-children-ul {
  display: none;
  position: absolute;
  left: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

.toggled-children-ul .child-item {
  padding-inline: 16px;
  background: rgb(239, 248, 255);
}
.toggled-children-ul:hover .child-item {
  background: rgb(178, 219, 255);
}
.nav-li:hover > .toggled-children-ul {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 719px), screen and (max-height: 719px) {
  .nav-container {
    height: 100%;
    box-shadow: none;
    flex-direction: row;
    border-radius: 0;
  }
  .nav-ul {
    flex-direction: row;
  }
  .nav-li {
    height: 100%;
    border: none;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 4px;
    height: 100%;
  }
  .nav-li .-xstb {
    display: none;
  }
  .nav-li:last-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .i-arrow-open-down {
    display: none;
  }
  .child-item p {
    display: none;
  }
  .toggled-children-ul {
    display: none;
    position: absolute;
    left: 0;
    bottom: 100%;
    background: rgba(43, 150, 226, 0.1);
  }
  .toggled-children-ul .child-item {
    padding-inline: 16px;
  }
  .nav-li:hover > .toggled-children-ul {
    display: flex;
    flex-direction: column;
  }

  .temp-container {
    display: flex;
    align-items: center;
  }
  .upload-container-c {
    height: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
  .upload-container-c:hover {
    filter: brightness(110%);
    transform: translateY(-4px);
  }
}
@media screen and (max-width: 499px) {
  .upload-container-c {
    background: var(--info);
    width: 30px;
  }
  .i-Upload {
    scale: 2.6;
  }
  .nav-li {
    width: 36px !important;
  }
}
</style>