export default function Blog() {
  const articles = [
    {
      title: "Comment optimiser ses gains avec le cashback ?",
      date: "15 Octobre 2023",
      excerpt: "Découvrez nos meilleures astuces pour maximiser vos retours sur achats quotidiens grâce aux plateformes de cashback."
    },
    {
      title: "Le guide du débutant pour choisir sa banque en ligne",
      date: "02 Novembre 2023",
      excerpt: "Frais réduits, primes de parrainage intéressantes : comment faire le tri parmi toutes les offres du marché ?"
    },
    {
      title: "Parrainage Crypto : les plateformes les plus généreuses",
      date: "15 Novembre 2023",
      excerpt: "Un comparatif détaillé des bonus d'inscription offerts par les leaders du marché des crypto-monnaies."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">📝 Conseils & Astuces</h1>
        <p className="text-xl text-gray-600">
          Retrouvez nos derniers articles pour vous aider à mieux gérer votre argent et optimiser vos primes de parrainage.
        </p>
      </div>

      <div className="space-y-8">
        {articles.map((article, index) => (
          <article key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm text-emerald-600 font-semibold mb-2">{article.date}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 cursor-pointer hover:text-emerald-700 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <button className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors">
              Lire la suite →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
