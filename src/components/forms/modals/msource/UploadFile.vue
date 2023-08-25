<template>
  <main class="form-container">
    <div class="column-span-3 title">
      <p class="-ltb">bms.101</p>
      <p class="-ltb">Northern University Campus</p>
    </div>

    <select class="-xstb column-span-1 main-dpdown">
      <option selected disabled hidden>b.01 Entrance Block</option>
    </select>
    <section class="column-span-2 btns-container">
      <div class="my-btn">
        <p class="-xstb">New Document</p>
        <i><IconPlus :fill="'var(--white1)'" /></i>
      </div>
      <div class="my-btn">
        <p class="-xstb">Update Document</p>
        <i><IconSearch :fill="'var(--white1)'" /></i>
      </div>
    </section>
    <hr class="column-span-3" />
    <section class="column-row flex-row">
      <div><p class="-xstb">Location:</p></div>
      <select class="-xstb quarter-width">
        <option selected disabled hidden>Select a location</option>
      </select>
      <span style="align-self: start; padding-left: 8px">*</span>
    </section>
    <section class="column-row flex-row">
      <div><p class="-xstb">Related Agent:</p></div>
      <select class="-xstb quarter-width">
        <option selected disabled hidden>Select an agent</option>
      </select>
      <span style="align-self: start; padding-left: 8px">*</span>
    </section>
    <section class="column-row"></section>
    <hr class="column-span-3" />
    <section class="column-row">
      <p class="-stb column-span-1 dot secondary-title">
        Project Management <span style="padding-left: 8px">*</span>
      </p>
      <section class="column-span-1 flex-item">
        <div class="p-container selection-title"><p class="-xstr">PM</p></div>
        <select class="-xstr selection-item"></select>
        <select class="-xstr selection-item"></select>
        <select class="-xstr selection-item"></select>
      </section>

      <div class="column-span-1 res-uniclass">
        <input type="text" />
        <img
          src="../../../../assets/logos/uniclass.svg"
          alt="Uniclass"
          loading="lazy"
        />
      </div>
    </section>
    <section class="column-row">
      <p class="-stb column-span-1 dot secondary-title">
        Form of Information <span style="padding-left: 8px">*</span>
      </p>
      <section class="column-span-1 flex-item">
        <div class="p-container selection-title"><p class="-xstr">FI</p></div>
        <select class="-xstr selection-item"></select>
        <select class="-xstr selection-item"></select>
        <select class="-xstr selection-item"></select>
      </section>

      <div class="column-span-1 res-uniclass">
        <input type="text" />
        <img
          src="../../../../assets/logos/uniclass.svg"
          alt="Uniclass"
          loading="lazy"
        />
      </div>
    </section>
    <hr class="column-span-3" />
    <section class="column-row flex-row">
      <div><p class="-xstb">Suitability:</p></div>
      <select class="-xstb quarter-width">
        <option selected disabled hidden>Select an option</option>
      </select>
    </section>
    <section class="column-row">
      <p class="-stb column-span-1 dot secondary-title">
        Form of Information <span style="padding-left: 8px">*</span>
      </p>
      <section class="column-span-2 flex-item">
        <select class="-xstr selection-title">
          <option selected>SS</option>
        </select>
        <select class="-xstr selection-item"></select>
        <select class="-xstr selection-item"></select>
        <select class="-xstr selection-item"></select>
        <select class="-xstr selection-item"></select>
        <div class="add-item"><i class="i-plus" style="scale: 0.4"></i></div>
      </section>
    </section>
    <section class="column-span-3 revision-wrapper">
      <input type="checkbox" id="revision" />
      <label for="revision" class="-xxstb revision-info"
        ><p class="-xstb">Push for revision</p>
        <p class="-xstr">Force the document revision</p></label
      >
    </section>
    <hr class="column-span-3" />
    <section class="column-span-2 doc-title">
      <div>
        <p class="-ntb">Document Title:</p>
      </div>
      <input type="text" disabled class="-xstb" />
    </section>
    <div class="column-span-1 btn">
      <i class="i-Upload"></i>
      <p class="-ntb">Upload</p>
    </div>
  </main>
</template>

<script>
import IconPlus from "../../../../assets/icons/dynamicIcons/IconPlus.vue";
import IconSearch from "../../../../assets/icons/dynamicIcons/IconSearch.vue";
export default {
  components: {
    IconPlus,
    IconSearch,
  },
};
</script>

