# Setup Guide

Complete setup instructions for the Lubricentro Management System.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (v6.0.0 or higher) or **yarn**
  - npm comes with Node.js
  - Verify installation: `npm --version`
  
- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

- **Code Editor** (recommended: Visual Studio Code)
  - Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/bacosta30762/lubricentro-management-system.git

# Navigate to the project directory
cd lubricentro-management-system
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install
```

This will install all packages listed in `package.json`:
- React and React DOM
- React Router DOM
- Redux Toolkit
- Axios
- Bootstrap
- And all other dependencies

**Expected output:**
```
added 1234 packages, and audited 1235 packages in 45s
```

### 3. Configure Environment

#### API Configuration

Edit `src/api.js` to configure your API endpoint:

```javascript
// For production
const BASE_URL = "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api";

// For local development (if you have a local API)
// const BASE_URL = "https://localhost:7180/api";
```

#### Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api
REACT_APP_ENV=development
```

Then update `src/api.js`:

```javascript
const BASE_URL = process.env.REACT_APP_API_URL || "https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api";
```

### 4. Start Development Server

```bash
npm start
```

The application will:
- Start on `http://localhost:3000`
- Automatically open in your default browser
- Hot-reload when you make changes

**Expected output:**
```
Compiled successfully!

You can now view web-page-lubricentro in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000

Note that the compiled output is not optimized.
To create a production build, use npm run build.
```

## Development Workflow

### Running the Application

```bash
# Start development server
npm start

# The app will be available at http://localhost:3000
```

### Building for Production

```bash
# Create optimized production build
npm run build

# The build folder will contain the production-ready files
```

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --watchAll=false
```

### Code Quality

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint -- --fix
```

## Project Structure Overview

```
lubricentro-management-system/
├── public/                    # Static files
│   └── index.html            # HTML template
├── src/                       # Source code
│   ├── api.js                 # API configuration
│   ├── apiClient.js           # Axios client setup
│   ├── App.jsx                # Main app component
│   ├── index.js               # Entry point
│   ├── index.css              # Global styles
│   ├── components/            # React components
│   ├── pages/                 # Page components
│   ├── redux/                 # Redux store
│   ├── services/              # Service utilities
│   └── hoc/                   # Higher-order components
├── docs/                      # Documentation
├── package.json               # Dependencies and scripts
└── README.md                  # Main documentation
```

## Common Setup Issues

### Issue 1: Port Already in Use

**Error:**
```
Something is already running on port 3000
```

**Solution:**
```bash
# Option 1: Kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Option 2: Use a different port
PORT=3001 npm start
```

### Issue 2: Node Modules Issues

**Error:**
```
Module not found: Can't resolve '...'
```

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Issue 3: API Connection Errors

**Error:**
```
Network Error
CORS policy
```

**Solution:**
1. Check if the API server is running
2. Verify the API URL in `src/api.js`
3. Check CORS settings on the API server
4. For local development, ensure the API allows requests from `http://localhost:3000`

### Issue 4: Authentication Token Issues

**Error:**
```
401 Unauthorized
```

**Solution:**
1. Clear localStorage:
   ```javascript
   localStorage.clear();
   ```
2. Login again to get a new token
3. Check if the token is expired

## Development Tools

### Recommended VS Code Extensions

1. **ES7+ React/Redux/React-Native snippets**
2. **ESLint**
3. **Prettier - Code formatter**
4. **Auto Rename Tag**
5. **Bracket Pair Colorizer**
6. **GitLens**

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single"
}
```

## Git Configuration

### Initial Git Setup

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/yourusername/lubricentro-management-system.git
```

### Common Git Commands

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Create a new branch
git checkout -b feature/your-feature-name
```

## Database Setup (If Applicable)

If you need to set up a local database:

1. Install database server (PostgreSQL, MySQL, etc.)
2. Create database
3. Run migrations
4. Seed initial data (if needed)

## API Server Setup

If you need to run the API server locally:

1. Clone the API repository
2. Install dependencies
3. Configure database connection
4. Set environment variables
5. Run the server

## Browser Support

The application supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### Code Splitting

The application uses React Router for code splitting. Components are loaded on demand.

## Troubleshooting

### Clear Cache

```bash
# Clear npm cache
npm cache clean --force

# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
```

### Reset Everything

```bash
# Remove all dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build folder
rm -rf build

# Clear browser storage
# Open DevTools > Application > Clear storage
```

## Getting Help

If you encounter issues:

1. Check the [README.md](../README.md) for common solutions
2. Review the [API Reference](API_REFERENCE.md)
3. Check the [Component Reference](COMPONENT_REFERENCE.md)
4. Open an issue on GitHub
5. Contact the development team

## Next Steps

After setup:

1. Read the [README.md](../README.md) for project overview
2. Review [API_REFERENCE.md](API_REFERENCE.md) for API usage
3. Check [COMPONENT_REFERENCE.md](COMPONENT_REFERENCE.md) for components
4. Start developing!

## Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Axios Documentation](https://axios-http.com/)

