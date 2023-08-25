<template>
  <main class="full-page-wrapper" v-if="!requestSent">
    <h1 class="-h2" style="font-family: 'Montserrat-Black'">New Password</h1>

    <div class="text-container">
      <p class="-ltr msg-container">Please enter your new password below</p>
    </div>

    <input type="text" placeholder="New Password" />
    <input type="text" placeholder="Confirm new password" />

    <div class="nextsteps-container">
      <p class="-str" style="color: var(--info)">
        Follow the next steps to reset your password
      </p>

      <div class="btn-next" @click="handleClick">
        <p>Next</p>
        <i class="i-arrow-right"></i>
      </div>
    </div>
  </main>
  <main v-else class="full-page-wrapper centered">
    <h1 class="-h2" style="font-family: 'Montserrat-Black'">Password Reset</h1>
    <p class="-ntr">Your password has been changed successfully!</p>
    <i class="i-badge-approved"></i>
    <div class="btn-next">
      <p>Login</p>
      <i class="i-arrow-right"></i>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      requestSent: false,
    };
  },
  methods: {
    handleClick() {
      this.requestSent = true;
    },
  },
};
</script>

<style scoped>
.full-page-wrapper {
  text-align: left;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding-inline: 10%;
  padding-block: 16px;
  height: 90%;
  gap: 16px;
}
.centered {
  align-items: center;
}
input[type="text"] {
  padding: 14px;
  width: 100%;
  border: 1px solid var(--gray3);
  border-radius: 4px;
  letter-spacing: 1px;
}
.msg-container {
  width: 65%;
}
.nextsteps-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}
.i-arrow-right {
  transform: scale(0.6);
}
.btn-next {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: var(--secondary);
  width: 150px;
  padding: 8px;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  gap: 8px;
  align-self: center;
  font-family: "Montserrat-ExtraBold";
  letter-spacing: 1px;
  transition: 200ms ease;
}
.btn-next:hover {
  transform: translateX(16px);
  filter: brightness(110%);
}
.i-badge-approved {
  animation: slide-in 500ms ease;
  animation-fill-mode: forwards;
}
</style>