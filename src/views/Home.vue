<template>
  <div class="page-container"><LandingPage /></div>
</template>

<script>
import LandingPage from "@/components/home/LandingPage.vue";

export default {
  name: "Home",
  components: {
    LandingPage,
  },
};
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  min-height: 644px;
  /* background-image: url("../assets/landing-bg.png"); */
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 64px;
}

@media screen and (max-width: 980px) {
  .page-container {
    flex-direction: column;
  }
}
</style>
