const FEEDS = {
  sq: [
    "https://www.sciencedaily.com/rss/health_medicine/fitness.xml",
    "https://www.sciencedaily.com/rss/health_medicine/nutrition.xml",
    "https://feeds.bbci.co.uk/news/health/rss.xml"
  ],
  de: [
    "https://www.sciencedaily.com/rss/health_medicine/fitness.xml",
    "https://www.sciencedaily.com/rss/health_medicine/nutrition.xml",
    "https://feeds.bbci.co.uk/news/health/rss.xml"
  ],
  en: [
    "https://www.sciencedaily.com/rss/health_medicine/fitness.xml",
    "https://www.sciencedaily.com/rss/health_medicine/nutrition.xml",
    "https://feeds.bbci.co.uk/news/health/rss.xml"
  ]
};

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=82"
];

const FALLBACK = {
  sq: [
    {
      title: "Stërvitja e forcës ndihmon në ruajtjen e muskujve",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[0],
      description: "Stërvitja e forcës ndihmon në ruajtjen e masës muskulore, forcimin e kockave dhe përmirësimin e aftësisë funksionale. Filloni me ushtrime bazë, teknikë të kontrolluar dhe rritje graduale.",
      link: "/#workouts"
    },
    {
      title: "Proteina dhe rikuperimi pas stërvitjes",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[4],
      description: "Proteina është e rëndësishme për rikuperimin dhe ruajtjen e muskujve. Sasia e nevojshme varet nga pesha, aktiviteti dhe qëllimi personal.",
      link: "/#nutrition"
    },
    {
      title: "Gjumi, stresi dhe ditët e pushimit",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[1],
      description: "Rikuperimi nuk ndodh vetëm në palestër. Gjumi i mirë, menaxhimi i stresit dhe ditët e pushimit e mbështesin performancën afatgjatë.",
      link: "/#library"
    }
  ],
  de: [
    {
      title: "Krafttraining hilft beim Erhalt der Muskulatur",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[0],
      description: "Krafttraining unterstützt Muskelmasse, Knochen und die alltägliche Leistungsfähigkeit. Beginne mit Grundübungen, sauberer Technik und schrittweiser Steigerung.",
      link: "/#workouts"
    },
    {
      title: "Protein und Regeneration nach dem Training",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[4],
      description: "Protein ist wichtig für Regeneration und Muskelerhalt. Der Bedarf hängt von Körpergewicht, Aktivität und persönlichem Ziel ab.",
      link: "/#nutrition"
    },
    {
      title: "Schlaf, Stress und Erholungstage",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[1],
      description: "Erholung findet nicht nur im Fitnessstudio statt. Guter Schlaf, weniger Stress und geplante Ruhetage unterstützen langfristige Leistung.",
      link: "/#library"
    }
  ],
  en: [
    {
      title: "Strength training helps preserve muscle",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[0],
      description: "Strength training supports muscle mass, bone health and everyday function. Start with basic movements, controlled technique and gradual progression.",
      link: "/#workouts"
    },
    {
      title: "Protein and post-workout recovery",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[4],
      description: "Protein is important for recovery and muscle maintenance. Individual needs depend on body weight, activity level and personal goals.",
      link: "/#nutrition"
    },
    {
      title: "Sleep, stress and recovery days",
      source: "NKBEASTS",
      date: "",
      image: DEFAULT_IMAGES[1],
      description: "Recovery does not happen only in the gym. Good sleep, stress management and planned rest days support long-term performance.",
      link: "/#library"
    }
  ]
};

function decodeXml(value = "") {
  return String(value)
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)));
}

function stripHtml(value = "") {
  return decodeXml(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTag(block, tagName) {
  const escaped = tagName.replace(":", "\\:");
  const expression = new RegExp(
    `<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`,
    "i"
  );
  return block.match(expression)?.[1]?.trim() || "";
}

function getAttribute(block, tagName, attributeName) {
  const expression = new RegExp(
    `<${tagName}\\b[^>]*\\b${attributeName}=["']([^"']+)["'][^>]*>`,
    "i"
  );
  return block.match(expression)?.[1] || "";
}

function findImage(block, description) {
  const media =
    getAttribute(block, "media:content", "url") ||
    getAttribute(block, "media:thumbnail", "url") ||
    getAttribute(block, "enclosure", "url");

  if (media) return decodeXml(media);

  const htmlImage =
    description.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || "";

  return decodeXml(htmlImage);
}

function sourceFromLink(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "Fitness News";
  }
}

function parseFeed(xml, imageOffset = 0) {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return blocks.map((block, index) => {
    const rawDescription =
      getTag(block, "description") ||
      getTag(block, "content:encoded") ||
      getTag(block, "summary");

    const title = stripHtml(getTag(block, "title"));
    const link = stripHtml(getTag(block, "link"));
    const description = stripHtml(rawDescription).slice(0, 700);
    const source =
      stripHtml(getTag(block, "source")) ||
      sourceFromLink(link);

    return {
      title,
      link,
      description:
        description ||
        "Open this story to read the main fitness and health update.",
      source,
      date:
        stripHtml(getTag(block, "pubDate")) ||
        stripHtml(getTag(block, "dc:date")),
      image:
        findImage(block, rawDescription) ||
        DEFAULT_IMAGES[(index + imageOffset) % DEFAULT_IMAGES.length]
    };
  }).filter(item => item.title && item.link);
}

async function fetchFeed(url, offset) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "NKBEASTS-Fitness/1.0",
        "Accept": "application/rss+xml, application/xml, text/xml, */*"
      }
    });

    if (!response.ok) {
      throw new Error(`${url} returned HTTP ${response.status}`);
    }

    const xml = await response.text();
    return parseFeed(xml, offset);
  } finally {
    clearTimeout(timeout);
  }
}

function removeDuplicates(items) {
  const seen = new Set();

  return items.filter(item => {
    const key = item.title.toLowerCase().replace(/\s+/g, " ").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const requestedLanguage = requestUrl.searchParams.get("lang") || "sq";
  const language = ["sq", "de", "en"].includes(requestedLanguage)
    ? requestedLanguage
    : "sq";

  try {
    const results = await Promise.allSettled(
      FEEDS[language].map((url, index) => fetchFeed(url, index * 2))
    );

    const liveItems = removeDuplicates(
      results
        .filter(result => result.status === "fulfilled")
        .flatMap(result => result.value)
    )
      .sort((a, b) => {
        const first = new Date(a.date).getTime() || 0;
        const second = new Date(b.date).getTime() || 0;
        return second - first;
      })
      .slice(0, 9);

    const items = liveItems.length ? liveItems : FALLBACK[language];

    return new Response(JSON.stringify({
      success: liveItems.length > 0,
      fallback: liveItems.length === 0,
      language,
      items
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Cache-Control": liveItems.length
          ? "public, max-age=900"
          : "public, max-age=120",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      fallback: true,
      language,
      error: error?.message || "RSS loading failed",
      items: FALLBACK[language]
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Cache-Control": "public, max-age=120",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
