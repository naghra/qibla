import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </React.StrictMode>
  );
}
