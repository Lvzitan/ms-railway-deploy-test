<template>
  <main class="topnav" ref="topnav">
    <section class="top-left">
      <router-link :to="{ name: 'Home' }" class="logo-container">
        <div class="logo"></div>
      </router-link>
      <div
        class="project-title"
        :class="{ 'toggled-project-title': sidenavOpened }"
        v-if="project"
      >
        <h5 class="-ntr">{{ project.project_name }}</h5>
      </div>

      <div class="hmenu" @click="toggleNav">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </section>
    <section class="top-right">
      <ul class="content-ul" ref="topnavList">
        <li>
          <router-link :to="{ name: 'Projects' }" class="-str btn-project">
            <p>PROJECTS</p>
          </router-link>
        </li>
        <li>
          <div class="notification-container">
            <i class="i-bell"><span class="notification-new"></span></i>
          </div>
        </li>

        <li v-if="user">
          <div class="dropdown">
            <div class="u-info-container">
              <div class="user-i"><span class="notification-icon"></span></div>
              <div class="u-info">
                <p class="-stb" style="color: var(--white1)">{{ user.name }}</p>
                <p class="-stb">{{ user.email }}</p>
              </div>
              <i class="i-arrow-dropdown" style="transform: scale(0.3)"></i>
            </div>

            <div class="dropdown-content">
              <router-link
                :to="{ name: 'UpdateProfile' }"
                class="dropdown-item"
              >
                <i class="i-user-dropdown"></i>
                <p>My Profile</p>
              </router-link>
              <hr />
              <router-link :to="{ name: 'OrgsListing' }" class="dropdown-item">
                <i class="i-organization-dropdown"></i>
                <p>Organizations</p>
              </router-link>
              <div class="dropdown-item">
                <i class="i-settings-dropdown"></i>
                <p>Settings</p>
              </div>
              <div class="dropdown-item">
                <i class="i-support-dropdown"></i>
                <p>Support</p>
              </div>
              <hr />
              <div class="dropdown-item">
                <i class="i-gb-dropdown"></i>
                <p>Language</p>
              </div>
              <hr />
              <div class="dropdown-item" @click="logout">
                <i class="i-logout-dropdown"></i>
                <p>Log out</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    toggleNav() {
      this.$refs.topnavList.classList.toggle("active");
    },
    async logout() {
      await this.$router.push({ name: "Home" });
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapGetters(["user", "sidenavOpened", "project"]),
  },
};
</script>

<style scoped>
.topnav {
  background: var(--primary);
  color: var(--gray5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: max(40px, 5%);
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-inline: 4px; */
  padding-block: 4px;
  border-bottom: 2px solid var(--highlight);
}
.top-right {
  display: flex;
  height: 100%;
  align-items: center;
}
.content-ul {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 20px;
  height: 100%;
}
.content-ul li {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  height: 100%;
}
.top-left {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}
.logo-container {
  display: flex;
  align-items: center;
  user-select: none;
  height: 100%;
  width: max(80px, 5%);
}
.logo {
  background-image: url("../../assets/icons/logo.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.project-title {
  white-space: nowrap;
  letter-spacing: 1px;
  color: var(--secondary);
  user-select: none;
  animation: slide-in-text 200ms ease-in-out;
}
.toggled-project-title {
  margin-left: 116px;
}
.hmenu {
  position: absolute;
  padding: 5px;
  border-radius: 0.2rem;
  right: 1rem;
  width: 2.5rem;
  height: 25px;
  display: none;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
}
.hmenu:hover {
  background: rgba(255, 255, 255, 0.1);
}
.bar {
  width: 70%;
  height: 2px;
  border-radius: 0.2rem;
  background: var(--secondary);
}
.-stb,
.-str {
  color: var(--secondary-transp);
  transition: 250ms ease;
  text-decoration: none;
}
.u-info-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding-right: 4px;
}
.u-info-container i {
  transform: scale(0.6);
}
.user-i {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  /* background-image: url("../../assets/temp/admin.png"); */
  background-image: url("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");

  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 8px;
}
.notification-icon {
  position: absolute;
  height: 12px;
  width: 12px;
  background: rgb(0, 201, 0);
  top: 66%;
  right: 0;
  border-radius: 1rem;
  border: 1px solid white;
}
.u-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.notification-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.notification-new {
  position: absolute;
  width: 16px !important;
  height: 16px !important;
  background: var(--error);
  top: 0;
  right: 0;
  border: 2px solid var(--primary);
  border-radius: 50%;
}
.dropdown {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  padding-top: 6px;
  width: 100%;
  background-color: transparent;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}
.dropdown:hover .dropdown-content {
  display: block;
  color: var(--black3);
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
}
.dropdown-item {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  background: var(--white1);
  color: var(--primary);
  text-decoration: none;
}
.dropdown-item i {
  transform: scale(0.6);
}
.dropdown-item:hover {
  background: var(--gray6);
}
.dropdown-item:last-child {
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
}
.dropdown-item:hover i {
  transform: scale(0.75);
}
hr {
  height: 0;
  border: none;
  border-top: 0.5px solid var(--gray5);
}
.i-bell {
  margin-top: 4px;
  transform: scale(1);
}
.notification-container:hover .i-bell {
  transform: scale(1.1);
}
.btn-project {
  color: var(--white1) !important;
  transition: transform 200ms ease-in-out;
  height: 100%;
  display: flex;
  align-items: center;
}
.btn-project:hover {
  transform: scale(1.1);
}
@media (max-width: 719px) {
  .topnav {
    flex-direction: column;
    height: auto;
    max-height: none;
    box-shadow: 10px 4px 10px 0px rgba(0, 0, 0, 0.5);
  }
  .logo-container {
    height: 40px;
  }
  .top-left {
    height: 100px;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 0;
  }
  .toggled-project-title {
    margin-left: 0;
  }
  .hmenu {
    display: flex;
    height: 40px;
  }
  .content-ul {
    flex-direction: column;
    display: none;
  }
  .content-ul.active {
    display: flex;
  }
  .user-i {
    top: 0;
    right: 0;
  }
}
</style>