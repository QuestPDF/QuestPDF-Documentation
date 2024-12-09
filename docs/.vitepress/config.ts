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
        ['meta', { name: "description", content: "Open-source modern .NET library for PDF document generation. Offering comprehensive layout engine powered by concise and discoverable C# Fluent API." }],
        ['meta', { name: "keywords", content: "pdf, library, c#, csharp, dotnet, .NET, report, export, generate, generation, tool, create, render, html, html2pdf, converter, open-source, free" }],
        ['script', { src: "https://cdn.paddle.com/paddle/paddle.js" }]
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
            { text: 'GitHub', link: 'https://github.com/QuestPDF/QuestPDF' },
            { text: 'NuGet', link: 'https://www.nuget.org/packages/QuestPDF' },
            { text: 'Contact', link: '/contact' },
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Introduction', link: '/introduction' },
                    { text: 'Quick start', link: '/quick-start' },
                    { text: 'Getting started', link: '/getting-started' },
                    { text: 'License configuration', link: '/license/configuration' },
                    { text: 'Releases', link: 'https://github.com/QuestPDF/QuestPDF/releases' },
                    { text: 'Roadmap', link: 'https://github.com/QuestPDF/QuestPDF/discussions/621' },
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
                text: 'Visual elements',
                items: [
                    { text: 'Text', link: '/api-reference/text' },
                    { text: 'Image', link: '/api-reference/image' },
                    { text: 'Background', link: '/api-reference/background' },
                    { text: 'Border', link: '/api-reference/border' },
                    { text: 'Line', link: '/api-reference/line' },
                    { text: 'Placeholder', link: '/api-reference/placeholder' },
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
                    { text: 'Extend', link: '/api-reference/extend' },
                    { text: 'Minimal box', link: '/api-reference/minimal-box' },
                    { text: 'Translate', link: '/api-reference/translate' },
                    { text: 'Rotate', link: '/api-reference/rotate' },
                    { text: 'Scale', link: '/api-reference/scale' },
                    { text: 'Scale to fit', link: '/api-reference/scale-to-fit' },
                    { text: 'Flip', link: '/api-reference/flip' },
                    { text: 'Unconstrained', link: '/api-reference/unconstrained' },
                ]
            },
            {
                text: 'Content flow elements',
                items: [
                    { text: 'Page break', link: '/api-reference/page-break' },
                    { text: 'Show if', link: '/api-reference/show-if' },
                    { text: 'Show once', link: '/api-reference/show-once' },
                    { text: 'Skip once', link: '/api-reference/skip-once' },
                    { text: 'Show entire', link: '/api-reference/show-entire' },
                    { text: 'Ensure space', link: '/api-reference/ensure-space' },
                    { text: 'Stop paging', link: '/api-reference/stop-paging' },
                ]
            },
            {
                text: 'Layout elements',
                items: [
                    { text: 'Page', link: '/api-reference/page' },
                    { text: 'Table', link: '/api-reference/table' },
                    { text: 'Column', link: '/api-reference/column' },
                    { text: 'Row', link: '/api-reference/row' },
                    { text: 'Grid', link: '/api-reference/grid' },
                    { text: 'Inlined', link: '/api-reference/inlined' },
                    { text: 'Decoration', link: '/api-reference/decoration' },
                    { text: 'Layers', link: '/api-reference/layers' },
                    { text: 'List', link: '/api-reference/lists' },
                    { text: 'Multi Column', link: '/api-reference/multi-column' },
                ]
            },
            {
                text: 'Other elements',
                items: [
                    { text: 'Section', link: '/api-reference/section' },
                    { text: 'Section Link', link: '/api-reference/section-link' },
                    { text: 'Hyperlink', link: '/api-reference/hyperlink' },
                    { text: 'Element', link: '/api-reference/element' },
                    { text: 'Default Text Style', link: '/api-reference/default-text-style' },
                    { text: 'Content Direction (RTL)', link: '/api-reference/content-direction' },
                    { text: 'Debug Area', link: '/api-reference/debug-area' },
                    { text: 'Debug Pointer', link: '/api-reference/debug-pointer' },
                ]
            },
            {
                text: 'Concepts',
                items: [
                    { text: 'Document operations <div class="VPBadge tip" style="margin-left: 8px;">new</div>', link: '/concepts/document-operations' },
                    { text: 'Settings', link: '/concepts/settings' },
                    { text: 'Document metadata', link: '/concepts/document-metadata' },
                    { text: 'Document settings', link: '/concepts/document-settings' },
                    { text: 'Generating output', link: '/concepts/generating-output' },
                    { text: 'Merging documents', link: '/concepts/merging-documents' },
                    { text: 'Execution order', link: '/concepts/execution-order' },
                    { text: 'Creating DSL', link: '/concepts/creating-dsl' },
                    { text: 'Components', link: '/concepts/components' },
                    { text: 'Font management', link: '/concepts/font-management' },
                    { text: 'Dynamic components', link: '/concepts/dynamic-components' },
                    { text: 'Length unit types', link: '/concepts/length-unit-types' },
                    { text: 'Colors', link: '/concepts/colors' },
                    { text: 'Basic fonts', link: '/concepts/basic-fonts' },
                    { text: 'Prototyping', link: '/concepts/prototyping' },
                    { text: 'Complex Graphics', link: '/concepts/complex-graphics' },
                    { text: 'Exceptions', link: '/concepts/exceptions' },
                    { text: 'SkiaSharp integration', link: '/concepts/skia-sharp-integration' },
                    { text: 'Application optimization', link: '/concepts/application-optimization' },
                ]
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Complex layouts', link: '/examples/complex-layouts' },
                    { text: 'Custom first page', link: '/examples/custom-first-page' },
                    { text: 'Implementing charts', link: '/examples/implementing-charts' },
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

