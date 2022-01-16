import {  ConnectedSocket,  MessageBody,  SubscribeMessage,  WebSocketGateway,} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './chat.service';
import { Bind, UseInterceptors } from '@nestjs/common';
import { ChatMessageEntity } from 'src/globals/entities';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements NestGateway {
  count = 0;
  constructor(private chatService: ChatService) { }

  afterInit(server: any) {
    // console.log('Init', server);
  }

  handleConnection(socket: any) {
    const query = socket.handshake.query;
    console.log('Connect', query);
    this.chatService.userConnected(query.userName, query.registrationToken);
    process.nextTick(async () => {
      socket.emit('allChats', await this.chatService.getChats());
    });
  }

  handleDisconnect(socket: any) {
    const query = socket.handshake.query;
    console.log('Disconnect', socket.handshake.query);
    this.chatService.userDisconnected(query.userName);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: ChatMessageEntity, sender: any) {
    let count = this.count++;
    console.log('New Chat', chat);
    await this.chatService.saveChat(chat);
    sender.emit('newChat', this.count);
    sender.broadcast.emit('newChat', this.count);
    await this.chatService.sendMessagesToOfflineUsers(chat);

    
    setInterval(()=>{
      sender.emit('emit', count);
      sender.broadcast.emit('broadcast', count);
    },3000)
  }
}
