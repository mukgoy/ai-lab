
import axios from 'axios'
import { env } from './config'

let urls = {
    getbotConfig : "/api/v1/userbot/get-botui/6"
}

export async function getbotConfig(){
    return axios.get(env.apiURL + urls.getbotConfig)
    .then(function (response) {
        return response.data
    })
}