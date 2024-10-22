# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Project Overview
This project is a Todo application developed using **React**, **TypeScript**, and **Vite**. It allows users to create, update, delete, and manage tasks effectively.

### Features
- **Fetch Todo**: Users can view their list of tasks.
- **Create Todo**: Users can add new tasks to their list.
- **Update Todo**: Users can edit existing tasks.
- **Delete Todo**: Users can remove tasks from the list.
- **Changes Status**: Users can switch between different statuses (Pending, Done, Won't do) for each task.

### Setup and Run

To set up and run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:jenyach87/todoshealthspan.git
   cd todoshealthspan

2. Install dependencies: npm install
3. Run the development: npm run dev
4. Open your browser and navigate to http://localhost:5173 to view the application.
5. How the state manager used zustand