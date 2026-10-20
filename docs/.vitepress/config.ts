import {defineConfig, HeadConfig} from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import imageSizePlugin from "./markdownit-imagesize-plugin";

const isProd = process.env.NODE_ENV === 'production';

const llmsTxtHeader = `# QuestPDF

> C# library for generating PDF documents with a fluent, code-first API.
> Layout engine with automatic paging: tables, headers and footers, page numbers, images, SVG, barcodes.

## About

- Install: \`dotnet add package QuestPDF\`. Select a license at application startup: \`QuestPDF.Settings.License = LicenseType.Community;\`
- License: free for individuals, non-profits, all FOSS projects, and organizations under $1M in annual revenue; otherwise Professional or Enterprise.
  Details: [Pricing](https://www.questpdf.com/pricing.html), [License Selection Guide](https://www.questpdf.com/license/guide.html), [Community License](https://www.questpdf.com/license/community.html), [Professional / Enterprise License](https://www.questpdf.com/license/professional-enterprise.html).
  Binding terms: [LICENSE.md](https://github.com/QuestPDF/QuestPDF/blob/main/LICENSE.md)
- What QuestPDF can do: [Features Overview](https://www.questpdf.com/features-overview.html)
- Policies: [Security](https://www.questpdf.com/security-policy.html), [Privacy](https://www.questpdf.com/privacy-policy.html), [Terms of Service](https://www.questpdf.com/terms-of-service.html)
- Start here: [Quick start](/quick-start.md), then [In-Depth Invoice Tutorial](/invoice-tutorial.md)
- Everything in one file: [llms-full.txt](/llms-full.txt)

## Table of Contents

{toc}`;

function getPlausibleScript() : HeadConfig[] {
    if (!isProd)
        return [];

    return [
        ['script', { src: 'https://plausible.io/js/pa-PaMEMtNHk1CpgVNx3BvS3.js', crossorigin: 'anonymous', async: "" }],
        ['script', {}, `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`],
    ]
}


