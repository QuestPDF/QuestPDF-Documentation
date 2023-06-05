import {OwnerType} from "./LicenseSurveyModels";

export const IntroductionQuestion = {
    content: "Please answer a couple of simple questions to learn which license suits you best.",
    answers: [
        {
            content: "Start",
            action: () => {}
        }
    ]
};

export const DirectPackageDependencyQuestion = {
    content: "Are you consuming the QuestPDF library as a Direct Package Dependency?",
    answers: [
        {
            content: "Yes",
            hint: "QuestpDF is a explicitly referenced in my project",
            action: x => x.isDirectPackageDependency = true
        },
        {
            content: "No",
            hint: "QuestPDF is referenced as a dependency of other library",
            action: x => x.isDirectPackageDependency = false
        }
    ]
};

export const CommercialUsageQuestion = {
    content: "Is your project for-profit?",
    answers: [
        {
            content: "Yes",
            hint: "The project is meant to generate profit, e.g.: commercial application, reduced company costs, paid product, etc.",
            action: x => x.isForProfit = true
        },
        {
            content: "No",
            hint: "The project is not created for profit, e.g.: open-source library, project created for Charitable Organization, etc.",
            action: x => x.isForProfit = false
        }
    ]
};

export const ExternalClientQuestion = {
    content: "Is the project created by external client?",
    answers: [
        {
            content: "Yes",
            hint: "I am creating the project for external client",
            action: x => x.ownerType = OwnerType.External,
        },
        {
            content: "No",
            hint: "I am creating the project individually or for my employer",
            action: x => x.ownerType = OwnerType.Internal
        }
    ]
};

export const RevenueThresholdInternalQuestion = {
    content: "Does your company has more than 1M USD annual gross revenue?",
    answers: [
        {
            content: "Yes",
            hint: "My company or my employer has more than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = true,
        },
        {
            content: "No",
            hint: "My company or my employer has less than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = false
        }
    ]
};

export const RevenueThresholdExternalClientQuestion = {
    content: "Does your client has more than 1M USD annual gross revenue?",
    answers: [
        {
            content: "Yes",
            hint: "My client has more than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = true,
        },
        {
            content: "No",
            hint: "My client has less than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = false,
        }
    ]
};

export const DeveloperThresholdQuestion = {
    content: "How many software developers are / will be working on projects dependent on the QuestPDF library?",
    answers: [
        {
            content: "Up to 10",
            action: x => x.exceededDeveloperCountThreshold = false,
        },
        {
            content: "More than 10",
            action: x => x.exceededDeveloperCountThreshold = true,
        }
    ]
};