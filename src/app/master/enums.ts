import { environment } from "src/environments/environment"

export const masterConfig = {
    uploads : environment.uploads,
    backend : environment.backend + "api/v1/master/",
    frontend : environment.frontend,
    botEntity : "bot",
    faqEntity : "faq",
    customerEntity : "customer",
    report : "report",
}

export const masterApi = {
    bot:{
        create: masterConfig.backend + masterConfig.botEntity,
        findAll: masterConfig.backend + masterConfig.botEntity,
        findOne: masterConfig.backend + masterConfig.botEntity,
        update: masterConfig.backend + masterConfig.botEntity,
        remove: masterConfig.backend + masterConfig.botEntity,
    },
    faq:{
        create: masterConfig.backend + masterConfig.faqEntity,
        findAll: masterConfig.backend + masterConfig.faqEntity,
        findOne: masterConfig.backend + masterConfig.faqEntity,
        update: masterConfig.backend + masterConfig.faqEntity,
        remove: masterConfig.backend + masterConfig.faqEntity,
    },
    customer:{
        create: masterConfig.backend + masterConfig.customerEntity,
        findAll: masterConfig.backend + masterConfig.customerEntity,
        findOne: masterConfig.backend + masterConfig.customerEntity,
        update: masterConfig.backend + masterConfig.customerEntity,
        remove: masterConfig.backend + masterConfig.customerEntity,
    },
    report:{
        leadcount: masterConfig.backend + masterConfig.report+'/leadcount',
        usercount: masterConfig.backend + masterConfig.report+'/usercount',
        visitorcount: masterConfig.backend + masterConfig.report+'/visitorcount',
    },
    upload: masterConfig.backend + "upload"
}

export const masterNotify = {
    success : {
        createBot: 'Bot have been created.',
        updateBot: 'Bot have been updated.',
        createFaq: 'Faq have been created.',
        updateFaq: 'Faq have been updated.',
        copyContent: 'Copied successfully.',
    },
    error : {
        updateProfileDetails: 'Some thing is not correct.',
    },
    confirm : {
        groupMemberDelete: "Delete member",
        currencyDelete: "Delete currency",
        feeDelete: "Delete fee",
        tradePairDelete: "Delete trade pair",
        ticketDelete: "Delete ticket",
        limitDelete:"Delete limit"
    },
    texts : {
        noDataToDisplay : "No data to display",
        dataFatching : "Please wait... data is fatching from server."
    }
}