export default defineConfig({
    lang: 'en-US',
    title: 'QuestPDF',
    description: 'Modern C# library for PDF document generation',
    base: '/',
    cleanUrls: false,

    vite: {
      plugins: [llmstxt({
          customLLMsTxtTemplate: llmsTxtHeader,
          ignoreFilesPerOutput: {
              llmsTxt: [
                  'api-reference/tip-*.md',
                  'license.md', 'license/community.md', 'license/guide.md', 'license/professional-enterprise.md', 'license/purchase-success.md',
                  'pricing.md', 'features-overview.md', 'contact.md', 'privacy-policy.md', 'security-policy.md', 'terms-of-service.md',
              ],
          },
      })]
    },

    head: [
        ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
        ['script', { src: 'https://kit.fontawesome.com/294da38298.js', crossorigin: 'anonymous', async: "" }],
        ...getPlausibleScript(),
        ['meta', { name: "title", content: "C# PDF Generation Library | QuestPDF for .NET" }],
        ['meta', { name: "description", content: "Generate and edit PDF documents in your C# applications using the QuestPDF library and its C# Fluent API. Build invoices, reports and data exports with ease." }],
        ['meta', { name: "keywords", content: "PDF, C#, csharp, dotnet, .NET, ASP.NET, PDF generation, open-source, nuget, html to pdf" }],
    ],

    themeConfig: {
        logo: '/logo.webp',
        search: {
            provider: 'algolia',
            options: {
                appId: '5E5298MYDN',
                apiKey: 'f5935a5a2217e1314f710853d01ac857',
                indexName: 'questpdf_documentation'
            }
        },
        nav: [
            { text: 'Documentation', link: '/quick-start' },
            { text: 'Features', link: '/features-overview' },
            { text: 'Pricing', link: '/pricing' },
            { text: 'GitHub', link: 'https://github.com/QuestPDF/QuestPDF', noIcon: true },
            { text: 'NuGet', link: 'https://www.nuget.org/packages/QuestPDF', noIcon: true },
            { text: 'Contact', link: '/contact' },
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Quick start', link: '/quick-start' },
                    { text: 'Invoice Tutorial', link: '/invoice-tutorial' },
                    { text: 'License configuration', link: '/license/configuration' },
                    { text: 'Roadmap', link: '/roadmap' },
                    { text: 'Releases', link: 'https://github.com/QuestPDF/QuestPDF/releases' },
                    { text: 'Acknowledgements', link: '/acknowledgements' }
                ]
            },
            {
                text: 'Companion App',
                items: [
                    { text: 'Introduction and Usage', link: '/companion/usage' },
                    { text: 'Download', link: '/companion/download' },
                    { text: 'Features', link: '/companion/features' },
                    { text: 'Warnings', link: '/companion/warnings' },
                    { text: 'Previewer (legacy)', link: '/document-previewer' },
                ]
            },
            {
                text: 'Important concepts',
                items: [
                    {
                        text: 'Generating content',
                        items: [
                            { text: 'Output types', link: '/concepts/generating-output' },
                            { text: 'Document metadata', link: '/concepts/document-metadata' },
                            { text: 'Document settings', link: '/concepts/document-settings' },
                            { text: 'Merged documents', link: '/concepts/merging-documents' },
                        ]
                    },
                    { text: 'Document operations', link: '/concepts/document-operations' },
                    { text: 'Prototyping', link: '/concepts/prototyping' },
                    { text: 'Colors', link: '/concepts/colors' },
                    { text: 'Length unit types', link: '/concepts/length-unit-types' },
                    { text: 'Accessibility <span class="VPBadge tip" style="margin-left: 8px;">new</span>', link: '/concepts/accessibility' },
                    {
                        text: 'Code patterns',
                        items: [
                            { text: 'Execution order', link: '/concepts/code-patterns/execution-order' },
                            { text: 'Document structure', link: '/concepts/code-patterns/document-structure' },
                            { text: 'Local helpers', link: '/concepts/code-patterns/local-helpers' },
                            { text: 'Content styling', link: '/concepts/code-patterns/content-styling' },
                            { text: 'Extension methods', link: '/concepts/code-patterns/extension-methods' },
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
                    }
                ]
            },
            {
                text: 'Visual content',
                items: [
                    {
                        text: 'Styled Container',
                        items: [
                            { text: 'Background', link: '/api-reference/background' },
                            { text: 'Border', link: '/api-reference/border' },
                            { text: 'Rounded Corners', link: '/api-reference/rounded-corners' },
                            { text: 'Shadows', link: '/api-reference/shadow' },
                        ]
                    },
                    {
                        text: 'Text',
                        items: [
                            { text: 'Basics', link: '/api-reference/text/basics' },
                            { text: 'Text Style', link: '/api-reference/text/text-style' },
                            { text: 'Paragraph Style', link: '/api-reference/text/paragraph-style' },
                            { text: 'Page Numbers', link: '/api-reference/text/page-numbers' },
                            { text: 'Injecting Custom Content', link: '/api-reference/text/injecting-custom-content' },
                            { text: 'Style inheritance', link: '/api-reference/text/style-inheritance' },
                            { text: 'Font management', link: '/api-reference/text/font-management' }
                        ]
                    },
                    {
                        text: 'Image',
                        items: [
                            { text: 'Basics', link: '/api-reference/image/basics' },
                            { text: 'Optimization', link: '/api-reference/image/optimization' },
                            { text: 'Shared Images', link: '/api-reference/image/shared' },
                            { text: 'SVG', link: '/api-reference/image/svg' },
                            { text: 'Images Of Dynamic Size', link: '/api-reference/image/dynamic' }
                        ]
                    },
                    { text: 'Line', link: '/api-reference/line' },
                    { text: 'Placeholder', link: '/api-reference/placeholder' },
                    { text: 'Charts', link: '/api-reference/charts' },
                    { text: 'Barcodes / QR Codes', link: '/api-reference/barcodes' },
                    { text: 'Maps', link: '/api-reference/maps' },
                    { text: 'Complex Graphics', link: '/api-reference/complex-graphics' },
                    { text: 'SkiaSharp Integration', link: '/api-reference/skiasharp-integration' },
                ]
            },
            {
                text: 'Layout elements',
                items: [
                    {
                        text: 'Page',
                        items: [
                            { text: 'Basics', link: '/api-reference/page/basics' },
                            { text: 'Slots', link: '/api-reference/page/slots' },
                            { text: 'Settings', link: '/api-reference/page/settings' }
                        ]
                    },
                    {
                        text: 'Table',
                        items: [
                            { text: 'Basics', link: '/api-reference/table/basics' },
                            { text: 'Cell style pattern', link: '/api-reference/table/cell-style-pattern' },
                            { text: 'Header and footer', link: '/api-reference/table/header-and-footer' },
                            { text: 'Overlapping cells', link: '/api-reference/table/overlapping-cells' }
                        ]
                    },
                    { text: 'Column', link: '/api-reference/column' },
                    { text: 'Row', link: '/api-reference/row' },
                    { text: 'Decoration', link: '/api-reference/decoration' },
                    { text: 'List', link: '/api-reference/lists' },
                    { text: 'Layers', link: '/api-reference/layers' },
                    { text: 'Inlined', link: '/api-reference/inlined' },
                    { text: 'Multi Column', link: '/api-reference/multi-column' },
                ]
            },
            {
                text: 'Positional elements',
                items: [
                    { text: 'Width', link: '/api-reference/width' },
                    { text: 'Height', link: '/api-reference/height' },
                    { text: 'Alignment', link: '/api-reference/alignment' },
                    { text: 'Padding', link: '/api-reference/padding' },
                    { text: 'Aspect Ratio', link: '/api-reference/aspect-ratio' },
                    { text: 'Rotate', link: '/api-reference/rotate' },
                    { text: 'Scale', link: '/api-reference/scale' },
                    { text: 'Scale to fit', link: '/api-reference/scale-to-fit' },
                    { text: 'Offset', link: '/api-reference/offset' },
                    { text: 'Flip', link: '/api-reference/flip' },
                    { text: 'Unconstrained', link: '/api-reference/unconstrained' },
                    { text: 'Extend', link: '/api-reference/extend' },
                    { text: 'Shrink', link: '/api-reference/shrink' },
                    { text: 'Z-Index', link: '/api-reference/zindex' },
                ]
            },
            {
                text: 'Content flow elements',
                items: [
                    { text: 'Page break', link: '/api-reference/page-break' },
                    { text: 'Prevent page break', link: '/api-reference/prevent-page-break' },
                    { text: 'Ensure space', link: '/api-reference/ensure-space' },
                    { text: 'Show entire', link: '/api-reference/show-entire' },
                    { text: 'Repeat', link: '/api-reference/repeat' },
                    { text: 'Show if', link: '/api-reference/show-if' },
                    { text: 'Show once', link: '/api-reference/show-once' },
                    { text: 'Skip once', link: '/api-reference/skip-once' },
                    { text: 'Stop paging', link: '/api-reference/stop-paging' },
                ]
            },
            {
                text: 'Other elements',
                items: [
                    { text: 'Section', link: '/api-reference/section' },
                    { text: 'Hyperlink', link: '/api-reference/hyperlink' },
                    { text: 'Lazy (Memory Optimization)', link: '/api-reference/lazy' },
                    { text: 'Default Text Style', link: '/api-reference/default-text-style' },
                    { text: 'Content Direction (RTL)', link: '/api-reference/content-direction' },
                    { text: 'Debug Area', link: '/api-reference/debug-area' },
                    { text: 'Debug Pointer', link: '/api-reference/debug-pointer' },
                ]
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Custom header on first page', link: '/examples/custom-header-on-first-page' },
                    { text: 'Integration with ASP.NET', link: '/examples/aspnet-integration' },
                    { text: 'ZUGFeRD', link: '/examples/zugferd' },
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

