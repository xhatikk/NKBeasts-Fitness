export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const lang = ["sq", "de", "en"].includes(url.searchParams.get("lang"))
    ? url.searchParams.get("lang")
    : "en";

  const feeds = {
    sq: "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en",
    de: "https://news.google.com/rss/search?q=Fitness+OR+Ern%C3%A4hrung+OR+Training+when:7d&hl=de&gl=DE&ceid=DE:de",
    en: "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en"
  };

  try {
    const response = await fetch(feeds[lang], {
      headers: {
        "User-Agent": "NKBEASTS-Fitness/1.0",
        "Accept": "application/rss+xml, application/xml, text/xml"
      },
      cf: { cacheTtl: 900, cacheEverything: true }
    });

    if (!response.ok) {
      throw new Error(`Google News returned ${response.status}`);
    }

    const xml = await response.text();
    const items = parseItems(xml).slice(0, 6);

    return json({ ok: true, items }, 200);
  } catch (error) {
    return json(
      { ok: false, error: "RSS temporarily unavailable", items: [] },
      502
    );
  }
}

function parseItems(xml) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return blocks.map((block) => {
    const title = clean(extract(block, "title"));
    const link = clean(extract(block, "link"));
    const source = clean(extract(block, "source")) || "Google News";
    const pubDate = clean(extract(block, "pubDate"));

    return { title, link, source, pubDate };
  }).filter((item) => item.title && item.link);
}

function extract(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1] : "";
}

function clean(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "public, max-age=300",
      "access-control-allow-origin": "*"
    }
  });
}
