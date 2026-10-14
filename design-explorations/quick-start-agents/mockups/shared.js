/* Shared mockup plumbing: the one code sample, its diff, the rendered invoice, the install chip, the
   four reasons and the state/theme toolbar. No build step; every mockup opens from the file system.
   Query parameters: ?state=rest|mid|done and ?theme=dark|light (the toolbar changes both live). */

(function () {
  const icons = {
    copy: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5V3.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2"/></svg>',
    check: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>',
    checkCircle: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><path d="M5 8.3l2 2 4-4.3"/></svg>',
    circle: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.5"/></svg>',
    spinner: '<svg class="icon spin" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M8 1.5a6.5 6.5 0 1 1-6.5 6.5"/></svg>',
    play: '<svg class="icon" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5z"/></svg>',
    replay: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9"/><path d="M2.5 2.5v3h3"/></svg>',
    branch: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="4" cy="3" r="1.5"/><circle cx="4" cy="13" r="1.5"/><circle cx="12" cy="5" r="1.5"/><path d="M4 4.5v7M12 6.5c0 3-8 2-8 5"/></svg>',
    code: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4L1.5 8 5 12M11 4l3.5 4L11 12M9.5 2.5l-3 11"/></svg>',
    cubes: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8 1.5l3.5 2v4L8 9.5 4.5 7.5v-4z"/><path d="M4.5 7.5L1 9.5v4L4.5 15.5 8 13.5v-4M11.5 7.5L15 9.5v4l-3.5 2L8 13.5"/></svg>',
    terminal: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2"/><path d="M4.5 6l2.5 2-2.5 2M8.5 10.5h3"/></svg>',
    person: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M2.5 14.5c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5"/></svg>',
    doc: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 1.5h5l3.5 3.5v9.5h-8.5z"/><path d="M9 1.5V5h3.5M6 8.5h4M6 11h4"/></svg>',
    arrowRight: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    chat: '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M2 3.5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 14 3.5v6a1.5 1.5 0 0 1-1.5 1.5H7l-3.5 3v-3H3.5A1.5 1.5 0 0 1 2 9.5z"/></svg>'
  };

  /* The sample: ComposeTable from the invoice tutorial, trimmed. Tokens follow shiki's dark-plus /
     light-plus classes: k keyword, t type, m method, s string, n number, v variable, c comment. */
  const L = (html) => html;
  const base = [
    L('<span class="k">void</span> <span class="m">ComposeTable</span>(<span class="t">IContainer</span> <span class="v">container</span>)'),
    L('{'),
    L('    <span class="v">container</span>.<span class="m">Table</span>(<span class="v">table</span> =&gt;'),
    L('    {'),
    L('        <span class="v">table</span>.<span class="m">ColumnsDefinition</span>(<span class="v">columns</span> =&gt;'),
    L('        {'),
    L('            <span class="v">columns</span>.<span class="m">RelativeColumn</span>(<span class="n">3</span>);'),
    L('            <span class="v">columns</span>.<span class="m">RelativeColumn</span>();'),
    L('            <span class="v">columns</span>.<span class="m">RelativeColumn</span>();'),
    L('        });'),
    L(''),
    L('        <span class="v">table</span>.<span class="m">Header</span>(<span class="v">header</span> =&gt;'),
    L('        {'),
    L('            <span class="v">header</span>.<span class="m">Cell</span>().<span class="m">Text</span>(<span class="s">"Product"</span>).<span class="m">SemiBold</span>();'),
    L('            <span class="v">header</span>.<span class="m">Cell</span>().<span class="m">AlignRight</span>().<span class="m">Text</span>(<span class="s">"Quantity"</span>).<span class="m">SemiBold</span>();'),
    L('            <span class="v">header</span>.<span class="m">Cell</span>().<span class="m">AlignRight</span>().<span class="m">Text</span>(<span class="s">"Total"</span>).<span class="m">SemiBold</span>();'),
    L('        });'),
    L(''),
    L('        <span class="k">foreach</span> (<span class="k">var</span> <span class="v">item</span> <span class="k">in</span> <span class="v">Model</span>.<span class="v">Items</span>)'),
    L('        {'),
    L('            <span class="v">table</span>.<span class="m">Cell</span>().<span class="m">Text</span>(<span class="v">item</span>.<span class="v">Name</span>);'),
    L('            <span class="v">table</span>.<span class="m">Cell</span>().<span class="m">AlignRight</span>().<span class="m">Text</span>(<span class="v">item</span>.<span class="v">Quantity</span>);'),
    L('            <span class="v">table</span>.<span class="m">Cell</span>().<span class="m">AlignRight</span>().<span class="m">Text</span>(<span class="s">$"{</span><span class="v">item</span>.<span class="v">Total</span><span class="s">:C}"</span>);'),
    L('        }'),
    L('    });'),
    L('}')
  ];

  const removedIndex = 22; /* the Total cell line */
  const added = [
    L('            <span class="v">table</span>.<span class="m">Cell</span>().<span class="m">AlignRight</span>().<span class="m">Text</span>(<span class="s">$"{</span><span class="v">item</span>.<span class="v">Total</span><span class="s">:C}"</span>)'),
    L('                .<span class="m">FontColor</span>(<span class="v">item</span>.<span class="v">Total</span> &lt; <span class="n">0</span> ? <span class="t">Colors</span>.<span class="v">Red</span>.<span class="v">Medium</span> : <span class="t">Colors</span>.<span class="v">Black</span>);')
  ];

  /* mode: plain (resting), diff (removed red + added green), accepted (added lines kept, highlighted blue), merged (plain with the new lines) */
  function renderCode(mode) {
    const lines = [];
    base.forEach((html, i) => {
      if (i === removedIndex) {
        if (mode === 'plain') lines.push(line(html));
        if (mode === 'diff') { lines.push(line(html, 'removed')); added.forEach(a => lines.push(line(a, 'added'))); }
        if (mode === 'accepted') added.forEach(a => lines.push(line(a, 'highlighted')));
        if (mode === 'merged') added.forEach(a => lines.push(line(a)));
        return;
      }
      lines.push(line(html));
    });
    return '<div class="code">' + lines.join('') + '</div>';
  }

  function line(html, cls) {
    return '<span class="line' + (cls ? ' ' + cls : '') + '">' + (html === '' ? ' ' : html) + '</span>';
  }

  function renderWindow(name, inner, meta, extraClass) {
    return '<div class="window' + (extraClass ? ' ' + extraClass : '') + '"><div class="window-head"><div class="dot"></div><div class="dot"></div><div class="dot"></div>' +
      '<span class="file-name">' + name + '</span>' + (meta ? '<span class="window-meta">' + meta + '</span>' : '') + '</div>' +
      '<div class="window-body">' + inner + '</div></div>';
  }

  const items = [
    ['Thermal printer, 80 mm', 2, 118.00],
    ['Receipt paper, 50 rolls', 1, 42.50],
    ['USB-C cable, 2 m', 3, 24.00],
    ['Returned: USB-C cable, 2 m', 1, -24.00],
    ['Barcode scanner', 1, 89.00],
    ['On-site setup, 1 h', 1, 60.00]
  ];

  function money(n) {
    const abs = Math.abs(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (n < 0 ? '-' : '') + '$' + abs;
  }

  function renderPage(after) {
    const total = items.reduce((s, it) => s + it[2], 0);
    const rows = items.map(it =>
      '<tr><td>' + it[0] + '</td><td class="r">' + it[1] + '</td><td class="r' + (it[2] < 0 ? ' neg' : '') + '">' + money(it[2]) + '</td></tr>'
    ).join('');
    return '<div class="page' + (after ? ' after' : '') + '" role="img" aria-label="Invoice page rendered by QuestPDF">' +
      '<div class="p-head"><div><div class="p-title">Invoice #5327</div><div class="p-meta">Issue date: 06.10.2026<br>Due date: 20.10.2026</div></div><div class="p-logo"></div></div>' +
      '<div class="p-addr"><div><strong>From</strong><div>Northwind Hardware<br>14 Harbour Street<br>Gdańsk, PL</div></div><div><strong>For</strong><div>Blue Ridge Café<br>22 Market Lane<br>Kraków, PL</div></div></div>' +
      '<table><thead><tr><th>Product</th><th class="r">Quantity</th><th class="r">Total</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<div class="p-total">Grand total: ' + money(total) + '</div>' +
      '<div class="p-foot">Page 1</div></div>';
  }

  function renderInstall() {
    return '<button type="button" class="install" title="Copy to clipboard"><span class="install-label">Install</span>' +
      '<code class="install-command"><span class="prompt">$</span> dotnet add package QuestPDF</code>' + icons.copy + '</button>';
  }

  /* the four reasons, rewritten so every sentence is checkable (see research.md §3) */
  const reasons = [
    { icon: 'code', title: 'Dynamic content is just code', text: 'Loops, conditions and functions build the document. Completion, inspections and refactoring in your IDE work on it.', short: 'Loops, conditions and functions, with full IDE support.' },
    { icon: 'branch', title: 'Reviewable in version control', text: 'A document change is a diff. It goes through the same pull request and history as the rest of your code.', short: 'A document change is a diff in a pull request.' },
    { icon: 'cubes', title: 'Reusable components', text: 'Headers, tables and address blocks become classes you share across documents and projects.', short: 'Headers and tables as classes, shared across projects.' },
    { icon: 'terminal', title: 'Works with your coding agent', text: 'Plain C# files, a typed API the compiler checks, layout errors that name the element at fault, docs published as llms.txt.', short: 'Typed API, descriptive layout errors, docs as llms.txt.' }
  ];

  function renderReasons(extra) {
    return '<div class="reasons' + (extra ? ' ' + extra : '') + '">' + reasons.map(r =>
      '<article class="reason"><div class="reason-icon">' + icons[r.icon] + '</div><div><h3 class="row-title">' + r.title + '</h3><p class="row-description">' + ((extra || '').includes('short') ? r.short : r.text) + '</p></div></article>'
    ).join('') + '</div>';
  }

  function mount() {
    /* windows first: their header meta may carry icons and buttons that the later passes fill in */
    document.querySelectorAll('[data-window]').forEach(el => {
      el.outerHTML = renderWindow(el.dataset.window, el.innerHTML, el.dataset.meta, el.className);
    });
    document.querySelectorAll('[data-code]').forEach(el => el.innerHTML = renderCode(el.dataset.code));
    document.querySelectorAll('[data-page]').forEach(el => el.innerHTML = renderPage(el.dataset.page === 'after'));
    document.querySelectorAll('[data-install]').forEach(el => el.innerHTML = renderInstall());
    document.querySelectorAll('[data-reasons]').forEach(el => el.innerHTML = renderReasons(el.dataset.reasons));
    document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icons[el.dataset.icon] || '');

    const params = new URLSearchParams(location.search);
    const root = document.querySelector('[data-demo]');
    const state = params.get('state') || root.dataset.state || 'rest';
    const theme = params.get('theme') || 'dark';
    setState(state);
    setTheme(theme);
    buildBar(state, theme);

    /* panel height, readable with --dump-dom for the height budget check */
    setTimeout(() => {
      const m = document.createElement('div');
      m.id = 'measure';
      m.hidden = true;
      m.textContent = 'panel-height=' + Math.round(root.getBoundingClientRect().height);
      document.body.appendChild(m);
    }, 300);
  }

  function setState(s) {
    document.querySelectorAll('[data-demo]').forEach(r => r.dataset.state = s);
    document.querySelectorAll('.mock-bar [data-set-state]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setState === s)));
    document.dispatchEvent(new CustomEvent('mockstate', { detail: s }));
  }

  function setTheme(t) {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(t);
    document.querySelectorAll('.mock-bar [data-set-theme]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setTheme === t)));
  }

  function buildBar(state, theme) {
    const bar = document.createElement('div');
    bar.className = 'mock-bar';
    bar.innerHTML = '<span>State</span>' +
      ['rest', 'mid', 'done'].map(s => '<button type="button" data-set-state="' + s + '" aria-pressed="' + (s === state) + '">' + ({ rest: 'Resting', mid: 'Mid-demo', done: 'Done' })[s] + '</button>').join('') +
      '<span>Theme</span>' +
      ['dark', 'light'].map(t => '<button type="button" data-set-theme="' + t + '" aria-pressed="' + (t === theme) + '">' + t + '</button>').join('');
    bar.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.setState) setState(b.dataset.setState);
      if (b.dataset.setTheme) setTheme(b.dataset.setTheme);
    });
    document.body.appendChild(bar);
  }

  window.QP = { icons, renderCode, renderPage, renderInstall, renderReasons, setState, reasons };
  document.addEventListener('DOMContentLoaded', mount);
})();
