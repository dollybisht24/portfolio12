import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ProjectsPage from './pages/ProjectsPage'
import CertificationsPage from './pages/CertificationsPage'
import CertificateView from './pages/CertificateView'
import Router from './Router'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const routes = {
  '/': App,
  '': App,
  '/projects': ProjectsPage,
  '/projects.html': ProjectsPage,
  '/certifications': CertificationsPage,
  '/certifications.html': CertificationsPage,
  '/certificate': CertificateView,
  '*': App
};

root.render(
  <React.StrictMode>
    <Router routes={routes} />
  </React.StrictMode>
);
