import 'normalize.css';
import './main.css';
import './security.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ShinyProvider } from './ShinyProvider.tsx';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
  <ShinyProvider>
    <App />
  </ShinyProvider>
);
