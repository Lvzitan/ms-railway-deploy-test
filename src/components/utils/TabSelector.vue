<template>
  <section class="tab-selection flex justify-start">
    <router-link
      class="tab-item"
      v-for="tab in routerTabs"
      :key="tab"
      :to="{ name: `${tab.name}` }"
    >
      <p class="-xstb">
        {{ tab.slug }}
      </p>
    </router-link>
  </section>
</template>

<script>
export default {
  props: ["routerTabs"], //this contains a slug and the name of the route

  methods: {},
};
</script>

<style scoped>
.tab-selection {
  width: 100%;
  gap: 8px;
}
.tab-item {
  border-radius: 4px;
  padding-block: 8px;
  padding-inline: 12px;
  color: var(--gray2);
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}
.tab-item:hover {
  background: #f4f9f9;
  color: var(--gray1);
}
.router-link-active,
.router-link-active:hover {
  background: #f4f9f9;
  color: var(--secondary);
  pointer-events: none;
}
</style>