import { Injectable } from '@angular/core';
import { ChatMessage, SenderType } from '../enums';
import { ChatService } from './chat.service';
import { NlpService } from './nlp.service';
import { StoreService } from './store.service';



@Injectable({
  providedIn: 'root'
})
export class MsgService {

  isBotReplying: boolean = false;
  msgs: ChatMessage[] = [];
  promiseResolveInput: any = null
  constructor(public nlpService:NlpService, public chatService: ChatService,public store: StoreService,){
    this.chatService.newMessageReceived().subscribe((data:ChatMessage) => {
      console.log(data);
      this.msgs.push(data)
    });
  }
  onUserReply(msg:string){
    this.publishMsg({senderType:SenderType.USER, message:msg})
    if(this.promiseResolveInput){
      this.promiseResolveInput(msg);
      this.promiseResolveInput = null
    }else{
      this.isBotReplying = true;
      this.nlpService.process(msg).then((res:string)=>{
        setTimeout(()=>{
          this.isBotReplying = false;
          res = res.replace(/<p>(.*?)<\/p>/, '$1');
          this.publishMsg({senderType:SenderType.BOT, message:res});
        },1000)
      })
    }
  }

  onBotReply(msg:string){
    this.publishMsg({senderType:SenderType.BOT, message:msg});
  }

  requiredUserInput(msg?:string){
    if(msg){
      this.publishMsg({senderType:SenderType.BOT, message:msg});
    }
    return new Promise(resolve=>{
      this.promiseResolveInput = resolve
    })
  }

  publishMsg(msgObj:any){
    msgObj.room = this.store.botUser.id;
    msgObj.createdAt = new Date();
    msgObj.botId = this.store.botId

    if(msgObj.senderType == SenderType.BOT){
      msgObj.senderId = this.store.botId
    }else if(msgObj.senderType == SenderType.USER){
      msgObj.senderId = this.store.botUser.id;
    }

    this.msgs.push(msgObj);
    this.chatService.sendMessage(msgObj);
  }
  
}
