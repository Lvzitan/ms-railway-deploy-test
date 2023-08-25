<template>
  <main class="form-wrapper">
    <h1 class="-xltb column-span-4" style="white-space: none">
      Add New Element
    </h1>
    <hr class="column-span-4" />

    <section class="column-span-3 searchbar-wrapper flex-column">
      <p class="-xstb">Start typing to search for an element</p>
      <SearchBar
        :searchString="searchString"
        @setSearchString="setSearchString"
      />
    </section>
    <section class="column-span-1 flex-column">
      <p class="-xstb">Browse Tables</p>
      <div class="search-manual-results-wrapper">
        <div
          class="category-item"
          v-for="cat in elementCategories"
          :key="cat"
          @click="searchString = cat.el_prefix"
        >
          <p class="-ntb">{{ cat.el_prefix }}</p>
          <p class="-stb">{{ cat.el_name }}</p>
        </div>
      </div>
    </section>

    <section class="flex-column column-span-3">
      <p v-if="!selectedCategory" class="-xstb">Select a category</p>
      <div v-else class="selected-element">
        <p class="-stb">
          {{ searchString }}
        </p>
        <p class="-str">
          {{ selectedCategory }}
        </p>
      </div>

      <div class="search-results-wrapper">
        <p class="-xstb" v-if="!exampleSearch">No results were found.</p>

        <div
          v-for="item in exampleSearch"
          :key="item"
          draggable="true"
          @dragstart="startDrag($event, item)"
          @click="
            [
              (selectedCategory = `${item.name}`),
              (searchString = `${item.prefix}`),
            ]
          "
          class="search-result-item"
          title="Drag to add"
        >
          <p class="-stb" style="grid-column: span 3">{{ item.prefix }}</p>
          <p class="-str" style="grid-column: span 12">{{ item.name }}</p>
          <p
            class="-str"
            style="grid-column: span 1; justify-self: end"
            :title="`Contains ${item.children} more codes`"
          >
            +{{ item.children }}
          </p>
        </div>
      </div>
    </section>

    <section class="column-span-1 flex-column">
      <p class="-xstb">Elements to be added:</p>
      <section
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter.prevent="toggleActive()"
        @dragleave.prevent="toggleActive()"
        class="summary-wrapper"
        :class="[
          { 'summary-wrapper-empty': !stagedElements.length },
          { isActive: dragActive },
        ]"
        title="Click to remove"
      >
        <p
          v-if="!stagedElements.length"
          class="-xstb"
          style="text-align: center; line-height: 20px; padding-inline: 8px"
        >
          Please drag and drop the elements you want to add here.
        </p>
        <div
          class="staged-item"
          v-for="(item, index) in stagedElements"
          :key="item"
          @click="unstageElement(index)"
        >
          <p class="-xstb">{{ item.prefix }}</p>
          <p class="-xstb" style="text-align: right">{{ item.name }}</p>
        </div>
      </section>
    </section>
    <div class="column-span-4 hint-remove">
      <p
        v-if="stagedElements.length"
        style="text-align: right; color: var(--warn)"
        class="-xstr"
      >
        Click on an element to remove it
      </p>
    </div>

    <hr class="column-span-4" />

    <section class="btns-wrapper">
      <BaseButton :state="'primary'" :title="'Add Elements'" />
    </section>
  </main>
</template>

