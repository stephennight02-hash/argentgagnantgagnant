import { Link } from 'react-router-dom';

export default function LegalNotice() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Mentions Légales</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Éditeur du site</h2>
            <p>
              Le site <strong>Parrainage</strong> est édité par :<br />
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
              <strong>[Nom de l'hébergeur (ex: Vercel, Netlify, OVH)]</strong><br />
              Adresse : [Adresse de l'hébergeur]<br />
              Site Web : [Site web de l'hébergeur]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Propriété Intellectuelle</h2>
            <p>
              L'énsemble des éléments constituant le site (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Responsabilité</h2>
            <p>
              L'éditeur du site s'efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
            <p className="mt-2">
              Les liens de parrainage présents sur le site peuvent générer une commission pour l'éditeur du site lors de votre inscription. Cela n'affecte en rien la prime qui vous est reversée par le service partenaire.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
