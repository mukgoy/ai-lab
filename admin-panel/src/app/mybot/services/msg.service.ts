import { Injectable } from '@angular/core';
import { ChatMessageEntity, ChatUserEntity, ChatUserType } from 'src/app/shared/entities';
import { SocketData } from '../enums';
import { ChatService } from './chat.service';
import { NlpService } from './nlp.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class MsgService {
  isBotReplying: boolean = false;
  msgs: ChatMessageEntity[] = [];
  promiseResolveInput: any = null
  msgQueue: ChatMessageEntity[] = [];
  constructor(
    public nlpService:NlpService, 
    public chatService: ChatService,
    public store: StoreService
  ){ }

  connectChatServer(){
    let socketData = new SocketData({
      bot: this.store.bot,
      user: this.store.botUser
    });
    console.log("connectChatServer", socketData)
    this.chatService.connect(socketData)
    this.chatService.onMessageReceived('message').subscribe((data:ChatMessageEntity) => {
      console.log(data);
      this.msgs.push(data)
    });
  }

  onUserReply(msg:string){
    this.publishMsg({sender:this.store.botUser, message:msg})
    if(this.promiseResolveInput){
      this.promiseResolveInput(msg);
      this.promiseResolveInput = null
    }else{
      this.isBotReplying = true;
      this.nlpService.process(msg).then((res:string)=>{
        setTimeout(()=>{
          this.isBotReplying = false;
          res = res.replace(/<p>(.*?)<\/p>/, '$1');
          this.publishMsg({sender: new ChatUserEntity({type:ChatUserType.BOT}), message:res});
        },1000)
      })
    }
  }

  onBotReply(msg:string){
    this.publishMsg({sender: new ChatUserEntity({type:ChatUserType.BOT}), message:msg});
  }

  onAgentReply(msg:string){
    this.publishMsg({sender: this.store.botUser, message:msg});
  }

  requiredUserInput(msg?:string){
    if(msg){
      this.publishMsg({sender: new ChatUserEntity({type:ChatUserType.BOT}), message:msg});
    }
    return new Promise(resolve=>{
      this.promiseResolveInput = resolve
    })
  }

  publishMsg(msgObj:ChatMessageEntity){
    this.msgs.push(msgObj);
    if(this.store.botUser.id){
      this.chatService.sendMessage(msgObj);
    }else{
      this.msgQueue.push(msgObj);
    }
  }

}
