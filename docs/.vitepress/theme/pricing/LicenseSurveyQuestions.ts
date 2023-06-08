import {OwnerType} from "./LicenseSurveyModels";

const AnswerYes = "/pricing/answer-yes.svg";
const AnswerNo = "/pricing/answer-no.svg";

export const IntroductionQuestion = {
    title: "Please answer a couple of simple questions to learn which license suits you best.",
    answers: [
        {
            icon: AnswerYes,
            title: "Start",
            action: () => {}
        }
    ]
};

export const DirectPackageDependencyQuestion = {
    title: "Are you consuming the QuestPDF library as a Direct Package Dependency?",
    answers: [
        {
            icon: AnswerYes,
            title: "Yes",
            hint: "QuestPDF is a explicitly referenced in my project and/or it explicitly uses QuestPDF API",
            action: x => x.isDirectPackageDependency = true
        },
        {
            icon: AnswerNo,
            title: "No",
            hint: "QuestPDF is referenced as a dependency of other library",
            action: x => x.isDirectPackageDependency = false
        }
    ]
};

export const CommercialUsageQuestion = {
    title: "Is your project for-profit?",
    answers: [
        {
            icon: AnswerYes,
            title: "Yes",
            hint: "The project is meant to generate profit, e.g.: commercial application, reduced company costs, paid product, etc.",
            action: x => x.isForProfit = true
        },
        {
            icon: AnswerNo,
            title: "No",
            hint: "The project is not created for profit, e.g.: open-source library, project created for Charitable Organization, learning purposes, training courses etc.",
            action: x => x.isForProfit = false
        }
    ]
};

export const ExternalClientQuestion = {
    title: "Is the project created for an external client?",
    answers: [
        {
            icon: AnswerYes,
            title: "Yes",
            hint: "I am creating the project for an external client",
            action: x => x.ownerType = OwnerType.External,
        },
        {
            icon: AnswerNo,
            title: "No",
            hint: "I am creating the project individually or for my employer",
            action: x => x.ownerType = OwnerType.Internal
        }
    ]
};

export const RevenueThresholdInternalQuestion = {
    title: "Does your company has more than 1M USD annual gross revenue?",
    answers: [
        {
            icon: AnswerYes,
            title: "Yes",
            hint: "My company or my employer has more than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = true,
        },
        {
            icon: AnswerNo,
            title: "No",
            hint: "My company or my employer has less than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = false
        }
    ]
};

export const RevenueThresholdExternalClientQuestion = {
    title: "Does your client has more than 1M USD annual gross revenue?",
    answers: [
        {
            icon: AnswerYes,
            title: "Yes",
            hint: "My client has more than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = true,
        },
        {
            icon: AnswerNo,
            title: "No",
            hint: "My client has less than 1M USD annual gross revenue",
            action: x => x.exceededAnnualRevenueThreshold = false,
        }
    ]
};

export const DeveloperThresholdQuestion = {
    title: "How many software developers are / will be working on projects dependent on the QuestPDF library?",
    answers: [
        {
            icon: AnswerYes,
            title: "Over 10",
            hint: "software developers are / will be working on projects dependent on the QuestPDF library",
            action: x => x.exceededDeveloperCountThreshold = true,
        },
        {
            icon: AnswerNo,
            title: "Less than 10",
            hint: "software developers are / will be working on projects dependent on the QuestPDF library",
            action: x => x.exceededDeveloperCountThreshold = false,
        }
    ]
};