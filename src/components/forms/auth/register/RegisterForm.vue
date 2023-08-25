<template>
  <main class="full-page-wrapper" v-if="!requestSent">
    <h1 class="-h2">Create Account</h1>
    <div class="name-container">
      <input
        ref="firstName"
        type="text"
        placeholder="First Name"
        class="-ntr"
        v-model="firstName"
        @blur="fillBg('firstName', firstName)"
      />
      <input
        ref="lastName"
        type="text"
        placeholder="Last Name"
        class="-ntr"
        v-model="lastName"
        @blur="fillBg('lastName', lastName)"
      />
    </div>
    <input
      ref="email"
      type="text"
      placeholder="Email"
      class="-ntr"
      v-model="email"
      @blur="
        [emailValidation(['email'], ['errMsgEmail']), fillBg('email', email)]
      "
    />
    <p class="-xstb error-msg" ref="errMsgEmail">{{ errMsgEmail }}</p>
    <input
      ref="password"
      type="password"
      placeholder="Password"
      class="-ntr"
      v-model="password"
      @blur="
        [
          passwordValidation(
            ['password', 'confirmPassword'],
            ['errMsgPassword', 'errMsgConfirmPassword']
          ),
          fillBg('email', email),
        ]
      "
    />
    <p class="-xstb error-msg" ref="errMsgPassword">{{ errMsgPassword }}</p>
    <input
      ref="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      class="-ntr"
      v-model="confirmPassword"
      @blur="
        [
          passwordValidation(
            ['password', 'confirmPassword'],
            ['errMsgPassword', 'errMsgConfirmPassword']
          ),
          fillBg('confirmPassword', confirmPassword),
        ]
      "
    />
    <p class="-xstb error-msg" ref="errMsgConfirmPassword">
      {{ errMsgPassword }}
    </p>

    <div class="terms-container">
      <input type="checkbox" id="terms-checkbox" style="cursor: pointer" />
      <p style="user-select: none" class="-stb">
        I agree to the
        <span class="-ntb" id="terms">Terms & Conditions</span> and
        <span class="-ntb" id="policy">Privacy Policy</span>
      </p>
    </div>

    <div class="btn-register" @click="handleClick()">
      <p class="-ntb">Register</p>
    </div>
    <p class="-stb" style="align-self: center">
      Already have an account? Log in
      <router-link :to="{ name: 'Login' }" id="here">here</router-link>
    </p>
  </main>
  <main v-else class="confirm-container"><VerifyAccount /></main>
</template>

<script>
import {
  validateEmail,
  validateBasicType,
  validateLength,
} from "../../../../helpers/validator";
import VerifyAccount from "./VerifyAccount.vue";
export default {
  components: {
    VerifyAccount,
  },
  data() {
    return {
      requestSent: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      //validations
      emailValidated: false,
      passwordValidated: false,
      // error messages
      errMsgEmail: "Please enter a valid email.",
      errMsgPassword: "Teste Pass",
      errMsgConfirmPassword: "Teste Confirm Pass",
    };
  },
  methods: {
    handleClick() {
      const validation =
        this.emailValidated && this.passwordValidated ? true : false;

      if (validation) {
        // this.requestSent = true;
        alert("Coming Soon...");
      }
    },
    emailValidation(inputRef, msgRef) {
      this.emailValidated = validateEmail(this.email);
      this.toggleErrorEffects(this.emailValidated, inputRef, msgRef);
    },

    passwordValidation(inputRef, msgRef) {
      if (this.password.length > 0 && this.confirmPassword.length > 0) {
        const passValidationLength = validateLength(this.password, 8, 24);

        this.passwordValidated = validateBasicType(
          this.password,
          this.confirmPassword
        );

        if (!passValidationLength) {
          this.errMsgPassword =
            "Your password must be between 8 and 24 characters long!";
          this.toggleErrorEffects(passValidationLength, inputRef, msgRef);
        } else if (!this.passwordValidated) {
          this.errMsgPassword = "Your passwords must be the same!";
          this.toggleErrorEffects(this.passwordValidated, inputRef, msgRef);
        } else {
          this.toggleErrorEffects(this.passwordValidated, inputRef, msgRef);
        }
      }
    },
    toggleErrorEffects(refState, inputRefArray, msgRefArray) {
      if (!refState) {
        for (let i = 0; i < inputRefArray.length; i++) {
          this.$refs[inputRefArray[i]].style.borderColor = "var(--error)";
          this.$refs[msgRefArray[i]].style.display = "flex";
        }
      } else {
        for (let i = 0; i < inputRefArray.length; i++) {
          this.$refs[inputRefArray[i]].style.borderColor = "var(--gray3)";
          this.$refs[msgRefArray[i]].style.display = "none";
        }
      }
    },
    fillBg(ref, element) {
      if (element.length > 0) {
        this.$refs[ref].classList.add("fill");
      } else {
        this.$refs[ref].classList.remove("fill");
      }
    },
  },
};
</script>

<style scoped>
.full-page-wrapper {
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-inline: 10%;
  padding-block: 16px;
}
.-h2 {
  font-family: "Montserrat-Black";
  letter-spacing: 1px;
}
input[type="text"],
input[type="password"] {
  padding: 14px;
  width: 100%;
  border: 1px solid var(--gray5);
  border-radius: 4px;
  letter-spacing: 1px;
}
.name-container {
  display: flex;
  width: 100%;
  gap: 50px;
  justify-content: space-between;
}
.terms-container {
  display: flex;
  gap: 16px;
  align-self: center;
  color: var(--gray3);
}
.terms-container span {
  color: var(--black3);
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
.btn-register {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: var(--secondary);
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  gap: 8px;
  align-self: center;
  font-family: "Montserrat-ExtraBold";
  letter-spacing: 1px;
  transition: 200ms ease;
}
.btn-register p {
  font-size: 32px;
}
#here {
  color: var(--highlight);
  filter: brightness(70%);
  user-select: none;
  cursor: pointer;
  text-decoration: underline;
  transition: 200ms ease;
}
.fill {
  background: rgba(0, 76, 255, 0.15);
}

.confirm-container {
  position: relative;
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
}
/*=== EFFECTS ===*/
input[type="text"]:focus,
input[type="password"]:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
  outline: none;
}
.error-msg {
  margin-top: -18px;
}
.btn-register:hover {
  transform: scale(1.1);
  filter: brightness(110%);
}
#here:hover {
  display: inline-block;
  transform: translateY(-2px);
}
#terms:hover {
  color: var(--highlight);
  filter: brightness(70%);
  user-select: none;
  cursor: pointer;
  text-decoration: underline;
  transition: 200ms ease;
}
#policy:hover {
  color: var(--highlight);
  filter: brightness(70%);
  user-select: none;
  cursor: pointer;
  text-decoration: underline;
  transition: 200ms ease;
}
@media screen and (max-width: 1024px) {
  .full-page-wrapper > p {
    width: 95%;
  }
}
</style>