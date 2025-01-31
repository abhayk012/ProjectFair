import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './context/ContextShare';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextShare>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextShare>

  </React.StrictMode>
);

reportWebVitals();
