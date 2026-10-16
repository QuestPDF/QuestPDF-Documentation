import { defineLoader } from 'vitepress'

export interface StatisticEntry {
    icon: string;
    label: string;
    link: string;
    value: string;
}

declare const data: StatisticEntry[]
export { data }

/* the publish date of QuestPDF 2020.11.0, the first stable version on NuGet */
const firstRelease = new Date('2020-11-01');

export default defineLoader({
    async load(): Promise<StatisticEntry[]> {
        const [nugetDownloads, githubStars] = await Promise.all([
            getNugetDownloads(),
            getGithubStars()
        ]);

        return [
            {
                icon: "fa-star",
                label: "GitHub stars",
                link: "https://github.com/QuestPDF/QuestPDF",
                value: `${toThousands(githubStars)}K`
            },
            {
                icon: "fa-download",
                label: "NuGet downloads",
                link: "https://www.nuget.org/packages/QuestPDF/",
                value: `${toMillions(nugetDownloads)}M`
            },
            {
                icon: "fa-building",
                label: "Paying customers",
                link: "/pricing",
                value: "800+"
            },
            {
                icon: "fa-calendar-check",
                label: "Years in production",
                link: "https://www.nuget.org/packages/QuestPDF/#versions-body-tab",
                value: `${toYears(firstRelease)}`
            }
        ];
    }
})

async function fetchJson(url: string, init: RequestInit = {}, attempts = 5): Promise<any> {
    for (let attempt = 1; ; attempt++) {
        try {
            const response = await fetch(url, { ...init, signal: AbortSignal.timeout(5_000) });

            if (!response.ok)
                throw new Error(`HTTP ${response.status} ${response.statusText}`);

            return await response.json();
        } catch (error) {
            if (attempt >= attempts)
                throw error;

            await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        }
    }
}

async function getNugetDownloads(): Promise<number> {
    // discover the search endpoint from the service index
    const index = await fetchJson('https://api.nuget.org/v3/index.json');

    const searchResource = index.resources.find(
        r => r['@type'] === 'SearchQueryService'
    );

    if (!searchResource)
        throw new Error('SearchQueryService not found in service index');

    const queryUrl = `${searchResource['@id']}?q=packageid:questpdf&prerelease=true`;
    const data = await fetchJson(queryUrl);

    const totalDownloads = data.data[0]?.totalDownloads;

    if (typeof totalDownloads !== 'number')
        throw new Error('totalDownloads not found in NuGet search response for packageid:questpdf');

    return totalDownloads;
}

async function getGithubStars(): Promise<number> {
    const data = await fetchJson('https://api.github.com/repos/QuestPDF/QuestPDF', {
        headers: { 'Accept': 'application/vnd.github+json' }
    });

    const stars = data.stargazers_count;

    if (typeof stars !== 'number')
        throw new Error('stargazers_count not found in GitHub repo response for QuestPDF/QuestPDF');

    return stars;
}

function toMillions(n: number): number {
    return Math.round(n / 1_000_000)
}

function toThousands(n: number): number {
    return Math.round(n / 100) / 10
}

function toYears(since: Date): number {
    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
    return Math.round((Date.now() - since.getTime()) / millisecondsPerYear);
}
