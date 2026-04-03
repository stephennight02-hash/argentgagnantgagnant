export default function Blog() {
  const articles = [
    {
      title: "Comment optimiser ses gains avec le cashback ?",
      date: "15 Janvier 2026",
      excerpt: "Découvrez nos meilleures astuces pour maximiser vos retours sur achats quotidiens grâce aux plateformes de cashback."
    },
    {
      title: "Le guide du débutant pour choisir sa banque en ligne",
      date: "02 Février 2026",
      excerpt: "Frais réduits, primes de parrainage intéressantes : comment faire le tri parmi toutes les offres du marché ?"
    },
    {
      title: "Paris sportifs : les meilleurs bonus de bienvenue",
      date: "10 Mars 2026",
      excerpt: "Comparatif détaillé des offres de parrainage sur les sites de paris sportifs les plus populaires en France."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Conseils & Astuces</h1>
        <p className="text-xl text-gray-600">
          Retrouvez nos derniers articles pour vous aider à mieux gérer votre argent et optimiser vos primes de parrainage.
        </p>
      </div>

      <div className="space-y-8">
        {articles.map((article, index) => (
          <article key={index} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{article.date}</div>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3 cursor-pointer group-hover:text-indigo-600 transition-colors tracking-tight uppercase">
              {article.title}
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-6">{article.excerpt}</p>
            <button className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:text-indigo-700 transition-colors group/btn">
              Lire l'article
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
