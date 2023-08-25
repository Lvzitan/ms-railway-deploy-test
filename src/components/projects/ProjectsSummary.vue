<template>
  <main class="list-container">
    <ul>
      <li class="-str">Total Projects: 4</li>
      <hr />
      <li class="-str">Projects as Manager: 4</li>
      <hr />
      <li class="-str">Projects as Member: 0</li>
      <hr />
      <li class="-str">Projects as Guest: 0</li>
    </ul>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  width: 240px;
  border-radius: 4px;
  user-select: none;
  background: white;
}
li {
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 240px;
}
hr {
  border: none;
  border-top: 1px solid var(--gray5);
}
</style>