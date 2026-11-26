import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {defineConfig, type DefaultTheme, HeadConfig} from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import {
    faCode, faFileLines, faImage, faLayerGroup, faLink, faPageBreak, faRocketLaunch, faRulerCombined, faSignsPost,
    faTableLayout, faText, faUniversalAccess
} from '@fortawesome/pro-light-svg-icons'
import imageSizePlugin from "./markdownit-imagesize-plugin.ts";
import type {ThemeConfig} from "./theme/themeConfig.ts";

const isProd = process.env.NODE_ENV === 'production';
const llmsTxtTemplate = readFileSync(new URL('./llms-txt-template.md', import.meta.url), 'utf-8').trimEnd();

function getPlausibleScript() : HeadConfig[] {
    if (!isProd)
        return [];

    return [
        ['script', { src: 'https://plausible.io/js/pa-PaMEMtNHk1CpgVNx3BvS3.js', crossorigin: 'anonymous', async: "" }],
        ['script', {}, `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`],
    ]
}


/* llms.txt lists documentation pages only; an external sidebar link (GitHub releases) has no markdown source */
function withoutExternalLinks(items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
    return items
        .filter(item => !item.link || !/^https?:\/\//.test(item.link))
        .map(item => item.items ? { ...item, items: withoutExternalLinks(item.items) } : item);
}

export default defineConfig<ThemeConfig>({
    lang: 'en-US',
    title: 'QuestPDF',
    description: 'Modern C# library for PDF document generation',
    base: '/',
    cleanUrls: false,

    vite: {
      resolve: {
          alias: [{
              find: /^.*\/VPSidebarItem\.vue$/,
              replacement: fileURLToPath(new URL('./theme/SidebarItem.vue', import.meta.url))
          }]
      },
      plugins: [llmstxt({
          sidebar: sidebar => Array.isArray(sidebar) ? withoutExternalLinks(sidebar) : sidebar,
          domain: 'https://www.questpdf.com',
          customLLMsTxtTemplate: llmsTxtTemplate,
          ignoreFiles: [
              'api-reference/tip-*.md',

              'license.md',
              'license/community.md',
              'license/guide.md',
              'license/professional-enterprise.md',
              'license/purchase-success.md',
              'privacy-policy.md',
              'security-policy.md',
              'terms-of-service.md',

              'pricing.md',
              'contact.md',
              'features-overview.md',
              'companion.md',
          ],
      })]
    },

    head: [
        ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png', sizes: '64x64' }],
        ...getPlausibleScript(),
        ['meta', { name: "title", content: "C# PDF Generation Library | QuestPDF for .NET" }],
        ['meta', { name: "description", content: "Generate and edit PDF documents in your C# applications using the QuestPDF library and its C# Fluent API. Build invoices, reports and data exports with ease." }],
        ['meta', { name: "keywords", content: "PDF, C#, csharp, dotnet, .NET, ASP.NET, PDF generation, open-source, nuget, html to pdf" }],
    ],

    themeConfig: {
        logo: {
            light: '/questpdf-logo-nav-light.webp',
            dark: '/questpdf-logo-nav-dark.webp',
            alt: 'QuestPDF'
        },
        siteTitle: false,
        search: {
            provider: 'algolia',
            options: {
                appId: '5E5298MYDN',
                apiKey: 'f5935a5a2217e1314f710853d01ac857',
                indexName: 'questpdf_documentation',
                maxResultsPerGroup: 10
            }
        },
        nav: [
            { text: 'Documentation', items: [{ component: 'NavDocumentationMenu' }], activeMatch:'^/(quick-start|invoice-tutorial|roadmap|acknowledgements|document-previewer|license/configuration|features-overview|companion|concepts/|api-reference/|examples/)' },
            { text: 'Pricing', link: '/pricing' },
            { text: 'GitHub', link: 'https://github.com/QuestPDF/QuestPDF', noIcon: true },
            { text: 'NuGet', link: 'https://www.nuget.org/packages/QuestPDF', noIcon: true },
            { text: 'Contact', link: '/contact' },
        ],
        docFooter: { prev: false, next: false },
        sidebar: [
            {
                text: 'Getting started',
                icon: faRocketLaunch,
                collapsed: true,
                items: [
                    { text: 'Quick start', link: '/quick-start' },
                    { text: 'Invoice tutorial', link: '/invoice-tutorial' },
                    { text: 'License configuration', link: '/license/configuration' },
                    { text: 'ASP.NET integration', link: '/examples/aspnet-integration' },
                    { text: 'Companion app', link: '/companion' },
                ]
            },
            {
                text: 'Project',
                icon: faSignsPost,
                collapsed: true,
                items: [
                    { text: 'Roadmap', link: '/roadmap' },
                    { text: 'Releases', link: 'https://github.com/QuestPDF/QuestPDF/releases' },
                    { text: 'Acknowledgements', link: '/acknowledgements' },
                ]
            },
            {
                text: 'PDF operations',
                icon: faLayerGroup,
                collapsed: true,
                items: [
                    { text: 'Overview', link: '/concepts/document-operations' },
                    { text: 'Loading documents', link: '/concepts/document-operations#loading-documents' },
                    { text: 'Page selection', link: '/concepts/document-operations#page-selection' },
                    { text: 'Linearization', link: '/concepts/document-operations#document-linearization' },
                    { text: 'Merging', link: '/concepts/document-operations#merging-documents' },
                    { text: 'Overlays and underlays', link: '/concepts/document-operations#overlays-and-underlays' },
                    { text: 'Encryption', link: '/concepts/document-operations#document-encryption' },
                    { text: 'Decryption', link: '/concepts/document-operations#document-decryption' },
                    { text: 'File attachments', link: '/concepts/document-operations#file-attachments' },
                    { text: 'XMP metadata', link: '/concepts/document-operations#xmp-metadata-extension' },
                    { text: 'Advanced examples', link: '/concepts/document-operations#advanced-examples' },
                    { text: 'ZUGFeRD / Factur-X', link: '/examples/zugferd' },
                ]
            },
            {
                text: 'Development',
                icon: faCode,
                collapsed: true,
                items: [
                    {
                        text: 'Code patterns',
                        items: [
                            { text: 'Execution order', link: '/concepts/code-patterns/execution-order' },
                            { text: 'Document structure', link: '/concepts/code-patterns/document-structure' },
                            { text: 'Local helpers', link: '/concepts/code-patterns/local-helpers' },
                            { text: 'Content styling', link: '/concepts/code-patterns/content-styling' },
                            { text: 'Extension methods', link: '/concepts/code-patterns/extension-methods' },
                        ]
                    },
                    {
                        text: 'Components',
                        items: [
                            { text: 'Components', link: '/concepts/code-patterns/components' },
                            { text: 'Dynamic components', link: '/concepts/code-patterns/dynamic-components' },
                            { text: 'Capture content position', link: '/concepts/code-patterns/capture-content-position' },
                        ]
                    },
                    {
                        text: 'Dynamic composition',
                        items: [
                            { text: 'Mixed content blocks', link: '/concepts/dynamic-composition/mixed-content-blocks' },
                            { text: 'Conditional formatting', link: '/concepts/dynamic-composition/conditional-formatting' },
                            { text: 'Configurable tables', link: '/concepts/dynamic-composition/configurable-tables' },
                            { text: 'Nested content', link: '/concepts/dynamic-composition/nested-content' },
                        ]
                    },
                    {
                        text: 'Prototyping',
                        items: [
                            { text: 'Placeholder content', link: '/concepts/prototyping' },
                            { text: 'Placeholder element', link: '/api-reference/placeholder' },
                        ]
                    },
                    {
                        text: 'Debugging',
                        items: [
                            { text: 'Debug area', link: '/api-reference/debug-area' },
                            { text: 'Debug pointer', link: '/api-reference/debug-pointer' },
                        ]
                    },
                ]
            },
            {
                text: 'Generation',
                icon: faFileLines,
                collapsed: true,
                items: [
                    { text: 'Output formats', link: '/concepts/generating-output' },
                    { text: 'Settings', link: '/concepts/document-settings' },
                    { text: 'Metadata', link: '/concepts/document-metadata' },
                    { text: 'Content direction (RTL)', link: '/api-reference/content-direction' },
                    { text: 'Merging documents', link: '/concepts/merging-documents' },
                    { text: 'Large documents (Lazy)', link: '/api-reference/lazy' },
                ]
            },
            {
                text: 'Layout',
                icon: faTableLayout,
                collapsed: true,
                items: [
                    {
                        text: 'Page',
                        items: [
                            { text: 'Basics', link: '/api-reference/page/basics' },
                            { text: 'Header and footer', link: '/api-reference/page/slots' },
                            { text: 'Settings', link: '/api-reference/page/settings' },
                            { text: 'First-page header', link: '/examples/custom-header-on-first-page' },
                        ]
                    },
                    {
                        text: 'Table',
                        items: [
                            { text: 'Basics', link: '/api-reference/table/basics' },
                            { text: 'Cell style pattern', link: '/api-reference/table/cell-style-pattern' },
                            { text: 'Header and footer', link: '/api-reference/table/header-and-footer' },
                            { text: 'Overlapping cells', link: '/api-reference/table/overlapping-cells' },
                        ]
                    },
                    {
                        text: 'Containers',
                        items: [
                            { text: 'Column', link: '/api-reference/column' },
                            { text: 'Row', link: '/api-reference/row' },
                            { text: 'Inlined', link: '/api-reference/inlined' },
                            { text: 'Multi-column', link: '/api-reference/multi-column' },
                            { text: 'Lists', link: '/api-reference/lists' },
                            { text: 'Decoration', link: '/api-reference/decoration' },
                            { text: 'Layers', link: '/api-reference/layers' },
                            { text: 'Z-index', link: '/api-reference/zindex' },
                        ]
                    },
                ]
            },
            {
                text: 'Size & position',
                icon: faRulerCombined,
                collapsed: true,
                items: [
                    {
                        text: 'Size',
                        items: [
                            { text: 'Width', link: '/api-reference/width' },
                            { text: 'Height', link: '/api-reference/height' },
                            { text: 'Aspect ratio', link: '/api-reference/aspect-ratio' },
                            { text: 'Extend', link: '/api-reference/extend' },
                            { text: 'Shrink', link: '/api-reference/shrink' },
                            { text: 'Unconstrained', link: '/api-reference/unconstrained' },
                            { text: 'Length units', link: '/concepts/length-unit-types' },
                        ]
                    },
                    {
                        text: 'Position',
                        items: [
                            { text: 'Padding', link: '/api-reference/padding' },
                            { text: 'Alignment', link: '/api-reference/alignment' },
                            { text: 'Offset', link: '/api-reference/offset' },
                        ]
                    },
                    {
                        text: 'Transformations',
                        items: [
                            { text: 'Rotate', link: '/api-reference/rotate' },
                            { text: 'Scale', link: '/api-reference/scale' },
                            { text: 'Scale to fit', link: '/api-reference/scale-to-fit' },
                            { text: 'Flip', link: '/api-reference/flip' },
                        ]
                    },
                ]
            },
            {
                text: 'Content flow',
                icon: faPageBreak,
                collapsed: true,
                items: [
                    {
                        text: 'Page breaks',
                        items: [
                            { text: 'Page break', link: '/api-reference/page-break' },
                            { text: 'Prevent page break', link: '/api-reference/prevent-page-break' },
                            { text: 'Ensure space', link: '/api-reference/ensure-space' },
                            { text: 'Show entire', link: '/api-reference/show-entire' },
                            { text: 'Stop paging', link: '/api-reference/stop-paging' },
                        ]
                    },
                    {
                        text: 'Visibility',
                        items: [
                            { text: 'Repeat', link: '/api-reference/repeat' },
                            { text: 'Show once', link: '/api-reference/show-once' },
                            { text: 'Skip once', link: '/api-reference/skip-once' },
                            { text: 'Show if', link: '/api-reference/show-if' },
                        ]
                    },
                ]
            },
            {
                text: 'Text',
                icon: faText,
                collapsed: true,
                items: [
                    {
                        text: 'Content',
                        items: [
                            { text: 'Basics', link: '/api-reference/text/basics' },
                            { text: 'Page numbers', link: '/api-reference/text/page-numbers' },
                            { text: 'Elements inside text', link: '/api-reference/text/injecting-custom-content' },
                        ]
                    },
                    {
                        text: 'Style',
                        items: [
                            { text: 'Text style', link: '/api-reference/text/text-style' },
                            { text: 'Paragraph style', link: '/api-reference/text/paragraph-style' },
                            { text: 'Style inheritance', link: '/api-reference/text/style-inheritance' },
                            { text: 'Default text style', link: '/api-reference/default-text-style' },
                        ]
                    },
                    { text: 'Font management', link: '/api-reference/text/font-management' },
                ]
            },
            {
                text: 'Visual',
                icon: faImage,
                collapsed: true,
                items: [
                    {
                        text: 'Styling',
                        items: [
                            { text: 'Background', link: '/api-reference/background' },
                            { text: 'Border', link: '/api-reference/border' },
                            { text: 'Rounded corners', link: '/api-reference/rounded-corners' },
                            { text: 'Shadow', link: '/api-reference/shadow' },
                            { text: 'Colors', link: '/concepts/colors' },
                        ]
                    },
                    {
                        text: 'Images',
                        items: [
                            { text: 'Basics', link: '/api-reference/image/basics' },
                            { text: 'SVG', link: '/api-reference/image/svg' },
                            { text: 'Optimization', link: '/api-reference/image/optimization' },
                            { text: 'Shared images', link: '/api-reference/image/shared' },
                            { text: 'Dynamic-size images', link: '/api-reference/image/dynamic' },
                        ]
                    },
                    {
                        text: 'Graphics',
                        items: [
                            { text: 'Line', link: '/api-reference/line' },
                            { text: 'Charts', link: '/api-reference/charts' },
                            { text: 'Barcodes, QR codes', link: '/api-reference/barcodes' },
                            { text: 'Maps', link: '/api-reference/maps' },
                            { text: 'Complex graphics', link: '/api-reference/complex-graphics' },
                            { text: 'SkiaSharp integration', link: '/api-reference/skiasharp-integration' },
                        ]
                    },
                ]
            },
            {
                text: 'Links',
                icon: faLink,
                collapsed: true,
                items: [
                    { text: 'Hyperlinks', link: '/api-reference/hyperlink' },
                    { text: 'Sections and links', link: '/api-reference/section' },
                ]
            },
            {
                text: 'Accessibility',
                icon: faUniversalAccess,
                collapsed: true,
                items: [
                    { text: 'Overview', link: '/concepts/accessibility' },
                    { text: 'Tagged PDF', link: '/concepts/accessibility#tagged-pdf' },
                    { text: 'PDF/A (archival)', link: '/concepts/accessibility#pdf-a-archival' },
                    { text: 'PDF/UA (accessibility)', link: '/concepts/accessibility#pdf-ua-universal-accessibility' },
                    { text: 'Compliance tools', link: '/concepts/accessibility#compliance-tools' },
                    { text: 'Minimal example', link: '/concepts/accessibility#minimal-example' },
                    {
                        text: 'Semantic elements',
                        link: '/concepts/accessibility#semantic-elements',
                        items: [
                            { text: 'Document structure', link: '/concepts/accessibility#document-structure' },
                            { text: 'Headings', link: '/concepts/accessibility#headings' },
                            { text: 'Text content', link: '/concepts/accessibility#text-content' },
                            { text: 'Lists', link: '/concepts/accessibility#lists' },
                            { text: 'Tables', link: '/concepts/accessibility#tables' },
                            { text: 'Table of contents', link: '/concepts/accessibility#table-of-contents' },
                            { text: 'Inline elements', link: '/concepts/accessibility#inline-elements' },
                            { text: 'Illustrations, media', link: '/concepts/accessibility#illustrations-and-media' },
                            { text: 'Language', link: '/concepts/accessibility#language' },
                            { text: 'Ignoring content', link: '/concepts/accessibility#ignoring-content' },
                        ]
                    },
                ]
            }
        ]
    },

    markdown: {
        theme: {
            light: 'light-plus',
            dark: 'dark-plus'
        },
        config: (md) => {
            md.use(imageSizePlugin)
        }
    },

    sitemap: {
        hostname: 'https://www.questpdf.com',
        lastmodDateOnly: true
    }
});

