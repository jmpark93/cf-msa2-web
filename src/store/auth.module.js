import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,

  state: initialState,

  actions: {
    login({ commit }, user) {
      let result = AuthService.login(user).then(
        (response) => {
          commit("loginSuccess", response);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );

      // UserService.getProfile(state.user.id).then((response) => {
      //   commit("loadProfile", response);
      // });

      return result;
    },

    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },

    register({ commit }, objValue) {
      console.log("Image File(auth.module)" + objValue.imageFile);
      return AuthService.register(objValue.user, objValue.imageFile).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
  },

  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },

    loadProfile(state, values) {
      state.user.fullname = values.fullname;
      state.user.imageURL = values.imageURL;
    },

    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },

    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
