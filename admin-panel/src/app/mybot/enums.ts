export const userbotConfig = {
    cdn : "http://localhost:3000/",
    backend : "http://localhost:3000/api/v1/userbot/",
    frontend : "http://localhost:4200/",
    botEntity : "bot",
    faqEntity : "faq",
}


export const userbotApi = {
    cdn : userbotConfig.cdn,
    backend : userbotConfig.backend,
    frontend : userbotConfig.faqEntity,
    getFaqs: userbotConfig.backend + 'get-faqs/',
    getBotUi: userbotConfig.backend + 'get-botui/',
}