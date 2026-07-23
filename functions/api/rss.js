const feeds = {
  sq: [
    "https://www.bing.com/news/search?q=fitness+nutrition+exercise+health&format=rss",
    "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en",
  ],

  de: [
    "https://www.bing.com/news/search?q=Fitness+Ern%C3%A4hrung+Training+Gesundheit&format=rss",
    "https://news.google.com/rss/search?q=Fitness+OR+Ern%C3%A4hrung+OR+Training+when:7d&hl=de&gl=DE&ceid=DE:de",
  ],

  en: [
    "https://www.bing.com/news/search?q=fitness+nutrition+exercise+health&format=rss",
    "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en",
  ],
};

const images = [
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=82",
];

const fallbackItems = {
  sq: [
    {
      title: "Stërvitja e forcës ndihmon në ruajtjen e muskujve",
      source: "NKBEASTS",
      link: "/#workouts",
      pubDate: "",
      image: images[0],
    },
    {
      title: "Proteina dhe roli i saj në rikuperimin muskulor",
      source: "NKBEASTS",
      link: "/#nutrition",
      pubDate: "",
      image: images[4],
    },
    {
      title: "Gjumi dhe rikuperimi pas stërvitjes",
      source: "NKBEASTS",
      link: "/#library",
      pubDate: "",
      image: images[1],
    },
  ],

  de: [
    {
      title: "Krafttraining hilft beim Erhalt der Muskelmasse",
      source: "NKBEASTS",
      link: "/#workouts",
      pubDate: "",
      image: images[0],
    },
    {
      title: "Protein und seine Rolle bei der Regeneration",
      source: "NKBEASTS",
      link: "/#nutrition",
      pubDate: "",
      image: images[4],
    },
    {
      title: "Schlaf und Erholung nach dem Training",
      source: "NKBEASTS",
      link: "/#library",
      pubDate: "",
      image: images[1],
    },
  ],

  en: [
    {
      title: "Strength training helps preserve muscle mass",
      source: "NKBEASTS",
      link: "/#workouts",
      pubDate: "",
      image: images[0],
    },
    {
      title: "Protein and its role in muscle recovery",
      source: "NKBEASTS",
      link: "/#nutrition",
      pubDate: "",
      image: images[4],
    },
    {
      title: "Sleep and recovery after training",
      source: "NKBEASTS",
      link: "/#library",
      pubDate: "",
      image: images[1],
    },
  ],
};

const decodeHtml = (value = "") =>
  String(value)
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, number) =>
      String.fromCharCode(Number(number))
    );

const stripHtml = (value = "") =>
  decodeHtml(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
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

const getSourceName = (item, rawTitle) => {
  const sourceTag = stripHtml(getTagValue(item, "source"));

  if (sourceTag) {
    return sourceTag;
  }

  const separatorIndex = rawTitle.lastIndexOf(" - ");

  if (separatorIndex > 0) {
    return rawTitle.slice(separatorIndex + 3).trim();
  }

  return "Fitness News";
};

const cleanTitle = (rawTitle) => {
  const separatorIndex = rawTitle.lastIndexOf(" - ");

  if (separatorIndex > 0) {
    return rawTitle.slice(0, separatorIndex).trim();
  }

  return rawTitle.trim();
};

const parseItems = (xml) => {
  const itemMatches =
    xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return itemMatches
    .slice(0, 12)
    .map((item, index) => {
      const rawTitle = stripHtml(getTagValue(item, "title"));
      const link = stripHtml(getTagValue(item, "link"));
      const pubDate = stripHtml(getTagValue(item, "pubDate"));
      const source = getSourceName(item, rawTitle);
      const title = cleanTitle(rawTitle);

      return {
        title,
        source,
        link,
        pubDate,
        image: images[index % images.length],
      };
    })
    .filter((item) => item.title && item.link)
    .slice(0, 6);
};

const fetchWithTimeout = async (url, timeoutMs = 8000) => {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; NKBeastsFitness/1.0; +https://nkbeasts-fitness.pages.dev)",
        Accept:
          "application/rss+xml, application/xml, text/xml, application/atom+xml, */*",
        "Accept-Language": "en-US,en;q=0.9,de;q=0.8",
      },
    });
  } finally {
    clearTimeout(timeout);
  }
};

const loadFeed = async (feedUrls) => {
  let lastError = "No RSS source available.";

  for (const feedUrl of feedUrls) {
    try {
      const response = await fetchWithTimeout(feedUrl);

      if (!response.ok) {
        lastError = `RSS source returned ${response.status}`;
        continue;
      }

      const xml = await response.text();

      if (!xml || !xml.includes("<item")) {
        lastError = "RSS source returned no items.";
        continue;
      }

      const items = parseItems(xml);

      if (items.length) {
        return {
          success: true,
          items,
          sourceUrl: feedUrl,
        };
      }

      lastError = "No valid RSS items found.";
    } catch (error) {
      lastError =
        error?.name === "AbortError"
          ? "RSS request timed out."
          : error?.message || "RSS loading failed.";
    }
  }

  return {
    success: false,
    items: [],
    error: lastError,
  };
};

export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const requestedLanguage =
    requestUrl.searchParams.get("lang") || "sq";

  const language = feeds[requestedLanguage]
    ? requestedLanguage
    : "sq";

  const result = await loadFeed(feeds[language]);

  const items = result.success
    ? result.items
    : fallbackItems[language];

  return new Response(
    JSON.stringify({
      success: result.success,
      fallback: !result.success,
      language,
      source: result.sourceUrl || "NKBEASTS fallback",
      error: result.error || null,
      items,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Cache-Control":
          result.success
            ? "public, max-age=600"
            : "public, max-age=120",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
