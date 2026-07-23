(() => {
  "use strict";

  const grid = document.getElementById("newsGrid");
  const refreshButton = document.getElementById("refreshNews");

  if (!grid) {
    console.warn("NKBEASTS RSS: #newsGrid was not found.");
    return;
  }

  const TEXT = {
    sq: {
      loading: "Duke ngarkuar lajmet…",
      refresh: "Rifresko →",
      read: "Lexoje këtu",
      original: "Hape burimin origjinal →",
      close: "Mbylle",
      latest: "Lajmet më të fundit",
      error: "Lajmet live nuk u ngarkuan. Po shfaqen artikuj rezervë."
    },
    de: {
      loading: "Nachrichten werden geladen…",
      refresh: "Aktualisieren →",
      read: "Hier lesen",
      original: "Originalquelle öffnen →",
      close: "Schließen",
      latest: "Neueste Nachrichten",
      error: "Live-Nachrichten konnten nicht geladen werden. Ersatzartikel werden angezeigt."
    },
    en: {
      loading: "Loading latest news…",
      refresh: "Refresh →",
      read: "Read here",
      original: "Open original source →",
      close: "Close",
      latest: "Latest news",
      error: "Live news could not be loaded. Backup articles are being shown."
    }
  };

  const fallback = {
    sq: [
      {
        title: "Stërvitja e forcës dhe ruajtja e masës muskulore",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=82",
        description: "Stërvitja e forcës ndihmon në ruajtjen e muskujve, forcimin e kockave dhe përmirësimin e aftësisë funksionale. Filloni me ushtrime bazë, teknikë të kontrolluar dhe rritje graduale të ngarkesës.",
        link: "#workouts"
      },
      {
        title: "Sa proteinë të duhet gjatë ditës?",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=82",
        description: "Nevoja për proteinë ndryshon sipas peshës, aktivitetit dhe qëllimit. Shpërndarja e proteinës në disa vakte mund ta mbështesë rikuperimin dhe ruajtjen e masës muskulore.",
        link: "#nutrition"
      },
      {
        title: "Gjumi është pjesë e programit të stërvitjes",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=82",
        description: "Gjumi i mirë mbështet rikuperimin, energjinë dhe performancën. Një orar i rregullt, më pak ekran para gjumit dhe një dhomë e qetë mund të ndihmojnë.",
        link: "#library"
      }
    ],
    de: [
      {
        title: "Krafttraining und Erhalt der Muskelmasse",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=82",
        description: "Krafttraining unterstützt Muskeln, Knochen und die alltägliche Leistungsfähigkeit. Beginne mit Grundübungen, sauberer Technik und einer schrittweisen Steigerung.",
        link: "#workouts"
      },
      {
        title: "Wie viel Protein brauchst du täglich?",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=82",
        description: "Der Proteinbedarf hängt von Körpergewicht, Aktivität und Ziel ab. Eine Verteilung auf mehrere Mahlzeiten kann Regeneration und Muskelerhalt unterstützen.",
        link: "#nutrition"
      },
      {
        title: "Schlaf gehört zum Trainingsplan",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=82",
        description: "Guter Schlaf unterstützt Erholung, Energie und Leistung. Ein regelmäßiger Rhythmus und weniger Bildschirmzeit am Abend können helfen.",
        link: "#library"
      }
    ],
    en: [
      {
        title: "Strength training and maintaining muscle",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=82",
        description: "Strength training supports muscle, bone health and everyday function. Start with basic movements, controlled technique and gradual progression.",
        link: "#workouts"
      },
      {
        title: "How much protein do you need each day?",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=82",
        description: "Protein needs depend on body weight, activity and goals. Spreading protein across several meals can support recovery and muscle maintenance.",
        link: "#nutrition"
      },
      {
        title: "Sleep is part of your training plan",
        source: "NKBEASTS",
        date: "",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=82",
        description: "Good sleep supports recovery, energy and performance. A regular schedule, less screen time before bed and a quiet room can help.",
        link: "#library"
      }
    ]
  };

  let items = [];
  let activeLanguage = getLanguage();

  function getLanguage() {
    const selected =
      window.currentLang ||
      document.documentElement.lang ||
      localStorage.getItem("nk-lang") ||
      "sq";

    return ["sq", "de", "en"].includes(selected) ? selected : "sq";
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function safeUrl(value, fallbackValue = "#") {
    try {
      const url = new URL(value, window.location.origin);
      return ["http:", "https:"].includes(url.protocol)
        ? url.href
        : fallbackValue;
    } catch {
      return fallbackValue;
    }
  }

  function formatDate(value, language) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const locale = language === "sq" ? "sq-AL" : language === "de" ? "de-DE" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  }

  function injectStyles() {
    if (document.getElementById("nk-news-styles")) return;

    const style = document.createElement("style");
    style.id = "nk-news-styles";
    style.textContent = `
      #newsGrid{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:22px
      }
      .nk-news-card{
        overflow:hidden;
        border:1px solid rgba(255,255,255,.1);
        border-radius:18px;
        background:#0d1117;
        box-shadow:0 12px 36px rgba(0,0,0,.22);
        transition:transform .2s ease,border-color .2s ease
      }
      .nk-news-card:hover{
        transform:translateY(-4px);
        border-color:rgba(214,177,88,.55)
      }
      .nk-news-card img{
        display:block;
        width:100%;
        height:210px;
        object-fit:cover;
        background:#171b22
      }
      .nk-news-body{padding:20px}
      .nk-news-meta{
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        margin-bottom:10px;
        color:#d6b158;
        font-size:12px;
        font-weight:800;
        letter-spacing:.06em;
        text-transform:uppercase
      }
      .nk-news-card h3{
        margin:0 0 12px;
        color:#fff;
        font-size:21px;
        line-height:1.25
      }
      .nk-news-card p{
        display:-webkit-box;
        overflow:hidden;
        margin:0 0 18px;
        color:#aeb6c2;
        line-height:1.65;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical
      }
      .nk-news-open{
        border:0;
        border-radius:999px;
        padding:11px 17px;
        background:#d6b158;
        color:#090b0f;
        font:inherit;
        font-weight:800;
        cursor:pointer
      }
      .nk-news-message{
        grid-column:1/-1;
        padding:30px;
        border:1px solid rgba(255,255,255,.1);
        border-radius:16px;
        color:#c9d0da;
        text-align:center
      }
      .nk-news-modal{
        position:fixed;
        inset:0;
        z-index:99999;
        display:none;
        align-items:center;
        justify-content:center;
        padding:20px;
        background:rgba(0,0,0,.82);
        backdrop-filter:blur(8px)
      }
      .nk-news-modal.open{display:flex}
      .nk-news-dialog{
        position:relative;
        overflow:auto;
        width:min(850px,100%);
        max-height:92vh;
        border:1px solid rgba(214,177,88,.35);
        border-radius:22px;
        background:#0c1016;
        box-shadow:0 30px 90px rgba(0,0,0,.65)
      }
      .nk-news-dialog img{
        display:block;
        width:100%;
        height:min(42vh,360px);
        object-fit:cover;
        background:#171b22
      }
      .nk-news-content{padding:28px}
      .nk-news-content h2{
        margin:8px 0 18px;
        color:#fff;
        font-size:clamp(28px,5vw,46px);
        line-height:1.08
      }
      .nk-news-content p{
        color:#c2c9d2;
        font-size:17px;
        line-height:1.8;
        white-space:pre-line
      }
      .nk-news-original{
        display:inline-flex;
        margin-top:15px;
        border-radius:999px;
        padding:13px 19px;
        background:#d6b158;
        color:#090b0f;
        font-weight:900;
        text-decoration:none
      }
      .nk-news-close{
        position:absolute;
        top:14px;
        right:14px;
        z-index:2;
        width:44px;
        height:44px;
        border:1px solid rgba(255,255,255,.25);
        border-radius:50%;
        background:rgba(0,0,0,.72);
        color:#fff;
        font-size:25px;
        cursor:pointer
      }
      body.nk-modal-open{overflow:hidden}
      @media(max-width:900px){
        #newsGrid{grid-template-columns:repeat(2,minmax(0,1fr))}
      }
      @media(max-width:620px){
        #newsGrid{grid-template-columns:1fr}
        .nk-news-card img{height:220px}
        .nk-news-content{padding:22px}
      }
    `;
    document.head.appendChild(style);
  }

  function injectModal() {
    if (document.getElementById("nkNewsModal")) return;

    const modal = document.createElement("div");
    modal.id = "nkNewsModal";
    modal.className = "nk-news-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <article class="nk-news-dialog">
        <button class="nk-news-close" type="button" aria-label="Close">×</button>
        <img id="nkNewsModalImage" alt="">
        <div class="nk-news-content">
          <div id="nkNewsModalMeta" class="nk-news-meta"></div>
          <h2 id="nkNewsModalTitle"></h2>
          <p id="nkNewsModalDescription"></p>
          <a id="nkNewsModalLink" class="nk-news-original" target="_blank" rel="noopener noreferrer"></a>
        </div>
      </article>
    `;

    document.body.appendChild(modal);

    const close = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("nk-modal-open");
    };

    modal.querySelector(".nk-news-close").addEventListener("click", close);
    modal.addEventListener("click", event => {
      if (event.target === modal) close();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") close();
    });
  }

  function draw(newsItems, language) {
    items = newsItems;

    grid.innerHTML = newsItems.map((item, index) => {
      const image = safeUrl(item.image, fallback[language][index % fallback[language].length].image);
      const date = formatDate(item.date || item.pubDate, language);
      const description = item.description || item.summary || "";
      const meta = [item.source || "Fitness News", date].filter(Boolean).join(" • ");

      return `
        <article class="nk-news-card">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy">
          <div class="nk-news-body">
            <div class="nk-news-meta">${escapeHtml(meta)}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(description)}</p>
            <button class="nk-news-open" type="button" data-news-index="${index}">
              ${escapeHtml(TEXT[language].read)}
            </button>
          </div>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-news-index]").forEach(button => {
      button.addEventListener("click", () => openModal(Number(button.dataset.newsIndex)));
    });
  }

  function openModal(index) {
    const item = items[index];
    if (!item) return;

    const language = activeLanguage;
    const modal = document.getElementById("nkNewsModal");
    const date = formatDate(item.date || item.pubDate, language);
    const meta = [item.source || "Fitness News", date].filter(Boolean).join(" • ");
    const link = document.getElementById("nkNewsModalLink");
    const externalLink = safeUrl(item.link, "");

    document.getElementById("nkNewsModalImage").src =
      safeUrl(item.image, fallback[language][0].image);
    document.getElementById("nkNewsModalImage").alt = item.title || "";
    document.getElementById("nkNewsModalMeta").textContent = meta;
    document.getElementById("nkNewsModalTitle").textContent = item.title || "";
    document.getElementById("nkNewsModalDescription").textContent =
      item.description || item.summary || "";

    if (externalLink && !externalLink.startsWith(window.location.origin + "/#")) {
      link.href = externalLink;
      link.textContent = TEXT[language].original;
      link.style.display = "inline-flex";
    } else {
      link.style.display = "none";
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("nk-modal-open");
  }

  async function loadNews() {
    activeLanguage = getLanguage();
    const language = activeLanguage;

    if (refreshButton) {
      refreshButton.textContent = TEXT[language].refresh;
      refreshButton.disabled = true;
    }

    grid.innerHTML = `<div class="nk-news-message">${escapeHtml(TEXT[language].loading)}</div>`;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(`/api/rss?lang=${encodeURIComponent(language)}&t=${Date.now()}`, {
        cache: "no-store",
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const receivedItems = Array.isArray(data.items) ? data.items : [];

      draw(receivedItems.length ? receivedItems : fallback[language], language);
    } catch (error) {
      console.warn("NKBEASTS RSS error:", error);
      draw(fallback[language], language);
    } finally {
      if (refreshButton) refreshButton.disabled = false;
    }
  }

  injectStyles();
  injectModal();

  refreshButton?.addEventListener("click", loadNews);
  window.addEventListener("nk-language-change", loadNews);

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      setTimeout(loadNews, 50);
    });
  });

  loadNews();
})();
