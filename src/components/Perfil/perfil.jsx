import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./perfil.css"; 


const Profile = () => {
    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const navigate = useNavigate(); // Hook para redirigir
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
  
    const handleEdit = () => {
      navigate(`/perfileditar/${id}`); 
    };
  
    return (
      <div className="profile-container">
        <h2 className="profile-title">Perfil de Administrador</h2>
        <div className="profile-info">
          <div className="profile-field">
            <label>Nombre:</label>
            <p>{userData.name}</p>
          </div>
          <div className="profile-field">
            <label>Cédula:</label>
            <p>{userData.cedula}</p>
          </div>
          <div className="profile-field">
            <label>Correo:</label>
            <p>{userData.email}</p>
          </div>
          <div className="profile-field">
            <label>Teléfono:</label>
            <p>{userData.phone}</p>
          </div>
        </div>
        
        <button id='botonmodi' className="edit-button" onClick={handleEdit}>Modificar</button>
      </div>
    );
  };
  
  export default Profile;