<template>
  <main class="btn-container" @click="openedModal = true">
    <i class="i-plus"></i>
    <p class="-ltb">New Unit</p>
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
  components: {
    Modal,
  },
  data() {
    return {
      openedModal: false,
      setModal: "createUnit",
    };
  },
};
</script>

<style scoped>
.btn-container {
  position: relative;
  width: 240px;
  height: 60px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 4px;
  background: var(--secondary);
  cursor: pointer;
  transition: all 200ms ease-in-out;
  user-select: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.btn-container > p {
  font-family: "Montserrat-Bold";
  color: #344054;
}
.i-plus {
  transform: scale(0.7);
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