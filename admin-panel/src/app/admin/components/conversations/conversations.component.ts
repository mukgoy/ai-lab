import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatMessage, ChatUser, SenderType } from 'src/app/mybot/enums';
import { ChatService } from 'src/app/mybot/services/chat.service';
import { MsgService } from 'src/app/mybot/services/msg.service';
import { StoreService } from 'src/app/mybot/services/store.service';
import { HelperService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html'
})
export class ConversationsComponent implements OnInit {

  botId:string = ""
  onlineUsers: ChatUser[] = []
  selectedUser:ChatUser = {} as ChatUser;
  constructor(
    public help : HelperService,
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
    this.chatService.onMessageReceived('joinRoom').subscribe((data:any) => {
      console.log("joinRoom",data);
      this.onlineUsers.unshift(data.user)
    });
    this.chatService.onMessageReceived('lastMessage').subscribe((lastMessage:ChatMessage) => {
      console.log("lastMessage",lastMessage);
      console.log("onlineUsers",this.onlineUsers);
      let user = this.onlineUsers.find(item=>item.room == lastMessage.room);
      if(user){
        user.lastMessage = lastMessage
        user.chatMessages.push(lastMessage)
      }
    });
    this.chatService.onMessageReceived('getOnlineUsers').subscribe((onlineUsers:ChatUser[]) => {
      console.log("getOnlineUsers",onlineUsers);
      onlineUsers.map(item=>item.chatMessages = [])
      this.onlineUsers = onlineUsers
    });
  }

  onUserSelect(botUserId:string){
    let user = this.onlineUsers.find(item=>item.id == botUserId);
    if(user){
      this.selectedUser = user;
      this.getPreviousMessages();
    }
  }

  getPreviousMessages(){
    console.log("selectedUser", this.selectedUser)
    this.selectedUser.chatMessages = this.selectedUser.chatMessages || []
    let firstMessage = this.selectedUser?.chatMessages[0] || {};
    let offset = firstMessage.id ? firstMessage.id :""
    this.chatService.getPreviousMessages(this.selectedUser.room, offset)
    .subscribe((chatMessages:any)=>{
      console.log(chatMessages);
      this.selectedUser.chatMessages = chatMessages.reverse().concat(this.selectedUser.chatMessages)
    },(error:any)=>{
        console.log(error);
    });
  }

}
