import { callApi } from "utils/request";

const initialState = {
  data: [],
  filter: {
    page: 1,
    pageSize: 10
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REFRESH_PROPS":
      return {
        ...state,
        ...action.props
      };
    default:
      return state;
  }
};

export const getList = () => {
  return dispatch => {
    callApi("/mercury_trade/live_strategy?page=1&page_size=20")
      .then(res => {
        console.log(res);
        dispatch(
          refreshProps({
            data: res.response.list
          })
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const refreshProps = props => {
  return dispatch => {
    dispatch({
      type: "REFRESH_PROPS",
      props
    });
  };
};
