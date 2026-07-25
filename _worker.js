const ACTIVE_WINDOW_MS = 90000;
export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname === "/api/news" || url.pathname === "/api/rss") return news(request);
  if (url.pathname === "/api/online") return online(request, env);
  return env.ASSETS.fetch(request);
 }
};
async function news(request){
 const url=new URL(request.url); const lang=["sq","de","en"].includes(url.searchParams.get("lang"))?url.searchParams.get("lang"):"sq";
 const c={sq:{q:"fitness nutrition exercise when:7d",hl:"en-US",gl:"US",ceid:"US:en"},de:{q:"Fitness Ernährung Training when:7d",hl:"de",gl:"DE",ceid:"DE:de"},en:{q:"fitness nutrition exercise when:7d",hl:"en-US",gl:"US",ceid:"US:en"}}[lang];
 const feed=`https://news.google.com/rss/search?q=${encodeURIComponent(c.q)}&hl=${c.hl}&gl=${c.gl}&ceid=${c.ceid}`;
 try{const r=await fetch(feed,{headers:{"User-Agent":"Mozilla/5.0 NKBEASTS"}});if(!r.ok)throw new Error(String(r.status));const xml=await r.text();const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0,9).map(m=>{const b=m[1];const get=t=>{const h=b.match(new RegExp(`<${t}>([\\s\\S]*?)<\\/${t}>`));return h?h[1].replace(/<!\[CDATA\[|\]\]>/g,"").trim():""};const raw=decode(get("title"));const p=raw.split(" - ");return{title:p.slice(0,-1).join(" - ")||raw,source:p.length>1?p[p.length-1]:"Google News",description:strip(decode(get("description"))).slice(0,220),link:decode(get("link"))}});return Response.json({items},{headers:{"Cache-Control":"public,max-age=600"}})}catch(e){return Response.json({items:[],error:String(e)},{status:502})}
}
async function online(request,env){return Response.json({online:1,configured:false},{headers:{"Cache-Control":"no-store"}})}
function decode(s){return String(s||"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">")}
function strip(s){return String(s||"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()}