<script >
import SearchBar from "../../../../utils/BaseSearchBar.vue";
import BaseButton from "../../../../utils/BaseButton.vue";
export default {
  emits: ["closeModal"],
  components: {
    SearchBar,
    BaseButton,
  },
  data() {
    return {
      // TEMP
      elementCategories: [
        { el_prefix: "Ss", el_name: "Systems" },
        { el_prefix: "Pr", el_name: "Products" },
      ],
      exampleSearch: [
        {
          id: 1,
          prefix: "Ss_15",
          name: "Earthworks, remediation and temporary systems",
          children: 3,
        },
        {
          id: 2,
          prefix: "Ss_20",
          name: "Structural systems",
          children: 10,
        },
        {
          id: 3,
          prefix: "Ss_25",
          name: "Wall and barrier systems",
          children: 18,
        },
        {
          id: 4,
          prefix: "Ss_30",
          name: "Roof, floor and paving systems",
          children: 15,
        },
        {
          id: 5,
          prefix: "Ss_32",
          name: "Damp-proofing, waterproofing and plaster-finishing systems",
          children: 5,
        },
        {
          id: 6,
          prefix: "Ss_35",
          name: "Stair and ramp systems",
          children: 4,
        },
        {
          id: 7,
          prefix: "Ss_37",
          name: "Tunnel, shaft, vessel and tower systems",
          children: 8,
        },
      ],
      //VARIABLES
      selectedCategory: "",
      searchString: "",
      elementsStaged: null,
      stagedElements: [],
      dragActive: false,
    };
  },
  methods: {
    setSearchString(stringFromChild) {
      this.searchString = stringFromChild;
      console.log(this.searchString);
    },
    startDrag(e, item) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", JSON.stringify(item));
    },
    onDrop(e) {
      console.log(e);
      this.stagedElements.push(
        JSON.parse(e.dataTransfer.getData("text/plain"))
      );

      this.toggleActive(); //this will reset the css effect
    },
    unstageElement(indexToRemove) {
      this.stagedElements.splice(indexToRemove, 1);
    },
    toggleActive() {
      this.dragActive = !this.dragActive;
    },
  },
  watch: {
    searchString: function () {
      if (this.searchString.length) return;

      this.selectedCategory = "";
    },
  },
};
</script>

<style scoped>
* {
  --content-height: 300px;
}
.form-wrapper {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-inline: 32px;
  padding-block: 16px;
  gap: 12px;
  user-select: none;
}
.column-span-4 {
  grid-column: span 4;
}
.column-span-3 {
  grid-column: span 3;
}
.column-span-2 {
  grid-column: span 2;
}
.column-span-1 {
  grid-column: span 1;
}
.flex-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.flex-item {
  display: flex;
  gap: 8px;
}
.searchbar-wrapper {
  height: 60px;
}
.search-results-wrapper {
  width: 100%;
  max-height: var(--content-height);
  min-height: 65px;
  overflow: auto;
}
.search-manual-results-wrapper {
  display: flex;
  gap: 16px;
  width: 100%;
  max-height: 38px;
  justify-content: flex-start;
  overflow: auto;
}
.search-result-item {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 8px;
  padding-block: 10px;
  padding-inline: 16px;
  border-bottom: 1px solid var(--gray6);
  user-select: none;
  cursor: pointer;
  transition: 100ms ease;
}
.search-result-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
.summary-wrapper {
  grid-column: span 1;
  height: 100%;
  max-height: calc(var(--content-height) + 23px);
  width: 320px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  transition: 150ms ease;
  padding: 0 !important;
}
.summary-wrapper-empty {
  justify-content: center;
}
.staged-item {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--gray6);
  padding-block: 8px;
  padding-inline: 8px;
}
.staged-item:hover {
  background: rgba(255, 0, 0, 0.05);
  cursor: pointer;
  border-radius: 4px;
}
.category-item {
  background: var(--gray6);
  padding: 8px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease;
}
.category-item:hover,
.search-result-item:hover,
.selected-element:hover {
  background: var(--secondary-highlight);
}
.search-result-item:hover {
  border-radius: 4px;
}
hr {
  border: none;
  border-top: 1px solid var(--gray6);
  /* margin-block: 8px; */
}
.btns-wrapper {
  /* border: 1px solid red; */
  grid-column: span 4;
  display: flex;
  justify-content: flex-end;
}

.btns-wrapper > main {
  width: auto;
}
.selected-element {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}

/* *** TENTAR GLBOALIZAR *** */
input[type="text"],
.search-results-wrapper,
.selected-element,
.summary-wrapper {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  padding-inline: 8px;
  outline: none;
}
input[type="text"],
.selected-element {
  height: 38px;
}
input[type="text"] {
  width: 100%;
}

/**EFFECTS **/
input[type="text"]:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}
.isActive {
  background: var(--focus3);
}
@media screen and (max-width: 719px) {
  .column-span-4 {
    grid-column: span 4;
  }
  .column-span-3 {
    grid-column: span 4;
  }
  .column-span-2 {
    grid-column: span 4;
  }
  .column-span-1 {
    grid-column: span 4;
  }
  .search-manual-results-wrapper {
    justify-content: space-evenly;
  }
  .summary-wrapper {
    width: 100%;
    min-height: 100px;
  }
  .hint-remove {
    grid-row: 6 / span 1;
    text-align: center;
  }
}
</style>