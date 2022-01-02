
import axios from 'axios'
import { env } from './config'

let urls = {
    getbotConfig : "/assets/mybot/json/bot1.json"
}

export async function getbotConfig(){
    return axios.get(env.apiURL + urls.getbotConfig)
    .then(function (response) {
        return response.data
    })
}