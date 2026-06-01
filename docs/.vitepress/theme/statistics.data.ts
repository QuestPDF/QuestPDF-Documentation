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

        return [
            {
                icon: "fa-duotone fa-star",
                label: "GitHub stars",
                link: "https://github.com/QuestPDF/QuestPDF",
                value: `${toThousands(githubStars)}K`
            },
            {
                icon: "fa-duotone fa-download",
                label: "NuGet downloads",
                link: "https://www.nuget.org/packages/QuestPDF/",
                value: `${toMillions(nugetDownloads)}M`
            }
        ];
    }
})

async function getNugetDownloads() {
    // discover the search endpoint from the service index
    const indexResponse = await fetch('https://api.nuget.org/v3/index.json');
    const index = await indexResponse.json();

    const searchResource = index.resources.find(
        r => r['@type'] === 'SearchQueryService'
    );

    if (!searchResource)
        throw new Error('SearchQueryService not found in service index');

    // query for the package
    const queryUrl = `${searchResource['@id']}?q=packageid:questpdf&prerelease=true`;
    const response = await fetch(queryUrl);
    const data = await response.json();

    const totalDownloads = data.data[0]?.totalDownloads;

    if (typeof totalDownloads !== 'number')
        throw new Error('totalDownloads not found in NuGet search response for packageid:questpdf');

    return totalDownloads;
}

async function getGithubStars() {
    const response = await fetch('https://api.github.com/repos/QuestPDF/QuestPDF', {
        headers: { 'Accept': 'application/vnd.github+json' }
    });

    const data = await response.json();

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
