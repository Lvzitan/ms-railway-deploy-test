<template>
  <main class="icon">
    <svg
      width="19"
      height="17"
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5792 10.6918H12.721L12.4168 10.4294C13.4814 9.32133 14.1224 7.88279 14.1224 6.3179C14.1224 2.82847 10.9611 0 7.06118 0C3.16123 0 0 2.82847 0 6.3179C0 9.80732 3.16123 12.6358 7.06118 12.6358C8.81018 12.6358 10.418 12.0623 11.6564 11.1098L11.9497 11.3819V12.1498L17.3814 17L19 15.5517L13.5792 10.6918Z"
        :fill="fill"
      />
    </svg>
  </main>
</template>

<script>
export default {
  props: ["fill"],
};
</script>

<style scoped>
.icon:hover path {
  filter: brightness(95%);
}
</style>