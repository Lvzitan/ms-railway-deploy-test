<template>
  <main class="main-wrapper">
    <img src="../../assets/thumbnails/nodata.svg" alt="NoData" />
    <div>
      <p class="-xxltr" style="padding-bottom: 8px">No data to display</p>
      <p class="-xltr">
        Please add a new {{ item }} or select a different stage
      </p>
    </div>
  </main>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  padding: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
}
.main-wrapper img {
  width: clamp(60px, 25%, 200px);
  width: clamp(60px, 25%, 200px);
  min-height: 60px;
  object-fit: fit;
}
.main-wrapper div {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: space-around;
  text-align: left;
}

@media screen and (max-width: 1023px) {
  .-xxltr {
    font-size: 1.4rem;
    line-height: 32px;
  }
  .-xltr {
    font-size: 0.9rem;
    line-height: 16px;
  }
}
@media screen and (max-width: 719px) {
  .main-wrapper {
    width: 100%;
  }
}

@media screen and (max-width: 399px) {
  .main-wrapper {
    flex-flow: column;
  }
  .main-wrapper div {
    align-items: center;
    text-align: center;
  }
}
</style>