export function onRequestGet(context) {
  const country = String(context.request.cf?.country || '').toUpperCase();
  const language = country === 'DE' ? 'de' : ['AL', 'XK'].includes(country) ? 'sq' : 'en';
  return new Response(JSON.stringify({ country, language }), {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'cache-control': 'private, max-age=3600',
      'access-control-allow-origin': '*'
    }
  });
}
