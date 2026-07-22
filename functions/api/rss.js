const feeds = {
  sq: "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en",
  de: "https://news.google.com/rss/search?q=Fitness+OR+Ern%C3%A4hrung+OR+Training+when:7d&hl=de&gl=DE&ceid=DE:de",
  en: "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en",
};

const images = [
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=82",
];

const decodeHtml = (value = "") =>
  String(value)
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const stripHtml = (value = "") =>
  decodeHtml(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getTagValue = (xml, tag) => {
  const expression = new RegExp(
    `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
    "i"
  );

  const match = xml.match(expression);
  return match ? decodeHtml(match[1]).trim() : "";
};

const parseItems = (xml) => {
  const itemMatches = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return itemMatches.slice(0, 6).map((item, index) => {
    const rawTitle = stripHtml(getTagValue(item, "title"));
    const link = stripHtml(getTagValue(item, "link"));
    const pubDate = stripHtml(getTagValue(item, "pubDate"));

    let title = rawTitle;
    let source = "Google News";

    const separatorIndex = rawTitle.lastIndexOf(" - ");

    if (separatorIndex > 0) {
      title = rawTitle.slice(0, separatorIndex).trim();
      source = rawTitle.slice(separatorIndex + 3).trim();
    }

    return {
      title,
      source,
      link,
      pubDate,
      image: images[index % images.length],
    };
  });
};

export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const requestedLanguage = requestUrl.searchParams.get("lang") || "sq";
  const language = feeds[requestedLanguage] ? requestedLanguage : "sq";

  try {
    const response = await fetch(feeds[language], {
      headers: {
        "User-Agent": "NKBeasts-Fitness/1.0",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Google RSS returned ${response.status}`);
    }

    const xml = await response.text();
    const items = parseItems(xml);

    if (!items.length) {
      throw new Error("No RSS items found.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        language,
        items,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Cache-Control": "public, max-age=600",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "RSS loading failed.",
        items: [],
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
