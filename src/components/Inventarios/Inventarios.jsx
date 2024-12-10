// src/components/Inventarios.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  addItem,
  modifyItem,
  setSearchTerm,
} from "../../redux/actions/inventariosActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inventario.css";

const Inventarios = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, searchTerm } = useSelector(
    (state) => state.inventarios
  );

  const [newItem, setNewItem] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleAddItem = () => {
    if (newItem.trim()) {
      dispatch(addItem(selectedCategory, newItem));
      setNewItem("");
    }
  };

  const handleModifyItem = () => {
    if (selectedIndex !== -1 && newItem.trim()) {
      dispatch(modifyItem(selectedCategory, selectedIndex, newItem));
      setNewItem("");
      setSelectedIndex(-1);
    }
  };

  const filteredItems = categories[selectedCategory].filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Inventario</h1>
      <div className="category-select">
        <button onClick={() => dispatch(setCategory("lubricantes"))}>
          Lubricantes
        </button>
        <button onClick={() => dispatch(setCategory("filtros"))}>
          Filtros
        </button>
        <button onClick={() => dispatch(setCategory("repuestos"))}>
          Repuestos y componentes
        </button>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      {filteredItems.length === 0 && (
        <p>No se encontró ningún producto con este nombre</p>
      )}
      <div className="list-container">
        <ul className="list-group">
          {filteredItems.map((item, index) => (
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={index}
              onClick={() => setSelectedIndex(index)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="controls">
          <input
            type="text"
            placeholder="Nuevo ítem"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <div className="button-group">
            <button onClick={handleAddItem}>Agregar</button>
            <button onClick={handleModifyItem}>Modificar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventarios;
