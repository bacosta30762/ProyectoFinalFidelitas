// src/redux/actions/reportActions.js

export const SET_REPORTS = "SET_REPORTS";
export const FILTER_REPORTS = "FILTER_REPORTS";

export const setReports = (reports) => ({
  type: SET_REPORTS,
  payload: reports,
});

export const filterReports = (searchTerm) => ({
  type: FILTER_REPORTS,
  payload: searchTerm,
});
