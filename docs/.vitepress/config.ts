import { defineConfig } from 'vitepress'
import imsize_plugin from 'markdown-it-imsize';

export default defineConfig({
    lang: 'en-US',
    title: 'QuestPDF',
    description: 'Modern .NET library for PDF document generation',
    base: '/',
    cleanUrls: false,

    head: [
        ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg' }],
        ['meta', { name: "title", content: "C# PDF Generation Library | QuestPDF for .NET" }],
        ['meta', { name: "description", content: "Generate and edit PDF documents in your .NET applications using the QuestPDF library and its C# Fluent API. Build invoices, reports and data exports with ease." }],
        ['meta', { name: "keywords", content: "PDF, C#, csharp, dotnet, .NET, aspnet, ASP.NET, QuestPDF, open-source, foss, nuget, nuget package, C# PDF library, .NET PDF generation, ASP.NET PDF generation, PDF report generator, reporting tool for .NET, hot reload, Companion App, export to PDF, generate PDF in C#, create PDF from HTML, html to pdf, html2pdf, dynamic PDF generation, open-source PDF toolkit, PDF rendering library .NET, c# high-performance PDF generation, c# commercial PDF library, free PDF generator for .NET" }],
    ],

    themeConfig: {
        logo: '/logo.svg',
        search: {
            provider: 'local',
            options: {
                detailedView: true
            }
        },
        nav: [
            {
                text: 'Documentation',
                items: [
                    {
                      items: [
                          { text: 'Quick start', link: '/quick-start' },
                          { text: 'Getting started', link: '/getting-started' },
                          { text: 'API reference', link: '/api-reference/index' },
                          { text: 'Design patterns', link: '/design-patterns' },
                      ]
                    },
                    {
                        items: [
                            { text: 'Document operations <div class="VPBadge tip" style="margin-left: 8px;">new</div>', link: '/concepts/document-operations' },
                            { text: 'Companion App <div class="VPBadge tip" style="margin-left: 8px;">new</div>', link: '/companion/usage' },
                        ]
                    }
                ]
            },
            { text: 'Pricing', link: '/license/' },
            {
                text: 'License',
                items: [
                    {
                        items: [
                            { text: 'License Selection Guide', link: '/license/guide' },
                            { text: 'Community MIT', link: '/license/community' },
                            { text: 'Professional and Enterprise', link: '/license/professional-enterprise' }
                        ]
                    },
                    {
                        items: [
                            { text: 'Terms of Service', link: '/terms-of-service' },
                            { text: 'Privacy Policy', link: '/privacy-policy' }
                        ]
                    },
                ]
            },
            { text: 'GitHub', link: 'https://github.com/QuestPDF/QuestPDF', noIcon: true },
            { text: 'NuGet', link: 'https://www.nuget.org/packages/QuestPDF', noIcon: true },
            { text: 'Contact', link: '/contact' },
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Quick start', link: '/quick-start' },
                    { text: 'Getting started', link: '/getting-started' },
                    { text: 'License configuration', link: '/license/configuration' },
                    { text: 'Roadmap', link: 'https://github.com/orgs/QuestPDF/projects/8' },
                    { text: 'Releases', link: 'https://github.com/QuestPDF/QuestPDF/releases' },
                    { text: 'Acknowledgements', link: '/acknowledgements' }
                ]
            },
            {
                text: 'Companion App <div class="VPBadge tip" style="margin-left: 8px;">new</div>',
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
                            { text: 'Global settings', link: '/concepts/global-settings' },
                            { text: 'Document metadata', link: '/concepts/document-metadata' },
                            { text: 'Document settings', link: '/concepts/document-settings' },
                            { text: 'Merged documents', link: '/concepts/merging-documents' },
                            { text: 'Common exceptions', link: '/concepts/common-exceptions' },
                        ]
                    },
                    { text: 'Document operations', link: '/concepts/document-operations' },
                    { text: 'Prototyping', link: '/concepts/prototyping' },
                    { text: 'Colors', link: '/concepts/colors' },
                    { text: 'Length unit types', link: '/concepts/length-unit-types' },
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
                    }
                ]
            },
            {
                text: 'Visual content',
                items: [
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
                    { text: 'Background', link: '/api-reference/background' },
                    { text: 'Border', link: '/api-reference/border' },
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
                    { text: 'Translate', link: '/api-reference/translate' },
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
                    { text: 'ZUGFeRD <div class="VPBadge tip" style="margin-left: 8px;">new</div>', link: '/examples/zugferd' },
                ]
            }
        ],
        footer: {
            message: 'Released under the MIT License',
            copyright: 'Copyright © 2020-present Marcin Ziąbek CodeFlint'
        }
    },

    markdown: {
        theme: {
            light: 'light-plus',
            dark: 'dark-plus'
        },
        config: (md) => {
            md.use(imsize_plugin)
        }
    },

    sitemap: {
        hostname: 'https://www.questpdf.com',
        lastmodDateOnly: true
    }
});

