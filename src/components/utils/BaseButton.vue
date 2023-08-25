<template>
  <main
    v-if="!!state"
    :class="[
      { 'btn-primary': state === 'primary' },
      { 'btn-secondary': state === 'secondary' },
    ]"
  >
    <p class="-stb">{{ title }}</p>
  </main>
</template>

<script>
export default {
  props: ["state", "title"],
};
</script>

<style scoped>
.btn-primary,
.btn-secondary {
  border-radius: 4px;
  padding-inline: 16px;
  padding-block: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 50ms linear;
  scale: 1;
}

.btn-primary {
  background: var(--secondary);
}
.btn-secondary {
  background: var(--white1);
}
.btn-primary:hover,
.btn-secondary:hover {
  scale: 1.05;
}
.btn-primary:active,
.btn-secondary:active {
  scale: 0.92;
}
</style>