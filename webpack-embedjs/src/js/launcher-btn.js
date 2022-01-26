import { env } from './config'
import dom from './dom-query'
import IframeChannel from "./iframe-channel"

export default class LauncherBtn{

    launcherId = "mybot-launcher";
    iframeChannel
    closeSVG = ""

    static _instance = null
    constructor() {
        if (!LauncherBtn._instance) {
            LauncherBtn._instance = this;
        }
        return LauncherBtn._instance;
    }

    closedHtml(){
        return `<div class="mybot-launcher-html botclosed">
                    <img class="bubble-btn" src="${env.botConfig.jsondata.launcher.logo}">
                    &nbsp;<div style="margin: auto;font-size: 1.8rem;">${env.botConfig.jsondata.launcher.text}
                    </div>
                </div>`
    }
    openedHtml(){
        return `<div class="mybot-launcher-html botopened">
                    <img class="bubble-btn" src="${env.botHost}assets/mybot/images/close.svg">
                </div>`
    }
    createBtn(){
        let launcher = document.createElement("div");
        launcher.id = this.launcherId
        launcher.classList.add("mybot-launcher-btn");
        launcher.classList.add("right");
        launcher.classList.add("botclose");
        launcher.innerHTML = this.closedHtml() + this.openedHtml();
        document.body.appendChild(launcher);
        this.addStyle();
        this.addListner();
        this.disableselect();
    }

    addStyle(){
        let styles = {}
        styles["color"] = env.botConfig.jsondata.textColor;
        if(env.botConfig.jsondata.isGradient){
            styles["background-image"] = `linear-gradient(-225deg, ${env.botConfig.jsondata.bgColor1} 35%, ${env.botConfig.jsondata.bgColor2} 100%)`;
        }else{
            styles["background-color"] = `${env.botConfig.jsondata.bgColor1}`;
        }
        dom("#"+this.launcherId).style(styles)
    }

    addListner(){
        dom("#"+this.launcherId).on("click",()=>{
            this.toggleWindow();
            this.createIframeChannel();
        });
    }

    createIframeChannel(){
        if(!this.iframeChannel?.isInitiated){
            this.iframeChannel = new IframeChannel();
            this.iframeChannel.init();
        }
    }

    disableselect() {
        dom("#"+this.launcherId).on("onselectstart",new Function ("return false"));
    }

    closeWindow(){
        dom("#"+this.launcherId).removeClass("botopen").addClass("botclose");
        dom("#"+env.iframeId).removeClass("isChatOpen").addClass("isChatClose");
    }

    toggleWindow(){
        dom("#"+this.launcherId).toggleClass("botopen").toggleClass("botclose");
        dom("#"+env.iframeId).toggleClass("isChatClose").toggleClass("isChatOpen");
    }
}