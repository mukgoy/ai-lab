import { environment } from "src/environments/environment"

export const authConfig = {
    uploads : environment.uploads,
    backend : environment.backend + "api/v1/auth/",
    frontend : environment.frontend
}

export const authApi = {
    auth:{
        login: authConfig.backend + "login",
        signup: authConfig.backend + "signup",
    }
}