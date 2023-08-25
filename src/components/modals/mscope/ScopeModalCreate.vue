<template>
  <main class="fullscreen">
    <CreateAgent
      v-if="scope === options.agentsScope"
      @closeModal="$emit('closeModal')"
    />
    <CreateTask
      v-if="scope === options.tasksScope"
      @closeModal="$emit('closeModal')"
    />
    <CreateElement
      v-if="scope === options.elementsScope"
      @closeModal="$emit('closeModal')"
    />
    <CreateDeliverable
      v-if="scope === options.deliverablesScope"
      @closeModal="$emit('closeModal')"
    />
  </main>
</template>

<script>
import CreateAgent from "./content/create/CreateAgent.vue";
import CreateTask from "./content/create/CreateTask.vue";
import CreateElement from "./content/create/CreateElement.vue";
import CreateDeliverable from "./content/create/CreateDeliverable.vue";

export default {
  props: ["scope"],
  emits: ["closeModal"],
  components: {
    CreateAgent,
    CreateTask,
    CreateElement,
    CreateDeliverable,
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