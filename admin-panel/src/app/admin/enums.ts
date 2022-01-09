export const adminConfig = {
    cdn : "http://localhost:3000/",
    backend : "http://localhost:3000/api/v1/admin/",
    frontend : "http://localhost:4200/",
    botEntity : "bot",
    faqEntity : "faq",
}


export const adminApi = {
    cdn : adminConfig.cdn,
    backend : adminConfig.backend,
    frontend : adminConfig.faqEntity,
    bot:{
        create: adminConfig.backend + adminConfig.botEntity,
        findAll: adminConfig.backend + adminConfig.botEntity,
        findOne: adminConfig.backend + adminConfig.botEntity,
        update: adminConfig.backend + adminConfig.botEntity,
        remove: adminConfig.backend + adminConfig.botEntity,
    },
    faq:{
        entity : "faq",
        create: adminConfig.backend + adminConfig.faqEntity,
        findAll: adminConfig.backend + adminConfig.faqEntity,
        findOne: adminConfig.backend + adminConfig.faqEntity,
        update: adminConfig.backend + adminConfig.faqEntity,
        remove: adminConfig.backend + adminConfig.faqEntity,
    },
    upload: adminConfig.backend + "upload"
}

export const adminNotify = {
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