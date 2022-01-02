export const authConfig = {
    cdn : "http://localhost:3000/",
    backend : "http://localhost:3000/api/v1/auth/",
    frontend : "http://localhost:4200/",
    botEntity : "bot",
    faqEntity : "faq",
}


export const authApi = {
    cdn : authConfig.cdn,
    backend : authConfig.backend,
    frontend : authConfig.faqEntity,
    auth:{
        login: authConfig.backend + "login",
    }
}