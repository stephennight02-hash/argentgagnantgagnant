import { Link } from 'react-router-dom';
import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="bg-white">
      {/* 1. HERO SECTION - BRANDING & CONVERSION */}
      <section className="bg-emerald-900 pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b-8 border-emerald-500 relative overflow-hidden">
        {/* Abstract background blobs for premium feel */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white uppercase leading-none">
            Parrainage <span className="text-emerald-400">Gagnant</span>
          </h1>
          <p className="text-base md:text-xl font-bold text-emerald-100/90 mb-8 max-w-xl mx-auto italic">
            "Inscrivez-vous via nos liens, quelques étapes suivies et gagnez de l'argent simplement."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
             <a href="#faq" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-3 rounded-2xl transition-all border-2 border-white/20 text-xs uppercase tracking-widest backdrop-blur-sm">
                Comment ça marche ?
             </a>
          </div>

          {/* New Trust Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-8 border-t border-white/10">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
              <span className="text-3xl group-hover:scale-110 transition-transform">🔥</span>
              <div className="text-left">
                <div className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-1">Illimité</div>
                <div className="text-white font-bold text-sm leading-tight">Possédez un compte par banque sans limite.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
              <span className="text-3xl group-hover:scale-110 transition-transform">💳</span>
              <div className="text-left">
                <div className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-1">Gratuit</div>
                <div className="text-white font-bold text-sm leading-tight">Aucun frais caché ou service payant.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
              <span className="text-3xl group-hover:scale-110 transition-transform">🔓</span>
              <div className="text-left">
                <div className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-1">Sans Engagement</div>
                <div className="text-white font-bold text-sm leading-tight">Clôture gratuite à tout moment, sans frais.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM FLASH INFO TICKER */}
      <div className="bg-white border-b border-gray-100 overflow-hidden py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="shrink-0 bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest italic animate-pulse shadow-sm shadow-red-200">Flash Info</span>
            <div className="flex-1 overflow-hidden">
               <div className="whitespace-nowrap font-black text-gray-800 text-sm md:text-base uppercase italic tracking-tight animate-[marquee_20s_linear_infinite]">
                 🔥 Les primes BoursoBank (220€) et Fortuneo (160€) sont limitées ! Profitez-en avant la fin de la semaine. 🚀 Suis-nous sur Instagram pour ne rater aucun bon plan ! 💸 
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE MONEY WALL (TOP 8) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
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
                    <p className="text-gray-600 text-sm">Notre service est gratuit et vous pouvez clôturer vos comptes à tout moment sans frais.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center grow-0 shrink-0 text-emerald-600">💰</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Offres Cumulables</h4>
                    <p className="text-gray-600 text-sm">Cumulez un compte par banque sans limite. Maximisez vos gains dès maintenant.</p>
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
      <section id="faq" className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Questions fréquentes</h2>
            <p className="text-lg text-gray-600 font-medium">Tout ce que vous devez savoir</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Puis-je ouvrir plusieurs comptes en banque ?", a: "Absolument ! Vous avez le droit d'ouvrir autant de comptes que vous le souhaitez pour cumuler les primes. Toutes les offres présentes sur le site sont cumulables entre elles." },
              { q: "Y a-t-il des frais de clôture ?", a: "Non, la loi française oblige les banques à permettre la clôture d'un compte gratuitement et à tout moment. Vous pouvez donc empocher la prime et fermer le compte ensuite si vous ne l'utilisez plus." },
              { q: "Est-ce vraiment gratuit ?", a: "Oui, nous ne prenons aucune commission sur vos gains. Les primes sont versées directement par les partenaires sur votre nouveau compte." },
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
