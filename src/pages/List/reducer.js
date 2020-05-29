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
    callApi("http://uqer.devops2.wmcloud-qa.com/mercury_trade/3.0/live_strategy?page=1&page_size=1000&name=&source=private&audit_status=&category=")
      .then(res => {
        console.log(res);
        dispatch(
          refreshProps({
            data: res.response.data
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
