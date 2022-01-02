import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
declare var Channel:any;

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(public store:StoreService) {
  }

  channel:any = null;
  init() {
    if(window.parent !== window){
      this.channel = Channel.build({
        // debugOutput:true,
        window: window.parent, 
        origin: "*", 
        scope: "testScope"
      });
    }
  }

  getBotConfig() {
    if(this.channel){
      this.channel.call({
        method: "getBotConfig",
        params: {},
        success: (botConfig:any)=>{
          this.store.botConfig.next(botConfig)
          // console.log("getBotConfig callback called", botConfig);
        }
      });
    }
  }

  initChatBox() {
    if(this.channel){
      this.channel.call({
        method: "initChatBox",
        params: {},
        success: function(v:any) {
            // console.log("initChatBox callback called", v);
        }
      });
    }
  }
}
