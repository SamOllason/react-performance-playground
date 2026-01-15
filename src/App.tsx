import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { UnoptimizedPage } from './pages/UnoptimizedPage';
import { OptimizedPage } from './pages/OptimizedPage';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const linkStyle = (path: string): React.CSSProperties => ({
    padding: '12px 24px',
    margin: '0 8px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: location.pathname === path ? '#2196F3' : '#607D8B',
    borderRadius: '4px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  });

  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '16px',
      marginBottom: '0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ color: 'white', margin: '0', marginRight: '32px' }}>
          🐕 React 18 Performance Demo
        </h2>
        <Link to="/" style={linkStyle('/')}>
          ⚠️ Unoptimized
        </Link>
        <Link to="/optimized" style={linkStyle('/optimized')}>
          ✅ Optimized
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router basename="/react-performance-playground">
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<UnoptimizedPage />} />
          <Route path="/optimized" element={<OptimizedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
