import mutations from "./mutations";
import { useToast } from "vue-toastification";

const toast = useToast();

const state = () => ({
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    accessToken: localStorage.getItem("access_token") || null,
    roles: [], // New state for storing roles
    permissions: [], // New state for storing permissions
    loading: false,
    error: null,
});

const actions = {
    async login({ commit }, userData) {
        commit("loginBegin");
        try {
            const { user, access_token, roles, permissions } = userData;

            // Commit user data, roles, and permissions to the state
            commit("loginSuccess", { user, access_token });
            commit("setRoles", roles);
            commit("setPermissions", permissions);

            toast.success("Login Successful!");
        } catch (err) {
            commit("loginErr", err);
            toast.error("Login failed!");
        }
    },

    async logOut({ commit }) {
        commit("logoutBegin");
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            commit("logoutSuccess");
            toast.success("Logout Successful!");
        } catch (err) {
            commit("logoutErr", err);
            toast.error("Logout failed!");
        }
    },
};

export default {
    namespaced: false,
    state,
    actions,
    mutations,
};
