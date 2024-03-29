import { combineReducers } from "redux";
import { LOCATION_CHANGE } from "react-router-redux";

const initialState = {
  location: null
};

function routeReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload
      };

    default:
      return state;
  }
}

export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    ...asyncReducers
  });
}
