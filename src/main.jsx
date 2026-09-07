import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import './index.css';

const isAdminPath = window.location.pathname.replace(/\/+$/, '') === '/admin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdminPath ? <AdminPanel /> : <App />}
  </React.StrictMode>
);
