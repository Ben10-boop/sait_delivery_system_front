import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { tokenKey } from './hooks/UseUser';
import axios from 'axios';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem(tokenKey)}`;
