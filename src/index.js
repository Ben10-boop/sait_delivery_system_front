import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { tokenKey } from './hooks/UseUser';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem(tokenKey)}`;
