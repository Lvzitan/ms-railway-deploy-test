<template>
  <div class="full-page-wrapper">
    <main class="auth-container">
      <section class="auth-form-container">
        <router-view />
      </section>
      <section class="backplate"></section>
    </main>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    const excludeRoute = "Auth";
    const currentRoute = this.$route.name;

    if (currentRoute === excludeRoute) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style scoped>
.full-page-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.auth-container {
  position: inherit;
  width: 1300px;
  height: 700px;
  display: flex;
  flex-wrap: nowrap;
  border-radius: 32px;
  box-shadow: -35px 25px 5px 0 rgba(0, 0, 0, 0.25);
}
.auth-form-container {
  background: white;
  width: 65%;
  height: 100%;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
}
.backplate {
  width: 35%;
  height: 100%;
  background-image: var(--backplate);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
}
@media screen and (max-width: 1366px) {
  .auth-container {
    transform: scale(0.9);
  }
}

@media screen and (max-width: 1024px) {
  .auth-container {
    transform: scale(0.95);
    width: 526px;
    align-self: flex-start;
  }
  .auth-form-container {
    width: 100%;
    border-radius: 32px;
  }
  .backplate {
    display: none;
  }
}
@media screen and (max-height: 719px) {
  .full-page-wrapper {
    align-items: flex-start;
  }
}

@media screen and (max-width: 600px) {
  .auth-container {
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 550px;
  }
  .auth-form-container {
    width: 100%;
  }
}

@media screen and (max-width: 419px) {
  .auth-form-container {
    width: 100%;
    border-radius: 8px;
  }
}
</style>