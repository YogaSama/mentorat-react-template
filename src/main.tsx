import 'normalize.css';
import './main.css';
import './guard.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(<App />);
