# Development Guide

Best practices and guidelines for developing the Lubricentro Management System.

## Table of Contents

- [Code Style](#code-style)
- [Component Development](#component-development)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Routing](#routing)
- [Styling](#styling)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Performance](#performance)
- [Security](#security)

## Code Style

### JavaScript/JSX Conventions

1. **Use Functional Components**
   ```jsx
   // ✅ Good
   const MyComponent = () => {
     return <div>Hello</div>;
   };

   // ❌ Avoid
   class MyComponent extends React.Component {
     render() {
       return <div>Hello</div>;
     }
   }
   ```

2. **Use Arrow Functions**
   ```jsx
   // ✅ Good
   const handleClick = () => {
     // Handle click
   };

   // ❌ Avoid
   function handleClick() {
     // Handle click
   }
   ```

3. **Use const/let, Avoid var**
   ```jsx
   // ✅ Good
   const name = 'John';
   let count = 0;

   // ❌ Avoid
   var name = 'John';
   ```

4. **Use Template Literals**
   ```jsx
   // ✅ Good
   const message = `Hello, ${name}!`;

   // ❌ Avoid
   const message = 'Hello, ' + name + '!';
   ```

5. **Destructuring**
   ```jsx
   // ✅ Good
   const { name, email } = user;
   const [first, second] = items;

   // ❌ Avoid
   const name = user.name;
   const email = user.email;
   ```

### Naming Conventions

1. **Components**: PascalCase
   ```jsx
   const UserList = () => {};
   const EditUserForm = () => {};
   ```

2. **Functions/Variables**: camelCase
   ```jsx
   const fetchUsers = () => {};
   const userName = 'John';
   ```

3. **Constants**: UPPER_SNAKE_CASE
   ```jsx
   const API_BASE_URL = 'https://api.example.com';
   const MAX_RETRIES = 3;
   ```

4. **Files**: Match component name
   ```
   UserList.jsx
   EditUserForm.jsx
   ```

## Component Development

### Component Structure

```jsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Component.css';

// 2. Component
const MyComponent = ({ prop1, prop2 }) => {
  // 3. Hooks
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [localState, setLocalState] = useState(null);

  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 5. Handlers
  const handleClick = () => {
    // Handle click
  };

  // 6. Render
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
};

// 7. Export
export default MyComponent;
```

### Component Best Practices

1. **Keep Components Small**
   - Single responsibility
   - Extract logic into custom hooks
   - Split large components

2. **Use PropTypes or TypeScript**
   ```jsx
   import PropTypes from 'prop-types';

   MyComponent.propTypes = {
     prop1: PropTypes.string.isRequired,
     prop2: PropTypes.number,
   };
   ```

3. **Memoization for Performance**
   ```jsx
   import React, { memo } from 'react';

   const ExpensiveComponent = memo(({ data }) => {
     // Component logic
   });
   ```

4. **Custom Hooks for Reusable Logic**
   ```jsx
   // useFetchUsers.js
   const useFetchUsers = () => {
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       // Fetch logic
     }, []);

     return { users, loading };
   };
   ```

## State Management

### When to Use Redux vs Local State

**Use Redux for:**
- Global application state
- Data shared across components
- Server state (users, orders, etc.)
- Complex state logic

**Use Local State for:**
- Component-specific UI state
- Form inputs
- Toggle states
- Temporary data

### Redux Best Practices

1. **Action Creators**
   ```jsx
   // actions/userActions.js
   export const setUsers = (users) => ({
     type: 'SET_USERS',
     payload: users,
   });
   ```

2. **Async Actions**
   ```jsx
   export const fetchUsers = () => async (dispatch) => {
     try {
       const response = await apiClient.get('/users');
       dispatch(setUsers(response.data));
     } catch (error) {
       dispatch(setError(error.message));
     }
   };
   ```

3. **Selectors**
   ```jsx
   // Use selectors for derived state
   const activeUsers = useSelector((state) =>
     state.users.users.filter((user) => user.activo)
   );
   ```

## API Integration

### Using apiClient

Always use `apiClient` instead of direct `axios` calls:

```jsx
// ✅ Good
import apiClient from '../apiClient';
import { API_ROUTES } from '../api';

const fetchData = async () => {
  const response = await apiClient.get(`${API_ROUTES.users}/lista-usuarios`);
  return response.data;
};

// ❌ Avoid
import axios from 'axios';
const response = await axios.get('https://api...');
```

### Error Handling

```jsx
const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await apiClient.get('/users');
    setUsers(response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with error
      setError(error.response.data.message);
    } else if (error.request) {
      // Request made but no response
      setError('No response from server');
    } else {
      // Error in request setup
      setError(error.message);
    }
  } finally {
    setLoading(false);
  }
};
```

### Loading States

Always show loading states:

```jsx
const [loading, setLoading] = useState(false);

if (loading) {
  return <div>Loading...</div>;
}
```

## Routing

### Route Configuration

```jsx
// ✅ Good - Protected routes
<Route
  path="/users"
  element={
    <ProtectedRoute>
      <UserList />
    </ProtectedRoute>
  }
/>

// ✅ Good - Public routes
<Route path="/login" element={<Login />} />
```

### Navigation

```jsx
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/users');
  };

  return <button onClick={handleClick}>Go to Users</button>;
};
```

### URL Parameters

```jsx
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  // Use id to fetch user data
};
```

## Styling

### CSS Organization

1. **Component-specific CSS**
   - One CSS file per component
   - Use BEM naming convention
   - Keep styles scoped

2. **Global Styles**
   - Use `index.css` for global styles
   - Define CSS variables for theming

3. **CSS Modules (Optional)**
   ```jsx
   import styles from './Component.module.css';

   <div className={styles.container}>
   ```

### Naming Conventions

```css
/* BEM Convention */
.user-list { }
.user-list__item { }
.user-list__item--active { }
```

## Error Handling

### Component Error Boundaries

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <MyComponent />
</ErrorBoundary>
```

### Form Validation

```jsx
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!formData.name) {
    newErrors.name = 'Name is required';
  }
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Testing

### Component Testing

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';

test('renders user list', () => {
  render(<UserList />);
  const title = screen.getByText(/Lista de Usuarios/i);
  expect(title).toBeInTheDocument();
});

test('handles search', () => {
  render(<UserList />);
  const input = screen.getByPlaceholderText(/buscar/i);
  fireEvent.change(input, { target: { value: 'John' } });
  expect(input.value).toBe('John');
});
```

### API Testing

```jsx
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchUsers } from './useFetchUsers';

test('fetches users', async () => {
  const { result } = renderHook(() => useFetchUsers());
  
  await waitFor(() => {
    expect(result.current.users).toHaveLength(5);
  });
});
```

## Performance

### Optimization Techniques

1. **React.memo**
   ```jsx
   const ExpensiveComponent = React.memo(({ data }) => {
     return <div>{data}</div>;
   });
   ```

2. **useMemo for Expensive Calculations**
   ```jsx
   const expensiveValue = useMemo(() => {
     return computeExpensiveValue(data);
   }, [data]);
   ```

3. **useCallback for Functions**
   ```jsx
   const handleClick = useCallback(() => {
     // Handle click
   }, [dependencies]);
   ```

4. **Code Splitting**
   ```jsx
   const LazyComponent = React.lazy(() => import('./LazyComponent'));

   <Suspense fallback={<div>Loading...</div>}>
     <LazyComponent />
   </Suspense>
   ```

5. **Virtual Scrolling for Long Lists**
   ```jsx
   import { FixedSizeList } from 'react-window';

   <FixedSizeList
     height={600}
     itemCount={items.length}
     itemSize={50}
   >
     {Row}
   </FixedSizeList>
   ```

## Security

### Best Practices

1. **Never Store Sensitive Data in localStorage**
   ```jsx
   // ✅ Good - Store token only
   localStorage.setItem('token', token);

   // ❌ Avoid - Don't store passwords
   localStorage.setItem('password', password);
   ```

2. **Validate Input on Client and Server**
   ```jsx
   const validateEmail = (email) => {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   };
   ```

3. **Sanitize User Input**
   ```jsx
   import DOMPurify from 'dompurify';

   const cleanHTML = DOMPurify.sanitize(userInput);
   ```

4. **Use HTTPS in Production**
   - Always use HTTPS for API calls
   - Never send credentials over HTTP

5. **Token Expiration**
   ```jsx
   import { isTokenExpired } from './services/authService';

   if (isTokenExpired(token)) {
     // Redirect to login
   }
   ```

## Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `hotfix/issue-name` - Critical fixes
- `refactor/component-name` - Code refactoring

### Commit Messages

```
feat: Add user search functionality
fix: Fix login token expiration issue
refactor: Refactor user list component
docs: Update API documentation
style: Format code with Prettier
test: Add tests for user component
chore: Update dependencies
```

## Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Components are properly structured
- [ ] Error handling is implemented
- [ ] Loading states are shown
- [ ] No console.logs in production code
- [ ] Comments are added for complex logic
- [ ] PropTypes/TypeScript types are defined
- [ ] Tests are written (if applicable)
- [ ] No hardcoded values
- [ ] API calls use apiClient
- [ ] Routes are protected (if needed)

## Additional Resources

- [React Best Practices](https://react.dev/learn)
- [Redux Best Practices](https://redux.js.org/style-guide/style-guide)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [CSS Guidelines](https://cssguidelin.es/)

