export interface LicenseQuestion {
    content: string;
    answers: LicenseAnswer[];
}

export interface LicenseAnswer {
    content: string;
    hint?: string;
    action: (state: SurveyState) => void;
}

export enum LicenseType {
    Community,
    Professional,
    Enterprise
}

export enum OwnerType {
    Internal,
    External
}

export interface SurveyState {
    isDirectPackageDependency: boolean;
    isForProfit: boolean;
    ownerType: OwnerType;
    exceededAnnualRevenueThreshold: boolean;
    exceededDeveloperCountThreshold: boolean;
}

