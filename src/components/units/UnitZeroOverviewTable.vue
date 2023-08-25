<template>
  <main class="table-container">
    <table>
      <thead>
        <tr class="-stb t-header">
          <th>Name</th>
          <th>Status</th>
          <th>Role</th>
          <th>Email address</th>
          <th>Teams</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <!---->
      <tbody>
        <tr class="t-body">
          <td>
            <div class="flex-row">
              <div class="u-pic"></div>
              <div>
                <p class="-stb">Chris Bucket</p>
                <p class="-xstb">Civil Engineer</p>
              </div>
            </div>
          </td>
          <td nowrap><p class="status -stb">Active</p></td>
          <td nowrap><p class="-xstb">Product Manager</p></td>
          <td nowrap>
            <p class="-xstb">chris@ms4aeco.com</p>
          </td>
          <td nowrap>
            <p class="-xstb tag">Civil Engineer</p>
          </td>
          <td><i class="i-trash"></i></td>
          <td><i class="i-edit"></i></td>
        </tr>
        <!---->
      </tbody>
    </table>
    <section class="pagination-container">
      <div class="buttons-container">
        <div class="btn-command"><p class="-stb">Previous</p></div>
        <div class="btn-command"><p class="-stb">Next</p></div>
      </div>
      <p class="-xstb">Page 1 of 1</p>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped>
.table-container {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: var(--myBoxShadow);
  border-radius: 4px;
  overflow-x: auto;
}
table {
  width: 100%;
  max-height: calc(100% - 60px);
  border-collapse: collapse;
  text-align: left;
  position: relative;
  overflow-x: auto;
}
.t-header {
  color: var(--gray3);
  height: 40px;
}
.-xstb {
  color: var(--gray2);
}
th {
  user-select: none;
  cursor: pointer;
  padding-inline: 1rem;
  border-bottom: 1px solid var(--gray5);
}
td {
  padding-inline: 1rem;
  height: 60px;
  border-bottom: 1px solid var(--gray5);
}
.t-body:nth-child(even) {
  background-color: #f9fafb;
}
.flex-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.u-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url("../../assets/temp/u2.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.progressbar-container {
  width: 100%;
  height: 12px;
  border-radius: 8px;
  background: #eee2ff;
}
.progressbar {
  height: 100%;
  width: 70%;
  border-radius: 8px;
  background: var(--secondary);
}
.status {
  color: var(--success);
}
.status {
  display: inline;
  padding-block: 4px;
  padding-inline: 8px;
  border-radius: 16px;
  background: rgba(0, 205, 116, 0.1);
}
.users-container {
  height: 40px;
  padding-left: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.user-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: var(--secondary);
  background: #f9f5ff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: white 0px 0px 0px 2px;
  user-select: none;
}
.tag {
  padding-block: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #eff8ff;
  color: #175cd3;
}
.tag:first-child {
  color: #6941c6;
  background: #f9f5ff;
}
.tag:last-child {
  color: #3538cd;
  background: #eef4ff;
}
/****PAGINATION****/
.pagination-container {
  width: 100%;
  height: 60px;
  padding-inline: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
}
.buttons-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}
.btn-command {
  box-shadow: var(--myBoxShadow);
  color: var(--gray2);
  padding-block: 8px;
  padding-inline: 16px;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
}
.btn-command:hover {
  background: rgba(0, 0, 0, 0.1);
}

/*ICONS*/
i {
  transform: scale(0.55);
}
i:hover {
  transform: scale(0.7);
  cursor: pointer;
}

@media screen and (max-width: 1280px) {
  .pagination-container {
    position: relative;
  }
}
@media screen and (max-width: 1280px) {
  .table-container {
    position: relative;
    width: 100%;
    height: auto;
    box-shadow: var(--myBoxShadow);
    border-radius: 4px;
    overflow-x: auto;
  }
}
</style>