<template>
  <main
    @dragenter.prevent="toggleActive"
    @dragover.prevent
    @dragleave.prevent="toggleActive"
    @drop.prevent="stageFilesByDrag"
    :class="[{ active: active }]"
    class="dropzone"
  >
    <section class="container">
      <i class="i-upload-pic"></i>
      <label for="dropzoneInput" class="-xstb">{{ title }}</label>

      <input
        type="file"
        id="dropzoneInput"
        ref="dropzoneInput"
        class="dropzoneInput"
        accept="image/*"
        @change="stageFilesByInput"
      />
      <label for="dropzoneInput" class="-xstb browse-btn">Browse </label>
    </section>
    <div v-if="files.length" class="filenames-container">
      <p v-if="files.length === 1" class="-xstb">File:</p>
      <p class="-xstb" v-else>Files:</p>
      <p
        title="Click to remove"
        v-for="file in files"
        :key="file"
        @click="removeFile(file)"
        class="-xstr file-label"
      >
        {{ file.name }}
      </p>
    </div>
  </main>
</template>

<script>
export default {
  name: "DropZone",
  props: ["type", "title"],
  emits: ["commitFiles"],
  //type can be SINGLE or MULTIPLE
  data() {
    return {
      active: false,
      files: [],
    };
  },
  methods: {
    stageFilesByDrag(e) {
      this.toggleActive();
      switch (this.type) {
        case "single":
          this.files[0] = e.dataTransfer.files[0];
          break;
        case "multiple":
          this.files.push(e.dataTransfer.files[0]);
          break;
        default:
          alert("Error uploading logo");
          break;
      }
    },
    stageFilesByInput() {
      if (this.$refs.dropzoneInput.files.length) {
        switch (this.type) {
          case "single":
            console.log(this.$refs.dropzoneInput.files[0].type);

            this.files[0] = this.$refs.dropzoneInput.files[0];
            break;
          case "multiple":
            this.files.push(this.$refs.dropzoneInput.files[0]);
            break;
          default:
            alert("Error uploading logo");
            break;
        }
      }
    },
    removeFile(toRemove) {
      this.files = this.files.filter((file) => file !== toRemove);
    },
    toggleActive() {
      this.active = !this.active;
    },
  },
  watch: {
    files: {
      handler: function () {
        this.$emit("commitFiles", this.files);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.dropzone {
  display: flex;
  height: 100%;
  width: 100%;
  padding-block: 8px;
  padding-inline: 8px;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  background: var(--gray6);
  border-radius: 16px;
  transition: all 200ms ease;
  overflow: auto;
}
.container {
  display: flex;
  height: calc(100% - 20px);
  width: 100%;
  padding-top: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.browse-btn {
  width: 106px;
  padding: 8px;
  border-radius: 4px;
  background: var(--secondary);
  transition: 200ms ease;
  cursor: pointer;
}
.i-upload-pic {
  transform: scale(1.25);
  padding-left: 4px;
}
input {
  display: none;
}
.active {
  background: var(--primary);
  color: white;
}
.filenames-container {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  flex-wrap: none;
  white-space: nowrap;
  overflow: auto;
}
.file-label {
  background: rgb(165, 200, 226);
  background: linear-gradient(
    156deg,
    rgba(165, 200, 226, 1) 16%,
    rgba(159, 180, 219, 1) 100%
  );
  color: var(--white1);
  padding-block: 2px;
  padding-inline: 4px;
  border-radius: 4px;
  transition: all 200ms ease;
  user-select: none;
  cursor: pointer;
}

/*EFFECTS*/
.browse-btn:hover {
  transform: scale(1.1);
}
::-webkit-scrollbar {
  height: 4px !important;
}
.file-label:hover {
  background: rgb(235, 192, 179);
  background: linear-gradient(
    156deg,
    rgba(235, 192, 179, 1) 16%,
    rgba(235, 139, 139, 1) 100%
  );
  transform: scale(0.9);
}
</style>