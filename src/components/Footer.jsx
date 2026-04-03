import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1 : Advantages */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tighter">Pourquoi nous ?</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Primes vérifiées
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" /></svg> Accès 100% gratuit
              </li>
            </ul>
          </div>

          {/* Section 2 : How it works */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Comment ça marche ?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Inscrivez-vous via nos liens ou codes pour vos services du quotidien (banque, achats, forfaits) et recevez immédiatement une prime de bienvenue. C'est simple, rapide et 100% gratuit.
            </p>
          </div>

          {/* Section 3 : Links */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tighter">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/mentions-legales" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-0.5 group">
            <span className="text-sm font-black tracking-tighter text-indigo-600">MONEY</span>
            <span className="text-sm font-black tracking-tighter text-gray-900 group-hover:text-indigo-600 transition-colors">GAGNANT</span>
          </Link>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">&copy; {new Date().getFullYear()} Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
