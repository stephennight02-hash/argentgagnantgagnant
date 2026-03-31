import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';

export default function Crypto() {
  const cryptoOffers = offers
    .filter(o => o.category === 'crypto')
    .sort((a, b) => b.rewardValue - a.rewardValue);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Crypto-monnaies</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Plongez dans l'univers des crypto-monnaies avec un bonus de départ. Inscrivez-vous sur les meilleures plateformes d'échange du marché.
        </p>
      </div>

      {cryptoOffers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cryptoOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Aucune offre disponible pour le moment.</p>
      )}
    </div>
  );
}
