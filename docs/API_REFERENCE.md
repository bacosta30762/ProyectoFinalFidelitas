# API Reference Documentation

Complete API reference for the Lubricentro Management System.

## Base Configuration

### API Base URL
```javascript
const BASE_URL = "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api";
```

### API Routes Configuration
Located in `src/api.js`:

```javascript
export const API_ROUTES = {
  users: `${BASE_URL}/Usuarios`,
  ordenes: `${BASE_URL}/Ordenes`,
  mecanicos: `${BASE_URL}/Mecanicos`,
  marketing: `${BASE_URL}/Marketing`,
  ingresos: `${BASE_URL}/Ingresos`,
  egresos: `${BASE_URL}/Egresos`,
};
```

## Authentication

### Token Storage
Tokens are stored in `localStorage` with the key `"token"`.

### Request Headers
All authenticated requests require:
```
Authorization: Bearer <token>
Content-Type: application/json
```

## API Endpoints

### Users API (`/Usuarios`)

#### Login
Authenticate a user and receive a JWT token.

**Endpoint:** `POST /Usuarios/LoginAdmin`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "John",
    "apellidos": "Doe",
    "email": "user@example.com"
  }
}
```

**Example:**
```javascript
import apiClient from './apiClient';
import { API_ROUTES } from './api';

const login = async (email, password) => {
  const response = await apiClient.post(`${API_ROUTES.users}/LoginAdmin`, {
    email,
    password,
  });
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

#### Get Users List
Retrieve all users in the system.

**Endpoint:** `GET /Usuarios/lista-usuarios`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "John",
    "apellidos": "Doe",
    "cedula": "123456789",
    "email": "john@example.com",
    "activo": "Activo",
    "rol": ["Admin"]
  }
]
```

**Example:**
```javascript
const fetchUsers = async () => {
  const response = await apiClient.get(`${API_ROUTES.users}/lista-usuarios`);
  return response.data;
};
```

#### Update User
Update user information.

**Endpoint:** `PUT /Usuarios/Actualizar/{cedula}`

**URL Parameters:**
- `cedula` (string) - User ID number

**Request Body:**
```json
{
  "cedula": "123456789",
  "nombre": "John",
  "apellidos": "Doe",
  "correo": "john.updated@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "nombre": "John",
  "apellidos": "Doe",
  "cedula": "123456789",
  "email": "john.updated@example.com"
}
```

**Example:**
```javascript
const updateUser = async (cedula, userData) => {
  const response = await apiClient.put(
    `${API_ROUTES.users}/Actualizar/${cedula}`,
    userData
  );
  return response.data;
};
```

#### Activate User
Activate a user account.

**Endpoint:** `PUT /Usuarios/Activar?cedula={cedula}`

**Query Parameters:**
- `cedula` (string) - User ID number

**Example:**
```javascript
const activateUser = async (cedula) => {
  const response = await apiClient.put(
    `${API_ROUTES.users}/Activar?cedula=${cedula}`
  );
  return response.data;
};
```

#### Deactivate User
Deactivate a user account.

**Endpoint:** `PUT /Usuarios/Deseactivar?cedula={cedula}`

**Query Parameters:**
- `cedula` (string) - User ID number

**Example:**
```javascript
const deactivateUser = async (cedula) => {
  const response = await apiClient.put(
    `${API_ROUTES.users}/Deseactivar?cedula=${cedula}`
  );
  return response.data;
};
```

#### Assign Role
Assign roles to a user.

**Endpoint:** `POST /Usuarios/AsignarRol`

**Request Body:**
```json
{
  "Cedula": "123456789",
  "RoleNames": ["Admin", "Mecanico"]
}
```

**Response:**
```json
{
  "fueExitoso": true,
  "errores": []
}
```

**Example:**
```javascript
const assignRole = async (cedula, roles) => {
  const response = await apiClient.post(`${API_ROUTES.users}/AsignarRol`, {
    Cedula: cedula,
    RoleNames: roles,
  });
  return response.data;
};
```

### Orders API (`/Ordenes`)

#### Get Orders
Retrieve all orders.

**Endpoint:** `GET /Ordenes`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "servicio": "Oil Change",
    "cliente": "John Doe",
    "fecha": "2024-01-15",
    "estado": "En Proceso",
    "mecanicoId": 2
  }
]
```

#### Create Order
Create a new service order.

**Endpoint:** `POST /Ordenes`

**Request Body:**
```json
{
  "servicio": "Oil Change",
  "cliente": "John Doe",
  "fecha": "2024-01-15",
  "descripcion": "Regular maintenance"
}
```

**Example:**
```javascript
const createOrder = async (orderData) => {
  const response = await apiClient.post(`${API_ROUTES.ordenes}`, orderData);
  return response.data;
};
```

#### Update Order
Update an existing order.

**Endpoint:** `PUT /Ordenes/{id}`

**URL Parameters:**
- `id` (number) - Order ID

**Request Body:**
```json
{
  "servicio": "Oil Change",
  "cliente": "John Doe",
  "estado": "Completado"
}
```

