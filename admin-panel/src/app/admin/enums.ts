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