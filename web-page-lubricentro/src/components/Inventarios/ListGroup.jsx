import React, { useState } from "react";

function ListGroup() {
  const [items, setItems] = useState(["Lubricantes", "Filtros", "Repuestos y componentes"]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const handleModifyItem = () => {
    if (selectedIndex !== -1 && newItem.trim() !== "") {
      const updatedItems = items.map((item, index) =>
        index === selectedIndex ? newItem : item
      );
      setItems(updatedItems);
      setNewItem("");
      setSelectedIndex(-1);
    }
  };

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Inventario</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredItems.length === 0 && <p>No se encontró ningún producto con este nombre</p>}
      <ul className="list-group">
        {filteredItems.map((item, index) => (
          <li
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            key={index}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nuevo ítem"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Agregar</button>
      <button onClick={handleModifyItem}>Modificar</button>
    </>
  );
}

export default ListGroup;
