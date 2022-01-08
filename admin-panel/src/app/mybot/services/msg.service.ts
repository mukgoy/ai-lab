import { Injectable } from '@angular/core';
import { NlpService } from './nlp.service';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  isBotReplying: boolean = false;
  msgs: any[] = [];
  constructor(public nlpService:NlpService){

  }
  onUserReply(msg:string){
    this.msgs.push({type:"human", msg:msg, time:new Date().getTime()})
    this.isBotReplying = true;
    this.nlpService.process(msg).then((res:string)=>{
      setTimeout(()=>{
        this.isBotReplying = false;
        res = res.replace(/<p>(.*?)<\/p>/, '$1');
        this.msgs.push({type:"bot", msg:res, time:new Date().getTime()});
      },1500)
    })
  }
}
