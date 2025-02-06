import 'normalize.css';
import './main.css';
import './security.ts';
import { createRoot } from 'react-dom/client';
import Component from './Component.tsx';

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(<Component />);
