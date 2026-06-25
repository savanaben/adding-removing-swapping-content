# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

[React Compiler](https://react.dev/learn/react-compiler) automatically memoizes components and values so you rely less on manual `useMemo`, `useCallback`, and `memo`. It is **not enabled** in this project because the Babel plugin adds work to every dev and production build (slower cold starts, longer builds). Enable it when you want the compiler’s optimizations and are willing to pay that cost.

This app uses **Vite** with [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) (the Babel-based React plugin), not the SWC plugin. To turn the compiler on:

1. **Install the Babel plugin** (dev dependency):

   ```bash
   npm install -D babel-plugin-react-compiler@latest
   ```

2. **Wire it through `vite.config.ts`** so the compiler runs in the same Babel pipeline as React’s JSX transform. The compiler must run **first** among Babel plugins. Extend your existing `react()` call like this:

   ```ts
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [
       react({
         babel: {
           plugins: ['babel-plugin-react-compiler'],
         },
       }),
       // ...other plugins
     ],
   })
   ```

   If you use [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) instead, you cannot pass Babel plugins to `react()`—use the [separate Babel plugin approach](https://react.dev/learn/react-compiler/installation#vite) (`vite-plugin-babel`) or switch to the Babel-based React plugin.

3. **Optional: ESLint** — `eslint-plugin-react-hooks` includes rules that flag patterns the compiler cannot optimize. This repo already uses that plugin; align with the [`recommended-latest` preset](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md) if you want the compiler-oriented rules.

4. **Verify** — In development, open [React DevTools](https://react.dev/learn/react-developer-tools): optimized components may show a **Memo ✨** badge. You can also inspect production build output for imports from `react/compiler-runtime` and generated memoization logic, as described in the [official installation guide](https://react.dev/learn/react-compiler/installation#check-build-output).

If a compiled component misbehaves, you can opt it out with the [`"use no memo"` directive](https://react.dev/learn/react-compiler/installation#opting-out-specific-components) until you fix the underlying issue. Full options (e.g. targeting older React), troubleshooting, and library compilation are covered in the [React Compiler installation docs](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
