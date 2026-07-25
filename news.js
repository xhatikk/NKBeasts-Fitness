export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const lang = ["sq","de","en"].includes(url.searchParams.get("lang")) ? url.searchParams.get("lang") : "sq";
  const cfg = {
    sq: { q: "fitness OR nutrition OR exercise when:7d", hl: "en-US", gl: "US", ceid: "US:en" },
    de: { q: "Fitness OR Ernährung OR Training when:7d", hl: "de", gl: "DE", ceid: "DE:de" },
    en: { q: "fitness OR nutrition OR exercise when:7d", hl: "en-US", gl: "US", ceid: "US:en" }
  }[lang];
  const feed = `https://news.google.com/rss/search?q=${encodeURIComponent(cfg.q)}&hl=${cfg.hl}&gl=${cfg.gl}&ceid=${cfg.ceid}`;
  try {
    const res = await fetch(feed, { headers: { "User-Agent": "NKBEASTS/1.0" } });
    if (!res.ok) throw new Error(`Feed ${res.status}`);
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 8).map(m => {
      const block = m[1];
      const get = tag => {
        const hit = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
        return hit ? hit[1].replace(/<!\[CDATA\[|\]\]>/g,"").trim() : "";
      };
      const rawTitle = decode(get("title"));
      const parts = rawTitle.split(" - ");
      return {
        title: parts.slice(0,-1).join(" - ") || rawTitle,
        source: parts.length > 1 ? parts[parts.length-1] : "Google News",
        description: stripHtml(decode(get("description"))).slice(0, 220),
        link: decode(get("link"))
      };
    });
    return Response.json({ items }, { headers: { "Cache-Control": "public, max-age=600" } });
  } catch (error) {
    return Response.json({ items: [], error: String(error) }, { status: 502 });
  }
}
function decode(s) {
  return String(s || "").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
}
function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
}
