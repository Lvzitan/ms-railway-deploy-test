<template>
  <main class="msource-container">
    <section class="temp-container">
      <UploadFile />
    </section>
  </main>
</template>

<script>
import UploadFile from "../../../components/forms/modals/msource/UploadFile.vue";
export default {
  components: {
    UploadFile,
  },
};
</script>

<style scoped>
.msource-container {
  height: 100%;
  width: 100%;
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  /* overflow: auto; */
}
.temp-container {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  background: var(--white1);
  height: auto;
  width: 1000px;
  border-radius: 16px;
  min-width: 380px;
}

@media screen and (max-width: 719px) {
  .msource-container {
    padding: 0;
  }
}
</style>