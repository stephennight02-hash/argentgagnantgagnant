import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Politique de Confidentialité</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Collecte des données personnelles</h2>
            <p>
              Nous collectons les données suivantes :<br />
              - Statistiques de navigation anonymisées (pages visitées, clics sur les liens de parrainage).<br />
              - Informations fournies volontairement via nos formulaires de contact éventuels.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Utilisation des données</h2>
            <p>
              Les données que nous collectons nous permettent de :<br />
              - Mesurer l'audience de notre site.<br />
              - Améliorer l'expérience utilisateur et la pertinence des offres proposées.<br />
              - Vous répondre si vous nous contactez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Utilisation des cookies</h2>
            <p>
              Le site utilise des cookies strictement nécessaires à son fonctionnement et des cookies de mesure d'audience anonymes.
            </p>
            <p className="mt-2">
              Certains liens de parrainage redirigent vers des sites partenaires qui utiliseront leurs propres cookies pour tracer la provenance de votre clic afin d'attribuer la prime de parrainage. Nous ne gérons pas ces cookies tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Conformité RGPD</h2>
            <p>
              Conformément à la Réglementation Générale sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité des données vous concernant.
            </p>
            <p className="mt-2">
              Pour exercer ces droits, vous pouvez nous contacter à : [Votre email de contact RGPD].
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
