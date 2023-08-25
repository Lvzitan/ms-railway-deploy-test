<template>
  <section class="logo-container">
    <div class="base-outer-ms">
      <div class="base-inner-ms"></div>
      <i class="i-logo"></i>

      <div class="unified">
        <p class="-ltb">UNIFY</p>
        <i class="i-button-source"></i>
      </div>

      <div class="simplified">
        <i class="i-button-eye"></i>
        <p class="-ltb">SIMPLIFY</p>
      </div>

      <div class="amplified">
        <i class="i-button-box"></i>
        <p class="-ltb">AMPLIFY</p>
      </div>
    </div>

    <div class="elipse-base-ms-rotate"></div>
    <div class="elipse-base-ms"></div>
  </section>

  <section class="msg-container">
    <p>DIGITAL MANAGEMENT SOLUTIONS</p>
    <p>FOR THE<span class="aeco">AECO</span>INDUSTRY</p>
    <router-link :to="{ name: 'Projects' }" class="link join-btn">
      <p>Join Us</p>
    </router-link>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.logo-container {
  height: 900px;
  width: 900px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 64px;
  transform: scale(0.9);
}
.base-outer-ms {
  position: absolute;
  z-index: 1 !important;
  /* box-shadow: var(--highlight) 0px 0px 0px 2px; */
  border: 2px solid var(--highlight);
  height: 325px;
  width: 325px;
  border-radius: 50px;
  transform: rotateZ(60deg) skewY(150deg);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: inner-pulse 5s ease-out infinite;
}
.base-inner-ms {
  border: inherit;
  /* box-shadow: inherit; */
  border-radius: inherit;
  height: 250px;
  width: 250px;
  border-radius: 40px;
  animation: inner-pulse 5s linear infinite;
}
.elipse-base-ms-rotate {
  position: absolute;
  z-index: 0 !important;
  border: 1px solid var(--highlight);
  width: 260px;
  height: 260px;
  border-radius: 50%;
  transform: scale(2.5);
  animation: rotate 10s linear 130ms infinite, glow 5s linear 130ms infinite;
}
.elipse-base-ms {
  position: absolute;
  z-index: 0 !important;
  border: 1px solid var(--highlight);
  width: 260px;
  height: 260px;
  border-radius: 50%;
  transform: scale(2.5);
  animation: glow 5s linear 130ms infinite;
}
.base-outer-ms > .i-logo {
  position: absolute;
  filter: drop-shadow(1px 1px 1px rgb(26, 26, 26));
  left: 30%;
  top: 25%;
  transform: skewY(-150deg) rotateZ(-60deg) scale(10);
  filter: saturate(80%);
}

/*=== UNSKEW AND UNROTATE ===*/
.base-outer-ms > .unified,
.base-outer-ms > .simplified,
.base-outer-ms > .amplified {
  position: absolute;
  transform: skewY(-150deg) rotateZ(-60deg);
  z-index: 1 !important;
}

/*=== POSITIONS ===*/
.base-outer-ms > .unified {
  top: -95%;
  left: -65%;
}
.base-outer-ms > .simplified {
  top: 130%;
  left: 50%;
}
.base-outer-ms > .amplified {
  top: 35%;
  left: 130%;
}

.unified,
.simplified,
.amplified {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  transition: transform 150ms ease-in-out;
}
.-ltb {
  font-family: "Inter-Black";
  color: var(--secondary);
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--primary);
  transform: scale(2.25);
}
.-ltb::first-letter {
  font-size: 1.5rem;
}
.i-button-box {
  transform: rotateZ(-8deg) scale(8);
}
.i-button-eye {
  transform: scale(8);
}
.i-button-source {
  transform: scale(8);
}
.i-line {
  transform: scale(6.5);
}

/*********** ver depois - alguma coisa errada ao definir posicoes ***********/
.msg-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  right: 2rem;
  height: 100%;
  width: 50%;
}
.msg-container p {
  color: var(--white1);
  font-family: "Montserrat-Black";
  font-size: 48px;
  text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
  padding-block: 8px;
  display: flex;
  text-align: right;
  white-space: nowrap;
}
.aeco {
  color: var(--secondary);
  padding-inline: 1rem;
  font-size: 58px;
  line-height: 52px;
}
.join-btn {
  background: rgb(11, 112, 248);
  background: linear-gradient(
    175deg,
    rgba(11, 112, 248, 1) 0%,
    rgba(53, 37, 152, 1) 100%
  );
  padding-inline: 3rem;
  padding-block: 0.66rem;
  border-radius: 64px;
  transition: transform 150ms ease-in-out;
  cursor: pointer;
}
.join-btn p {
  font-family: "Montserrat-ExtraBold";
  font-size: 38px;
}
/*===== EFFECTS =====*/

.unified:hover,
.simplified:hover,
.amplified:hover {
  transform: scale(1.15) skewY(-150deg) rotateZ(-60deg);
}
.join-btn:hover {
  transform: translateY(-8px);
}

@keyframes glow {
  5%,
  80% {
    box-shadow: var(--highlight) 0px 0px 10px 5px inset,
      var(--highlight) 0px 0px 10px 5px;
    border-color: white;
  }
}

/* repensar */
@keyframes rotate {
  0% {
    transform: rotateY(0) rotateX(0) scale(2.5);
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    transform: rotateY(360deg) rotateX(360deg) scale(2.5);
  }
}

@keyframes pulse {
  5% {
    box-shadow: 0 0 50px 35px var(--highlight);
  }
  13% {
    border-color: white;
  }
  20% {
    box-shadow: 0 0 40px 25px var(--highlight);
  }
  50% {
    box-shadow: 0 0 30px 10px var(--highlight);
  }
  100% {
    box-shadow: 0 0 20px 5px rgba(0, 208, 255, 0);
  }
}
@keyframes inner-pulse {
  5%,
  15% {
    box-shadow: 0 0 50px 25px var(--highlight);
    border-color: white;
  }
  /* 35% {
    box-shadow: 0 0 50px 5px transparent;
    border-color: var(--highlight);
  } */
  45%,
  80% {
    box-shadow: 0 0 50px 25px var(--highlight);
    border-color: white;
  }
  100% {
    box-shadow: 0 0 50px 5px transparent;
    border-color: var(--highlight);
  }
}

@media screen and (max-width: 1600px) {
  .logo-container {
    transform: scale(0.65);
  }
  .msg-container {
    transform: scale(0.65);
  }
}
@media screen and (max-width: 1280px) {
  .logo-container {
    transform: scale(0.45);
  }
  .msg-container {
    transform: scale(0.45);
  }
}

@media screen and (max-width: 980px) {
  .logo-container {
    height: 900px;
    width: 900px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 256px;
    transform: scale(0.65);
  }
  .msg-container {
    transform: scale(0.65);
    justify-content: center;
    align-items: center;
    right: 0;
    width: 100%;
  }
  .join-btn {
    align-self: center;
    margin-top: 1rem;
  }
}
@media screen and (max-width: 660px) {
  .logo-container {
    transform: scale(0.5);
  }
  .msg-container {
    transform: scale(0.45);
  }
}
@media screen and (max-width: 420px) {
  .logo-container {
    transform: scale(0.4);
  }
  .msg-container {
    transform: scale(0.35);
  }
}
</style>