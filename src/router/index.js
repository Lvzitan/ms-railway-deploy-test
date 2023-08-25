import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
//===== GUARDS =====//

const requireAuth = (to, from, next) => {
  if (!store.state.user) {
    store.dispatch("user", null);
    router.push({ name: "Login" });
    next();
  } else {
    next();
  }
};

//removes project info from store if user is on a route where that info shouldnt exist
const removeProject = (to, from, next) => {
  if (!store.state.project) {
    next();
  } else {
    store.dispatch("project", null);
    next();
  }
};

//removes unit info if user is on a route where that info shouldnt exist
const removeUnit = (to, from, next) => {
  if (!store.state.unit) {
    next();
  } else {
    store.dispatch("unit", null);
    next();
  }
};

const requireProject = (to, from, next) => {
  if (store.state.project) {
    next();
  } else {
    router.push({ name: "Projects" });
    next();
  }
};

const requireUnit = (to, from, next) => {
  if (store.state.unit) {
    next();
  } else {
    router.push({ name: "Projects" });
    next();
  }
};
//=================//

const routes = [
  {
    path: "/",
    name: "Home",
    beforeEnter: removeUnit,
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    beforeEnter: removeUnit,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    beforeEnter: removeUnit,
    component: () =>
      import(/* webpackChunkName: "auth" */ "../views/auth/AuthContainer.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../components/forms/auth/login/LoginForm.vue"
          ),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "../components/forms/auth/register/RegisterForm.vue"
          ),
      },
      {
        path: "password-recovery",
        name: "RecoverPassword",
        component: () =>
          import(
            /* webpackChunkName: "recoverpassword" */ "../components/forms/auth/recoverPass/RecoverPassForm.vue"
          ),
      },
      {
        path: "new-password",
        name: "NewPassword",
        component: () =>
          import(
            /* webpackChunkName: "newpassword" */ "../components/forms/auth/recoverPass/NewPassword.vue"
          ),
      },
    ],
  },
  {
    path: "/projects",
    name: "Projects",
    beforeEnter: [removeProject, removeUnit, requireAuth],
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/Projects.vue"),
  },
  {
    path: "/project/:id/units",
    name: "Units",
    beforeEnter: [requireAuth, requireProject, removeUnit],
    component: () =>
      import(/* webpackChunkName: "units" */ "../views/Units.vue"),
  },

  {
    path: "/mscope",
    name: "MScope",
    beforeEnter: requireUnit,
    component: () =>
      import(/* webpackChunkName: "mscope" */ "../views/app/MScope.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/app/mscope/Dashboard.vue"
          ),
      },
      {
        path: "agents",
        name: "Agents",
        component: () =>
          import(
            /* webpackChunkName: "agents" */ "../views/app/mscope/Agents.vue"
          ),
      },
      {
        path: "squads",
        name: "Squads",
        component: () =>
          import(
            /* webpackChunkName: "squads" */ "../views/app/mscope/Squads.vue"
          ),
      },
      {
        path: "lifecycle",
        name: "Lifecycle",
        component: () =>
          import(
            /* webpackChunkName: "lifecycle" */ "../views/app/mscope/Lifecycle.vue"
          ),
      },
      {
        path: "deliverables",
        name: "Deliverables",
        component: () =>
          import(
            /* webpackChunkName: "deliverables" */ "../views/app/mscope/Deliverables.vue"
          ),
      },
      {
        path: "tasks",
        name: "Tasks",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "../views/app/mscope/Tasks.vue"
          ),
      },
      {
        path: "elements",
        name: "Elements",
        component: () =>
          import(
            /* webpackChunkName: "elements" */ "../views/app/mscope/Elements.vue"
          ),
      },
    ],
  },

  {
    path: "/msight",
    name: "MSight",
    beforeEnter: requireUnit,
    component: () =>
      import(/* webpackChunkName: "msight" */ "../views/app/MSight.vue"),
  },
  {
    path: "/msource",
    name: "MSource",
    beforeEnter: requireUnit,
    component: () =>
      import(/* webpackChunkName: "msource" */ "../views/app/MSource.vue"),
    children: [
      {
        path: "overview",
        name: "Overview",
        component: () =>
          import(
            /* webpackChunkName: "overview" */ "../views/app/msource/Overview.vue"
          ),
      },
      {
        path: "generate_document",
        name: "Generate_Document",
        component: () =>
          import(
            /* webpackChunkName: "generate_document" */ "../views/app/msource/Generate_Document.vue"
          ),
      },
      {
        path: "workflows",
        name: "Workflows",
        component: () =>
          import(
            /* webpackChunkName: "workflows" */ "../views/app/msource/Workflows.vue"
          ),
      },
      {
        path: "information_request",
        name: "Information_Request",
        component: () =>
          import(
            /* webpackChunkName: "information_request" */ "../views/app/msource/Information_Request.vue"
          ),
      },
      {
        path: "nonconforming",
        name: "Nonconforming",
        component: () =>
          import(
            /* webpackChunkName: "nonconforming" */ "../views/app/msource/Nonconforming.vue"
          ),
      },
      {
        path: "labels",
        name: "Labels",
        component: () =>
          import(
            /* webpackChunkName: "labels" */ "../views/app/msource/Labels.vue"
          ),
      },
      {
        path: "upload-file",
        name: "UploadFile",
        component: () =>
          import(
            /* webpackChunkName: "upload-file" */ "../components/modals/msource/SourceModalUploadFile.vue"
          ),
      },
    ],
  },
  {
    path: "/organizations",
    name: "Organizations",
    redirect: "/organizations/search",
    beforeEnter: [requireAuth, removeUnit, removeProject],
    component: () =>
      import(
        /* webpackChunkName: "organizations" */ "../views/Organizations.vue"
      ),
    children: [
      {
        path: "create",
        name: "CreateOrganization",
        component: () =>
          import(
            /* webpackChunkName: "createorganization" */ "../views/organizations/CreateOrganization.vue"
          ),
      },
      {
        path: "search",
        name: "OrgsListing",
        component: () =>
          import(
            /* webpackChunkName: "orgslisting" */ "../views/organizations/OrgsListing.vue"
          ),
      },
      {
        path: "show/:id",
        name: "ShowOrganization",
        redirect: { name: "OrgManagement" },
        component: () =>
          import(
            /* webpackChunkName: "showorganization" */ "../views/organizations/ShowOrganization.vue"
          ),
        children: [
          {
            path: "management",
            name: "OrgManagement",
            component: () =>
              import(
                /* webpackChunkName: "orgmanagement" */ "../components/organizations/OrgManagement.vue"
              ),
          },
          {
            path: "details",
            name: "OrgDetails",
            component: () =>
              import(
                /* webpackChunkName: "orgdetails" */ "../components/organizations/OrgDetails.vue"
              ),
          },
          {
            path: "privacy",
            name: "OrgPrivacy",
            component: () =>
              import(
                /* webpackChunkName: "orgprivacy" */ "../components/organizations/OrgPrivacy.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/my-profile",
    name: "UserProfile",
    redirect: { name: "UpdateProfile" },
    beforeEnter: [requireAuth, removeUnit, removeProject],
    component: () =>
      import(/* webpackChunkName: "myprofile" */ "../views/UserProfile.vue"),
    children: [
      {
        path: "update",
        name: "UpdateProfile",
        component: () =>
          import(
            /* webpackChunkName: "updateprofile" */ "../views/users/UpdateUserProfile.vue"
          ),
      },
    ],
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
