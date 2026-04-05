import { useState } from 'react';
import { getVisitorIp } from '../utils/ip';

export default function ContactForm() {
  const [discordUsername, setDiscordUsername] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!discordUsername || !reason) return;

    setStatus('loading');
    
    const webhookUrl = "https://canary.discord.com/api/webhooks/1488979546358288558/nEXIe7lNQ2K8dtPBc5dnsO9-y1JEM_RbTtGh4m_m-3IdbvHbHS6CzMbmoZw8_mZ7HwmM";
    
    try {
      const ip = await getVisitorIp();
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `📬 **Nouveau message de contact**\n\n**Discord :** \`${discordUsername}\`\n**IP :** \`${ip}\`\n**Raison :**\n${reason}`,
          username: "Contact Parrainage Gagnant",
          avatar_url: "https://www.parrainagegagnant.fr/logo/icons/icon-512.png"
        }),
      });

      if (response.ok) {
        setStatus('success');
        setDiscordUsername('');
        setReason('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden max-w-2xl mx-auto mt-12 mb-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-gray-900 mb-2 underline decoration-emerald-500/30">BESOIN D'AIDE EN DIRECT ? ⚡</h3>
        <p className="text-gray-500 font-bold italic">Contactez-nous via ce formulaire (Discord) ou par email :</p>
        <a href="mailto:contact@parrainagegagnant.fr" className="text-emerald-700 font-black hover:underline text-lg">contact@parrainagegagnant.fr</a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="discord" className="block text-sm font-bold text-gray-700 mb-1">
            Votre pseudo Discord
          </label>
          <input
            type="text"
            id="discord"
            placeholder="Ex: pseudo#1234 ou pseudo"
            value={discordUsername}
            onChange={(e) => setDiscordUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-gray-400 font-medium"
          />
        </div>
        
        <div>
          <label htmlFor="reason" className="block text-sm font-bold text-gray-700 mb-1">
            Raison du contact
          </label>
          <textarea
            id="reason"
            placeholder="Détaillez votre demande ici..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder:text-gray-400 font-medium resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Envoi en cours...' : 'Envoyer via Discord'}
          {status !== 'loading' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          )}
        </button>

        {status === 'success' && (
          <p className="text-emerald-600 font-bold text-center mt-4">
            Message envoyé ! Nous vous contacterons sur Discord très vite.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-500 font-bold text-center mt-4">
            Une erreur est survenue. Veuillez réessayer.
          </p>
        )}
      </form>
    </div>
  );
}
