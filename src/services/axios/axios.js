import axios from "axios";
import store from "../../store/index";

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api`;

const apiClient = axios.create({
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers["Authorization"] = "Bearer " + store.getters.token;
  }
  return config;
});

// OVERALL ERROR HANDLING
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     switch (true) {
//       case error.response.status >= 500:
//         store.dispatch("serverError", true);
//         break;
//       // case error.response.status >= 400 && error.response.status < 500:
//       //   console.log('user side')
//       //   // store.dispatch('serverError', true)
//       //   break
//       default:
//         // console.log('defaulted')
//         // if (store.state.serverError) {
//         //   store.dispatch('serverError', false)
//         // }
//         break;
//     }
//   }
// );

export default apiClient;
