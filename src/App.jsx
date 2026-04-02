import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Banque from './pages/Banque';
import ParisSportifs from './pages/ParisSportifs';
import Services from './pages/Services';
import Cashback from './pages/Cashback';
import Blog from './pages/Blog';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';

import AllOffers from './pages/AllOffers';
import ChatWidget from './components/ChatWidget';
import AdminChat from './pages/AdminChat';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white min-h-screen font-sans text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-support-prive" element={<AdminChat />} />
            <Route path="/offres" element={<AllOffers />} />
            <Route path="/banque" element={<Banque />} />
            <Route path="/paris-sportifs" element={<ParisSportifs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
            {/* Redirect old crypto page to banque */}
            <Route path="/crypto" element={<Navigate to="/banque" replace />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
