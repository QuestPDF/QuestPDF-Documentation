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
    price: number;
    paddleProductId: number;

    details: LicenseDetail[];
}

const LicenseDetailsIncluded : LicenseDetail[] = [
    { type: LicenseDetailType.Feature, content: "This license covers commercial usage" },
    { type: LicenseDetailType.Feature, content: "Create and deploy unlimited closed-source projects, applications and APIs" },
    { type: LicenseDetailType.Feature, content: "Redistribute the compiled library, royalty-free, with your applications" }
]

const LicenseSubscription = { type: LicenseDetailType.Information, content: "Please note that when you buy a license you get two things: a perpetual license and a subscription. The license entitles you to use the software. The subscription entitles you to software updates for the purchased period and is required as long as you are performing active software development" };
const LicenseKey = { type: LicenseDetailType.Information, content: "We trust every user. Therefore, the library does not require any license key. After the purchase, your license is automatically added to our records" };

const LicenseRefundPolicy  = { type: LicenseDetailType.Information, content: "If you are not completely satisfied with the library after the purchase, we provide a 30-day money-back guarantee on all license purchases" };
const LicenseTrial  = { type: LicenseDetailType.Warning, content: "Before making a license purchase, please evaluate the library in a non-production environment" };

export const CommunityLicense : License = {
    icon: "/pricing/community.svg",
    name: "Community",

    price: null,
    paddleProductId: null,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Information, content: "This license is perpetual and entitles you to use the software" },
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Community License" },
    ]
};

export const ProfessionalLicense : License = {
    icon: "/pricing/professional.svg",
    name: "Professional",

    price: 500,
    paddleProductId: PaddleConfiguration.professionalLicenseId,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Feature, content: "Up to 10 developers working on QuestPDF-dependent projects" },
        LicenseSubscription,
        LicenseKey,
        LicenseRefundPolicy,
        LicenseTrial,
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Professional License" },
    ]
};

export const EnterpriseLicense : License = {
    icon: "/pricing/enterprise.svg",
    name: "Enterprise",

    price: 2000,
    paddleProductId: PaddleConfiguration.enterpriseLicenseId,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Feature, content: "Unlimited software developers" },
        LicenseSubscription,
        LicenseKey,
        LicenseRefundPolicy,
        LicenseTrial
    ]
};
