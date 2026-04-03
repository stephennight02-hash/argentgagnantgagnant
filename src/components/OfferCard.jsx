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

  const isRevolut = name.toLowerCase().includes('revolut');

  return (
    <div
      className={clsx(
        "group relative flex flex-col bg-white rounded-3xl p-6 border transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] h-full",
        "hover:-translate-y-2 hover:shadow-[0_32px_64px_-12px_rgba(79,70,229,0.2)] hover:border-indigo-500/40",
        featured 
          ? "border-indigo-500/30 ring-4 ring-indigo-500/5 shadow-indigo-50/50"
          : "border-gray-100 shadow-sm"
      )}
    >
      {/* Status Badges & Checkmark */}
      <div className="absolute -top-3 right-4 flex items-center gap-2 z-20">
        {featured && (
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-tighter animate-pulse border border-white/20">
            {isRevolut ? "OFFRE EXCLUSIVE" : "TOP RENTABLE"}
          </div>
        )}
        <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-indigo-100 w-8 h-8 rounded-full flex items-center justify-center font-black text-indigo-500 text-sm">
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

      <div className="mb-5 rounded-2xl py-4 px-4 text-center border shadow-lg group-hover:scale-[1.03] transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-700 border-indigo-400/50 shadow-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
        <div className="absolute -inset-y-2 -inset-x-12 bg-white/20 -rotate-45 translate-y-full group-hover:-translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
        
        <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-1">PRIME</p>
        <p className="text-white font-black text-3xl relative z-10 tracking-tight drop-shadow-sm">
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
          className="group/btn relative flex items-center justify-center gap-2 w-full font-black py-6 px-6 rounded-2xl transition-all duration-300 text-center text-base shadow-xl overflow-hidden bg-violet-600 text-white shadow-violet-200 hover:shadow-violet-300 active:scale-95 border border-white/10"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[20deg] -translate-x-[150%] group-hover/btn:animate-[shine_2s_infinite]"></div>
          
          <span className="relative z-10 uppercase tracking-widest text-[11px]">En savoir plus</span>
          <svg 
            className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1.5" 
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
