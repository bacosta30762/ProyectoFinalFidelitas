# Component Reference Documentation

Complete reference for all React components in the Lubricentro Management System.

## Component Categories

- [User Management](#user-management-components)
- [Authentication](#authentication-components)
- [Financial Management](#financial-management-components)
- [Order Management](#order-management-components)
- [Marketing](#marketing-components)
- [Inventory](#inventory-components)
- [Planning](#planning-components)
- [Comments & Ratings](#comments--ratings-components)
- [Layout](#layout-components)

## User Management Components

### `ListaUsuario/lista.jsx` - UserList

Displays a paginated, searchable list of all users in the system.

**Location:** `src/components/ListaUsuario/lista.jsx`

**Props:** None

**State:**
- `searchTerm` (string) - Search filter
- `currentPage` (number) - Current page number
- `error` (string) - Error message

**Features:**
- Pagination (5 items per page)
- Search by name or ID number
- Edit user button
- User status display
- Redux integration

**Usage:**
```jsx
import UserList from './components/ListaUsuario/lista';

<UserList />
```

**Redux State:**
```javascript
const users = useSelector((state) => state.users.users);
```

**API Calls:**
- `GET /Usuarios/lista-usuarios`

---

### `ListaUsuario/modifica.jsx` - EditUser

Form component for editing user information, roles, and activation status.

**Location:** `src/components/ListaUsuario/modifica.jsx`

**Props:** None (uses URL params)

**URL Parameters:**
- `id` (number) - User ID from the list

**State:**
```javascript
{
  nombre: string,
  apellidos: string,
  cedula: string,
  email: string,
  rol: string[],
  activo: boolean
}
```

**Features:**
- Edit user details (name, last name, ID, email)
- Assign/change multiple roles
- Activate/deactivate users
- Form validation
- Confirmation dialogs

**Methods:**
- `handleChange(e)` - Handle input changes
- `handleSubmit(e)` - Submit form
- `handleToggleActive()` - Toggle user active status
- `handleAssignRole()` - Assign roles to user
- `updateUser(id, userData)` - Update user via API

**API Calls:**
- `PUT /Usuarios/Actualizar/{cedula}`
- `PUT /Usuarios/Activar?cedula={cedula}`
- `PUT /Usuarios/Deseactivar?cedula={cedula}`
- `POST /Usuarios/AsignarRol`

**Usage:**
```jsx
// Navigate to: /edit-user/1
import EditUser from './components/ListaUsuario/modifica';

<EditUser />
```

---

### `ListaUsuario/MecanicoList.jsx` - MechanicList

Displays a list of mechanics.

**Location:** `src/components/ListaUsuario/MecanicoList.jsx`

**Props:** None

**Features:**
- List all mechanics
- Filter and search
- Assign mechanics to orders

---

### `Perfil/perfil.jsx` - Profile

Displays user profile information.

**Location:** `src/components/Perfil/perfil.jsx`

**Props:** None

**Features:**
- View user profile
- Edit profile button
- User information display

---

### `Perfil/perfileditar.jsx` - EditProfile

Form for editing user profile.

**Location:** `src/components/Perfil/perfileditar.jsx`

**URL Parameters:**
- `id` (number) - User ID

**Features:**
- Edit personal information
- Update password
- Save changes

## Authentication Components

### `Inicio/login.jsx` - Login

Authentication component with email and password login.

**Location:** `src/components/Inicio/login.jsx`

**Props:** None

**State:**
```javascript
{
  correo: string,
  password: string,
  validationError: string
}
```

**Features:**
- Email and password authentication
- Password validation (min 7 chars, uppercase, lowercase, number, special char)
- Error handling
- Token storage
- Redirect to profile on success
- Password recovery link

**Validation:**
```javascript
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/
```

**API Calls:**
- `POST /Usuarios/LoginAdmin`
- `GET /Usuarios/lista-usuarios`

**Usage:**
```jsx
import Login from './components/Inicio/login';

<Login />
```

---

### `Inicio/recuperarcontra.jsx` - RecoverPassword

Password recovery component.

**Location:** `src/components/Inicio/recuperarcontra.jsx`

**Props:** None

**Features:**
- Email input for password recovery
- Send recovery email
- Reset password form

## Financial Management Components

### `Contability/Ingresos.jsx` - IncomePage

Income management component with CRUD operations.

**Location:** `src/components/Contability/Ingresos.jsx`

**Props:** None

**State:**
- `ingresos` (array) - List of income records
- `showDeletePopup` (boolean) - Delete confirmation
- `selectedIngreso` (object) - Selected income record

**Features:**
- List all income records
- Add new income
- Edit existing income
- Delete income
- Export to PDF
- Export to Excel
- Pagination

**API Calls:**
- `GET /Ingresos/Listar`
- `POST /Ingresos/Crear`
- `PUT /Ingresos/Actualizar/{id}`
- `DELETE /Ingresos/Eliminar/{id}`

**Usage:**
```jsx
import IngresosPage from './components/Contability/Ingresos';

<IngresosPage />
```

---

### `Contability/AgregarIngreso.jsx` - AddIncome

Form for adding new income records.

**Location:** `src/components/Contability/AgregarIngreso.jsx`

**Props:** None

**Features:**
- Income form fields
- Date picker
- Category selection
- Amount input
- Description
- Form validation

---

### `Contability/EditarIngreso.jsx` - EditIncome

Form for editing existing income records.

**Location:** `src/components/Contability/EditarIngreso.jsx`

**URL Parameters:**
- `id` (number) - Income record ID

**Features:**
- Pre-filled form with existing data
- Update income record
- Form validation

---

### `Contability/Egresos.jsx` - ExpensesPage

Expense management component with CRUD operations.

**Location:** `src/components/Contability/Egresos.jsx`

**Props:** None

**State:**
- `egresos` (array) - List of expense records
- `showDeletePopup` (boolean) - Delete confirmation
- `selectedEgreso` (object) - Selected expense record

**Features:**
- List all expense records
- Add new expense
- Edit existing expense
- Delete expense
- Export to PDF
- Export to Excel

**API Calls:**
- `GET /Egreso/Listar`
- `POST /Egreso/Crear`
- `PUT /Egreso/Actualizar/{id}`
- `DELETE /Egreso/Eliminar/{id}`

---

### `Contability/AgregarEgreso.jsx` - AddExpense

Form for adding new expense records.

**Location:** `src/components/Contability/AgregarEgreso.jsx`

**Props:** None

**Features:**
- Expense form fields
- Date picker
- Category selection
- Amount input
- Description

---

### `Contability/EditarEgreso.jsx` - EditExpense

Form for editing existing expense records.

**Location:** `src/components/Contability/EditarEgreso.jsx`

**URL Parameters:**
- `id` (number) - Expense record ID

---

### `Contability/ReportesFinancieros.jsx` - FinancialReports

Financial reports generation component.

**Location:** `src/components/Contability/ReportesFinancieros.jsx`

**Props:** None

**Features:**
- Generate financial reports
- Filter by date range
- Income vs Expenses comparison
- Export reports
- Charts and graphs

## Order Management Components

### `orden/OrdenForm.jsx` - OrderForm

Form for creating and editing service orders.

**Location:** `src/components/orden/OrdenForm.jsx`

**Props:**
- `onSubmit` (function) - Callback when form is submitted
- `initialData` (object, optional) - Initial form data

**State:**
```javascript
{
  servicio: string,
  cliente: string,
  // ... other order fields
}
```

**Usage:**
```jsx
<OrdenForm 
  onSubmit={(data) => {
    // Handle order creation
    console.log(data);
  }}
  initialData={{ servicio: "Oil Change" }}
/>
```

---

### `orden/OrdenList.jsx` - OrderList

Displays a list of service orders.

**Location:** `src/components/orden/OrdenList.jsx`

**Props:** None

**Features:**
- List all orders
- Filter by status
- Search orders
- View order details
- Assign mechanics

---

### `orden/OrdenDetail.jsx` - OrderDetail

Displays detailed information about a specific order.

**Location:** `src/components/orden/OrdenDetail.jsx`

**URL Parameters:**
- `id` (number) - Order ID

**Features:**
- Order details view
- Status information
- Mechanic assignment
- Customer information
- Service details

---

### `orden/OrdenSearch.jsx` - OrderSearch

Search and filter component for orders.

**Location:** `src/components/orden/OrdenSearch.jsx`

**Props:** None

**Features:**
- Search by customer name
- Filter by status
- Filter by date range
- Filter by mechanic

## Marketing Components

### `marketing/NewsletterForm.jsx` - NewsletterForm

Form for creating newsletters.

**Location:** `src/components/marketing/NewsletterForm.jsx`

**Props:**
- `onSubmit` (function) - Submit handler
- `initialData` (object, optional) - Initial data

**Features:**
- Title input
- Content editor
- Date picker
- Promotional flag
- Preview

---

### `marketing/NewsletterList.jsx` - NewsletterList

List of newsletters with management options.

**Location:** `src/components/marketing/NewsletterList.jsx`

**Props:** None

**Features:**
- List all newsletters
- Edit newsletter
- Delete newsletter
- Send newsletter
- Filter by type (promotional/informative)

---

### `marketing/NewsletterSearch.jsx` - NewsletterSearch

Search component for newsletters.

**Location:** `src/components/marketing/NewsletterSearch.jsx`

**Props:** None

---

### `marketing/FeedbackForm.jsx` - FeedbackForm

Form for collecting customer feedback.

**Location:** `src/components/marketing/FeedbackForm.jsx`

**Props:**
- `onSubmit` (function) - Submit handler

**Features:**
- Rating input
- Comment textarea
- Customer information
- Service reference

---

### `marketing/FeedbackList.jsx` - FeedbackList

List of customer feedback.

**Location:** `src/components/marketing/FeedbackList.jsx`

**Props:** None

**Features:**
- Display all feedback
- Filter by rating
- Sort by date
- Export feedback

---

### `marketing/SubscriptionForm.jsx` - SubscriptionForm

Form for managing email subscriptions.

**Location:** `src/components/marketing/SubscriptionForm.jsx`

**Props:** None

**Features:**
- Email input
- Subscription preferences
- Unsubscribe option

---

### `marketing/SubscriptionList.jsx` - SubscriptionList

List of email subscriptions.

**Location:** `src/components/marketing/SubscriptionList.jsx`

**Props:** None

**Features:**
- List all subscriptions
- Filter by status
- Export list

---

### `marketing/SubscriptionSearch.jsx` - SubscriptionSearch

Search component for subscriptions.

**Location:** `src/components/marketing/SubscriptionSearch.jsx`

**Props:** None

## Inventory Components

### `Inventarios/Inventarios.jsx` - Inventory

Inventory management component.

**Location:** `src/components/Inventarios/Inventarios.jsx`

**Props:** None

**Features:**
- List all inventory items
- Add new items
- Update stock
- Delete items
- Search and filter
- Low stock alerts

**API Calls:**
- Inventory-related endpoints

## Planning Components

### `Planificacion/Calendar.jsx` - Calendar

Calendar component for planning and scheduling.

**Location:** `src/components/Planificacion/Calendar.jsx`

**Props:** None

**Features:**
- Monthly calendar view
- Add events
- Edit events
- Delete events
- View scheduled orders
- View mechanic availability

**Redux State:**
```javascript
const calendar = useSelector((state) => state.calendar);
```

## Comments & Ratings Components

### `Comentarios/ComentariosValoraciones.jsx` - CommentsRatings

Public component for comments and ratings.

**Location:** `src/components/Comentarios/ComentariosValoraciones.jsx`

**Props:** None

**Features:**
- Display comments
- Display ratings
- Submit new comment
- Submit rating
- Filter by rating

---

### `Comentarios/AdminComentarios.jsx` - AdminComments

Admin component for managing comments.

**Location:** `src/components/Comentarios/AdminComentarios.jsx`

**Props:** None

**Features:**
- List all comments
- Approve/reject comments
- Delete comments
- Respond to comments
- Filter and search

## Layout Components

### `HeaderFooter/header.js` - AppHeader

Application header component with navigation.

**Location:** `src/components/HeaderFooter/header.js`

**Props:** None

**Features:**
- Navigation menu
- User menu
- Logout button
- Role-based menu items

---

### `HeaderFooter/Footer.js` - Footer

Application footer component.

**Location:** `src/components/HeaderFooter/Footer.js`

**Props:** None

**Features:**
- Footer links
- Copyright information
- Contact information

## Higher-Order Components

### `hoc/ProtectedRoute.jsx` - ProtectedRoute

HOC that protects routes requiring authentication.

**Location:** `src/hoc/ProtectedRoute.jsx`

**Props:**
- `children` (ReactNode) - Component to protect

**Features:**
- Checks for authentication token
- Redirects to login if not authenticated
- Renders children if authenticated

**Usage:**
```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

## Page Components

### `pages/ListaOrdenesPage.jsx` - OrdersPage

Page component for order management.

**Location:** `src/pages/ListaOrdenesPage.jsx`

**Features:**
- Order list
- Order search
- Order creation
- Order details

---

### `pages/MechanicOrdenListPage.jsx` - MechanicOrdersPage

Page for mechanics to view their assigned orders.

**Location:** `src/pages/MechanicOrdenListPage.jsx`

**Features:**
- Filter orders by mechanic
- Order status updates
- Order completion

---

### `pages/MarketingPage.jsx` - MarketingPage

Main marketing page with newsletter management.

**Location:** `src/pages/MarketingPage.jsx`

**Features:**
- Newsletter list
- Create newsletter
- Edit newsletter
- Newsletter examples

---

### `pages/NewsletterPage.jsx` - NewsletterPage

Dedicated page for newsletter management.

**Location:** `src/pages/NewsletterPage.jsx`

---

### `pages/FeedbackPage.jsx` - FeedbackPage

Page for feedback management.

**Location:** `src/pages/FeedbackPage.jsx`

---

### `pages/SubscriptionPage.jsx` - SubscriptionPage

Page for subscription management.

**Location:** `src/pages/SubscriptionPage.jsx`

---

### `pages/UserNotificationsPage.jsx` - UserNotificationsPage

Page for user notifications.

**Location:** `src/pages/UserNotificationsPage.jsx`

---

### `pages/AdminNotificationsPage.jsx` - AdminNotificationsPage

Page for admin notifications.

**Location:** `src/pages/AdminNotificationsPage.jsx`

---

### `pages/MechanicTasksPage.jsx` - MechanicTasksPage

Page for mechanic task management.

**Location:** `src/pages/MechanicTasksPage.jsx`

---

### `pages/ReportManagementPage.jsx` - ReportManagementPage

Page for report management.

**Location:** `src/pages/ReportManagementPage.jsx`

---

### `pages/MechanicFeedbackReportPage.jsx` - MechanicFeedbackReportPage

Page for mechanic feedback reports.

**Location:** `src/pages/MechanicFeedbackReportPage.jsx`

## Component Best Practices

1. **Use Functional Components** - All components should be functional with hooks
2. **Props Validation** - Use PropTypes or TypeScript for prop validation
3. **Error Boundaries** - Wrap components in error boundaries
4. **Loading States** - Always show loading states during API calls
5. **Error Handling** - Display user-friendly error messages
6. **Accessibility** - Use semantic HTML and ARIA attributes
7. **Performance** - Use React.memo for expensive components
8. **Code Splitting** - Lazy load large components

## Component Styling

All components have associated CSS files:
- Component styles in same directory
- Use CSS modules or styled-components for scoped styles
- Follow BEM naming convention
- Responsive design for mobile devices

## Testing Components

Example test structure:
```javascript
import { render, screen } from '@testing-library/react';
import UserList from './components/ListaUsuario/lista';

test('renders user list', () => {
  render(<UserList />);
  const title = screen.getByText(/Lista de Usuarios/i);
  expect(title).toBeInTheDocument();
});
```

