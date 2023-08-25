<template>
  <main class="page-container">
    <section class="content-wrapper flex-column align-start gap16">
      <p class="-xltb title">My Profile</p>

      <TabSelector :routerTabs="routerTabs" />

      <section class="width-full height-full" style="padding-top: 16px">
        <router-view />
      </section>
    </section>
  </main>
</template>

<script>
import TabSelector from "../components/utils/TabSelector.vue";
export default {
  components: {
    TabSelector,
  },
  data() {
    return {
      routerTabs: [
        {
          slug: "Profile",
          name: "UpdateProfile",
        },
        {
          slug: "Security",
          name: "Projects",
        },
      ],
    };
  },
};
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  padding-inline: 16px;
  padding-block: 8px;
}
.content-wrapper {
  width: 100%;
  min-height: 100%;
  padding-inline: 10vw;
  padding-block: 8px;
  border-radius: 8px;
  background: var(--white1);
}
.content-wrapper > p {
  font-family: "Montserrat-Bold";
  margin-bottom: 8px;
}

@media screen and (max-width: 767px) {
  .page-container {
    padding: 0;
  }
  .content-wrapper {
    padding-inline: 5vw;
    border-radius: 0;
  }
}

@media screen and (max-width: 399px) {
  .content-wrapper {
    padding-inline: 8px;
  }
}
</style>