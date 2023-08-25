<template>
  <main class="content-page"></main>
</template>

<script>
export default {
  mounted() {
    console.log("DASHBOARD MOUNTED");
  },
};
</script>

<style scoped>
.content-page {
  background-image: url("../../../assets/temp/dashboard.png") !important;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: calc(100% - 4px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>