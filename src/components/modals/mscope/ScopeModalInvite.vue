<template>
  <main class="fullscreen">
    <InviteMemberAgents
      v-if="scope === options.agentsScope"
      @closeModal="$emit('closeModal')"
    />
  </main>
</template>

<script>
import InviteMemberAgents from "./content/create/InviteMemberAgents.vue";

export default {
  props: ["scope"],
  emits: ["closeModal"],
  components: {
    InviteMemberAgents,
  },
  data() {
    return {
      options: {
        agentsScope: "agents",
        tasksScope: "tasks",
        elementsScope: "elements",
        deliverablesScope: "deliverables",
      },
    };
  },
};
</script>

<style scoped>
</style>