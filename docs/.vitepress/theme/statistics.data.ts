import { defineLoader } from 'vitepress'

export interface StatisticEntry {
    icon: string;
    label: string;
    link: string;
    value: string;
}

declare const data: StatisticEntry[]
export { data }

export default defineLoader({
    async load(): Promise<StatisticEntry[]> {
        const nugetDownloads = await getNugetDownloads();
        const githubStars = await getGithubStars();
        const firstRelease = await getNugetFirstRelease();

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

    // query for the package
    const queryUrl = `${searchResource['@id']}?q=packageid:questpdf&prerelease=true`;
    const data = await fetchJson(queryUrl);

    const totalDownloads = data.data[0]?.totalDownloads;

    if (typeof totalDownloads !== 'number')
        throw new Error('totalDownloads not found in NuGet search response for packageid:questpdf');

    return totalDownloads;
}

/* the publish date of the first listed, stable version on NuGet; the registration index splits
   the versions into pages, which the API inlines only for small packages */
async function getNugetFirstRelease(): Promise<Date> {
    const index = await fetchJson('https://api.nuget.org/v3/index.json');

    const registrationResource = index.resources.find(
        r => r['@type'] === 'RegistrationsBaseUrl/3.6.0'
    );

    if (!registrationResource)
        throw new Error('RegistrationsBaseUrl/3.6.0 not found in service index');

    const registration = await fetchJson(`${registrationResource['@id']}questpdf/index.json`);
    const published: Date[] = [];

    for (const page of registration.items) {
        const items = page.items ?? (await fetchJson(page['@id'])).items;

        for (const item of items) {
            const entry = item.catalogEntry;
            const isStable = !entry.version.includes('-');
            const isListed = entry.listed !== false;
            const publishedAt = new Date(entry.published);

            // unlisted versions carry a placeholder date of 1900-01-01
            if (isStable && isListed && publishedAt.getFullYear() > 1900)
                published.push(publishedAt);
        }
    }

    if (published.length === 0)
        throw new Error('No listed stable versions found in NuGet registration for questpdf');

    return new Date(Math.min(...published.map(date => date.getTime())));
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

export function toMillions(n: number): number {
    return Math.round(n / 1_000_000)
}

export function toThousands(n: number): number {
    return Math.round(n / 100) / 10
}

/* elapsed years, rounded to the nearest whole year */
export function toYears(since: Date, now: Date = new Date()): number {
    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
    return Math.round((now.getTime() - since.getTime()) / millisecondsPerYear);
}
