<template>
  <main class="files-container">
    <div class="main-title">
      <h1 class="-ntb">{{ mainTitle }}</h1>
    </div>
    <section
      v-for="(file, index) in files"
      :key="file"
      @click="toggleFile(file, index)"
      class="file"
      :class="{
        isSelected: file.isSelected && linkInStore === selectedFile.link,
      }"
    >
      <p class="-stb title">{{ file.title }}</p>
      <img :src="file.imgPath" alt="file" class="file-img" loading="lazy" />
    </section>
  </main>
</template>

<script>
import IFCFile from "../../../components/projects/msight/IFCFile.vue";
export default {
  props: ["files", "mainTitle"],
  components: { IFCFile },
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    async toggleFile(file, index) {
      console.log(file.link);

      if (!this.selectedFile) {
        await this.selectFile(file, index);
        console.log(file);
      } else if (this.selectedFile.id === file.id) {
        await this.clearSelection(file);
      } else {
        //clear last selection
        this.files[this.selectedFile.index].isSelected = false;
        await this.selectFile(file, index);
      }
    },
    async selectFile(file, index) {
      file.isSelected = !file.isSelected;
      this.selectedFile = file;
      this.selectedFile.index = index;

      if (!file.link) return;
      await this.$store.dispatch("msightLink", file.link);
    },
    async clearSelection(file) {
      file.isSelected = !file.isSelected;
      this.selectedFile = null;
      await this.$store.dispatch("msightLink", null);
    },
  },
  computed: {
    linkInStore() {
      return this.$store.state.msightLink;
    },
  },
};
</script>

<style scoped>
.files-container {
  min-width: 256px;
  max-width: 256px;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 32px;
  padding: 4px;
  overflow: auto;
}
.main-title {
  border-left: 6px solid var(--highlight);
  padding-inline: 8px;
  white-space: nowrap;
}
.file {
  width: 100%;
  min-height: 180px;
  max-height: 180px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 4px;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
}
.title {
  padding-inline: 16px;
  padding-block: 2px;
  background: var(--primary);
  color: var(--white1);
  border-radius: 32px;
  transition: all 250ms ease;
}
.file-img {
  width: 100%;
  height: 80%;
  scale: 0.9;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: 200ms ease;
  background: white;
}

.file:hover .title {
  background: var(--info);
}
.file:hover .file-img {
  scale: 0.95;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.isSelected {
  box-shadow: var(--success-transp) 0 0 1px 1px;
  background: var(--success-light);
}
</style>