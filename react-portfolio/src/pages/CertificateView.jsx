import React from 'react';
import { Link } from '../Router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const CertificateView = () => {
  const params = new URLSearchParams(window.location.search);
  const img = params.get('img');
  const title = params.get('title') || 'Certificate';

  return (
    <div>
      <Navigation />
      <main style={{ padding: '48px 16px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 className="section-title">{decodeURIComponent(title)}</h2>
            <Link to="/certifications" className="btn btn-outline">Back</Link>
          </div>

          {img ? (
            <div style={{ textAlign: 'center' }}>
              <img src={decodeURIComponent(img)} alt={title} style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 8px 24px rgba(16,24,40,0.08)' }} />
            </div>
          ) : (
            <p>No certificate image provided.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificateView;
