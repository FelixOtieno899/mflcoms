export default {
  loginBegin(state) {
      state.loading = true;
      state.error = null;
  },
  loginSuccess(state, { user, access_token }) {
      state.loading = false;
      state.user = user;
      state.accessToken = access_token;

      // Store user and access token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", access_token);
  },
  setRoles(state, roles) {
      state.roles = roles;
  },
  setPermissions(state, permissions) {
      state.permissions = permissions;
  },
  loginErr(state, err) {
      state.loading = false;
      state.error = err;
  },
  logoutBegin(state) {
      state.loading = true;
      state.error = null;
  },
  logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.roles = [];
      state.permissions = [];

      // Clear localStorage on logout
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
  },
  logoutErr(state, err) {
      state.loading = false;
      state.error = err;
  },
};
