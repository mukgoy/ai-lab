import './css/style.css';
import { getbotConfig } from "./js/services"
import LauncherBtn from "./js/launcher-btn"
import { env } from './js/config';

(async ()=>{
    env.botConfig = await getbotConfig();
    var launcherBtn = new LauncherBtn();
    launcherBtn.createBtn();
})();


