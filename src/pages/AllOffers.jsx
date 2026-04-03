import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';

export default function AllOffers() {
  const sortedOffers = offers.sort((a, b) => (b.rewardValue || 0) - (a.rewardValue || 0));

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
            Toutes les <span className="text-indigo-600">Offres</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Parcourez l'intégralité de notre catalogue de parrainages. Des banques en ligne aux revenus passifs, trouvez les meilleurs bons plans pour gagner de l'argent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>

      </div>
    </div>
  );
}
