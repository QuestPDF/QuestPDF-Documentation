import { defineLoader } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'

export interface LegalDocument {
    id: string;
    title: string;
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
            const { title, body } = extractTitle(source);

            documents[id] = {
                id,
                title,
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
