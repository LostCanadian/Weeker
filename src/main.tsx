import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AiPage from './ai/AiPage';
import './styles.css';

const basePath = import.meta.env.BASE_URL ?? '/';
const normalizedPath = (() => {
  const { pathname } = window.location;
  if (basePath === '/' || !pathname.startsWith(basePath)) return pathname;

  const trimmedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return pathname.startsWith(trimmedBase)
    ? `/${pathname.slice(trimmedBase.length).replace(/^\//, '')}`
    : pathname;
})();

// Select the entry component based on the current path so /ai renders the AI experience
// while all other routes continue to load the main Weeker app.
const Root = normalizedPath.startsWith('/ai') ? AiPage : App;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const serviceWorkerUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker
      .register(serviceWorkerUrl)
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  });
}
