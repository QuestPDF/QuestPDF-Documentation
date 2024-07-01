import {PaddleConfiguration} from "./PaddleConfiguration";

export enum LicenseDetailType {
    Feature,
    Information,
    Warning
}

export interface LicenseDetail {
    type: LicenseDetailType,
    content: string;
}

export interface License {
    icon: string;
    name: string;
    shortTerms: string;

    price: number;
    paddleProductId: number;

    details: LicenseDetail[];
}

const LicenseDetailsIncluded : LicenseDetail[] = [
    { type: LicenseDetailType.Feature, content: "This license covers commercial usage" },
    { type: LicenseDetailType.Feature, content: "Create and deploy unlimited closed-source projects, applications and APIs" },
    { type: LicenseDetailType.Feature, content: "Redistribute the compiled library, royalty-free, with your applications" }
]

const LicenseLicense = { type: LicenseDetailType.Information, content: "This is a perpetual license that allows you to use the library indefinitely. It also includes one year of free feature and quality updates" };
const LicenseSubscription = { type: LicenseDetailType.Information, content: "The purchase also starts an optional subscription that entitles you to software updates for the purchased period and is recommended as long as you are performing active software development. You can resign at any time for any reason" };
const LicenseRefundPolicy  = { type: LicenseDetailType.Information, content: "If you are not completely satisfied with the library after the purchase, we provide a 30-day money-back guarantee on all license purchases" };
const LicensePaymentOptions  = { type: LicenseDetailType.Information, content: "If you require different payment terms or a direct invoice, please email us at <a href='mailto:contact@questpdf.com'>contact@questpdf.com</a>." };
const LicenseTrial  = { type: LicenseDetailType.Warning, content: "Before making a license purchase, please evaluate the library in a non-production environment" };

export const CommunityLicense : License = {
    icon: "/license/community.svg",
    name: "Community",
    shortTerms: "Applicable only for companies and individuals with less than $1M USD annual gross revenue.",

    price: null,
    paddleProductId: null,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Information, content: "This license is perpetual and entitles you to use the software" },
        { type: LicenseDetailType.Warning, content: "This license is applicable only for companies and individuals with less than $1M USD annual gross revenue, or projects using the library as a transitive dependency, or non-profit projects" },
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Community MIT License" },
    ]
};

export const ProfessionalLicense : License = {
    icon: "/license/professional.svg",
    name: "Professional",
    shortTerms: "Applicable for individuals and companies with at most 10 software developers",

    price: 699,
    paddleProductId: PaddleConfiguration.professionalLicenseId,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Feature, content: "Up to 10 developers working on QuestPDF-dependent projects" },
        LicenseLicense,
        LicenseSubscription,
        LicensePaymentOptions,
        LicenseRefundPolicy,
        LicenseTrial,
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Professional License" },
    ]
};

export const EnterpriseLicense : License = {
    icon: "/license/enterprise.svg",
    name: "Enterprise",
    shortTerms: "Applicable for individuals and companies with any number of software developers",

    price: 1999,
    paddleProductId: PaddleConfiguration.enterpriseLicenseId,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Feature, content: "Unlimited software developers" },
        LicenseLicense,
        LicenseSubscription,
        LicensePaymentOptions,
        LicenseRefundPolicy,
        LicenseTrial
    ]
};
