import { Link } from 'react-router-dom';

export default function LegalNotice() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h1 className="text-4xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-6 uppercase tracking-tighter flex items-center gap-3">
          <span className="w-2 h-10 bg-indigo-600 rounded-full"></span>
          Mentions Légales
        </h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Éditeur du site</h2>
            <p>
              Le site <strong>MoneyGagnant</strong> est édité par :<br />
              <strong>[Nom de l'entreprise ou du particulier]</strong><br />
              Adresse : [Votre adresse physique]<br />
              Email de contact : [Votre email]<br />
              Numéro SIRET (le cas échéant) : [Votre numéro]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Hébergement</h2>
            <p>
              Ce site est hébergé par :<br />
              <strong>[Nom de l'hébergeur]</strong><br />
              Adresse : [Adresse de l'hébergeur]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Propriété Intellectuelle</h2>
            <p>
              L'énsemble des éléments constituant le site relèvent des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Responsabilité</h2>
            <p>
              Les liens de parrainage présents sur le site peuvent générer une commission pour l'éditeur du site lors de votre inscription. Cela n'affecte en rien la prime qui vous est reversée par le service partenaire.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-black uppercase tracking-widest text-xs">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
