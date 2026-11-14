    /* ------------------------------------------------------------------
       Two language axes:

         host  — the language of the country you are in. Data lives in
                 i18n/host.<code>.js (script + latin per phrase).
         guest — your own language, used for the UI and the phrase meanings.
                 Data lives in i18n/guest.<code>.js.

       Adding a guest language = one new guest file + a script tag.
       Adding a destination = one new host file; the app makes no assumptions
       about the script outside that file.
       ------------------------------------------------------------------ */
    const HOSTS = window.HOSTS || {};
    const LOCALES = window.LOCALES || {};

    const state = {
      host: localStorage.getItem('thai.host') || 'th',
      guest: localStorage.getItem('thai.guest') === 'en' ? 'en' : 'sv',
      pol: localStorage.getItem('thai.pol') === 'f' ? 'f' : 'm',
      eggOk: localStorage.getItem('thai.egg') !== '0',
    };

    const hostData = () => HOSTS[state.host] || HOSTS.th;
    const loc = () => LOCALES[state.guest] || LOCALES.sv;
    const $ = (id) => document.getElementById(id);

    /** Guest-language label for a phrase: guest -> Swedish -> id. */
    const labelOf = (p) => {
      const g = loc().phrases || {};
      if (g[p.id] != null) return g[p.id];
      const sv = (LOCALES.sv && LOCALES.sv.phrases) || {};
      return sv[p.id] != null ? sv[p.id] : p.id;
    };

    /**
     * Single source of truth for rendered phrase text.
     * {p} is the politeness particle; `egg` phrases get a wording variant so
     * มังสวิรัติ (egg ok) and เจ (strict vegetarian) stay distinguishable.
     */
    const compose = (p) => {
      const parts = hostData().parts;
      const part = state.pol === 'm' ? parts.m : (p.q ? parts.fq : parts.f);

      const script = p.egg
        ? p.script.replace('{p}', (state.eggOk ? p.egg.scriptOn : p.egg.scriptOff) + part.script)
        : p.script.replace('{p}', part.script);

      const latin = p.egg
        ? p.latin.replace('{p}', (state.eggOk ? p.egg.latinOn : p.egg.latinOff) + ' ' + part.latin)
        : p.latin.replace('{p}', part.latin);

      const suffix = p.egg ? (state.eggOk ? loc().egg.on : loc().egg.off) : '';
      return { script, latin, guest: labelOf(p) + suffix };
    };

    /* ---------- render ---------- */
    const carousel = $('carousel');
    const tabs = $('tabs');
    const dots = $('dots');

    const phrasesOf = (catId) => (hostData().phrases || []).filter((p) => p.cat === catId);

    function build() {
      const ui = loc().ui;
      tabs.innerHTML = '';
      dots.innerHTML = '';
      carousel.innerHTML = '';
      lastPage = 0; // rebuilding resets the carousel to the first page

      hostData().categories.forEach((cat, i) => {
        const tabLabel = (ui.tabs && ui.tabs[cat.id]) || cat.id;

        const tab = document.createElement('button');
        tab.type = 'button';
        tab.role = 'tab';
        tab.textContent = tabLabel;
        tab.setAttribute('aria-selected', String(i === 0));
        tab.onclick = () => goTo(i);
        tabs.appendChild(tab);

        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', tabLabel);
        dot.setAttribute('aria-current', String(i === 0));
        dot.onclick = () => goTo(i);
        dots.appendChild(dot);

        const page = document.createElement('section');
        page.className = 'page';
        page.style.setProperty('--accent', 'var(--acc-' + cat.id + ', var(--acc-greet))');
        page.dataset.index = i;

        // Vegetarian splits into "egg ok" and "strict" in the host language,
        // so the dietary page gets its own egg switch.
        if (cat.id === 'spice') {
          const hints = hostData().hints || {};
          const row = document.createElement('div');
          row.className = 'mode-row';
          row.innerHTML =
            '<span class="mode-label"></span>' +
            '<div class="seg">' +
              '<button type="button" data-egg="1"><span></span><small>' + (hints.eggOn || '') + '</small></button>' +
              '<button type="button" data-egg="0"><span></span><small>' + (hints.eggOff || '') + '</small></button>' +
            '</div>';
          row.querySelector('.mode-label').textContent = ui.egg;
          row.querySelector('[data-egg="1"] span').textContent = ui.eggOn;
          row.querySelector('[data-egg="0"] span').textContent = ui.eggOff;
          row.querySelectorAll('button').forEach((b) => {
            b.onclick = () => setEgg(b.dataset.egg === '1');
          });
          page.appendChild(row);
        }

        phrasesOf(cat.id).forEach((phrase) => {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'card';
          card.dataset.id = phrase.id;
          card.innerHTML =
            '<span class="check"></span>' +
            '<div class="card-main">' +
              '<div class="card-top"><span class="label"></span><span class="th"></span></div>' +
              '<span class="latin"></span>' +
            '</div>';
          card.querySelector('.label').textContent = labelOf(phrase);
          const c = compose(phrase);
          card.querySelector('.th').textContent = c.script;
          card.querySelector('.latin').textContent = c.latin;
          card.onclick = () => onCardClick(phrase, card);
          page.appendChild(card);
        });

        carousel.appendChild(page);
      });
    }

    function refresh() {
      // Re-render text in place so the option switches feel instant.
      hostData().categories.forEach((cat, i) => {
        const page = carousel.children[i];
        const list = phrasesOf(cat.id);
        [...page.querySelectorAll('.card')].forEach((card, j) => {
          const phrase = list[j];
          const c = compose(phrase);
          card.querySelector('.label').textContent = labelOf(phrase);
          card.querySelector('.th').textContent = c.script;
          card.querySelector('.latin').textContent = c.latin;
        });
      });

      [...carousel.querySelectorAll('.seg button')].forEach((b) =>
        b.setAttribute('aria-pressed', String((b.dataset.egg === '1') === state.eggOk))
      );
    }

    function setEgg(ok) {
      state.eggOk = ok;
      localStorage.setItem('thai.egg', ok ? '1' : '0');
      refresh();
    }

    /* ---------- navigation ---------- */
    function goTo(i) {
      carousel.scrollTo({ left: i * carousel.clientWidth, behavior: 'smooth' });
    }

    let raf = 0;
    let lastPage = -1;
    let navTimer = 0;

    /** Scroll only as far as needed to bring the active tab fully into view. */
    function revealActiveTab() {
      const active = tabs.querySelector('[aria-selected="true"]');
      if (!active || tabs.scrollWidth <= tabs.clientWidth) return;

      const navRect = tabs.getBoundingClientRect();
      const tabRect = active.getBoundingClientRect();
      const pad = 14;

      let delta = 0;
      if (tabRect.left < navRect.left + pad) delta = tabRect.left - navRect.left - pad;
      else if (tabRect.right > navRect.right - pad) delta = tabRect.right - navRect.right + pad;
      if (Math.abs(delta) < 1) return;

      tabs.scrollBy({ left: delta, behavior: 'smooth' });
    }

    /**
     * Runs on every scroll frame, but only touches the DOM when the page index
     * actually changes. Writing --accent on <html> invalidates styles for every
     * card, and moving the tab row mid-gesture fights the swipe — that was the lag.
     */
    carousel.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(carousel.scrollLeft / carousel.clientWidth);
        if (i === lastPage) return;
        lastPage = i;

        [...tabs.children].forEach((t, j) => t.setAttribute('aria-selected', String(j === i)));
        [...dots.children].forEach((d, j) => d.setAttribute('aria-current', String(j === i)));

        // Wait for the swipe to settle before nudging the tab row; starting an
        // animation while the finger is still moving makes it feel slow.
        clearTimeout(navTimer);
        navTimer = setTimeout(revealActiveTab, 130);

        const cats = hostData().categories;
        document.documentElement.style.setProperty(
          '--accent',
          cats[i] ? 'var(--acc-' + cats[i].id + ', var(--acc-greet))' : 'var(--acc-greet)'
        );
      });
    }, { passive: true });

    /* ---------- detail ---------- */
    let bigItems = [];
    let bigIndex = 0;

    function openBig(phrases) {
      bigItems = Array.isArray(phrases) ? phrases : [];
      if (!bigItems.length) return;

      const track = $('big-track');
      track.innerHTML = '';
      bigItems.forEach((phrase) => {
        const c = compose(phrase);
        const slide = document.createElement('div');
        slide.className = 'big-slide';
        slide.innerHTML =
          '<div class="thai"></div><div class="latin"></div><div class="en"></div>';
        slide.querySelector('.thai').textContent = c.script;
        slide.querySelector('.latin').textContent = c.latin;
        slide.querySelector('.en').textContent = c.guest;
        track.appendChild(slide);
      });

      bigIndex = 0;
      track.scrollLeft = 0;
      updateBigCounter();
      $('big').classList.add('open');
    }

    function closeBig() {
      $('big').classList.remove('open');
    }

    function updateBigCounter() {
      const counter = $('big-counter');
      if (bigItems.length > 1) {
        counter.textContent = (bigIndex + 1) + ' / ' + bigItems.length;
        counter.hidden = false;
      } else {
        counter.hidden = true;
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if ($('big').classList.contains('open')) return closeBig();
      if ($('info-sheet').classList.contains('open')) return closeInfo();
      if ($('lang-sheet').classList.contains('open')) return closeLang();
      if (selectionMode.active) return exitSelect();
    });

    /* ---------- politeness switch ---------- */
    document.querySelectorAll('.pol button').forEach((btn) => {
      btn.onclick = () => {
        state.pol = btn.dataset.pol;
        localStorage.setItem('thai.pol', state.pol);
        document.querySelectorAll('.pol button').forEach((b) =>
          b.setAttribute('aria-pressed', String(b === btn))
        );
        refresh();
      };
    });

    /* ---------- language switch ---------- */
    function buildGuestOptions() {
      const box = $('guest-options');
      box.innerHTML = '';
      Object.values(LOCALES).forEach((locale) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-pressed', String(locale.code === state.guest));
        b.innerHTML = '<span></span><span class="tick">✓</span>';
        b.firstChild.textContent = locale.name;
        b.onclick = () => setGuest(locale.code);
        box.appendChild(b);
      });
    }

    function setGuest(code) {
      state.guest = code;
      localStorage.setItem('thai.guest', code);
      applyUi();
      build();
      refresh();
    }

    function openLang() { $('lang-sheet').classList.add('open'); }
    function closeLang() { $('lang-sheet').classList.remove('open'); }

    function openInfo() {
      $('info-title').textContent = loc().ui.infoTitle;
      const list = $('info-list');
      list.innerHTML = '';
      (loc().ui.info || []).forEach((item, i) => {
        const li = document.createElement('li');
        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = String(i + 1);
        const text = document.createElement('span');
        const bold = document.createElement('b');
        bold.textContent = item.t + ' ';
        text.appendChild(bold);
        text.appendChild(document.createTextNode(item.b));
        li.appendChild(num);
        li.appendChild(text);
        list.appendChild(li);
      });
      $('info-sheet').classList.add('open');
    }

    function closeInfo() {
      $('info-sheet').classList.remove('open');
    }

    function applyUi() {
      const ui = loc().ui;
      document.querySelectorAll('[data-i18n="subtitle"]').forEach((el) => {
        el.textContent = '· ' + ui.subtitle;
      });
      document.querySelectorAll('[data-pol-label]').forEach((el) => {
        el.textContent = el.closest('[data-pol="m"]') ? ui.male : ui.female;
      });
      $('btn-show-selected').textContent = ui.showSelected;
      $('btn-lang-close').textContent = ui.close;
      $('btn-cancel-select').textContent = ui.cancel;
      $('select-count-label').textContent = ui.selected;
      $('big-hint').textContent = ui.tapToClose;
      $('btn-lang').setAttribute('aria-label', ui.language);
      $('btn-info').setAttribute('aria-label', ui.infoTitle);
      $('btn-info-close').textContent = ui.close;
      $('btn-select').setAttribute('aria-label', ui.select);
      $('lbl-guest-lang').textContent = ui.guestLabel;
      $('lbl-host-lang').textContent = ui.hostLabel;
      $('host-value').textContent = hostData().native + ' · ' + hostData().name;
      $('host-name').textContent = hostData().native;
      document.documentElement.lang = state.guest;
      document.title = ui.appName || 'Fraslista';
      buildGuestOptions();
    }

    /* ---------- multi-select -> fullscreen queue ---------- */
    const selectionMode = { active: false, ids: new Set() };
    const LONG_PRESS_MS = 450;
    let pressTimer = 0;
    let pressStart = null;
    let lastLongPress = 0;
    let longPressId = null;

    function enterSelect() {
      if (selectionMode.active) return;
      selectionMode.active = true;
      document.body.classList.add('selecting');
      renderSelection();
    }

    function toggleSelect() {
      if (selectionMode.active) exitSelect();
      else enterSelect();
    }

    function exitSelect() {
      selectionMode.active = false;
      selectionMode.ids.clear();
      document.body.classList.remove('selecting');
      document.querySelectorAll('.card.selected').forEach((c) => c.classList.remove('selected'));
      renderSelection();
    }

    const phraseById = (id) => (hostData().phrases || []).find((p) => p.id === id);

    function selectPhrase(phrase, card) {
      selectionMode.ids.add(phrase.id);
      if (card) card.classList.add('selected');
      renderSelection();
    }

    function onCardClick(phrase, card) {
      // The click that the browser fires right after a long press must not toggle
      // the same card off again. Taps on *other* cards stay unaffected.
      if (Date.now() - lastLongPress < 700 && card.dataset.id === longPressId) return;

      if (!selectionMode.active) return openBig([phrase]);

      if (selectionMode.ids.has(phrase.id)) selectionMode.ids.delete(phrase.id);
      else selectionMode.ids.add(phrase.id);
      card.classList.toggle('selected', selectionMode.ids.has(phrase.id));
      renderSelection();
    }

    /* Long press on a card enters select mode with that phrase pre-selected.
       Any movement (scroll, swipe) or pointer cancellation aborts it. */
    function startLongPress(e) {
      if (selectionMode.active) return;
      const card = e.target.closest('.card');
      if (!card) return;

      pressStart = { x: e.clientX, y: e.clientY };
      clearTimeout(pressTimer);
      pressTimer = setTimeout(() => {
        pressTimer = 0;
        lastLongPress = Date.now();
        longPressId = card.dataset.id;
        if (navigator.vibrate) navigator.vibrate(12);
        const phrase = phraseById(card.dataset.id);
        enterSelect();
        if (phrase) selectPhrase(phrase, card);
      }, LONG_PRESS_MS);
    }

    function cancelLongPress() {
      if (!pressTimer) return;
      clearTimeout(pressTimer);
      pressTimer = 0;
    }

    carousel.addEventListener('pointerdown', startLongPress);
    carousel.addEventListener('pointerup', cancelLongPress);
    carousel.addEventListener('pointercancel', cancelLongPress);
    carousel.addEventListener('pointerleave', cancelLongPress);
    carousel.addEventListener('pointermove', (e) => {
      if (!pressStart) return;
      if (Math.abs(e.clientX - pressStart.x) > 8 || Math.abs(e.clientY - pressStart.y) > 8) {
        cancelLongPress();
      }
    }, { passive: true });
    carousel.addEventListener('scroll', cancelLongPress, { passive: true });

    function selectedPhrases() {
      return (hostData().phrases || []).filter((p) => selectionMode.ids.has(p.id));
    }

    function renderSelection() {
      const n = selectionMode.ids.size;
      const bar = $('select-bar');
      bar.classList.toggle('open', selectionMode.active);
      $('select-count').textContent = String(n);
      $('btn-show-selected').disabled = n === 0;
    }

    function showSelected() {
      const list = selectedPhrases();
      if (!list.length) return;
      openBig(list);
    }

    $('big-track').addEventListener('scroll', () => {
      const track = $('big-track');
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== bigIndex) {
        bigIndex = i;
        updateBigCounter();
      }
    }, { passive: true });

    /* ---------- init ---------- */
    applyUi();
    build();
    refresh();
    document.querySelectorAll('.pol button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.pol === state.pol))
    );
    renderSelection();

    // iOS standalone: the status bar text colour cannot follow a CSS media query,
    // so pick the style that matches the system theme (dark = white text on the
    // translucent bar, light = the standard bar).
    const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function syncStatusBar() {
      if (statusBarMeta) {
        statusBarMeta.setAttribute('content', darkQuery.matches ? 'black-translucent' : 'default');
      }
    }
    syncStatusBar();
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', syncStatusBar);

    // Offline: the whole app (markup + fonts) is precached on first visit.
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('sw.js', { updateViaCache: 'none' })
          .then((reg) => reg.update().catch(() => {}))
          .catch(() => {});
      });
    }
  
