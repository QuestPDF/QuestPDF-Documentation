module.exports = {
    title: 'Quest PDF',
    description: 'QuestPDF is a modern library that can help you with generating PDF documents in your .NET application by using friendly, discoverable and predictable C# fluent API.',
    head: [
        ['link', {rel: 'icon', href: '/favicon.svg'}],
        ['link', {rel: 'icon', href: '/favicon.png'}],
    ],
    evergreen: true,
    base: '/documentation/',
    dest: '/workspace/dist',
    themeConfig: {
        displayAllHeaders: true,
        sidebarDepth: 3,
        nav: [
            {text: 'Homepage', link: 'https://www.questpdf.com'},
            {text: 'Documentation', link: '/'},
            {text: 'Example code', link: 'https://github.com/QuestPDF/example-invoice'},
            {text: 'Repository', link: 'https://github.com/QuestPDF/library'},
            {text: 'Nuget', link: 'https://www.nuget.org/packages/QuestPDF/'}
        ],
        sidebar: {
            '/': [
                '/',
                'releases',
                'quality-assurance',
                'getting-started',
                'api-reference',
                'patterns-and-practices',
                'acknowledgements'
            ]
        }
    },
    markdown: {
        extendMarkdown: md => {
            const highlight = md.options.highlight;

            md.options.highlight = (str, lang) => {
                let result = highlight(str, lang);

                const target = `<span class="token function">Column</span>`;
                const link = `/documentation/api-reference.html#column`;
                //result = result.replace(target, `<a href="${link}">${target}</a>`);

                return result;
            };

            md.use(require('markdown-it-imsize'));
            md.use(require('markdown-it-task-lists'));
        }
    },
    plugins: {
        '@vuepress/google-analytics': {
            'ga': 'UA-133910186-6'
        }
    }
}

