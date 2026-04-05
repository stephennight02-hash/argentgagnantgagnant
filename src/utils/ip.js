export const getVisitorIp = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      mode: 'cors'
    });
    if (!res.ok) throw new Error('Primary IP fetch failed');
    const data = await res.json();
    return data.ip || 'N/A';
  } catch (error) {
    console.error('Primary IP Fetch Error:', error);
    try {
      // Fallback service
      const res = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json();
      return data.ip || 'N/A';
    } catch (fallbackError) {
      console.error('Fallback IP Fetch Error:', fallbackError);
      return 'N/A';
    }
  }
};
