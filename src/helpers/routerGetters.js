import router from "../router/index";

export const getRouteName = () => router.currentRoute._value.name.toLowerCase();
