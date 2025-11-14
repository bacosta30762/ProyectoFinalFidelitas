# Contributing to Lubricentro Management System

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/bacosta30762/lubricentro-management-system.git
   cd lubricentro-management-system
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/bacosta30762/lubricentro-management-system.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Branch Naming

- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `hotfix/issue-name` - Critical fixes
- `refactor/component-name` - Code refactoring
- `docs/documentation-update` - Documentation updates
- `test/test-name` - Adding tests

### Workflow Steps

1. **Update your fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create your feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm test
   npm start  # Test manually
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to GitHub and create a PR
   - Fill out the PR template
   - Wait for review

## Coding Standards

### General Guidelines

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

2. **Follow Naming Conventions**
   - Components: PascalCase (`UserList.jsx`)
   - Functions/Variables: camelCase (`fetchUsers`)
   - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

3. **Use Modern JavaScript**
   - Arrow functions
   - Destructuring
   - Template literals
   - Async/await

4. **Keep Components Small**
   - Single responsibility
   - Extract reusable logic into hooks
   - Split large components

### Code Style

Follow the existing code style:

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use trailing commas in objects/arrays
- Maximum line length: 100 characters

### ESLint Configuration

The project uses ESLint. Run before committing:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint -- --fix
```

## Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commit messages
feat: Add user search functionality
fix: Resolve login token expiration issue
docs: Update API documentation
refactor: Simplify user list component
test: Add tests for user component

# Bad commit messages
update code
fix bug
changes
```

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Check linting**
   ```bash
   npm run lint
   ```

4. **Test manually**
   - Start the app: `npm start`
   - Test your changes thoroughly
   - Check for console errors

### PR Template

When creating a PR, include:

1. **Description**
   - What changes were made
   - Why the changes were needed
   - How to test the changes

2. **Screenshots** (if UI changes)

3. **Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No console errors
   - [ ] Tested on multiple browsers

### Review Process

1. **Automated Checks**
   - Tests must pass
   - Linting must pass
   - No merge conflicts

2. **Code Review**
   - At least one approval required
   - Address review comments
   - Update PR if needed

3. **Merge**
   - Squash and merge (preferred)
   - Delete feature branch after merge

## Testing

### Writing Tests

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('handles user interaction', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Documentation

### Updating Documentation

When making changes:

1. **Update README.md** if:
   - Adding new features
   - Changing setup process
   - Updating dependencies

2. **Update API_REFERENCE.md** if:
   - Adding new API endpoints
   - Changing API structure
   - Updating request/response formats

3. **Update COMPONENT_REFERENCE.md** if:
   - Adding new components
   - Changing component props
   - Updating component behavior

4. **Add code comments** for:
   - Complex logic
   - Non-obvious code
   - Public APIs

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Keep documentation up to date

## Questions?

- Open an issue for bugs or feature requests
- Ask questions in discussions
- Contact maintainers for guidance

## Thank You!

Your contributions make this project better. Thank you for taking the time to contribute!

