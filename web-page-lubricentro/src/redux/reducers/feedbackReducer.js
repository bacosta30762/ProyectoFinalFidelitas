// src/redux/reducers/feedbackReducer.js

import { GENERATE_FEEDBACK_REPORT } from "../actions/feedbackActions";

const initialState = {
  feedbackList: [],
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_FEEDBACK_REPORT:
      return { ...state, feedbackList: action.payload };
    default:
      return state;
  }
};

export default feedbackReducer;
