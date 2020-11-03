import { api, attachApiToken } from "../../services/api";

const companyDetailsSuccessAction = (payload) => {
  return { type: "GET_MY_COMPANY_DETAILS_SUCCESS", payload };
};

const getCompanyDetailsRequest = () => {
  return async (dispatch) => {
    try {
      const authApi = await attachApiToken(api);
      const response = await authApi.get("/company");
      if (!response.data && !response.data.data) {
        return;
      }
      dispatch(companyDetailsSuccessAction(response.data.data));
    } catch (error) {
      console.log("an occour don occur")
    }
  };
};

export { getCompanyDetailsRequest };
