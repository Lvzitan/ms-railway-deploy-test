<template>
  <main class="dropdown-container">
    <div class="dropbtn">
      <p class="-stb">{{ selectedUnit }}</p>
      <i class="i-arrow-open-down"></i>
    </div>
    <div class="dropdown-content">
      <p
        v-for="unit in unitsList"
        :key="unit"
        class="-str"
        @click="selectedUnit = unit"
      >
        {{ unit }}
      </p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      selectedUnit: "Entry Block",
      unitsList: ["Entry Block", "Main Building", "Block C"],
    };
  },
};
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
  width: 180px !important;
  height: 45px;
  border-radius: 4px;
  padding-inline: 16px;
  padding-block: 8px;
  background: var(--secondary);
  cursor: pointer;
}
.dropbtn {
  width: 100%;
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}
.dropdown-content {
  display: none;
  width: inherit;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content p {
  color: black;

  padding-inline: 16px;
  padding-block: 12px;
  text-decoration: none;
  display: block;
}
.dropdown-content p:hover {
  background: rgba(202, 228, 255, 0.5);
}
.dropdown-container:hover .dropdown-content {
  display: block;
  top: 100%;
  left: 0;
  user-select: none;
  cursor: pointer;
  text-align: left;
}
.dropdown-container:hover {
  box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 6px 0px inset,
    rgba(0, 0, 0, 0.1) -3px -3px 6px 1px inset;
}
.dropdown-container:hover i {
  transform: rotateZ(180deg) scale(0.5);
}

i {
  transform: scale(0.5);
}

@media screen and (max-width: 719px) {
  .dropdown-container {
    width: 256px !important;
  }
}
</style>