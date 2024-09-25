import apiClient from "@/axios";
import { createStore } from "vuex";

const savedToken = localStorage.getItem("token");

const state = {
  user: null,
  token: savedToken || null,
};

const mutations = {
  SET_USER(state, payload) {
    state.user = payload.user;
    state.token = payload.token;
    localStorage.setItem("token", payload.token);
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem("token");
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await apiClient.post("/users/auth", {
        email,
        password,
      });
      commit("SET_USER", {
        user: response.data.user,
        token: response.data.access_token,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  },
  async register({ commit }, userData) {
    try {
      const response = await apiClient.post(
        "http://localhost:3000/users",
        userData
      );
      console.log("response", response.data);
      commit("SET_USER", {
        user: response.data.user,
        token: response.data.access_token,
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  },
  logout({ commit }) {
    commit("LOGOUT");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
};

const store = createStore({ getters, mutations, actions, state });

export default store;

// export default createStore({
//   state: {
//     user: null,
//     token: null,
//   },
//   mutations: {
//     SET_USER(state, payload) {
//       state.user = payload.user;
//       state.token = payload.token;
//     },
//     LOGOUT(state) {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   actions: {
//     async login({ commit }, { email, password }) {
//       try {
//         const response = await axios.post("/users/auth", {
//           email,
//           password,
//         });
//         commit("SET_USER", {
//           user: response.data.user,
//           token: response.data.access_token,
//         });
//       } catch (error) {
//         console.error("Erro ao fazer login:", error);
//       }
//     },
//     async register({ commit }, userData) {
//       try {
//         const response = await axios.post(
//           "http://localhost:3000/users",
//           userData
//         );
//         console.log("response", response.data);
//         commit("SET_USER", {
//           user: response.data.user,
//           token: response.data.access_token,
//         });
//       } catch (error) {
//         console.error("Erro ao registrar usuário:", error);
//       }
//     },
//     logout({ commit }) {
//       commit("LOGOUT");
//     },
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.token,
//   },
// });
