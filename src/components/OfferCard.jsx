import clsx from 'clsx';
import { getOfferLogo } from '../utils/getLogo';

export default function OfferCard({ offer }) {
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

  return (
    <div
      className={clsx(
        "group relative flex flex-col bg-white rounded-3xl p-6 border-2 transition-all duration-500 h-full",
        featured 
          ? "border-emerald-500/20 shadow-[0_20px_50px_rgba(16,185,129,0.1)]" 
          : "border-gray-100 shadow-sm hover:border-emerald-500/10 hover:shadow-md"
      )}
    >
      {/* Badge */}
      {featured && (
        <div className="absolute -top-3 left-6">
          <div className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider border border-white/20">
            Top Rentable
          </div>
        </div>
      )}

      {/* Header: Logo + Name */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50/50 grow-0 shrink-0 p-2 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <img
            src={getOfferLogo(offer)}
            alt={`Logo ${name}`}
            className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<span class="text-lg text-emerald-600 font-black">${name.slice(0, 1).toUpperCase()}</span>`;
            }}
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-black text-gray-900 leading-tight truncate">
            {name}
          </h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {{
              banque: 'Banque',
              paris: 'Paris Sportifs',
              cashback: 'Cashback',
              shopping: 'Shopping',
              services: 'Services',
              revenus_passifs: 'Passif'
            }[category] || category}
          </span>
        </div>
      </div>

      {/* Factual Info Section */}
      <div className="space-y-3 mb-8 bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[11px] font-bold text-gray-600 truncate">
            <span className="text-gray-400 font-medium uppercase tracking-tighter mr-1">Condition:</span> 
            {condition || "Contactez le parrain"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[11px] font-bold text-gray-600 truncate">
            <span className="text-gray-400 font-medium uppercase tracking-tighter mr-1">Délai:</span> 
            {delay || "Selon l'offre"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-[11px] font-bold text-gray-600 truncate">
            <span className="text-gray-400 font-medium uppercase tracking-tighter mr-1">Difficulté:</span> 
            <span className={clsx(
              difficulty === 'Très Facile' ? "text-emerald-500" : difficulty === 'Moyen' ? "text-orange-500" : "text-emerald-600"
            )}>
              {difficulty || "Facile"}
            </span>
          </p>
        </div>
      </div>

      {/* Single CTA Button */}
      <div className="mt-auto">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="group/btn flex items-center justify-between w-full bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-200 hover:shadow-xl hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0"
        >
          <span className="text-xs uppercase tracking-widest">Activer l'offre</span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-emerald-200 font-black tracking-tight">{reward}</span>
            <svg 
              className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </a>
        
        {code && (
          <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-[0.2em] mt-4 opacity-60">
            Code: <span className="text-emerald-600 font-black select-all">{code}</span>
          </p>
        )}
      </div>
    </div>
  );
}
