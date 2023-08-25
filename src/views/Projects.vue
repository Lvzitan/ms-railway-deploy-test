<template>
  <main class="projects-view">
    <section class="user-info"><UserInfo /></section>
    <section class="welcome">
      <h4 class="-h4">Welcome,</h4>
      <p class="-ntr">Select one of your {{ welcomeMsg }}</p>
    </section>

    <section class="new-project"><NewProject /></section>

    <section class="projects-list">
      <ProjectsListContainer :projects="projects" />
    </section>

    <section class="projects-summary">
      <ProjectsSummary />
    </section>
  </main>
</template>

<script>
import UserInfo from "../components/projects/UserInfo.vue";
import ProjectsListContainer from "../components/projects/ProjectsListContainer.vue";
import NewProject from "../components/projects/NewProject.vue";
import ProjectsSummary from "../components/projects/ProjectsSummary.vue";

export default {
  components: {
    UserInfo,
    ProjectsListContainer,
    NewProject,
    ProjectsSummary,
  },
  data() {
    return {
      welcomeMsg: "projects",
      projects: [
        {
          id: 1,
          project_name: "Northern Office Complex",
          units_size: 3,
          project_admin: "Andrew Armstrong",
          group: "B&M",
          ref: "NOC.117",
          imagePath:
            "https://media.discordapp.net/attachments/928228506939297852/1029694481852801054/kaleb-tapp-1deQbU6DhBg-unsplash.jpg?width=864&height=671",
        },
        {
          id: 2,
          project_name: "Douro Crossing Metro Bridge",
          units_size: 2,
          project_admin: "Porto Metro",
          group: "Porto Metro",
          ref: "DCMB.01",
          imagePath:
            "https://www.metrodoporto.pt/thumbs/metrodoporto/uploads/news/image/401/imagem1_1_980_2500.png",
        },
        {
          id: 3,
          project_name: "Green Life Hotel",
          units_size: 1,
          project_admin: "João Aleixo",
          group: "RS Prime",
          ref: "GLH.419",
          imagePath:
            "https://media-cdn.tripadvisor.com/media/photo-s/16/f1/3b/9d/getlstd-property-photo.jpg",
        },
        {
          id: 4,
          project_name: "Highway",
          units_size: 1,
          project_admin: "João Ribeiro",
          group: "",
          ref: "NB34.5",
          imagePath:
            "https://images.unsplash.com/photo-1520594923568-1b5d82587f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
      ],
    };
  },
};
</script>

<style scoped>
.projects-view {
  display: grid;
  height: 100%;
  width: 100%;
  gap: 16px;
  grid-template-columns: repeat(6, 1fr);
  /* grid-template-rows: repeat(12, 1fr); */
  padding-inline: 4px;
  padding-top: 4px;
}
.user-info {
  grid-column: 1 / span 1;
  grid-row: 1 / span 5;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  align-self: start;
  padding-top: 4px;
}
.searchbar-container {
  grid-column: 1 / span 1;
  grid-row: span 1;
  align-self: flex-end;
  justify-self: left;
  width: 240px;
  height: 40px;
}
.new-project {
  grid-column: 1 / span 1;
  grid-row: span 1;
}
.projects-summary {
  grid-column: 1 / span 1;
  grid-row: span 2;
}

.welcome {
  grid-column: 2 / span 5;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding-inline: 1rem;
}
.welcome p {
  padding-block: 1rem;
}
.projects-list {
  grid-column: 2 / span 7;
  grid-row: 3 / span 9;
}

.logo {
  grid-column: 2 / span 2;
  grid-row: 9 / span 3;
  background-image: url("../assets/temp/temp-logo.svg");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.25;
  transform: scale(0.85);
}

@media screen and (max-width: 1024px) {
  .projects-view {
    display: flex;
    flex-direction: column;
    padding: 32px;
    overflow-x: hidden;
    gap: 32px;
  }
  .user-info {
    flex-direction: row;
    grid-column: span 6;
    order: 2;
    justify-content: space-evenly;
    gap: 16px;
  }
  .welcome {
    order: 1;
  }
  .searchbar-container {
    order: 6;
    align-self: center;
  }
  .projects-summary {
    order: 5;
    align-self: center;
  }
  .projects-list {
    order: 7;
    align-self: center;
  }
  .new-project {
    order: 8;
    align-self: center;
  }
}
</style>