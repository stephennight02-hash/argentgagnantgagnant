import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';

export default function Banque() {
  const banqueOffers = offers
    .filter(o => o.category === 'banque')
    .sort((a, b) => b.rewardValue - a.rewardValue);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Banques & Neobanques</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Changez de banque ou ouvrez un compte secondaire pour profiter de primes de bienvenue exceptionnelles. Découvrez notre sélection des meilleures offres bancaires.
        </p>
      </div>

      {banqueOffers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banqueOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Aucune offre disponible pour le moment.</p>
      )}
    </div>
  );
}
