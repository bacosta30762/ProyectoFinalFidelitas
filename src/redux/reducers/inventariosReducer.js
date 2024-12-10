import {
  SET_CATEGORY,
  ADD_ITEM,
  MODIFY_ITEM,
  SET_SEARCH_TERM,
} from "../actions/inventariosActions";

const initialState = {
  categories: {
    lubricantes: [
      "Aceites de motor (sintéticos, semi-sintéticos y minerales)",
      "Aceites para transmisiones automáticas y manuales",
      "Aceites hidráulicos",
      "Aceites para motos",
      "Grasas lubricantes",
    ],
    filtros: [
      "Filtros de aceite",
      "Filtros de aire",
      "Filtros de combustible",
      "Filtros de cabina",
    ],
    repuestos: [
      "Bujías",
      "Correás de distribución",
      "Discos de freno",
      "Bombas de agua",
      "Amortiguadores",
    ],
  },
  selectedCategory: "lubricantes",
  searchTerm: "",
};

export const inventariosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case ADD_ITEM:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.category]: [
            ...state.categories[action.payload.category],
            action.payload.item,
          ],
        },
      };

    case MODIFY_ITEM:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.category]: state.categories[
            action.payload.category
          ].map((item, index) =>
            index === action.payload.index ? action.payload.newItem : item
          ),
        },
      };

    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };

    default:
      return state;
  }
};
