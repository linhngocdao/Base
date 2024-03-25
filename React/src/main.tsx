import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <Router>
        <App />
      </Router>
    </StyleProvider>
  </React.StrictMode>
)
