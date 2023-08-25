<template>
  <main class="confirm-account-wrapper">
    <h1 class="-h2">Verify your account</h1>
    <p class="-ltr">
      A verify email has been sent to your email address. Follow the steps on
      this email to validate your new account.
    </p>
    <i class="i-envelope"></i>

    <p class="-ntr">
      Be sure to check your spam box, sometimes email platforms consider this
      type of request as spam.
    </p>
    <div class="help-container" @click="handleClick">
      <hr />
      <p class="-xstr">
        If you are experiencing problems viewing this email please click on the
        button below:
      </p>

      <div class="resend-email">
        <p class="-ntb">Resend Email</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
.confirm-account-wrapper {
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: space-around;
  gap: 16px;
}
.-h2 {
  font-family: "Montserrat-Black";
  letter-spacing: 1px;
  align-self: flex-start;
}
.i-envelope {
  align-self: center;
  animation: slide-in 500ms ease;
  animation-fill-mode: forwards;
}
.-ltr {
  font-size: 24px;
  text-align: left;
}
.-ntr {
  width: 60%;
  align-self: center;
  text-align: center;
  display: inline;
  color: var(--highlight);
  filter: brightness(80%);
}
.help-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
hr {
  border: none;
  width: 95%;
  border-top: 1px solid var(--gray4);
}
.resend-email {
  width: 300px;
  height: 60px;
  background: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  margin-top: 8px;
  transition: 200ms ease;
}
.-ntb {
  font-family: "Montserrat-Black";
  font-size: 24px;
}

/*=== EFFECTS ===*/
.resend-email:hover {
  transform: translateY(-8px);
}

@media screen and (max-width: 1024px) {
  .i-envelope {
    transform: scale(3);
  }
}
@media screen and (max-width: 600px) {
  .i-envelope {
    transform: scale(2);
  }
}
</style>