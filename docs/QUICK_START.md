# Quick Start Guide

Get up and running with the Lubricentro Management System in 5 minutes.

## Prerequisites Check

```bash
# Check Node.js version (should be v14+)
node --version

# Check npm version
npm --version

# Check Git
git --version
```

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/lubricentro-management-system.git
cd lubricentro-management-system

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at `http://localhost:3000`

## First Steps

### 1. Login

Navigate to the login page and use your credentials:
- Email: `admin@example.com`
- Password: (your password)

### 2. Explore the Application

- **User Management**: `/user-list` - View and manage users
- **Orders**: `/lista-ordenes` - Manage service orders
- **Financial**: `/ingresos` or `/egresos` - Track income and expenses
- **Inventory**: `/inventarios` - Manage inventory
- **Calendar**: `/calendario` - View calendar and schedule

### 3. Create Your First Component

```jsx
// src/components/MyComponent/MyComponent.jsx
import React from 'react';
import './MyComponent.css';

const MyComponent = () => {
  return (
    <div className="my-component">
      <h1>Hello World!</h1>
    </div>
  );
};

export default MyComponent;
```

### 4. Add a Route

```jsx
// src/App.jsx
import MyComponent from './components/MyComponent/MyComponent';

// Add to Routes
<Route
  path="/my-component"
  element={
    <ProtectedRoute>
      <MyComponent />
    </ProtectedRoute>
  }
/>
```

## Common Tasks

### Fetch Data from API

```jsx
import { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { API_ROUTES } from '../api';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`${API_ROUTES.users}/lista-usuarios`);
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.nombre}</div>
      ))}
    </div>
  );
};
```

### Use Redux

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/actions/userActions';

const MyComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const handleClick = () => {
    dispatch(setUsers([...users, newUser]));
  };

  return <button onClick={handleClick}>Add User</button>;
};
```

### Create a Form

```jsx
import { useState } from 'react';
import apiClient from '../apiClient';
import { API_ROUTES } from '../api';

const MyForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post(`${API_ROUTES.users}`, formData);
      alert('Success!');
    } catch (error) {
      alert('Error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

## Next Steps

1. Read the [Full Setup Guide](SETUP_GUIDE.md)
2. Review [Component Reference](COMPONENT_REFERENCE.md)
3. Check [API Reference](API_REFERENCE.md)
4. Follow [Development Guide](DEVELOPMENT_GUIDE.md)

## Need Help?

- Check the [README.md](../README.md)
- Review the documentation in the `docs/` folder
- Open an issue on GitHub

