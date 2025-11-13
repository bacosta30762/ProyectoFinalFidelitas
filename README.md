# Lubricentro Management System

A comprehensive React-based web application for managing an auto service center (lubricentro) with features for user management, order tracking, financial management, inventory control, marketing, and more.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
- [Redux State Management](#redux-state-management)
- [Routing](#routing)
- [Authentication](#authentication)
- [Best Practices](#best-practices)
- [Usage Examples](#usage-examples)
- [Documentation](#documentation)
- [Contributing](#contributing)

## ✨ Features

### User Management
- User registration and authentication
- Role-based access control (Admin, Mecanico, Contador, Usuario)
- User profile management
- User activation/deactivation
- Role assignment

### Order Management
- Create, read, update, and delete service orders
- Assign mechanics to orders
- Order search and filtering
- Order status tracking

### Financial Management
- Income tracking (Ingresos)
- Expense tracking (Egresos)
- Financial reports generation
- PDF and Excel export capabilities

### Inventory Management
- Product inventory tracking
- Stock management

### Marketing Features
- Newsletter management
- Customer feedback collection
- Subscription management
- Promotional campaigns

### Additional Features
- Calendar/Planning system
- Comments and ratings system
- Notification system
- Task management
- Report generation

## 🛠 Tech Stack

### Core Technologies
- **React 18.3.1** - UI library
- **React Router DOM 6.26.0** - Routing
- **Redux Toolkit 2.3.0** - State management
- **Axios 1.7.3** - HTTP client

### UI Libraries
- **Bootstrap 5.3.3** - CSS framework
- **React Bootstrap 2.10.4** - Bootstrap components
- **React Icons 5.3.0** - Icon library
- **Font Awesome 6.6.0** - Additional icons

### Utilities
- **React DatePicker 7.3.0** - Date selection
- **React PDF Renderer 3.4.4** - PDF generation
- **jsPDF 2.5.2** - PDF creation
- **XLSX 0.18.5** - Excel file handling
- **React CSV 2.2.2** - CSV export
- **File Saver 2.0.5** - File download

## ⚡ Quick Start

Get started in 5 minutes! See the [Quick Start Guide](docs/QUICK_START.md) for a fast setup.

```bash
# Clone and install
git clone https://github.com/yourusername/lubricentro-management-system.git
cd lubricentro-management-system
npm install
npm start
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lubricentro-management-system.git
   cd lubricentro-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Edit `src/api.js` to set your API base URL:
   ```javascript
   const BASE_URL = "https://your-api-url.com/api";
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Run tests**
   ```bash
   npm test
   ```

## 📁 Project Structure

```
lubricentro-management-system/
├── public/                 # Static files
│   └── index.html
├── src/
│   ├── api.js             # API route configuration
│   ├── apiClient.js       # Axios client with interceptors
│   ├── App.jsx            # Main app component with routing
│   ├── index.js           # Application entry point
│   ├── index.css          # Global styles
│   ├── components/        # React components
│   │   ├── Asignación Técnicos/
│   │   ├── Comentarios/
│   │   ├── Contability/
│   │   ├── HeaderFooter/
│   │   ├── Inicio/
│   │   ├── Inventarios/
│   │   ├── ListaUsuario/
│   │   ├── marketing/
│   │   ├── notificacion/
│   │   ├── orden/
│   │   ├── Perfil/
│   │   ├── Planificacion/
│   │   └── reportes/
│   ├── pages/             # Page components
│   ├── redux/             # Redux store configuration
│   │   ├── actions/       # Redux actions
│   │   ├── reducers/      # Redux reducers
│   │   └── store.js       # Store configuration
│   ├── services/          # Service utilities
│   │   └── authService.js # Authentication utilities
│   └── hoc/               # Higher-order components
│       └── ProtectedRoute.jsx
├── package.json
└── README.md
```

## 📡 API Documentation

### Base URL
```
https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api
```

### Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

### API Routes

#### Users (`/Usuarios`)

**Login**
```http
POST /Usuarios/LoginAdmin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Get Users List**
```http
GET /Usuarios/lista-usuarios
Authorization: Bearer <token>
```

**Update User**
```http
PUT /Usuarios/Actualizar/{cedula}
Content-Type: application/json
Authorization: Bearer <token>

{
  "cedula": "123456789",
  "nombre": "John",
  "apellidos": "Doe",
  "correo": "john@example.com"
}
```

**Activate User**
```http
PUT /Usuarios/Activar?cedula={cedula}
Authorization: Bearer <token>
```

**Deactivate User**
```http
PUT /Usuarios/Deseactivar?cedula={cedula}
Authorization: Bearer <token>
```

**Assign Role**
```http
POST /Usuarios/AsignarRol
Content-Type: application/json
Authorization: Bearer <token>

{
  "Cedula": "123456789",
  "RoleNames": ["Admin", "Mecanico"]
}
```

#### Orders (`/Ordenes`)

**Get Orders**
```http
GET /Ordenes
Authorization: Bearer <token>
```

**Create Order**
```http
POST /Ordenes
Content-Type: application/json
Authorization: Bearer <token>

{
  "servicio": "Oil Change",
  "cliente": "Customer Name",
  ...
}
```

**Update Order**
```http
PUT /Ordenes/{id}
Content-Type: application/json
Authorization: Bearer <token>
```

**Delete Order**
```http
DELETE /Ordenes/{id}
Authorization: Bearer <token>
```

#### Mechanics (`/Mecanicos`)

**Get Mechanics List**
```http
GET /Mecanicos
Authorization: Bearer <token>
```

#### Marketing (`/Marketing`)

**Get Newsletters**
```http
GET /Marketing/ObtenerBoletines
Authorization: Bearer <token>
```

**Create Newsletter**
```http
POST /Marketing/CrearBoletin
Content-Type: application/json
Authorization: Bearer <token>

{
  "id": 0,
  "titulo": "Newsletter Title",
  "contenido": "Newsletter Content",
  "fechaEnvio": "2024-01-01",
  "esPromocional": false
}
```

#### Income (`/Ingresos`)

**Get Income List**
```http
GET /Ingresos/Listar
Authorization: Bearer <token>
```

**Create Income**
```http
POST /Ingresos/Crear
Content-Type: application/json
Authorization: Bearer <token>
```

**Update Income**
```http
PUT /Ingresos/Actualizar/{id}
Content-Type: application/json
Authorization: Bearer <token>
```

**Delete Income**
```http
DELETE /Ingresos/Eliminar/{id}
Authorization: Bearer <token>
```

#### Expenses (`/Egresos`)

**Get Expenses List**
```http
GET /Egreso/Listar
Authorization: Bearer <token>
```

**Create Expense**
```http
POST /Egreso/Crear
Content-Type: application/json
Authorization: Bearer <token>
```

**Update Expense**
```http
PUT /Egreso/Actualizar/{id}
Content-Type: application/json
Authorization: Bearer <token>
```

**Delete Expense**
```http
DELETE /Egreso/Eliminar/{id}
Authorization: Bearer <token>
```

## 🧩 Component Documentation

### Core Components

#### `App.jsx`
Main application component that sets up routing and layout.

**Routes:**
- `/Inicio/` - Login page
- `/RecuperarContra/*` - Password recovery
- `/ListaUsuario/*` - User list (protected)
- `/Perfil/` - User profile (protected)
- `/user-list` - User list (protected)
- `/edit-user/:id` - Edit user (protected)
- `/lista-ordenes/*` - Orders list (protected)
- `/ingresos` - Income management (protected)
- `/egresos` - Expenses management (protected)
- `/reportes-financieros` - Financial reports (protected)
- `/inventarios` - Inventory management (protected)
- `/calendario` - Calendar/Planning (protected)
- `/marketing/*` - Marketing features (protected)

#### `ProtectedRoute.jsx`
Higher-order component that protects routes requiring authentication.

**Usage:**
```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### User Management Components

#### `ListaUsuario/lista.jsx`
Displays a paginated list of users with search functionality.

**Props:** None

**Features:**
- Search by name or ID number
- Pagination (5 items per page)
- Edit user button
- User status display

**Example:**
```jsx
import UserList from './components/ListaUsuario/lista';

<UserList />
```

#### `ListaUsuario/modifica.jsx` (EditUser)
Form component for editing user information.

**Props:** None (uses URL params)

**Features:**
- Edit user details (name, last name, ID, email)
- Assign/change roles
- Activate/deactivate users
- Form validation

**URL Parameters:**
- `id` - User ID from the list

**Example:**
```jsx
// Navigate to: /edit-user/1
<EditUser />
```

### Authentication Components

#### `Inicio/login.jsx`
Login component with authentication.

**Features:**
- Email and password authentication
- Password validation
- Error handling
- Token storage
- Redirect to profile on success

**Example:**
```jsx
import Login from './components/Inicio/login';

<Login />
```

### Financial Components

#### `Contability/Ingresos.jsx`
Income management component.

**Features:**
- List all income records
- Add new income
- Edit existing income
- Delete income
- Export to PDF/Excel

#### `Contability/Egresos.jsx`
Expense management component.

**Features:**
- List all expense records
- Add new expense
- Edit existing expense
- Delete expense
- Export to PDF/Excel

#### `Contability/ReportesFinancieros.jsx`
Financial reports component.

**Features:**
- Generate financial reports
- Filter by date range
- Export reports

### Order Components

#### `orden/OrdenForm.jsx`
Form for creating/editing orders.

**Props:**
- `onSubmit` - Callback function when form is submitted
- `initialData` - Initial form data (optional)

**Example:**
```jsx
<OrdenForm 
  onSubmit={(data) => {
    // Handle order creation
    console.log(data);
  }}
  initialData={{ servicio: "Oil Change" }}
/>
```

#### `orden/OrdenList.jsx`
Displays a list of orders.

**Features:**
- Order listing
- Search and filter
- Order details view

#### `orden/OrdenDetail.jsx`
Displays detailed information about a specific order.

**URL Parameters:**
- `id` - Order ID

### Marketing Components

#### `marketing/NewsletterForm.jsx`
Form for creating newsletters.

#### `marketing/NewsletterList.jsx`
List of newsletters with management options.

#### `marketing/FeedbackForm.jsx`
Form for collecting customer feedback.

#### `marketing/SubscriptionForm.jsx`
Form for managing subscriptions.

### Other Components

#### `Planificacion/Calendar.jsx`
Calendar component for planning and scheduling.

#### `Inventarios/Inventarios.jsx`
Inventory management component.

#### `Comentarios/ComentariosValoraciones.jsx`
Comments and ratings component.

## 🔄 Redux State Management

### Store Configuration

The Redux store is configured in `src/redux/store.js` with the following reducers:

- `orders` - Order state
- `reports` - Report state
- `newsletters` - Newsletter state
- `users` - User state
- `calendar` - Calendar state
- `feedback` - Feedback state
- `ingresos` - Income state
- `egresos` - Expense state
- `categoriesState` - Categories state
- `loginState` - Login state
- `recoverPassword` - Password recovery state
- `inventarios` - Inventory state

### Using Redux in Components

**Example:**
```jsx
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/actions/userActions';

const MyComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const fetchUsers = async () => {
    // Fetch users and dispatch action
    dispatch(setUsers(userData));
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.nombre}</div>
      ))}
    </div>
  );
};
```

### Available Actions

#### User Actions (`redux/actions/userActions.js`)
- `setUsers(users)` - Set users list
- `updateUser(id, userData)` - Update user
- `deleteUser(id)` - Delete user

#### Order Actions (`redux/actions/orderActions.js`)
- `setOrders(orders)` - Set orders list
- `assignMechanic(orderId, mechanic)` - Assign mechanic to order
- `filterOrders(searchTerm)` - Filter orders

#### Login Actions (`redux/actions/loginActions.js`)
- `loginRequest()` - Start login process
- `loginSuccess(data)` - Login success
- `loginFailure(error)` - Login failure
- `saveUserData(user)` - Save user data

## 🛣 Routing

The application uses React Router DOM with HashRouter for GitHub Pages compatibility.

### Public Routes
- `/Inicio/` - Login
- `/RecuperarContra/*` - Password recovery

### Protected Routes
All other routes require authentication via `ProtectedRoute` HOC.

### Navigation Example
```jsx
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user-list');
  };

  return <button onClick={handleClick}>Go to Users</button>;
};
```

## 🔐 Authentication

### Authentication Service

Located in `src/services/authService.js`:

```javascript
import { saveToken, getToken, removeToken, isTokenExpired } from './services/authService';

// Save token after login
saveToken(token);

// Get token
const token = getToken();

// Check if token is expired
if (isTokenExpired(token)) {
  // Handle expired token
}

// Remove token on logout
removeToken();
```

### API Client Interceptors

The `apiClient.js` automatically:
- Adds Bearer token to all requests
- Handles token refresh on 401 errors
- Manages token storage

### Protected Routes

All protected routes are wrapped with `ProtectedRoute`:
```jsx
<Route
  path="/protected-route"
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  }
/>
```

## 💡 Best Practices

### 1. Component Structure
- Keep components focused and single-purpose
- Use functional components with hooks
- Extract reusable logic into custom hooks

### 2. State Management
- Use Redux for global state
- Use local state for component-specific data
- Avoid prop drilling

### 3. API Calls
- Use `apiClient` for all API requests
- Handle errors gracefully
- Show loading states

### 4. Code Organization
- Group related components in folders
- Keep styles close to components
- Use consistent naming conventions

### 5. Error Handling
```jsx
try {
  const response = await apiClient.get('/endpoint');
  // Handle success
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
}
```

### 6. Form Validation
- Validate inputs before submission
- Show clear error messages
- Disable submit button during processing

### 7. Performance
- Use React.memo for expensive components
- Lazy load routes when possible
- Optimize images and assets

## 📝 Usage Examples

### Example 1: Creating a User List Component

```jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../apiClient';
import { API_ROUTES } from '../api';
import { setUsers } from '../redux/actions/userActions';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get(`${API_ROUTES.users}/lista-usuarios`);
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id}>
          {user.nombre} {user.apellidos}
        </div>
      ))}
    </div>
  );
};

export default UserList;
```

### Example 2: Creating a Form with Validation

```jsx
import React, { useState } from 'react';
import apiClient from '../apiClient';
import { API_ROUTES } from '../api';

const CreateOrderForm = () => {
  const [formData, setFormData] = useState({
    servicio: '',
    cliente: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.servicio) {
      newErrors.servicio = 'Service is required';
    }
    if (!formData.cliente) {
      newErrors.cliente = 'Client is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await apiClient.post(`${API_ROUTES.ordenes}`, formData);
      alert('Order created successfully');
      setFormData({ servicio: '', cliente: '' });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formData.servicio}
          onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
          placeholder="Service"
        />
        {errors.servicio && <span>{errors.servicio}</span>}
      </div>
      <div>
        <input
          type="text"
          value={formData.cliente}
          onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
          placeholder="Client"
        />
        {errors.cliente && <span>{errors.cliente}</span>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Order'}
      </button>
    </form>
  );
};

export default CreateOrderForm;
```

### Example 3: Using Protected Routes

```jsx
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './hoc/ProtectedRoute';
import UserList from './components/ListaUsuario/lista';

function App() {
  return (
    <Routes>
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

### Example 4: Exporting Data to PDF

```jsx
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 20, marginBottom: 10 },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Report</Text>
      {data.map((item, index) => (
        <Text key={index}>{item.name}</Text>
      ))}
    </Page>
  </Document>
);

const ExportButton = ({ data }) => (
  <PDFDownloadLink document={<MyDocument data={data} />} fileName="report.pdf">
    {({ blob, url, loading, error }) =>
      loading ? 'Loading document...' : 'Download PDF'
    }
  </PDFDownloadLink>
);
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Quick Start Guide](docs/QUICK_START.md)** - Get started in 5 minutes
- **[Setup Guide](docs/SETUP_GUIDE.md)** - Detailed installation and configuration
- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation
- **[Component Reference](docs/COMPONENT_REFERENCE.md)** - All components documented
- **[Development Guide](docs/DEVELOPMENT_GUIDE.md)** - Best practices and guidelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Use functional components
- Follow React hooks best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Follow the [Development Guide](docs/DEVELOPMENT_GUIDE.md)

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- All contributors and maintainers

---

For more information or questions, please open an issue on GitHub.
