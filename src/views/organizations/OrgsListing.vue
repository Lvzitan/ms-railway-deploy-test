<template>
  <main class="main-wrapper">
    <section class="cards-list">
      <section
        class="card"
        v-for="org in orgs"
        :key="org"
        @click="selectCompany(org)"
      >
        <img :src="org.logo" :alt="org.name" />
        <div class="info-wrapper">
          <div class="info">
            <p class="-ltb">{{ org.name }}</p>
            <p class="-stb">{{ org.sector }}</p>
            <p class="-xstr" :title="org.description">
              {{ filteredDesc(org.description) }}
            </p>
          </div>
          <div class="info-wrapper-bg"></div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      orgs: [
        {
          id: 1,
          name: "TNS",
          sector: "Structural Engineering",
          description:
            "TNS is a structural engineering consultancy firm that provides structural engineering services to the construction industry. We are a team of highly qualified and experienced structural engineers with a passion for structural engineering. We are committed to providing our clients with the best structural engineering services in the industry.",
          logo: require("../../assets/temp/orgs/tns.png"),
        },
        {
          id: 2,
          name: "B&M",
          sector: "AECO",
          description:
            "B&M develops and manages digital models for the production and optimization of working processes associated with the design, construction and maintenance of buildings, through specialized simulations and implementation of the latest information technologies, management strategies and collaborative working methods.",
          logo: require("../../assets/temp/orgs/bm.png"),
        },
        {
          id: 3,
          name: "IMArch",
          sector: "Architecture",
          description:
            "IMArch is a leading architectural practice in the Middle East, with offices in Dubai and Abu Dhabi. We are a team of architects, interior designers, urban designers, landscape architects, and graphic designers, who are passionate about creating innovative and sustainable design solutions.",
          logo: require("../../assets/temp/orgs/imarch.png"),
        },
        {
          id: 4,
          name: "DF",
          sector: "Contracts Administration",
          description:
            "DF is a leading provider of construction management and project controls services to the construction industry. DF provides a full range of services to the construction industry, including construction management, project controls, cost management, and claims management.",
          logo: require("../../assets/temp/orgs/df.png"),
        },
        {
          id: 5,
          name: "RS",
          sector: "AECO",
          description:
            "RS is a leading provider of construction management and project controls services to the construction industry. RS provides a full range of services to the construction industry, including construction management, project controls, cost management, and claims management.",
          logo: require("../../assets/temp/orgs/rs.png"),
        },
        {
          id: 6,
          name: "Zafir",
          sector: "Cost Consultant",
          description:
            "Zafir is a leading provider of construction management and project controls services to the construction industry. Zafir provides a full range of services to the construction industry, including construction management, project controls, cost management, and claims management.",
          logo: require("../../assets/temp/orgs/zafir.png"),
        },
      ],
      selectedCompany: null,
    };
  },
  methods: {
    filteredDesc(description) {
      return description.slice(0, 120) + " ...";
    },
    selectCompany(org) {
      this.$router.push({
        name: "ShowOrganization",
        params: { id: org.id },
      });

      //THIS WILL COME FROM API
      this.selectedCompany = org;
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-block: 16px;
  padding-inline: 10%;
  overflow: auto;
}
.cards-list {
  /* height: 100%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
}
.card {
  position: relative;
  z-index: 0;
  width: 280px;
  min-width: 280px;
  height: 380px;
  min-height: 380px;
  border-radius: 4px;
  overflow: hidden;
  padding: 16px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  user-select: none;
  transition: box-shadow 0.2s ease-in-out;
}
.card:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.card:hover img {
  scale: 1.1;
}
.card img {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
  transition: scale 100ms ease-in;
}
.info-wrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 4px;
  text-align: left;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px;
  outline: 1px solid rgba(255, 255, 255, 0.6);
  padding: 12px;
  align-self: flex-end;
  width: 100%;
  height: 152px;
  max-height: 152px;
  transition: transform 100ms ease-in;
}
.card:hover .info-wrapper {
  transform: translateY(-8px);
}
.info {
  overflow: hidden;
  position: relative;
  z-index: 1;
  width: 100%;
}
.info-wrapper-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
}
.info-wrapper p:first-child {
  padding-bottom: 8px;
  font-family: "Montserrat-Black";
  width: 100%;
}
.info-wrapper p:first-child::after {
  content: "\1F86D";
  position: absolute;
  right: 0;
  scale: 0.8;
}
.card:hover .info-wrapper p:first-child::after {
  color: var(--info);
}
.info-wrapper p:nth-child(2) {
  padding-bottom: 4px;
}

@media screen and (max-width: 739px) {
  .cards-list {
    justify-content: center;
  }
}
</style>