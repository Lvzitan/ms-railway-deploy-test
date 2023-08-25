<template>
  <main class="page-wrapper">
    <div class="header">
      <p class="-stb">Privacy Details</p>
      <p class="-xstr">Update your privacy details here.</p>
    </div>
    <OrgPrivacyDetailsForm />
  </main>
</template>

<script>
import OrgPrivacyDetailsForm from "../../components/forms/organizations/OrgPrivacyDetailsForm.vue";
export default {
  components: {
    OrgPrivacyDetailsForm,
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