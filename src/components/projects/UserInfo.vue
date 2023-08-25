<template>
  <section class="u-picture"></section>
  <section class="u-info">
    <p class="-ltb -bold">{{ user.name }}</p>
    <p class="-ltb -bold">B&M</p>
    <p class="-stb -bold">Project Coordinator</p>

    <div class="aditional-info1">
      <p class="-xstb"><i class="i-brickwall"></i> 4 Projects</p>
      <p class="-xstb"><i class="i-ruler"></i> 7 Units</p>
    </div>
    <div class="aditional-info2">
      <p class="-xstb"><i class="i-pin"></i> Portugal</p>
      <p class="-xstb c-btn">EDIT PROFILE</p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
.u-picture {
  height: 200px;
  /* min-height: 200px; */
  width: 240px;
  /* min-width: 240px; */
  border-radius: 10px;
  /* background-image: url("../../assets/temp/admin.png"); */
  background-image: url("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
  background-position: 0 25%;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}
.u-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
}
.aditional-info1,
.aditional-info2 {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-top: 5px;
}
.c-btn {
  padding-inline: 5px;
  border-radius: 5px;
  background: var(--primary-transp);
  cursor: pointer;
  user-select: none;
  color: var(--secondary);
  transition: all 250ms ease;
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

@media screen and (max-width: 1024px) {
  .u-info {
    width: 350px;
    justify-content: space-evenly;
  }
}
@media screen and (max-width: 470px) {
  .u-picture {
    min-width: 170px;
  }
}
</style>