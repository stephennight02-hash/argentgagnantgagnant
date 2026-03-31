import { Link } from 'react-router-dom';
import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';

export default function Home() {
  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="bg-emerald-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Gagnez de l'argent grâce au <span className="text-emerald-600">parrainage</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
              Découvrez les meilleures offres de parrainage et gagnez facilement de l'argent lors de l'ouverture de vos comptes bancaires, courtiers ou services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#offres" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
              >
                Voir les offres
              </a>
              <Link 
                to="/banque" 
                className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-lg shadow-md border border-gray-200 transition-all text-lg"
              >
                Offres Bancaires
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden md:block">
            {/* Simple abstract illustration using div styling */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
              <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative z-10 flex items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 mt-12">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl">+180€</div>
                    <div>
                      <div className="font-bold text-gray-900">Banque A</div>
                      <div className="text-sm text-gray-500">Parrainage validé !</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl">+50€</div>
                    <div>
                      <div className="font-bold text-gray-900">Courtier B</div>
                      <div className="text-sm text-gray-500">Prime reçue !</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / EXPLANATION SECTION */}
      <section className="py-16 bg-white shrink-0 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comment ça marche ?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-gray-700 mx-auto mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Offres fiables</h3>
              <p className="text-gray-600">Toutes les offres présentées sont testées et approuvées. Nous sélectionnons uniquement les parrainages 100% vérifiés et sécurisés.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-gray-700 mx-auto mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simple et rapide</h3>
              <p className="text-gray-600">Inscrivez-vous via nos liens ou utilisez nos codes lors de votre inscription. Quelques minutes suffisent.</p>
            </div>
            
            <div className="bg-emerald-50 p-8 rounded-2xl text-center border border-emerald-100">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">Gagnez de l'argent</h3>
              <p className="text-emerald-800">Recevez votre prime de parrainage directement sur votre compte bancaire ou sous forme de bons d'achat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS / TESTIMONIALS SECTION */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ils ont gagné de l'argent avec nous</h2>
            <p className="text-gray-600 text-lg">Rejoignez des centaines d'utilisateurs satisfaits</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                ★★★★★
              </div>
              <p className="text-gray-700 italic mb-6">"J'ai pu gagner 160€ très rapidement en changeant pour une banque en ligne via leur lien. Le code promo a fonctionné du premier coup."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">MD</div>
                <div>
                  <div className="font-bold text-gray-900">Marc D.</div>
                  <div className="text-xs text-gray-500">42 ans</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                ★★★★★
              </div>
              <p className="text-gray-700 italic mb-6">"Site super clair, on voit tout de suite les meilleures offres. Déjà 250€ encaissés avec la crypto et les banques, je recommande !"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">SL</div>
                <div>
                  <div className="font-bold text-gray-900">Sophie L.</div>
                  <div className="text-xs text-gray-500">28 ans</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                ★★★★☆
              </div>
              <p className="text-gray-700 italic mb-6">"Excellente sélection. J'aime bien le fait que les conditions soient explicitées si besoin. Ça met en confiance comparé à d'autres sites."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700">TM</div>
                <div>
                  <div className="font-bold text-gray-900">Thomas M.</div>
                  <div className="text-xs text-gray-500">35 ans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST OFFERS BY CATEGORY */}
      <section id="offres" className="py-20 px-4 sm:px-6 lg:px-8 bg-white max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Les Meilleures Offres du Moment</h2>
          <p className="text-xl text-gray-600">Sélectionnées avec soin, classées par rentabilité</p>
        </div>

        {['banque', 'crypto', 'cashback', 'services', 'revenus_passifs'].map((category) => {
          const categoryOffers = offers
            .filter(o => o.category === category)
            .sort((a, b) => b.rewardValue - a.rewardValue);

          if (categoryOffers.length === 0) return null;

          const categoryNames = {
            'banque': 'Banque & Finance',
            'crypto': 'Crypto-monnaies',
            'cashback': 'Cashback & Shopping',
            'services': 'Services (VPN, Assurance, etc.)',
            'revenus_passifs': 'Revenus Passifs'
          };

          return (
            <div key={category} className="mb-16">
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {categoryNames[category]}
                </h3>
                <Link to={`/${category === 'revenus_passifs' ? 'services' : category}`} className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm hidden sm:block">
                  Voir tout →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryOffers.slice(0, 3).map((offer, index) => (
                  <OfferCard key={`${category}-${index}`} offer={offer} />
                ))}
              </div>
              <div className="mt-6 text-center sm:hidden">
                <Link to={`/${category === 'revenus_passifs' ? 'services' : category}`} className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                  Voir plus d'offres...
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-lg text-gray-600">Tout ce que vous devez savoir sur le parrainage</p>
          </div>
          
          <div className="space-y-4">
            <details className="bg-white p-5 rounded-lg border border-gray-200 group cursor-pointer hover:border-emerald-200 transition-colors shadow-sm">
              <summary className="font-semibold text-gray-900 list-none flex justify-between items-center text-lg">
                Est-ce que c'est vraiment gratuit ?
                <span className="text-emerald-500 group-open:rotate-45 transition-transform text-2xl font-normal leading-none">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 cursor-text">
                Oui, l'utilisation de notre site est 100% gratuite. Vous n'avez absolument rien à payer pour accéder à nos codes et utiliser nos liens de parrainage.
              </p>
            </details>
            
            <details className="bg-white p-5 rounded-lg border border-gray-200 group cursor-pointer hover:border-emerald-200 transition-colors shadow-sm">
              <summary className="font-semibold text-gray-900 list-none flex justify-between items-center text-lg">
                Comment je gagne de l'argent ?
                <span className="text-emerald-500 group-open:rotate-45 transition-transform text-2xl font-normal leading-none">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 cursor-text">
                Les banques et services offrent des primes pour attirer de nouveaux clients (coût d'acquisition). En vous inscrivant via nos liens, la plateforme partenaire vous verse directement l'argent sur votre nouveau compte en guise de bienvenue.
              </p>
            </details>
            
            <details className="bg-white p-5 rounded-lg border border-gray-200 group cursor-pointer hover:border-emerald-200 transition-colors shadow-sm">
              <summary className="font-semibold text-gray-900 list-none flex justify-between items-center text-lg">
                Les offres sont-elles fiables ?
                <span className="text-emerald-500 group-open:rotate-45 transition-transform text-2xl font-normal leading-none">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 cursor-text">
                Absolument. Nous mettons continuellement à jour nos offres et nous vérifions que chaque service partenaire est officiellement reconnu, régulé et totalement digne de confiance.
              </p>
            </details>
            
            <details className="bg-white p-5 rounded-lg border border-gray-200 group cursor-pointer hover:border-emerald-200 transition-colors shadow-sm">
              <summary className="font-semibold text-gray-900 list-none flex justify-between items-center text-lg">
                Combien puis-je gagner avec les parrainages ?
                <span className="text-emerald-500 group-open:rotate-45 transition-transform text-2xl font-normal leading-none">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 cursor-text">
                Cela dépend entièrement des offres. Les primes bancaires tournent généralement autour de 80€ à 160€ par ouverture de compte, tandis que les services de cashback offrent souvent entre 5€ et 15€ de bienvenue. Cumuler plusieurs offres permet de générer des centaines d'euros.
              </p>
            </details>
            
            <details className="bg-white p-5 rounded-lg border border-gray-200 group cursor-pointer hover:border-emerald-200 transition-colors shadow-sm">
              <summary className="font-semibold text-gray-900 list-none flex justify-between items-center text-lg">
                Dois-je payer quelque chose lors de l'inscription ?
                <span className="text-emerald-500 group-open:rotate-45 transition-transform text-2xl font-normal leading-none">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 cursor-text">
                En général, non. La grande majorité des banques en ligne et services présentés proposent des offres sans frais. Certaines conditions (comme un dépôt initial) peuvent être requises selon les partenaires, mais ces fonds vous appartiennent toujours.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
