import { defineLoader } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'

export interface LegalDocumentMeta {
    label: string;
    value: string;
}

export interface LegalDocument {
    id: string;
    title: string;
    meta: LegalDocumentMeta[];
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

            documents[id] = {
                id,
                title,
                meta,
                html: markdown.render(body)
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
