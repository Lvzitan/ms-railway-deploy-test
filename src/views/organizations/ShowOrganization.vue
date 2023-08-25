<template>
  <main class="page-container">
    <section class="content-wrapper flex-column align-start gap16">
      <p class="-xltb title">My Organization</p>
      <p class="-ltb title">{{ selectedOrg.name }}</p>

      <TabSelector :routerTabs="routerTabs" />

      <section class="width-full height-full">
        <router-view />
      </section>
    </section>
  </main>
</template>

<script>
import TabSelector from "../../components/utils/TabSelector.vue";
export default {
  props: ["organization"],
  components: {
    TabSelector,
  },
  data() {
    return {
      ORGANIZATIONID: parseInt(this.$route.params.id),
      selectedOrg: null,
      routerTabs: [
        {
          slug: "Management",
          name: "OrgManagement",
        },
        {
          slug: "Details",
          name: "OrgDetails",
        },
        {
          slug: "Privacy",
          name: "OrgPrivacy",
        },
      ],
      //TEMP
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
    };
  },
  created() {
    if (!this.orgs.find((org) => org.id === this.ORGANIZATIONID)) {
      this.$router.push({ name: "OrgsListing" });
    }

    this.selectedOrg = this.orgs.find((org) => org.id === this.ORGANIZATIONID);
  },
};
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  padding-inline: 16px;
  padding-block: 8px;
}
.-ltb.title {
  color: var(--info);
  font-family: "Montserrat-Black";
}

.content-wrapper {
  width: 100%;
  min-height: 100%;
  padding-inline: 2.5vw;
  padding-block: 8px;
  border-radius: 8px;
  background: var(--white1);
}
.content-wrapper > p {
  font-family: "Montserrat-Bold";
  margin-bottom: 8px;
}

@media screen and (max-width: 767px) {
  .page-container {
    padding: 0;
  }
  .content-wrapper {
    padding-inline: 5vw;
    border-radius: 0;
  }
}

@media screen and (max-width: 399px) {
  .content-wrapper {
    padding-inline: 8px;
  }
}
</style>