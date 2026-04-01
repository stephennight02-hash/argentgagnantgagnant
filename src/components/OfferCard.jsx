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
  } = offer;

  return (
    <div
      className={clsx(
        "relative flex flex-col bg-white rounded-lg p-5 border shadow-sm hover:shadow-md transition-shadow",
        featured ? "border-blue-500 ring-1 ring-blue-500 mt-3 md:mt-0" : "border-gray-200"
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-4 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
          Meilleure offre
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded border border-gray-100 bg-white shrink-0 p-1 flex items-center justify-center overflow-hidden">
          <img
            src={getOfferLogo(offer)}
            alt={`Logo ${name}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<span class="text-sm text-gray-400 font-bold">${name.slice(0, 2).toUpperCase()}</span>`;
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {name}
          </h3>
          <span className="text-sm text-gray-500 uppercase tracking-wide">
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

      <div className="mb-4 text-center py-2 bg-blue-50 rounded">
        <p className="text-blue-700 font-bold text-xl md:text-2xl">
          {reward}
        </p>
      </div>

      {code && (
        <div className="mb-4 bg-gray-50 border border-gray-200 rounded p-3 flex flex-col gap-1 items-center justify-center text-center">
          <span className="text-sm text-gray-600">Code promo à utiliser :</span>
          <span className="font-mono text-gray-900 font-bold text-lg select-all bg-white px-3 py-1 border rounded shadow-sm">
            {code}
          </span>
        </div>
      )}

      <div className="mt-auto pt-2">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded transition-colors text-center text-lg shadow-sm"
        >
          Profiter de l'offre
        </a>
      </div>
    </div>
  );
}
