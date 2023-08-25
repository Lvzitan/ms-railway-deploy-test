<template>
  <main class="searchbar-container">
    <input
      type="text"
      placeholder="Search"
      class="searchbar"
      v-model="searchString"
    />
    <i class="i-search"></i>
  </main>
</template>

<script>
export default {
  props: ["searchString"],
  watch: {
    searchString: function () {
      this.$emit("setSearchString", this.searchString);
    },
  },
};
</script>

<style scoped>
.searchbar-container {
  position: relative;
  /* width: 240px;
  height: 50px; */
  width: 100%;
  height: 100%;
  min-height: 30px;
  display: flex;
  align-items: center;
}
.searchbar {
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  outline: none;
  border-radius: 4px;
  padding-left: 2rem;
  color: var(--gray3);
  font-family: "Montserrat-Bold";
  box-shadow: var(--myBoxShadow);
  transition: all 200ms ease-out;
}
.searchbar:focus {
  color: var(--black2);
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}
.searchbar-container:hover .i-search {
  transform: scale(0.7);
}
.i-search {
  position: absolute;
  z-index: 1;
  transform: scale(0.55);
  transition: transform 200ms ease-out;
}
</style>