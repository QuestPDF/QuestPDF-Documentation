interface HomePageStatistic {
    icon: string;
    label: string;
    value: string;
}

interface HomePageFeature {
    icon: string;
    title: string;
    description: string;
}

export const StatisticsContent : HomePageStatistic[] = [
    {
        icon: "/homepage/stargazers.svg",
        label: "GitHub stargazers",
        value: "12 200 +"
    },
    {
        icon: "/homepage/downloads.svg",
        label: "NuGet package downloads",
        value: "7 200 000 +"
    }
];

export const FeaturesContent : HomePageFeature[] = [
    {
        icon: "homepage/engine.svg",
        title: "Comprehensive layout engine",
        description: "Utilize a layout engine specifically designed for document generation, with full paging support. It gives you high control over the content, optimizes the document's visual structure, and makes your code more flexible."
    },
    {
        icon: "homepage/multiplatform.svg",
        title: "Multiplatform",
        description: "Feel free to use your preferred code editor (JetBrains Rider, Visual Studio, VS Code, etc.). Run your software on any operating system (Windows, Linux, macOS), cloud platforms (e.g. Azure, AWS)."
    },
    {
        icon: "homepage/intellisense.svg",
        title: "Discoverable Fluent API",
        description: "The library uses the FluentAPI code style that makes your code more concise and easier to understand. The IntelliSense mechanism available in all major IDEs helps you writing the code efficiently and discover new features."
    },
    {
        icon: "homepage/puzzle.svg",
        title: "Reusable code",
        description: "Apply established programming patterns and practices to make your code more manageable. For instance, divide your layout implementation into distinct and/or reusable structures using classes and methods, exactly how you do it with other features and functionalities."
    },
    {
        icon: "homepage/maintenance.svg",
        title: "Efficient maintenance",
        description: "Follow the code-only approach to have better understanding of changes and implementation history. Use your preferred version control system to easily manage fixes, adjustments and improvements. Never get lost in proprietary binary formats or complex HTML implementations."
    },
    {
        icon: "homepage/prototyping.svg",
        title: "Quick prototyping",
        description: "Design and adjust visual content using the QuestPDF Previewer tool. It utilizes a hot-reload capability to preview your document without code re-compilation. Use the inspector tool to better understand the layout and its structure."
    },
    {
        icon: "homepage/performance.svg",
        title: "High performance",
        description: "Enjoy high performance and low resource usage thanks to highly optimized layout engine and graphical library. Generate even 1000 PDF files per minute per core, with a thread-safe process."
    },
    {
        icon: "homepage/multilingual.svg",
        title: "Advanced languages support",
        description: "Easily create multilingual documents with advanced text style support, including right-to-left (RTL) languages as well as languages requiring text shaping to display glyphs correctly (e.g. Arabic)."
    }
];
