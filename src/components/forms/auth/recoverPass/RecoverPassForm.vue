<template>
  <main class="full-page-wrapper" v-if="!requestSent">
    <h1 class="-h2" style="font-family: 'Montserrat-Black'">Reset Password</h1>

    <div class="text-container">
      <p class="-ltr msg-container">
        Please enter your email address so we can send you a link to reset your
        password.
      </p>
    </div>

    <input
      type="text"
      placeholder="Enter your email address"
      ref="email"
      v-model="email"
      @blur="emailValidation('email', 'errMsgEmail')"
    />
    <p class="error-msg" ref="errMsgEmail">{{ errorMsgEmail }}</p>

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
  <main class="full-page-wrapper" v-else>
    <h1 class="-h2" style="font-family: 'Montserrat-Black'">Reset Password</h1>
    <div class="text-container">
      <p class="-ltr confirm-msg">
        A confirmation email has been sent to your email address. Follow the
        steps on this email to recover your password.
      </p>
    </div>
    <i class="i-envelope"> </i>
    <p class="-ntr check-msg">
      Be sure to check your spam box, sometimes email platforms consider this
      type of request as spam.
    </p>
  </main>
</template>

<script>
import { validateEmail } from "../../../../helpers/validator";
export default {
  data() {
    return {
      requestSent: false,
      email: "",
      errorMsgEmail: "Please enter a valid email",
      emailValidated: null,
    };
  },
  methods: {
    handleClick() {
      if (this.emailValidated) {
        // this.requestSent = true;
        alert("Coming Soon...");
      }
    },
    emailValidation(inputRef, msgRef) {
      this.emailValidated = validateEmail(this.email);
      if (this.emailValidated) {
        this.$refs[inputRef].style.borderColor = "var(--gray3)";
        this.$refs[msgRef].style.display = "none";
      } else {
        this.$refs[inputRef].style.borderColor = "var(--error)";
        this.$refs[msgRef].style.display = "flex";
      }
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
  height: 80%;
  gap: 16px;
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
.error-msg {
  margin-top: -72px;
}
/* PART 2 */

.i-envelope {
  align-self: center;
  animation: slide-in 500ms ease;
  animation-fill-mode: forwards;
}
.confirm-msg {
  width: 80%;
}
.check-msg {
  width: 60%;
  align-self: center;
  color: var(--info);
}
@media screen and (max-width: 1200px) {
  .full-page-wrapper {
    height: 100%;
  }
  .msg-container {
    width: 100%;
  }
  .confirm-msg {
    width: 100%;
    text-align: center;
  }
  .check-msg {
    text-align: center;
  }
}
@media screen and (max-width: 600px) {
  .nextsteps-container {
    flex-direction: column;
    gap: 16px;
  }
}
</style>