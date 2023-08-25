import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });

// export default createStore({
const store = createStore({
  state: {
    user: {
      name: "Andrew Armstrong",
      firstName: "Andrew",
      lastName: "Armstrong",
      email: "aarmstrong@ms4aeco.com",
    },
    project: null,
    unit: null,
    sidenavOpened: false,
    // *** SCOPE *** //
    stages: null,
    currentStage: 0,
    selectedStages: [],
    scopeModal: {
      cmd: null,
      scope: null,
      item: null,
    },
    // *** SIGHT *** //
    loadIFC: false,
    msightLink: null,
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    project(state, project) {
      state.project = project;
    },
    stages(state, stages) {
      state.stages = stages;
    },
    currentStage(state, currentStage) {
      state.currentStage = currentStage;
    },
    selectedStages(state, selectedStages) {
      state.selectedStages = selectedStages;
    },
    sidenavOpened(state, sidenavOpened) {
      state.sidenavOpened = sidenavOpened;
    },
    unit(state, unit) {
      state.unit = unit;
    },
    // *** SCOPE *** //
    scopeModal(state, scopeModal) {
      state.scopeModal = scopeModal;
    },
    // *** SIGHT *** //
    loadIFC(state, loadIFC) {
      state.loadIFC = loadIFC;
    },
    msightLink(state, msightLink) {
      state.msightLink = msightLink;
    },
    logout(state) {
      state.user = null;
      state.project = null;
      state.unit = null;
      state.sidenavOpened = false;
      state.stages = null;
      state.currentStage = 0;
      state.selectedStages = [];
      state.scopeModal = {
        cmd: null,
        scope: null,
        item: null,
      };
      state.loadIFC = false;
      state.msightLink = null;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    project(context, project) {
      context.commit("project", project);
    },
    stages(context, stages) {
      context.commit("stages", stages);
    },
    currentStage(context, currentStage) {
      context.commit("currentStage", currentStage);
    },
    selectedStages(context, selectedStages) {
      context.commit("selectedStages", selectedStages);
    },
    sidenavOpened(context, sidenavOpened) {
      context.commit("sidenavOpened", sidenavOpened);
    },
    unit(context, unit) {
      context.commit("unit", unit);
    },
    // *** SCOPE *** //
    scopeModal(context, scopeModal) {
      context.commit("scopeModal", scopeModal);
    },
    // *** SIGHT *** //
    loadIFC(context, loadIFC) {
      context.commit("loadIFC", loadIFC);
    },
    msightLink(context, msightLink) {
      context.commit("msightLink", msightLink);
    },
    logout(context) {
      context.commit("logout");
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    project: (state) => {
      return state.project;
    },
    stages: (state) => {
      return state.stages;
    },
    currentStage: (state) => {
      return state.currentStage;
    },
    selectedStages: (state) => {
      return state.selectedStages;
    },
    sidenavOpened: (state) => {
      return state.sidenavOpened;
    },
    unit: (state) => {
      return state.unit;
    },
    scopeModal: (state) => {
      return state.scopeModal;
    },
    // *** SIGHT *** //
    loadIFC: (state) => {
      return state.loadIFC;
    },
    msightLink: (state) => {
      return state.msightLink;
    },
  },
  modules: {},

  // plugins: [createPersistedState()]
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});

export default store;
