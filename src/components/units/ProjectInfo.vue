<template>
  <section
    class="p-picture"
    :style="[
      selectedProject.imagePath
        ? `background-image: url('${selectedProject.imagePath}')`
        : `background-image: var(--project-thumbnail);`,
    ]"
  >
    <i class="i-back-nav" @click="goBack"></i>
  </section>

  <section class="p-info">
    <p class="-ntb -bold">{{ selectedProject.project_name }}</p>
    <p class="-ntb -bold">{{ selectedProject.group }}</p>

    <div class="aditional-info">
      <p class="-stb -bold">{{ selectedProject.ref }}</p>
    </div>
    <div class="aditional-info">
      <p class="-xstb">
        <i class="i-stack"></i>{{ selectedProject.units_size }} Units
      </p>
      <p class="-xstb"><i class="i-pin"></i> Porto, Portugal</p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedProject: null,
    };
  },
  created() {
    this.selectedProject = JSON.parse(
      JSON.stringify(this.$store.state.project)
    );
  },
  methods: {
    async goBack() {
      await this.$router.push({ name: "Projects" });
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
.p-picture {
  position: relative;
  height: 200px;
  /* min-height: 200px; */
  width: 240px;
  /* min-width: 240px; */
  border-radius: 10px;
  /* background-image: var(--project-thumbnail); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  overflow: hidden;
}
.i-back-nav {
  transform: scale(2);
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
  transition: transform 200ms ease;
}
.i-back-nav:hover {
  transform: scale(2.5);
}
.p-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 240px;
}
.aditional-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-top: 5px;
  gap: 8px;
}

.c-btn:hover {
  background: var(--secondary-transp);
  color: var(--primary-transp);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
p {
  display: flex;
}
i {
  width: 16px;
  height: 16px;
  margin-right: 0.5em;
  transform: scale(1);
}

@media screen and (max-width: 1280px) {
  .aditional-info {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>