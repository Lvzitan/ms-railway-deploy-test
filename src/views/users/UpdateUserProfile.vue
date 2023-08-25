<template>
  <main class="grid-wrapper">
    <div class="column-span-3 flex-column align-start">
      <p class="-stb">About me</p>
      <p class="-xstr">Update your photo and personal details here</p>
    </div>
    <hr class="column-span-3 hr-form" />

    <section class="column-span-3 grid-wrapper">
      <UpdateUserProfileForm />
    </section>
  </main>
</template>

<script>
import UpdateUserProfileForm from "../../components/forms/users/UpdateUserProfileForm.vue";
export default {
  components: {
    UpdateUserProfileForm,
  },
};
</script>

<style scoped>
.grid-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.column-span-3 {
  grid-column: span 3;
  width: 100%;
  justify-items: start;
}
</style>