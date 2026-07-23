import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Survey } from './pages/Survey';
import { ThankYou } from './pages/ThankYou';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        {/* Fixed Sticky Navbar with language toggle */}
        <Navbar />
        {/* Page content pushed below the navbar height (56px = h-14) */}
        <div className="pt-14">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
