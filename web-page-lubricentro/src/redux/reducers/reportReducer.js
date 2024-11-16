// src/redux/reducers/reportReducer.js
import { SET_REPORTS, FILTER_REPORTS } from "../actions/reportActions";

const initialState = {
  reports: [],
  filteredReports: [],
  searchTerm: "",
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORTS:
      return {
        ...state,
        reports: action.payload,
        filteredReports: action.payload,
      };
    case FILTER_REPORTS:
      const filteredReports = state.reports.filter((report) =>
        Object.values(report).some((value) =>
          value.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
      return { ...state, searchTerm: action.payload, filteredReports };
    default:
      return state;
  }
};

export default reportReducer;
