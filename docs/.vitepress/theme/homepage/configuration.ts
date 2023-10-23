interface HomePageStatistic {
    icon: string;
    label: string;
    value: string;
}

interface HomePageUserGroup {
    icon: string;
    label: string;
    description: string;
}

interface HomePageFeature {
    icon: string;
    title: string;
    description: string;
}

interface HomePageRecommendation {
    quote: string;
    author: string;
}

export const SummaryContent : string[] = [
    "Design documents using C# and employ a code-only approach. Utilize your version control system to its fullest potential.",
    "Compose document content with a range of powerful and predictable structural elements, such as text, image, border, background, table, and more.",
    "Utilize a comprehensive layout engine, specifically designed for document generation and paging support.",
    "Write code using concise and easy-to-understand C# Fluent API. Utilize IntelliSense to quickly discover available options.",
    "Don't be limited to any proprietary scripting language or format. Follow your experience and leverage all of the features that C# has to offer.",
    "Save time thanks to a hot-reload capability, allowing real-time document preview without code recompilation."
];

export const StatisticsContent : HomePageStatistic[] = [
    {
        icon: "/homepage/stargazers.svg",
        label: "GitHub stargazers",
        value: "7 500+"
    },
    {
        icon: "/homepage/downloads.svg",
        label: "NuGet package downloads",
        value: "2 600 000+"
    },
    {
        icon: "/homepage/updates.svg",
        label: "Feature and quality updates",
        value: "60+"
    }
];

export const UserGroupsContent : HomePageUserGroup[] = [
    {
        icon: "/homepage/community.svg",
        label: "Loved by developers",
        description: "QuestPDF has been created with love for developers, by developers. We understand how to design a library that offers enjoyable and rewarding experience. A quick learning curve, concise and easy-to-understand code, and a fast development loop - this is a definition of productivity and satisfaction."
    },
    {
        icon: "/homepage/business.svg",
        label: "Trusted by business",
        description: "The QuestPDF library provides a stable foundation for PDF generation functionality, regardless of the application type. Its constantly improving quality, high stability, and developer-friendly architecture make it a key for any successful project. Moreover, its open-source nature ensures its reliability and safety."
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
        description: "Feel free to use your preffered code editor (JetBrains Rider, Visual Studio, VS Code, etc.). Run your software on any operating system (Windows, Linux, macOS), cloud platforms (e.g. Azure, AWS), device types (desktop, tablets, phones) and even web browser (via WebAssembly)."
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

export const RecommendationsContent : HomePageRecommendation[] = [
    {
        quote: "This library is amazing, we recently did a small prototype to test RTL and Arabic support, we were impressed with it. Coming from a background where I have used Microsoft Report Designer, Crystal Reports and Fast Reports, this library is better than them all.",
        author: "Toss_A_Coin_Yo"
    },
    {
        quote: "Thanks for your hard work, I really appreciate QuestPDF! One of the most professional, high quality open-source PDFs library I came across so far!",
        author: "kbmkbm"
    },
    {
        quote: "Recently made use of this library over another older library and have to say it was a joy to work with. The previewer tool makes making small changes and designing documents such a nice task when matched up with hot reload.",
        author: "Lawwley"
    },
    {
        quote: "I have been monitoring this project for a couple of years and finally had the chance to utilize it. Initial thoughts are that it is amazing. Thank you for the incredible amount of work you have put into this!",
        author: "yooperdev"
    }
];



