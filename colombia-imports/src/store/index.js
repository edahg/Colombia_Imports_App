import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        login: null,
        userId: null
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setLogin(state, login){
            state.logint = login;
        }
    },
    actions: {
        autoLogin({ commit }) {
            console.log("autologin");
            let login = localStorage.getItem("login");
            if (login) {
                commit("setLogin", login);
                commit("setUserId", localStorage.getItem("userId"));
            }
            router.push({ name: 'home' }).catch(() => {});

        },
        salir({ commit }) {
            commit("setLogin", null);
            commit("setUserId", null);
            router.push({ name: 'home' });
        }
    },
    modules: {}
});