<style scoped>
.form-container {
  width: 100%;
  height: calc(100% - 2rem);
  display: grid;
  padding: 32px;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.column-row {
  grid-column: span 3;
  grid-template-columns: repeat(3, 1fr);
  display: grid;
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
span {
  color: var(--error);
}
input[type="text"],
.input-checkbox,
select,
option,
textarea,
.flex-row div,
.selection-title {
  border: 1px solid var(--gray5);
  border-radius: 4px;
  padding: 8px;
  outline: none;
}
input[type="text"],
select {
  height: 38px;
}
input[type="text"],
textarea,
select {
  width: 100%;
}
input[type="checkbox"] {
  height: 16px;
  width: 16px;
  cursor: pointer;
}
textarea {
  resize: none;
  height: 110px;
}

hr {
  border: none;
  border-top: 1px solid var(--gray6);
  margin-block: 8px;
}
.main-dpdown {
  border: none;
  background: var(--secondary);
  width: 60%;
}
.flex-row,
.flex-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex-item {
  gap: 8px;
}
.title {
  display: flex;
  gap: 8px;
  padding-bottom: 24px;
}
.title p:first-child::before {
  content: "\25CF";
  color: var(--secondary);
  padding-right: 4px;
}
.title p:first-child {
  color: var(--gray3);
}
.flex-row div {
  background: var(--primary);
  height: 100%;
  width: 120px;
  padding-right: 8px;
  color: var(--white1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.flex-row select {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.secondary-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.selection-title {
  background: var(--primary);
  padding: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white1);
}
.selection-title,
.selection-item {
  width: 60px;
}
.res-uniclass {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.res-uniclass img {
  position: absolute;
  padding-right: 8px;
}
.add-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--white1);
  border-radius: 45%;
  border: 1px solid var(--gray5);
  width: 38px;
  height: 38px;
  cursor: pointer;
}
.add-item:hover {
  background: var(--gray5);
}
.revision-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
}
.revision-wrapper label {
  cursor: pointer;
}
.doc-title {
  display: flex;
  justify-content: flex-start;
}
.doc-title > div {
  background: var(--secondary);
  height: 100%;
  padding-inline: 8px;
  display: flex;
  align-items: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid var(--gray5);
}
.doc-title p {
  padding-right: 8px;
  white-space: nowrap;
  font-family: "Montserrat-Bold";
}
.doc-title > div + input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.btn {
  display: flex;
  background: var(--secondary);
  width: 60%;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  justify-self: end;
  transition: 250ms ease;
}
.btn:hover {
  cursor: pointer;
  transform: translateY(-4px);
  filter: brightness(95%);
  box-shadow: inset 0 -50px 0 0 var(--success-light);
}
.btn p {
  font-family: "Montserrat-Bold";
  color: var(--primary);
}

/**EFFECTS **/
input:focus,
select:focus,
option:focus,
textarea:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}
p {
  user-select: none;
}
.btns-container {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.my-btn {
  background: var(--gray4);
  color: var(--white1);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  width: 200px;
}
i {
  scale: 0.8;
  pointer-events: none;
}
.quarter-width {
  width: 25%;
}
.dot::before {
  content: "\25CF";
  color: var(--primary);
  padding-right: 8px;
}
p {
  white-space: nowrap;
}

@media screen and (max-width: 1023px) {
  .main-dpdown {
    width: 100%;
  }
  .column-row.flex-row div {
    width: 160px;
  }
  .btn {
    width: 100%;
  }
  .quarter-width {
    width: 100%;
  }
  .column-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .column-row .secondary-title {
    grid-column: span 2;
  }
}
@media screen and (max-width: 719px) {
  .title {
    flex-flow: column;
    align-items: flex-start;
  }
  .column-span-2 {
    grid-column: span 3;
  }
  .column-span-1 {
    grid-column: span 3;
  }
  .btns-container {
    gap: 8px;
    justify-content: space-between;
  }
  .flex-row {
    flex-flow: column;
  }
  .flex-item {
    justify-content: space-evenly;
  }
  .column-row.flex-row div {
    width: 100%;
    justify-content: flex-start;
    color: var(--primary);
    background: var(--white1);
    border: none;
    padding: 0;
  }
  .column-row.flex-row div::after {
    content: "*";
    padding-left: 8px;
    color: var(--error);
  }
  .column-row.flex-row span {
    display: none;
  }
  .column-row {
    gap: 4px;
  }
  .doc-title {
    flex-flow: column;
  }
  .doc-title div {
    justify-content: center;
    background: none;
    border: none;
  }
}
</style>