import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inventario.css";

const Inventarios = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(""); // Nueva variable para cantidad
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Obtener categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:7180/api/categoria/Listar");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Obtener artículos de la categoría seleccionada
  useEffect(() => {
    const fetchItems = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `https://localhost:7180/api/Articulo/ListarPorCategoria/${selectedCategory}`
          );
          setItems(response.data);
        } catch (error) {
          console.error("Error al obtener artículos:", error);
        }
      }
    };
    fetchItems();
  }, [selectedCategory]);

  // Filtrar los artículos según el término de búsqueda
  const filteredItems = items.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones para manejar agregar, modificar y eliminar artículos
  const handleAddItem = () => {
    if (newItem.trim() && newQuantity.trim() && !isNaN(newQuantity) && newQuantity > 0) {
      const newArticulo = { nombre: newItem, categoriaId: selectedCategory, cantidad: parseInt(newQuantity) };
      axios.post("https://localhost:7180/api/articulo/Agregar", newArticulo)
        .then(response => {
          setItems([...items, response.data]); // Agregar el artículo al estado local
          setNewItem(""); // Limpiar el campo de entrada
          setNewQuantity(""); // Limpiar el campo de cantidad
        })
        .catch(error => console.error("Error al agregar artículo:", error));
    } else {
      alert("Por favor, ingrese un nombre y una cantidad válida.");
    }
  };

  const handleModifyItem = () => {
    if (selectedIndex !== -1 && newItem.trim() && newQuantity.trim() && !isNaN(newQuantity) && newQuantity > 0) {
      const updatedItem = { ...items[selectedIndex], nombre: newItem, cantidad: parseInt(newQuantity) };
      axios.put(`https://localhost:7180/api/articulo/Actualizar${updatedItem.id}`, updatedItem)
        .then(() => {
          const updatedItems = [...items];
          updatedItems[selectedIndex] = updatedItem;
          setItems(updatedItems); // Actualizar el estado local
          setNewItem(""); // Limpiar el campo de entrada
          setNewQuantity(""); // Limpiar el campo de cantidad
          setSelectedIndex(-1); // Deseleccionar
        })
        .catch(error => console.error("Error al modificar artículo:", error));
    } else {
      alert("Por favor, ingrese un nombre y una cantidad válida.");
    }
  };

  const handleDeleteItem = (id) => {
    axios.delete(`https://localhost:7180/api/articulo/Eliminar${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id)); // Eliminar artículo del estado local
      })
      .catch(error => console.error("Error al eliminar artículo:", error));
  };

  // Esta función se encarga de seleccionar un artículo y actualizar los campos
  const handleSelectItem = (item, index) => {
    setSelectedIndex(index);
    setNewItem(item.nombre); // Establecer el nombre en el campo de "Nuevo ítem"
    setNewQuantity(item.cantidad.toString()); // Establecer la cantidad en el campo de "Cantidad"
  };

  return (
    <div className="inventario-container">
      <h1>Inventario</h1>

      <div className="category-container">
        <h2 className="selected-category">
          {selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.nombre : "Seleccione una categoría"}
        </h2>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 && (
        <p className="no-results">No se encontró ningún producto con este nombre</p>
      )}

      <div className="list-and-controls">
        <ul className="list-group">
          {filteredItems.map((item, index) => (
            <li
              className={`list-group-item ${selectedIndex === index ? "active" : ""}`}
              key={item.id}
              onClick={() => handleSelectItem(item, index)} // Actualizamos los campos con los valores del artículo
            >
              <div>
                <strong>Artículo:</strong> {item.nombre}
              </div>
              <div>
                <strong>Cantidad:</strong> {item.cantidad}
              </div>
              <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>
                Eliminar
              </button>
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
          <input
            type="number"
            placeholder="Cantidad"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <div className="button-group">
            <button onClick={handleAddItem}>Agregar</button>
            <button onClick={handleModifyItem} disabled={selectedIndex === -1}>
              Modificar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventarios;


