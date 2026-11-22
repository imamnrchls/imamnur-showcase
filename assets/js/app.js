/* ============================================================
   Digital Products Storefront — imamnur.my.id Editorial Style
   ============================================================ */
(function () {
  const S = window.STORE;
  if (!S) return;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  const ICONS = {
    ne: '<svg class="ico" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 11.5l9-9M4 2.5h7.5V10"/></svg>',
    copy: '<svg class="ico" viewBox="0 0 14 14" aria-hidden="true"><rect x="4.5" y="4.5" width="7" height="7"/><path d="M2.5 9.5v-7h7"/></svg>',
    check: '<svg class="ico" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7"/></svg>',
  };

  /* ---------- Currency Formatting ---------- */
  const usdFmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  function formatPrice(p, rawVal) {
    if (rawVal === undefined) {
      if (p.priceDisplay) return p.priceDisplay;
      if (!p.price || p.price <= 0) return "Free";
      return usdFmt.format(p.price);
    }
    if (!rawVal || rawVal <= 0) return "";
    return usdFmt.format(rawVal);
  }

  /* ---------- Editorial Geometric SVG Art (fallback when cover is empty) ---------- */
  function renderArtSvg(kind, code) {
    const label = esc(code || "");
    switch (kind) {
      case "dial": {
        const dots = Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x = (240 + Math.cos(a) * 96).toFixed(1);
          const y = (150 + Math.sin(a) * 96).toFixed(1);
          const cls = i === 1 || i === 7 ? "a-hi" : "a-ink";
          const r = i % 3 === 0 ? 11 : 6;
          return `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
        }).join("");
        return `<svg class="art" viewBox="0 0 480 300" aria-hidden="true">
          <circle cx="240" cy="150" r="120" class="a-line"/>
          <circle cx="240" cy="150" r="64" class="a-line"/>
          <line x1="240" y1="150" x2="292" y2="74" class="a-hi-line"/>
          ${dots}
          <circle cx="240" cy="150" r="6" class="a-hi"/>
        </svg>`;
      }
      case "dots": {
        let cells = "";
        for (let r = 0; r < 6; r++) {
          for (let c = 0; c < 12; c++) {
            const x = 66 + c * 31.6;
            const y = 64 + r * 34;
            const isHi = (r === 1 && c >= 7) || (r === 2 && c >= 9);
            cells += `<circle cx="${x.toFixed(1)}" cy="${y}" r="${isHi ? 6.5 : 4}" class="${isHi ? "a-hi" : "a-ink"}" opacity="${isHi ? 1 : 0.72}"/>`;
          }
        }
        return `<svg class="art" viewBox="0 0 480 300" aria-hidden="true">
          <rect x="44" y="42" width="392" height="216" class="a-line"/>
          ${cells}
        </svg>`;
      }
      case "bars": {
        const heights = [48, 86, 124, 168, 138, 192, 110, 152, 74];
        const bars = heights
          .map((h, i) => {
            const x = 68 + i * 39;
            const y = 248 - h;
            const cls = i === 5 || i === 3 ? "a-hi" : "a-ink";
            return `<rect x="${x}" y="${y}" width="22" height="${h}" class="${cls}" opacity="${cls === "a-hi" ? 1 : 0.78}"/>`;
          })
          .join("");
        return `<svg class="art" viewBox="0 0 480 300" aria-hidden="true">
          <line x1="52" y1="248" x2="428" y2="248" class="a-line"/>
          <line x1="52" y1="150" x2="428" y2="150" class="a-line"/>
          ${bars}
        </svg>`;
      }
      case "rings": {
        return `<svg class="art" viewBox="0 0 480 300" aria-hidden="true">
          <circle cx="240" cy="150" r="118" class="a-line"/>
          <circle cx="240" cy="150" r="88" class="a-faint"/>
          <circle cx="240" cy="150" r="58" class="a-hi"/>
          <circle cx="240" cy="150" r="24" class="a-ink"/>
          <line x1="60" y1="150" x2="420" y2="150" class="a-line"/>
        </svg>`;
      }
      case "waves": {
        const paths = [0, 1, 2, 3, 4]
          .map((i) => {
            const y = 84 + i * 32;
            const cls = i === 2 ? "a-hi-line" : "a-line";
            return `<path d="M40 ${y} Q 140 ${y - 34}, 240 ${y} T 440 ${y}" class="${cls}"/>`;
          })
          .join("");
        return `<svg class="art" viewBox="0 0 480 300" aria-hidden="true">${paths}</svg>`;
      }
      default: {
        // Swiss architectural grid
        return `<svg class="art" viewBox="0 0 480 300" aria-hidden="true">
          <rect x="52" y="42" width="376" height="216" class="a-line"/>
          <line x1="177" y1="42" x2="177" y2="258" class="a-line"/>
          <line x1="303" y1="42" x2="303" y2="258" class="a-line"/>
          <line x1="52" y1="150" x2="428" y2="150" class="a-line"/>
          <rect x="68" y="58" width="93" height="76" class="a-faint"/>
          <rect x="193" y="166" width="94" height="76" class="a-hi"/>
          <circle cx="365" cy="96" r="28" class="a-ink"/>
          <text x="68" y="236" font-size="11" fill="currentColor" opacity="0.65" letter-spacing="1.2">${label}</text>
        </svg>`;
      }
    }
  }

  function renderVisual(p, imgSrc) {
    const src = imgSrc || p.cover;
    if (src) {
      return `<img src="${esc(src)}" alt="${esc(p.title)}" loading="lazy" decoding="async">`;
    }
    return renderArtSvg(p.art, p.code);
  }

  /* ---------- State ---------- */
  const state = {
    category: "All",
    query: "",
    sort: "featured",
    view: "grid",
    activeModalId: null,
  };

  /* ---------- DOM References ---------- */
  const el = {
    brandLink: document.getElementById("brandLink"),
    pageCode: document.getElementById("pageCode"),
    storeEyebrow: document.getElementById("storeEyebrow"),
    storeTitle: document.getElementById("storeTitle"),
    storeCountLabel: document.getElementById("storeCountLabel"),
    storeDescription: document.getElementById("storeDescription"),
    gumroadProfileBtn: document.getElementById("gumroadProfileBtn"),
    marqueeTrack: document.getElementById("marqueeTrack"),
    storeStats: document.getElementById("storeStats"),
    categoryPills: document.getElementById("categoryPills"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    sortSelect: document.getElementById("sortSelect"),
    viewBtns: document.querySelectorAll(".view-btn"),
    resultMeta: document.getElementById("resultMeta"),
    catalogGrid: document.getElementById("catalogGrid"),
    catalogIndex: document.getElementById("catalogIndex"),
    emptyState: document.getElementById("emptyState"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    floatPreview: document.getElementById("floatPreview"),
    menuToggle: document.getElementById("menuToggle"),
    menu: document.getElementById("menu"),
    menuList: document.getElementById("menuList"),
    menuFoot: document.getElementById("menuFoot"),
    modal: document.getElementById("productModal"),
    modalCode: document.getElementById("modalCode"),
    modalBody: document.getElementById("modalBody"),
    modalPrev: document.getElementById("modalPrev"),
    modalNext: document.getElementById("modalNext"),
    siteFoot: document.getElementById("siteFoot"),
    footCta: document.getElementById("footCta"),
    footCopy: document.getElementById("footCopy"),
    footLinks: document.getElementById("footLinks"),
  };

  /* ---------- Hydrate Static Chrome from window.STORE ---------- */
  function hydrateShell() {
    el.brandLink.textContent = S.brand;
    el.pageCode.textContent = S.pageCode;
    el.storeEyebrow.textContent = S.eyebrow;
    el.storeTitle.textContent = S.title;
    el.storeDescription.textContent = S.description;
    el.gumroadProfileBtn.href = S.gumroadUrl;

    const total = S.products.length;
    const categories = [...new Set(S.products.map((p) => p.category))];
    const freeCount = S.products.filter((p) => !p.price || p.price <= 0).length;

    el.storeCountLabel.textContent = `${String(total).padStart(2, "0")} PRODUCTS AVAILABLE`;

    // Marquee (duplicated twice for seamless loop)
    const itemsHtml = S.marquee.map((t) => `<i>${esc(t)}</i>`).join("");
    el.marqueeTrack.innerHTML = `<span>${itemsHtml}</span><span>${itemsHtml}</span>`;

    // Stats strip
    const prices = S.products.map((p) => p.price).filter((n) => typeof n === "number" && n > 0);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const priceRange =
      freeCount > 0
        ? `${freeCount} Free`
        : minPrice === maxPrice
        ? `$${minPrice}`
        : `$${minPrice}–$${maxPrice}`;
    const priceDesc =
      freeCount > 0 ? "Available to try right away" : "Pro license price range (USD)";

    el.storeStats.innerHTML = [
      [String(total).padStart(2, "0"), "Digital products live on Gumroad"],
      [String(categories.length).padStart(2, "0"), "Design categories"],
      [priceRange, priceDesc],
    ]
      .map(([num, desc]) => `<li><b>${esc(num)}</b><span>${esc(desc)}</span></li>`)
      .join("");

    // Overlay Menu
    el.menuList.innerHTML = S.menu
      .map(
        (m, idx) => `
        <li>
          <a href="${esc(m.href)}"${m.external ? ' target="_blank" rel="noopener"' : ""}>
            <span class="code">${String(idx + 1).padStart(2, "0")} — ${esc(m.code)}</span>
            <span class="inner">${esc(m.label)}</span>
            <span class="arrow">${ICONS.ne}</span>
          </a>
        </li>`
      )
      .join("");
    el.menuFoot.innerHTML = `<span>${esc(S.owner)}</span><span>${esc(S.role)}</span><span>${esc(S.location)}</span>`;

    // Footer
    el.footCta.innerHTML = `${esc(S.footer.cta)} — <a href="${esc(S.footer.ctaHref)}">${esc(S.footer.ctaLinkLabel)}</a>.`;
    el.footCopy.textContent = `© ${new Date().getFullYear()} ${S.owner}`;
    el.footLinks.innerHTML = S.links
      .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
      .join("");
  }

  /* ---------- Categories ---------- */
  function renderCategories() {
    const counts = { All: S.products.length };
    S.products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    el.categoryPills.innerHTML = Object.entries(counts)
      .map(
        ([cat, count]) => `
        <button
          type="button"
          class="cat-pill${state.category === cat ? " is-active" : ""}"
          data-cat="${esc(cat)}"
          role="tab"
          aria-selected="${state.category === cat}"
        >
          <span>${esc(cat)}</span>
          <span class="cnt">${String(count).padStart(2, "0")}</span>
        </button>`
      )
      .join("");
  }

  /* ---------- Filtering & Sorting ---------- */
  function getFilteredProducts() {
    const q = state.query.trim().toLowerCase();
    let list = S.products.filter((p) => {
      const catMatch = state.category === "All" || p.category === state.category;
      if (!catMatch) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.summary,
        p.description,
        p.category,
        p.code,
        p.badge,
        ...(p.features || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    list = [...list];
    switch (state.sort) {
      case "newest":
        list.sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
        break;
      case "price-asc":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "title":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
        break;
    }
    return list;
  }

  /* ---------- Render Catalog (Grid + Index) ---------- */
  function renderCatalog() {
    const items = getFilteredProducts();
    const total = S.products.length;
    el.resultMeta.textContent =
      items.length === total
        ? `Showing ${items.length} products`
        : `Showing ${items.length} of ${total} products`;

    const isEmpty = items.length === 0;
    el.emptyState.hidden = !isEmpty;

    if (isEmpty) {
      el.catalogGrid.hidden = true;
      el.catalogIndex.hidden = true;
      return;
    }

    const isGrid = state.view === "grid";
    el.catalogGrid.hidden = !isGrid;
    el.catalogIndex.hidden = isGrid;

    if (isGrid) {
      el.catalogGrid.innerHTML = items
        .map((p, i) => {
          const tone = `tone-${(p.tone ?? i) % 4}`;
          const badgeLower = p.badge?.toLowerCase();
          const badgeClass =
            badgeLower === "free"
              ? "is-free"
              : badgeLower === "bestseller" || badgeLower === "new"
              ? "is-vermilion"
              : "";
          const oldPrice = formatPrice(p, p.originalPrice);

          return `
            <article class="card" style="--i:${i}">
              <div class="card-media ${tone}" data-open-product="${esc(p.id)}" role="button" tabindex="0" aria-label="View details for ${esc(p.title)}">
                ${renderVisual(p)}
                <span class="card-tag code">${esc(p.code)}</span>
                ${p.badge ? `<span class="card-badge small ${badgeClass}">${esc(p.badge)}</span>` : ""}
              </div>
              <div class="card-meta small muted">
                <span>${esc(p.category)}</span>
                <span>${esc(p.year || "")}</span>
              </div>
              <h2 class="card-title">
                <button type="button" data-open-product="${esc(p.id)}">${esc(p.title)}</button>
              </h2>
              <p class="card-summary">${esc(p.summary)}</p>
              <div class="card-foot">
                <div class="price-group">
                  <span class="price">${esc(formatPrice(p))}</span>
                  ${oldPrice ? `<span class="price-old">${esc(oldPrice)}</span>` : ""}
                </div>
                <div class="card-actions small">
                  <button type="button" class="pill-btn pill-btn--sm" data-open-product="${esc(p.id)}">
                    <span>Details</span>
                  </button>
                  <a class="pill-btn pill-btn--sm pill-btn--solid" href="${esc(p.buyUrl)}" target="_blank" rel="noopener">
                    <span>${p.price === 0 ? "Download" : "Buy"}</span>${ICONS.ne}
                  </a>
                </div>
              </div>
            </article>`;
        })
        .join("");
    } else {
      el.catalogIndex.innerHTML = items
        .map(
          (p) => `
          <li class="row">
            <button type="button" class="row-btn" data-open-product="${esc(p.id)}" data-preview-id="${esc(p.id)}">
              <span class="code">${esc(p.code)}</span>
              <span class="t">${esc(p.title)}</span>
              <span class="x small">${esc(p.category)}</span>
              <span class="p">${esc(formatPrice(p))}</span>
              <span class="r small">${ICONS.ne}</span>
            </button>
          </li>`
        )
        .join("");
    }
  }

  /* ---------- Product Detail Modal ---------- */
  function openModal(productId, updateHash = true) {
    const p = S.products.find((item) => item.id === productId);
    if (!p) return;

    state.activeModalId = productId;
    const tone = `tone-${p.tone ?? 0}`;
    const oldPrice = formatPrice(p, p.originalPrice);
    const allImages = [p.cover, ...(p.gallery || [])].filter(Boolean);

    el.modalCode.textContent = `${p.code} · ${p.category}`;
    el.modalBody.innerHTML = `
      <div class="modal-left">
        <div class="modal-visual ${tone}" id="modalVisual">
          ${renderVisual(p, allImages[0])}
        </div>
        ${
          allImages.length > 1
            ? `<div class="modal-thumbs">
                ${allImages
                  .map(
                    (src, idx) => `
                  <button type="button" class="modal-thumb${idx === 0 ? " is-active" : ""}" data-modal-img="${esc(src)}" aria-label="Preview ${idx + 1}">
                    <img src="${esc(src)}" alt="">
                  </button>`
                  )
                  .join("")}
              </div>`
            : ""
        }
        ${
          p.specs?.length
            ? `<ul class="modal-specs">
                ${p.specs
                  .map(([k, v]) => `<li><span class="small muted">${esc(k)}</span><span>${esc(v)}</span></li>`)
                  .join("")}
              </ul>`
            : ""
        }
      </div>

      <div class="modal-right">
        <div class="modal-cat-row small">
          <span class="muted">${esc(p.category)} · ${esc(p.year || "")}</span>
          ${p.badge ? `<span class="modal-badge">${esc(p.badge)}</span>` : ""}
        </div>
        <h2 class="modal-title" id="modalTitle">${esc(p.title)}</h2>
        <div class="modal-price-row">
          <span class="modal-price">${esc(formatPrice(p))}</span>
          ${oldPrice ? `<span class="price-old">${esc(oldPrice)}</span>` : ""}
        </div>
        <p class="modal-desc">${esc(p.description || p.summary)}</p>
        ${
          p.features?.length
            ? `<p class="modal-features-label small muted">What you get</p>
               <ul class="modal-features">
                 ${p.features
                   .map((f) => `<li><span class="plus-mark" aria-hidden="true">+</span><span>${esc(f)}</span></li>`)
                   .join("")}
               </ul>`
            : ""
        }
        <div class="modal-cta-row">
          <a class="pill-btn pill-btn--solid small" href="${esc(p.buyUrl)}" target="_blank" rel="noopener">
            <span>${esc(p.buyLabel || "Buy on Gumroad")}</span>
            ${ICONS.ne}
          </a>
          <button type="button" class="pill-btn small" id="copyProductLinkBtn">
            ${ICONS.copy}
            <span>Copy Link</span>
          </button>
        </div>
      </div>`;

    el.modal.hidden = false;
    el.modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    hideFloatPreview();

    if (updateHash && history.replaceState) {
      history.replaceState(null, "", `#${encodeURIComponent(productId)}`);
    }

    // Bind gallery thumb clicks & copy button
    el.modalBody.querySelectorAll("[data-modal-img]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-modal-img");
        const vis = document.getElementById("modalVisual");
        if (vis) vis.innerHTML = `<img src="${esc(src)}" alt="${esc(p.title)}">`;
        el.modalBody.querySelectorAll(".modal-thumb").forEach((t) => t.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });

    const copyBtn = document.getElementById("copyProductLinkBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const url = `${location.origin}${location.pathname}#${encodeURIComponent(p.id)}`;
        try {
          await navigator.clipboard.writeText(url);
          copyBtn.innerHTML = `${ICONS.check}<span>Copied</span>`;
        } catch {
          copyBtn.innerHTML = `${ICONS.check}<span>Link ready</span>`;
        }
        setTimeout(() => {
          copyBtn.innerHTML = `${ICONS.copy}<span>Copy Link</span>`;
        }, 1800);
      });
    }
  }

  function closeModal() {
    if (!state.activeModalId) return;
    state.activeModalId = null;
    el.modal.hidden = true;
    el.modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (location.hash && history.replaceState) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function stepModal(dir) {
    const list = getFilteredProducts();
    if (!list.length) return;
    const idx = list.findIndex((p) => p.id === state.activeModalId);
    const nextIdx = (idx + dir + list.length) % list.length;
    openModal(list[nextIdx].id);
  }

  /* ---------- Overlay Menu ---------- */
  let menuOpen = false;
  function toggleMenu(open = !menuOpen) {
    menuOpen = open;
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("is-locked", open || !!state.activeModalId);
    el.menuToggle.setAttribute("aria-expanded", String(open));
    el.menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    el.menu.setAttribute("aria-hidden", String(!open));
  }

  /* ---------- Floating Hover Preview (Index View) ---------- */
  function hideFloatPreview() {
    el.floatPreview.classList.remove("is-visible");
  }

  function initFloatPreview() {
    if (!matchMedia("(hover: hover)").matches) return;
    el.catalogIndex.addEventListener("mouseover", (e) => {
      const btn = e.target.closest("[data-preview-id]");
      if (!btn) return;
      const p = S.products.find((x) => x.id === btn.dataset.previewId);
      if (!p) return;
      el.floatPreview.className = `float-preview is-visible tone-${p.tone ?? 0}`;
      el.floatPreview.innerHTML = renderVisual(p);
    });
    el.catalogIndex.addEventListener("mousemove", (e) => {
      el.floatPreview.style.left = `${Math.min(window.innerWidth - 190, e.clientX + 180)}px`;
      el.floatPreview.style.top = `${e.clientY}px`;
    });
    el.catalogIndex.addEventListener("mouseleave", hideFloatPreview);
  }

  /* ---------- Custom Difference Cursor Dot (matching imamnur.my.id) ---------- */
  function initCursor() {
    if (matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    const dot = document.createElement("span");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    const HOT = "a, button, input, select, .card-media, [role=button]";
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0;

    const loop = () => {
      x += (tx - x) * 0.32;
      y += (ty - y) * 0.32;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    window.addEventListener(
      "mousemove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!dot.classList.contains("visible")) {
          x = tx;
          y = ty;
          dot.classList.add("visible");
        }
        if (!raf) raf = requestAnimationFrame(loop);
      },
      { passive: true }
    );
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest?.(HOT)) dot.classList.add("hovered");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest?.(HOT) && !e.relatedTarget?.closest?.(HOT)) dot.classList.remove("hovered");
    });
    document.addEventListener("mousedown", () => dot.classList.add("pressed"));
    document.addEventListener("mouseup", () => dot.classList.remove("pressed"));
    document.documentElement.addEventListener("mouseleave", () => dot.classList.remove("visible"));
  }

  /* ---------- Event Wiring ---------- */
  function bindEvents() {
    // Menu toggle & anchor close
    el.menuToggle.addEventListener("click", () => toggleMenu());
    el.menu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link && !link.target) toggleMenu(false);
    });

    // Category filter
    el.categoryPills.addEventListener("click", (e) => {
      const pill = e.target.closest(".cat-pill");
      if (!pill) return;
      state.category = pill.dataset.cat;
      renderCategories();
      renderCatalog();
    });

    // Search
    el.searchInput.addEventListener("input", () => {
      state.query = el.searchInput.value;
      el.searchClear.hidden = !state.query;
      renderCatalog();
    });
    el.searchClear.addEventListener("click", () => {
      state.query = "";
      el.searchInput.value = "";
      el.searchClear.hidden = true;
      el.searchInput.focus();
      renderCatalog();
    });

    // Sort
    el.sortSelect.addEventListener("change", () => {
      state.sort = el.sortSelect.value;
      renderCatalog();
    });

    // View toggle
    el.viewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.view = btn.dataset.view;
        el.viewBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        renderCatalog();
      });
    });

    // Reset filters
    el.resetFiltersBtn.addEventListener("click", () => {
      state.category = "All";
      state.query = "";
      state.sort = "featured";
      el.searchInput.value = "";
      el.searchClear.hidden = true;
      el.sortSelect.value = "featured";
      renderCategories();
      renderCatalog();
    });

    // Open product detail modal (click & Enter/Space on card-media)
    const handleOpen = (e) => {
      const trigger = e.target.closest("[data-open-product]");
      if (!trigger) return;
      openModal(trigger.dataset.openProduct);
    };
    el.catalogGrid.addEventListener("click", handleOpen);
    el.catalogIndex.addEventListener("click", handleOpen);
    el.catalogGrid.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-open-product]")) {
        e.preventDefault();
        openModal(e.target.dataset.openProduct);
      }
    });

    // Modal close & prev/next
    el.modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close-modal]")) closeModal();
    });
    el.modalPrev.addEventListener("click", () => stepModal(-1));
    el.modalNext.addEventListener("click", () => stepModal(1));

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (state.activeModalId) closeModal();
        else if (menuOpen) toggleMenu(false);
      } else if (state.activeModalId && e.key === "ArrowLeft") {
        stepModal(-1);
      } else if (state.activeModalId && e.key === "ArrowRight") {
        stepModal(1);
      }
    });

    // Hide topbar when footer reaches top of viewport (matching imamnur.my.id)
    const checkFooter = () => {
      document.body.classList.toggle("foot-in-view", el.siteFoot.getBoundingClientRect().top < 90);
    };
    window.addEventListener("scroll", checkFooter, { passive: true });
    window.addEventListener("resize", checkFooter);
    checkFooter();
  }

  /* ---------- Init ---------- */
  hydrateShell();
  renderCategories();
  renderCatalog();
  bindEvents();
  initFloatPreview();
  initCursor();

  // Deep-link support: open modal if URL hash matches a product id
  if (location.hash) {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (S.products.some((p) => p.id === slug)) {
      openModal(slug, false);
    }
  }
})();
