import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Banque from './pages/Banque';
import Crypto from './pages/Crypto';
import Services from './pages/Services';
import Cashback from './pages/Cashback';
import Blog from './pages/Blog';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white min-h-screen font-sans text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banque" element={<Banque />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
