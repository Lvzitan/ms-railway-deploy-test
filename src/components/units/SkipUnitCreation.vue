<template>
  <main class="project-units-container">
    <section class="skip-container">
      <p class="-ltb title">Project Units</p>
      <div class="bg">
        <p class="-ntb" @click="skipUnit">Skip Unit Creation</p>
      </div>

      <section class="text-wrapper">
        <p class="-stb">Welcome to your new Project</p>
        <p class="-xstr" style="color: var(--gray3)">
          We're glad to have you onboard. Need to create a new unit? Click on
          create!
        </p>
      </section>

      <section class="buttons-container">
        <div class="btn-skip" @click="skipUnit"><p class="-xstb">Skip</p></div>
        <div class="btn-create" @click="createUnit">
          <p class="-xstb">Create new unit</p>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  methods: {
    skipUnit() {
      alert("Under development...");
    },
    createUnit() {
      alert("Under development...");
    },
  },
};
</script>

<style scoped>
.project-units-container {
  display: flex;
  flex-flow: column;
  /* grid-template-rows: repeat(12, 1fr); */
  height: 100%;
  padding-top: 8px;
  gap: 16px;
}
.title {
  font-family: "Montserrat-Bold";
  font-size: 32px;
  justify-self: start;
  align-self: flex-start;
  white-space: nowrap;
}
.skip-container {
  background: var(--white1);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bg {
  background: rgb(51, 57, 142);
  background: radial-gradient(
    circle,
    rgba(51, 57, 142, 1) 25%,
    rgba(21, 22, 59, 1) 100%
  );
  height: 156px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.bg p {
  color: var(--white1);
  background: rgba(255, 255, 255, 0.25);
  padding-inline: 16px;
  padding-block: 4px;
  border-radius: 16px;
  cursor: pointer;
  transition: 200ms ease-in-out;
}
.bg p:hover {
  color: var(--secondary);
  padding-inline: 32px;
  /* padding-block: 8px; */
}
.text-wrapper {
  padding: 8px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.buttons-container {
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: space-between;
}

.btn-skip,
.btn-create {
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  padding: 4px;
  transition: 200ms ease;
}
.btn-skip {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.btn-create {
  background: var(--secondary);
}
.btn-skip:hover {
  background: rgba(0, 0, 0, 0.1);
}
.btn-create:hover {
  background: var(--secondary-transp);
}
</style>