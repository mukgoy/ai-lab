import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/mybot/services/chat.service';
import { MsgService } from 'src/app/mybot/services/msg.service';
import { StoreService } from 'src/app/mybot/services/store.service';
import { HelperService, UserService } from 'src/app/shared/services';
import { BotService } from '../../services/bot.service';
import { BotEntity, ChatMessageEntity, ChatUserEntity, ChatUserType } from 'src/app/shared/entities';
import { SocketData } from 'src/app/mybot/enums';
import * as _ from 'lodash';
@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html'
})
export class ConversationsComponent implements OnInit {

  isChatSidebarOpen = true;
  constructor(
    public help: HelperService,
    public userService: UserService,
    public store: StoreService,
    public chatService: ChatService,
    public msgService: MsgService,
    private botService: BotService,
  ) { }

  ngOnInit(): void {
    this.getBots();
  }

  getBots() {
    this.botService.getBots().subscribe((res: any) => {
      console.log(res);
      this.store.bots = res
      if (this.store.bots.length > 0) {
        const { userId, email, phone, name, owner } = this.userService.currentUserValue;
        this.store.bot = this.store.bots[0]
        this.store.botUser = { id: userId, email, phone, name, type: ChatUserType.AGENT }
        this.msgService.connectChatServer()
        this.initAllSubscribers();
        let botIds = this.store.bots.map(bot=>bot.botId)
        this.chatService.getOnlineUsers({ botIds })
          .then((onlineUsers: ChatUserEntity[]) => {
            console.log("getOnlineUsers", onlineUsers);
            onlineUsers.map(item => { item.chatMessages = [] })
            this.store.onlineUsers = onlineUsers
          });
      }
    }, (error: any) => {
      // this.helperService.notify('error', error);
    });
  }

  get msgs() {
    return this.msgService.msgs;
  }

  textMsg = "";
  @ViewChild('textMsgBox') textMsgBox: ElementRef<HTMLInputElement> = {} as ElementRef;

  previousKey = "";
  onChangeHTML(event: any) {
    let textMsg = this.textMsgBox.nativeElement.textContent || "";
    if (!textMsg) {
      this.textMsgBox.nativeElement.textContent = "";
      return;
    }

    this.textMsg = this.textMsgBox.nativeElement.innerHTML || "";
    this.textMsg = this.textMsg.replace(/<[\/]?div>/gi, "");
    this.textMsg = this.textMsg.replace(/<br\s*[\/]?>/gi, "\n");
    this.textMsg = this.textMsg.trim();

    if (event.key == "Enter" && this.previousKey != "Shift") {
      this.onSubmit();
    } else {
      this.previousKey = event.key;
    }

  }

  onSubmit() {
    console.log(this.textMsg);
    this.textMsgBox.nativeElement.innerHTML = "";
    this.msgService.onAgentReply(this.textMsg);
  }

  initAllSubscribers() {
    this.chatService.onMessageReceived('reconnect').subscribe((res: any) => {
      console.log("updateOnlineUsers", res);
    });

    this.chatService.onMessageReceived('updateOnlineUsers').subscribe((res: any) => {
      console.log("updateOnlineUsers", res);
      if (res.connect) {
        this.store.onlineUsers.unshift(res.connect.user)
      } else if (res.disconnect) {
        const index = this.store.onlineUsers.findIndex(x => x.id === res.disconnect.user.id);
        if (index > -1) {
          this.store.onlineUsers.splice(index, 1);
        }
      }
    });
    this.chatService.onMessageReceived('lastMessage').subscribe((lastMessage: ChatMessageEntity) => {
      console.log("lastMessage", lastMessage);
      console.log("onlineUsers", this.store.onlineUsers);
      let user = this.store.onlineUsers.find(item => item.id == lastMessage.sender?.id);
      if (user) {
        user.lastMessage = lastMessage
        user.chatMessages = user.chatMessages || []
        user.chatMessages.push(lastMessage)
      }
    });
  }

  onUserSelect(botUserId: string) {
    let user = this.store.onlineUsers.find(item => item.id == botUserId);
    if (user) {
      this.store.selectedUser = user;
      this.getPreviousMessages();
      this.isChatSidebarOpen = !this.isChatSidebarOpen
    }
  }

  getPreviousMessages() {
    console.log("selectedUser", this.store.selectedUser)
    if (this.store.selectedUser) {
      this.store.selectedUser.chatMessages = this.store?.selectedUser?.chatMessages || [];
      let firstMessage = (this.store.selectedUser?.chatMessages || [])[0];
      // let offset = firstMessage.id ? firstMessage.id : ""
      // let selectedUser = this.store.selectedUser;
      // this.chatService.getPreviousMessages(this.store.selectedUser, offset).subscribe((chatMessages: any) => {
      //   console.log(chatMessages);
      //   selectedUser.chatMessages = chatMessages.reverse().concat(selectedUser.chatMessages)
      // }, (error: any) => {
      //   console.log(error);
      // });
    }
  }
}
