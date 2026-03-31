import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Banque', path: '/banque' },
    { name: 'Crypto', path: '/crypto' },
    { name: 'Services', path: '/services' },
    { name: 'Cashback', path: '/cashback' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2 hover:text-emerald-600 transition-colors">
              <img src="/Money_Face_Emoji.png" alt="Logo Parrainage" className="w-8 h-8 object-contain" /> Parrainage
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "px-3 py-2 rounded-md font-medium transition-colors",
                  isActive(link.path) 
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="ml-4 flex items-center">
              <Link 
                to="/#offres" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-2 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Toutes les offres
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500" 
              aria-controls="mobile-menu" 
              aria-expanded={isOpen}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={clsx("md:hidden", isOpen ? "block" : "hidden")} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-inner bg-gray-50 border-t border-gray-100">
          {navLinks.map((link) => (
             <Link
               key={link.path}
               to={link.path}
               onClick={() => setIsOpen(false)}
               className={clsx(
                 "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                 isActive(link.path)
                   ? "text-emerald-600 bg-emerald-50"
                   : "text-gray-900 hover:bg-emerald-50 hover:text-emerald-600"
               )}
             >
               {link.name}
             </Link>
          ))}
          
          <div className="mt-4 px-3 pb-2">
            <Link 
              to="/#offres" 
              className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-3 rounded-md transition-colors shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Voir les offres
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
