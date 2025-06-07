import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

if (import.meta.env.DEV) {
  import('./mocks/browser').then(({ worker }) => {
    worker.start();
  });
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
