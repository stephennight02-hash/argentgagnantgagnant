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
        "group relative flex flex-col bg-white rounded-2xl p-6 border transition-all duration-300 ease-in-out",
        "hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-500/30",
        featured 
          ? "border-emerald-500 ring-1 ring-emerald-500 shadow-emerald-100/50" 
          : "border-gray-100 shadow-sm"
      )}
    >
      {/* Status Badges */}
      <div className="absolute -top-3 right-4 flex gap-2">
        {featured && (
          <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
            Populaire
          </div>
        )}
        <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Vérifié
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-xl border border-gray-100 bg-white shrink-0 p-1.5 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-300">
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
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
            {name}
          </h3>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {{
              banque: 'Banque',
              paris: 'Paris Sportifs',
              cashback: 'Cashback',
              shopping: 'Shopping',
              services: 'Services',
              revenus_passifs: 'Revenus Passifs'
            }[category] || category}
          </span>
        </div>
      </div>

      <div className="mb-4 bg-emerald-50/50 rounded-xl py-3 px-4 text-center border border-emerald-100/50 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
        <p className="text-emerald-700 font-extrabold text-2xl group-hover:text-white transition-colors">
          {reward}
        </p>
      </div>

      {description && (
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      {code && (
        <div className="mb-5 bg-gray-50 border border-dashed border-gray-200 rounded-xl p-3 flex flex-col gap-1 items-center justify-center text-center group-hover:border-emerald-200 transition-colors">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Code Parrainage</span>
          <span className="font-mono text-gray-900 font-bold text-lg select-all bg-white px-4 py-1 border border-gray-100 rounded-lg shadow-sm">
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
            "flex items-center justify-center gap-2 w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 text-center text-lg shadow-md",
            featured 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200" 
              : "bg-gray-900 hover:bg-black text-white shadow-gray-200"
          )}
        >
          <span>Profiter de l'offre</span>
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
