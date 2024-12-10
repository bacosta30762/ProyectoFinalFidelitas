export const SET_CATEGORY = "SET_CATEGORY";
export const ADD_ITEM = "ADD_ITEM";
export const MODIFY_ITEM = "MODIFY_ITEM";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const addItem = (category, item) => ({
  type: ADD_ITEM,
  payload: { category, item },
});

export const modifyItem = (category, index, newItem) => ({
  type: MODIFY_ITEM,
  payload: { category, index, newItem },
});

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});
