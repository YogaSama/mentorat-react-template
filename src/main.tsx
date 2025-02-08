import 'normalize.css';
import './main.css';
import './security.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { StrictMode } from 'react';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
