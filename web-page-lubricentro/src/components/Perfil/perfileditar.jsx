import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./perfileditar.css"; 

const Perfileditar = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState({
    name: '',
    cedula: '',
    email: '',
    phone: '',
    contactMethod: 'email' 
  });

  
  useEffect(() => {
    
    const fetchedUser = {
      name: 'Juan Perez',
      cedula: '123456789',
      email: 'juan@example.com',
      phone: '555-1234',
      contactMethod: 'phone'
    };
    setUserData(fetchedUser);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    for (const key in userData) {
      if (userData[key] === '') {
        alert('Todos los campos son obligatorios.');
        return;
      }
    }
    
  
    alert('Su información ha sido actualizada');
    navigate("/Perfil"); 
  };

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-title">Editar Perfil</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input 
            type="text" 
            name="name" 
            value={userData.name} 
            onChange={handleChange} 
            className="edit-user-input"
            disabled
          />
        </label>
        <label>
          Cédula:
          <input  
            type="text" 
            name="cedula" 
            value={userData.cedula} 
            onChange={handleChange} 
            className="edit-user-input"
            disabled
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={userData.email} 
            onChange={handleChange} 
            className="edit-user-input"
            required
          />
        </label>
        <label>
          Teléfono:
          <input 
            type="text" 
            name="phone" 
            value={userData.phone} 
            onChange={handleChange} 
            className="edit-user-input"
            required
          />
        </label>
        <label>
          Método de Contacto:
          <select 
            name="contactMethod" 
            value={userData.contactMethod} 
            onChange={handleChange} 
            className="edit-user-input"
            required
          >
            <option value="email">Email</option>
            <option value="phone">Teléfono</option>
          </select>
        </label>
        <button type="submit" className="save-button">Guardar Cambios</button>
        
      </form>
    </div>
  );
};

export default Perfileditar;
