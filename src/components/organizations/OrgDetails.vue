<template>
  <main class="page-wrapper">
    <div class="header">
      <p class="-stb">Organization Details</p>
      <p class="-xstr">Update your logo and organization details here.</p>
    </div>
    <OrgDetailsForm />
  </main>
</template>

<script>
import OrgDetailsForm from "../../components/forms/organizations/OrgDetailsForm.vue";
export default {
  components: {
    OrgDetailsForm,
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}
.header {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}
</style>