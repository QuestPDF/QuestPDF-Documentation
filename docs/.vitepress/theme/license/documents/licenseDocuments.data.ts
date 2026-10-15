import { defineLoader } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'

export interface LegalDocumentMeta {
    label: string;
    value: string;
}

export interface LegalDocumentSection {
    id: string;
    title: string;
}

export interface LegalDocument {
    id: string;
    title: string;
    meta: LegalDocumentMeta[];
    sections: LegalDocumentSection[];
    html: string;
}

export type LegalDocuments = Record<string, LegalDocument>;

declare const data: LegalDocuments
export { data }

const sourcesDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'sources');

const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true
});

// Every "## Section" gets an id, so it can be linked to (/license/guide#community-license-eligibility),
// and is listed in the document's `sections`, which the page shows as its contents rail.
markdown.renderer.rules.heading_open = (tokens, index, options, env, self) => {
    const token = tokens[index];

    if (token.tag === 'h2') {
        const title = tokens[index + 1].children
            .filter(child => child.type === 'text' || child.type === 'code_inline')
            .map(child => child.content)
            .join('')
            .trim();

        // a repeated title gets -1, -2, … as VitePress does
        const slug = slugify(title);
        const repeats = env.slugCounts[slug] ?? 0;
        const id = repeats === 0 ? slug : `${slug}-${repeats}`;
        env.slugCounts[slug] = repeats + 1;

        token.attrSet('id', id);
        env.sections.push({ id, title });
    }

    return self.renderToken(tokens, index, options);
};

// The same slugs VitePress gives the headings of the other pages
function slugify(text: string): string {
    return text
        .normalize('NFKD')
        .replace(/[\u0300-\u036F]/g, '')
        .replace(/[\u0000-\u001f]/g, '')
        .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/^(\d)/, '_$1')
        .toLowerCase();
}

export default defineLoader({
    watch: ['./sources/*.md'],
    load(): LegalDocuments {
        const documents: LegalDocuments = {};

        const fileNames = fs
            .readdirSync(sourcesDirectory)
            .filter(fileName => fileName.endsWith('.md'));

        for (const fileName of fileNames) {
            const id = fileName.replace(/\.md$/, '');
            const source = fs.readFileSync(path.join(sourcesDirectory, fileName), 'utf-8');
            const { title, body: bodyWithMeta } = extractTitle(source);
            const { meta, body } = extractMeta(bodyWithMeta);

            const env = { sections: [] as LegalDocumentSection[], slugCounts: {} as Record<string, number> };
            const html = markdown.render(body, env);

            documents[id] = {
                id,
                title,
                meta,
                sections: env.sections,
                html
            };
        }

        return documents;
    }
})

// The first line of every source is the title heading ("# ..."); the rest is the body.
function extractTitle(source: string): { title: string; body: string } {
    const [firstLine, ...rest] = source.split(/\r?\n/);
    const title = firstLine.replace(/^#\s+/, '').trim();

    return { title, body: rest.join('\n').trim() };
}

// Right under the title, every source lists a few facts as "**Label:** value" lines
// (effective date, version). They are shown in the page header, not in the body.
function extractMeta(body: string): { meta: LegalDocumentMeta[]; body: string } {
    const lines = body.split(/\r?\n/);
    const meta: LegalDocumentMeta[] = [];

    while (lines.length > 0) {
        const match = lines[0].match(/^\s*\*\*(.+?):\*\*\s*(.*?)\s*$/);

        if (!match)
            break;

        meta.push({ label: match[1].trim(), value: match[2].trim() });
        lines.shift();
    }

    return { meta, body: lines.join('\n').trim() };
}
