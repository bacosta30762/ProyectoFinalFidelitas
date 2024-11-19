// categoriesReducer.js
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
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
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
    case "MODIFY_ITEM":
      const { category, index, newItem } = action.payload;
      const updatedItems = state.categories[category].map((item, idx) =>
        idx === index ? newItem : item
      );
      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: updatedItems,
        },
      };
    default:
      return state;
  }
};
