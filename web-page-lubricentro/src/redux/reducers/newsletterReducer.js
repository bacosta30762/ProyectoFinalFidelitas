// src/redux/reducers/newsletterReducer.js
import {
  SET_NEWSLETTERS,
  ADD_NEWSLETTER,
  DELETE_NEWSLETTER,
  UPDATE_NEWSLETTER,
} from "../actions/newsletterActions";

const initialState = {
  newsletters: [],
};

const newsletterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWSLETTERS:
      return { ...state, newsletters: action.payload };

    case ADD_NEWSLETTER:
      return { ...state, newsletters: [...state.newsletters, action.payload] };

    case DELETE_NEWSLETTER:
      return {
        ...state,
        newsletters: state.newsletters.filter(
          (newsletter) => newsletter.id !== action.payload
        ),
      };

    case UPDATE_NEWSLETTER:
      return {
        ...state,
        newsletters: state.newsletters.map((newsletter) =>
          newsletter.id === action.payload.id
            ? { ...newsletter, titulo: action.payload.titulo }
            : newsletter
        ),
      };

    default:
      return state;
  }
};

export default newsletterReducer;
