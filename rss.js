const FEEDS = {
  sq: "https://news.google.com/rss/search?q=fitness+nutrition+exercise&hl=en-US&gl=US&ceid=US:en",
  de: "https://news.google.com/rss/search?q=Fitness+Ern%C3%A4hrung+Training&hl=de&gl=DE&ceid=DE:de",
  en: "https://news.google.com/rss/search?q=fitness+nutrition+exercise&hl=en-US&gl=US&ceid=US:en"
};

function decodeText(text = "") {
  return text
    .replaceAll("<![CDATA[", "")
    .replaceAll("]]>", "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getValue(block, tag) {
  const startTag = `<${tag}>`;
  const endTag = `</${tag}>`;

  const start = block.indexOf(startTag);
  const end = block.indexOf(endTag);

  if (start === -1 || end === -1) return "";

  return decodeText(
    block.slice(start + startTag.length, end)
  ).trim();
}

function parseItems(xml) {
  const results = [];
  let position = 0;

  while (results.length < 6) {
    const start = xml.indexOf("<item>", position);
    const end = xml.indexOf("</item>", start);

    if (start === -1 || end === -1) break;

    const block = xml.slice(start, end + 7);
    const fullTitle = getValue(block, "title");
    const link = getValue(block, "link");
    const pubDate = getValue(block, "pubDate");

    let title = fullTitle;
    let source = "Google News";

    const separator = fullTitle.lastIndexOf(" - ");

    if (separator > 0) {
      title = fullTitle.slice(0, separator).trim();
      source = fullTitle.slice(separator + 3).trim();
    }

    results.push({
      title,
      source,
      link,
      pubDate,
      image: `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80&sig=${results.length}`
    });

    position = end + 7;
  }

  return results;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const requestedLang = url.searchParams.get("lang") || "sq";
  const lang = FEEDS[requestedLang] ? requestedLang : "sq";

  try {
    const response = await fetch(FEEDS[lang], {
      headers: {
        Accept: "application/rss+xml,text/xml"
      }
    });

    if (!response.ok) {
      throw new Error(`RSS error: ${response.status}`);
    }

    const xml = await response.text();
    const items = parseItems(xml);

    return new Response(
      JSON.stringify({
        success: true,
        lang,
        items
      }),
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Cache-Control": "public, max-age=600"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        items: []
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      }
    );
  }
}
