/**
 * Returns the best available logo for an offer.
 * Priority: 
 * 1. Super-Parrain direct image (highest quality)
 * 2. Google Favicon (256px)
 * 3. Clearbit Logo (fallback)
 */
export const getOfferLogo = (offer) => {
  if (offer.superParrainLogo) {
    return offer.superParrainLogo;
  }
  
  if (offer.favicon) {
    return offer.favicon;
  }

  if (offer.domain) {
    return `https://logo.clearbit.com/${offer.domain}?size=256`;
  }

  return null;
};
