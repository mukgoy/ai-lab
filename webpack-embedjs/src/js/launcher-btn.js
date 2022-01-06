import { env } from './config'
import dom from './dom-query'
import IframeChannel from "./iframe-channel"

export default class LauncherBtn{

    launcherId = "mybot-launcher";
    iframeChannel
    closeSVG = ""

    closedHtml(){
        return `<div class="mybot-launcher-html closed">
                    <img class="bubble-btn" src="${env.botConfig.jsondata.launcher.logo}">
                    <div>&nbsp;<h3 style="margin: auto;">
                    &nbsp;${env.botConfig.jsondata.launcher.text}
                    </h3></div>
                </div>`
    }
    openedHtml(){
        return `<div class="mybot-launcher-html opened">
                    <img class="bubble-btn" src="./images/close.svg">
                </div>`
    }
    createBtn(){
        let launcher = document.createElement("div");
        launcher.id = this.launcherId
        launcher.classList.add("mybot-launcher-btn");
        launcher.classList.add("right");
        launcher.classList.add("close");
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
            dom("#"+this.launcherId).toggleClass("open").toggleClass("close");
            this.createIframeChannel();
        });
    }

    createIframeChannel(){
        if(this.iframeChannel && this.iframeChannel.isInitiated){
            dom("#"+env.iframeId)
            .toggleClass("isChatClose")
            .toggleClass("isChatOpen");
        }else{
            this.iframeChannel = new IframeChannel();
            this.iframeChannel.init();
        }
        
    }

    disableselect() {
        dom("#"+this.launcherId).on("onselectstart",new Function ("return false"));
    }
}