// Función para guardar el token en localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Función para eliminar el token de localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Función para obtener el token de localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};
