<template>
  <main class="projects-group">
    <div class="btn-primary-l"><p class="-ntr">Manager</p></div>
    <ul>
      <li
        v-for="project in projects"
        :class="{ isSelected: project.selected }"
        :key="project"
        :ref="`p${project.id}`"
        @mouseenter="setSelection(project)"
        @mouseleave="setSelection(project)"
      >
        <img
          :src="project.imagePath"
          alt="project"
          v-if="project.imagePath.length"
          class="project-img"
        />
        <section class="project-banner">
          <p class="-ntb">{{ project.project_name }}</p>
          <div class="reference">
            <p class="-str">{{ project.ref }}</p>
            <p class="-str">Units: {{ project.units_size }}</p>
          </div>

          <section
            class="project-controls"
            :class="{ hidden: !project.selected }"
          >
            <div @click="handleClick(project.id)" :ref="`btn${project.id}`">
              <p class="-xstb">Enter Project</p>
            </div>

            <div><p class="-ntb">. . .</p></div>
          </section>
        </section>
      </li>
    </ul>
  </main>
  <main class="projects-group">
    <div class="btn-primary-l"><p class="-ntr">Member</p></div>
    <ul class="empty-ul">
      <li class="empty-li"></li>
      <li class="empty-li"></li>
      <li class="empty-li"></li>
      <li class="empty-li"></li>
    </ul>
  </main>
  <main class="projects-group">
    <div class="btn-primary-l"><p class="-ntr">Guest</p></div>
    <ul class="empty-ul">
      <li class="empty-li"></li>
      <li class="empty-li"></li>
      <li class="empty-li"></li>
      <li class="empty-li"></li>
    </ul>
  </main>
</template>

<script>
export default {
  props: ["projects"],
  emits: ["selectProject"],
  data() {
    return {
      projectBackgroundImage: "backgroundImage: `url('${project.imagePath}')`",
      //REFS
      selectedRef: null,
      selectedRefBtn: null,
    };
  },
  methods: {
    setSelection(project) {
      project.selected = !project.selected;
    },
    async handleClick(id) {
      await this.$store.dispatch("project", this.projects[0]);
      // console.log("marcelo", this.$store.state.project);
      this.$router.push({ name: "Units", params: { id } });
    },
  },
};
</script>

<style scoped>
.projects-group {
  grid-column: span 6;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 8px;
  justify-content: left;
}
.btn-primary-l {
  cursor: default;
  height: 80px;
}
.btn-primary-l:hover {
  transform: none;
}
ul {
  height: 150%;
  width: 100%;
  user-select: none;
  padding-inline: 16px;
  display: flex;
  gap: 2rem;
  overflow: auto;
}
li {
  position: relative;
  filter: grayscale(20%);
  grid-column: auto;
  grid-row: span 1;
  align-self: center;
  max-height: 280px;
  min-height: 280px;
  min-width: 340px;
  max-width: 340px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  outline: 0px solid var(--secondary);
  transition: all 200ms ease;
  overflow: hidden;
}
.isSelected {
  filter: grayscale(0%);
}
.empty-ul {
  overflow: hidden;
}
.empty-li {
  cursor: default;
  grid-column: auto;
  grid-row: span 1;
  align-self: center;
  height: 280px;
  width: 231px;
  border-radius: 8px;
  background-image: none;
  border: 2px dashed var(--gray4);
  background: transparent;
}
.project-banner {
  height: 72px;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: rgba(0, 0, 0, 0.55);
  color: var(--white1);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding-block: 8px;
  transition: all 200ms ease-out;
  gap: 16px;
  z-index: 1;
}

/*=== EFFECTS ===*/
li:hover {
  box-shadow: rgba(50, 50, 93, 1) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  outline: 8px solid var(--secondary);
}
li:hover .project-banner {
  height: 120px;
}
.empty-li:hover {
  transform: none;
  box-shadow: none;
  outline: none;
}
.reference {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  /* border: 1px solid red; */
  width: 100%;
}
.project-controls {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  padding-inline: 16px;
  height: 40px;
  animation: fade-in 800ms ease-out;
}
.project-controls div:first-child {
  height: 100%;
  display: flex;
  align-items: center;
  background: var(--secondary);
  padding-inline: 8px;
  padding-block: 4px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: 200ms ease-out;
}
.project-controls div:first-child:hover {
  cursor: pointer;
  background: none;
  letter-spacing: 2px;
  color: var(--secondary);
}
.project-controls div:last-child {
  transition: 100ms ease-out;
  align-self: center;
}
.project-controls div:last-child:hover {
  cursor: pointer;
  letter-spacing: 2px;
  color: var(--secondary);
}
.project-img {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: scale 400ms ease;
}
li:hover .project-img {
  scale: 1.1;
}
@media screen and (max-width: 719px) {
  ul {
    scroll-snap-type: x mandatory;
  }
  li {
    min-width: 280px;
    scroll-snap-align: center;
  }
}
</style>