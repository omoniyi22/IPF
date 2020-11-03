const { SHOW_LOADER } = require("../types");

const showLoader = (isLoading = false) => {
  return {
    type: SHOW_LOADER, payload: isLoading
  };
};

const logoutUser = () => {
  localStorage.removeItem("x-access-token");
  localStorage.removeItem("ipf-user");
  window.location.reload();
};

export { showLoader, logoutUser };