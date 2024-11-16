// src/redux/actions/newsletterActions.js

export const SET_NEWSLETTERS = "SET_NEWSLETTERS";
export const ADD_NEWSLETTER = "ADD_NEWSLETTER";
export const DELETE_NEWSLETTER = "DELETE_NEWSLETTER";
export const UPDATE_NEWSLETTER = "UPDATE_NEWSLETTER";

export const setNewsletters = (newsletters) => ({
  type: SET_NEWSLETTERS,
  payload: newsletters,
});

export const addNewsletter = (newsletter) => ({
  type: ADD_NEWSLETTER,
  payload: newsletter,
});

export const deleteNewsletter = (id) => ({
  type: DELETE_NEWSLETTER,
  payload: id,
});

export const updateNewsletter = (id, titulo) => ({
  type: UPDATE_NEWSLETTER,
  payload: { id, titulo },
});
