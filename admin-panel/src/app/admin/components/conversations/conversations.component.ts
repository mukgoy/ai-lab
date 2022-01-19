import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatMessage, SenderType } from 'src/app/mybot/enums';
import { ChatService } from 'src/app/mybot/services/chat.service';
import { MsgService } from 'src/app/mybot/services/msg.service';
import { StoreService } from 'src/app/mybot/services/store.service';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html'
})
export class ConversationsComponent implements OnInit {

  botId:number = 1
  constructor(
    public userService : UserService,
    public store: StoreService,
    public chatService: ChatService,
    public msgService: MsgService,
  ) { }

  ngOnInit(): void {
    const {userId,email,phone,name,owner} = this.userService.currentUserValue;
    this.store.botId = this.botId
    this.store.botUser = {id: userId,email,phone,name,owner}
    this.msgService.connectChatServer(SenderType.AGENT)
    this.initAllSubscribers();
    this.chatService.getOnlineUsers({botId : this.botId});
  }

  get msgs(){
    return this.msgService.msgs;
  }

  textMsg="";
  @ViewChild('textMsgBox') textMsgBox: ElementRef<HTMLInputElement> = {} as ElementRef;

  previousKey = "";
  onChangeHTML(event:any){
    let textMsg = this.textMsgBox.nativeElement.textContent || "";
    if(!textMsg){
      this.textMsgBox.nativeElement.textContent = "";
      return;
    }

    this.textMsg = this.textMsgBox.nativeElement.innerHTML || "";
    this.textMsg = this.textMsg.replace(/<[\/]?div>/gi, "");
    this.textMsg = this.textMsg.replace(/<br\s*[\/]?>/gi, "\n");
    this.textMsg = this.textMsg.trim();

    if(event.key == "Enter" && this.previousKey!="Shift"){
      this.onSubmit();
    }else{
      this.previousKey = event.key;
    }
    
  }

  onSubmit(){
    console.log(this.textMsg);
    this.textMsgBox.nativeElement.innerHTML = "";
    this.msgService.onAgentReply(this.textMsg);
  }

  initAllSubscribers(){
    this.chatService.onMessageReceived('joinRoom').subscribe((data:ChatMessage) => {
      console.log("joinRoom",data);
    });
    this.chatService.onMessageReceived('lastMessage').subscribe((data:ChatMessage) => {
      console.log("lastMessage",data);
    });
    this.chatService.onMessageReceived('getOnlineUsers').subscribe((data:ChatMessage) => {
      console.log("getOnlineUsers",data);
    });
  }
}
