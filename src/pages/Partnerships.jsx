import React from 'react';

export default function Partnerships() {
  return (
    <div className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
            Programme de <span className="text-emerald-600">Partenariats</span>
          </h1>
          <p className="text-xl text-gray-600 font-bold max-w-2xl mx-auto leading-relaxed italic">
            "Maximisons nos gains ensemble. Vous avez le lien, nous avons l'audience."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 font-bold">
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Le Concept
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Vous possédez un lien de parrainage avantageux mais vous manquez de visibilité ? Nous vous proposons de l'intégrer directement sur notre plateforme.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Partage des revenus</span>
              <span className="text-5xl font-black text-emerald-600">50 / 50</span>
            </div>
          </div>

          <div className="bg-emerald-900 text-white p-10 rounded-3xl shadow-xl shadow-emerald-200">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
              Vos Avantages
            </h2>
            <ul className="space-y-4 text-emerald-100">
              <li className="flex items-center gap-3">
                <span className="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black text-white">✓</span>
                Visibilité immédiate
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black text-white">✓</span>
                Gestion administrative par nos soins
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black text-white">✓</span>
                Reporting transparent
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black text-white">✓</span>
                Paiements rapides
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <div className="text-9xl font-black italic text-emerald-500">🤝</div>
          </div>
          
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Comment postuler ?</h2>
          <p className="text-emerald-100/80 mb-10 max-w-lg mx-auto font-bold text-lg">
            Envoyez-nous un email avec l'offre concernée et les détails du lien que vous souhaitez partager.
          </p>
          
          <a 
            href="mailto:partenariats@parrainagegagnant.fr" 
            className="inline-block bg-white text-gray-900 font-black px-12 py-5 rounded-2xl hover:bg-emerald-400 hover:text-white transition-all uppercase tracking-widest text-lg shadow-2xl"
          >
            partenariats@parrainagegagnant.fr
          </a>
        </div>
      </div>
    </div>
  );
}
