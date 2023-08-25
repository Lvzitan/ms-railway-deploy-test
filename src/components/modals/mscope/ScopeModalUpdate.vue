<template>
  <main class="fullscreen">
    <UpdateAgent
      v-if="scope === options.agentsScope"
      :item="item"
      @closeModal="$emit('closeModal')"
    />
    <UpdateTask
      v-if="scope === options.tasksScope"
      :item="item"
      @closeModal="$emit('closeModal')"
    />
    <UpdateElement
      v-if="scope === options.elementsScope"
      :item="item"
      @closeModal="$emit('closeModal')"
    />
    <UpdateDeliverable
      v-if="scope === options.deliverablesScope"
      :item="item"
      @closeModal="$emit('closeModal')"
    />
  </main>
</template>

<script>
import UpdateAgent from "./content/update/UpdateAgent.vue";
import UpdateTask from "./content/update/UpdateTask.vue";
import UpdateElement from "./content/update/UpdateElement.vue";
import UpdateDeliverable from "./content/update/UpdateDeliverable.vue";

export default {
  props: ["scope", "item"],
  emits: ["closeModal"],
  components: {
    UpdateAgent,
    UpdateTask,
    UpdateElement,
    UpdateDeliverable,
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