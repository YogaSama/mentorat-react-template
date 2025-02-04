import 'normalize.css';
import './main.css';
import './init.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ShinyProvider } from './ShinyContext.tsx';
import { SyncProvider } from './SyncContext.tsx';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
  <SyncProvider>
    <ShinyProvider>
      <App />
    </ShinyProvider>
  </SyncProvider>
);
