<template>
  <main
    class="btn-container"
    :class="context ? 'create' : 'delete'"
    @click="[setModal ? (openedModal = true) : $emit(event)]"
  >
    <i class="i-plus" v-if="context === 1"></i>
    <p :class="context ? '-ltb' : '-ntr'">{{ title }}</p>
  </main>

  <Modal
    v-if="openedModal"
    :setModal="setModal"
    @closeModal="openedModal = false"
  />
</template>

<script>
import Modal from "../../views/Modal.vue";
export default {
  emits: ["event"],
  props: ["title", "setModal", "context"], //context = 1 (create) 0 (delete)
  components: {
    Modal,
  },
  data() {
    return {
      openedModal: false,
      event: "event",
    };
  },
};
</script>

<style scoped>
.btn-container {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: 8px;
  padding-left: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  user-select: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.create {
  width: 240px;
  height: 60px;
  background: var(--secondary);
}
.delete {
  width: 240px;
  height: 40px;
  background: var(--error);
  color: var(--white1);
}
.i-plus {
  transform: scale(0.7);
}
p {
  font-family: "Montserrat-Regular";
}
.-ntr {
  text-align: left;
}
/* EFFECTS */
.btn-container:hover {
  transform: translateX(16px);
  box-shadow: rgba(50, 50, 93, 0.5) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.6) 0px 1px 3px -1px;
  /* transform: translateY(-8px); */
}

/*=== MEDIA QUERIES ===*/

@media screen and (max-width: 1024px) {
  .btn-container:hover {
    transform: scale(1.05);
  }
}
</style>