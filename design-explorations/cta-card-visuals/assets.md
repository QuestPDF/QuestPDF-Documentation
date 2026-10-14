# Lab assets: how each file was produced

All files in `docs/public/homepage/lab-cta/` were cut with PIL from renders already in the repo. No new QuestPDF render was needed for the lab; the production plan in `proposals.md` re-renders the same regions at 3× (a test render with the QuestPDF NuGet package on .NET 10 works on this machine: `GenerateImages` with `RasterDpi = 216`).

## Invoice crops (from `docs/public/homepage/getting-started/invoice1.webp`, 1190×1684, 2.0 px/pt)

| File | Box (x0, y0, x1, y1) | Size | Used by |
|---|---|---|---|
| `invoice-head.webp` | 70, 70, 700, 560 | 630×490, 19KB | A, B, C, D, E (video) |
| `invoice-head-wide.webp` | 70, 70, 1130, 560 | 1060×490, 30KB | unused (kept for a wider-column variant) |
| `invoice-top.webp` | 70, 70, 1130, 900 | 1060×830, 54KB | unused |
| `invoice-table.webp` | 70, 520, 1130, 900 | 1060×380, 24KB | unused |
| `invoice-full.webp` | whole page | 87KB | unused |
| `invoice2-top.webp` | 70, 70, 1130, 760 of `invoice2.webp` | 1060×690 | unused |

## Element tiles (from `docs/public/homepage/sample-gallery/page-NN.webp`, 640×906; boxes in that space; each saved at 2× via Lanczos upscale)

| File | Page | Box | Element |
|---|---|---|---|
| `tile-qr` | 22 | 22, 142, 108, 222 | QR code with the pay-by-QR text cut away |
| `tile-qr-pay` | 22 | 22, 142, 330, 222 | QR code with "Pay online in under a minute" |
| `tile-barcode` | 22 | 22, 468, 215, 552 | tracking barcode |
| `tile-price-tag` | 22 | 22, 606, 232, 682 | price tag with UPC-A |
| `tile-stamp-paid` | 30 | 55, 268, 205, 348 | PAID rubber stamp |
| `tile-stamp-approved` | 30 | 220, 262, 380, 350 | APPROVED stamp |
| `tile-seal-iso` | 30 | 38, 408, 152, 515 | ISO 9001 seal |
| `tile-seal-pass` | 30 | 165, 408, 282, 515 | INSPECTED / PASS seal |
| `tile-map` | 23 | 300, 142, 612, 340 | map with pin and water |
| `tile-map-wide` | 23 | 25, 142, 615, 340 | map with the address card |
| `tile-donut` | 21 | 40, 462, 440, 600 | donut chart with legend |
| `tile-donut-sq` | 21 | 40, 462, 180, 600 | donut chart only |
| `tile-hbars` | 21 | 25, 318, 475, 420 | horizontal bars |
| `tile-linechart` | 21 | 25, 655, 440, 790 | line chart |
| `tile-rangebars` | 21 | 25, 146, 615, 250 | range bars |
| `tile-heatmap` | 20 | 280, 325, 615, 440 | heat-map cells |
| `tile-sparklines` | 20 | 260, 700, 615, 790 | sparklines |
| `tile-avatar` | 25 | 25, 138, 180, 270 | one round portrait |
| `tile-avatars` | 25 | 25, 138, 615, 270 | four portraits |
| `tile-product` | 25 | 25, 325, 180, 490 | one product card |
| `tile-products` | 25 | 25, 325, 330, 490 | two product cards |
| `tile-house` | 26 | 25, 148, 330, 375 | house photo with price overlay |
| `tile-metric-green` | 03 | 215, 280, 420, 335 | solid green metric tile |
| `tile-metrics` | 03 | 25, 280, 615, 335 | three solid metric tiles |
| `tile-balance` | 14 | 25, 780, 615, 842 | "Balance due" bar |
| `tile-table-dark` | 16 | 25, 470, 615, 600 | table with a dark header |
| `tile-signature` | 34 | 25, 350, 400, 465 | signature with the notary seal |
| `tile-notary` | 34 | 260, 345, 390, 470 | notary seal only |
| `tile-tracker` | 30 | 25, 142, 615, 205 | order tracker |
| `tile-danger` | 28 | 25, 620, 615, 705 | DANGER hazard statement |
| `tile-note` | 28 | 25, 146, 615, 215 | note with an accent edge |

Tiles used per pairing: A and D: qr, house, stamp-paid, donut-sq, seal-iso, avatar, map, notary, barcode. B: house, stamp-approved, qr, map, signature. C: donut, map, stamp-paid, qr-pay. E: house, qr, donut, stamp-paid. The rest are spare, for round two.

## Captures

Headless Playwright shell, `--virtual-time-budget=25000`, with a `force-{light,dark}-lab.html` helper in `docs/public/` (deleted afterwards; it sets `vitepress-theme-appearance` and replaces to `/cta-visuals-lab.html` plus the query string). Rest and hover states were captured with `?still=1` (every transition jumps to its end state), because headless virtual time stalls CSS transitions mid-way; the natural entrance was verified separately in headless (`lab-overview-*`) and in Chrome.
