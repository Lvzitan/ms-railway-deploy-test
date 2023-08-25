<template>
  <main class="date-container">
    <p class="-xstb">Date</p>
    <p class="-stb">{{ getMyDate }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      myDate: Object,
    };
  },
  created() {
    const date = new Date();
    const dateToArray = date.toString().split(" ");

    this.myDate = {
      day: dateToArray[0],
      month: dateToArray[1],
      dayOfMonth: dateToArray[2],
      year: dateToArray[3],
    };

    // console.log(this.myDate);
    // console.log(dateToArray);
  },
  computed: {
    getMyDate() {
      return `${this.myDate.day}. ${this.myDate.month} ${this.myDate.dayOfMonth}, ${this.myDate.year}`;
    },
  },
};
</script>

<style scoped>
.date-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 172px;
  height: 45px;
  padding-inline: 16px;
  background: rgba(0, 0, 0, 0.1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 2px solid var(--highlight);
}
p:first-child {
  color: var(--highlight);
}
@media screen and (max-width: 719px) {
  .date-container {
    width: 256px !important;
  }
}
</style>