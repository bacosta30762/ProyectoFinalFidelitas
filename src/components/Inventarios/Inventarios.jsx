import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inventario.css";

const CATEGORIES = {
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
};

function Inventarios() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("lubricantes");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "" && categories[selectedCategory]) {
      setCategories({
        ...categories,
        [selectedCategory]: [...categories[selectedCategory], newItem],
      });
      setNewItem("");
    }
  };

  const handleModifyItem = () => {
    if (
      selectedIndex !== -1 &&
      newItem.trim() !== "" &&
      categories[selectedCategory]
    ) {
      const updatedItems = categories[selectedCategory].map((item, index) =>
        index === selectedIndex ? newItem : item
      );
      setCategories({
        ...categories,
        [selectedCategory]: updatedItems,
      });
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
        <button onClick={() => setSelectedCategory("lubricantes")}>
          Lubricantes
        </button>
        <button onClick={() => setSelectedCategory("filtros")}>Filtros</button>
        <button onClick={() => setSelectedCategory("repuestos")}>
          Repuestos y componentes
        </button>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
}

export default Inventarios;
