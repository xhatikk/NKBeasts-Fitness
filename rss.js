const fallbackNews=[
  {title:"How strength training supports healthy aging",source:"Fitness",img:"https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",url:"#"},
  {title:"Protein timing: what matters most for muscle growth",source:"Nutrition",img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",url:"#"},
  {title:"Why consistency beats perfect workout plans",source:"Training",img:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",url:"#"}
];
function renderNews(items){
  document.getElementById("newsGrid").innerHTML=items.slice(0,3).map((x,i)=>`<article class="news-card">
    <img src="${x.img||fallbackNews[i%3].img}" alt="" loading="lazy">
    <div class="news-card-content"><small>${x.source||"Fitness News"}</small><h3><a href="${x.url}" target="_blank" rel="noopener">${x.title}</a></h3></div>
  </article>`).join("");
}
async function loadNews(){
  renderNews(fallbackNews);
  try{
    const query=encodeURIComponent("fitness OR nutrition OR exercise when:7d");
    const rss=`https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
    const proxy=`https://api.allorigins.win/raw?url=${encodeURIComponent(rss)}`;
    const xml=await fetch(proxy,{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error("rss");return r.text()});
    const doc=new DOMParser().parseFromString(xml,"text/xml");
    const items=[...doc.querySelectorAll("item")].slice(0,3).map((item,i)=>({
      title:item.querySelector("title")?.textContent||fallbackNews[i].title,
      source:item.querySelector("source")?.textContent||"Google News",
      url:item.querySelector("link")?.textContent||"#",
      img:fallbackNews[i].img
    }));
    if(items.length)renderNews(items);
  }catch(e){}
}
document.getElementById("refreshNews").onclick=loadNews;
loadNews();
