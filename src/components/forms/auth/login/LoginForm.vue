<template>
  <main class="full-page-wrapper">
    <h1 class="-h2">Log in</h1>
    <p class="-ltr">Access with your credentials to manage your projects.</p>
    <div class="input-container">
      <input
        type="text"
        placeholder="Enter your email address"
        class="-ntr"
        v-model.trim="email"
        ref="emailRef"
        @keyup.enter="
          [blurElement('emailRef'), handleClick(['emailRef', 'passwordRef'])]
        "
        @focus="removeErr('emailRef')"
      />
      <p class="-xstb error-msg">{{ emailErrMsg }}</p>
      <input
        type="password"
        placeholder="Enter your password"
        class="-ntr"
        v-model.trim="password"
        ref="passwordRef"
        @keyup.enter="
          [blurElement('passwordRef'), handleClick(['emailRef', 'passwordRef'])]
        "
        @focus="removeErr('passwordRef')"
      />
      <p class="-xstb error-msg">{{ passwordErrMsg }}</p>
    </div>

    <div class="flex-2">
      <p class="forgot-pass -ntr" @click="routerPush('RecoverPassword')">
        Forgot Password ?
      </p>
    </div>

    <div class="btn-next" @click="handleClick(['emailRef', 'passwordRef'])">
      <p class="-ntb">Log in</p>
      <i class="i-arrow-right"></i>
    </div>
    <hr />
    <p class="-ntr" style="align-self: center">No account yet?</p>

    <router-link :to="{ name: 'Register' }" class="btn-register">
      <p class="-ntb">Register</p>
    </router-link>
  </main>
</template>

<script>
import { validateEmail } from "../../../../helpers/validator";
import {
  addErrInputText,
  removeErrInputText,
} from "../../../../helpers/styleToggler";
export default {
  data() {
    return {
      email: "",
      password: "",
      emailErrMsg: "",
      passwordErrMsg: "",
    };
  },

  //TEMP FOR BIMWORLD
  beforeCreate() {
    const u = {
      name: "Andrew Armstrong",
      firstName: "Andrew",
      lastName: "Armstrong",
      email: "aarmstrong@ms4aeco.com",
    };
    this.$store.dispatch("user", u);

    this.$router.push({ name: "Projects" });
  },
  //TEMP FOR BIMWORLD

  methods: {
    handleClick(arrayOfRefs) {
      const domElEmail = this.$refs[arrayOfRefs[0]];
      const domElPassword = this.$refs[arrayOfRefs[1]];
      const tempUser = {
        email: "freis@bm.net",
        password: "admin2021",
      };
      const emailValidation = validateEmail(this.email);

      if (
        emailValidation &&
        this.email === tempUser.email &&
        this.password === tempUser.password
      ) {
        const u = { name: "Francisco Reis", email: "freis@bm.net" };
        this.$store.dispatch("user", u);
        this.$router.push({ name: "Projects" });
      } else {
        if (!emailValidation) {
          this.setEmailErrMsg(domElEmail);
          addErrInputText(domElEmail);
        } else if (emailValidation && this.email !== tempUser.email) {
          this.setEmailErrMsg(domElEmail);
          addErrInputText(domElEmail);
        }

        if (!this.password) {
          this.setPasswordErrMsg(domElPassword);
          addErrInputText(domElPassword);
        } else if (
          this.email === tempUser.email &&
          this.password !== tempUser.password
        ) {
          this.setPasswordErrMsg(domElPassword);
          addErrInputText(domElPassword);
        }
      }
    },

    routerPush(routeName) {
      this.$router.push({ name: routeName });
    },
    blurElement(ref) {
      const domElement = this.$refs[ref];
      domElement.blur();
    },
    setPasswordErrMsg() {
      this.password === ""
        ? (this.passwordErrMsg = "Please enter your password.")
        : (this.passwordErrMsg =
            "Your email and password do not match. Please try again.");
    },
    setEmailErrMsg() {
      this.email === ""
        ? (this.emailErrMsg = "Please enter a valid email.")
        : validateEmail(this.email)
        ? (this.emailErrMsg =
            "This email is not registered, please contact our support team")
        : (this.emailErrMsg = "Please enter a valid email.");
    },
    removeErr(ref) {
      removeErrInputText(this.$refs[ref]);
    },
    // handleClick(arrayOfRefs) {
    //   const emailValidation = validateEmail(this.email);

    //   if (emailValidation && this.password !== "") {
    //     //login code and then
    //     //if res 400 setPasswordErrMsg()--- nao esquecer
    //     this.$router.push({ name: "Projects" });
    //     return;
    //   }

    //   //output outest layer errors in basic validation before api request
    //   let domElements = [];
    //   arrayOfRefs.forEach((ref) => {
    //     const domRef = this.$refs[ref];
    //     if (domRef.value === "") domElements.push(domRef);
    //   });

    //   this.setPasswordErrMsg();

    //   if (!emailValidation) {
    //     addErrInputText(this.$refs.email);
    //     return;
    //   } else {
    //     domElements.forEach((el) => {
    //       addErrInputText(el);
    //     });
    //   }
    // },
  },
};
</script>

<style scoped>
.full-page-wrapper {
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-inline: 10%;
}
.-h2 {
  font-family: "Montserrat-Black";
  letter-spacing: 1px;
}
.-ltr {
  width: 55%;
  text-align: left;
  letter-spacing: 1px;
}

.input-container {
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.input-container > input {
  padding: 16px;
  width: 100%;
  border: 1px solid var(--gray5);
  border-radius: 4px;
}
.flex-2 {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
input[type="text"],
input[type="password"] {
  outline: none;
}
input[type="text"]:focus,
input[type="password"]:focus {
  letter-spacing: 1px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

/**EFFECTS **/
input[type="text"]:focus,
input[type="password"]:focus {
  border-color: var(--focus1);
  box-shadow: 0 0 1px 3px var(--focus2);
}

.forgot-pass {
  cursor: pointer;
  color: rgb(70, 153, 255);
}
.forgot-pass:hover {
  color: var(--highlight);
}
.btn-next,
.btn-register {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background: var(--secondary);
  width: 200px;
  padding: 12px;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  gap: 8px;
  align-self: center;
  font-family: "Montserrat-ExtraBold";
  letter-spacing: 1px;
  transition: 200ms ease;
}
.btn-register {
  width: 225px;
  padding: 14px;
  background: var(--highlight);
  text-decoration: none;
}
.btn-register p {
  color: white;
}
.i-arrow-right {
  transform: scale(0.7);
}
hr {
  border: none;
  width: 95%;
  border-top: 1px solid var(--gray4);
}

/*=== EFFECTS ===*/
.btn-next:hover {
  transform: translateX(16px);
  filter: brightness(110%);
}
.btn-register:hover {
  transform: scale(1.1);
  filter: brightness(110%);
}

@media screen and (max-width: 1024px) {
  .full-page-wrapper > p {
    width: 95%;
  }
}

@media screen and (max-width: 419px) {
  .full-page-wrapper > p {
    width: 100%;
  }
}
</style>