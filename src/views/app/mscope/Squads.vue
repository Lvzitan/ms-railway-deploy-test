<template>
  <main class="content-page">
    <section class="submenu">
      <span class="highlight"></span>
      <h1 class="-h6">Squads</h1>

      <section class="actions">
        <div class="btn-container">
          <Button :state="'primary'" :title="'Create New Squad'" />
        </div>
        <div class="btn-container">
          <Button :state="'secondary'" :title="'Invite to Squad'" />
        </div>
        <div class="search-container">
          <SearchBar />
        </div>
      </section>
    </section>
    <section
      class="comingsoon"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70%;
      "
    >
      <p class="-h1">Coming Soon...</p>
    </section>
  </main>
</template>

<script>
import SearchBar from "../../../components/utils/BaseSearchBar.vue";
import Button from "../../../components/utils/BaseButton.vue";
export default {
  components: { SearchBar, Button },
  methods: {},
};
</script>

<style scoepd>
* {
  --submenu-height: 40px;
}
.content-page {
  height: calc(100% - 4px);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.submenu {
  width: 100%;
  height: var(--submenu-height);
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
  padding-top: 8px;
}
.listing {
  width: 100%;
  height: calc(100% - var(--submenu-height));
  overflow: auto;
}
.highlight {
  display: inline-block;
  height: 50%;
  width: 1px;
  border-radius: 8px;
  border: 2px solid var(--highlight);
}
.submenu h1 {
  text-transform: uppercase;
  padding-left: 8px;
}
.actions {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
.search-container {
  height: 100%;
  width: 272px;
  text-align: right;
}
.btn-container {
  width: 144px;
  height: 100%;
}
@media screen and (max-width: 1023px) {
  .submenu {
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
  }
  .highlight {
    display: none;
  }
  .actions {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>