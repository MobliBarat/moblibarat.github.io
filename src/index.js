import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Stelle sicher, dass diese Datei nur CSS enthält
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Wenn du die Leistung deiner App messen möchtest,
// sende eine Funktion an reportWebVitals (z.B. console.log)
// oder an einen Analyse-Endpunkt. Erfahre mehr: https://bit.ly/CRA-vitals
reportWebVitals();
