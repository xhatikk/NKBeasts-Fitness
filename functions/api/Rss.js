const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=82"
];

const FEEDS = {
  sq: [
    "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en"
  ],
  de: [
    "https://news.google.com/rss/search?q=Fitness+OR+Ern%C3%A4hrung+OR+Training+when:7d&hl=de&gl=DE&ceid=DE:de"
  ],
  en: [
    "https://news.google.com/rss/search?q=fitness+OR+nutrition+OR+exercise+when:7d&hl=en-US&gl=US&ceid=US:en"
  ]
};

const FALLBACK = {
  sq: [
    {title:"Stërvitja e forcës dhe ruajtja e muskujve",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[0],description:"Stërvitja e forcës ndihmon në ruajtjen e masës muskulore, forcimin e kockave dhe përmirësimin e aftësisë funksionale. Përdor teknikë të kontrolluar dhe rrite ngarkesën gradualisht.",link:"/#workouts"},
    {title:"Sa proteinë të duhet gjatë ditës?",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[4],description:"Nevoja për proteinë ndryshon sipas peshës, aktivitetit dhe qëllimit. Për personat aktivë, shpërndarja në disa vakte gjatë ditës është zakonisht zgjidhja më praktike.",link:"/#nutrition"},
    {title:"Gjumi është pjesë e programit të stërvitjes",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[1],description:"Gjumi i mirë mbështet rikuperimin, energjinë dhe performancën. Orari i rregullt dhe më pak ekran para gjumit mund të ndihmojnë.",link:"/#library"}
  ],
  de: [
    {title:"Krafttraining und Muskelerhalt",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[0],description:"Krafttraining unterstützt Muskeln, Knochen und die alltägliche Leistungsfähigkeit. Saubere Technik und schrittweise Steigerung sind entscheidend.",link:"/#workouts"},
    {title:"Wie viel Protein brauchst du täglich?",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[4],description:"Der Proteinbedarf hängt von Körpergewicht, Aktivität und Ziel ab. Eine Verteilung auf mehrere Mahlzeiten unterstützt eine praktische Ernährung.",link:"/#nutrition"},
    {title:"Schlaf gehört zum Trainingsplan",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[1],description:"Guter Schlaf unterstützt Regeneration, Energie und Leistung. Ein regelmäßiger Rhythmus kann helfen.",link:"/#library"}
  ],
  en: [
    {title:"Strength training and muscle maintenance",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[0],description:"Strength training supports muscle, bone health and everyday function. Controlled technique and gradual progression matter most.",link:"/#workouts"},
    {title:"How much protein do you need each day?",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[4],description:"Protein needs depend on body weight, activity and goals. Spreading intake over several meals is usually practical.",link:"/#nutrition"},
    {title:"Sleep is part of your training plan",source:"NKBEASTS",date:"",image:DEFAULT_IMAGES[1],description:"Good sleep supports recovery, energy and performance. A regular schedule can help.",link:"/#library"}
  ]
};

function decodeXml(value="") {
  return String(value).replace(/<!\[CDATA\[|\]\]>/g,"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&apos;|&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
}
function stripHtml(value="") {
  return decodeXml(value).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
}
function getTag(block, tag) {
  const escaped=tag.replace(":","\\:");
  return block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`,"i"))?.[1]?.trim()||"";
}
function getAttribute(block, tag, attr) {
  return block.match(new RegExp(`<${tag}\\b[^>]*\\b${attr}=["']([^"']+)["'][^>]*>`,"i"))?.[1]||"";
}
function findImage(block, html) {
  return decodeXml(getAttribute(block,"media:content","url")||getAttribute(block,"media:thumbnail","url")||getAttribute(block,"enclosure","url")||html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1]||"");
}
function sourceFromLink(link) { try { return new URL(link).hostname.replace(/^www\./,""); } catch { return "Fitness News"; } }
function parseFeed(xml, offset=0) {
  return (xml.match(/<item\b[\s\S]*?<\/item>/gi)||[]).map((block,index)=>{
    const raw=getTag(block,"content:encoded")||getTag(block,"description")||getTag(block,"summary");
    const title=stripHtml(getTag(block,"title"));
    const link=stripHtml(getTag(block,"link")||getTag(block,"guid"));
    return {title,link,description:stripHtml(raw).slice(0,1200)||"A short summary was not supplied by this source.",source:stripHtml(getTag(block,"source"))||sourceFromLink(link),date:stripHtml(getTag(block,"pubDate")||getTag(block,"dc:date")||getTag(block,"published")),image:findImage(block,raw)||DEFAULT_IMAGES[(index+offset)%DEFAULT_IMAGES.length]};
  }).filter(item=>item.title);
}
async function fetchFeed(url, offset) {
  const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),9000);
  try { const response=await fetch(url,{signal:controller.signal,headers:{Accept:"application/rss+xml, application/xml, text/xml, */*"}}); if(!response.ok) throw new Error(`HTTP ${response.status}`); return parseFeed(await response.text(),offset); }
  finally { clearTimeout(timer); }
}
function unique(items) { const seen=new Set(); return items.filter(item=>{const key=item.title.toLowerCase().replace(/\s+/g," ").trim(); if(seen.has(key)) return false; seen.add(key); return true;}); }
export async function onRequestGet(context) {
  const url=new URL(context.request.url); const requested=url.searchParams.get("lang")||"sq"; const lang=["sq","de","en"].includes(requested)?requested:"sq";
  let items=[];
  try { const results=await Promise.allSettled(FEEDS[lang].map(fetchFeed)); items=unique(results.flatMap(r=>r.status==="fulfilled"?r.value:[])).slice(0,9); } catch {}
  if(!items.length) items=FALLBACK[lang];
  return new Response(JSON.stringify({items,language:lang}),{headers:{"content-type":"application/json; charset=utf-8","cache-control":"public, max-age=300","access-control-allow-origin":"*"}});
}

