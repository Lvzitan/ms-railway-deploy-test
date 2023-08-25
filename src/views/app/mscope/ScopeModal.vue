<template>
  <teleport to="body">
    <main class="modal-wrapper">
      <section class="modal-container">
        <section class="modal-header">
          <div class="logo"></div>
          <div class="close-wrapper" @click="closeModal">
            <!-- <i class="i-close"></i> -->
          </div>
        </section>
        <section class="modal-content">
          <ScopeModalCreate
            :scope="scope"
            v-if="cmd === options.create"
            @closeModal="closeModal"
          />

          <ScopeModalUpdate
            v-if="cmd === options.update"
            :scope="scope"
            :item="item"
            @closeModal="closeModal"
          />

          <ScopeModalDelete
            :scope="scope"
            v-if="cmd === options.delete"
            @closeModal="closeModal"
          />

          <ScopeModalInvite
            :scope="scope"
            v-if="cmd === options.invite"
            @closeModal="closeModal"
          />
        </section>
      </section>
    </main>
  </teleport>
</template>

<script>
import ScopeModalCreate from "../../../components/modals/mscope/ScopeModalCreate.vue";
import ScopeModalUpdate from "../../../components/modals/mscope/ScopeModalUpdate.vue";
import ScopeModalDelete from "../../../components/modals/mscope/ScopeModalDelete.vue";
import ScopeModalInvite from "../../../components/modals/mscope/ScopeModalInvite.vue";
export default {
  emits: ["closeModal"],
  components: {
    ScopeModalCreate,
    ScopeModalUpdate,
    ScopeModalDelete,
    ScopeModalInvite,
  },
  data() {
    return {
      options: {
        create: "create",
        update: "update",
        delete: "delete",
        invite: "invite",
      },
      cmd: this.$store.state.scopeModal.cmd,
      scope: this.$store.state.scopeModal.scope,
      item: this.$store.state.scopeModal.item,
      resetScopeModal: { cmd: null, scope: null, item: null },
    };
  },
  methods: {
    closeModal() {
      // this.$emit("closeModal");
      this.$store.dispatch("scopeModal", this.resetScopeModal);
    },
  },
  watch: {
    "$route.name": function () {
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/***            ***            ***/
/*** GLOBALIZE THIS EVENTUALLY ***/
/***            ***            ***/
* {
  --headerHeight: 55px;
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
  /* height: 720px; */
  /* width: auto;*/
  height: auto;
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
  justify-content: space-between;
}
.logo {
  background-image: var(--logo);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: var(--headerHeight);
  width: var(--headerHeight);
  margin-left: 16px;
}
.close-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 16px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 1px 1px;
  background: var(--error);
  transition: scale 200ms ease;
}
.close-wrapper:hover {
  scale: 0.9;
  background: #e78080;
}
.modal-content {
  height: calc(100% - var(--headerHeight));
  width: 100%;
  overflow: auto;
}
@media screen and (max-width: 1365px) {
  .modal-container {
    width: 900px;
    /* height: 720px; */
    height: auto;
  }
}
@media screen and (max-width: 1023px) {
  .modal-container {
    width: 700px;
    /* height: 800px; */
    height: auto;
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