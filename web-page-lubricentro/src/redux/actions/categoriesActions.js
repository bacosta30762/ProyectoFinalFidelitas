// categoriesActions.js
export const addItem = (category, item) => ({
  type: "ADD_ITEM",
  payload: { category, item },
});

export const modifyItem = (category, index, newItem) => ({
  type: "MODIFY_ITEM",
  payload: { category, index, newItem },
});
