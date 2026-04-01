import { Link } from 'react-router-dom';
import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="bg-white">
      {/* 1. COMPACT MODERN HERO */}
      <section className="relative overflow-hidden bg-mesh-emerald py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Abstract decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="animate-float backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white uppercase leading-none">
              Encaissez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white italic">Primes Cash</span> 💸
            </h1>
            <p className="text-lg md:text-xl font-bold text-emerald-50/90 mb-6 max-w-xl mx-auto leading-tight">
              La sélection d'élite des parrainages les plus lucratifs du Web. 
              <span className="block mt-1 font-black text-white">Vérifié. Immédiat. Garanti.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
               <div className="flex items-center gap-2 bg-emerald-900/40 px-4 py-2 rounded-xl border border-white/10 text-xs font-black text-white">
                  💰 +2,500€ À SAISIR
               </div>
               <div className="flex items-center gap-2 bg-emerald-400/20 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm text-xs font-black text-white">
                  🛡️ 100% SÉCURISÉ
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MONEY WALL (TOP 8) */}
      <section id="money-wall" className="pt-8 md:pt-10 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
             <div className="flex items-center gap-3">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-black text-xs uppercase italic animate-pulse">FLASH INFO :</div>
                <div className="text-gray-900 font-black text-lg md:text-xl tracking-tight">TOP 8 DES OFFRES LES PLUS RENTABLES</div>
             </div>
             <Link 
              to="/offres" 
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all hover:scale-105"
            >
              Voir tout le catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {offers
              .sort((a, b) => (b.rewardValue || 0) - (a.rewardValue || 0))
              .slice(0, 8)
              .map((offer, index) => (
                <OfferCard key={`top-${index}`} offer={offer} />
              ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK CATEGORY ACCESS */}
      <section id="offres" className="py-16 px-4 sm:px-6 lg:px-8 bg-white max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Parcourez par catégorie</h2>
          <div className="w-24 h-2 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {['banque', 'paris', 'cashback', 'services', 'revenus_passifs'].map((category) => {
          const categoryOffers = offers
            .filter(o => o.category === category)
            .sort((a, b) => (b.rewardValue || 0) - (a.rewardValue || 0));

          if (categoryOffers.length === 0) return null;

          const categoryNames = {
            'banque': 'Banque & Finance',
            'paris': 'Paris Sportifs',
            'cashback': 'Cashback & Shopping',
            'services': 'Services Premium',
            'revenus_passifs': 'Revenus Passifs'
          };

          const categoryLinks = {
            'banque': '/banque',
            'paris': '/paris-sportifs',
            'cashback': '/cashback',
            'services': '/services',
            'revenus_passifs': '/services'
          };

          const categoryDescriptions = {
            'banque': 'Les meilleures offres pour ouvrir un compte gratuit et encaisser une prime.',
            'paris': 'Multipliez vos gains avec les bonus de bienvenue des bookmakers.',
            'cashback': 'Faites-vous rembourser une partie de vos achats en ligne.',
            'services': 'Des abonnements premium et services utiles avec des réductions exclusives.',
            'revenus_passifs': 'Générez de l\'argent sans rien faire en partageant votre bande passante inutilisée.'
          };

          return (
            <div key={category} className="mb-20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                  {categoryNames[category]}
                </h3>
                <Link to={categoryLinks[category]} className="text-emerald-600 hover:text-emerald-700 font-black text-sm uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-lg transition-colors">
                  Voir tout →
                </Link>
              </div>
              <p className="text-gray-500 font-medium mb-6 ml-5">
                {categoryDescriptions[category]}
              </p>
              <div className="border-t-2 border-gray-100 mb-6"></div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {categoryOffers.slice(0, 4).map((offer, index) => (
                  <OfferCard key={`${category}-${index}`} offer={offer} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. TRUST & REVIEWS (SOCIAL PROOF AT THE BOTTOM) */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Pourquoi nous ?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center grow-0 shrink-0 text-emerald-600 font-black">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900">100% Vérifié</h4>
                    <p className="text-gray-600 text-sm">Chaque offre est testée manuellement par notre équipe.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center grow-0 shrink-0 text-emerald-600">💳</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Zéro Frais</h4>
                    <p className="text-gray-600 text-sm">Notre service est et restera toujours gratuit.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black italic text-emerald-500">“</div>
                  <p className="text-gray-700 italic mb-6 relative z-10">"J'ai gagné 160€ en 10 minutes avec BoursoBank. Le site est clair et les liens fonctionnent."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700 text-xs">MD</div>
                    <div className="font-black text-gray-900 text-sm italic">Marc D. ✓</div>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black italic text-emerald-500">“</div>
                  <p className="text-gray-700 italic mb-6 relative z-10">"Enfin un site qui ne ment pas sur les primes. Déjà 400€ encaissés ce mois-ci !"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-xs">SL</div>
                    <div className="font-black text-gray-900 text-sm italic">Sophie L. ✓</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Questions fréquentes</h2>
            <p className="text-lg text-gray-600 font-medium">Tout ce que vous devez savoir</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Est-ce vraiment gratuit ?", a: "Oui, nous ne prenons aucune commission sur vos gains. Les primes sont versées directement par les partenaires." },
              { q: "Comment gagnez-vous de l'argent ?", a: "Nous touchons parfois une commission de la part des banques pour leur avoir apporté un nouveau client, mais cela ne change rien à votre prime." },
              { q: "Les offres sont-elles sûres ?", a: "Oui, nous ne sélectionnons que des partenaires régulés par l'ACPR (Banque de France) ou des autorités financières reconnues." }
            ].map((faq, i) => (
              <details key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group cursor-pointer hover:border-emerald-200 transition-colors">
                <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-lg">
                  {faq.q}
                  <span className="text-emerald-500 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-200 pt-4 cursor-text font-medium">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section className="bg-gray-50 border-t border-gray-200">
        <ContactForm />
      </section>
    </div>
  );
}
