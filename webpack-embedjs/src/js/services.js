
import axios from 'axios'
import { env } from './config'
import LauncherBtn from "./launcher-btn"
let urls = {
    getbotConfig : "api/v1/userbot/get-bot/"
}

export async function getbotConfig(botId){
    return axios.get(env.apiURL + urls.getbotConfig + botId)
    .then(function (response) {
        env.botConfig = response.data
        var launcherBtn = new LauncherBtn();
        launcherBtn.createBtn();
    })
}