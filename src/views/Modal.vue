<template>
  <teleport to="body">
    <main class="modal-wrapper">
      <section class="modal-container">
        <section class="modal-header">
          <div class="logo"></div>
        </section>
        <section class="modal-content">
          <CreateProject
            v-if="setModal === 'createProject'"
            @closeModal="closeModal"
          />
          <!---->
          <CreateUnit
            v-if="setModal === 'createUnit'"
            @closeModal="closeModal"
          />
        </section>
      </section>
    </main>
  </teleport>
</template>

<script>
import CreateProject from "../components/forms/modals/CreateProject.vue";
import CreateUnit from "../components/forms/modals/CreateUnit.vue";
export default {
  props: ["setModal"],
  emits: ["closeModal"],
  components: {
    CreateProject,
    CreateUnit,
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
* {
  --headerHeight: 64px;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.modal-container {
  width: 1000px;
  height: 720px;
  background: var(--white2);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}
.modal-header {
  width: 100%;
  height: var(--headerHeight);
  background: var(--primary);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  align-items: center;
}
.logo {
  background-image: url("../assets/icons/logo.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 64px;
  width: 64px;
  margin-left: 16px;
}
.modal-content {
  height: calc(100% - var(--headerHeight));
  width: 100%;
}
@media screen and (max-width: 1365px) {
  .modal-container {
    width: 900px;
    height: 720px;
  }
}
@media screen and (max-width: 1023px) {
  .modal-container {
    width: 700px;
    height: 800px;
  }
}
@media screen and (max-width: 719px) {
  .modal-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}
@media screen and (max-height: 730px) {
  .modal-wrapper {
    align-items: flex-start;
    overflow: auto;
  }
}
</style>