import 'normalize.css';
import './main.css';
import './security.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ShinyProvider } from './ShinyProvider.tsx';
import { StrictMode } from 'react';
import ErrorBoundary from './ErrorBoundary.tsx';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="error">L'application a cessé de fonctionner</div>
      }
    >
      <ShinyProvider>
        <App />
      </ShinyProvider>
    </ErrorBoundary>
  </StrictMode>
);
