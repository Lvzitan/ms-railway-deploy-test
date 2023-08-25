<template>
  <main class="msight-container">
    <iframe :src="msightLink" allowfullscreen class="msight"></iframe>
    <!-- <iframe src="http://127.0.0.1:5501" allowfullscreen class="msight"></iframe> -->
    <span class="close" @click="closeSight"></span>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    closeSight() {
      this.$store.dispatch("loadIFC", false);
    },
  },
  computed: {
    ...mapGetters(["msightLink"]),
  },
};
</script>

<style scoped>
.msight-container {
  height: 100%;
  width: 100%;
  padding: 8px;
  position: relative;
}
.close {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--error-transp);
  position: absolute;
  z-index: 1;
  right: 24px;
  top: 20px;
  transition: 200ms ease;
}
.close:hover {
  cursor: pointer;
  background: var(--error);
}
.msight {
  position: relative;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 16px;
}
</style>