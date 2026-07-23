(() => {
  'use strict';

  const grid = document.getElementById('newsGrid');
  const refreshButton = document.getElementById('refreshNews');
  if (!grid) return;

  const copy = {
    sq: { loading: 'Lajmet po ngarkohen…', read: 'Lexo lajmin', close: 'Mbylle', error: 'Lajmet live nuk u ngarkuan. Po shfaqen artikujt rezervë.', published: 'Publikuar' },
    de: { loading: 'Nachrichten werden geladen…', read: 'Artikel lesen', close: 'Schließen', error: 'Live-News konnten nicht geladen werden. Ersatzartikel werden angezeigt.', published: 'Veröffentlicht' },
    en: { loading: 'Loading news…', read: 'Read article', close: 'Close', error: 'Live news could not be loaded. Showing backup articles.', published: 'Published' }
  };

  const fallback = {
    sq: [
      { title: 'Sa proteinë të duhet realisht çdo ditë?', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1000&q=82', summary: 'Për shumicën e personave aktivë, një interval praktik është rreth 1.2–2.2 gram proteinë për kilogram peshë trupore në ditë. Sasia varet nga qëllimi, niveli i aktivitetit dhe kaloritë totale. Shpërndaje në 3–5 vakte dhe përdor ushqime të plota si mish pa dhjamë, peshk, vezë, kos, gjizë, fasule dhe thjerrëza.' },
      { title: 'Stërvitja e forcës dhe plakja e shëndetshme', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=82', summary: 'Stërvitja e forcës ndihmon në ruajtjen e masës muskulore, forcës dhe funksionit fizik me kalimin e moshës. Dy deri në katër seanca në javë, me teknikë të kontrolluar dhe progres gradual, janë më të vlefshme se programet ekstreme që nuk mund të mbahen gjatë.' },
      { title: 'Karbohidratet nuk janë armiku', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=82', summary: 'Karbohidratet furnizojnë energji për stërvitje dhe aktivitet ditor. Problemi zakonisht nuk është vetë karbohidrati, por teprica kalorike dhe burimet me cilësi të dobët. Jepu përparësi tërshërës, orizit, patateve, frutave, perimeve dhe drithërave integrale.' }
    ],
    de: [
      { title: 'Wie viel Protein brauchst du wirklich?', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1000&q=82', summary: 'Für viele aktive Menschen sind etwa 1,2–2,2 Gramm Protein pro Kilogramm Körpergewicht täglich ein praktischer Bereich. Die genaue Menge hängt von Ziel, Aktivität und Kalorienzufuhr ab. Verteile das Protein auf mehrere Mahlzeiten und bevorzuge vollwertige Lebensmittel.' },
      { title: 'Krafttraining für gesundes Altern', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=82', summary: 'Regelmäßiges Krafttraining unterstützt Muskelmasse, Kraft und körperliche Funktion. Zwei bis vier gut geplante Einheiten pro Woche mit sauberer Technik und schrittweiser Steigerung sind sinnvoller als extreme Programme.' },
      { title: 'Kohlenhydrate sind nicht der Feind', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=82', summary: 'Kohlenhydrate liefern Energie für Training und Alltag. Entscheidend sind Gesamtenergie und Lebensmittelqualität. Haferflocken, Reis, Kartoffeln, Obst, Gemüse und Vollkornprodukte sind meist die bessere Wahl.' }
    ],
    en: [
      { title: 'How much protein do you really need?', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1000&q=82', summary: 'For many active adults, roughly 1.2–2.2 grams of protein per kilogram of body weight per day is a practical range. The exact amount depends on goals, activity and total calories. Spread it across several meals and prioritize whole-food sources.' },
      { title: 'Strength training for healthy ageing', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=82', summary: 'Consistent strength training helps preserve muscle, strength and physical function. Two to four well-planned sessions per week with controlled technique and gradual progression are more useful than extreme plans that cannot be sustained.' },
      { title: 'Carbohydrates are not the enemy', source: 'NKBEASTS', date: new Date().toISOString(), image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=82', summary: 'Carbohydrates provide energy for training and daily activity. The main issue is usually excess calories and poor food quality, not carbohydrates themselves. Prioritize oats, rice, potatoes, fruit, vegetables and whole grains.' }
    ]
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const cleanText = (value) => {
    const doc = new DOMParser().parseFromString(String(value || ''), 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  };

  const state = { items: [] };

  function language() {
    return ['sq', 'de', 'en'].includes(window.currentLang) ? window.currentLang : 'sq';
  }

  function ensureModal() {
    if (document.getElementById('newsArticleModal')) return;
    const style = document.createElement('style');
    style.textContent = `
      .news-card button{border:0;background:transparent;color:var(--gold);font-weight:800;padding:0;cursor:pointer;text-align:left}
      .news-error{grid-column:1/-1;padding:12px 14px;border:1px solid #5b4520;background:#171208;color:#e8c96f;border-radius:10px}
      #newsArticleModal .news-article-image{width:100%;max-height:320px;object-fit:cover;border-radius:10px;margin:4px 0 18px}
      #newsArticleModal .news-meta{color:var(--gold);font-size:12px;font-weight:800;margin-bottom:10px}
      #newsArticleModal .news-copy{color:#c8cdd3;line-height:1.75;font-size:15px}
      #newsArticleModal .news-copy p{margin:0 0 14px}
    `;
    document.head.appendChild(style);

    const modal = document.createElement('div');
    modal.id = 'newsArticleModal';
    modal.className = 'modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class="modal-card"><button class="close" type="button" data-news-close>×</button><div id="newsArticleContent"></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.closest('[data-news-close]')) closeModal();
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  }

  function closeModal() {
    const modal = document.getElementById('newsArticleModal');
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openArticle(index) {
    const item = state.items[index];
    if (!item) return;
    ensureModal();
    const lang = language();
    const modal = document.getElementById('newsArticleModal');
    const content = document.getElementById('newsArticleContent');
    const date = item.date ? new Intl.DateTimeFormat(lang === 'sq' ? 'sq-AL' : lang === 'de' ? 'de-DE' : 'en-US', { dateStyle: 'medium' }).format(new Date(item.date)) : '';
    const paragraphs = cleanText(item.content || item.summary || '').split(/(?<=[.!?])\s+(?=[A-ZÄÖÜËÇ])/).reduce((groups, sentence) => {
      const current = groups[groups.length - 1];
      if (!current || current.length > 430) groups.push(sentence); else groups[groups.length - 1] += ' ' + sentence;
      return groups;
    }, []).map(p => `<p>${escapeHtml(p)}</p>`).join('');
    content.innerHTML = `
      <div class="news-meta">${escapeHtml(item.source || 'NKBEASTS')}${date ? ` · ${escapeHtml(copy[lang].published)} ${escapeHtml(date)}` : ''}</div>
      <h2>${escapeHtml(item.title)}</h2>
      ${item.image ? `<img class="news-article-image" src="${escapeHtml(item.image)}" alt="" loading="lazy">` : ''}
      <div class="news-copy">${paragraphs || `<p>${escapeHtml(item.summary || '')}</p>`}</div>
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function render(items, showError = false) {
    const lang = language();
    state.items = items;
    grid.innerHTML = `${showError ? `<p class="news-error">${escapeHtml(copy[lang].error)}</p>` : ''}${items.map((item, index) => `
      <article class="news-card">
        <img src="${escapeHtml(item.image || 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80')}" alt="" loading="lazy">
        <div>
          <small>${escapeHtml(item.source || 'NKBEASTS')}</small>
          <h3>${escapeHtml(item.title)}</h3>
          <button type="button" data-news-index="${index}">${escapeHtml(copy[lang].read)} →</button>
        </div>
      </article>`).join('')}`;
    grid.querySelectorAll('[data-news-index]').forEach((button) => button.addEventListener('click', () => openArticle(Number(button.dataset.newsIndex))));
  }

  async function loadNews() {
    const lang = language();
    render(fallback[lang]);
    refreshButton?.setAttribute('disabled', 'disabled');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);
      const response = await fetch(`/api/news?lang=${encodeURIComponent(lang)}&t=${Date.now()}`, { cache: 'no-store', signal: controller.signal });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data.items) || data.items.length === 0) throw new Error('No news items');
      render(data.items.slice(0, 9));
    } catch (error) {
      console.warn('NKBEASTS news fallback:', error);
      render(fallback[lang], true);
    } finally {
      refreshButton?.removeAttribute('disabled');
    }
  }

  refreshButton?.addEventListener('click', loadNews);
  window.addEventListener('nk-language-change', loadNews);
  ensureModal();
  loadNews();
})();
