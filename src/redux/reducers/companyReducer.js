const GET_MY_COMPANY_DETAILS_REQUEST = "GET_MY_COMPANY_DETAILS_REQUEST";
const GET_MY_COMPANY_DETAILS_FAILED = "GET_MY_COMPANY_DETAILS_FAILED";
const GET_MY_COMPANY_DETAILS_SUCCESS = "GET_MY_COMPANY_DETAILS_SUCCESS";

const INITIAL_STATE = {
  companyData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MY_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        companyData: {
          ...action.payload
        },
      };

    default:
      return {
        ...state
      };
  }
};
