import { env } from './config'
import dom from './dom-query'
import Channel from 'js-channel'
import LauncherBtn from "./launcher-btn"

export default class IframeChannel {

    isInitiated = false;
    iframeElem = null;
    channel = null;
    resolve;

    static _instance = null
    constructor() {
        if (!IframeChannel._instance) {
            IframeChannel._instance = this;
        }
        return IframeChannel._instance;
    }

    async init() {
        if (this.isInitiated) {
            return;
        }
        this.isInitiated = true;
        return new Promise((resolve) => {
            this.resolve = resolve;
            var iframe = document.createElement("iframe");
            iframe.id = env.iframeId;
            iframe.classList.add("isChatClose");
            iframe.classList.add("chatbotInitiating");
            document.body.appendChild(iframe);
            if (window.addEventListener) {
                iframe.addEventListener("load", this.onIframeLoad.bind(this), false);
            } else if (iframe.attachEvent) {
                iframe.attachEvent("onload", this.onIframeLoad.bind(this), false);
            }
            // iframe.src = env.botURL;
            iframe.src = env.botURL + env.botConfig.botId;
            this.iframeElem = iframe;
        });
    }

    onIframeLoad() {
        let contentWindow = this.iframeElem.contentWindow
        this.channel = Channel.build({
            // debugOutput: true,
            window: contentWindow,
            origin: "*",
            scope: "testScope"
        });
        this.initBind(this.channel);
        this.resolve();
    };

    initBind(channel) {
        channel.bind("initChatBox", (t) => {
            dom("#" + env.iframeId)
                .removeClass("chatbotInitiating")
                .removeClass("isChatClose")
                .addClass("isChatOpen");
        });

        channel.bind("toggleChatBox", function (t, isChatOpen) {
            toggleChatBox(isChatOpen, iframe, iframeBubbleSize);
        });

        channel.bind("getVisitorInfo", function (t, s) {
            return visitor;
        });

        channel.bind("getBotConfig", function (t) {
            return env.botConfig;
        });

        channel.bind("closeWindow", (t)=>{
            // console.log("closeWindow",t)
            let launcherBtn = new LauncherBtn();
            launcherBtn.closeWindow();
            return "closeWindow done";
        });
    }

    resetPosition() {
        console.log("resetPosition iframe position");
    }

}