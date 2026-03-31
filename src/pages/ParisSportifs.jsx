import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';

export default function ParisSportifs() {
  const parisOffers = offers
    .filter(o => o.category === 'paris')
    .sort((a, b) => b.rewardValue - a.rewardValue);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Paris Sportifs</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Profitez des meilleures offres de parrainage sur les sites de paris sportifs. Inscrivez-vous et recevez des bonus de bienvenue exclusifs.
        </p>
      </div>

      {parisOffers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parisOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Aucune offre disponible pour le moment.</p>
      )}
    </div>
  );
}
