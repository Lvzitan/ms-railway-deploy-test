<template>
  <div
    class="badge"
    v-if="!picturePath"
    :title="[
      firstName && lastName ? `${firstName} ${lastName}` : `${firstName}`,
    ]"
  >
    <p class="-ntb">
      {{ badgeUserName(firstName, lastName) }}
    </p>
  </div>
  <img
    v-else
    :src="picturePath"
    loading="lazy"
    :alt="`${firstName} ${lastName}`"
    class="badge"
    :title="[
      firstName && lastName ? `${firstName} ${lastName}` : `${firstName}`,
    ]"
  />
</template>

<script>
export default {
  props: ["picturePath", "firstName", "lastName"],
  data() {
    return {};
  },
  methods: {
    badgeUserName(firstName, lastName) {
      if (firstName && lastName)
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
      else if (firstName && !lastName) return `${firstName.charAt(0)}`;
      else return "--";
    },
  },
};
</script>

<style scoped>
.badge {
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  border-radius: 50%;
  background: var(--focus3);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--focus2) 0 0 0 1px;
}
img {
  object-fit: cover;
  object-position: center;
}
.badge .-ntb {
  color: var(--focus-text) !important;
}
</style>