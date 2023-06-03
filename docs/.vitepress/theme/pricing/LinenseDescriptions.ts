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

export const LicenseDetailsIncluded : LicenseDetail[] = [
    { type: LicenseDetailType.Feature, content: "Covers commercial usage" },
    { type: LicenseDetailType.Feature, content: "Create and deploy unlimited closed-source projects, applications and APIs" },
    { type: LicenseDetailType.Feature, content: "Redistribute the compiled library, royalty-free, with your applications" }
]

export const CommunityLicense : License = {
    icon: "/pricing/community.svg",
    name: "Community",

    price: null,
    paddleProductId: null,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Information, content: "This license is perpetual" },
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
        { type: LicenseDetailType.Information, content: "This license is perpetual" },
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Community License" },
    ]
};

export const EnterpriseLicense : License = {
    icon: "/pricing/enterprise.svg",
    name: "Enterprise",

    price: 3000,
    paddleProductId: PaddleConfiguration.enterpriseLicenseId,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Information, content: "This license is perpetual" },
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Community License" },
    ]
};
