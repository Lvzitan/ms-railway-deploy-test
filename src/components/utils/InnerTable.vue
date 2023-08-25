<template>
  <table class="inner-table">
    <thead>
      <tr>
        <th class="inner-th">
          <p class="-stb">Documents</p>
        </th>
      </tr>
    </thead>
    <tbody v-for="file in files" :key="file">
      <tr>
        <td class="inner-td">
          <p class="-xstr">{{ file.title }}</p>
          <section class="flex-row">
            <IconUnlink />
            <IconTrash />
          </section>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import IconTrash from "../../assets/icons/dynamicIcons/IconTrash.vue";
import IconUnlink from "../../assets/icons/dynamicIcons/IconUnlink.vue";
export default {
  components: {
    IconTrash,
    IconUnlink,
  },
  props: ["files"],
};
</script>

<style scoped>
.inner-table {
  width: 100%;
  height: 100%;
}
.inner-th {
  padding: 16px;
}
.inner-td {
  padding-inline: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-row {
  display: flex;
  gap: 20px;
}
.inner-td:hover {
  background: var(--gray5);
}
</style>