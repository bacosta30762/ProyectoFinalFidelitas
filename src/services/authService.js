const AUTH_TOKEN = "token";

// Función para guardar el token en localStorage
export const saveToken = (token) => {
  localStorage.setItem(AUTH_TOKEN, token);
};

// Función para eliminar el token de localStorage
export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

// Función para obtener el token de localStorage
export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const isTokenExpired = (token) => {
  // Expiración de token
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = payload.exp * 1000;
  return Date.now() > expiry;
};
