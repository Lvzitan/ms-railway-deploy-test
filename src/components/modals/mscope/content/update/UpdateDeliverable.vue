<template>
  <p>UpdateDeliverable</p>
</template>

<script>
export default {
  props: ["item"],
  mounted() {
    console.log(this.item);
  },
};
</script>

<style scoped>
</style>