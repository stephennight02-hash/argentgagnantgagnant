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
    description,
  } = offer;

  return (
    <div
      className={clsx(
        "group relative flex flex-col bg-white rounded-2xl p-5 border transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] h-full",
        "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:border-emerald-500/40",
        featured 
          ? "border-emerald-500/30 ring-4 ring-emerald-500/5 shadow-emerald-50/50" 
          : "border-gray-100 shadow-sm"
      )}
    >
      {/* Status Badges & Checkmark */}
      <div className="absolute -top-3 right-4 flex items-center gap-2">
        {featured && (
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-tighter animate-pulse border border-white/20">
            TOP RENTABLE
          </div>
        )}
        <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-emerald-100 w-8 h-8 rounded-full flex items-center justify-center font-black text-emerald-500 text-sm">
          ✓
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl border border-gray-100 bg-white grow-0 shrink-0 p-2 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-500">
          <img
            src={getOfferLogo(offer)}
            alt={`Logo ${name}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<span class="text-xl text-gray-300 font-black">${name.slice(0, 1).toUpperCase()}</span>`;
            }}
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors flex items-center gap-1.5 truncate">
            {name}
          </h3>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
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

      <div className="mb-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl py-3 px-4 text-center border border-emerald-400/50 shadow-lg shadow-emerald-100 group-hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
        <p className="text-white font-black text-2xl relative z-10 tracking-tight">
          {reward}
        </p>
      </div>

      {description && (
        <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-snug font-medium">
          {description}
        </p>
      )}

      {code && (
        <div className="mb-5 bg-gray-50/80 border border-dashed border-gray-200 rounded-2xl p-3 flex flex-col gap-1 items-center justify-center text-center group-hover:border-emerald-200 transition-colors">
          <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest opacity-60">Code Parrainage</span>
          <span className="font-mono text-gray-900 font-black text-base select-all bg-white px-4 py-1 border border-gray-100 rounded-lg shadow-sm">
            {code}
          </span>
        </div>
      )}

      <div className="mt-auto">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className={clsx(
            "group/btn flex items-center justify-center gap-2 w-full font-black py-4 px-6 rounded-2xl transition-all duration-300 text-center text-base shadow-xl",
            featured 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 hover:shadow-emerald-300" 
              : "bg-gray-900 hover:bg-black text-white shadow-gray-200 hover:shadow-gray-300"
          )}
        >
          <span>Profiter</span>
          <svg 
            className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
