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


export const StatisticsContent : HomePageStatistic[] = [
    {
        icon: "/custom/stargazers.svg",
        label: "GitHub stargazers",
        value: "4 450+"
    },
    {
        icon: "/custom/downloads.svg",
        label: "Nuget package downloads",
        value: "700 000+"
    },
    {
        icon: "/custom/updates.svg",
        label: "Feature and quality updates",
        value: "40+"
    }
];

export const UserGroupsContent : HomePageUserGroup[] = [
    {
        icon: "/custom/community.svg",
        label: "Loved by developers",
        description: "This library is created specifically for designing and arranging document layouts, with full paging support. Alternative solutions, such as HTML-based converters, are not designed for this purpose and therefore are often unpredictable and do not produce desired results."
    },
    {
        icon: "/custom/business.svg",
        label: "Trusted by business",
        description: "The entire process of implementing PDF document, takes place in your code. Free yourself from slow visual designers and strange technological limitations. Follow simple yet highly effective approaches to create maintainable, high-quality code."
    }
];

export const FeaturesContent : HomePageFeature[] = [
    {
        icon: "custom/engine.svg",
        title: "Comprehensive layout engine",
        description: "Utilize a layout engine specifically designed for document generation, with full paging support. It gives you high control over the content, optimizes the document's visual structure, and makes your code more flexible."
    },
    {
        icon: "custom/multiplatform.svg",
        title: "Multiplatform",
        description: "Feel free to use your preffered code editor (JetBrains Rider, Visual Studio, VS Code, etc.). Run your software on any operating system (Windows, Linux, macOS), cloud platforms (e.g. Azure, AWS), device types (desktop, tablets, phones) and even web browser (via WebAssembly)."
    },
    {
        icon: "custom/puzzle.svg",
        title: "Reusable code",
        description: "Make your code more manageable by dividing it into classes and methods, exactly how you do it with other features and functionalities. You don't need to learn more skills to make your implementation beautiful."
    },
    {
        icon: "custom/maintenance.svg",
        title: "Efficient maintenance",
        description: "Follow the code-only approach to have better understanding of changes and implementation history. Use your preffered version control system to easily manage fixes, adjustments and improvements. Never get lost in proprietary binary formats or complex HTML implementations."
    },
    {
        icon: "custom/prototyping.svg",
        title: "Quick prototyping",
        description: "Design and adjust visual content using the QuestPDF Previewer tool. It utilizes a hot-reload capability to preview your document without code re-compilation. Use the inspector tool to better understand the layout and its structure."
    },
    {
        icon: "custom/performance.svg",
        title: "High performance",
        description: "Enjoy high performance and low resource usage thanks to highly optimized layout engine and graphical library. Generate even 1000 PDF files per minute per core with a thread-safe process."
    },
    {
        icon: "custom/learning.svg",
        title: "Rewarding learning",
        description: "Quickly go into action and learn library essential features by reading the Getting Started tutorial. Learn more advanced concepts with constantly improving documentation and hundreds of code examples."
    },
    {
        icon: "custom/intellisense.svg",
        title: "Discoverable Fluent API",
        description: "The library uses the FluentAPI code style that makes your code more concise and easier to understand. The IntelliSense mechanism available in all major IDEs helps you writing the code efficiently and discover new features."
    },
    {
        icon: "custom/multilingual.svg",
        title: "Advanced languages support",
        description: "Easily create multilangual documents with advanced text style support, including right-to-left languages (RTL) as well as languages requiring text shaping to properly display glyphs (e.g. Arabic)."
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



