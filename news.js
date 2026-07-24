const FEEDS = {
  sq: 'https://news.google.com/rss/search?q=fitness%20OR%20nutrition%20OR%20exercise%20when%3A7d&hl=en-US&gl=US&ceid=US%3Aen',
  de: 'https://news.google.com/rss/search?q=Fitness%20OR%20Ern%C3%A4hrung%20OR%20Training%20when%3A7d&hl=de&gl=DE&ceid=DE%3Ade',
  en: 'https://news.google.com/rss/search?q=fitness%20OR%20nutrition%20OR%20exercise%20when%3A7d&hl=en-US&gl=US&ceid=US%3Aen'
};

const IMAGES = [
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=82',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=82',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=82',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=82',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=82'
];

function decode(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/');
}

function text(value = '') {
  return decode(value).replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return match ? decode(match[1]).trim() : '';
}

function sourceFromTitle(title) {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts.pop().trim() : 'Google News';
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const lang = ['sq', 'de', 'en'].includes(url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'sq';

  try {
    const response = await fetch(FEEDS[lang], {
      headers: { 'User-Agent': 'NKBEASTS/1.0', 'Accept': 'application/rss+xml, application/xml, text/xml' },
      cf: { cacheTtl: 900, cacheEverything: true }
    });
    if (!response.ok) throw new Error(`Feed HTTP ${response.status}`);
    const xml = await response.text();
    const blocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(match => match[1]);
    const items = blocks.slice(0, 9).map((block, index) => {
      const rawTitle = text(tag(block, 'title'));
      const source = text(tag(block, 'source')) || sourceFromTitle(rawTitle);
      const title = rawTitle.endsWith(` - ${source}`) ? rawTitle.slice(0, -(source.length + 3)).trim() : rawTitle;
      const description = text(tag(block, 'description'));
      return {
        title,
        source,
        date: tag(block, 'pubDate'),
        summary: description || title,
        content: description || title,
        image: IMAGES[index % IMAGES.length]
      };
    }).filter(item => item.title);

    return new Response(JSON.stringify({ items }), {
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'cache-control': 'public, max-age=600',
        'access-control-allow-origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ items: [], error: error.message }), {
      status: 502,
      headers: { 'content-type': 'application/json; charset=UTF-8', 'cache-control': 'no-store' }
    });
  }
}
