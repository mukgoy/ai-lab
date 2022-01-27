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

export const authNotify = {
    success : {
        signup: 'Signup successfully.',
        login: 'Login successfully.',
        verifyEmail: 'Please verify your email.',
    },
    error : {
        unknown: 'Some thing is not correct.',
        userExist: 'Account with this email already exists.',
        unauthorized: 'Unauthorized.',
        emailNotVerify: 'Your email verification is pending.',
    },
}