import clsx from 'clsx';
import { getOfferLogo } from '../utils/getLogo';

export default function OfferCard({ offer, hideCode = false }) {
  const {
    name,
    category,
    reward,
    link,
    code,
    featured,
    condition,
    delay,
    difficulty,
  } = offer;

  // Render lightning bolts for difficulty
  const renderDifficulty = (diff) => {
    let count = 1;
    if (diff === 'Moyen') count = 2;
    if (diff === 'Difficile') count = 3;
    
    return (
      <span className="flex items-center gap-0.5" title={diff || 'Facile'}>
        {[...Array(3)].map((_, i) => (
          <svg 
            key={i} 
            className={clsx("w-3.5 h-3.5", i < count ? "text-yellow-500" : "text-gray-200")} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        ))}
      </span>
    );
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full"
    >
      {/* Badge */}
      {featured && offer.rewardValue >= 100 && (
        <div className="absolute -top-3 left-6">
          <div className="bg-gray-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Top Rentable
          </div>
        </div>
      )}

      {/* Header: Logo + Name + Category + Reward */}
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div className="w-16 h-16 rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2 mb-3">
          <img
            src={getOfferLogo(offer)}
            alt={`Logo ${name}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<span class="text-xl text-gray-900 font-black">${name.substring(0, 1).toUpperCase()}</span>`;
            }}
          />
        </div>
        <h3 className="text-lg font-black text-gray-900 leading-tight">
          {name}
        </h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          {{
            banque: 'Banque',
            paris: 'Paris Sportifs',
            cashback: 'Cashback',
            shopping: 'Shopping',
            services: 'Services',
            revenus_passifs: 'Passif'
          }[category] || category}
        </span>
        <div className="text-2xl font-black text-emerald-600 tracking-tight mt-1">
          Jusqu'à {reward}
        </div>
      </div>

      {/* Factual Info Section */}
      <div className="space-y-0 mb-6 flex-grow">
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
          <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 uppercase tracking-tighter">
            Condition
          </span>
          <span className="text-[11px] font-bold text-gray-800 text-right max-w-[60%] truncate" title={condition || "Ouvrir un compte"}>
            {condition || "Ouvrir un compte"}
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
          <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 uppercase tracking-tighter">
            Délai
          </span>
          <span className="text-[11px] font-bold text-gray-800 text-right max-w-[60%] truncate" title={delay || "Selon l'offre"}>
            {delay || "Selon l'offre"}
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
          <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 uppercase tracking-tighter">
            Difficulté
          </span>
          <span className="text-[11px] font-bold text-gray-800 text-right flex items-center gap-1">
            {renderDifficulty(difficulty)}
          </span>
        </div>
      </div>

      {/* Code & Button Section */}
      <div className="mt-auto flex flex-col gap-3">
        {/* Fixed height for code to ensure uniform card height */}
        {!hideCode && (
          <div className="h-10 flex items-center justify-center">
            {code ? (
              <div className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-black px-4 py-2 rounded-xl text-center flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Code :</span>
                <span className="text-emerald-600 select-all">{code}</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400 italic">Aucun code parrain requis</div>
            )}
          </div>
        )}

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="w-full bg-emerald-600 text-white font-black py-4 px-6 rounded-xl transition-colors hover:bg-emerald-700 flex items-center justify-center text-sm uppercase tracking-widest text-center"
        >
          Activer l'offre
        </a>
      </div>
    </div>
  );
}
