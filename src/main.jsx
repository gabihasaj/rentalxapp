import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import Home from './Home'

createRoot(document.getElementById('root')).render(
  <HashRouter>
  <App />
</HashRouter>
  );