#### Delete Order
Delete an order.

**Endpoint:** `DELETE /Ordenes/{id}`

**URL Parameters:**
- `id` (number) - Order ID

### Mechanics API (`/Mecanicos`)

#### Get Mechanics List
Retrieve all mechanics.

**Endpoint:** `GET /Mecanicos`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Carlos",
    "apellidos": "Rodriguez",
    "especialidad": "Motor",
    "activo": true
  }
]
```

### Marketing API (`/Marketing`)

#### Get Newsletters
Retrieve all newsletters.

**Endpoint:** `GET /Marketing/ObtenerBoletines`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "titulo": "Monthly Newsletter",
    "contenido": "Content here...",
    "fechaEnvio": "2024-01-01",
    "esPromocional": false
  }
]
```

#### Create Newsletter
Create a new newsletter.

**Endpoint:** `POST /Marketing/CrearBoletin`

**Request Body:**
```json
{
  "id": 0,
  "titulo": "Monthly Newsletter",
  "contenido": "Newsletter content...",
  "fechaEnvio": "2024-01-01T00:00:00",
  "esPromocional": false
}
```

**Example:**
```javascript
const createNewsletter = async (newsletterData) => {
  const token = getToken();
  const response = await fetch(`${API_ROUTES.marketing}/CrearBoletin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newsletterData),
  });
  return response.json();
};
```

### Income API (`/Ingresos`)

#### Get Income List
Retrieve all income records.

**Endpoint:** `GET /Ingresos/Listar`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "descripcion": "Service Payment",
    "monto": 50000,
    "fecha": "2024-01-15",
    "categoria": "Servicios"
  }
]
```

#### Create Income
Create a new income record.

**Endpoint:** `POST /Ingresos/Crear`

**Request Body:**
```json
{
  "descripcion": "Service Payment",
  "monto": 50000,
  "fecha": "2024-01-15",
  "categoria": "Servicios"
}
```

#### Update Income
Update an income record.

**Endpoint:** `PUT /Ingresos/Actualizar/{id}`

**URL Parameters:**
- `id` (number) - Income record ID

#### Delete Income
Delete an income record.

**Endpoint:** `DELETE /Ingresos/Eliminar/{id}`

**URL Parameters:**
- `id` (number) - Income record ID

### Expenses API (`/Egreso`)

#### Get Expenses List
Retrieve all expense records.

**Endpoint:** `GET /Egreso/Listar`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "descripcion": "Equipment Purchase",
    "monto": 20000,
    "fecha": "2024-01-15",
    "categoria": "Equipamiento"
  }
]
```

#### Create Expense
Create a new expense record.

**Endpoint:** `POST /Egreso/Crear`

**Request Body:**
```json
{
  "descripcion": "Equipment Purchase",
  "monto": 20000,
  "fecha": "2024-01-15",
  "categoria": "Equipamiento"
}
```

#### Update Expense
Update an expense record.

**Endpoint:** `PUT /Egreso/Actualizar/{id}`

**URL Parameters:**
- `id` (number) - Expense record ID

#### Delete Expense
Delete an expense record.

**Endpoint:** `DELETE /Egreso/Eliminar/{id}`

**URL Parameters:**
- `id` (number) - Expense record ID

## API Client Configuration

### Axios Client Setup
Located in `src/apiClient.js`:

```javascript
import axios from 'axios';
import { API_ROUTES } from './api';

const apiClient = axios.create({
  baseURL: API_ROUTES.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Request Interceptor
Automatically adds Bearer token to all requests:

```javascript
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### Response Interceptor
Handles token refresh on 401 errors:

```javascript
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Token refresh logic
    }

    return Promise.reject(error);
  }
);
```

## Error Handling

### Standard Error Response
```json
{
  "message": "Error message",
  "errors": ["Error detail 1", "Error detail 2"]
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Error Handling Example
```javascript
try {
  const response = await apiClient.get('/endpoint');
  return response.data;
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Error status:', error.response.status);
    console.error('Error data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response received');
  } else {
    // Error in request setup
    console.error('Error:', error.message);
  }
  throw error;
}
```

## Best Practices

1. **Always use `apiClient`** instead of direct `axios` calls
2. **Handle errors gracefully** with try-catch blocks
3. **Show loading states** during API calls
4. **Validate data** before sending requests
5. **Use TypeScript** (if available) for type safety
6. **Cache responses** when appropriate
7. **Implement retry logic** for failed requests
8. **Log errors** for debugging

## Rate Limiting

Currently, no rate limiting is implemented. Be mindful of:
- Making too many requests in a short time
- Implementing client-side caching
- Using debouncing for search requests

## Testing API Calls

### Using Postman/Insomnia
1. Set base URL: `https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api`
2. For protected endpoints, add header:
   ```
   Authorization: Bearer <your-token>
   ```
3. Set `Content-Type: application/json` for POST/PUT requests

### Using cURL
```bash
# Login
curl -X POST https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/LoginAdmin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Users (with token)
curl -X GET https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/lista-usuarios \
  -H "Authorization: Bearer <your-token>"
```

